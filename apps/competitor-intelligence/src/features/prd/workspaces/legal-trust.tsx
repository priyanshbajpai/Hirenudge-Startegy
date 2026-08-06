import { ExternalLink, ShieldCheck } from "lucide-react";
import React from "react";
import { complianceRecords } from "../data";
import { PrdBadge } from "../prd-badges";
import styles from "../prd.module.css";

export function LegalTrust() {
  return <section className={styles.standaloneWorkspace}><header><span className={styles.eyebrow}>Legal & trust</span><h1>Turn legal questions into product release gates</h1><p>The HireNudge privacy policy is published disclosure, not proof that every described control is implemented or that every jurisdictional requirement is satisfied.</p></header><div className={styles.policyCallout}><ShieldCheck aria-hidden="true" /><div><strong>Policy reviewed · effective 28 May 2026</strong><p>The policy says the extension fills but does not automatically submit applications. Reconcile that boundary with every Auto Apply or autopilot surface.</p><a href="https://hirenudge.ai/privacy-policy/" target="_blank" rel="noreferrer">Read the policy <ExternalLink size={14} /></a></div></div><div className={styles.complianceRegister}>{complianceRecords.map((item) => <article key={item.id}><header><div><span>{item.id}</span><h2>{item.regime}</h2></div><PrdBadge kind="legal" value={item.state} /></header><p>{item.obligation}</p><dl><div><dt>Product control</dt><dd>{item.productControl}</dd></div><div><dt>Release gate</dt><dd>{item.releaseGate}</dd></div><div><dt>Confirmation owner</dt><dd>{item.confirmationOwner}</dd></div></dl><small>{item.limitation}</small><a href={item.officialUrl} target="_blank" rel="noreferrer">Official source <ExternalLink size={14} /></a></article>)}</div></section>;
}
