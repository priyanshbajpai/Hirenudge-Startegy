"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { ArrowUpRight, Search, SlidersHorizontal, X } from "lucide-react";
import { filterInitiatives, getInitiativeModules, moduleOptions } from "./data";
import { resolveEvidenceSource } from "./sources";
import { decisionStatuses, evidenceStatuses, initiativeTypes, priorities, roadmapHorizons, type Initiative, type InitiativeFilters, type ProductModule } from "./types";
import { EmptyState, LabelValue, PriorityBadge, StatusBadge } from "./primitives";
import styles from "./strategy.module.css";

type SelectKey = "priority" | "type" | "evidence" | "decision" | "horizon" | "workstream" | "owner" | "module";
type Selection = Record<SelectKey, string>;
const initialSelection: Selection = { priority: "", type: "", evidence: "", decision: "", horizon: "", workstream: "", owner: "", module: "" };

export function InitiativeExplorer({ initiatives, showModuleFilter = false, showOwnerFilter = false, compact = false }: { initiatives: readonly Initiative[]; showModuleFilter?: boolean; showOwnerFilter?: boolean; compact?: boolean }) {
  const [query, setQuery] = useState("");
  const [selection, setSelection] = useState<Selection>(initialSelection);
  const [selected, setSelected] = useState<Initiative | null>(null);
  const workstreams = useMemo(() => [...new Set(initiatives.map((item) => item.workstream))].sort(), [initiatives]);
  const owners = useMemo(() => [...new Set(initiatives.map((item) => item.owner))].sort(), [initiatives]);
  const activeCount = Number(Boolean(query.trim())) + Object.values(selection).filter(Boolean).length;
  const filters: InitiativeFilters = {
    query,
    workstreams: selection.workstream ? [selection.workstream] : undefined,
    priorities: selection.priority ? [selection.priority as Initiative["ai_suggested_priority"]] : undefined,
    initiativeTypes: selection.type ? [selection.type as Initiative["initiative_type"]] : undefined,
    evidenceStatuses: selection.evidence ? [selection.evidence as Initiative["evidence_status"]] : undefined,
    decisionStatuses: selection.decision ? [selection.decision as Initiative["decision_status"]] : undefined,
    horizons: selection.horizon ? [selection.horizon as Initiative["roadmap_horizon"]] : undefined,
    owners: selection.owner ? [selection.owner] : undefined,
    modules: selection.module ? [selection.module as ProductModule] : undefined,
  };
  const filtered = filterInitiatives(initiatives, filters);
  const clear = () => { setQuery(""); setSelection(initialSelection); };
  const update = (key: SelectKey, value: string) => setSelection((current) => ({ ...current, [key]: value }));

  return <section className={styles.explorer} aria-label="Initiative register">
    <div className={styles.filterBar}>
      <label className={styles.searchField}><Search aria-hidden="true" size={17} /><span className={styles.srOnly}>Search initiatives</span><input type="search" aria-label="Search initiatives" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search initiatives, problems or sources" /></label>
      <FilterSelect label="Workstream" value={selection.workstream} options={workstreams} onChange={(value) => update("workstream", value)} />
      <FilterSelect label="Priority" value={selection.priority} options={priorities} onChange={(value) => update("priority", value)} />
      <FilterSelect label="Initiative type" value={selection.type} options={initiativeTypes} onChange={(value) => update("type", value)} />
      <FilterSelect label="Evidence status" value={selection.evidence} options={evidenceStatuses} onChange={(value) => update("evidence", value)} />
      <FilterSelect label="Decision status" value={selection.decision} options={decisionStatuses} onChange={(value) => update("decision", value)} />
      <FilterSelect label="Roadmap" value={selection.horizon} options={roadmapHorizons} onChange={(value) => update("horizon", value)} />
      {showModuleFilter ? <FilterSelect label="Module" value={selection.module} options={moduleOptions} onChange={(value) => update("module", value)} /> : null}
      {showOwnerFilter ? <FilterSelect label="Owner" value={selection.owner} options={owners} onChange={(value) => update("owner", value)} /> : null}
    </div>
    <div className={styles.resultSummary} aria-live="polite"><span><SlidersHorizontal aria-hidden="true" size={15} /> {filtered.length} {filtered.length === 1 ? "initiative" : "initiatives"} shown</span>{activeCount ? <button type="button" onClick={clear} aria-label="Clear all filters">{activeCount} active {activeCount === 1 ? "filter" : "filters"} <X aria-hidden="true" size={14} /></button> : <span>All register records</span>}</div>
    {filtered.length ? <div className={compact ? styles.initiativeListCompact : styles.initiativeList}>{filtered.map((initiative) => <InitiativeRow key={initiative.id} initiative={initiative} onOpen={() => setSelected(initiative)} />)}</div> : <EmptyState title="No initiatives match these filters">Adjust the search or clear the selected filters to restore the complete register.</EmptyState>}
    {selected ? <InitiativeDialog initiative={selected} onClose={() => setSelected(null)} /> : null}
  </section>;
}

function FilterSelect({ label, value, options, onChange }: { label: string; value: string; options: readonly string[]; onChange: (value: string) => void }) {
  return <label className={styles.filterSelect}><span>{label}</span><select aria-label={label} value={value} onChange={(event) => onChange(event.target.value)}><option value="">All</option>{options.map((option) => <option value={option} key={option}>{option}</option>)}</select></label>;
}

export function InitiativeRow({ initiative, onOpen }: { initiative: Initiative; onOpen: () => void }) {
  return <article className={styles.initiativeRow}>
    <div className={styles.initiativeIdentity}><span>{initiative.id} · {initiative.workstream} / {initiative.sub_workstream}</span><h3>{initiative.title}</h3><p>{initiative.recommendation}</p></div>
    <div className={styles.initiativeStatus}><PriorityBadge value={initiative.ai_suggested_priority} /><StatusBadge kind="decision" value={initiative.decision_status} /><StatusBadge kind="evidence" value={initiative.evidence_status} /><StatusBadge kind="horizon" value={initiative.roadmap_horizon} /></div>
    <div className={styles.initiativeMeta}><span><b>Type</b>{initiative.initiative_type}</span><span><b>State</b>{initiative.current_state}</span><span><b>Confidence</b>{initiative.confidence}</span><span><b>Expected impact</b>{initiative.expected_user_impact}</span></div>
    <button className={styles.detailButton} type="button" aria-label={`View details for ${initiative.title}`} onClick={onOpen}>View full brief <ArrowUpRight aria-hidden="true" size={15} /></button>
  </article>;
}

function InitiativeDialog({ initiative, onClose }: { initiative: Initiative; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => { if (event.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey); closeRef.current?.focus();
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);
  return <div className={styles.dialogBackdrop} role="presentation" onMouseDown={(event) => { if (event.currentTarget === event.target) onClose(); }}><section className={styles.dialog} role="dialog" aria-modal="true" aria-labelledby={`initiative-${initiative.id}`}>
    <header className={styles.dialogHeader}><div><span>{initiative.id} · {getInitiativeModules(initiative).join(" · ")}</span><h2 id={`initiative-${initiative.id}`}>{initiative.title}</h2></div><button ref={closeRef} type="button" onClick={onClose} aria-label="Close initiative details"><X aria-hidden="true" /></button></header>
    <div className={styles.dialogBadges}><PriorityBadge value={initiative.ai_suggested_priority} /><StatusBadge kind="decision" value={initiative.decision_status} /><StatusBadge kind="evidence" value={initiative.evidence_status} /><StatusBadge kind="horizon" value={initiative.roadmap_horizon} /><StatusBadge kind="type" value={initiative.initiative_type} /></div>
    <dl className={styles.detailList}>
      <LabelValue label="Current state">{initiative.current_state}</LabelValue><LabelValue label="User problem">{initiative.problem}</LabelValue><LabelValue label="Recommendation">{initiative.recommendation}</LabelValue><LabelValue label="Target user">{initiative.target_user}</LabelValue><LabelValue label="Impact"><b>User:</b> {initiative.expected_user_impact}<br /><b>Business:</b> {initiative.expected_business_impact}</LabelValue><LabelValue label="Effort / owner">{initiative.effort} · {initiative.owner}</LabelValue><LabelValue label="Technical dependencies"><TextList values={initiative.technical_dependencies} /></LabelValue><LabelValue label="Data dependencies"><TextList values={initiative.data_dependencies} /></LabelValue><LabelValue label="Legal dependencies"><TextList values={initiative.legal_dependencies} /></LabelValue><LabelValue label="Risks"><TextList values={initiative.risks} /></LabelValue><LabelValue label="Success metrics"><TextList values={initiative.success_metrics} /></LabelValue><LabelValue label="Supporting evidence"><TextList values={initiative.evidence_sources.map((source) => <a key={source} href={resolveEvidenceSource(source)} target="_blank" rel="noreferrer">{source} <ArrowUpRight aria-hidden="true" size={13} /></a>)} /></LabelValue><LabelValue label="Founder question"><strong>{initiative.founder_question}</strong></LabelValue>{initiative.notes ? <LabelValue label="Notes">{initiative.notes}</LabelValue> : null}
    </dl>
  </section></div>;
}

function TextList({ values }: { values: readonly (string | React.ReactNode)[] }) { return values.length ? <ul className={styles.textList}>{values.map((value, index) => <li key={typeof value === "string" ? value : index}>{value}</li>)}</ul> : <span>None recorded</span>; }
