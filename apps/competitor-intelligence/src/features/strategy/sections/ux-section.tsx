import React from "react";
import { interfaceDirections, journeyStages, mascotDirection, uxComparisons, visualPrinciples } from "../content";
import { EvidenceNotice, SectionHeading, SectionIntro } from "../primitives";
import { BulletList, ComparisonTable, EditorialGrid, EditorialItem, Flow } from "./shared";
import styles from "../strategy.module.css";

export function UxSection() { return <>
  <SectionIntro eyebrow="UI / UX direction" title="Reframe the product around the job seeker’s next decision"><p>Modernisation should clarify the journey, status and evidence—not decorate disconnected modules. Prototype the job-centered loop before redesigning every surface.</p></SectionIntro>
  <EvidenceNotice>Teal, Careerflow, Simplify, Huntr and Jobright are reference principles only. No layout, brand expression, character or distinctive interaction should be copied.</EvidenceNotice>
  <SectionHeading eyebrow="Proposed journey" title="One role. One packet. One visible next step." />
  <Flow items={journeyStages.map((item) => ({title:item.title,detail:item.detail}))} />
  <SectionHeading eyebrow="Before / after" title="Change the information architecture before the polish" />
  <ComparisonTable rows={uxComparisons} labels={["Current pattern","Recommended pattern","Validation"]} />
  <SectionHeading eyebrow="Module direction" title="A coherent system at every surface" />
  <EditorialGrid columns={3}>{interfaceDirections.map((item,index) => <EditorialItem key={item.title} index={String(index+1).padStart(2,"0")} title={item.title}>{item.text}</EditorialItem>)}</EditorialGrid>
  <SectionHeading eyebrow="Visual system" title="Editorial clarity with controlled expression" />
  <div className={styles.splitEditorial}><BulletList items={visualPrinciples} /><EditorialItem index="GUIDE" title="Mascot direction">{mascotDirection}</EditorialItem></div>
</>; }
