import rawCompliance from "../../../data/prd-compliance.json";
import rawPartners from "../../../data/prd-partners.json";
import rawRecords from "../../../data/prd-records.json";
import { complianceRecordsSchema, partnerRecordsSchema, prdRecordsSchema } from "./schema";
import type { PrdFilters, PrdRecord } from "./types";

export const prdRecords = prdRecordsSchema.parse(rawRecords);
export const partnerRecords = partnerRecordsSchema.parse(rawPartners);
export const complianceRecords = complianceRecordsSchema.parse(rawCompliance);

const includesAny = <T extends string>(value: T, selected: readonly T[]) => !selected.length || selected.includes(value);

export function filterPrdRecords<T extends PrdRecord>(records: T[], filters: Partial<PrdFilters>): T[] {
  const query = filters.query?.trim().toLowerCase() ?? "";
  return records.filter((record) => {
    const haystack = [record.id, record.title, record.workspace, record.module, record.screen, record.currentBehaviour, record.userProblem, record.proposedChange, record.owner].join(" ").toLowerCase();
    return (!query || haystack.includes(query))
      && (!filters.workspaces?.length || filters.workspaces.includes(record.workspace))
      && (!filters.modules?.length || filters.modules.includes(record.module))
      && includesAny(record.category, filters.categories ?? [])
      && includesAny(record.deliveryStatus, filters.deliveryStatuses ?? [])
      && includesAny(record.decisionStatus, filters.decisionStatuses ?? [])
      && includesAny(record.evidenceStatus, filters.evidenceStatuses ?? [])
      && (!filters.owners?.length || filters.owners.includes(record.owner))
      && includesAny(record.roadmapHorizon, filters.horizons ?? [])
      && (!filters.complianceStates?.length || record.complianceIds.some((id) => {
        const compliance = complianceRecords.find((item) => item.id === id);
        return compliance ? filters.complianceStates?.includes(compliance.state) : false;
      }));
  });
}

export const prdCounts = {
  total: prdRecords.length,
  byWorkspace: Object.fromEntries([...new Set(prdRecords.map((item) => item.workspace))].map((workspace) => [workspace, prdRecords.filter((item) => item.workspace === workspace).length])),
  byCategory: Object.fromEntries([...new Set(prdRecords.map((item) => item.category))].map((category) => [category, prdRecords.filter((item) => item.category === category).length])),
  blocked: prdRecords.filter((item) => item.deliveryStatus === "Blocked" || item.roadmapHorizon === "Blocked").length,
};

export const prdModules = [...new Set(prdRecords.map((item) => item.module))].sort();
export const prdOwners = [...new Set(prdRecords.map((item) => item.owner))].sort();
