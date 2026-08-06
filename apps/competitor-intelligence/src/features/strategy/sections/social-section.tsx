import React from "react";
import { campaignThemes, competitorAdLearnings, contentPillars, contentPlan, paidReadinessGate, socialChannels, socialSuccessMetrics } from "../content";
import { EvidenceNotice, SectionHeading, SectionIntro } from "../primitives";
import { BulletList, EditorialGrid, EditorialItem } from "./shared";
import styles from "../strategy.module.css";

export function SocialSection() { return <>
  <SectionIntro eyebrow="Social & advertising" title="Earn attention with useful proof, not louder promises"><p>Use founder authority, educational artifacts and product demonstrations to learn which job-search problems deserve a product and an offer.</p></SectionIntro>
  <EvidenceNotice>The competitor archive contains creative assets, not spend, targeting, conversions or incrementality. Treat patterns as hypotheses—not performance benchmarks.</EvidenceNotice>
  <SectionHeading eyebrow="Channel roles" title="One strategy, different native behavior" />
  <EditorialGrid columns={3}>{socialChannels.map((item) => <EditorialItem key={item.channel} title={item.channel}><b>{item.role}</b><p>{item.formats}</p><small>CTA · {item.cta}</small></EditorialItem>)}</EditorialGrid>
  <SectionHeading eyebrow="Content system" title="Six durable pillars" />
  <div className={styles.pillarCloud}>{contentPillars.map((item,index) => <span key={item}><i>{String(index+1).padStart(2,"0")}</i>{item}</span>)}</div>
  <SectionHeading eyebrow="Campaign themes" title="Original HireNudge directions" />
  <EditorialGrid columns={3}>{campaignThemes.map((theme) => <EditorialItem key={theme.title} index={theme.funnel} title={theme.title}><b>{theme.hook}</b><p>Proof object: {theme.proof}</p></EditorialItem>)}</EditorialGrid>
  <SectionHeading eyebrow="Competitor-ad principles" title="Adapt the mechanics, not the expression" />
  <BulletList items={competitorAdLearnings} />
  <SectionHeading eyebrow="30-day learning plan" title="Four weeks, four questions" />
  <div className={styles.timeline}>{contentPlan.map((week) => <EditorialItem key={week.week} index={week.week} title={week.learning}><p><b>LinkedIn:</b> {week.linkedin}</p><p><b>Instagram:</b> {week.instagram}</p><p><b>X:</b> {week.x}</p></EditorialItem>)}</div>
  <SectionHeading eyebrow="Paid gate" title="Do not scale spend before the system is interpretable" />
  <div className={styles.darkStatement}>{paidReadinessGate}</div>
  <SectionHeading eyebrow="Measurement" title="Measure qualified movement, not reach alone" />
  <BulletList items={socialSuccessMetrics} />
</>; }
