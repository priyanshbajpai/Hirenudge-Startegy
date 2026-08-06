import React from "react";
import { acquisitionSequence, corridors, gtmFunnel, gtmOffer, gtmSuccessMetrics, partnerships, primaryIcp, secondaryIcp } from "../content";
import { initiatives } from "../data";
import { EvidenceNotice, SectionHeading, SectionIntro } from "../primitives";
import { BulletList, EditorialGrid, EditorialItem, InitiativePreview, NumberedList, Pillar } from "./shared";
import styles from "../strategy.module.css";

export function GtmSection() { return <>
  <SectionIntro eyebrow="Go-to-market" title="Prove one India-first workflow before widening the map"><p>Focus the product, offer and distribution on a cohort whose application behavior can be observed and improved within one search cycle.</p></SectionIntro>
  <EvidenceNotice>The ICP is provisional. No segment-level activation, retention, willingness-to-pay or job-coverage evidence was supplied.</EvidenceNotice>
  <SectionHeading eyebrow="ICP choice" title="Who the first learning system is for" />
  <EditorialGrid columns={2}><EditorialItem index="PRIMARY" title="Provisional starting point">{primaryIcp}</EditorialItem><EditorialItem index="SECONDARY" title="Intentionally unselected">{secondaryIcp}</EditorialItem></EditorialGrid>
  <SectionHeading eyebrow="Offer" title="Sell a bounded outcome, not an all-in-one promise" />
  <div className={styles.darkStatement}>{gtmOffer}</div>
  <SectionHeading eyebrow="Corridors" title="Start where HireNudge can learn safely" />
  <EditorialGrid columns={3}>{corridors.map((corridor) => <EditorialItem key={corridor.name} index={corridor.recommendation} title={corridor.name}>{corridor.reason}</EditorialItem>)}</EditorialGrid>
  <SectionHeading eyebrow="Funnel" title="Separate reach, payment, activation and outcome" />
  <div className={styles.funnel}>{gtmFunnel.map((stage,index) => <Pillar key={stage} label={String(index+1).padStart(2,"0")} value={stage} tone={index===2?"accent":index===3?"dark":undefined} />)}</div>
  <SectionHeading eyebrow="Acquisition sequence" title="Earn the right to scale" />
  <NumberedList items={acquisitionSequence} />
  <SectionHeading eyebrow="Partnerships" title="Distribution with explicit trust boundaries" />
  <EditorialGrid columns={3}>{partnerships.map((item) => <EditorialItem key={item.partner} title={item.partner}><p>{item.use}</p><small>Guardrail · {item.guardrail}</small></EditorialItem>)}</EditorialGrid>
  <SectionHeading eyebrow="Pricing & monetisation" title="Test an episodic search plan before a permanent subscription" />
  <EditorialGrid columns={2}><InitiativePreview item={initiatives.find((item) => item.id === "HN-017")!} /><EditorialItem title="Commercial guardrails">Tax-inclusive INR pricing, clear credit value, cost visibility, cancellation and refund terms, and willingness-to-pay interviews before committing to a model.</EditorialItem></EditorialGrid>
  <SectionHeading eyebrow="Measurement" title="A funnel that ends in learning and outcome" />
  <BulletList items={gtmSuccessMetrics} />
</>; }
