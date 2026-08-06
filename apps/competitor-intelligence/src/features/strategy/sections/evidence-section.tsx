import React from "react";
import { ArrowUpRight } from "lucide-react";
import { evidenceDefinitions, evidenceSummary, researchUnknowns } from "../content";
import { initiatives } from "../data";
import { sourceRegisterUrl } from "../sources";
import { EvidenceNotice, SectionHeading, SectionIntro, StatusBadge } from "../primitives";
import { BulletList, EditorialGrid, EditorialItem, MetricStrip } from "./shared";
import styles from "../strategy.module.css";

export function EvidenceSection() { const sourceCount = new Set(initiatives.flatMap((item) => item.evidence_sources)).size; return <>
  <SectionIntro eyebrow="Research & evidence" title="Keep the strategy traceable to what is known—and unknown"><p>The dashboard compresses the founder meeting. The register and source archive preserve the evidence, uncertainty, dependency and validation path behind each recommendation.</p></SectionIntro>
  <MetricStrip items={evidenceSummary.map((item) => ({value:item.value,label:item.label,note:item.note}))} />
  <EvidenceNotice>Input counts describe the research archive only. They are not product usage, ad performance, traction or customer outcome metrics.</EvidenceNotice>
  <SectionHeading eyebrow="Evidence model" title="Seven labels, no silent promotion of certainty" />
  <EditorialGrid columns={3}>{evidenceDefinitions.map((item) => <EditorialItem key={item.status} title={item.status} aside={<StatusBadge kind="evidence" value={item.status} />}>{item.meaning}</EditorialItem>)}</EditorialGrid>
  <SectionHeading eyebrow="Source access" title={`${sourceCount} source references across the initiative register`} />
  <a className={styles.sourceAction} href={sourceRegisterUrl} target="_blank" rel="noreferrer"><span><b>Open the canonical source register</b><small>URL, access date, supported claim, reliability and limitation</small></span><ArrowUpRight aria-hidden="true" /></a>
  <SectionHeading eyebrow="Research queue" title="The most important missing evidence is internal" />
  <BulletList items={researchUnknowns} alert />
  <SectionHeading eyebrow="Interpretation rules" title="What the dashboard refuses to infer" />
  <EditorialGrid columns={3}><EditorialItem title="Screens are interface evidence">They do not prove backend operation, data quality, adoption or customer value.</EditorialItem><EditorialItem title="Marketing is a claim">Competitor and HireNudge copy stays attributed until independently verified.</EditorialItem><EditorialItem title="Discussion is not approval">Every founder choice remains To Be Discussed until the company records a decision.</EditorialItem></EditorialGrid>
</>; }
