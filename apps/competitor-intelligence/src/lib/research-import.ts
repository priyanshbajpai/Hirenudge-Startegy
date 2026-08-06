import greenManifest from "../../data/research/generated/green-research-manifest.json";
import { getSheetsClient, invalidateDataset, spreadsheetId } from "@/lib/sheets";

const PRODUCTION_ID = "1bAZDhGso089sYplGHBX-YKrIRUVy3rCdDbaRdCpBRQg";
const STAGING_ID = "1FYsaiygSLP6wz7tEcBsG4ntbTsLUeJ1DHmXwOy20KmQ";

const columns: Record<string,string[]> = {
  "_Claim Observations":["id","platformId","entityType","fieldKey","claim","researchState","value","methodology","sourceIds","observedDate","effectiveDate","confidence","material","current","supersedesId","reviewer","reviewedDate","createdAt","updatedAt","createdBy","updatedBy","rowVersion","datasetRevision","researchRunId","notes","fingerprint"],
  "_Company Modules":["id","platformId","productLine","module","workflowStage","description","availability","depth","tierDependency","api","mobile","extension","serviceComponent","researchState","sourceIds","observedDate","confidence","indiaRelevance","mobilityRelevance","hirenudgeTransfer","risk","rowVersion","updatedAt","fingerprint"],
  "_Feature Observations":["id","platformId","featureId","availability","depth","tier","productLine","researchState","sourceIds","observedDate","confidence","claimVsObserved","notes","methodology","reviewer","reviewedDate","createdAt","updatedAt","createdBy","updatedBy","rowVersion","datasetRevision","researchRunId","fingerprint"],
  "_Pricing Observations":["id","platformId","platform","tier","nativePrice","currency","billingPeriod","monthlyEquivalent","limits","pricingStatus","tax","observedDate","sourceId","rowVersion"],
  "_Metric Observations":["id","platformId","channel","valueLabel","numericValue","unit","methodology","sourceId","observedDate","confidence","evidenceStatus","rowVersion"],
  "_GTM Observations":["id","platformId","channel","strategy","evidenceStatus","sourceId","observedDate","confidence","rowVersion"],
  "_Source Checks":["id","sourceId","platformId","checkedAt","result","httpStatus","fingerprint","changed","changeCandidateId","error","nextDue","researchState","confidence","researchRunId","rowVersion","datasetRevision","notes","current"],
  "_Company Completion":["platformId","company","cohort","completionPercentage","terminalFields","requiredFields","sourceCoveragePercentage","freshness","status","blockers","lastResearchRun","reviewedBy","reviewedDate","rowVersion","datasetRevision","featureCompletion","pricingCompletion","gtmCompletion"],
};

type Row = Record<string,unknown>;
const normalized = (value:unknown) => Array.isArray(value) ? value.join("\n") : value ?? "";
const toRows = (records:Row[], keys:string[]) => records.map((record)=>keys.map((key)=>normalized(record[key])));

async function replacePlatforms(tab:string, records:Row[], platformIds:Set<string>) {
  const sheets=getSheetsClient(); const keys=columns[tab];
  const response=await sheets.spreadsheets.values.get({spreadsheetId,range:`'${tab}'!A1:Z10000`,valueRenderOption:"UNFORMATTED_VALUE"});
  const [header=keys,...existing]=response.data.values??[];
  const headerKey=(value:unknown)=>String(value??"").toLowerCase().replace(/[^a-z0-9]+/g,"");
  const index=header.map(headerKey).indexOf("platformid");
  if(index<0)throw new Error(`Platform ID column is missing from ${tab}.`);
  const kept=existing.filter((row)=>!platformIds.has(String(row[index]??"")));
  const values=[...kept,...toRows(records,keys)];
  await sheets.spreadsheets.values.clear({spreadsheetId,range:`'${tab}'!A2:Z10000`});
  if(values.length) await sheets.spreadsheets.values.update({spreadsheetId,range:`'${tab}'!A2`,valueInputOption:"RAW",requestBody:{values}});
}

export async function importGreenResearchToStaging(actor:string) {
  if(spreadsheetId===PRODUCTION_ID) throw new Error("Research import refused: production cutover gate is closed.");
  if(spreadsheetId!==STAGING_ID) throw new Error("Research import is permitted only on the locked staging workbook.");
  const results=greenManifest.results as unknown as Array<Record<string,unknown> & {company:{id:string;cohort:string;name:string;category:string;side:string;geography:string;website:string};claims:Row[];modules:Row[];featureObservations:Row[];sources:Row[];sourceChecks:Row[];completion:Row;pricing?:Row[];metrics?:Row[];gtmObservations?:Row[]}>;
  const platformIds=new Set(results.map((result)=>result.company.id));
  await replacePlatforms("_Claim Observations",results.flatMap((result)=>result.claims),platformIds);
  await replacePlatforms("_Company Modules",results.flatMap((result)=>result.modules),platformIds);
  await replacePlatforms("_Feature Observations",results.flatMap((result)=>result.featureObservations),platformIds);
  await replacePlatforms("_Pricing Observations",results.flatMap((result)=>result.pricing??[]),platformIds);
  await replacePlatforms("_Metric Observations",results.flatMap((result)=>result.metrics??[]),platformIds);
  await replacePlatforms("_GTM Observations",results.flatMap((result)=>result.gtmObservations??[]),platformIds);
  await replacePlatforms("_Source Checks",results.flatMap((result)=>result.sourceChecks),platformIds);
  await replacePlatforms("_Company Completion",results.map((result)=>result.completion),platformIds);

  const sheets=getSheetsClient();
  const sourceResponse=await sheets.spreadsheets.values.get({spreadsheetId,range:"'05 Sources & Changes'!A4:N5000",valueRenderOption:"UNFORMATTED_VALUE"});
  const sourceRows=sourceResponse.data.values??[]; const existingIds=new Set(sourceRows.slice(1).map((row)=>String(row[0]??"")));
  const allSources=results.flatMap((result)=>result.sources).filter((candidate,index,all)=>candidate.id&&!existingIds.has(String(candidate.id))&&all.findIndex((item)=>item.id===candidate.id)===index);
  if(allSources.length) await sheets.spreadsheets.values.append({spreadsheetId,range:"'05 Sources & Changes'!A:N",valueInputOption:"RAW",insertDataOption:"INSERT_ROWS",requestBody:{values:allSources.map((item)=>[item.id,item.platformId??"",item.title,"",item.url,item.type,item.status,item.observedDate??greenManifest.generatedAt,item.effectiveDate??"",item.confidence,item.reviewer??"Founder’s Office",1,new Date().toISOString(),"Green research importer"])}});

  const profileResponse=await sheets.spreadsheets.values.get({spreadsheetId,range:"'01 Competitor Research'!A4:V500",valueRenderOption:"UNFORMATTED_VALUE"});
  const profileRows=profileResponse.data.values??[];
  const byId=new Map(results.filter((result)=>result.company.cohort==="Core").map((result)=>[result.company.id,result]));
  const updated=profileRows.slice(1).map((row)=>{
    const result=byId.get(String(row[0]??"")); if(!result)return row;
    const claims=new Map(result.claims.map((item)=>[String(item.fieldKey),String(item.value??"")]));
    const get=(key:string,fallback="Not found after exhaustive search")=>claims.get(key)||fallback;
    return [result.company.id,result.company.name,row[2]??"",get("side",result.company.side),result.company.category,get("headquarters",result.company.geography),row[6]||"Not publicly disclosed",get("official_website",result.company.website),get("jobs_to_be_done",get("positioning")),result.modules.map((item)=>item.module).join("\n")||"No material product module found across checked public sources",get("usp"),get("gtm"),get("observable_reach"),get("pricing"),get("revenue_status"),result.sources.slice(0,8).map((item)=>item.url).join("\n"),get("hirenudge_recommendation"),`${result.completion.completionPercentage}% coverage`,"High",result.completion.freshness,"Founder’s Office",Number(row[21]||1)+1];
  });
  if(updated.length) await sheets.spreadsheets.values.update({spreadsheetId,range:"'01 Competitor Research'!A5",valueInputOption:"RAW",requestBody:{values:updated}});
  const revision=Date.now();
  await sheets.spreadsheets.values.batchUpdate({spreadsheetId,requestBody:{valueInputOption:"RAW",data:[{range:"'_System Meta'!B2",values:[[revision]]},{range:"'_System Meta'!B3",values:[[new Date().toISOString()]]},{range:"'_System Meta'!B4",values:[[actor] ]}]}});
  invalidateDataset();
  return {companies:results.length,platformIds:[...platformIds],sourcesAdded:allSources.length,revision,productionModified:false};
}
