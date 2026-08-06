import type { ReactNode } from "react";

export function StatusDot({ tone = "green" }: { tone?: "green" | "amber" | "red" | "blue" | "gray" }) { return <span className={`status-dot ${tone}`} aria-hidden="true" />; }
export function Badge({ children, tone = "blue" }: { children: ReactNode; tone?: string }) { return <span className={`badge ${tone}`}>{children}</span>; }
export function EmptyState({ title, body }: { title: string; body: string }) { return <div className="empty-state"><strong>{title}</strong><span>{body}</span></div>; }
export function SectionHeader({ title, meta, actions }: { title: string; meta?: string; actions?: ReactNode }) { return <div className="section-header"><div><h2>{title}</h2>{meta ? <p>{meta}</p> : null}</div>{actions}</div>; }
