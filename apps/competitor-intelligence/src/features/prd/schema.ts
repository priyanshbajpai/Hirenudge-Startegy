import { z } from "zod";
import {
  complianceStates,
  decisionStatuses,
  deliveryStatuses,
  evidenceStatuses,
  founderPriorities,
  requirementCategories,
  roadmapHorizons,
  usabilityRatings,
  workspaces,
} from "./types";

const evidenceSourceSchema = z.object({
  label: z.string().min(1),
  url: z.string().url().optional(),
  accessDate: z.string().min(1),
  claimSupported: z.string().min(1),
  reliability: z.enum(["Primary", "Supplied evidence", "Internal discussion", "Secondary"]),
  limitation: z.string().min(1),
});

export const prdRecordSchema = z.object({
  id: z.string().min(1),
  sourceIds: z.array(z.string()),
  canonicalGroup: z.string().min(1),
  workspace: z.enum(workspaces),
  productArea: z.string().min(1),
  module: z.string().min(1),
  screen: z.string().min(1),
  title: z.string().min(1),
  requirementType: z.string().min(1),
  currentBehaviour: z.string().min(1),
  currentEvidenceLimitation: z.string().min(1),
  userProblem: z.string().min(1),
  proposedChange: z.string().min(1),
  acceptanceCriteria: z.array(z.string().min(1)).min(1),
  category: z.enum(requirementCategories),
  aiSuggestedPriority: z.enum(founderPriorities),
  founderPriority: z.enum(founderPriorities).nullable(),
  decisionStatus: z.enum(decisionStatuses),
  deliveryStatus: z.enum(deliveryStatuses),
  planningEta: z.string().nullable(),
  owner: z.string().min(1),
  usabilityRating: z.enum(usabilityRatings),
  usabilityRationale: z.string().min(1),
  expectedUserImpact: z.string().min(1),
  expectedBusinessImpact: z.string().min(1),
  effort: z.string().min(1),
  technicalDependencies: z.array(z.string()),
  dataDependencies: z.array(z.string()),
  partnerIds: z.array(z.string()),
  complianceIds: z.array(z.string()),
  risks: z.array(z.string()),
  successMetrics: z.array(z.string()),
  evidenceStatus: z.enum(evidenceStatuses),
  evidenceSources: z.array(evidenceSourceSchema).min(1),
  confidence: z.enum(["High", "Medium", "Low"]),
  founderQuestion: z.string().min(1),
  notes: z.string(),
  roadmapHorizon: z.enum(roadmapHorizons),
});

export const partnerRecordSchema = z.object({
  id: z.string(), name: z.string(), category: z.string(), applicableModules: z.array(z.string()), proposedUse: z.string(),
  officialUrl: z.string().url().nullable(), apiAvailability: z.string(), authentication: z.string(), pricingEvidence: z.string(),
  commercialUseStatus: z.string(), dataHandled: z.array(z.string()), securityRequirements: z.array(z.string()),
  legalDependencies: z.array(z.string()), implementationComplexity: z.enum(["Low", "Medium", "High", "Unknown"]),
  recommendation: z.string(), verificationState: z.enum(["Verified official source", "Requires commercial confirmation", "Name/vendor confirmation required"]),
});

export const complianceRecordSchema = z.object({
  id: z.string(), regime: z.string(), applicableModules: z.array(z.string()), dataInvolved: z.array(z.string()),
  processingPurpose: z.string(), obligation: z.string(), productControl: z.string(), releaseGate: z.string(),
  state: z.enum(complianceStates), confirmationOwner: z.string(), officialUrl: z.string().url(), limitation: z.string(),
});

export const prdRecordsSchema = z.array(prdRecordSchema);
export const partnerRecordsSchema = z.array(partnerRecordSchema);
export const complianceRecordsSchema = z.array(complianceRecordSchema);
