# Risk and dependency register

Scales: likelihood/impact `Low`, `Medium`, `High`, `Critical`. Owners are recommended roles, not assigned people.

| ID | Risk | Evidence/status | Likelihood | Impact | Mitigation/exit criterion | Dependency | Suggested owner |
|---|---|---|---|---|---|---|---|
| R-01 | Public identity-document numbers exposed on portfolio reference | Observed | High/current | Critical | Remove, purge caches where possible, scan public outputs, confirm no other identifiers | Site access/content owner | Founder + Trust |
| R-02 | Unsupported user/outcome/logo/testimonial claims | Publicly marketed; proof missing | High | High | Claim ledger; remove/qualify until substantiated/permissioned | Analytics/legal records | Founder + Marketing/Trust |
| R-03 | Autopilot/bulk claims conflict with review/no-auto-submit | Public contradiction | High | High | Align product behavior, policy and copy; human-review requirement | Product controls | Product + Trust |
| R-04 | Match score read as hiring probability | Observed | High | High | Alignment label; methodology/uncertainty; requirement evidence | Evaluation set | Product/AI |
| R-05 | Stale, duplicate or unlicensed jobs | Team concern; contracts absent | High | Critical | Source policy, lifecycle schema, quality audit, takedown SLA | Provider contracts/ingestion | Data + Legal |
| R-06 | Gmail over-scoping/token compromise | Scopes/config unknown | Medium-high | Critical | `gmail.send`, encrypted vault, revoke/delete tests, least privilege | OAuth verification/security | Engineering + Security |
| R-07 | Spam, recipient complaints or Gmail suspension | Bulk/sequence interest | High | High | One reviewed message, caps, suppression, deliverability stop rules | Send telemetry/legal matrix | Growth + Trust |
| R-08 | Contact-data use lacks lawful basis/transparency | Provider interest; no contract/LIA | High | Critical | Country/use-case legal review, provider DPA/rights, notice/objection | Legal counsel/provider | Legal/Privacy |
| R-09 | Resume/outreach AI invents facts | AI generation and quantification | High | High | Provenance, confirmation gates, evaluation, no unconfirmed metrics | Evidence profile | AI/Product |
| R-10 | Voice coaching creates pseudoscientific scores | Discussed | Medium-high | High | Transcript-first; prohibit emotion/personality/employability scoring | Rubric/evaluation | Product/Trust |
| R-11 | Audio/transcript privacy and accessibility failure | Discussed | Medium | High | Opt-in, visible recording, default deletion, text parity, WCAG tests | Storage/consent | Engineering/Privacy |
| R-12 | TerraTern lead/data cross-use without explicit consent | Potential strategic dependency | Medium-high | Critical | Separate purpose/brands, opt-in and consent ledger | Controller-role decision | Founder + Legal |
| R-13 | Redesign delays activation learning | Large UI ambition | High | Medium-high | Prototype core flow first; usability gate; design tokens second | Activation baseline | Product/Design |
| R-14 | Paid acquisition scales a leaky funnel | Content/ad ambition | High | High | Activation/D7/margin gates | Analytics and attribution | Growth/Founder |
| R-15 | Credit/pricing confusion and refunds | Public wording | Medium-high | High | Exact action price, tax/renewal/refund clarity, experiments | Billing/COGS | Product/Finance |
| R-16 | Extension form fill errors or excess permissions | Public extension; tiny sample | Medium | High | Permission audit, supported-site tests, field preview, no auto-submit | Extension code/QA | Engineering/Security |
| R-17 | Competitor creative/IP copying | References requested | Medium | High | Principle extraction, original design, asset/licence review | Brand approval | Design/Marketing |
| R-18 | No internal analytics/support/customer evidence | Confirmed gap | High/current | Critical | Complete evidence intake before roadmap approval | Team/data access | Founder’s Office |
| R-19 | Global corridor misinformation | Broad corridor interest | High | High | One corridor pilot, source/date/uncertainty, counsel review | Mobility data/experts | Product + Legal |
| R-20 | Security/privacy documentation outpaces real controls | General policy exists | Medium | High | System inventory and control tests before trust-center claims | Engineering/security audit | Security/Privacy |

## Critical dependency chain

Internal data access → activation/outcome definition → job-centered prototype → first-100 paid cohort → retention/pricing evidence → acquisition scale.  
In parallel: claims/privacy remediation → job-source rights/quality → Gmail/contact legal/security gate → any outreach launch.  
Voice and international mobility remain downstream of those foundations.

