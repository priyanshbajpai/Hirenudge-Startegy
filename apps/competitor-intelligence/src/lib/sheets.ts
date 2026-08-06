import { google, sheets_v4 } from "googleapis";
import { revalidateTag } from "next/cache";
import type {
  ActionComment, ActionItem, ClaimObservation, CompanyCompletion, CompanyModule, CompetitorProfile,
  Feature, FeatureObservation, GtmObservation, IntelligenceData, NewsItem, Platform, PriceTier,
  ReachMetric, ResearchNote, ResearchRun, ReviewItem, Source, SourceCheck, TransferOpportunity,
} from "@/types";

const STAGING_SPREADSHEET_ID = "1FYsaiygSLP6wz7tEcBsG4ntbTsLUeJ1DHmXwOy20KmQ";
export const spreadsheetId = process.env.VERCEL_ENV === "preview"
  ? STAGING_SPREADSHEET_ID
  : process.env.GOOGLE_SHEETS_SPREADSHEET_ID ?? "14r1uVHzxlq1kqfrUTw47VnS18aNscYJbHwv3DtSEtfE";
export const sheetUrl = process.env.VERCEL_ENV === "preview"
  ? `https://docs.google.com/spreadsheets/d/${STAGING_SPREADSHEET_ID}/edit`
  : process.env.NEXT_PUBLIC_GOOGLE_SHEET_URL ?? `https://docs.google.com/spreadsheets/d/${spreadsheetId}/edit`;
export const sheetsConfigured = Boolean(process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL && process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY);
export const invalidateDataset=()=>revalidateTag(`hirenudge-intelligence-${spreadsheetId}`);

const TABS = {
  platforms: "03 Platform Directory", profiles: "01 Competitor Research", features: "05 Feature Matrix",
  pricing: "06 Pricing & Packaging", gtm: "07 USP, Positioning & GTM", metrics: "08 Traction, Funding & Revenue",
  links: "09 Websites, Stores & Social", discoveries: "10 Trends & Startup Launches",
  opportunities: "11 Feature Transfer Opportunities", tracker: "04 Opportunities & Tracker",
  evidence: "14 Evidence Review Queue", sources: "05 Sources & Changes", audit: "16 Change Log",
  meta: "_System Meta", imports: "_Imported Research", notes: "_Research Notes", aliases: "_Aliases",
  claims: "_Claim Observations", modules: "_Company Modules", featureObservations: "_Feature Observations",
  pricingObservations: "_Pricing Observations", metricObservations: "_Metric Observations",
  gtmObservations: "_GTM Observations", news: "_News Items", actionComments: "_Action Comments",
  researchRuns: "_Research Runs", sourceChecks: "_Source Checks", completion: "_Company Completion",
} as const;

const TABLE_START = 5;
const boundedRanges = [
  `'${TABS.platforms}'!A4:Z500`, `'${TABS.profiles}'!A4:Z500`, `'${TABS.features}'!A4:CZ250`,
  `'${TABS.pricing}'!A4:Z500`, `'${TABS.gtm}'!A4:Z500`, `'${TABS.metrics}'!A4:Z500`,
  `'${TABS.links}'!A4:Z500`, `'${TABS.discoveries}'!A4:Z500`, `'${TABS.opportunities}'!A4:Z500`,
  `'${TABS.tracker}'!A4:Z500`, `'${TABS.sources}'!A4:Z4000`, `'${TABS.meta}'!A1:F20`,
  `'${TABS.imports}'!A4:P500`, `'${TABS.notes}'!A4:P500`, `'${TABS.aliases}'!A4:F500`,
  `'${TABS.claims}'!A1:Z10000`, `'${TABS.modules}'!A1:X4000`, `'${TABS.featureObservations}'!A1:X6000`,
  `'${TABS.pricingObservations}'!A1:Z3000`, `'${TABS.metricObservations}'!A1:X4000`,
  `'${TABS.gtmObservations}'!A1:V3000`, `'${TABS.news}'!A1:Z3000`,
  `'${TABS.actionComments}'!A1:N3000`, `'${TABS.researchRuns}'!A1:R1000`,
  `'${TABS.sourceChecks}'!A1:R5000`, `'${TABS.completion}'!A1:R500`,
];

export function getSheetsClient(): sheets_v4.Sheets {
  if (!sheetsConfigured) throw new Error("Google Sheets service account is not configured.");
  const auth = new google.auth.JWT({
    email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY!.replace(/\\n/g, "\n"),
    scopes: ["https://www.googleapis.com/auth/spreadsheets", "https://www.googleapis.com/auth/drive.metadata.readonly"],
  });
  return google.sheets({ version: "v4", auth });
}

function getDriveClient() {
  if (!sheetsConfigured) throw new Error("Google Sheets service account is not configured.");
  const auth = new google.auth.JWT({
    email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY!.replace(/\\n/g, "\n"),
    scopes: ["https://www.googleapis.com/auth/drive.metadata.readonly"],
  });
  return google.drive({ version: "v3", auth });
}

const clean = (value: unknown) => String(value ?? "").trim();
const key = (value: unknown) => clean(value).toLowerCase().replace(/[^a-z0-9]+/g, "");
const slug = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
const number = (value: unknown, fallback = 0) => Number(value ?? fallback) || fallback;
const nullableNumber = (value: unknown) => clean(value) === "" || /contact|unknown|not disclosed/i.test(clean(value)) ? null : Number(value);
const boolean = (value: unknown) => /^(true|yes|1)$/i.test(clean(value));
const ids = (value: unknown) => clean(value).split(/[\n,;]+/).map((item) => item.trim()).filter(Boolean);
const terminal = (value: unknown, fallback = "Not found after exhaustive search") => {
  const normalized = clean(value);
  return !normalized || /^(unknown|needs research|needs verification|manual verification required)$/i.test(normalized) || /research pending/i.test(normalized) ? fallback : normalized;
};
const pick = (row: Record<string, unknown>, ...names: string[]) => {
  for (const name of names) if (row[key(name)] !== undefined && clean(row[key(name)]) !== "") return row[key(name)];
  return "";
};

function table(values: unknown[][] | undefined) {
  if (!values?.length) return [] as Array<Record<string, unknown>>;
  const headers = values[0].map(key);
  return values.slice(1).filter((row) => row.some((cell) => clean(cell))).map((row) => Object.fromEntries(headers.map((header, index) => [header, row[index] ?? ""])));
}

function platformId(name: string) { return `platform-${slug(name)}`; }
function normalizePlatformName(name: string) { return name === "KickResume" ? "Kickresume" : name === "SimplifyJobs" ? "Simplify" : name; }

export async function readDatasetRevision(): Promise<{ revision: number; lastSync: string }> {
  const sheets = getSheetsClient();
  const result = await sheets.spreadsheets.values.get({ spreadsheetId, range: `'${TABS.meta}'!B2:B3` });
  const fallbackRevision = number(result.data.values?.[0]?.[0], 1);
  const fallbackSync = clean(result.data.values?.[1]?.[0]) || "Unknown";
  try {
    const file = await getDriveClient().files.get({ fileId: spreadsheetId, fields: "modifiedTime", supportsAllDrives: true });
    const modifiedTime = clean(file.data.modifiedTime);
    const modifiedRevision = Date.parse(modifiedTime);
    if (modifiedTime && Number.isFinite(modifiedRevision)) return { revision: modifiedRevision, lastSync: modifiedTime };
  } catch {
    // Keep the explicit workbook revision as a fail-safe when Drive metadata is unavailable.
  }
  return { revision: fallbackRevision, lastSync: fallbackSync };
}

export async function readIntelligenceDataset(): Promise<IntelligenceData> {
  const sheets = getSheetsClient();
  const [response, sync] = await Promise.all([
    sheets.spreadsheets.values.batchGet({ spreadsheetId, ranges: boundedRanges, valueRenderOption: "UNFORMATTED_VALUE" }),
    readDatasetRevision(),
  ]);
  const byRange = new Map((response.data.valueRanges ?? []).map((item) => [item.range?.split("!")[0].replace(/^'|'$/g, ""), item.values ?? []]));
  const rows = (tab: string) => table(byRange.get(tab));

  const platformRows = rows(TABS.platforms);
  const platforms: Platform[] = platformRows.map((row) => {
    const name = normalizePlatformName(clean(pick(row, "Company", "Platform", "Name")));
    return {
      id: clean(pick(row, "ID", "UUID", "Platform ID")) || platformId(name), name,
      category: terminal(pick(row, "Category", "Primary category"), "Not classified after source check"),
      geography: terminal(pick(row, "Geography", "Country", "HQ"), "Not publicly disclosed"),
      website: clean(pick(row, "Website", "URL")), side: terminal(pick(row, "Side", "Platform side"), "Not classified after source check"),
      lifecycle: terminal(pick(row, "Lifecycle", "Lifecycle status")),
      evidenceStatus: terminal(pick(row, "Evidence status", "Review state", "Status")),
      sourceFreshness: terminal(pick(row, "Source freshness", "Freshness"), "Observation date not recorded"),
      classificationSource: clean(pick(row, "Classification source", "Source")),
      reviewDue: clean(pick(row, "Review due", "Next review")), rowVersion: number(pick(row, "Row version"), 1),
    };
  }).filter((row) => row.name);
  const platformByName = new Map(platforms.map((item) => [item.name.toLowerCase(), item]));

  const importRows = rows(TABS.imports);
  const aliases = rows(TABS.aliases).map((row, index) => ({
    id: clean(pick(row, "ID")) || `alias-${index + 1}`, alias: clean(pick(row, "Alias")),
    platformId: clean(pick(row, "Platform ID")) || platformId(normalizePlatformName(clean(pick(row, "Canonical name")))),
  })).filter((row) => row.alias);
  const importsByName = new Map(importRows.map((row) => [normalizePlatformName(clean(pick(row, "Name"))).toLowerCase(), row]));

  const profileRows = rows(TABS.profiles);
  const profileById = new Map(profileRows.map((row) => [clean(pick(row, "Platform ID", "ID")), row]));
  const profiles: CompetitorProfile[] = platforms.map((platform) => {
    const row = profileById.get(platform.id) ?? profileRows.find((item) => clean(pick(item, "Company", "Platform", "Name")).toLowerCase() === platform.name.toLowerCase()) ?? {};
    const imported = importsByName.get(platform.name.toLowerCase()) ?? {};
    const candidateSummary = platform.side === "Candidate-side" ? `${platform.category} product supporting parts of the job-search workflow.` : `${platform.category} benchmark for transferable hiring-product, trust, data, and GTM patterns.`;
    return {
      id: clean(pick(row, "Profile ID", "ID")) || `profile-${slug(platform.name)}`, platformId: platform.id,
      location: clean(pick(imported, "Country Base", "CountryBase")) || clean(pick(row, "Headquarters", "Location", "Geography")) || platform.geography,
      founder: clean(pick(imported, "Founder")) || clean(pick(row, "Founder")), founderUrl: clean(pick(imported, "Founder")) || clean(pick(row, "Founder URL")),
      productSummary: clean(pick(imported, "Product")) || clean(pick(row, "Product summary", "Product lines", "Customer problem")) || candidateSummary,
      featuresSummary: terminal(clean(pick(imported, "Product")) || clean(pick(row, "Feature summary", "Key features"))),
      usp: terminal(pick(row, "USP", "Positioning", "Promise")),
      acquisitionStrategy: terminal(clean(pick(imported, "User Acquisition Strategy", "UserAcquisitionStrategy")) || clean(pick(row, "Acquisition strategy", "GTM motion"))),
      reachSummary: terminal(clean(pick(imported, "Reach")) || clean(pick(row, "Reach", "Traction"))),
      pricingSummary: clean(pick(row, "Pricing", "Pricing summary")) || "See sourced tiers",
      revenueStatus: clean(pick(row, "Revenue", "Revenue status")) || "Not publicly disclosed / research pending",
      importantLinks: clean(pick(imported, "Important Links", "Imp Links", "ImportantLinks")) || clean(pick(row, "Important links")),
      whyTheyWin: terminal(pick(row, "Why they win", "Competitive strength")),
      strengths: terminal(pick(row, "Strengths")), weaknesses: terminal(pick(row, "Weaknesses", "Unresolved problem")),
      hirenudgeImplication: clean(pick(row, "HireNudge implication", "Implication")) || (platform.side === "Candidate-side" ? "Assess for a bounded HireNudge test." : "Translate into candidate value before transfer."),
      confidence: terminal(pick(row, "Confidence"), Object.keys(imported).length ? "Low — user-provided research" : "Low"),
      freshness: terminal(pick(row, "Observed date", "Freshness", "Updated at"), "Observation date not recorded"), owner: clean(pick(row, "Owner")) || "Founder’s Office",
      tier: clean(pick(row, "Research tier", "Tier")) || (platform.side === "Candidate-side" ? "Deep" : "Summary"), rowVersion: number(pick(row, "Row version"), 1),
    };
  });

  const featureValues = byRange.get(TABS.features) ?? [];
  const featureHeader = (featureValues[0] ?? []).map(clean);
  const features: Feature[] = featureValues.slice(1).filter((row) => clean(row[0])).map((row) => ({ id: `feature-${slug(clean(row[0]))}`, name: clean(row[0]) }));
  let featureObservations: FeatureObservation[] = [];
  for (const row of featureValues.slice(1)) {
    const featureName = clean(row[0]); if (!featureName) continue;
    featureHeader.slice(1).forEach((name, column) => {
      const availability = clean(row[column + 1]);
      if (!name || !availability || availability === "Unknown") return;
      const platform = platformByName.get(normalizePlatformName(name).toLowerCase()); if (!platform) return;
      featureObservations.push({ id:`feature-observation-${slug(platform.name)}-${slug(featureName)}`, platformId:platform.id, featureId:`feature-${slug(featureName)}`, availability:availability as FeatureObservation["availability"], depth:availability === "Yes" ? 2 : 1, tier:"See source", evidenceStatus:"Observed", sourceId:"", observedDate:"Unknown", confidence:"Medium", notes:"Migrated from feature matrix" });
    });
  }

  const normalizedFeatureRows = rows(TABS.featureObservations);
  if (normalizedFeatureRows.length) featureObservations = normalizedFeatureRows.map((row, index) => ({
    id: clean(pick(row,"ID")) || `feature-observation-${index+1}`, platformId: clean(pick(row,"Platform ID")),
    featureId: clean(pick(row,"Feature ID")), availability: clean(pick(row,"Availability")) as FeatureObservation["availability"],
    depth: number(pick(row,"Depth")), tier: clean(pick(row,"Tier dependency")), evidenceStatus: clean(pick(row,"Research state")),
    researchState: clean(pick(row,"Research state")), sourceId: ids(pick(row,"Source IDs"))[0] || "",
    sourceIds: ids(pick(row,"Source IDs")), observedDate: clean(pick(row,"Observed date")),
    confidence: clean(pick(row,"Confidence")), notes: clean(pick(row,"Notes")), methodology: clean(pick(row,"Methodology")),
    productLine: clean(pick(row,"Product line")), rowVersion: number(pick(row,"Row version"),1),
  })).filter((row) => row.platformId && row.featureId && row.availability);

  let pricing: PriceTier[] = rows(TABS.pricing).map((row, index) => {
    const name = normalizePlatformName(clean(pick(row, "Platform", "Company")));
    return { id:clean(pick(row,"ID","Tier ID")) || `price-${index+1}`, platformId:clean(pick(row,"Platform ID")) || platformId(name), platform:name,
      tier:clean(pick(row,"Tier","Plan")), nativePrice:nullableNumber(pick(row,"Native price","Price")), currency:clean(pick(row,"Currency")) || "USD",
      billingPeriod:clean(pick(row,"Billing period","Billing")), monthlyEquivalent:nullableNumber(pick(row,"Monthly equivalent","Monthly")), limits:clean(pick(row,"Limits","Entitlements")),
      pricingStatus:clean(pick(row,"Pricing status","Status")) || "Observed", tax:clean(pick(row,"Tax")), observedDate:clean(pick(row,"Observed date")), sourceId:clean(pick(row,"Source ID","Source")), rowVersion:number(pick(row,"Row version"),1) };
  }).filter((row) => row.platform && row.tier);

  const normalizedPricingRows = rows(TABS.pricingObservations);
  if (normalizedPricingRows.length) pricing = normalizedPricingRows.map((row,index)=>{
    const pid=clean(pick(row,"Platform ID")); const platform=platforms.find((item)=>item.id===pid)?.name || clean(pick(row,"Platform"));
    return {id:clean(pick(row,"ID"))||`price-${index+1}`,platformId:pid,platform,tier:clean(pick(row,"Tier")),nativePrice:nullableNumber(pick(row,"Native price")),currency:clean(pick(row,"Currency")),billingPeriod:clean(pick(row,"Billing period")),monthlyEquivalent:nullableNumber(pick(row,"Monthly equivalent")),limits:[clean(pick(row,"Credits")),clean(pick(row,"Usage limits")),clean(pick(row,"Seats"))].filter(Boolean).join("; "),pricingStatus:clean(pick(row,"Research state")),tax:clean(pick(row,"Tax")),observedDate:clean(pick(row,"Observed date")),sourceId:ids(pick(row,"Source IDs"))[0]||"",rowVersion:number(pick(row,"Row version"),1)};
  }).filter((row)=>row.platformId&&row.tier);

  const sources: Source[] = rows(TABS.sources).map((row, index) => ({ id:clean(pick(row,"ID","Source ID")) || `source-${index+1}`, title:clean(pick(row,"Title","Source")), url:clean(pick(row,"URL","Link")), type:clean(pick(row,"Type","Source type")), status:terminal(pick(row,"Status","Evidence status")), observedDate:clean(pick(row,"Observed date")), effectiveDate:clean(pick(row,"Effective date")), confidence:terminal(pick(row,"Confidence"),"Low"), reviewer:clean(pick(row,"Reviewer")) || "Founder’s Office" })).filter((row) => row.title || row.url);
  for (const imported of importRows) {
    const name = normalizePlatformName(clean(pick(imported,"Name"))); if (!name) continue;
    sources.push({ id:`source-import-${slug(name)}`, title:`${clean(pick(imported,"Name"))} — attached Research_Div.csv`, url:clean(pick(imported,"URL")), type:"User-provided CSV", status:"Provided research — verification required", observedDate:clean(pick(imported,"Observed date")) || "2026-08-01", effectiveDate:"", confidence:"Low", reviewer:"Unassigned" });
  }

  let reachMetrics: ReachMetric[] = importRows.flatMap((row) => {
    const name = normalizePlatformName(clean(pick(row,"Name"))); const platform = platformByName.get(name.toLowerCase()); if (!platform) return [];
    return clean(pick(row,"Reach")).split("\n").map((line) => line.trim()).filter(Boolean).map((line, index) => ({ id:`reach-${slug(name)}-${index+1}`, platformId:platform.id, channel:/traffic/i.test(line)?"Website traffic":/linkedin/i.test(line)?"LinkedIn":/insta/i.test(line)?"Instagram":/yt/i.test(line)?"YouTube":"Provided reach", valueLabel:line, numericValue:null, unit:"Provided label", methodology:"No source, method or date supplied in attached research CSV", sourceId:`source-import-${slug(name)}`, observedDate:"2026-08-01", confidence:"Low", evidenceStatus:"Provided research — verification required", rowVersion:1 }));
  });
  const normalizedMetricRows=rows(TABS.metricObservations);
  if(normalizedMetricRows.length) reachMetrics=normalizedMetricRows.map((row,index)=>({id:clean(pick(row,"ID"))||`metric-${index+1}`,platformId:clean(pick(row,"Platform ID")),channel:clean(pick(row,"Channel","Metric family")),valueLabel:clean(pick(row,"Value label","Value")),numericValue:nullableNumber(pick(row,"Numeric value")),unit:clean(pick(row,"Unit")),methodology:clean(pick(row,"Methodology")),sourceId:ids(pick(row,"Source IDs"))[0]||"",observedDate:clean(pick(row,"Observed date")),confidence:clean(pick(row,"Confidence")),evidenceStatus:clean(pick(row,"Research state")),rowVersion:number(pick(row,"Row version"),1)})).filter((row)=>row.platformId);
  let gtmObservations: GtmObservation[] = rows(TABS.gtm).map((row,index) => { const name=normalizePlatformName(clean(pick(row,"Platform","Company"))); return { id:clean(pick(row,"ID"))||`gtm-${index+1}`, platformId:clean(pick(row,"Platform ID"))||platformId(name), channel:clean(pick(row,"Channel","Primary channel","GTM motion")), strategy:clean(pick(row,"Strategy","Acquisition strategy","Details")), evidenceStatus:clean(pick(row,"Evidence status","Status")), sourceId:clean(pick(row,"Source ID","Source")), observedDate:clean(pick(row,"Observed date")), confidence:clean(pick(row,"Confidence")), rowVersion:number(pick(row,"Row version"),1) }; }).filter((row)=>platforms.some((platform)=>platform.id===row.platformId));
  const normalizedGtmRows=rows(TABS.gtmObservations);
  if(normalizedGtmRows.length) gtmObservations=normalizedGtmRows.map((row,index)=>({id:clean(pick(row,"ID"))||`gtm-${index+1}`,platformId:clean(pick(row,"Platform ID")),channel:clean(pick(row,"Channel","Motion")),strategy:clean(pick(row,"Strategy","Evidence")),evidenceStatus:clean(pick(row,"Research state")),sourceId:ids(pick(row,"Source IDs"))[0]||"",observedDate:clean(pick(row,"Observed date")),confidence:clean(pick(row,"Confidence")),rowVersion:number(pick(row,"Row version"),1)})).filter((row)=>row.platformId);
  const notes: ResearchNote[] = rows(TABS.notes).map((row,index)=>({ id:clean(pick(row,"ID"))||`note-${index+1}`, platformId:clean(pick(row,"Platform ID")), title:clean(pick(row,"Title")), body:clean(pick(row,"Body","Note")), sourceType:clean(pick(row,"Source type")), evidenceStatus:clean(pick(row,"Evidence status"))||"Needs verification", createdAt:clean(pick(row,"Created at")), createdBy:clean(pick(row,"Created by")), rowVersion:number(pick(row,"Row version"),1) })).filter((row)=>row.platformId);
  const recommendations: TransferOpportunity[] = rows(TABS.opportunities).map((row,index)=>({ id:clean(pick(row,"ID"))||`opportunity-${index+1}`, name:clean(pick(row,"Opportunity","Name")), recommendation:clean(pick(row,"Recommendation","Recommendation type")), priority:clean(pick(row,"Priority")), score:number(pick(row,"Weighted score","Opportunity score","Score")), rationale:clean(pick(row,"Rationale","HireNudge implication")), sourceId:clean(pick(row,"Source ID","Source")), evidenceConfidence:terminal(pick(row,"Evidence confidence","Confidence"),"Low"), feasibility:number(pick(row,"Feasibility")), privacyRisk:clean(pick(row,"Privacy risk","Risk"))||"Review", status:clean(pick(row,"Status"))||"Proposed", reviewer:clean(pick(row,"Reviewer"))||"Founder’s Office" })).filter((row)=>row.name);
  const actions = parseActions(rows(TABS.tracker));
  const discoveries = rows(TABS.discoveries).map((row,index)=>({ id:clean(pick(row,"ID"))||`discovery-${index+1}`, name:clean(pick(row,"Company","Name")), sourceFamily:clean(pick(row,"Source family","Source")), signal:clean(pick(row,"Signal","Why it matters")), status:clean(pick(row,"Status","Evidence status")), transferScore:number(pick(row,"Transfer score","Score")), risk:clean(pick(row,"Risk")) })).filter((row)=>row.name);
  const revision = sync.revision; const lastSync = sync.lastSync;
  const claims:ClaimObservation[]=rows(TABS.claims).map((row,index)=>({id:clean(pick(row,"ID"))||`claim-${index+1}`,platformId:clean(pick(row,"Platform ID")),entityType:clean(pick(row,"Entity type")),fieldKey:clean(pick(row,"Field key")),claim:clean(pick(row,"Claim")),value:clean(pick(row,"Value")),researchState:clean(pick(row,"Research state")),methodology:clean(pick(row,"Methodology")),sourceIds:ids(pick(row,"Source IDs")),observedDate:clean(pick(row,"Observed date")),effectiveDate:clean(pick(row,"Effective date")),confidence:clean(pick(row,"Confidence")),material:boolean(pick(row,"Material")),current:boolean(pick(row,"Current")),supersedesId:clean(pick(row,"Supersedes ID")),reviewer:clean(pick(row,"Reviewer")),reviewedDate:clean(pick(row,"Reviewed date")),createdAt:clean(pick(row,"Created at")),updatedAt:clean(pick(row,"Updated at")),createdBy:clean(pick(row,"Created by")),updatedBy:clean(pick(row,"Updated by")),rowVersion:number(pick(row,"Row version"),1),datasetRevision:number(pick(row,"Dataset revision")),researchRunId:clean(pick(row,"Research run ID")),notes:clean(pick(row,"Notes")),fingerprint:clean(pick(row,"Fingerprint"))})).filter((row)=>row.platformId&&row.fieldKey);
  const modules:CompanyModule[]=rows(TABS.modules).map((row,index)=>({id:clean(pick(row,"ID"))||`module-${index+1}`,platformId:clean(pick(row,"Platform ID")),productLine:clean(pick(row,"Product line")),module:clean(pick(row,"Module")),workflowStage:clean(pick(row,"Workflow stage")),description:clean(pick(row,"Description")),availability:clean(pick(row,"Availability")) as CompanyModule["availability"],depth:number(pick(row,"Depth")),tierDependency:clean(pick(row,"Tier dependency")),api:clean(pick(row,"API")),mobile:clean(pick(row,"Mobile")),extension:clean(pick(row,"Extension")),serviceComponent:clean(pick(row,"Service component")),researchState:clean(pick(row,"Research state")),sourceIds:ids(pick(row,"Source IDs")),observedDate:clean(pick(row,"Observed date")),confidence:clean(pick(row,"Confidence")),indiaRelevance:clean(pick(row,"India relevance")),mobilityRelevance:clean(pick(row,"Global mobility relevance")),hirenudgeTransfer:clean(pick(row,"HireNudge transfer")),risk:clean(pick(row,"Risk")),rowVersion:number(pick(row,"Row version"),1),updatedAt:clean(pick(row,"Updated at")),fingerprint:clean(pick(row,"Fingerprint"))})).filter((row)=>row.platformId&&row.module);
  const news:NewsItem[]=rows(TABS.news).map((row,index)=>({id:clean(pick(row,"ID"))||`news-${index+1}`,headline:clean(pick(row,"Headline")),platformId:clean(pick(row,"Platform ID")),company:clean(pick(row,"Company")),category:clean(pick(row,"Category")),geography:clean(pick(row,"Geography")),signalType:clean(pick(row,"Signal type")),eventDate:clean(pick(row,"Event date")),publicationDate:clean(pick(row,"Publication date")),sourceId:clean(pick(row,"Source ID")),sourceUrl:clean(pick(row,"Source URL")),sourceType:clean(pick(row,"Source type")),extractedFact:clean(pick(row,"Extracted fact")),researchState:clean(pick(row,"Research state")),confidence:clean(pick(row,"Confidence")),whyItMatters:clean(pick(row,"Why it matters to HireNudge")),recommendedResponse:clean(pick(row,"Recommended response")),actionType:clean(pick(row,"Action type")),status:clean(pick(row,"Status")),fingerprint:clean(pick(row,"Fingerprint")),supersedesId:clean(pick(row,"Supersedes ID")),createdAt:clean(pick(row,"Created at")),updatedAt:clean(pick(row,"Updated at")),rowVersion:number(pick(row,"Row version"),1),datasetRevision:number(pick(row,"Dataset revision")),researchRunId:clean(pick(row,"Research run ID"))})).filter((row)=>row.headline&&row.sourceUrl);
  const actionComments:ActionComment[]=rows(TABS.actionComments).map((row,index)=>({id:clean(pick(row,"ID"))||`comment-${index+1}`,actionId:clean(pick(row,"Action ID")),body:clean(pick(row,"Body")),author:clean(pick(row,"Author")),commentType:clean(pick(row,"Comment type")),decision:clean(pick(row,"Decision")),sourceSnapshotId:clean(pick(row,"Source snapshot ID")),createdAt:clean(pick(row,"Created at")),updatedAt:clean(pick(row,"Updated at")),rowVersion:number(pick(row,"Row version"),1),datasetRevision:number(pick(row,"Dataset revision")),parentCommentId:clean(pick(row,"Parent comment ID")),status:clean(pick(row,"Status")),fingerprint:clean(pick(row,"Fingerprint"))})).filter((row)=>row.actionId&&row.body);
  const researchRuns:ResearchRun[]=rows(TABS.researchRuns).map((row,index)=>({id:clean(pick(row,"ID"))||`run-${index+1}`,scope:clean(pick(row,"Scope")),cohort:clean(pick(row,"Cohort")),startedAt:clean(pick(row,"Started at")),completedAt:clean(pick(row,"Completed at")),status:clean(pick(row,"Status")),companiesAttempted:number(pick(row,"Companies attempted")),companiesCompleted:number(pick(row,"Companies completed")),sourcesChecked:number(pick(row,"Sources checked")),claimsProduced:number(pick(row,"Claims produced")),newsItemsProduced:number(pick(row,"News items produced")),errors:clean(pick(row,"Errors")),toolVersion:clean(pick(row,"Tool version")),methodology:clean(pick(row,"Methodology")),actor:clean(pick(row,"Actor")),datasetRevision:number(pick(row,"Dataset revision")),notes:clean(pick(row,"Notes")),fingerprint:clean(pick(row,"Fingerprint"))})).filter((row)=>row.scope);
  const sourceChecks:SourceCheck[]=rows(TABS.sourceChecks).map((row,index)=>({id:clean(pick(row,"ID"))||`check-${index+1}`,sourceId:clean(pick(row,"Source ID")),platformId:clean(pick(row,"Platform ID")),checkedAt:clean(pick(row,"Checked at")),result:clean(pick(row,"Result")),httpStatus:nullableNumber(pick(row,"HTTP status")),fingerprint:clean(pick(row,"Fingerprint")),changed:boolean(pick(row,"Changed")),changeCandidateId:clean(pick(row,"Change candidate ID")),error:clean(pick(row,"Error")),nextDue:clean(pick(row,"Next due")),researchState:clean(pick(row,"Research state")),confidence:clean(pick(row,"Confidence")),researchRunId:clean(pick(row,"Research run ID")),rowVersion:number(pick(row,"Row version"),1),datasetRevision:number(pick(row,"Dataset revision")),notes:clean(pick(row,"Notes")),current:boolean(pick(row,"Current"))})).filter((row)=>row.sourceId);
  const completion:CompanyCompletion[]=rows(TABS.completion).map((row)=>({platformId:clean(pick(row,"Platform ID")),company:clean(pick(row,"Company")),cohort:clean(pick(row,"Cohort")),completionPercentage:number(pick(row,"Completion percentage")),terminalFields:number(pick(row,"Terminal fields")),requiredFields:number(pick(row,"Required fields")),sourceCoveragePercentage:number(pick(row,"Source coverage percentage")),freshness:clean(pick(row,"Freshness")),status:clean(pick(row,"Status")),blockers:clean(pick(row,"Blockers")),lastResearchRun:clean(pick(row,"Last research run")),reviewedBy:clean(pick(row,"Reviewed by")),reviewedDate:clean(pick(row,"Reviewed date")),rowVersion:number(pick(row,"Row version"),1),datasetRevision:number(pick(row,"Dataset revision")),featureCompletion:number(pick(row,"Feature completion")),pricingCompletion:number(pick(row,"Pricing completion")),gtmCompletion:number(pick(row,"GTM completion"))})).filter((row)=>row.platformId);
  const claimValue=(platformId:string,field:string,fallback="Not found after exhaustive search")=>claims.find((claim)=>claim.platformId===platformId&&claim.fieldKey===field&&claim.current)?.value||fallback;
  const watchPlatforms:Platform[]=completion.filter((row)=>row.cohort==="Watchlist"&&!platforms.some((platform)=>platform.id===row.platformId)).map((row)=>({id:row.platformId,name:row.company,category:claimValue(row.platformId,"category","Emerging / adjacent"),geography:claimValue(row.platformId,"geography","Not publicly disclosed"),website:claimValue(row.platformId,"official_website",""),side:claimValue(row.platformId,"side","Emerging / adjacent"),lifecycle:claimValue(row.platformId,"lifecycle"),evidenceStatus:row.status,sourceFreshness:row.freshness,classificationSource:"Normalized research manifest",reviewDue:"",rowVersion:row.rowVersion}));
  const watchProfiles:CompetitorProfile[]=watchPlatforms.map((platform)=>{const completionRow=completion.find((row)=>row.platformId===platform.id);const sourceIds=claims.filter((claim)=>claim.platformId===platform.id).flatMap((claim)=>claim.sourceIds);return{id:`profile-${slug(platform.name)}`,platformId:platform.id,location:claimValue(platform.id,"headquarters",platform.geography),founder:"Not publicly disclosed",founderUrl:"",productSummary:claimValue(platform.id,"jobs_to_be_done",claimValue(platform.id,"positioning")),featuresSummary:modules.filter((module)=>module.platformId===platform.id).map((module)=>module.module).join("\n")||"No material product module found across checked public sources",usp:claimValue(platform.id,"usp"),acquisitionStrategy:claimValue(platform.id,"gtm"),reachSummary:claimValue(platform.id,"observable_reach"),pricingSummary:claimValue(platform.id,"pricing"),revenueStatus:claimValue(platform.id,"revenue_status","Not publicly disclosed"),importantLinks:sources.filter((source)=>sourceIds.includes(source.id)).slice(0,8).map((source)=>source.url).join("\n"),whyTheyWin:claimValue(platform.id,"strengths"),strengths:claimValue(platform.id,"strengths"),weaknesses:claimValue(platform.id,"weaknesses"),hirenudgeImplication:claimValue(platform.id,"hirenudge_recommendation"),confidence:completionRow?.status==="Green"?"High":"Medium — quality gates open",freshness:completionRow?.freshness||"Observation date not recorded",owner:"Founder’s Office",tier:"Watchlist",rowVersion:completionRow?.rowVersion||1,coveragePercentage:completionRow?.completionPercentage,freshnessStatus:completionRow?.status}});
  const enhancedPlatforms=platforms.map((platform)=>{const completionRow=completion.find((row)=>row.platformId===platform.id);return completionRow?.status==="Green"?{...platform,evidenceStatus:"Green",sourceFreshness:completionRow.freshness}:platform;});
  const enhancedProfiles=profiles.map((profile)=>{
    const completionRow=completion.find((row)=>row.platformId===profile.platformId);
    if(completionRow?.status!=="Green")return profile;
    const linkedSourceIds=claims.filter((claim)=>claim.platformId===profile.platformId).flatMap((claim)=>claim.sourceIds);
    return {...profile,
      location:claimValue(profile.platformId,"headquarters",profile.location),
      productSummary:claimValue(profile.platformId,"jobs_to_be_done",profile.productSummary),
      featuresSummary:modules.filter((module)=>module.platformId===profile.platformId).map((module)=>module.module).join("\n")||profile.featuresSummary,
      usp:claimValue(profile.platformId,"usp",profile.usp), acquisitionStrategy:claimValue(profile.platformId,"gtm",profile.acquisitionStrategy),
      reachSummary:claimValue(profile.platformId,"observable_reach",profile.reachSummary), pricingSummary:claimValue(profile.platformId,"pricing",profile.pricingSummary),
      revenueStatus:claimValue(profile.platformId,"revenue_status",profile.revenueStatus),
      importantLinks:sources.filter((source)=>linkedSourceIds.includes(source.id)).slice(0,8).map((source)=>source.url).join("\n")||profile.importantLinks,
      whyTheyWin:claimValue(profile.platformId,"strengths",profile.whyTheyWin), strengths:claimValue(profile.platformId,"strengths",profile.strengths),
      weaknesses:claimValue(profile.platformId,"weaknesses",profile.weaknesses), hirenudgeImplication:claimValue(profile.platformId,"hirenudge_recommendation",profile.hirenudgeImplication),
      confidence:"High", freshness:completionRow.freshness, coveragePercentage:completionRow.completionPercentage, freshnessStatus:completionRow.status,
    };
  });
  const allPlatforms=[...enhancedPlatforms,...watchPlatforms]; const allProfiles=[...enhancedProfiles,...watchProfiles];
  return { platforms:allPlatforms, profiles:allProfiles, aliases, importedResearch:importRows, watchlist:watchPlatforms, features, featureObservations, pricing, sources, reachMetrics, gtmObservations, notes, discoveries, recommendations, actions, claims, modules, news, actionComments, researchRuns, sourceChecks, completion, meta:{ datasetRevision:revision, generatedAt:new Date().toISOString(), coreCount:platforms.length, watchlistCount:watchPlatforms.length||discoveries.length, approvedCount:sources.filter((source)=>/approved|verified/i.test(source.status)).length, sourceCount:sources.length, mode:"google-sheets", lastSync, health:"Connected", sheetUrl } };
}

function parseActions(rows: Array<Record<string, unknown>>): ActionItem[] {
  return rows.map((row) => ({ id:clean(pick(row,"ID")), title:clean(pick(row,"Action","Title")), sourceId:clean(pick(row,"Source ID")), customerProblem:clean(pick(row,"Customer problem")), intendedOutcome:clean(pick(row,"Intended outcome")), recommendationType:clean(pick(row,"Recommendation type")), actionType:clean(pick(row,"Action type"))||"Discuss", owner:clean(pick(row,"Owner"))||"Priyansh; Baskaran", coOwners:ids(pick(row,"Co-owners","Owner")).length?ids(pick(row,"Co-owners","Owner")):["Priyansh","Baskaran"], dueDate:clean(pick(row,"Due date")), priority:clean(pick(row,"Priority"))||"P2", effort:clean(pick(row,"Effort"))||"M", risk:clean(pick(row,"Risk"))||"Review", confidence:terminal(pick(row,"Confidence"),"Low"), experiment:clean(pick(row,"Experiment")), baseline:clean(pick(row,"Baseline")), successMetric:clean(pick(row,"Success metric")), threshold:clean(pick(row,"Threshold")), status:clean(pick(row,"Status"))||"Proposed", decision:clean(pick(row,"Decision"))||"Pending", resultNotes:clean(pick(row,"Result notes")), rowVersion:number(pick(row,"Row version"),1), createdAt:clean(pick(row,"Created at")), updatedAt:clean(pick(row,"Updated at")), updatedBy:clean(pick(row,"Updated by")) })).filter((row)=>row.id && row.title);
}

export async function readActions() { return parseActions(table((await getSheetsClient().spreadsheets.values.get({spreadsheetId,range:`'${TABS.tracker}'!A4:Z500`})).data.values ?? undefined)); }

export class VersionConflictError extends Error { constructor(public current: ActionItem, public submitted: Partial<ActionItem>) { super("Tracker item changed since it was loaded."); } }
export class EvidenceVersionConflictError extends Error { constructor(public current: ReviewItem, public submitted: { decision:string; rowVersion:number }) { super("Evidence item changed since it was loaded."); } }

async function sheetContext(tab:string) {
  const sheets=getSheetsClient(); const [meta,values,revision]=await Promise.all([
    sheets.spreadsheets.get({spreadsheetId,fields:"sheets.properties"}),
    sheets.spreadsheets.values.get({spreadsheetId,range:`'${tab}'!A4:Z1000`}), readDatasetRevision(),
  ]);
  const sheetId=meta.data.sheets?.find((sheet)=>sheet.properties?.title===tab)?.properties?.sheetId;
  const auditId=meta.data.sheets?.find((sheet)=>sheet.properties?.title===TABS.audit)?.properties?.sheetId;
  const metaId=meta.data.sheets?.find((sheet)=>sheet.properties?.title===TABS.meta)?.properties?.sheetId;
  if(sheetId==null||auditId==null||metaId==null) throw new Error("Required Google Sheet tabs are missing.");
  const valuesRows=values.data.values??[]; const headers=(valuesRows[0]??[]).map(clean);
  return {sheets,sheetId,auditId,metaId,headers,rows:valuesRows.slice(1),revision};
}

const cell=(value:unknown):sheets_v4.Schema$CellData => typeof value==="number"?{userEnteredValue:{numberValue:value}}:{userEnteredValue:{stringValue:clean(value)}};
function auditRow(actor:string,kind:string,recordId:string,oldValue:string,newValue:string){return {values:[cell(`audit-${crypto.randomUUID()}`),cell(new Date().toISOString()),cell(actor),cell(kind),cell(recordId),cell(oldValue),cell(newValue)]};}
function metaRequests(metaId:number,revision:number,now:string){return [
  {updateCells:{range:{sheetId:metaId,startRowIndex:1,endRowIndex:2,startColumnIndex:1,endColumnIndex:2},rows:[{values:[cell(revision+1)]}],fields:"userEnteredValue"}},
  {updateCells:{range:{sheetId:metaId,startRowIndex:2,endRowIndex:3,startColumnIndex:1,endColumnIndex:2},rows:[{values:[cell(now)]}],fields:"userEnteredValue"}},
];}

export async function createAction(action:ActionItem,actor:string):Promise<ActionItem>{
  const ctx=await sheetContext(TABS.tracker); const now=new Date().toISOString(); const next={...action,rowVersion:1,createdAt:now,updatedAt:now,updatedBy:actor};
  const row=[next.id,next.title,next.sourceId,next.customerProblem,next.intendedOutcome,next.recommendationType,next.owner,next.dueDate,next.priority,next.effort,next.risk,next.confidence,next.experiment,next.baseline,next.successMetric,next.threshold,next.status,next.decision,next.resultNotes,next.rowVersion,next.createdAt,next.updatedAt,next.updatedBy];
  const target=TABLE_START-1+ctx.rows.length;
  await ctx.sheets.spreadsheets.batchUpdate({spreadsheetId,requestBody:{requests:[
    {updateCells:{range:{sheetId:ctx.sheetId,startRowIndex:target,endRowIndex:target+1,startColumnIndex:0,endColumnIndex:row.length},rows:[{values:row.map(cell)}],fields:"userEnteredValue"}},
    {appendCells:{sheetId:ctx.auditId,rows:[auditRow(actor,"Action created",next.id,"",JSON.stringify(next))],fields:"userEnteredValue"}},
    ...metaRequests(ctx.metaId,ctx.revision.revision,now),
  ]}}); invalidateDataset(); return next;
}

export async function updateAction(id:string,changes:Partial<ActionItem>,submittedVersion:number,actor:string):Promise<ActionItem>{
  const ctx=await sheetContext(TABS.tracker); const parsed=parseActions(table([ctx.headers, ...ctx.rows])); const index=parsed.findIndex((row)=>row.id===id);
  if(index<0) throw new Error("Tracker item not found."); const current=parsed[index]; if(current.rowVersion!==submittedVersion) throw new VersionConflictError(current,changes);
  const next={...current,...changes,rowVersion:current.rowVersion+1,updatedAt:new Date().toISOString(),updatedBy:actor};
  const editable:Record<string,unknown>={owner:next.owner,duedate:next.dueDate,priority:next.priority,status:next.status,decision:next.decision,resultnotes:next.resultNotes,rowversion:next.rowVersion,updatedat:next.updatedAt,updatedby:next.updatedBy};
  const values=ctx.headers.map((header,column)=>editable[key(header)]===undefined?{column,cell:null}:{column,cell:cell(editable[key(header)])}).filter((item)=>item.cell);
  const sheetRow=TABLE_START-1+index; const requests:sheets_v4.Schema$Request[]=values.map((item)=>({updateCells:{range:{sheetId:ctx.sheetId,startRowIndex:sheetRow,endRowIndex:sheetRow+1,startColumnIndex:item.column,endColumnIndex:item.column+1},rows:[{values:[item.cell!]}],fields:"userEnteredValue"}}));
  requests.push({appendCells:{sheetId:ctx.auditId,rows:[auditRow(actor,"Action updated",id,JSON.stringify(current),JSON.stringify(next))],fields:"userEnteredValue"}},...metaRequests(ctx.metaId,ctx.revision.revision,next.updatedAt));
  await ctx.sheets.spreadsheets.batchUpdate({spreadsheetId,requestBody:{requests}}); invalidateDataset(); return next;
}

async function createSimpleRecord(tab:string,record:Record<string,unknown>,actor:string,kind:string){
  const ctx=await sheetContext(tab); const normalized=new Map(Object.entries(record).map(([k,v])=>[key(k),v]));
  const row=ctx.headers.map((header)=>cell(normalized.get(key(header))??"")); const now=new Date().toISOString(); const recordId=clean(record.id);
  const target=TABLE_START-1+ctx.rows.length;
  await ctx.sheets.spreadsheets.batchUpdate({spreadsheetId,requestBody:{requests:[
    {updateCells:{range:{sheetId:ctx.sheetId,startRowIndex:target,endRowIndex:target+1,startColumnIndex:0,endColumnIndex:row.length},rows:[{values:row}],fields:"userEnteredValue"}},
    {appendCells:{sheetId:ctx.auditId,rows:[auditRow(actor,kind,recordId,"",JSON.stringify(record))],fields:"userEnteredValue"}},
    ...metaRequests(ctx.metaId,ctx.revision.revision,now),
  ]}}); invalidateDataset(); return record;
}

export async function createSource(source:Source & {platformId:string;claim:string;rowVersion:number},actor:string){return createSimpleRecord(TABS.sources,{...source,"Created at":new Date().toISOString(),"Created by":actor},actor,"Source created");}
export async function createResearchNote(note:ResearchNote,actor:string){return createSimpleRecord(TABS.notes,{...note,createdAt:new Date().toISOString(),createdBy:actor,rowVersion:1},actor,"Research note created");}

async function createNormalizedRecord(tab:string,record:Record<string,unknown>,actor:string,kind:string){
  const sheets=getSheetsClient(); const [meta,values,revision]=await Promise.all([
    sheets.spreadsheets.get({spreadsheetId,fields:"sheets.properties"}),
    sheets.spreadsheets.values.get({spreadsheetId,range:`'${tab}'!A1:Z5000`}), readDatasetRevision(),
  ]);
  const sheetId=meta.data.sheets?.find((sheet)=>sheet.properties?.title===tab)?.properties?.sheetId;
  const auditId=meta.data.sheets?.find((sheet)=>sheet.properties?.title===TABS.audit)?.properties?.sheetId;
  const metaId=meta.data.sheets?.find((sheet)=>sheet.properties?.title===TABS.meta)?.properties?.sheetId;
  if(sheetId==null||auditId==null||metaId==null)throw new Error(`Required normalized tab is missing: ${tab}`);
  const allRows=values.data.values??[]; const headers=(allRows[0]??[]).map(clean); const normalized=new Map(Object.entries(record).map(([k,v])=>[key(k),v]));
  const row=headers.map((header)=>cell(Array.isArray(normalized.get(key(header)))?(normalized.get(key(header)) as unknown[]).join("\n"):normalized.get(key(header))??"")); const now=new Date().toISOString(); const recordId=clean(record.id);
  const target=Math.max(1,allRows.length); await sheets.spreadsheets.batchUpdate({spreadsheetId,requestBody:{requests:[
    {updateCells:{range:{sheetId,startRowIndex:target,endRowIndex:target+1,startColumnIndex:0,endColumnIndex:row.length},rows:[{values:row}],fields:"userEnteredValue"}},
    {appendCells:{sheetId:auditId,rows:[auditRow(actor,kind,recordId,"",JSON.stringify(record))],fields:"userEnteredValue"}},
    ...metaRequests(metaId,revision.revision,now),
  ]}}); invalidateDataset(); return record;
}

export async function createActionComment(comment:ActionComment,actor:string){return createNormalizedRecord(TABS.actionComments,{...comment},actor,"Action comment created");}
export async function createSourceCheck(check:SourceCheck,actor="Vercel Cron"){return createNormalizedRecord(TABS.sourceChecks,{...check},actor,"Source checked");}
export async function createNewsItem(news:NewsItem,actor="Vercel Cron"){return createNormalizedRecord(TABS.news,{...news},actor,"News item collected");}

function parseReviewItems(rows:Array<Record<string,unknown>>):ReviewItem[]{return rows.map((row)=>({id:clean(pick(row,"ID")),workflowState:clean(pick(row,"Workflow state","Status")),claim:clean(pick(row,"Claim")),url:clean(pick(row,"URL")),sourceType:clean(pick(row,"Source type","Type")),observedDate:clean(pick(row,"Observed date")),currentStatus:clean(pick(row,"Current status","Evidence status")),reviewer:clean(pick(row,"Reviewer")),decision:clean(pick(row,"Decision")),rowVersion:number(pick(row,"Row version"),1),task:clean(pick(row,"Task"))})).filter((row)=>row.id);}
export async function readReviewItems():Promise<ReviewItem[]>{const result=await getSheetsClient().spreadsheets.values.get({spreadsheetId,range:`'${TABS.evidence}'!A4:Z500`});return parseReviewItems(table(result.data.values??undefined));}
export async function reviewEvidence(id:string,decision:"Approved"|"Rejected"|"Superseded",submittedVersion:number,actor:string):Promise<ReviewItem>{
  const ctx=await sheetContext(TABS.evidence); const items=parseReviewItems(table([ctx.headers,...ctx.rows])); const index=items.findIndex((row)=>row.id===id); if(index<0)throw new Error("Evidence review item not found."); const current=items[index]; if(current.rowVersion!==submittedVersion)throw new EvidenceVersionConflictError(current,{decision,rowVersion:submittedVersion}); const now=new Date().toISOString(); const next={...current,workflowState:decision,currentStatus:decision==="Approved"?"Verified":decision,reviewer:actor,decision,rowVersion:current.rowVersion+1}; const values:Record<string,unknown>={workflowstate:next.workflowState,currentstatus:next.currentStatus,reviewer:next.reviewer,decision:next.decision,rowversion:next.rowVersion}; const rowIndex=TABLE_START-1+index; const requests:sheets_v4.Schema$Request[]=ctx.headers.flatMap((header,column)=>values[key(header)]===undefined?[]:[{updateCells:{range:{sheetId:ctx.sheetId,startRowIndex:rowIndex,endRowIndex:rowIndex+1,startColumnIndex:column,endColumnIndex:column+1},rows:[{values:[cell(values[key(header)])]}],fields:"userEnteredValue"}}]); requests.push({appendCells:{sheetId:ctx.auditId,rows:[auditRow(actor,"Evidence reviewed",id,JSON.stringify(current),JSON.stringify(next))],fields:"userEnteredValue"}},...metaRequests(ctx.metaId,ctx.revision.revision,now)); await ctx.sheets.spreadsheets.batchUpdate({spreadsheetId,requestBody:{requests}}); invalidateDataset(); return next;
}
export async function appendReviewEvent(job:string,details:string){const record={id:`review-${crypto.randomUUID()}`,workflowState:"Needs verification",claim:details,url:"",sourceType:"Automated discovery",observedDate:new Date().toISOString().slice(0,10),currentStatus:"Draft",reviewer:"Unassigned",decision:"",rowVersion:1,task:job};return createSimpleRecord(TABS.evidence,record,"Vercel Cron","Review draft created");}
