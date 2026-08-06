import React from "react";
import { cohortRules, conversionAssumptions, customerAllocation, customerDefinitions, first100Weeks, operatingRoles, requiredAssets } from "../content";
import { EvidenceNotice, SectionHeading, SectionIntro } from "../primitives";
import { BulletList, EditorialGrid, EditorialItem } from "./shared";
import styles from "../strategy.module.css";

export function First100Section() { return <>
  <SectionIntro eyebrow="First 100 customers" title="One hundred paying learners, not one hundred sign-ups"><p>Run four cohorts of 25 eligible paying customers. Calibrate with the first ten, make a decision after every cohort, and protect the distinction between reach and retained value.</p></SectionIntro>
  <EvidenceNotice>The channel counts are allocations, not forecasts. No lead-to-paid, activation or D7 conversion baseline was supplied.</EvidenceNotice>
  <SectionHeading eyebrow="Definitions" title="Count the right thing" />
  <div className={styles.definitionLadder}>{customerDefinitions.map((item,index) => <EditorialItem key={item.label} index={String(index+1).padStart(2,"0")} title={item.label}>{item.definition}</EditorialItem>)}</div>
  <SectionHeading eyebrow="Channel allocation" title="A learning portfolio that totals 100" />
  <div className={styles.allocation}><div className={styles.allocationBar}>{customerAllocation.map((item,index) => <span key={item.channel} style={{width:`${item.count}%`}} data-index={index} title={`${item.channel}: ${item.count}`} />)}</div>{customerAllocation.map((item,index) => <div key={item.channel}><i data-index={index} /> <span>{item.channel}</span><strong>{item.count}</strong></div>)}</div>
  <SectionHeading eyebrow="12-week plan" title="Four cohorts and explicit decision moments" />
  <div className={styles.weekGrid}>{first100Weeks.map((week) => <EditorialItem key={week.week} index={`W${String(week.week).padStart(2,"0")}`} title={week.focus}><p>{week.target}</p><small>Learning · {week.learning}</small></EditorialItem>)}</div>
  <SectionHeading eyebrow="Operating requirements" title="Assets and accountable owners before recruitment" />
  <EditorialGrid columns={2}><EditorialItem title="Required assets"><BulletList items={requiredAssets} /></EditorialItem><EditorialItem title="Owners are unresolved">{operatingRoles.map((item) => <p key={item.role}><b>{item.role}</b> · {item.owner}<br /><small>{item.responsibility}</small></p>)}</EditorialItem></EditorialGrid>
  <SectionHeading eyebrow="Assumptions" title="Calibrate before forecasting" />
  <BulletList items={conversionAssumptions} />
  <SectionHeading eyebrow="Decision rules" title="Scale, modify or stop" />
  <EditorialGrid columns={3}>{cohortRules.map((rule) => <EditorialItem key={rule.action} index={rule.action.toUpperCase()} title={rule.action}>{rule.condition}</EditorialItem>)}</EditorialGrid>
</>; }
