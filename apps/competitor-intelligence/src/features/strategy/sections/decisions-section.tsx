"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { founderDecisions } from "../decisions";
import { PriorityBadge, SectionIntro, StatusBadge } from "../primitives";
import styles from "../strategy.module.css";

export function DecisionsSection() { const [open,setOpen]=useState<string|null>(null); return <>
  <SectionIntro eyebrow="Founder decision queue" title="Decide the boundaries that unblock execution"><p>Fifteen questions close the gap between research and company strategy. Recommendation is visible; approval is never inferred.</p></SectionIntro>
  <div className={styles.decisionSummary}><strong>15 decisions · 0 approved</strong><span>All statuses · To Be Discussed</span><span>Recommended meeting close · assign owners and dates</span></div>
  <div className={styles.decisionQueue}>{founderDecisions.map((decision,index)=>{const expanded=open===decision.id;return <article key={decision.id} className={expanded?styles.decisionOpen:""}><button type="button" onClick={()=>setOpen(expanded?null:decision.id)} aria-expanded={expanded}><span>{String(index+1).padStart(2,"0")} · {decision.id}</span><h2>{decision.question}</h2><div><PriorityBadge value={decision.priority}/><StatusBadge kind="decision" value={decision.status}/><ChevronDown aria-hidden="true" className={styles.decisionChevron}/></div></button>{expanded?<div className={styles.decisionDetail}><section><span>Recommended option</span><p>{decision.recommendation}</p></section><section><span>Alternatives considered</span><ul>{decision.alternatives.map((item)=><li key={item}>{item}</li>)}</ul></section><section><span>Evidence</span><p>{decision.evidence.join(" · ")}</p></section><section><span>Impact of delay</span><p>{decision.impactOfDelay}</p></section><section><span>Dependency</span><p>{decision.dependency}</p></section><section><span>Deadline</span><p>{decision.deadline}</p></section></div>:null}</article>})}</div>
  </>; }
