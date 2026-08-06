import React from "react";
import { brandComparisons, brandPrinciples, ctaDirections, workingPosition, workingPromise } from "../content";
import { EvidenceNotice, SectionHeading, SectionIntro } from "../primitives";
import { BulletList, ComparisonTable, EditorialGrid, EditorialItem, Pillar } from "./shared";
import styles from "../strategy.module.css";

export function BrandSection() { return <>
  <SectionIntro eyebrow="Brand language" title="Sound precise, calm and worthy of sensitive career data"><p>HireNudge should not promise access to an employer’s private decision. It should help candidates make higher-quality, truthful choices with visible evidence.</p></SectionIntro>
  <EvidenceNotice>The position and promise below are working recommendations. They require founder choice and message testing; they are not approved claims.</EvidenceNotice>
  <SectionHeading eyebrow="Working position" title="The language spine" />
  <div className={styles.postureBand}><Pillar label="Category hypothesis" value={workingPosition} tone="dark" /><Pillar label="Working promise" value={workingPromise} tone="accent" /></div>
  <SectionHeading eyebrow="Voice" title="Seven rules for every interface and campaign" />
  <BulletList items={brandPrinciples} />
  <SectionHeading eyebrow="Current → recommended" title="Replace confidence theatre with useful precision" />
  <ComparisonTable rows={brandComparisons} labels={["Current language","Why it is risky","Recommended direction"]} />
  <SectionHeading eyebrow="Calls to action" title="Name the next useful action" />
  <EditorialGrid columns={2}>{ctaDirections.map(([current,improved]) => <EditorialItem key={current} index="CTA" title={improved}><span className={styles.strike}>{current}</span> → {improved}</EditorialItem>)}</EditorialGrid>
  <SectionHeading eyebrow="Naming" title="Keep Nudge Studio only if it behaves like a studio" />
  <EditorialGrid columns={2}><EditorialItem title="Nudge Studio">A job-linked editing environment with evidence, versions, diffs, variants and rollback.</EditorialItem><EditorialItem title="Claims to avoid">Perfect, guaranteed, job-winning, autopilot, hiring probability and universal ATS score—unless a specific, substantiated method supports the exact claim.</EditorialItem></EditorialGrid>
</>; }
