"use client";
import React from "react";
import { RecordsWorkspace } from "../records-workspace";
import styles from "../prd-views.module.css";

const journey = ["Landing", "Onboarding", "Dashboard", "Role", "Application packet", "Outreach", "Tracker", "Interview", "Outcome"];
const principles = [
  ["Current", "Module-first surfaces and disconnected state", "Changing", "One job and its application packet remain the shared context"],
  ["Current", "Scores lead without enough explanation", "Changing", "Requirements, evidence, gaps, unknowns and next action lead"],
  ["Current", "Optional Gmail access appears early", "Changing", "Ask only when a reviewed email is ready to send"],
  ["Current", "Modernisation framed mainly as visual change", "Changing", "Typography, states, accessibility and task continuity define the system"],
];
export function ScreensUx(){return <RecordsWorkspace title="Screens & UX" eyebrow="Journey and interface PRD" subtitle="Compare visible current screens, team-described changes and evidence-safe recommendations. Competitors are reference principles, never templates to reproduce." defaultView="current-changing" before={<><div className={styles.journeyRail}>{journey.map((stage,index)=><span key={stage}><i>{index+1}</i><strong>{stage}</strong></span>)}</div><div className={styles.uxPrinciples}>{principles.map(([a,b,c,d])=><article key={b}><span>{a}</span><p>{b}</p><span>{c}</span><strong>{d}</strong></article>)}</div></>} />}
