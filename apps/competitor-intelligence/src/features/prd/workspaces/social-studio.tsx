"use client";
import React from "react";
import { RecordsWorkspace } from "../records-workspace";
import styles from "../prd-views.module.css";
const channels=[{name:"LinkedIn",role:"Founder authority + product evidence",formats:"Teardowns, build decisions, clinics"},{name:"Instagram",role:"Reach + relatable education",formats:"Reels, carousels, short demos"},{name:"X",role:"Fast category learning",formats:"Myths, research notes, build logs"},{name:"Paid",role:"Scale only after activation evidence",formats:"One problem, one artifact, one CTA"}];
export function SocialStudio(){return <RecordsWorkspace title="Social Studio" eyebrow="Organic, founder-led and paid" subtitle="A channel operating plan tied to qualified workflow starts—not vanity output. Competitor ads inform principles only." workspace="Social" before={<div className={styles.channelGrid}>{channels.map(c=><article key={c.name}><span>{c.name}</span><strong>{c.role}</strong><p>{c.formats}</p></article>)}</div>}/>}
