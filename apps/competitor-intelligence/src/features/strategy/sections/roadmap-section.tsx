"use client";

import React, { useMemo, useState } from "react";
import { initiatives } from "../data";
import { decisionStatuses, evidenceStatuses, priorities, roadmapHorizons } from "../types";
import { PriorityBadge, SectionIntro, StatusBadge } from "../primitives";
import styles from "../strategy.module.css";

export function RoadmapSection() {
  const [priority,setPriority] = useState(""); const [workstream,setWorkstream] = useState(""); const [decision,setDecision] = useState(""); const [evidence,setEvidence] = useState(""); const [owner,setOwner] = useState("");
  const workstreams = [...new Set(initiatives.map((item)=>item.workstream))].sort(); const owners = [...new Set(initiatives.map((item)=>item.owner))].sort();
  const filtered = useMemo(() => initiatives.filter((item) => (!priority || item.ai_suggested_priority===priority) && (!workstream || item.workstream===workstream) && (!decision || item.decision_status===decision) && (!evidence || item.evidence_status===evidence) && (!owner || item.owner===owner)), [priority,workstream,decision,evidence,owner]);
  return <><SectionIntro eyebrow="Roadmap" title="Protect and prove before expanding"><p>Five horizons keep sequence separate from importance and approval. Every record remains a recommendation until the founder records a decision.</p></SectionIntro>
  <div className={styles.roadmapFilters}><RoadmapSelect label="Workstream" value={workstream} options={workstreams} set={setWorkstream}/><RoadmapSelect label="Priority" value={priority} options={priorities} set={setPriority}/><RoadmapSelect label="Decision" value={decision} options={decisionStatuses} set={setDecision}/><RoadmapSelect label="Evidence" value={evidence} options={evidenceStatuses} set={setEvidence}/><RoadmapSelect label="Owner" value={owner} options={owners} set={setOwner}/></div>
  <p className={styles.roadmapCount}>{filtered.length} initiatives across the roadmap · filters preserve all five horizons</p>
  <div className={styles.roadmapLanes}>{roadmapHorizons.map((horizon)=><section key={horizon} className={styles.roadmapLane}><header><h2>{horizon}</h2><span>{filtered.filter((item)=>item.roadmap_horizon===horizon).length}</span></header>{filtered.filter((item)=>item.roadmap_horizon===horizon).map((item)=><article key={item.id}><span>{item.id} · {item.workstream}</span><h3>{item.title}</h3><p>{item.recommendation}</p><div><PriorityBadge value={item.ai_suggested_priority}/><StatusBadge kind="decision" value={item.decision_status}/></div><small>Owner · {item.owner}</small></article>)}</section>)}</div>
  </>;
}
function RoadmapSelect({label,value,options,set}:{label:string;value:string;options:readonly string[];set:(value:string)=>void}) { return <label className={styles.filterSelect}><span>{label}</span><select aria-label={label} value={value} onChange={(event)=>set(event.target.value)}><option value="">All</option>{options.map((option)=><option key={option} value={option}>{option}</option>)}</select></label>; }
