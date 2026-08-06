"use client";

import React from "react";
import { RecordsWorkspace } from "../records-workspace";
import styles from "../prd.module.css";

const funnel = ["Lead", "Signup", "Activated user", "Beta participant", "Paid customer", "Retained paid customer"];
const cohorts = [
  { label: "India direct", allocation: "25", mode: "Organic", gate: "Select one or two role families from evidence" },
  { label: "TerraTern introductions", allocation: "25", mode: "Consent-gated", gate: "No cross-use without purpose-specific opt-in" },
  { label: "Role communities & coaches", allocation: "25", mode: "Organic / partner", gate: "Use cohort learning, not placement promises" },
  { label: "One corridor experiment", allocation: "25", mode: "Research", gate: "Germany or another corridor requires data and legal validation" },
];

export function GtmFirst100() {
  return <RecordsWorkspace title="GTM & First 100" eyebrow="Cohort planner" subtitle="Allocations are editable hypotheses, not forecasts or reported customer counts." workspace="GTM & First 100" before={<><div className={styles.funnelRail}>{funnel.map((item, index) => <span key={item}><i>{String(index + 1).padStart(2, "0")}</i><strong>{item}</strong></span>)}</div><div className={styles.cohortGrid}>{cohorts.map((cohort) => <article key={cohort.label}><span>{cohort.mode}</span><strong>{cohort.allocation}</strong><h3>{cohort.label}</h3><p>{cohort.gate}</p><small>Allocation for discussion · actual not supplied</small></article>)}</div></>} />;
}
