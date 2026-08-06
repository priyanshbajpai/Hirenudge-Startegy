import React from "react";
import { ExternalLink } from "lucide-react";
import { partnerRecords } from "../data";
import styles from "../prd-views.module.css";
import shared from "../prd.module.css";

export function PartnersApis() {
  return <section className={shared.standaloneWorkspace}>
    <header><span className={shared.eyebrow}>Third-party register</span><h1>Partners & APIs</h1><p>Each vendor is a candidate dependency—not an approved integration. Commercial rights, scopes, data handling and operational fit must be confirmed before implementation.</p></header>
    <div className={styles.partnerRegister}>{partnerRecords.map((partner) => <article key={partner.id}>
      <header><span>{partner.category}</span><b>{partner.verificationState}</b></header>
      <h2>{partner.name}</h2><p>{partner.proposedUse}</p>
      <dl><div><dt>API</dt><dd>{partner.apiAvailability}</dd></div><div><dt>Auth</dt><dd>{partner.authentication}</dd></div><div><dt>Commercial use</dt><dd>{partner.commercialUseStatus}</dd></div><div><dt>Complexity</dt><dd>{partner.implementationComplexity}</dd></div></dl>
      <strong>{partner.recommendation}</strong>
      {partner.officialUrl ? <a href={partner.officialUrl} target="_blank" rel="noreferrer">Official reference <ExternalLink size={13}/></a> : <small>Official vendor identity or URL still requires confirmation.</small>}
    </article>)}</div>
  </section>;
}
