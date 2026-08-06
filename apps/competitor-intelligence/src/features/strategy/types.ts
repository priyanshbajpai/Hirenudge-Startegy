export const priorities = [
  "P0 — Must Have",
  "P1 — Important",
  "P2 — Good to Have",
  "P3 — Later",
] as const;

export const decisionStatuses = ["To Be Discussed", "Approved", "Deferred", "Rejected"] as const;
export const roadmapHorizons = ["Now", "Next", "Later", "Research", "Blocked"] as const;
export const initiativeTypes = [
  "Existing",
  "Improvement",
  "In Progress",
  "Proposed",
  "Research Required",
  "Experiment",
  "Compliance Requirement",
  "Operational Requirement",
  "Not Recommended",
] as const;

export const evidenceStatuses = [
  "Verified",
  "Observed",
  "Discussed",
  "In Progress",
  "Proposed",
  "Requires Verification",
  "Blocked",
] as const;

export const moduleOptions = [
  "Nudge Studio",
  "AI Job Matcher",
  "Application Tracking",
  "Interview Preparation",
  "Outreach",
  "Portfolio",
  "Onboarding",
  "Retention",
  "Job Data",
  "Other",
] as const;

export type Priority = (typeof priorities)[number];
export type DecisionStatus = (typeof decisionStatuses)[number];
export type RoadmapHorizon = (typeof roadmapHorizons)[number];
export type InitiativeType = (typeof initiativeTypes)[number];
export type EvidenceStatus = (typeof evidenceStatuses)[number];
export type ProductModule = (typeof moduleOptions)[number];

export interface Initiative {
  id: string;
  title: string;
  workstream: string;
  sub_workstream: string;
  initiative_type: InitiativeType;
  current_state: string;
  problem: string;
  recommendation: string;
  target_user: string;
  evidence_status: EvidenceStatus;
  evidence_sources: string[];
  confidence: string;
  expected_user_impact: string;
  expected_business_impact: string;
  effort: string;
  technical_dependencies: string[];
  data_dependencies: string[];
  legal_dependencies: string[];
  risks: string[];
  success_metrics: string[];
  ai_suggested_priority: Priority;
  founder_priority: Priority | null;
  decision_status: DecisionStatus;
  owner: string;
  roadmap_horizon: RoadmapHorizon;
  founder_question: string;
  notes: string;
}

export interface InitiativeFilters {
  query?: string;
  workstreams?: string[];
  priorities?: Priority[];
  initiativeTypes?: InitiativeType[];
  evidenceStatuses?: EvidenceStatus[];
  decisionStatuses?: DecisionStatus[];
  horizons?: RoadmapHorizon[];
  owners?: string[];
  modules?: ProductModule[];
}
