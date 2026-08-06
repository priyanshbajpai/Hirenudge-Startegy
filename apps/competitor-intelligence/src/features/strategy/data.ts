import { z } from "zod";
import rawInitiatives from "../../../data/strategy-initiatives.json";
import {
  decisionStatuses,
  evidenceStatuses,
  initiativeTypes,
  moduleOptions,
  priorities,
  roadmapHorizons,
  type Initiative,
  type InitiativeFilters,
  type ProductModule,
} from "./types";

const initiativeSchema = z.object({
  id: z.string().regex(/^HN-\d{3}[A-C]?$/),
  title: z.string().min(1),
  workstream: z.string().min(1),
  sub_workstream: z.string().min(1),
  initiative_type: z.enum(initiativeTypes),
  current_state: z.string().min(1),
  problem: z.string().min(1),
  recommendation: z.string().min(1),
  target_user: z.string().min(1),
  evidence_status: z.enum(evidenceStatuses),
  evidence_sources: z.array(z.string().min(1)).min(1),
  confidence: z.string().min(1),
  expected_user_impact: z.string().min(1),
  expected_business_impact: z.string().min(1),
  effort: z.string().min(1),
  technical_dependencies: z.array(z.string().min(1)),
  data_dependencies: z.array(z.string().min(1)),
  legal_dependencies: z.array(z.string().min(1)),
  risks: z.array(z.string().min(1)).min(1),
  success_metrics: z.array(z.string().min(1)).min(1),
  ai_suggested_priority: z.enum(priorities),
  founder_priority: z.enum(priorities).nullable(),
  decision_status: z.enum(decisionStatuses),
  owner: z.string().min(1),
  roadmap_horizon: z.enum(roadmapHorizons),
  founder_question: z.string().min(1),
  notes: z.string(),
});

const parsed = z.array(initiativeSchema).parse(rawInitiatives) as Initiative[];
const ids = new Set(parsed.map((initiative) => initiative.id));
if (ids.size !== parsed.length) throw new Error("Strategy initiative IDs must be unique.");

export const initiatives: readonly Initiative[] = Object.freeze(parsed.map((initiative) => Object.freeze(initiative)));
export { moduleOptions };

const priorityCode = (priority: Initiative["ai_suggested_priority"]) => priority.slice(0, 2) as "P0" | "P1" | "P2" | "P3";

export const strategyCounts = {
  priority: Object.fromEntries(["P0", "P1", "P2", "P3"].map((code) => [code, initiatives.filter((item) => priorityCode(item.ai_suggested_priority) === code).length])) as Record<"P0" | "P1" | "P2" | "P3", number>,
  horizon: Object.fromEntries(roadmapHorizons.map((horizon) => [horizon, initiatives.filter((item) => item.roadmap_horizon === horizon).length])) as Record<Initiative["roadmap_horizon"], number>,
};

const moduleIds: Record<Exclude<ProductModule, "Other">, Set<string>> = {
  "Nudge Studio": new Set(["HN-003", "HN-007", "HN-008", "HN-009"]),
  "AI Job Matcher": new Set(["HN-005", "HN-006B"]),
  "Application Tracking": new Set(["HN-004B", "HN-007", "HN-011", "HN-032"]),
  "Interview Preparation": new Set(["HN-014", "HN-015"]),
  Outreach: new Set(["HN-009", "HN-012", "HN-013", "HN-026"]),
  Portfolio: new Set(["HN-010A", "HN-010B"]),
  Onboarding: new Set(["HN-002", "HN-004A", "HN-019"]),
  Retention: new Set(["HN-011", "HN-016", "HN-024", "HN-032"]),
  "Job Data": new Set(["HN-005", "HN-006A", "HN-006B", "HN-020", "HN-029"]),
};

export function getInitiativeModules(initiative: Initiative): ProductModule[] {
  const matches = Object.entries(moduleIds)
    .filter(([, initiativeIds]) => initiativeIds.has(initiative.id))
    .map(([name]) => name as Exclude<ProductModule, "Other">);
  return matches.length ? matches : ["Other"];
}

const matchesAny = <T extends string>(value: T, selected: readonly T[] | undefined) => !selected?.length || selected.includes(value);

export function filterInitiatives(source: readonly Initiative[], filters: InitiativeFilters): Initiative[] {
  const query = filters.query?.trim().toLocaleLowerCase() ?? "";
  return source.filter((initiative) => {
    const haystack = [
      initiative.id,
      initiative.title,
      initiative.workstream,
      initiative.sub_workstream,
      initiative.current_state,
      initiative.problem,
      initiative.recommendation,
      initiative.founder_question,
      ...initiative.evidence_sources,
    ].join(" ").toLocaleLowerCase();

    return (!query || haystack.includes(query))
      && matchesAny(initiative.workstream, filters.workstreams)
      && matchesAny(initiative.ai_suggested_priority, filters.priorities)
      && matchesAny(initiative.initiative_type, filters.initiativeTypes)
      && matchesAny(initiative.evidence_status, filters.evidenceStatuses)
      && matchesAny(initiative.decision_status, filters.decisionStatuses)
      && matchesAny(initiative.roadmap_horizon, filters.horizons)
      && matchesAny(initiative.owner, filters.owners)
      && (!filters.modules?.length || getInitiativeModules(initiative).some((module) => filters.modules?.includes(module)));
  });
}
