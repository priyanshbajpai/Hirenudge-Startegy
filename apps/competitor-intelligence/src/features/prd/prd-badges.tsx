import React from "react";
import type { ReactNode } from "react";
import styles from "./prd.module.css";

export function PrdBadge({ kind, value, icon }: { kind: "category" | "decision" | "delivery" | "evidence" | "priority" | "legal"; value: string; icon?: ReactNode }) {
  const token = value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  return <span className={`${styles.badge} ${styles[`badge_${kind}`]} ${styles[`token_${token}`] ?? ""}`}>{icon}{value}</span>;
}
