import React, { type ReactNode } from "react";
import { AlertCircle, CheckCircle2, CircleDot, Clock3, LockKeyhole, SearchX } from "lucide-react";
import type { Priority } from "./types";
import styles from "./strategy.module.css";

export function PriorityBadge({ value }: { value: Priority }) {
  const tone = value.startsWith("P0") ? styles.p0 : value.startsWith("P1") ? styles.p1 : value.startsWith("P2") ? styles.p2 : styles.p3;
  return <span className={`${styles.badge} ${tone}`}><CircleDot aria-hidden="true" size={12} />{value}</span>;
}

export function StatusBadge({ kind, value }: { kind: "decision" | "evidence" | "horizon" | "type"; value: string }) {
  const normalized = value.toLowerCase();
  const tone = normalized.includes("approved") || normalized === "verified"
    ? styles.positive
    : normalized.includes("blocked") || normalized.includes("rejected")
      ? styles.negative
      : normalized.includes("discussed") || normalized.includes("proposed")
        ? styles.purple
        : normalized.includes("progress") || normalized === "next"
          ? styles.warning
          : normalized.includes("observed") || normalized === "now"
            ? styles.blue
            : styles.neutral;
  const Icon = normalized.includes("blocked") ? LockKeyhole : normalized.includes("approved") || normalized === "verified" ? CheckCircle2 : normalized.includes("progress") ? Clock3 : CircleDot;
  return <span className={`${styles.badge} ${tone}`} data-kind={kind}><Icon aria-hidden="true" size={12} />{value}</span>;
}

export function SectionIntro({ eyebrow, title, children, aside }: { eyebrow: string; title: string; children: ReactNode; aside?: ReactNode }) {
  return <header className={styles.sectionIntro}>
    <div>
      <p className={styles.eyebrow}>{eyebrow}</p>
      <h1>{title}</h1>
      <div className={styles.lead}>{children}</div>
    </div>
    {aside ? <div className={styles.sectionAside}>{aside}</div> : null}
  </header>;
}

export function EvidenceNotice({ children }: { children: ReactNode }) {
  return <aside className={styles.evidenceNotice}><AlertCircle aria-hidden="true" size={18} /><div>{children}</div></aside>;
}

export function SectionHeading({ eyebrow, title, description, action }: { eyebrow?: string; title: string; description?: string; action?: ReactNode }) {
  return <div className={styles.sectionHeading}>
    <div>{eyebrow ? <p className={styles.eyebrow}>{eyebrow}</p> : null}<h2>{title}</h2>{description ? <p>{description}</p> : null}</div>
    {action ? <div>{action}</div> : null}
  </div>;
}

export function EmptyState({ title, children }: { title: string; children: ReactNode }) {
  return <div className={styles.emptyState}><SearchX aria-hidden="true" size={24} /><strong>{title}</strong><p>{children}</p></div>;
}

export function LabelValue({ label, children }: { label: string; children: ReactNode }) {
  return <div className={styles.labelValue}><dt>{label}</dt><dd>{children}</dd></div>;
}
