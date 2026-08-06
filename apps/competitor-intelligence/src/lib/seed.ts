import { actions, aliases, discoveries, featureObservations, features, gtmObservations, importedResearch, meta, platforms, pricing, profiles, reachMetrics, recommendations, researchNotes, sources, watchlist } from "../../data/research-seed.mjs";
import type { IntelligenceData } from "@/types";

export const seedData: IntelligenceData = {
  platforms, watchlist, features, featureObservations, pricing, sources, discoveries, recommendations, actions,
  profiles, reachMetrics, gtmObservations, notes: researchNotes, aliases, importedResearch,
  claims: [], modules: [], news: [], actionComments: [], researchRuns: [], sourceChecks: [], completion: [], meta,
} as unknown as IntelligenceData;
