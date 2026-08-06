"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Grid2X2, X } from "lucide-react";
import { usePrd } from "../prd/prd-provider";
import { PrdBadge } from "../prd/prd-badges";
import type { EffectivePrdRecord } from "../prd/local-draft";
import { presentationChapters } from "./presentation";
import styles from "./strategy.module.css";

function relatedForChapter(index: number, records: EffectivePrdRecord[]) {
  const selectors: Array<(record: EffectivePrdRecord) => boolean> = [
    (r) => r.category === "Current",
    () => true,
    (r) => r.category === "Must Have",
    (r) => ["In Design", "In Development", "In QA"].includes(r.deliveryStatus),
    (r) => r.workspace === "Product Modules" && ["Must Have", "Important"].includes(r.category),
    (r) => ["Good to Have", "To Be Decided"].includes(r.category),
    (r) => ["Landing Page", "Onboarding"].includes(r.workspace),
    (r) => r.workspace === "Landing Page" && /copy|claim|position|name/i.test(`${r.title} ${r.module}`),
    (r) => r.workspace === "Social",
    (r) => r.workspace === "GTM & First 100",
    (r) => r.workspace === "GTM & First 100",
    (r) => r.workspace === "Activation & Retention",
    (r) => ["Now", "Next"].includes(r.roadmapHorizon),
    (r) => r.risks.length > 0 || r.roadmapHorizon === "Blocked",
    (r) => r.decisionStatus === "To Be Discussed",
  ];
  return records.filter(selectors[index] ?? (() => true)).sort((a,b) => a.aiSuggestedPriority.localeCompare(b.aiSuggestedPriority)).slice(0, 4);
}

export function StrategyPresentation() {
  const { records } = usePrd();
  const [index, setIndex] = useState(0);
  const [navigator, setNavigator] = useState(false);
  const chapter = presentationChapters[index];
  const go = useCallback((next: number) => setIndex(Math.max(0, Math.min(presentationChapters.length - 1, next))), []);
  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight" || event.key === "PageDown" || event.key === " ") { event.preventDefault(); go(index + 1); }
      if (event.key === "ArrowLeft" || event.key === "PageUp") { event.preventDefault(); go(index - 1); }
      if (event.key === "Home") go(0);
      if (event.key === "End") go(presentationChapters.length - 1);
      if (event.key === "Escape") setNavigator(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [go, index]);
  const related = useMemo(() => relatedForChapter(index, records), [index, records]);
  return <main className={styles.presentationRoot}>
    <header className={styles.presentationHeader}><Link href="/strategy"><ArrowLeft aria-hidden="true"/> Exit presentation</Link><span>HireNudge · PRD Command Center · <b>Local PRD draft</b></span><button type="button" aria-label="Open chapter navigator" onClick={()=>setNavigator(true)}><Grid2X2 aria-hidden="true"/> Chapters</button></header>
    <div className={styles.presentationProgress}><span style={{width:`${((index+1)/presentationChapters.length)*100}%`}}/></div>
    <section className={styles.presentationStage} aria-live="polite"><div className={styles.presentationCopy}><p>{chapter.eyebrow} · <b>{String(chapter.number).padStart(2,"0")} / {presentationChapters.length}</b></p><h1>{chapter.title}</h1><blockquote>{chapter.thesis}</blockquote><ul>{chapter.bullets.map((item)=><li key={item}>{item}</li>)}</ul></div>
      <div className={index===presentationChapters.length-1 ? styles.presentationDecisions : styles.presentationRelated}>{related.map((record)=><article key={record.id}><span>{record.id} · {record.module}</span><h2>{index===presentationChapters.length-1 ? record.founderQuestion : record.title}</h2><div><PrdBadge kind="priority" value={record.founderPriority ?? record.aiSuggestedPriority}/><PrdBadge kind="decision" value={record.decisionStatus}/></div></article>)}</div>
    </section>
    <footer className={styles.presentationFooter}><span>{String(index+1).padStart(2,"0")} / {presentationChapters.length}</span><div><button type="button" aria-label="Previous chapter" disabled={index===0} onClick={()=>go(index-1)}><ArrowLeft aria-hidden="true"/> Previous</button><button type="button" aria-label="Next chapter" disabled={index===presentationChapters.length-1} onClick={()=>go(index+1)}>Next <ArrowRight aria-hidden="true"/></button></div></footer>
    {navigator?<div className={styles.chapterOverlay}><div><header><h2>Presentation chapters</h2><button type="button" aria-label="Close chapter navigator" onClick={()=>setNavigator(false)}><X aria-hidden="true"/></button></header><nav aria-label="Presentation chapters">{presentationChapters.map((item,itemIndex)=><button key={item.number} type="button" aria-current={itemIndex===index?"step":undefined} onClick={()=>{go(itemIndex);setNavigator(false);}}><span>{String(item.number).padStart(2,"0")}</span>{item.title}</button>)}</nav></div></div>:null}
  </main>;
}
