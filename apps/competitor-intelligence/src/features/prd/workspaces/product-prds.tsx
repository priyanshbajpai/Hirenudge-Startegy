"use client";

import React from "react";
import { RecordsWorkspace } from "../records-workspace";
import styles from "../prd.module.css";

const moduleMap = [
  ["Nudge Studio", "Resume Studio"], ["AI Job Matcher", "AI Job Matcher"], ["Email Outreach", "Outreach"], ["Job Tracker", "Job Tracker"], ["Interview Preparation", "Interview Prep"],
] as const;

export function ProductPrds({ initialWorkspace }: { initialWorkspace?: "Onboarding" }) {
  return <RecordsWorkspace title={initialWorkspace ? "Onboarding PRD" : "Product PRDs"} subtitle={initialWorkspace ? "From account entry to a credible first role and a clear next action." : "Every visible capability, proposed improvement, requirement, dependency and decision in one operating workspace."} workspace={initialWorkspace ?? "Product Modules"} defaultView={initialWorkspace ? "current-changing" : "table"} before={<div className={styles.moduleStrip} aria-label="Core product modules">{moduleMap.map(([label, source]) => <span key={label}><strong>{label}</strong><small>Mapped to {source}</small></span>)}</div>} />;
}
