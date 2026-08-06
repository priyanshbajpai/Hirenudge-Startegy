export const requirementCategories = ["Current", "Must Have", "Important", "Good to Have", "To Be Decided", "Not Recommended"] as const;
export const deliveryStatuses = ["Not Started", "Researching", "In Design", "In Development", "Blocked", "In QA", "Done"] as const;
export const decisionStatuses = ["To Be Discussed", "Approved", "Deferred", "Rejected"] as const;
export const evidenceStatuses = ["Verified", "Observed", "Discussed", "In Progress", "Proposed", "Requires Verification", "Blocked"] as const;
export const usabilityRatings = ["Good", "Mixed", "Needs Improvement", "Poor", "Unknown"] as const;
export const complianceStates = ["Applies", "Possibly Applies", "Legal Review Required", "Not Applicable", "Blocked"] as const;
export const roadmapHorizons = ["Now", "Next", "Later", "Research", "Blocked"] as const;
export const founderPriorities = ["P0 — Must Have", "P1 — Important", "P2 — Good to Have", "P3 — Later"] as const;
export const workspaces = ["Landing Page", "Onboarding", "Product Modules", "GTM & First 100", "Social", "Activation & Retention", "Operations"] as const;

export type RequirementCategory = (typeof requirementCategories)[number];
export type DeliveryStatus = (typeof deliveryStatuses)[number];
export type DecisionStatus = (typeof decisionStatuses)[number];
export type EvidenceStatus = (typeof evidenceStatuses)[number];
export type UsabilityRating = (typeof usabilityRatings)[number];
export type ComplianceState = (typeof complianceStates)[number];
export type RoadmapHorizon = (typeof roadmapHorizons)[number];
export type FounderPriority = (typeof founderPriorities)[number];
export type PrdWorkspace = (typeof workspaces)[number];

export interface EvidenceSource {
  label: string;
  url?: string;
  accessDate: string;
  claimSupported: string;
  reliability: "Primary" | "Supplied evidence" | "Internal discussion" | "Secondary";
  limitation: string;
}

export interface PrdRecord {
  id: string;
  sourceIds: string[];
  canonicalGroup: string;
  workspace: PrdWorkspace;
  productArea: string;
  module: string;
  screen: string;
  title: string;
  requirementType: string;
  currentBehaviour: string;
  currentEvidenceLimitation: string;
  userProblem: string;
  proposedChange: string;
  acceptanceCriteria: string[];
  category: RequirementCategory;
  aiSuggestedPriority: FounderPriority;
  founderPriority: FounderPriority | null;
  decisionStatus: DecisionStatus;
  deliveryStatus: DeliveryStatus;
  planningEta: string | null;
  owner: string;
  usabilityRating: UsabilityRating;
  usabilityRationale: string;
  expectedUserImpact: string;
  expectedBusinessImpact: string;
  effort: string;
  technicalDependencies: string[];
  dataDependencies: string[];
  partnerIds: string[];
  complianceIds: string[];
  risks: string[];
  successMetrics: string[];
  evidenceStatus: EvidenceStatus;
  evidenceSources: EvidenceSource[];
  confidence: "High" | "Medium" | "Low";
  founderQuestion: string;
  notes: string;
  roadmapHorizon: RoadmapHorizon;
}

export interface PartnerRecord {
  id: string;
  name: string;
  category: string;
  applicableModules: string[];
  proposedUse: string;
  officialUrl: string | null;
  apiAvailability: string;
  authentication: string;
  pricingEvidence: string;
  commercialUseStatus: string;
  dataHandled: string[];
  securityRequirements: string[];
  legalDependencies: string[];
  implementationComplexity: "Low" | "Medium" | "High" | "Unknown";
  recommendation: string;
  verificationState: "Verified official source" | "Requires commercial confirmation" | "Name/vendor confirmation required";
}

export interface ComplianceRecord {
  id: string;
  regime: string;
  applicableModules: string[];
  dataInvolved: string[];
  processingPurpose: string;
  obligation: string;
  productControl: string;
  releaseGate: string;
  state: ComplianceState;
  confirmationOwner: string;
  officialUrl: string;
  limitation: string;
}

export interface PrdFilters {
  query: string;
  workspaces: string[];
  modules: string[];
  categories: RequirementCategory[];
  deliveryStatuses: DeliveryStatus[];
  decisionStatuses: DecisionStatus[];
  evidenceStatuses: EvidenceStatus[];
  owners: string[];
  horizons: RoadmapHorizon[];
  complianceStates: ComplianceState[];
}
