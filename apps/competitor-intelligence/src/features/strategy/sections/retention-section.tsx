import React from "react";
import { lifecycleControls, lifecycleRows, retentionSuccessMetrics, searchStatuses } from "../content";
import { EvidenceNotice, SectionHeading, SectionIntro } from "../primitives";
import { BulletList, EditorialGrid, EditorialItem } from "./shared";
import styles from "../strategy.module.css";

export function RetentionSection() { return <>
  <SectionIntro eyebrow="Retention & lifecycle" title="Follow the search state, not a fixed email calendar"><p>Every message should help the user complete a chosen job-search action. Silence is a valid outcome when nothing fresh, relevant or consented exists.</p></SectionIntro>
  <EvidenceNotice>Lifecycle recommendations require event integrity, category consent, suppression and frequency controls. They are not an instruction to increase message volume.</EvidenceNotice>
  <SectionHeading eyebrow="Search state" title="The first personalisation decision" />
  <div className={styles.stateRail}>{searchStatuses.map((status,index) => <span key={status}><i>{String(index+1).padStart(2,"0")}</i>{status}</span>)}</div>
  <SectionHeading eyebrow="Lifecycle matrix" title="Trigger, value, exit and metric" />
  <div className={styles.lifecycleList}>{lifecycleRows.map((row) => <article key={row.moment}><header><span>{row.trigger}</span><h3>{row.moment}</h3></header><dl><div><dt>User value</dt><dd>{row.value}</dd></div><div><dt>CTA</dt><dd>{row.cta}</dd></div><div><dt>Exit rule</dt><dd>{row.exit}</dd></div><div><dt>Metric</dt><dd>{row.metric}</dd></div></dl></article>)}</div>
  <SectionHeading eyebrow="Control layer" title="Preferences are part of the product" />
  <EditorialGrid columns={2}><EditorialItem title="Required controls"><BulletList items={lifecycleControls} /></EditorialItem><EditorialItem title="Principle">Product-critical and marketing communication must stay separate. Use the smallest useful payload, no sensitive details in previews, and no send when qualifying evidence is absent.</EditorialItem></EditorialGrid>
  <SectionHeading eyebrow="Measurement" title="Prove incremental value without notification fatigue" />
  <BulletList items={retentionSuccessMetrics} />
</>; }
