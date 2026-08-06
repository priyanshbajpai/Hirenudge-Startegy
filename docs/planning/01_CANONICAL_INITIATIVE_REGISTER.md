# Canonical initiative register

Canonical date: 6 August 2026  
Machine-readable source: [`src/data/initiatives.json`](../../src/data/initiatives.json)  
Decision state: every initiative is **To Be Discussed**. No founder priority or owner has been assigned.

## Register rules

- Priority describes necessity; it does not record approval.
- Horizon describes sequencing; it does not imply commitment.
- P0 is limited to launch readiness, fundamental usability, trust, security, compliance, core activation or critical retention.
- `founder_priority: null` means the founder has not ranked the initiative.
- `owner: Unassigned` avoids turning a suggested function into a personal commitment.
- Expected impact is directional because no internal baseline was supplied.
- A Blocked horizon identifies a real dependency. It does not mean the initiative is rejected.

## Portfolio shape

| Classification | Count | IDs |
|---|---:|---|
| P0 — Must Have | 13 | HN-001, 002, 005, 006A, 006B, 008, 010A, 011, 012, 026, 027, 028A, 028B |
| P1 — Important | 17 | HN-003, 004A, 004B, 007, 009, 013, 014, 016, 017, 018, 019, 021, 022A, 023, 028C, 031, 032 |
| P2 — Good to Have | 6 | HN-010B, 015, 020, 022B, 024, 029 |
| P3 — Later | 2 | HN-025, 030 |

## A. Identity, state and recommendation

| ID | Title | Workstream / sub-workstream | Type | Current state | Problem | Recommendation | Target user | Evidence status / sources |
|---|---|---|---|---|---|---|---|---|
| HN-001 | Claims and proof governance | Trust / Claims | Compliance Requirement | Public material claims exist; proof not supplied | Promise and evidence are indistinguishable | Claim ledger; remove or qualify unsupported claims | All prospects/users | Requires Verification; SRC-HN-01/02/06, SRC-INT-03 |
| HN-002 | Activation and outcome instrumentation | Analytics / Activation | Operational Requirement | No event or cohort export supplied | Team cannot identify first value or outcome | Instrument verified profile → live job → reviewed packet → submission → response/interview | Team and active seekers | Requires Verification; SRC-INT-03, analytics report |
| HN-003 | Candidate evidence profile | Product / Unified profile | Proposed | Resume/preferences exist; canonical evidence model unknown | Facts are repeated, inconsistent or invented | Candidate-owned facts with source, sensitivity and confirmation state | Active switchers | Proposed; HireNudge, Huntr and Careerflow screenshots |
| HN-004A | Job-centered journey architecture | UI/UX / Information architecture | Research Required | Dashboard/navigation are module-first | Users assemble the journey themselves | Test stage-aware home and job-centered navigation | Active seekers | Discussed; HN, Teal, Careerflow, Huntr screenshots |
| HN-004B | Application packet core object | Product / Core workflow | Proposed | Jobs, documents, outreach, tracking and practice are separate | One job's work has no shared home | Link job, alignment, artifacts, actions, submission and outcome | Active applicants | Proposed; Huntr, Teal, Simplify screenshots; missing-topics report |
| HN-005 | Explainable profile-to-role alignment | Product / AI job matcher | Improvement | Numeric scores visible; method unknown | Score hides evidence, gaps and uncertainty | Lead with a requirement evidence map; never imply hiring probability | Matcher users | Observed; HN/Jobright screenshots, NIST AI RMF |
| HN-006A | Job-source rights and partnership strategy | Job Data / Source governance | Compliance Requirement | Sources/contracts unknown | Technical access may lack commercial rights | Curated ATS, direct partners, licensed pilot; no restricted scraping core | Job-discovery users | Requires Verification; official ATS/provider terms |
| HN-006B | Job provenance, freshness and lifecycle quality | Job Data / Quality operations | Improvement | Fresh labels visible; lifecycle logic unknown | Dead, duplicate or fraudulent roles cause harm | Persist provenance/lifecycle fields and audit 500 jobs | Job-discovery users | Discussed; HN screenshots, Teal help, job-data report |
| HN-007 | Base and job-specific version lineage | Product / Nudge Studio | Improvement | Editor visible; lineage/rollback unknown | Users lose the submitted version | Immutable exports/submissions linked to base, job, packet and outcome | Multi-application users | Proposed; HN, Huntr, Careerflow, Teal screenshots |
| HN-008 | Truth-preserving AI edits | AI Quality / Content provenance | Compliance Requirement | Quantification discussed; controls unknown | AI can invent metrics and credentials | Source-backed edits and confirmation gate for new facts | All generation users | Discussed; HN privacy policy, NIST, product report |
| HN-009 | Job-linked material variants | Product / Nudge Studio | Improvement | Generators visible; deeper controls discussed | Generic drafts are low-value and unsafe | Recipient/purpose/tone controls, source panel, diff and review | Applicants/outreach users | Discussed; HN, Simplify, Huntr screenshots |
| HN-010A | Public sensitive-data incident remediation | Trust / Privacy incident | Compliance Requirement | Public portfolio exposed identity-document numbers | Immediate identity/privacy harm | Remove, purge where possible, scan all public outputs, record response | Exposed and future users | Observed; SRC-PORT-01, risk report |
| HN-010B | Privacy-safe portfolio publishing | Product / Portfolio | Proposed | Visual quality discussed; demand/controls unknown | Relevant users need controlled public sharing | Validate role need, then private-default templates, preview, PII block and unpublish | Portfolio-relevant roles | Proposed; portfolio reference, UI/UX report |
| HN-011 | Application tracker and outcome loop | Product / Retention | Improvement | Tracker visible; packet/outcome linkage unknown | No next action or learning loop | Minimum manual stage, packet, source, follow-up and outcome tracker | Active applicants | Observed; HN/Huntr/Careerflow/Simplify screenshots |
| HN-012 | Send-only Gmail integration | Outreach / Gmail OAuth | Compliance Requirement | Connect gate visible; scopes/token controls unknown | Sending convenience may require excessive permission | `gmail.send` at send time, review, caps, revoke/delete on disconnect | Outreach users | Requires Verification; HN screens and official Google docs |
| HN-013 | Governed contact-enrichment pilot | Outreach / Contact data | Experiment | Providers discussed; no contract/legal review | Recipient discovery uses risky personal data | One provider/country/use case after rights, notice and suppression review | High-intent outreach users | Discussed; Apollo/Hunter and regulator sources |
| HN-014 | Transcript-first job and round interview practice | Interview / Practice MVP | Proposed | Question surface visible; deeper practice discussed | Generic questions do not prepare a real round | Editable transcript, disclosed rubric, evidence-linked feedback and retry | Candidates with interviews | Discussed; HN/Careerflow/Jobright screens, NIST |
| HN-015 | Opt-in realtime voice practice | Interview / Voice | Proposed | Discussed and technically feasible; not implemented/evaluated | Some users want realistic practice | Add after transcript proof; text parity, visible recording, default audio deletion | Opt-in interview users | Proposed; official model, NIST, EEOC, WCAG sources |
| HN-016 | Event-triggered lifecycle and preference center | Retention / Lifecycle | Proposed | Personalised lifecycle discussed; system unknown | Users miss actions or receive generic noise | Workflow triggers, preferences, global cap, quiet mode and suppression | Active/paused/inactive seekers | Discussed; lifecycle and law research |
| HN-017 | India-tested search-sprint pricing | Monetisation / Packaging | Experiment | USD+GST credits public; WTP/COGS unknown | Price and credits do not map to a search episode | Test INR, tax-inclusive episodic plans and transparent meters | Selected India cohort | Observed; HireNudge and competitor pricing |
| HN-018 | First 100 paid-customer learning program | GTM / Early customers | Experiment | First-50 and first-100 plans exist; no results | No paid behavior or WTP evidence | Four cohorts of 25; first 10 eligible users in cohort 1 form the calibration group | Provisional ICP | Proposed; internal strategy and first-100 report |
| HN-019 | Initial ICP and role-family validation | GTM / ICP | Research Required | India-first switcher is a hypothesis | Broad personas dilute learning | Test India-based employed switchers, then select 1–2 role families from data | Candidate initial cohort | Requires Verification; repository context and GTM report |
| HN-020 | One India-to-country mobility pilot | GTM / Mobility corridor | Experiment | Multiple corridors discussed; none selected | International users lack reliable authorization/sponsor context | After domestic core, test one destination and role family with sourced evidence | Defined mobility subgroup | Discussed; Jobright screens, repository context, GTM report |
| HN-021 | Accessible founder and product design system | UI/UX / Design system | Improvement | Light redesign discussed; founder app has a separate dense system | Inconsistent hierarchy/states cause friction | Shared tokens/primitives, AA criteria, explicit states and reduced motion after flow validation | Product and dashboard users | Discussed; HN screens, WCAG, existing design spec |
| HN-022A | Organic founder and product learning engine | Growth / Organic content | In Progress | Ads collected and tools explored; no performance data | Generic AI content lacks proof and learning | Original teardowns, demos, India realities and trust decisions | Prospective switchers | In Progress; supplied ad archive and social report |
| HN-022B | Paid acquisition readiness and creative tests | Growth / Paid advertising | Experiment | Paid ambition exists; gates absent | Spend would amplify an unmeasured funnel | Test original creative only after activation, D7, claims and margin gates | Qualified prospects | Proposed; ad archive, social and risk reports |
| HN-023 | Support, feedback and release operating loop | Operations / Product operations | Operational Requirement | No support/bug/request/release evidence supplied | Failure evidence does not reliably change priorities | Tagged system and weekly review linking evidence to decisions | Users and team | Requires Verification; internal intake and AGENTS.md |
| HN-024 | Value-triggered referral loop | Growth / Referrals | Experiment | No referral behavior observed | Activated users lack a safe peer invite | Test only after a verified value event | Activated users/peers | Proposed; category pattern and missing-topics report |
| HN-025 | University and placement-cell pilot | GTM / B2B | Experiment | Strategy hypothesis; no buyer evidence | Product is not validated for cohort delivery | Buyer research, then one pilot only after D2C proof | Placement teams/students | Proposed; competitor and monetisation sources |
| HN-026 | Reject autonomous high-volume applications and outreach | Trust / Automation boundary | Not Recommended | `Autopilot`/`bulk` claims exist; behavior unknown | Unreviewed volume creates user and platform harm | Prohibit fully autonomous actions; enforce review and quality caps | Users and recipients | Requires Verification; HN pricing/privacy, Jobright claim, Google quotas |
| HN-027 | TerraTern and HireNudge consent boundary | Trust / Data governance | Compliance Requirement | Potential advantage; data flows/controller roles unknown | Cross-brand reuse may lack consent | Separate purpose/access/data with explicit opt-in | Both brands' users | Requires Verification; AGENTS.md and DPDP sources |
| HN-028A | User privacy controls | Trust / User control | Compliance Requirement | Policy exists; product controls unverified | Users lack practical control of sensitive data | Export, deletion, retention choices, permission inventory and revocation | All users | Requires Verification; HN policy and privacy-law sources |
| HN-028B | Security and incident-response baseline | Trust / Security | Compliance Requirement | Production controls and incident evidence absent | Sensitive data creates high breach impact | Verify least privilege, encryption, audit, secrets, extension and incident controls | Users/team | Requires Verification; internal intake, Google and risk sources |
| HN-028C | AI, model and subprocessor transparency | Trust / Transparency | Compliance Requirement | General caveat exists; provider/model inventory absent | Data flows and AI limits are unclear | Provider/model-purpose register, retention matrix and feature limits | Users/team | Requires Verification; HN policy and NIST |
| HN-029 | One decision-grade free tool | Growth / SEO and utility | Experiment | SEO desire exists; demand/conversion absent | Searchers need real value before signup | Test one accurate utility after activation works | Search prospects | Proposed; competitor tools and opportunity report |
| HN-030 | Mascot and motion-led landing experiment | Brand / Motion and character | Proposed | Mascot and maze/pinball idea discussed | Novelty may obscure value | Later test restrained original motion against linear journey | Prospects | Discussed; Jobright screens, WCAG, UI/UX report |
| HN-031 | Internal evidence and customer-research intake | Research / Evidence readiness | Research Required | Intake exists; pack not supplied | Public research cannot establish PMF or feasibility | Collect de-identified analytics, support, interviews, roadmap, architecture, costs and contracts | Founder/team | Blocked; SRC-INT-03/04, source register |
| HN-032 | Search-status mode | Product / Personalisation and retention | Proposed | User-controlled active/paused/ended state unverified | Successful or paused users may be treated as churn | Status changes home, lifecycle, retention and subscription prompts | All search states | Proposed; lifecycle and missing-topics reports |

## B. Impact, effort and dependencies

| ID | Confidence | Expected user impact | Expected business impact | Effort | Technical dependencies | Data dependencies | Legal dependencies |
|---|---|---|---|---|---|---|---|
| HN-001 | High | Clear expectations | Lower legal/refund/reputation risk | S | Copy inventory, approval workflow | Claim calculation and permissions | Claims/endorsement review |
| HN-002 | High | Faster friction removal | Reliable product and experiment decisions | M | Event SDK, identity, analytics store | Dictionary, baseline, outcome completeness | Event purpose/retention |
| HN-003 | Medium | Less re-entry; fact control | Reusable personalisation | L | Schema, provenance, version store | Resume/LinkedIn/confirmed facts | Sensitive-field retention |
| HN-004A | High | Lower cognitive load | Higher activation; less redesign waste | M | Prototype, route inventory | Task baseline, stage/action history | Accessibility criteria |
| HN-004B | High | One coherent job workspace | Repeat use and outcome learning | L | Shared IDs, state model, versions | Job/artifact/action/outcome records | Export/retention |
| HN-005 | High | Better role decisions | Trust and save quality | M | Parsing, retrieval, explanation UI | Labeled requirements/evaluation set | Claims/bias review |
| HN-006A | High | Trustworthy inventory | Lower source/takedown risk | M | Provider inventory, rights class | Contracts, coverage/cost | Commercial rights |
| HN-006B | High | Fewer dead/duplicate jobs | Retention and provider efficiency | L | Canonicalization, scheduler, takedown, dedupe | Freshness and labeled samples | Retention/attribution |
| HN-007 | High | Recoverable submitted work | Repeat use and learning | M | Storage, version graph, diff | Edit/export/submission history | Document retention |
| HN-008 | High | Stronger truthful output | Trust differentiation | M | Provenance generation, confirmation, eval | Candidate evidence and tests | AI claims/disclosure |
| HN-009 | Medium | Faster controlled drafts | Feature value without autonomy | M | Templates, editor, versions, packet | Verified job/company/contact | External-message review |
| HN-010A | High | Immediate privacy protection | Lower critical exposure | S | Site access, purge, scan | Public-page inventory | Incident assessment |
| HN-010B | Medium | Safer personal brand | Selective sharing acquisition | M | Renderer, preview, PII scan, unpublish | Public fields, role demand | Indexing/retention |
| HN-011 | High | Next steps and history | Critical retention/outcome data | M | Workflow, packets, reminders | User stage/outcomes | Outcome retention |
| HN-012 | High | Lower permission and send risk | Lower OAuth/security exposure | M | OAuth, token vault, revocation, audit | Scopes, consent, sends | Google and outreach review |
| HN-013 | Medium | Relevant sourced contacts | Bounded reply learning | M | Adapter, verification, suppression | Contract, jurisdiction, source | DPA/lawful basis/notice |
| HN-014 | High | Actionable practice | Premium outcome-adjacent value | M | Questions, rubric, transcript, provenance | JD/round/human ratings | Disclosure/accessibility |
| HN-015 | High sequencing; medium demand | Realistic opt-in practice | Possible premium use | L | Realtime audio, STT/TTS, consent, deletion | Accent/device benchmark | Audio/privacy/accessibility |
| HN-016 | High | Timely controlled reminders | Retention with less fatigue | M | Events, messaging, preferences, scheduler | Consent, status, deliverability | Marketing/suppression |
| HN-017 | Medium | Purchase clarity | WTP and margin evidence | S-M | Billing, assignment, preview | COGS/conversion/refunds | GST/refund/renewal |
| HN-018 | High need; medium design | High-touch workflow help | Wedge and WTP evidence | M | CRM, analytics, support | Screening/consent/outcomes | Research consent |
| HN-019 | Medium | More relevant experience | Focused distribution | S | Segment fields/configuration | User/job/channel mix | Research consent |
| HN-020 | Medium | Safer mobility decisions | Differentiation pilot | L | Authorization schema, evidence UI | Demand, jobs, sponsor evidence | Immigration and TerraTern review |
| HN-021 | High | Clear accessible experience | Less rework | M | Tokens, primitives, a11y tooling | Usability/a11y baseline | Accessibility criteria |
| HN-022A | High | Useful pre-signup proof | Message and organic learning | M | Workflow, tracking, templates | Claim and activation attribution | IP/likeness/claims |
| HN-022B | High | Relevant promise-to-product path | Controlled CAC evidence | M | Attribution and landing alignment | Two cohorts and margin | Ads/creator/platform policy |
| HN-023 | High | Faster issue resolution | Better prioritisation | S-M | Helpdesk links, tags, decision log | Tickets/research/releases | Support-data minimisation |
| HN-024 | Medium | Easy peer help | Potential lower CAC | S-M | Codes, attribution, fraud | Activation/retention | Referral terms/consent |
| HN-025 | Medium | Structured cohort support | Later B2B evidence | L | Roles/admin/reporting | Buyer and D2C evidence | Student/institution terms |
| HN-026 | High | Fewer harmful actions | Protects brand/platform access | S+ | Review gates, caps, audit | Complaints and quality | Platform/outreach rules |
| HN-027 | High | Cross-brand agency | Sustainable partnership | M | Consent ledger/access separation | Current data map | Controller/purpose/transfer |
| HN-028A | High | Practical data control | Privacy trust/readiness | M-L | Inventory/export/delete/revoke | Retention and system map | Rights/deletion |
| HN-028B | High | Lower compromise impact | Launch/security readiness | L | RBAC/audit/secrets/incident/extension | Asset/provider/access inventory | Security/breach |
| HN-028C | High | Informed AI use | Better privacy/procurement/cost | M | Inventory/version/disclosure | Feature data flows | Notice/transfers |
| HN-029 | Medium | Immediate decision utility | Qualified organic demand | M | Indexable tool and attribution | Search/tool activation | Tool-specific claims/data |
| HN-030 | High sequence; low value | Potential clarity/memory | Possible brand lift | S-M | Prototype/performance/reduced motion | Comprehension/conversion | Originality/accessibility |
| HN-031 | High | Fewer inference-led decisions | Lower wasted effort | M | Secure aggregate exports | All missing internal evidence | De-identification/access |
| HN-032 | High | Relevant state and messages | Cleaner retention | S-M | Status field and eligibility rules | User-confirmed status | Status minimisation |

## C. Risk, measurement, priority and decision

| ID | Main risks | Success metrics | AI priority | Founder priority | Decision | Owner | Horizon | Founder question |
|---|---|---|---|---|---|---|---|---|
| HN-001 | Conversion dip after claim removal | Material-claim coverage; zero unresolved contradictions | P0 | Not set | To Be Discussed | Unassigned | Now | What proof standard and removal authority apply? |
| HN-002 | False certainty; sensitive analytics | ≥95% sampled event coverage; reproducible cohorts | P0 | Not set | To Be Discussed | Unassigned | What activation and outcome definitions apply? |
| HN-003 | Premature platform build | Re-entry reduction; zero unconfirmed sampled facts | P1 | Not set | To Be Discussed | Unassigned | What minimum profile scope enters V1? |
| HN-004A | Aesthetic bias | Task success, time to packet, critical errors | P1 | Not set | To Be Discussed | Unassigned | Is product architecture job-centered? |
| HN-004B | Domain migration disruption | Packet completion/linkage/D7 return | P1 | Not set | To Be Discussed | Unassigned | Is the packet the core object? |
| HN-005 | Wrong explanation; false precision | Requirement precision, reviewer agreement, correction rate | P0 | Not set | To Be Discussed | Unassigned | Ban hiring-probability language? |
| HN-006A | Coverage loss | Rights class on 100% discoverable jobs | P0 | Not set | To Be Discussed | Unassigned | What rights/coverage trade-off is acceptable? |
| HN-006B | False merge; smaller inventory | Fresh verification, expired clicks, dedupe quality, takedown SLA | P0 | Not set | To Be Discussed | Unassigned | What freshness threshold gates promotion? |
| HN-007 | Version clutter | Link coverage, restores, wrong-version incidents | P1 | Not set | To Be Discussed | Unassigned | What becomes immutable? |
| HN-008 | Over-trust; slower generation | Zero unconfirmed metrics; unsupported-edit/correction rate | P0 | Not set | To Be Discussed | Unassigned | Confirm every new factual claim? |
| HN-009 | Choice overload; invented context | Review/edit rate; unsupported facts; completion | P1 | Not set | To Be Discussed | Unassigned | Which artifacts/recipients enter first? |
| HN-010A | Cached copies; wider exposure | Removal, full scan, incident closure | P0 | Not set | To Be Discussed | Unassigned | Who has immediate remediation authority? |
| HN-010B | Low role relevance; scan gaps | Publish/unpublish, block rate, qualified shares | P2 | Not set | To Be Discussed | Unassigned | Does the ICP need a portfolio? |
| HN-011 | Incomplete self-reporting; scope creep | D7 tracker return, outcome completeness, interview response rate | P0 | Not set | To Be Discussed | Unassigned | What minimum stages and denominator apply? |
| HN-012 | Token compromise; spam/suspension | 100% reviewed, scope audit, revoke/delete test | P0 | Not set | To Be Discussed | Unassigned | Approve send-only/no-inbox boundary? |
| HN-013 | Irrelevance; complaints; jurisdiction | Valid/relevant contacts, reply quality, suppression and complaint guardrail | P1 | Not set | To Be Discussed | Unassigned | Which one provider/country/use case? |
| HN-014 | Generic/unsupported scoring | Completion, human-rated improvement, corrections | P1 | Not set | To Be Discussed | Unassigned | Which roles and rounds enter MVP? |
| HN-015 | Bias, privacy, cost, pseudoscience | Opt-in, deletion, WER by accent/device, helpfulness | P2 | Not set | To Be Discussed | Unassigned | Which scores are prohibited? |
| HN-016 | Fatigue; preview exposure | Incremental actions/retention, unsub/complaint, cap adherence | P1 | Not set | To Be Discussed | Unassigned | Which channels/categories/cap apply? |
| HN-017 | Underpricing; confusion/refunds | Paid activation, conversion, margin, refunds | P1 | Not set | To Be Discussed | Unassigned | Which duration, meter and cells? |
| HN-018 | Concierge distortion; capacity | Paid cohort, activation/D7, WTP, outcomes, support burden | P1 | Not set | To Be Discussed | Unassigned | 50 or 100; what capacity? |
| HN-019 | Wrong narrow wedge | Segment activation, D7 and WTP | P1 | Not set | To Be Discussed | Unassigned | Which provisional ICP/exclusions? |
| HN-020 | False assurance; stale coverage | Fresh eligible roles, comprehension, outcomes | P2 | Not set | To Be Discussed | Unassigned | Which destination/role, if any? |
| HN-021 | Cosmetic displacement | AA checks, task success, reduced-motion parity | P1 | Not set | To Be Discussed | Unassigned | Which principles are approved? |
| HN-022A | Content without learning; imitation | Activated signups, meaningful engagement, claim compliance | P1 | Not set | To Be Discussed | Unassigned | What founder voice/channel/proof standard? |
| HN-022B | Leaky funnel; CTR optimisation | Activated CAC, paid conversion, margin CAC, D7 | P2 | Not set | To Be Discussed | Unassigned | What gates and spend ceiling? |
| HN-023 | Tool sprawl; no triage | Triage/resolve time, evidence-linked decisions, release reads | P1 | Not set | To Be Discussed | Unassigned | Who owns weekly review? |
| HN-024 | Low-quality/fraud referrals | Activated referrals, D7, fraud | P2 | Not set | To Be Discussed | Unassigned | Which value moment triggers ask? |
| HN-025 | Premature B2B; student privacy | Paid pilot, activation, renewal | P3 | Not set | To Be Discussed | Unassigned | What D2C gate precedes a pilot? |
| HN-026 | Speed-positioning conflict | Zero unreviewed actions; complaints/suspensions | P0 | Not set | To Be Discussed | Unassigned | Reject autonomous high-volume action? |
| HN-027 | Unauthorized joins; mistrust | 100% purpose-specific consent; zero unauthorized joins | P0 | Not set | To Be Discussed | Unassigned | What roles, purposes and opt-in apply? |
| HN-028A | Partial deletion | Export/delete/revoke tests and SLA | P0 | Not set | To Be Discussed | Unassigned | What user controls and SLA apply? |
| HN-028B | Unknown blast radius; paper controls | Critical tests, incident exercise, no critical open findings | P0 | Not set | To Be Discussed | Unassigned | Who owns security and launch gate? |
| HN-028C | Stale/mismatched disclosure | 100% AI feature mapping; quarterly freshness | P1 | Not set | To Be Discussed | Unassigned | What transparency and cadence? |
| HN-029 | Thin content; stale facts | Qualified starts, activated signups, index quality | P2 | Not set | To Be Discussed | Unassigned | Which one utility can stay accurate? |
| HN-030 | Clarity/performance/accessibility loss | Comprehension, LCP/INP, conversion, reduced-motion parity | P3 | Not set | To Be Discussed | Unassigned | Does brand motion wait for activation? |
| HN-031 | Sensitive export; no owner | Intake completion, freshness/owner, no raw customer content | P1 | Not set | To Be Discussed | Unassigned | Who supplies each evidence set in 10 days? |
| HN-032 | Stale self-reported state | Status completion, fewer irrelevant messages, segmented retention | P1 | Not set | To Be Discussed | Unassigned | Which states change product behavior? |

## Notes carried by the machine-readable register

The JSON record contains initiative-specific notes and full dependency arrays. It is the build input. The Markdown tables are the human review surface. Any change must update both in one pull request, and an automated parity test should compare IDs, priority, decision status, horizon and owner before the dashboard is built.
