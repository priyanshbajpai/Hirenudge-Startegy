import { unstable_cache } from "next/cache";
import { seedData } from "@/lib/seed";
import { readIntelligenceDataset, sheetUrl, sheetsConfigured, spreadsheetId } from "@/lib/sheets";
import type { IntelligenceData } from "@/types";

const readCachedIntelligenceDataset=unstable_cache(readIntelligenceDataset,["hirenudge-intelligence",spreadsheetId],{revalidate:30,tags:[`hirenudge-intelligence-${spreadsheetId}`]});

export async function getIntelligenceData(): Promise<IntelligenceData> {
  if (sheetsConfigured) return readCachedIntelligenceDataset();
  if (process.env.NODE_ENV !== "production" || process.env.USE_SEED_DATA === "true") {
    return { ...seedData, meta: { ...seedData.meta, mode: "seed", health: "Local fixture — Google Sheets not configured", sheetUrl } };
  }
  return {
    platforms: [], profiles: [], aliases: [], importedResearch: [], watchlist: [], features: [], featureObservations: [],
    pricing: [], sources: [], reachMetrics: [], gtmObservations: [], notes: [], discoveries: [], recommendations: [], actions: [],
    claims: [], modules: [], news: [], actionComments: [], researchRuns: [], sourceChecks: [], completion: [],
    meta: { datasetRevision: 0, generatedAt: new Date().toISOString(), coreCount: 0, watchlistCount: 0, approvedCount: 0, sourceCount: 0, mode: "unavailable", health: "Live Google Sheets connection unavailable. Static research is not shown as live data.", sheetUrl },
  };
}

export async function getSectionIntelligenceData(section:string):Promise<IntelligenceData>{
  const data=await getIntelligenceData();
  if(data.meta.mode==="unavailable"||data.meta.mode==="seed")return data;
  const blank=(overrides:Partial<IntelligenceData>):IntelligenceData=>({
    platforms:data.platforms,profiles:[],aliases:[],importedResearch:[],watchlist:[],features:[],featureObservations:[],
    pricing:[],sources:[],reachMetrics:[],gtmObservations:[],notes:[],discoveries:[],recommendations:[],actions:[],
    claims:[],modules:[],news:[],actionComments:[],researchRuns:[],sourceChecks:[],completion:[],meta:data.meta,...overrides,
  });
  if(section==="today")return blank({recommendations:data.recommendations,actions:data.actions,news:data.news,completion:data.completion});
  if(section==="competitors"){
    const id=data.platforms[0]?.id??"";
    const claims=data.claims.filter((row)=>row.platformId===id); const observations=data.featureObservations.filter((row)=>row.platformId===id); const prices=data.pricing.filter((row)=>row.platformId===id);
    const sourceIds=new Set([...claims.flatMap((row)=>row.sourceIds),...observations.flatMap((row)=>row.sourceIds?.length?row.sourceIds:[row.sourceId]),...prices.map((row)=>row.sourceId)]);
    return blank({profiles:data.profiles,aliases:data.aliases,features:data.features,completion:data.completion,claims,modules:data.modules.filter((row)=>row.platformId===id),featureObservations:observations,pricing:prices,reachMetrics:data.reachMetrics.filter((row)=>row.platformId===id),gtmObservations:data.gtmObservations.filter((row)=>row.platformId===id),notes:data.notes.filter((row)=>row.platformId===id),sources:data.sources.filter((row)=>sourceIds.has(row.id))});
  }
  if(section==="compare"){
    const ids=new Set(data.platforms.filter((row)=>row.side==="Candidate-side").slice(0,4).map((row)=>row.id));
    return blank({profiles:data.profiles,aliases:data.aliases,features:data.features,completion:data.completion,claims:data.claims.filter((row)=>ids.has(row.platformId)),featureObservations:data.featureObservations.filter((row)=>ids.has(row.platformId)),pricing:data.pricing.filter((row)=>ids.has(row.platformId))});
  }
  if(section==="opportunities")return blank({recommendations:data.recommendations,discoveries:data.discoveries,news:data.news,completion:data.completion});
  if(section==="tracker")return blank({actions:data.actions,actionComments:data.actionComments});
  return blank({});
}
