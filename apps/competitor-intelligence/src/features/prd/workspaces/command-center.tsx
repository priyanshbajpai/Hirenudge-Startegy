"use client";

import React, { useState } from "react";
import { AlertTriangle, ArrowRight, CheckCircle2, Clock3, Scale } from "lucide-react";
import { usePrd } from "../prd-provider";
import { PrdBadge } from "../prd-badges";
import { RecordInspector } from "../record-inspector";
import type { EffectivePrdRecord } from "../local-draft";
import styles from "../prd-views.module.css";
import shared from "../prd.module.css";

export function CommandCenter() {
  const { records } = usePrd();
  const [selected, setSelected] = useState<EffectivePrdRecord | null>(null);
  const must = records.filter((r) => r.category === "Must Have");
  const decisions = records.filter((r) => r.decisionStatus === "To Be Discussed");
  const inFlight = records.filter((r) => ["In Design", "In Development", "In QA"].includes(r.deliveryStatus));
  const blocked = records.filter((r) => r.deliveryStatus === "Blocked" || r.roadmapHorizon === "Blocked");
  const strongest = [
    "The product already spans the job-search journey, but continuity between modules remains the core usability requirement.",
    "Job freshness, scoring explanations and human review are product-trust controls, not secondary polish.",
    "Onboarding should earn a credible first value moment before requesting optional integrations such as Gmail.",
    "India-first global mobility remains a hypothesis that needs cohort and willingness-to-pay validation.",
  ];
  return <section className={styles.commandCenter}>
    <header className={styles.commandHero}><span className={shared.eyebrow}>Founder operating view · 6 Aug 2026</span><h1>PRD Command Center</h1><p>Turn research, team discussion and visible product evidence into an editable delivery system—without treating a proposal as approved or a public claim as verified.</p><div className={styles.heroLegend}><PrdBadge kind="category" value="Must Have"/><PrdBadge kind="category" value="Important"/><PrdBadge kind="category" value="Good to Have"/><PrdBadge kind="category" value="To Be Decided"/></div></header>
    <div className={styles.commandStats}>
      <article><CheckCircle2/><strong>{records.length}</strong><span>active requirements</span><small>from supplied PRDs and research</small></article>
      <article><AlertTriangle/><strong>{must.length}</strong><span>must-have requirements</span><small>proposed prioritisation</small></article>
      <article><Clock3/><strong>{inFlight.length}</strong><span>described as in flight</span><small>needs owner and ETA confirmation</small></article>
      <article><Scale/><strong>{decisions.length}</strong><span>founder decisions</span><small>not approvals</small></article>
    </div>
    <div className={styles.commandGrid}><section><header><span>Strategic read</span><h2>What the current evidence says</h2></header><ol className={styles.findingList}>{strongest.map((finding, index)=><li key={finding}><span>{String(index+1).padStart(2,"0")}</span><p>{finding}</p></li>)}</ol></section><section><header><span>Critical path</span><h2>Must-haves to resolve first</h2></header><div className={styles.commandQueue}>{must.slice(0,7).map((record)=><button type="button" key={record.id} onClick={()=>setSelected(record)}><span>{record.id} · {record.module}</span><strong>{record.title}</strong><div><PrdBadge kind="delivery" value={record.deliveryStatus}/><PrdBadge kind="decision" value={record.decisionStatus}/></div><ArrowRight size={15}/></button>)}</div></section></div>
    <div className={styles.commandGrid}><section><header><span>Open questions</span><h2>Decisions that change the plan</h2></header><div className={styles.decisionPreview}>{decisions.slice(0,6).map((record)=><button type="button" key={record.id} onClick={()=>setSelected(record)}><PrdBadge kind="priority" value={record.founderPriority ?? record.aiSuggestedPriority}/><strong>{record.founderQuestion}</strong><small>{record.title}</small></button>)}</div></section><section><header><span>Delivery health</span><h2>Blocked or legally gated</h2></header><div className={styles.decisionPreview}>{blocked.length ? blocked.slice(0,6).map((record)=><button type="button" key={record.id} onClick={()=>setSelected(record)}><PrdBadge kind="delivery" value="Blocked"/><strong>{record.title}</strong><small>{record.risks[0] ?? "Dependency confirmation required"}</small></button>) : <p>No records are currently labelled blocked. That is not proof that dependencies are cleared.</p>}</div></section></div>
    {selected ? <RecordInspector record={records.find((r)=>r.id===selected.id) ?? selected} onClose={()=>setSelected(null)}/> : null}
  </section>;
}
