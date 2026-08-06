import React from "react";
import Link from "next/link";
import { ArrowRight, Presentation } from "lucide-react";
import { initiatives, strategyCounts } from "../data";
import { founderDecisions } from "../decisions";
import { majorRisks, primaryIcp, strategicSummary, strongestFindings } from "../content";
import { EvidenceNotice, SectionHeading, SectionIntro } from "../primitives";
import { BulletList, EditorialGrid, EditorialItem, InitiativePreview, MetricStrip, Pillar } from "./shared";
import styles from "../strategy.module.css";

const priorityItems = initiatives.filter((item) => item.ai_suggested_priority.startsWith("P0")).slice(0, 6);

export function OverviewSection() { return <>
  <SectionIntro eyebrow="Founder briefing · 06 August 2026" title="The decision system for HireNudge’s next chapter" aside={<Link className={styles.primaryAction} href="/strategy/presentation"><Presentation aria-hidden="true" size={17} /> Start 15-chapter briefing</Link>}><p>{strategicSummary}</p></SectionIntro>
  <MetricStrip items={[{value: initiatives.length,label:"Canonical initiatives",note:"Planning records, not approvals"},{value:strategyCounts.priority.P0,label:"Proposed P0",note:"AI-suggested; founder unconfirmed"},{value:founderDecisions.length,label:"Founder decisions",note:"All To Be Discussed"},{value:strategyCounts.horizon.Blocked,label:"Blocked",note:"Named dependency required"}]} />
  <EvidenceNotice>Strategy status: research-backed recommendations. No founder priorities, approvals, owners, traction figures or customer outcomes were supplied.</EvidenceNotice>
  <SectionHeading eyebrow="Strategic posture" title="Trust first. One job-centered loop next." description="The immediate task is not to add breadth. It is to make one workflow usable, measurable and defensible." />
  <div className={styles.postureBand}><Pillar label="Protect" value="Claims, data and external actions" tone="dark" /><Pillar label="Prove" value="Activation and application quality" tone="accent" /><Pillar label="Connect" value="Role → packet → next action" /><Pillar label="Then earn" value="Retention, revenue and distribution" /></div>
  <SectionHeading eyebrow="Priority rail" title="Thirteen proposed must-haves—six shown first" description="P0 is restricted to trust, launch readiness, activation, data quality and critical control systems." action={<Link className={styles.textAction} href="/strategy/roadmap">Open roadmap <ArrowRight aria-hidden="true" size={15} /></Link>} />
  <EditorialGrid columns={3}>{priorityItems.map((item) => <InitiativePreview key={item.id} item={item} />)}</EditorialGrid>
  <SectionHeading eyebrow="Strongest findings" title="What the evidence changes" description="Observed capability is separated from marketing claims, team discussion and recommendation." />
  <div className={styles.splitEditorial}><BulletList items={strongestFindings.slice(0,5)} /><BulletList items={strongestFindings.slice(5)} /></div>
  <SectionHeading eyebrow="Market wedge" title="A provisional ICP, not a settled strategy" />
  <EditorialGrid columns={2}><EditorialItem index="ICP" title="Start narrower than the product">{primaryIcp}</EditorialItem><EditorialItem index="100" title="Acquire paid learning, not vanity sign-ups">Four cohorts of 25 eligible paying customers. First ten calibrate the workflow; every cohort produces a stop, modify or scale decision.</EditorialItem></EditorialGrid>
  <SectionHeading eyebrow="Risk and decision queue" title="The work that cannot be designed around" />
  <div className={styles.splitEditorial}><div>{majorRisks.slice(0,4).map((risk) => <EditorialItem key={risk.id} index={risk.id} title={risk.risk}>{risk.response}</EditorialItem>)}</div><div>{founderDecisions.slice(0,4).map((decision) => <EditorialItem key={decision.id} index={decision.id} title={decision.question}>{decision.recommendation}</EditorialItem>)}</div></div>
</>; }
