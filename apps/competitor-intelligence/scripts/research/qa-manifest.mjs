import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { watchThisWeek } from "../../data/watch-this-week.mjs";

const here=path.dirname(fileURLToPath(import.meta.url));
const manifest=JSON.parse(await readFile(path.resolve(here,"../../data/research/generated/public-first-manifest.json"),"utf8"));
const terminalStates=new Set(["Verified","Observed","Company claim","Analyst inference","Third-party estimate","Not offered","Not applicable","Not publicly disclosed","Not found after exhaustive search","Conflicting evidence","Stale — refresh due","Internal verified","Founder’s Office confirmed"]);
const placeholders=/needs research|needs verification|manual verification required|research pending|\bunknown\b/i;
const results=manifest.results||[]; const claims=results.flatMap((result)=>result.claims||[]); const features=results.flatMap((result)=>result.featureObservations||[]); const sources=results.flatMap((result)=>result.sources||[]);
const duplicate=(values)=>values.filter((value,index)=>values.indexOf(value)!==index);
const checks={
  companies:results.length,
  core:results.filter((result)=>result.company.cohort==="Core").length,
  watchlist:results.filter((result)=>result.company.cohort==="Watchlist").length,
  claims:claims.length,
  features:features.length,
  news:watchThisWeek.length,
  placeholderClaims:claims.filter((claim)=>placeholders.test(`${claim.value} ${claim.researchState}`)).map((claim)=>claim.id),
  invalidStates:claims.filter((claim)=>!terminalStates.has(claim.researchState)).map((claim)=>claim.id),
  unsourcedMaterialClaims:claims.filter((claim)=>claim.material&&(!claim.sourceIds||claim.sourceIds.length===0)).map((claim)=>claim.id),
  duplicateCompanyIds:duplicate(results.map((result)=>result.company.id)),
  duplicateClaimIds:duplicate(claims.map((claim)=>claim.id)),
  duplicateNewsFingerprints:duplicate(watchThisWeek.map((item)=>item.fingerprint)),
  companiesWithoutAccessibleSource:results.filter((result)=>!result.sources.some((source)=>source.status==="Observed")).map((result)=>result.company.name),
  companiesWithoutIndependentSource:results.filter((result)=>!result.sources.some((source)=>/press|review|funding|accelerator|launch/i.test(source.type)&&source.status==="Observed")).map((result)=>result.company.name),
  companiesWithPricingGate:results.filter((result)=>result.completion.pricingCompletion<100).map((result)=>result.company.name),
  greenCompanies:results.filter((result)=>result.completion.status==="Green").length,
  sourceCount:sources.length,
};
const failures=[];
if(checks.companies!==136)failures.push(`Expected 136 companies, got ${checks.companies}`);
if(checks.core!==79||checks.watchlist!==57)failures.push(`Expected 79 core/57 watchlist, got ${checks.core}/${checks.watchlist}`);
if(checks.features!==136*30)failures.push(`Expected ${136*30} taxonomy cells, got ${checks.features}`);
if(checks.news<15||checks.news>25)failures.push(`Expected 15–25 weekly items, got ${checks.news}`);
if(checks.placeholderClaims.length)failures.push(`${checks.placeholderClaims.length} placeholder claims remain`);
if(checks.invalidStates.length)failures.push(`${checks.invalidStates.length} invalid terminal states remain`);
if(checks.unsourcedMaterialClaims.length)failures.push(`${checks.unsourcedMaterialClaims.length} material claims have no source ID`);
if(checks.duplicateCompanyIds.length||checks.duplicateClaimIds.length||checks.duplicateNewsFingerprints.length)failures.push("Duplicate immutable IDs or news fingerprints detected");
if(checks.companiesWithoutAccessibleSource.length)failures.push(`${checks.companiesWithoutAccessibleSource.length} companies have no accessible source`);
if(checks.companiesWithoutIndependentSource.length)failures.push(`${checks.companiesWithoutIndependentSource.length} companies have no independent/launch source`);
if(checks.companiesWithPricingGate.length)failures.push(`${checks.companiesWithPricingGate.length} companies have incomplete public-tier extraction`);
if(checks.greenCompanies!==136)failures.push(`Only ${checks.greenCompanies}/136 companies are green`);
console.log(JSON.stringify({pass:failures.length===0,failures,checks},null,2));
if(process.argv.includes("--enforce")&&failures.length)process.exitCode=1;

