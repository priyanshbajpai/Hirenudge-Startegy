"use client";

import React, { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Grid2X2, X } from "lucide-react";
import { initiatives } from "./data";
import { founderDecisions } from "./decisions";
import { presentationChapters } from "./presentation";
import { PriorityBadge, StatusBadge } from "./primitives";
import styles from "./strategy.module.css";

export function StrategyPresentation() { const [index,setIndex]=useState(0); const [navigator,setNavigator]=useState(false); const chapter=presentationChapters[index]; const go=useCallback((next:number)=>setIndex(Math.max(0,Math.min(presentationChapters.length-1,next))),[]);
  useEffect(()=>{const handler=(event:KeyboardEvent)=>{if(event.key==="ArrowRight"||event.key==="PageDown"||event.key===" "){event.preventDefault();go(index+1);}if(event.key==="ArrowLeft"||event.key==="PageUp"){event.preventDefault();go(index-1);}if(event.key==="Home")go(0);if(event.key==="End")go(presentationChapters.length-1);if(event.key==="Escape")setNavigator(false);};window.addEventListener("keydown",handler);return()=>window.removeEventListener("keydown",handler);},[go,index]);
  const related=initiatives.filter((item)=>chapter.initiativeIds?.includes(item.id)).slice(0,5);
  return <main className={styles.presentationRoot}>
    <header className={styles.presentationHeader}><Link href="/strategy"><ArrowLeft aria-hidden="true"/> Exit presentation</Link><span>HireNudge · Founder Strategy</span><button type="button" aria-label="Open chapter navigator" onClick={()=>setNavigator(true)}><Grid2X2 aria-hidden="true"/> Chapters</button></header>
    <div className={styles.presentationProgress}><span style={{width:`${((index+1)/presentationChapters.length)*100}%`}}/></div>
    <section className={styles.presentationStage} aria-live="polite"><div className={styles.presentationCopy}><p>{chapter.eyebrow} · <b>{String(chapter.number).padStart(2,"0")} / {presentationChapters.length}</b></p><h1>{chapter.title}</h1><blockquote>{chapter.thesis}</blockquote><ul>{chapter.bullets.map((item)=><li key={item}>{item}</li>)}</ul></div>
      {index===presentationChapters.length-1?<div className={styles.presentationDecisions}>{founderDecisions.slice(0,5).map((decision)=><article key={decision.id}><span>{decision.id}</span><h2>{decision.question}</h2><PriorityBadge value={decision.priority}/><StatusBadge kind="decision" value={decision.status}/></article>)}</div>:related.length?<div className={styles.presentationRelated}>{related.map((item)=><article key={item.id}><span>{item.id}</span><h2>{item.title}</h2><div><PriorityBadge value={item.ai_suggested_priority}/><StatusBadge kind="decision" value={item.decision_status}/></div></article>)}</div>:null}
    </section>
    <footer className={styles.presentationFooter}><span>{String(index+1).padStart(2,"0")} / {presentationChapters.length}</span><div><button type="button" aria-label="Previous chapter" disabled={index===0} onClick={()=>go(index-1)}><ArrowLeft aria-hidden="true"/> Previous</button><button type="button" aria-label="Next chapter" disabled={index===presentationChapters.length-1} onClick={()=>go(index+1)}>Next <ArrowRight aria-hidden="true"/></button></div></footer>
    {navigator?<div className={styles.chapterOverlay}><div><header><h2>Presentation chapters</h2><button type="button" aria-label="Close chapter navigator" onClick={()=>setNavigator(false)}><X aria-hidden="true"/></button></header><nav aria-label="Presentation chapters">{presentationChapters.map((item,itemIndex)=><button key={item.number} type="button" aria-current={itemIndex===index?"step":undefined} onClick={()=>{go(itemIndex);setNavigator(false);}}><span>{String(item.number).padStart(2,"0")}</span>{item.title}</button>)}</nav></div></div>:null}
  </main>;
}
