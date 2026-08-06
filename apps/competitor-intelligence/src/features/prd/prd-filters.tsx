"use client";

import { Filter, RotateCcw } from "lucide-react";
import React from "react";
import { prdModules, prdOwners } from "./data";
import { decisionStatuses, deliveryStatuses, evidenceStatuses, requirementCategories, roadmapHorizons, type PrdFilters as PrdFilterState } from "./types";
import styles from "./prd.module.css";

const emptyFilters: PrdFilterState = { query: "", workspaces: [], modules: [], categories: [], deliveryStatuses: [], decisionStatuses: [], evidenceStatuses: [], owners: [], horizons: [], complianceStates: [] };
export const createEmptyFilters = () => ({ ...emptyFilters });

function Select({ label, value, options, onChange }: { label: string; value: string; options: readonly string[]; onChange: (value: string) => void }) {
  return <label className={styles.filterField}><span>{label}</span><select value={value} onChange={(event) => onChange(event.target.value)}><option value="">All</option>{options.map((option) => <option key={option} value={option}>{option}</option>)}</select></label>;
}

export function PrdFilters({ filters, onChange }: { filters: PrdFilterState; onChange: (filters: PrdFilterState) => void }) {
  const setOne = (key: keyof PrdFilterState, value: string) => onChange({ ...filters, [key]: key === "query" ? value : value ? [value] : [] });
  const active = Object.entries(filters).some(([, value]) => Array.isArray(value) ? value.length : Boolean(value));
  return <div className={styles.filters} aria-label="Requirement filters">
    <div className={styles.filterHeading}><Filter size={15} aria-hidden="true" /><span>Filter this view</span>{active ? <button type="button" onClick={() => onChange(createEmptyFilters())}><RotateCcw size={13} aria-hidden="true" />Clear</button> : null}</div>
    <div className={styles.filterGrid}>
      <Select label="Module" value={filters.modules[0] ?? ""} options={prdModules} onChange={(value) => setOne("modules", value)} />
      <Select label="Category" value={filters.categories[0] ?? ""} options={requirementCategories} onChange={(value) => setOne("categories", value)} />
      <Select label="Delivery" value={filters.deliveryStatuses[0] ?? ""} options={deliveryStatuses} onChange={(value) => setOne("deliveryStatuses", value)} />
      <Select label="Decision" value={filters.decisionStatuses[0] ?? ""} options={decisionStatuses} onChange={(value) => setOne("decisionStatuses", value)} />
      <Select label="Evidence" value={filters.evidenceStatuses[0] ?? ""} options={evidenceStatuses} onChange={(value) => setOne("evidenceStatuses", value)} />
      <Select label="Owner" value={filters.owners[0] ?? ""} options={prdOwners} onChange={(value) => setOne("owners", value)} />
      <Select label="Roadmap" value={filters.horizons[0] ?? ""} options={roadmapHorizons} onChange={(value) => setOne("horizons", value)} />
    </div>
  </div>;
}
