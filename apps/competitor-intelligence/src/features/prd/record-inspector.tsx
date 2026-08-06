"use client";

import { CalendarClock, ExternalLink, RotateCcw, Trash2, X } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { complianceRecords, partnerRecords } from "./data";
import type { EffectivePrdRecord } from "./local-draft";
import { isOverdue } from "./local-draft";
import { PrdBadge } from "./prd-badges";
import { usePrd } from "./prd-provider";
import { decisionStatuses, deliveryStatuses, founderPriorities, requirementCategories } from "./types";
import styles from "./prd.module.css";

const tabs = ["PRD", "Delivery", "UX", "Partners", "Compliance", "Evidence"] as const;
type Tab = (typeof tabs)[number];

function Block({ label, children }: { label: string; children: React.ReactNode }) { return <section className={styles.inspectorBlock}><span>{label}</span><div>{children}</div></section>; }
function List({ items, empty = "Not supplied" }: { items: string[]; empty?: string }) { return items.length ? <ul>{items.map((item) => <li key={item}>{item}</li>)}</ul> : <p>{empty}</p>; }

export function RecordInspector({ record, onClose }: { record: EffectivePrdRecord; onClose: () => void }) {
  const [tab, setTab] = useState<Tab>("PRD");
  const { updateRecord, removeRecord, resetRecord } = usePrd();
  const closeRef = useRef<HTMLButtonElement>(null);
  useEffect(() => { closeRef.current?.focus(); const handler = (event: KeyboardEvent) => { if (event.key === "Escape") onClose(); }; window.addEventListener("keydown", handler); return () => window.removeEventListener("keydown", handler); }, [onClose]);
  const partners = partnerRecords.filter((item) => record.partnerIds.includes(item.id));
  const compliance = complianceRecords.filter((item) => record.complianceIds.includes(item.id));
  return <div className={styles.inspectorOverlay} role="dialog" aria-modal="true" aria-labelledby="record-title">
    <aside className={styles.inspector}>
      <header className={styles.inspectorHeader}><div><span>{record.id} · {record.workspace} / {record.module}</span><h2 id="record-title">{record.title}</h2><div className={styles.badgeLine}><PrdBadge kind="category" value={record.category} /><PrdBadge kind="delivery" value={record.deliveryStatus} /><PrdBadge kind="decision" value={record.decisionStatus} /></div></div><button ref={closeRef} type="button" onClick={onClose} aria-label="Close requirement details"><X aria-hidden="true" /></button></header>
      <div role="tablist" aria-label="Requirement detail" className={styles.inspectorTabs}>{tabs.map((item) => <button key={item} role="tab" aria-selected={tab === item} type="button" onClick={() => setTab(item)}>{item}</button>)}</div>
      <div className={styles.inspectorBody}>
        {tab === "PRD" ? <><Block label="Current observed behaviour"><p>{record.currentBehaviour}</p><small>{record.currentEvidenceLimitation}</small></Block><Block label="User problem"><p>{record.userProblem}</p></Block><Block label="Recommended requirement"><p>{record.proposedChange}</p></Block><Block label="Acceptance criteria"><List items={record.acceptanceCriteria} /></Block><div className={styles.inspectorColumns}><Block label="Expected user impact"><p>{record.expectedUserImpact}</p></Block><Block label="Expected business impact"><p>{record.expectedBusinessImpact}</p></Block></div><Block label="Success measures"><List items={record.successMetrics} /></Block></> : null}
        {tab === "Delivery" ? <div className={styles.editForm}>
          <label>Requirement category<select value={record.category} onChange={(event) => updateRecord(record.id, { category: event.target.value as typeof record.category })}>{requirementCategories.map((item) => <option key={item}>{item}</option>)}</select></label>
          <label>Delivery status<select value={record.deliveryStatus} onChange={(event) => updateRecord(record.id, { deliveryStatus: event.target.value as typeof record.deliveryStatus })}>{deliveryStatuses.map((item) => <option key={item}>{item}</option>)}</select></label>
          <label>Planning ETA<input aria-label="Planning ETA" type="date" value={record.planningEta ?? ""} onChange={(event) => updateRecord(record.id, { planningEta: event.target.value || null })} />{isOverdue(record.planningEta, record.deliveryStatus) ? <small className={styles.overdue}><CalendarClock size={13} />Overdue against 6 Aug 2026</small> : <small>Planning ETA — not an engineering commitment</small>}</label>
          <label>Owner<input value={record.owner} onChange={(event) => updateRecord(record.id, { owner: event.target.value || "Unassigned" })} /></label>
          <label>Founder priority<select value={record.founderPriority ?? ""} onChange={(event) => updateRecord(record.id, { founderPriority: event.target.value ? event.target.value as typeof record.founderPriority : null })}><option value="">Not set</option>{founderPriorities.map((item) => <option key={item}>{item}</option>)}</select></label>
          <label>Decision status<select value={record.decisionStatus} onChange={(event) => updateRecord(record.id, { decisionStatus: event.target.value as typeof record.decisionStatus })}>{decisionStatuses.map((item) => <option key={item}>{item}</option>)}</select></label>
          <label className={styles.fullField}>Founder notes<textarea rows={5} value={record.founderNotes} onChange={(event) => updateRecord(record.id, { founderNotes: event.target.value })} placeholder="Add local planning context…" /></label>
          <div className={styles.inspectorActions}><button type="button" onClick={() => resetRecord(record.id)}><RotateCcw size={15} />Reset local edits</button><button type="button" className={styles.dangerButton} onClick={() => { removeRecord(record.id); onClose(); }}><Trash2 size={15} />Remove from local PRD</button></div>
        </div> : null}
        {tab === "UX" ? <><Block label="User-friendliness"><div className={styles.badgeLine}><PrdBadge kind="evidence" value={record.usabilityRating} /></div><p>{record.usabilityRationale}</p></Block><Block label="Screen / flow"><p>{record.screen}</p></Block><Block label="Validation needed"><p>Test task completion, comprehension, error recovery, mobile reflow, keyboard use and assistive-technology behavior in the live product.</p></Block></> : null}
        {tab === "Partners" ? partners.length ? <div className={styles.partnerStack}>{partners.map((partner) => <article key={partner.id}><span>{partner.category} · {partner.verificationState}</span><h3>{partner.name}</h3><p>{partner.proposedUse}</p><dl><div><dt>API</dt><dd>{partner.apiAvailability}</dd></div><div><dt>Commercial status</dt><dd>{partner.commercialUseStatus}</dd></div><div><dt>Recommendation</dt><dd>{partner.recommendation}</dd></div></dl>{partner.officialUrl ? <a href={partner.officialUrl} target="_blank" rel="noreferrer">Official reference <ExternalLink size={14} /></a> : null}</article>)}</div> : <p>No feature-specific external partner is required for this record.</p> : null}
        {tab === "Compliance" ? <div className={styles.complianceStack}>{compliance.map((item) => <article key={item.id}><div><h3>{item.regime}</h3><PrdBadge kind="legal" value={item.state} /></div><p>{item.obligation}</p><dl><div><dt>Product control</dt><dd>{item.productControl}</dd></div><div><dt>Release gate</dt><dd>{item.releaseGate}</dd></div><div><dt>Owner</dt><dd>{item.confirmationOwner}</dd></div></dl><small>{item.limitation}</small><a href={item.officialUrl} target="_blank" rel="noreferrer">Official guidance <ExternalLink size={14} /></a></article>)}</div> : null}
        {tab === "Evidence" ? <><Block label="Evidence status"><div className={styles.badgeLine}><PrdBadge kind="evidence" value={record.evidenceStatus} /><span>Confidence · {record.confidence}</span></div></Block><div className={styles.sourceStack}>{record.evidenceSources.map((source) => <article key={`${source.label}-${source.claimSupported}`}><span>{source.reliability} · Accessed {source.accessDate}</span><h3>{source.label}</h3><p><strong>Supports:</strong> {source.claimSupported}</p><p><strong>Limitation:</strong> {source.limitation}</p>{source.url ? <a href={source.url} target="_blank" rel="noreferrer">Open source <ExternalLink size={14} /></a> : null}</article>)}</div><Block label="Founder question"><p>{record.founderQuestion}</p></Block></> : null}
      </div>
    </aside>
  </div>;
}
