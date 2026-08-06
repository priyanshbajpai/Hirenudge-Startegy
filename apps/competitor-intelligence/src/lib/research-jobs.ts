import { createHash } from "node:crypto";
import { appendReviewEvent, createNewsItem, createSourceCheck } from "@/lib/sheets";
import { getIntelligenceData } from "@/lib/data";
import type { NewsItem, Source, SourceCheck } from "@/types";

const slug=(value:string)=>value.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/(^-|-$)/g,"");
const clean=(value:string)=>value.replace(/<[^>]+>/g," ").replace(/&amp;/g,"&").replace(/&#39;|&apos;/g,"'").replace(/&quot;/g,'"').replace(/\s+/g," ").trim();
const hash=(value:string)=>createHash("sha256").update(value).digest("hex");

async function fetchPublic(url:string){
  const controller=new AbortController(); const timer=setTimeout(()=>controller.abort(),12000);
  try{const response=await fetch(url,{redirect:"follow",headers:{"user-agent":"HireNudge-Founder-Office-Monitor/1.0",accept:"text/html,application/xml;q=0.9,*/*;q=0.8"},signal:controller.signal,cache:"no-store"});const body=await response.text();return{ok:response.ok,status:response.status,url:response.url||url,body,error:""};}
  catch(error){return{ok:false,status:null,url,body:"",error:error instanceof Error?error.message:String(error)};}
  finally{clearTimeout(timer);}
}

export async function refreshDueSources(limit=8){
  const data=await getIntelligenceData(); const today=new Date().toISOString().slice(0,10); const latest=new Map<string,SourceCheck>();
  for(const check of data.sourceChecks){const current=latest.get(check.sourceId);if(!current||check.checkedAt>current.checkedAt)latest.set(check.sourceId,check);}
  const due=data.sources.filter((source)=>/^https?:\/\//.test(source.url)).filter((source)=>{const check=latest.get(source.id);return !check||!check.nextDue||check.nextDue<=today;}).slice(0,limit);
  let changed=0; const errors:string[]=[];
  for(const source of due){
    const result=await fetchPublic(source.url); const fingerprint=result.body?hash(result.body):""; const prior=latest.get(source.id); const isChanged=Boolean(result.ok&&prior?.fingerprint&&prior.fingerprint!==fingerprint); if(isChanged)changed++;
    const check:SourceCheck={id:`check-${crypto.randomUUID()}`,sourceId:source.id,platformId:platformForSource(data,source),checkedAt:new Date().toISOString(),result:result.ok?"Accessible":"Unavailable",httpStatus:result.status,fingerprint,changed:isChanged,changeCandidateId:isChanged?`change-${crypto.randomUUID()}`:"",error:result.error,nextDue:new Date(Date.now()+7*86400000).toISOString().slice(0,10),researchState:result.ok?"Observed":"Not found after exhaustive search",confidence:result.ok?"High":"Medium",researchRunId:`cron-source-refresh-${today}`,rowVersion:1,datasetRevision:data.meta.datasetRevision+1,notes:isChanged?"Fingerprint changed; reviewer approval is required before any approved fact changes.":"Bounded source health check.",current:true};
    try{await createSourceCheck(check);}catch(error){errors.push(`${source.id}: ${error instanceof Error?error.message:String(error)}`);}
    if(isChanged)await appendReviewEvent("Source change candidate",`${source.title} changed at ${result.url}. Review the current approved claims before superseding evidence.`);
  }
  return{processed:due.length,changed,errors};
}

function platformForSource(data:Awaited<ReturnType<typeof getIntelligenceData>>,source:Source){
  return data.platforms.find((platform)=>{try{return new URL(platform.website).hostname.replace(/^www\./,"")===new URL(source.url).hostname.replace(/^www\./,"");}catch{return false;}})?.id||"";
}

export async function collectHiringNews(limit=20){
  const data=await getIntelligenceData(); const sourceUrl="https://www.producthunt.com/products?parentTopic=business&topic=hiring"; const page=await fetchPublic(sourceUrl);
  if(!page.ok)throw new Error(`Product Hunt hiring collection failed (${page.status??page.error}).`);
  const existing=new Set(data.news.map((item)=>item.fingerprint)); const products=[...page.body.matchAll(/href=["'](\/products\/[a-z0-9-]+)["'][^>]*>([\s\S]*?)<\/a>/gi)].map((match)=>({url:new URL(match[1],sourceUrl).toString(),label:clean(match[2])})).filter((item)=>item.label.length>8&&!/follow|review|image|forum|launch|view/i.test(item.label));
  const unique=products.filter((item,index,all)=>all.findIndex((candidate)=>candidate.url===item.url)===index).slice(0,limit); let created=0; const errors:string[]=[];
  for(const product of unique){const company=product.label.split(/[:—|-]/)[0].trim();const fingerprint=hash(`${new Date().toISOString().slice(0,10)}|${product.url}|${product.label}`);if(existing.has(fingerprint))continue;const now=new Date().toISOString();const news:NewsItem={id:`news-${slug(company)}-${now.slice(0,10)}`,headline:product.label,platformId:"",company,category:"Hiring launch",geography:"Global / not publicly disclosed",signalType:"Launch",eventDate:now.slice(0,10),publicationDate:now.slice(0,10),sourceId:`source-ph-${slug(company)}`,sourceUrl:product.url,sourceType:"Product Hunt launch",extractedFact:`Product Hunt's hiring collection lists ${product.label}. This is a launch-platform claim, not proof of traction, retention or product quality.`,researchState:"Observed",confidence:"Medium",whyItMatters:"Current hiring-product launches are discovery signals for candidate workflow, employer automation, trust and distribution patterns.",recommendedResponse:"Draft — verify the official product, pricing and trust sources before creating a roadmap action.",actionType:"Watch",status:"Published",fingerprint,supersedesId:"",createdAt:now,updatedAt:now,rowVersion:1,datasetRevision:data.meta.datasetRevision+1,researchRunId:`cron-news-${now.slice(0,10)}`};try{await createNewsItem(news);created++;}catch(error){errors.push(`${company}: ${error instanceof Error?error.message:String(error)}`);}}
  return{observed:unique.length,created,errors};
}

export async function discoverStartups(){
  const sources=["https://www.ycombinator.com/companies/industry/recruiting","https://www.producthunt.com/products?parentTopic=business&topic=hiring"];
  const results=[];
  for(const url of sources){const result=await fetchPublic(url);results.push({url,ok:result.ok,status:result.status,fingerprint:result.body?hash(result.body):""});}
  await appendReviewEvent("Weekly startup discovery",`Checked ${results.length} launch and accelerator sources. Accessible: ${results.filter((result)=>result.ok).length}. New companies remain drafts until official identity and relevance checks pass.`);
  return{results};
}

export async function generateMonthlyReview(){
  const data=await getIntelligenceData(); const open=data.completion.filter((row)=>row.status!=="Green"); const pricing=open.filter((row)=>row.pricingCompletion<100).length; const source=open.filter((row)=>row.sourceCoveragePercentage<100).length;
  await appendReviewEvent("Monthly deep review",`${open.length} companies have open completeness gates; ${pricing} have pricing gates and ${source} have source-coverage gates. Approved evidence was not changed.`);
  return{open:open.length,pricing,source};
}

