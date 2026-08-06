"use client";

import { CalendarClock, ChevronRight, GripVertical, Trash2 } from "lucide-react";
import React from "react";
import type { EffectivePrdRecord } from "./local-draft";
import { isOverdue } from "./local-draft";
import { PrdBadge } from "./prd-badges";
import { usePrd } from "./prd-provider";
import styles from "./prd.module.css";

export function RequirementsTable({ records, onOpen }: { records: EffectivePrdRecord[]; onOpen: (record: EffectivePrdRecord) => void }) {
  const { removeRecord } = usePrd();
  return <div className={styles.tableViewport}><div className={styles.requirementTable} role="table" aria-label="PRD requirements">
    <div className={styles.tableHeader} role="row"><span>Requirement</span><span>Category / state</span><span>Delivery</span><span>ETA / owner</span><span>Evidence</span><span aria-hidden="true" /></div>
    {records.map((record) => <div key={record.id} className={styles.tableRow} role="row" data-category={record.category}>
      <button type="button" className={styles.recordPrimary} onClick={() => onOpen(record)} aria-label={`Open ${record.id}`}><GripVertical size={15} aria-hidden="true" /><span><small>{record.id} · {record.module} / {record.screen}</small><strong>{record.title}</strong><em>{record.proposedChange}</em></span></button>
      <div className={styles.tableBadges}><PrdBadge kind="category" value={record.category} /><PrdBadge kind="decision" value={record.decisionStatus} /></div>
      <div><PrdBadge kind="delivery" value={record.deliveryStatus} /><small>{record.roadmapHorizon}</small></div>
      <div><span className={isOverdue(record.planningEta, record.deliveryStatus) ? styles.overdueText : ""}>{record.planningEta ? <><CalendarClock size={13} />{record.planningEta}</> : "Unscheduled"}</span><small>{record.owner}</small></div>
      <div><PrdBadge kind="evidence" value={record.evidenceStatus} /><small>{record.confidence} confidence</small></div>
      <div className={styles.rowActions}><button type="button" onClick={() => removeRecord(record.id)} aria-label={`Remove ${record.id}`}><Trash2 size={15} /></button><button type="button" onClick={() => onOpen(record)} aria-label={`Open details for ${record.id}`}><ChevronRight size={16} /></button></div>
    </div>)}
  </div></div>;
}
