export type EvidenceStatus = "Discovered" | "Needs verification" | "In review" | "Approved" | "Superseded" | "Rejected";
export type ResearchState =
  | "Verified"
  | "Observed"
  | "Company claim"
  | "Analyst inference"
  | "Third-party estimate"
  | "Not offered"
  | "Not applicable"
  | "Not publicly disclosed"
  | "Not found after exhaustive search"
  | "Conflicting evidence"
  | "Stale — refresh due"
  | "Internal verified"
  | "Founder’s Office confirmed";
export type Availability = "Yes" | "Partial" | "Paid-only" | "Planned" | "No";
export type RecommendationType = "Copy" | "Adapt" | "Integrate" | "Partner" | "Avoid" | "Differentiate" | "Watch" | "Test" | "Build / Test" | "Partner / Test";
export type ActionType = "Add" | "Improve" | "Remove" | "Discuss" | "Research" | "Test" | "Partner" | "Watch" | "Defer";
export type ActionStatus = "Proposed" | "Discussing" | "Approved" | "Planned" | "In progress" | "Validating" | "Done" | "Rejected" | "Deferred";

export interface Platform {
  id: string; name: string; category: string; geography: string; website: string; side: string;
  lifecycle: string; evidenceStatus: string; sourceFreshness: string; classificationSource: string;
  reviewDue: string; rowVersion: number;
}
export interface CompetitorProfile {
  id: string; platformId: string; location: string; founder: string; founderUrl: string; productSummary: string;
  featuresSummary: string; usp: string; acquisitionStrategy: string; reachSummary: string; pricingSummary: string;
  revenueStatus: string; importantLinks: string; whyTheyWin: string; strengths: string; weaknesses: string;
  hirenudgeImplication: string; confidence: string; freshness: string; owner: string; tier: "Deep" | "Summary" | string;
  rowVersion: number;
  coveragePercentage?: number; freshnessStatus?: "Fresh" | "Refresh due" | "Stale" | string;
  lifecycle?: string; ownership?: string; acquisitionHistory?: string; icp?: string; buyer?: string; user?: string;
  jobsToBeDone?: string; businessModel?: string; promise?: string; wedge?: string; moat?: string;
  trustSummary?: string; reviewThemes?: string; indiaRelevance?: string; mobilityRelevance?: string;
  smallestExperiment?: string; expectedOutcome?: string; riskSummary?: string;
}
export interface ReachMetric {
  id: string; platformId: string; channel: string; valueLabel: string; numericValue: number | null; unit: string;
  methodology: string; sourceId: string; observedDate: string; confidence: string; evidenceStatus: string; rowVersion: number;
}
export interface GtmObservation {
  id: string; platformId: string; channel: string; strategy: string; evidenceStatus: string; sourceId: string;
  observedDate: string; confidence: string; rowVersion: number;
}
export interface ResearchNote {
  id: string; platformId: string; title: string; body: string; sourceType: string; evidenceStatus: string;
  createdAt: string; createdBy: string; rowVersion: number;
}
export interface SourceObservation {
  id: string; platformId: string; sourceId: string; claim: string; observedDate: string; confidence: string;
  evidenceStatus: string; rowVersion: number;
}
export interface Feature { id: string; name: string }
export interface FeatureObservation {
  id: string; platformId: string; featureId: string; availability: Availability; depth: number; tier: string;
  evidenceStatus: string; sourceId: string; observedDate: string; confidence: string; notes: string;
  researchState?: ResearchState | string; sourceIds?: string[]; methodology?: string; productLine?: string; rowVersion?: number;
}
export interface PriceTier {
  id: string; platformId: string; platform: string; tier: string; nativePrice: number | null; currency: string;
  billingPeriod: string; monthlyEquivalent: number | null; limits: string; pricingStatus: string; tax: string;
  observedDate: string; sourceId: string; rowVersion: number;
}
export interface Source {
  id: string; title: string; url: string; type: string; status: string; observedDate: string; effectiveDate: string;
  confidence: string; reviewer: string;
}

export interface ClaimObservation {
  id: string; platformId: string; entityType: string; fieldKey: string; claim: string; value: string;
  researchState: ResearchState | string; methodology: string; sourceIds: string[]; observedDate: string;
  effectiveDate: string; confidence: string; material: boolean; current: boolean; supersedesId: string;
  reviewer: string; reviewedDate: string; createdAt: string; updatedAt: string; createdBy: string;
  updatedBy: string; rowVersion: number; datasetRevision: number; researchRunId: string; notes: string; fingerprint: string;
}

export interface CompanyModule {
  id: string; platformId: string; productLine: string; module: string; workflowStage: string; description: string;
  availability: Availability; depth: number; tierDependency: string; api: string; mobile: string; extension: string;
  serviceComponent: string; researchState: ResearchState | string; sourceIds: string[]; observedDate: string;
  confidence: string; indiaRelevance: string; mobilityRelevance: string; hirenudgeTransfer: string; risk: string;
  rowVersion: number; updatedAt: string; fingerprint: string;
}

export interface NewsItem {
  id: string; headline: string; platformId: string; company: string; category: string; geography: string;
  signalType: "Product" | "Pricing" | "GTM" | "Funding" | "Regulatory" | "Trust" | "Market" | "Launch" | string;
  eventDate: string; publicationDate: string; sourceId: string; sourceUrl: string; sourceType: string;
  extractedFact: string; researchState: ResearchState | string; confidence: string; whyItMatters: string;
  recommendedResponse: string; actionType: ActionType | string; status: "Published" | "Draft recommendation" | "Archived" | "Superseded" | string;
  fingerprint: string; supersedesId: string; createdAt: string; updatedAt: string; rowVersion: number;
  datasetRevision: number; researchRunId: string;
}

export interface ActionOrigin {
  entityType: "platform" | "feature" | "price" | "gtm" | "metric" | "news" | "recommendation" | "source" | "gap" | string;
  entityId: string; snapshot: string; sourceIds: string[];
}

export interface ActionComment {
  id: string; actionId: string; body: string; author: "Founder’s Office" | "Priyansh" | "Baskaran" | "Divyansh" | string;
  commentType: "Comment" | "Question" | "Decision" | "Evidence" | string; decision: string;
  sourceSnapshotId: string; createdAt: string; updatedAt: string; rowVersion: number; datasetRevision: number;
  parentCommentId: string; status: string; fingerprint: string;
}

export interface ResearchRun {
  id: string; scope: string; cohort: string; startedAt: string; completedAt: string; status: string;
  companiesAttempted: number; companiesCompleted: number; sourcesChecked: number; claimsProduced: number;
  newsItemsProduced: number; errors: string; toolVersion: string; methodology: string; actor: string;
  datasetRevision: number; notes: string; fingerprint: string;
}

export interface SourceCheck {
  id: string; sourceId: string; platformId: string; checkedAt: string; result: string; httpStatus: number | null;
  fingerprint: string; changed: boolean; changeCandidateId: string; error: string; nextDue: string;
  researchState: ResearchState | string; confidence: string; researchRunId: string; rowVersion: number;
  datasetRevision: number; notes: string; current: boolean;
}

export interface CompanyCompletion {
  platformId: string; company: string; cohort: "Core" | "Watchlist" | string; completionPercentage: number;
  terminalFields: number; requiredFields: number; sourceCoveragePercentage: number; freshness: string;
  status: "Red" | "Amber" | "Green" | string; blockers: string; lastResearchRun: string; reviewedBy: string;
  reviewedDate: string; rowVersion: number; datasetRevision: number; featureCompletion: number;
  pricingCompletion: number; gtmCompletion: number;
}
export interface ReviewItem {
  id: string; workflowState: string; claim: string; url: string; sourceType: string; observedDate: string;
  currentStatus: string; reviewer: string; decision: string; rowVersion: number; task: string;
}
export interface TransferOpportunity {
  id: string; name: string; recommendation: RecommendationType | string; priority: string; score: number;
  rationale: string; sourceId: string; evidenceConfidence: string; feasibility: number; privacyRisk: string;
  status: string; reviewer: string;
}
export interface ActionItem {
  id: string; title: string; sourceId: string; customerProblem: string; intendedOutcome: string;
  recommendationType: string; owner: string; dueDate: string; priority: string; effort: string; risk: string;
  confidence: string; experiment: string; baseline: string; successMetric: string; threshold: string; status: string;
  decision: string; resultNotes: string; rowVersion: number; createdAt: string; updatedAt: string; updatedBy?: string;
  actionType?: ActionType | string; coOwners?: string[]; origin?: ActionOrigin; dependencies?: string;
}
export interface SyncMetadata {
  datasetRevision: number; generatedAt: string; coreCount: number; watchlistCount: number; approvedCount: number;
  sourceCount: number; mode?: "seed" | "google-sheets" | "unavailable"; lastSync?: string; health?: string; sheetUrl?: string;
}
export interface IntelligenceData {
  platforms: Platform[]; watchlist: Array<Platform | Record<string, unknown>>; features: Feature[];
  featureObservations: FeatureObservation[]; pricing: PriceTier[]; sources: Source[];
  discoveries: Array<Record<string, unknown>>; recommendations: TransferOpportunity[]; actions: ActionItem[];
  profiles: CompetitorProfile[]; reachMetrics: ReachMetric[]; gtmObservations: GtmObservation[]; notes: ResearchNote[];
  aliases: Array<{ id: string; alias: string; platformId: string }>;
  importedResearch: Array<Record<string, unknown>>;
  claims: ClaimObservation[]; modules: CompanyModule[]; news: NewsItem[]; actionComments: ActionComment[];
  researchRuns: ResearchRun[]; sourceChecks: SourceCheck[]; completion: CompanyCompletion[];
  meta: SyncMetadata;
}
