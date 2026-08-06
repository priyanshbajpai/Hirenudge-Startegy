"use client";
import React from "react";
import { RecordsWorkspace } from "../records-workspace";
import styles from "../prd-views.module.css";
const loop=["Choose one live role","Create a truthful packet","Submit with review","Track next action","Prepare for interview","Record outcome","Start the next best action"];
export function ActivationRetention(){return <RecordsWorkspace title="Activation & Retention" eyebrow="Outcome loop" subtitle="Design repeat value around an active job search. A user getting a job and leaving can be a successful outcome; retention should come from trust, continuity, referral and future search utility—not artificial lock-in." workspace="Activation & Retention" before={<div className={styles.loopRail}>{loop.map((x,i)=><span key={x}><i>{i+1}</i><strong>{x}</strong></span>)}</div>}/>}
