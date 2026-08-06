import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { google } from "googleapis";
import { watchThisWeek, weeklyNewsSources } from "../../data/watch-this-week.mjs";

const STAGING_ID = "1FYsaiygSLP6wz7tEcBsG4ntbTsLUeJ1DHmXwOy20KmQ";
const PRODUCTION_ID = "1bAZDhGso089sYplGHBX-YKrIRUVy3rCdDbaRdCpBRQg";
const here = path.dirname(fileURLToPath(import.meta.url));
const appRoot = path.resolve(here, "../..");
const manifestPath = path.join(appRoot, "data/research/generated/public-first-manifest.json");
const spreadsheetId = process.env.RESEARCH_SPREADSHEET_ID || STAGING_ID;

if (spreadsheetId === PRODUCTION_ID) throw new Error("The research importer refuses to write to production. Promote only after the completeness gate passes.");
if (spreadsheetId !== STAGING_ID && process.env.ALLOW_NONSTANDARD_RESEARCH_SHEET !== "true") throw new Error("Set ALLOW_NONSTANDARD_RESEARCH_SHEET=true for a non-production staging copy.");
if (!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || !process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY) throw new Error("Google service-account credentials are required.");

const auth = new google.auth.JWT({
  email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
  key: process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY.replace(/\\n/g, "\n"),
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});
const sheets = google.sheets({ version: "v4", auth });
const manifest = JSON.parse(await readFile(manifestPath, "utf8"));
if (manifest.results?.length !== 136) throw new Error(`Completeness safeguard: expected 136 manifests, got ${manifest.results?.length ?? 0}.`);

const rows = {
  claims: manifest.results.flatMap((result) => result.claims),
  modules: manifest.results.flatMap((result) => result.modules),
  features: manifest.results.flatMap((result) => result.featureObservations),
  sources: manifest.results.flatMap((result) => result.sources),
  checks: manifest.results.flatMap((result) => result.sourceChecks),
  completion: manifest.results.map((result) => result.completion),
  pricing: manifest.results.flatMap((result) => result.pricing ?? []),
  metrics: manifest.results.flatMap((result) => result.metrics ?? []),
  gtm: manifest.results.flatMap((result) => result.gtmObservations ?? []),
};

const columns = {
  "_Claim Observations": ["id","platformId","entityType","fieldKey","claim","researchState","value","methodology","sourceIds","observedDate","effectiveDate","confidence","material","current","supersedesId","reviewer","reviewedDate","createdAt","updatedAt","createdBy","updatedBy","rowVersion","datasetRevision","researchRunId","notes","fingerprint"],
  "_Company Modules": ["id","platformId","productLine","module","workflowStage","description","availability","depth","tierDependency","api","mobile","extension","serviceComponent","researchState","sourceIds","observedDate","confidence","indiaRelevance","mobilityRelevance","hirenudgeTransfer","risk","rowVersion","updatedAt","fingerprint"],
  "_Feature Observations": ["id","platformId","featureId","availability","depth","tier","productLine","researchState","sourceIds","observedDate","confidence","claimVsObserved","notes","methodology","reviewer","reviewedDate","createdAt","updatedAt","createdBy","updatedBy","rowVersion","datasetRevision","researchRunId","fingerprint"],
  "_News Items": ["id","headline","platformId","company","category","geography","signalType","eventDate","publicationDate","sourceId","sourceUrl","sourceType","extractedFact","researchState","confidence","whyItMatters","recommendedResponse","actionType","status","fingerprint","supersedesId","createdAt","updatedAt","rowVersion","datasetRevision","researchRunId"],
  "_Research Runs": ["id","scope","cohort","startedAt","completedAt","status","companiesAttempted","companiesCompleted","sourcesChecked","claimsProduced","newsItemsProduced","errors","toolVersion","methodology","actor","datasetRevision","notes","fingerprint"],
  "_Source Checks": ["id","sourceId","platformId","checkedAt","result","httpStatus","fingerprint","changed","changeCandidateId","error","nextDue","researchState","confidence","researchRunId","rowVersion","datasetRevision","notes","current"],
  "_Company Completion": ["platformId","company","cohort","completionPercentage","terminalFields","requiredFields","sourceCoveragePercentage","freshness","status","blockers","lastResearchRun","reviewedBy","reviewedDate","rowVersion","datasetRevision","featureCompletion","pricingCompletion","gtmCompletion"],
  "_Pricing Observations": ["id","platformId","platform","tier","nativePrice","currency","billingPeriod","monthlyEquivalent","limits","pricingStatus","tax","observedDate","sourceId","rowVersion"],
  "_Metric Observations": ["id","platformId","channel","valueLabel","numericValue","unit","methodology","sourceId","observedDate","confidence","evidenceStatus","rowVersion"],
  "_GTM Observations": ["id","platformId","channel","strategy","evidenceStatus","sourceId","observedDate","confidence","rowVersion"],
};

const normalized = (value) => Array.isArray(value) ? value.join("\n") : value ?? "";
const toRows = (records, keys) => records.map((record) => keys.map((key) => normalized(record[key])));

async function replaceTable(tab, records) {
  const keys = columns[tab];
  if (!keys) throw new Error(`No column mapping for ${tab}.`);
  await sheets.spreadsheets.values.clear({ spreadsheetId, range: `'${tab}'!A2:Z10000` });
  if (!records.length) return;
  await sheets.spreadsheets.values.update({
    spreadsheetId, range: `'${tab}'!A2`, valueInputOption: "RAW", requestBody: { values: toRows(records, keys) },
  });
}

async function replaceEnrichedPlatforms(tab, records) {
  if (!records.length) return;
  const keys = columns[tab];
  const response = await sheets.spreadsheets.values.get({ spreadsheetId, range: `'${tab}'!A1:Z10000`, valueRenderOption: "UNFORMATTED_VALUE" });
  const [header = keys, ...existingRows] = response.data.values ?? [];
  const normalizedHeader = header.map((value) => String(value));
  const platformIndex = normalizedHeader.indexOf("platformId");
  const enrichedPlatformIds = new Set(records.map((record) => record.platformId));
  const preserved = existingRows.filter((row) => !enrichedPlatformIds.has(String(row[platformIndex] ?? "")));
  const values = [...preserved, ...toRows(records, keys)];
  await sheets.spreadsheets.values.clear({ spreadsheetId, range: `'${tab}'!A2:Z10000` });
  if (values.length) await sheets.spreadsheets.values.update({ spreadsheetId, range: `'${tab}'!A2`, valueInputOption: "RAW", requestBody: { values } });
}

const researchRun = {
  id: manifest.runId, scope: "Public-first company and weekly intelligence rebuild", cohort: "79 core + 57 watchlist",
  startedAt: manifest.generatedAt, completedAt: new Date().toISOString(), status: "First-party pass complete; independent and pricing gates open",
  companiesAttempted: 136, companiesCompleted: 136, sourcesChecked: rows.checks.length, claimsProduced: rows.claims.length,
  newsItemsProduced: watchThisWeek.length, errors: "", toolVersion: manifest.schemaVersion, methodology: manifest.methodology,
  actor: "Founder’s Office", datasetRevision: 7,
  notes: "Production was not modified. Green status is withheld until independent sources and complete public pricing tiers pass QA.",
  fingerprint: `${manifest.runId}:${rows.claims.length}:${rows.checks.length}`,
};

await replaceTable("_Claim Observations", rows.claims);
await replaceTable("_Company Modules", rows.modules);
await replaceTable("_Feature Observations", rows.features);
await replaceTable("_News Items", watchThisWeek);
await replaceTable("_Research Runs", [researchRun]);
await replaceTable("_Source Checks", rows.checks);
await replaceTable("_Company Completion", rows.completion);
await replaceEnrichedPlatforms("_Pricing Observations", rows.pricing);
await replaceEnrichedPlatforms("_Metric Observations", rows.metrics);
await replaceEnrichedPlatforms("_GTM Observations", rows.gtm);

const existingSourceResponse = await sheets.spreadsheets.values.get({ spreadsheetId, range: "'05 Sources & Changes'!A4:N5000", valueRenderOption: "UNFORMATTED_VALUE" });
const existingSourceRows = existingSourceResponse.data.values ?? [];
const sourceHeader = existingSourceRows[0] ?? [];
const sourceIndex = new Map(sourceHeader.map((header, index) => [String(header).toLowerCase().replace(/[^a-z0-9]+/g, ""), index]));
const existingSourceIds = new Set(existingSourceRows.slice(1).map((row) => String(row[sourceIndex.get("id") ?? 0] ?? "")));
const sourceRecords = [...rows.sources, ...weeklyNewsSources].filter((source, index, all) => source.id && !existingSourceIds.has(source.id) && all.findIndex((candidate) => candidate.id === source.id) === index);
const sourceValues = sourceRecords.map((source) => [source.id, source.platformId ?? "", source.title, "", source.url, source.type, source.status, source.observedDate, source.effectiveDate, source.confidence, source.reviewer, 1, new Date().toISOString(), "Founder’s Office research importer"]);
if (sourceValues.length) await sheets.spreadsheets.values.append({ spreadsheetId, range: "'05 Sources & Changes'!A:N", valueInputOption: "RAW", insertDataOption: "INSERT_ROWS", requestBody: { values: sourceValues } });

const existingProfilesResponse = await sheets.spreadsheets.values.get({ spreadsheetId, range: "'01 Competitor Research'!A4:V500", valueRenderOption: "UNFORMATTED_VALUE" });
const existingProfiles = existingProfilesResponse.data.values ?? [];
const profileMap = new Map(existingProfiles.slice(1).map((row) => [String(row[0] ?? ""), row]));
const coreResults = manifest.results.filter((result) => result.company.cohort === "Core");
const profileValues = coreResults.map((result) => {
  const current = profileMap.get(result.company.id) ?? [];
  const byField = new Map(result.claims.map((claim) => [claim.fieldKey, claim]));
  const get = (field, fallback = "Not found after exhaustive search") => byField.get(field)?.value || fallback;
  return [
    result.company.id, result.company.name, current[2] ?? "", get("side", result.company.side), result.company.category,
    get("headquarters", result.company.geography), current[6] || "Not publicly disclosed", get("official_website", result.company.website),
    get("jobs_to_be_done", get("positioning")), result.modules.map((module) => module.module).join("\n") || "No material product module found across checked public sources",
    get("usp"), get("gtm"), get("observable_reach"), get("pricing"), get("revenue_status"),
    result.sources.filter((source) => source.status === "Observed").slice(0, 8).map((source) => source.url).join("\n"),
    get("hirenudge_recommendation"), `${result.completion.completionPercentage}% coverage`,
    result.completion.status === "Green" ? "High" : "Medium — quality gates open", result.completion.freshness,
    "Founder’s Office", Number(current[21] || 1) + 1,
  ];
});
await sheets.spreadsheets.values.clear({ spreadsheetId, range: "'01 Competitor Research'!A5:V500" });
await sheets.spreadsheets.values.update({ spreadsheetId, range: "'01 Competitor Research'!A5", valueInputOption: "RAW", requestBody: { values: profileValues } });

const actionsResponse = await sheets.spreadsheets.values.get({ spreadsheetId, range: "'04 Opportunities & Tracker'!A4:W500", valueRenderOption: "UNFORMATTED_VALUE" });
const actionRows = actionsResponse.data.values ?? [];
if (actionRows.length > 1) {
  const updatedActions = actionRows.slice(1).map((row) => { const next = [...row]; next[6] = "Priyansh; Baskaran"; next[19] = Number(next[19] || 1) + 1; next[21] = new Date().toISOString(); next[22] = "Founder’s Office"; return next; });
  await sheets.spreadsheets.values.update({ spreadsheetId, range: "'04 Opportunities & Tracker'!A5", valueInputOption: "RAW", requestBody: { values: updatedActions } });
}

await sheets.spreadsheets.values.batchUpdate({ spreadsheetId, requestBody: { valueInputOption: "RAW", data: [
  { range: "'_System Meta'!B2", values: [[7]] },
  { range: "'_System Meta'!B3", values: [[new Date().toISOString()]] },
  { range: "'_System Meta'!B4", values: [["Founder’s Office research importer"]] },
  { range: "'_System Meta'!B5", values: [[79]] },
  { range: "'_System Meta'!B6", values: [[57]] },
  { range: "'_System Meta'!B7", values: [["2.0.0-staging"]] },
] } });

console.log(JSON.stringify({ spreadsheetId, companies: 136, claims: rows.claims.length, features: rows.features.length, modules: rows.modules.length, sourceChecks: rows.checks.length, news: watchThisWeek.length, newSources: sourceValues.length, productionModified: false }, null, 2));
