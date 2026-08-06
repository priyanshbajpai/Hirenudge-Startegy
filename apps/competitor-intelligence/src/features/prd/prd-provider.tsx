"use client";

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { prdRecords } from "./data";
import {
  applyDraft,
  emptyDraft,
  moveRecord as moveRecordInDraft,
  parseDraft,
  PRD_STORAGE_KEY,
  removeRecord as removeRecordInDraft,
  resetRecord as resetRecordInDraft,
  restoreRecord as restoreRecordInDraft,
  serializeDraft,
  updateRecord as updateRecordInDraft,
  type EffectivePrdRecord,
  type PrdDraft,
  type PrdRecordOverride,
} from "./local-draft";
import type { PrdRecord } from "./types";

interface PrdContextValue {
  records: EffectivePrdRecord[];
  removedRecords: EffectivePrdRecord[];
  draft: PrdDraft;
  ready: boolean;
  lastSavedAt: string | null;
  updateRecord: (id: string, patch: PrdRecordOverride) => void;
  moveRecord: (id: string, move: { category?: PrdRecord["category"]; deliveryStatus?: PrdRecord["deliveryStatus"]; index: number }) => void;
  removeRecord: (id: string) => void;
  restoreRecord: (id: string) => void;
  resetRecord: (id: string) => void;
  resetAll: () => void;
  exportDraft: () => void;
  importDraft: (json: string) => void;
}

const PrdContext = createContext<PrdContextValue | null>(null);

export function PrdProvider({ children }: { children: ReactNode }) {
  const [draft, setDraft] = useState<PrdDraft>(emptyDraft);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem(PRD_STORAGE_KEY);
    if (stored) {
      // Hydrate the deliberately browser-local draft after the server render.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      try { setDraft(parseDraft(stored)); } catch { window.localStorage.removeItem(PRD_STORAGE_KEY); }
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    window.localStorage.setItem(PRD_STORAGE_KEY, serializeDraft(draft));
  }, [draft, ready]);

  useEffect(() => {
    const sync = (event: StorageEvent) => {
      if (event.key !== PRD_STORAGE_KEY || !event.newValue) return;
      try { setDraft(parseDraft(event.newValue)); } catch { /* Ignore malformed external writes. */ }
    };
    window.addEventListener("storage", sync);
    return () => window.removeEventListener("storage", sync);
  }, []);

  const updateRecord = useCallback((id: string, patch: PrdRecordOverride) => setDraft((current) => updateRecordInDraft(current, id, patch)), []);
  const moveRecord = useCallback((id: string, move: { category?: PrdRecord["category"]; deliveryStatus?: PrdRecord["deliveryStatus"]; index: number }) => setDraft((current) => moveRecordInDraft(current, id, move)), []);
  const removeRecord = useCallback((id: string) => setDraft((current) => removeRecordInDraft(current, id)), []);
  const restoreRecord = useCallback((id: string) => setDraft((current) => restoreRecordInDraft(current, id)), []);
  const resetRecord = useCallback((id: string) => setDraft((current) => resetRecordInDraft(current, id)), []);
  const resetAll = useCallback(() => setDraft(emptyDraft()), []);
  const importDraft = useCallback((json: string) => setDraft(parseDraft(json)), []);
  const exportDraft = useCallback(() => {
    const blob = new Blob([serializeDraft(draft)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `hirenudge-prd-local-draft-${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
    URL.revokeObjectURL(url);
  }, [draft]);

  const records = useMemo(() => applyDraft(prdRecords, draft), [draft]);
  const removedRecords = useMemo(() => applyDraft(prdRecords, draft, { includeRemoved: true }).filter((record) => record.removed), [draft]);
  const value = useMemo<PrdContextValue>(() => ({ records, removedRecords, draft, ready, lastSavedAt: draft.updatedAt, updateRecord, moveRecord, removeRecord, restoreRecord, resetRecord, resetAll, exportDraft, importDraft }), [records, removedRecords, draft, ready, updateRecord, moveRecord, removeRecord, restoreRecord, resetRecord, resetAll, exportDraft, importDraft]);

  return <PrdContext.Provider value={value}>{children}</PrdContext.Provider>;
}

export function usePrd() {
  const value = useContext(PrdContext);
  if (!value) throw new Error("usePrd must be used within PrdProvider");
  return value;
}
