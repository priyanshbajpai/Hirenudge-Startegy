import { describe, expect, it } from "vitest";
import { prdRecords } from "../src/features/prd/data";
import {
  applyDraft,
  emptyDraft,
  isOverdue,
  moveRecord,
  parseDraft,
  removeRecord,
  restoreRecord,
  updateRecord,
} from "../src/features/prd/local-draft";

describe("PRD local draft", () => {
  it("keeps canonical evidence immutable while applying founder edits", () => {
    const original = structuredClone(prdRecords[0]);
    const draft = updateRecord(emptyDraft(), original.id, { deliveryStatus: "In Design", planningEta: "2026-08-20" });
    expect(applyDraft([original], draft)[0].deliveryStatus).toBe("In Design");
    expect(original.deliveryStatus).not.toBe("In Design");
  });

  it("soft-removes, restores and reorders records", () => {
    const id = prdRecords[0].id;
    let draft = removeRecord(emptyDraft(), id);
    expect(applyDraft([prdRecords[0]], draft)).toHaveLength(0);
    draft = restoreRecord(draft, id);
    draft = moveRecord(draft, id, { category: "Important", index: 0 });
    expect(draft.overrides[id].category).toBe("Important");
    expect(applyDraft([prdRecords[0]], draft)).toHaveLength(1);
  });

  it("rejects malformed or future-version imports", () => {
    expect(() => parseDraft('{"version":999}')).toThrow(/version/i);
    expect(() => parseDraft("not-json")).toThrow(/valid JSON/i);
  });

  it("marks past unfinished dates as overdue against 6 August 2026", () => {
    expect(isOverdue("2026-08-05", "Not Started")).toBe(true);
    expect(isOverdue("2026-08-05", "Done")).toBe(false);
    expect(isOverdue(null, "Not Started")).toBe(false);
  });
});
