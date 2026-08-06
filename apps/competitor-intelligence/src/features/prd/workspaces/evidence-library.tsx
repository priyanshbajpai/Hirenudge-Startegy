"use client";
import React from "react";
import { RecordsWorkspace } from "../records-workspace";
import styles from "../prd-views.module.css";
export function EvidenceLibrary(){return <RecordsWorkspace title="Evidence Library" eyebrow="Provenance and unknowns" subtitle="Trace every important requirement to supplied PRDs, visible product evidence, team discussion or an official external source. Screenshots prove interface state only—not backend behavior." before={<div className={styles.evidenceRules}><strong>Evidence rules</strong><span>Observed ≠ technically verified</span><span>Discussed ≠ approved</span><span>Competitor marketing ≠ confirmed capability</span><span>Policy text ≠ implemented control</span></div>}/>}
