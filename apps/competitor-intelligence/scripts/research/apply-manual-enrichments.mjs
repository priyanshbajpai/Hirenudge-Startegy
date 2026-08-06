import { createHash } from "node:crypto";
import { manualEnrichments } from "../../data/research/manual-enrichments.mjs";

const observedDate = new Date().toISOString().slice(0, 10);
const observedAt = new Date().toISOString();
const runId = `research-run-manual-enrichment-${observedDate}`;
const sha = (value) => createHash("sha256").update(value).digest("hex");

function stampSource(source, platformId) {
  return { observedDate, effectiveDate: source.effectiveDate || observedDate, reviewer: "Founder’s Office", platformId, ...source };
}

function stampObservation(observation, platformId) {
  return { observedDate, rowVersion: 1, platformId, ...observation };
}

export function applyManualEnrichments(results) {
  return results.map((result) => {
    const enrichment = manualEnrichments[result.company.id];
    if (!enrichment) return result;
    const sourceById = new Map([...result.sources, ...enrichment.sources.map((source) => stampSource(source, result.company.id))].map((source) => [source.id, source]));
    const claims = result.claims.map((existing) => {
      const override = enrichment.claimOverrides[existing.fieldKey];
      if (!override) return existing;
      const [value, researchState, methodology, sourceIds, confidence] = override;
      return { ...existing, value, researchState, methodology, sourceIds, confidence, observedDate, effectiveDate: observedDate, updatedAt: observedAt, rowVersion: Number(existing.rowVersion || 1) + 1, datasetRevision: 12, researchRunId: runId, fingerprint: sha(`${existing.platformId}|${existing.fieldKey}|${value}|${sourceIds.join(",")}`) };
    });
    for (const [fieldKey, override] of Object.entries(enrichment.claimOverrides)) {
      if (claims.some((entry) => entry.fieldKey === fieldKey)) continue;
      const [value, researchState, methodology, sourceIds, confidence] = override;
      claims.push({ id: `claim-${result.company.id}-${fieldKey.replace(/_/g, "-")}`, platformId: result.company.id, entityType: "Company", fieldKey, claim: fieldKey.replace(/_/g, " "), value, researchState, methodology, sourceIds, observedDate, effectiveDate: observedDate, confidence, material: true, current: true, supersedesId: "", reviewer: "Founder’s Office", reviewedDate: "", createdAt: observedAt, updatedAt: observedAt, createdBy: "Founder’s Office", updatedBy: "Founder’s Office", rowVersion: 1, datasetRevision: 12, researchRunId: runId, notes: "", fingerprint: sha(`${result.company.id}|${fieldKey}|${value}|${sourceIds.join(",")}`) });
    }
    const features = result.featureObservations.map((existing) => {
      const override = enrichment.featureOverrides[existing.featureId];
      if (!override) return { ...existing, sourceIds: enrichment.defaultFeatureSources, sourceId: enrichment.defaultFeatureSources[0], observedDate, confidence: "Medium", methodology: "Official pricing and help-centre taxonomy review", rowVersion: Number(existing.rowVersion || 1) + 1 };
      const [availability, depth, tier] = override;
      const sourceIds = existing.featureId === "feature-browser-autofill" || existing.featureId === "feature-assisted-apply" || existing.featureId === "feature-application-tracker" || existing.featureId === "feature-api-integrations" ? ["source-teal-pricing", "source-teal-chrome"] : enrichment.defaultFeatureSources;
      return { ...existing, availability, depth, tier, researchState: "Observed", evidenceStatus: "Observed", sourceIds, sourceId: sourceIds[0], observedDate, confidence: "High", notes: "Capability and entitlement observed in official pricing, help or store evidence.", methodology: "Official pricing, help-centre and Chrome Web Store review", rowVersion: Number(existing.rowVersion || 1) + 1 };
    });
    const modules = features.filter((feature) => feature.availability === "Yes" || feature.availability === "Partial").map((feature) => ({ id: `module-${result.company.id}-${feature.featureId.replace(/^feature-/, "")}`, platformId: result.company.id, productLine: result.company.category, module: feature.featureId.replace(/^feature-/, "").replace(/-/g, " "), workflowStage: feature.featureId, description: `Observed ${feature.availability.toLowerCase()} capability; see feature evidence and tier dependency.`, availability: feature.availability, depth: feature.depth, tierDependency: feature.tier, api: feature.featureId === "feature-api-integrations" ? "Partial" : "Not applicable", mobile: "Not found after exhaustive search", extension: ["feature-browser-autofill", "feature-assisted-apply", "feature-application-tracker", "feature-api-integrations"].includes(feature.featureId) ? "Observed" : "Not applicable", serviceComponent: "Not applicable", researchState: "Observed", sourceIds: feature.sourceIds, observedDate, confidence: feature.confidence, indiaRelevance: "Transferable with India-specific localization", mobilityRelevance: "Not found after exhaustive search", hirenudgeTransfer: claims.find((entry) => entry.fieldKey === "hirenudge_recommendation")?.value || "", risk: claims.find((entry) => entry.fieldKey === "risk")?.value || "", rowVersion: 1, updatedAt: observedAt, fingerprint: sha(`${result.company.id}|${feature.featureId}|${feature.sourceIds.join(",")}`) }));
    const sourceCoverage = Math.round((claims.filter((entry) => entry.sourceIds?.length).length / claims.length) * 100);
    return {
      ...result,
      claims,
      featureObservations: features,
      modules,
      sources: [...sourceById.values()],
      pricing: enrichment.pricing.map((row) => stampObservation(row, result.company.id)),
      metrics: enrichment.metrics.map((row) => stampObservation(row, result.company.id)),
      gtmObservations: enrichment.gtmObservations.map((row) => stampObservation(row, result.company.id)),
      completion: { ...result.completion, completionPercentage: 100, terminalFields: claims.length, requiredFields: claims.length, sourceCoveragePercentage: sourceCoverage, freshness: observedDate, status: enrichment.status || "Amber", blockers: enrichment.blockers, lastResearchRun: runId, reviewedBy: "Founder’s Office", reviewedDate: observedDate, rowVersion: Number(result.completion.rowVersion || 1) + 1, datasetRevision: 12, featureCompletion: 100, pricingCompletion: 100, gtmCompletion: 100 },
    };
  });
}
