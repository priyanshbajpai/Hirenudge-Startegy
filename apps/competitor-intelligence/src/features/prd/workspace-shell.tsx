"use client";

import { Download, FileInput, Search, Trash2, Upload, X } from "lucide-react";
import React, { useRef, useState, type ReactNode } from "react";
import { usePrd } from "./prd-provider";
import styles from "./prd.module.css";

export function PrdWorkspaceShell({ title, eyebrow, subtitle, query = "", onQueryChange, actions, children }: { title: string; eyebrow?: string; subtitle?: string; query?: string; onQueryChange?: (value: string) => void; actions?: ReactNode; children: ReactNode }) {
  const { exportDraft, importDraft, lastSavedAt, removedRecords, restoreRecord, resetAll } = usePrd();
  const [showRemoved, setShowRemoved] = useState(false);
  const [importError, setImportError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const handleImport = async (file?: File) => {
    if (!file) return;
    try { importDraft(await file.text()); setImportError(""); } catch (error) { setImportError(error instanceof Error ? error.message : "Import failed."); }
    if (inputRef.current) inputRef.current.value = "";
  };
  return <section className={styles.workspace}>
    <header className={styles.workspaceHeader}>
      <div><span className={styles.eyebrow}>{eyebrow ?? "Founder PRD & Execution Workspace"}</span><h1>{title}</h1>{subtitle ? <p>{subtitle}</p> : null}</div>
      <div className={styles.draftStatus}><i aria-hidden="true" /><span><strong>Local draft</strong><small>{lastSavedAt ? `Saved ${new Date(lastSavedAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}` : "Browser only · not shared"}</small></span></div>
    </header>
    <div className={styles.commandBar}>
      <label className={styles.searchBox}><Search size={17} aria-hidden="true" /><span className={styles.srOnly}>Search requirements</span><input type="search" aria-label="Search requirements" value={query} onChange={(event) => onQueryChange?.(event.target.value)} placeholder="Search requirements, screens, modules…" /></label>
      <div className={styles.commandActions}>{actions}<button type="button" onClick={exportDraft} aria-label="Export local changes"><Download size={15} aria-hidden="true" />Export</button><button type="button" onClick={() => inputRef.current?.click()} aria-label="Import local changes"><Upload size={15} aria-hidden="true" />Import</button><input ref={inputRef} hidden type="file" accept="application/json" onChange={(event) => void handleImport(event.target.files?.[0])} /><button type="button" onClick={() => setShowRemoved(true)} aria-label="Removed items"><Trash2 size={15} aria-hidden="true" />Removed <span>{removedRecords.length}</span></button></div>
    </div>
    {importError ? <p className={styles.inlineError} role="alert">{importError}</p> : null}
    <div className={styles.localNotice}><FileInput size={15} aria-hidden="true" /><span>Edits stay in this browser. Canonical research and evidence remain read-only.</span></div>
    {children}
    {showRemoved ? <div className={styles.overlay} role="dialog" aria-modal="true" aria-label="Removed items"><div className={styles.removedSheet}><header><div><span className={styles.eyebrow}>Local draft</span><h2>Removed items</h2></div><button type="button" onClick={() => setShowRemoved(false)} aria-label="Close removed items"><X aria-hidden="true" /></button></header>{removedRecords.length ? <div className={styles.removedList}>{removedRecords.map((record) => <article key={record.id}><span>{record.id} · {record.module}</span><strong>{record.title}</strong><button type="button" onClick={() => restoreRecord(record.id)}>Restore {record.id}</button></article>)}</div> : <p>No locally removed requirements.</p>}<footer><button type="button" className={styles.dangerButton} onClick={() => { if (window.confirm("Reset every browser-local edit?")) { resetAll(); setShowRemoved(false); } }}>Reset all local changes</button></footer></div></div> : null}
  </section>;
}
