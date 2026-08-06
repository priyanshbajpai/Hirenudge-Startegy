import React from "react";
import type { EffectivePrdRecord } from "./local-draft";
import { PrdBadge } from "./prd-badges";
import styles from "./prd.module.css";

export function CurrentChangingView({ records, onOpen }: { records: EffectivePrdRecord[]; onOpen: (record: EffectivePrdRecord) => void }) {
  return <div className={styles.comparisonView}>
    <header><span>Current observed product</span><span>Team-described change</span><span>Recommended requirement</span></header>
    {records.map((record) => <button type="button" key={record.id} onClick={() => onOpen(record)} className={styles.comparisonRow}>
      <div><small>{record.id} · {record.module}</small><strong>{record.currentBehaviour}</strong><em>{record.evidenceStatus}</em></div>
      <div><strong>{record.deliveryStatus === "In Development" || record.deliveryStatus === "In Design" ? record.proposedChange : "No verified in-progress delivery state supplied"}</strong><PrdBadge kind="delivery" value={record.deliveryStatus} /></div>
      <div><strong>{record.proposedChange}</strong><span><PrdBadge kind="category" value={record.category} /><PrdBadge kind="decision" value={record.decisionStatus} /></span></div>
    </button>)}
  </div>;
}
