import React from "react";
import { initiatives } from "../data";
import { observedCapabilities, productSystem } from "../content";
import { InitiativeExplorer } from "../initiative-explorer";
import { EvidenceNotice, SectionHeading, SectionIntro } from "../primitives";
import { BulletList, Flow, MetricStrip } from "./shared";

export function ProductSection() { const counts = (type: string) => initiatives.filter((item) => item.initiative_type === type).length; return <>
  <SectionIntro eyebrow="Product & features" title="Connect one real application from role to outcome"><p>HireNudge already spans much of the job-search journey. The product decision is how those modules become one truthful, versioned and measurable system.</p></SectionIntro>
  <MetricStrip items={[{value:counts("Existing"),label:"Existing"},{value:counts("In Progress"),label:"In progress"},{value:counts("Improvement"),label:"Improvements"},{value:counts("Proposed"),label:"Proposed"},{value:counts("Not Recommended"),label:"Not recommended"}]} />
  <EvidenceNotice>Observed screens prove interface presence, not backend completeness, data quality, customer value or live status. Every initiative keeps its own evidence and decision label.</EvidenceNotice>
  <SectionHeading eyebrow="Core object" title="From a module suite to an application system" description="The packet links candidate evidence and a verified job to documents, outreach, history, next action and outcome." />
  <Flow items={productSystem} />
  <SectionHeading eyebrow="Observed coverage" title="What HireNudge visibly has today" />
  <BulletList items={observedCapabilities} />
  <SectionHeading eyebrow="Canonical register" title="Explore all product and enabling initiatives" description="Search and combine module, workstream, priority, type, evidence, decision and roadmap filters. Open any row for dependencies, risks, sources, metrics and founder question." />
  <InitiativeExplorer initiatives={initiatives} showModuleFilter />
</>; }
