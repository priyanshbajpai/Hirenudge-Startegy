"use client";

import { Columns3, GitCompareArrows, Kanban, List, Map, SlidersHorizontal } from "lucide-react";
import React, { useMemo, useState } from "react";
import { filterPrdRecords } from "./data";
import { CurrentChangingView } from "./current-changing-view";
import type { EffectivePrdRecord } from "./local-draft";
import { createEmptyFilters, PrdFilters } from "./prd-filters";
import { usePrd } from "./prd-provider";
import { RecordInspector } from "./record-inspector";
import { RequirementsBoard } from "./requirements-board";
import { RequirementsTable } from "./requirements-table";
import type { PrdFilters as PrdFilterState } from "./types";
import { PrdWorkspaceShell } from "./workspace-shell";
import styles from "./prd.module.css";

export type PrdViewMode = "table" | "priority-board" | "delivery-board" | "current-changing" | "journey" | "timeline";
const viewOptions: { id: PrdViewMode; label: string; icon: React.ComponentType<{ size?: number }> }[] = [
  { id: "table", label: "Requirements", icon: List }, { id: "priority-board", label: "Priority", icon: Kanban }, { id: "delivery-board", label: "Delivery", icon: Columns3 },
  { id: "current-changing", label: "Current → changing", icon: GitCompareArrows }, { id: "journey", label: "Journey", icon: Map }, { id: "timeline", label: "Timeline", icon: SlidersHorizontal },
];

function Journey({ records, onOpen }: { records: EffectivePrdRecord[]; onOpen: (record: EffectivePrdRecord) => void }) {
  const stages = ["Landing Page", "Onboarding", "Dashboard", "Matching", "Workflow", "Outreach", "Tracker", "Interview Prep", "Retention"];
  return <div className={styles.journeyView}>{stages.map((stage, index) => { const matches = records.filter((record) => `${record.workspace} ${record.module} ${record.productArea}`.toLowerCase().includes(stage.toLowerCase())); return <section key={stage}><header><span>{String(index + 1).padStart(2, "0")}</span><h2>{stage}</h2><b>{matches.length}</b></header>{matches.slice(0, 6).map((record) => <button type="button" key={record.id} onClick={() => onOpen(record)}><small>{record.id}</small><strong>{record.title}</strong></button>)}{matches.length > 6 ? <p>+ {matches.length - 6} more requirements</p> : null}</section>; })}</div>;
}

function Timeline({ records, onOpen }: { records: EffectivePrdRecord[]; onOpen: (record: EffectivePrdRecord) => void }) {
  const groups = ["Now", "Next", "Later", "Research", "Blocked"] as const;
  return <div className={styles.timelineView}>{groups.map((group) => <section key={group}><header><h2>{group}</h2><span>{records.filter((record) => record.roadmapHorizon === group).length}</span></header>{records.filter((record) => record.roadmapHorizon === group).map((record) => <button key={record.id} type="button" onClick={() => onOpen(record)}><small>{record.id} · {record.planningEta ?? "Unscheduled"}</small><strong>{record.title}</strong><span>{record.deliveryStatus}</span></button>)}</section>)}</div>;
}

export function RecordsWorkspace({ title, subtitle, eyebrow, workspace, modules, defaultView = "table", before }: { title: string; subtitle: string; eyebrow?: string; workspace?: string; modules?: string[]; defaultView?: PrdViewMode; before?: React.ReactNode }) {
  const { records } = usePrd();
  const [filters, setFilters] = useState<PrdFilterState>(() => ({ ...createEmptyFilters(), workspaces: workspace ? [workspace] : [], modules: modules ?? [] }));
  const [view, setView] = useState<PrdViewMode>(defaultView);
  const [selected, setSelected] = useState<EffectivePrdRecord | null>(null);
  const filtered = useMemo(() => filterPrdRecords(records, filters), [records, filters]);
  const selectedEffective = selected ? records.find((item) => item.id === selected.id) ?? selected : null;
  const actions = <div className={styles.viewSwitcher} role="group" aria-label="PRD view">{viewOptions.map((option) => { const Icon = option.icon; return <button key={option.id} type="button" aria-pressed={view === option.id} onClick={() => setView(option.id)} title={option.label}><Icon size={15} /><span>{option.label}</span></button>; })}</div>;
  return <PrdWorkspaceShell title={title} eyebrow={eyebrow} subtitle={subtitle} query={filters.query} onQueryChange={(query) => setFilters((current) => ({ ...current, query }))} actions={actions}>
    {before}
    <div className={styles.workspaceMeta}><strong>{filtered.length}</strong><span>visible requirements</span><i /><span>{records.length} active records in local draft</span></div>
    <PrdFilters filters={filters} onChange={(next) => setFilters({ ...next, workspaces: workspace ? [workspace] : next.workspaces })} />
    {view === "table" ? <RequirementsTable records={filtered} onOpen={setSelected} /> : null}
    {view === "priority-board" ? <RequirementsBoard records={filtered} mode="category" onOpen={setSelected} /> : null}
    {view === "delivery-board" ? <RequirementsBoard records={filtered} mode="delivery" onOpen={setSelected} /> : null}
    {view === "current-changing" ? <CurrentChangingView records={filtered} onOpen={setSelected} /> : null}
    {view === "journey" ? <Journey records={filtered} onOpen={setSelected} /> : null}
    {view === "timeline" ? <Timeline records={filtered} onOpen={setSelected} /> : null}
    {!filtered.length ? <div className={styles.emptyState}><strong>No requirements match this view.</strong><button type="button" onClick={() => setFilters({ ...createEmptyFilters(), workspaces: workspace ? [workspace] : [] })}>Clear filters</button></div> : null}
    {selectedEffective ? <RecordInspector record={selectedEffective} onClose={() => setSelected(null)} /> : null}
  </PrdWorkspaceShell>;
}
