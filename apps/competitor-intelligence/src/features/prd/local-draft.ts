import { z } from "zod";
import type { PrdRecord } from "./types";
import { decisionStatuses, deliveryStatuses, founderPriorities, requirementCategories } from "./types";

export const PRD_STORAGE_KEY = "hirenudge.prd-command-center.v1";
export const PRD_DRAFT_VERSION = 1 as const;
export const PLANNING_DATE = "2026-08-06";

export interface PrdRecordOverride {
  deliveryStatus?: PrdRecord["deliveryStatus"];
  planningEta?: string | null;
  owner?: string;
  founderPriority?: PrdRecord["founderPriority"];
  decisionStatus?: PrdRecord["decisionStatus"];
  category?: PrdRecord["category"];
  founderNotes?: string;
  order?: number;
  removed?: boolean;
}

export interface PrdDraft {
  version: typeof PRD_DRAFT_VERSION;
  updatedAt: string | null;
  overrides: Record<string, PrdRecordOverride>;
}

export type EffectivePrdRecord = PrdRecord & {
  founderNotes: string;
  localOrder: number;
  removed: boolean;
};

const overrideSchema = z.object({
  deliveryStatus: z.enum(deliveryStatuses).optional(),
  planningEta: z.string().nullable().optional(),
  owner: z.string().min(1).optional(),
  founderPriority: z.enum(founderPriorities).nullable().optional(),
  decisionStatus: z.enum(decisionStatuses).optional(),
  category: z.enum(requirementCategories).optional(),
  founderNotes: z.string().optional(),
  order: z.number().int().nonnegative().optional(),
  removed: z.boolean().optional(),
});

const draftSchema = z.object({
  version: z.literal(PRD_DRAFT_VERSION),
  updatedAt: z.string().nullable(),
  overrides: z.record(z.string(), overrideSchema),
});

export const emptyDraft = (): PrdDraft => ({ version: PRD_DRAFT_VERSION, updatedAt: null, overrides: {} });

function touch(draft: PrdDraft, overrides: PrdDraft["overrides"]): PrdDraft {
  return { ...draft, updatedAt: new Date().toISOString(), overrides };
}

export function updateRecord(draft: PrdDraft, id: string, patch: PrdRecordOverride): PrdDraft {
  return touch(draft, { ...draft.overrides, [id]: { ...draft.overrides[id], ...patch } });
}

export function moveRecord(draft: PrdDraft, id: string, move: { category?: PrdRecord["category"]; deliveryStatus?: PrdRecord["deliveryStatus"]; index: number }): PrdDraft {
  return updateRecord(draft, id, { ...move, order: move.index });
}

export function removeRecord(draft: PrdDraft, id: string): PrdDraft {
  return updateRecord(draft, id, { removed: true });
}

export function restoreRecord(draft: PrdDraft, id: string): PrdDraft {
  return updateRecord(draft, id, { removed: false });
}

export function resetRecord(draft: PrdDraft, id: string): PrdDraft {
  const overrides = { ...draft.overrides };
  delete overrides[id];
  return touch(draft, overrides);
}

export function applyDraft(records: PrdRecord[], draft: PrdDraft, options?: { includeRemoved?: boolean }): EffectivePrdRecord[] {
  return records
    .map((record, index) => {
      const override = draft.overrides[record.id] ?? {};
      return {
        ...record,
        ...(override.deliveryStatus ? { deliveryStatus: override.deliveryStatus } : {}),
        ...(override.planningEta !== undefined ? { planningEta: override.planningEta } : {}),
        ...(override.owner ? { owner: override.owner } : {}),
        ...(override.founderPriority !== undefined ? { founderPriority: override.founderPriority } : {}),
        ...(override.decisionStatus ? { decisionStatus: override.decisionStatus } : {}),
        ...(override.category ? { category: override.category } : {}),
        founderNotes: override.founderNotes ?? "",
        localOrder: override.order ?? index,
        removed: override.removed ?? false,
      };
    })
    .filter((record) => options?.includeRemoved || !record.removed)
    .sort((a, b) => a.localOrder - b.localOrder || a.id.localeCompare(b.id));
}

export function serializeDraft(draft: PrdDraft) {
  return JSON.stringify(draft, null, 2);
}

export function parseDraft(value: string): PrdDraft {
  let parsed: unknown;
  try {
    parsed = JSON.parse(value);
  } catch {
    throw new Error("Import must be valid JSON.");
  }
  const result = draftSchema.safeParse(parsed);
  if (!result.success) {
    const version = typeof parsed === "object" && parsed !== null && "version" in parsed ? String(parsed.version) : "missing";
    throw new Error(`Unsupported or invalid PRD draft version (${version}).`);
  }
  return result.data;
}

export function isOverdue(planningEta: string | null, status: PrdRecord["deliveryStatus"]) {
  return Boolean(planningEta && planningEta < PLANNING_DATE && status !== "Done");
}
