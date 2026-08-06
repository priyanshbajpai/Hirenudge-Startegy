# Research validation

Review date: 6 August 2026  
Scope: `AGENTS.md`, every file in `docs/research/`, the existing strategy-dashboard prototype, its data model, and its implementation notes.  
Decision rule: this document records conflicts. It does not resolve them for the founder.

## Validation result

The research is strong enough to frame decisions, but not to approve a roadmap. It relies on current public sources and supplied screenshots, while the required internal evidence remains absent. Product analytics, support records, customer interviews, provider contracts, live entitlement behavior, engineering architecture, unit costs, and claim substantiation were not supplied. Every canonical initiative therefore remains **To Be Discussed**, and `founder_priority` remains unset.

The original register contains 30 initiatives. Consolidation produces 38 canonical initiatives because five broad records needed splits and one missing internal-evidence initiative needed explicit representation. Repeated findings across the 18 core research reports are references to these initiatives, not additional initiatives.

## Duplicates consolidated

| Repeated finding | Repeated in | Canonical treatment |
|---|---|---|
| Claims, logos, testimonials and `autopilot` language need proof | Current state, brand, ads, risk, founder decisions | Merge into HN-001, Claims and proof governance |
| Activation and qualified-application outcomes need instrumentation | Current state, first 100, lifecycle, analytics, risk | Merge into HN-002, Activation and outcome instrumentation |
| Job detail should connect documents, tracker, outreach and interview work | Product, UI/UX, competitor analysis, missing opportunities | Split architecture from object model: HN-004A Journey architecture and HN-004B Application packet |
| Match scores need evidence, gaps and uncertainty | Current state, competitors, product, brand, analytics | Merge into HN-005, Explainable profile-to-role alignment |
| Job source, freshness, expiry, duplicates and takedowns need control | Current state, product, API report, analytics, risk | Split commercial rights from operating quality: HN-006A Job-source rights and HN-006B Job lifecycle quality |
| AI must preserve candidate truth | Product, brand, missing topics, analytics, interview | Merge into HN-008, Truth-preserving AI edits |
| Tracker should connect packets, follow-ups and outcomes | Product, UI/UX, first 100, lifecycle, analytics | Merge into HN-011, Application tracker and outcome loop |
| Gmail should be send-only and requested at send time | Current state, product, outreach report, lifecycle, risk | Merge into HN-012, Send-only Gmail integration |
| Organic and paid content require different readiness gates | Competitor ads, social strategy, GTM, risk | Split HN-022 into HN-022A Organic learning engine and HN-022B Paid acquisition readiness |
| Privacy, security and AI transparency were grouped together | Current state, outreach, interview, analytics, missing topics, risk | Split HN-028 into HN-028A User privacy controls, HN-028B Security baseline and HN-028C AI/provider transparency |

## Contradictions requiring a decision

| ID | Tension | Research recommendation | Unresolved decision |
|---|---|---|---|
| C-01 | Broad modern redesign versus activation work | Prototype one job-centered flow before a full redesign | Whether design-system work begins before the activation baseline exists |
| C-02 | Public `autopilot` and `bulk` language versus review/no-auto-submit policy | Require human review and remove or qualify conflicting copy | Whether any autonomous application or outreach behavior is allowed |
| C-03 | India-first wedge versus four geographic corridors | Start with India-to-India and one or two role families | Which provisional ICP and corridor receive the first product and GTM focus |
| C-04 | Gmail as profile completion versus permission at point of use | Ask for `gmail.send` only when the user sends | Whether email remains in the initial activation flow |
| C-05 | Score-led matcher versus evidence-led alignment | Use requirements, evidence, gaps and unknowns; keep any score secondary | Whether a numeric score remains and what validation standard applies |
| C-06 | Better portfolio feature versus current public identifier exposure | Remediate exposure now; consider publishing later | Whether portfolio creation belongs in the initial ICP workflow |
| C-07 | Paid-ad ambition versus unknown activation and retention | Run organic learning first; gate paid scale | What minimum activation, D7 repeat use and margin evidence unlocks paid spend |
| C-08 | USD plus GST credits versus India-first short search sprints | Test INR, tax-inclusive episodic plans | Which pricing cells, renewal model and metering approach enter research |
| C-09 | Realtime voice ambition versus evidence and privacy burden | Build transcript-first practice | Whether voice is accepted as a later dependency, not an MVP requirement |
| C-10 | TerraTern as a distribution advantage versus purpose limitation | Keep data and purposes separate with explicit opt-in | Controller roles, cross-use boundaries and whether TerraTern participates in the first corridor |
| C-11 | First-100 and ICP work were marked P0 in the research register | Reclassify them as P1 research/GTM initiatives | Whether the founder wants strategic urgency shown separately from P0 product necessity |
| C-12 | `Now` was sometimes used as a synonym for P0 | Keep horizon and priority independent | Whether a Now/P1 research item can displace a Now/P0 control due to team capacity |

## Weakly supported recommendations

| Recommendation | Current support | Why it is weak | Validation needed |
|---|---|---|---|
| Employed Indian switchers with 1–5 years' experience as initial ICP | Strategic inference and public-market orientation | No current-user distribution, cohort behavior or paid evidence | Segment analysis, 15–20 interviews, paid cohort comparison |
| Four cohorts of 25 paying users | Planning model | Capacity, recruitment rate and price acceptance are unknown | Use the first 10 eligible users in cohort 1 as calibration; review operating capacity before completing the cohort |
| Specific first-100 channel allocations | Planning allocation | No channel conversion or CAC data | Track outreach-to-screen-to-paid-to-activated by source |
| INR search-sprint packaging | Competitor packaging and episodic-need inference | No WTP, refund, COGS or conversion evidence | Pricing interviews and sequential paid tests |
| Portfolio demand | A single public reference and team discussion | Relevance depends heavily on role family | Role-family interviews and task demand |
| University or placement-cell product | Strategic possibility | No buyer research, procurement path or D2C proof | Five buyer interviews after consumer activation |
| Referral loop | Category pattern | No verified value moment or fraud baseline | Ask-intent study after activation event |
| SEO/free tools | Competitor pattern and search hypothesis | No keyword, conversion or activation evidence | Search-demand audit and one-tool experiment |
| India-to-country mobility layer | Strategic hypothesis and competitor observations | Destination, job coverage, legal content and willingness to pay are unknown | Choose one corridor; audit 500 roles; interview a dedicated subgroup |
| Voice-interview premium | Technical feasibility and category pattern | No human-rated value or willingness-to-pay evidence | Transcript MVP, accent benchmark, pricing test |
| Lifecycle program impact | Good practice and team discussion | Event quality and message incrementality are unknown | Preferences, holdout tests and complaint guardrails |
| Competitor-ad patterns as acquisition guidance | Supplied creative archive | No spend, reach, audience, conversion or retention data | Treat as format inspiration only; test original creative end to end |

## Outdated or volatile evidence

No core source was already superseded on the 6 August 2026 research cut-off. The following evidence is volatile and needs a refresh before procurement, coding or public use:

- public prices, credit allowances, model names, API limits and OAuth classifications;
- Chrome Web Store user/review counts and social follower counts;
- competitor feature packaging and automation language;
- job-provider pricing, contracts, data provenance and geographic coverage;
- DPDP commencement and operational guidance by feature launch date;
- tool prices for v0, Relume, 21st.dev, MotionSites, HyperFrames, Remotion, HeyGen and Higgsfield.

`report-notes.md` and `source-ledger.md` are dated 22 July 2026. They remain useful internal context but should not override the 6 August source register. Their first-50 target also conflicts with the later first-100 research plan and requires a founder choice.

## Claims requiring verification

- `10,000+ Job Seekers`, testimonials, employer logos, time-saved claims, callback/interview outcomes and any comparative or ATS claims.
- Whether every visible HireNudge module is live, beta, hidden, retired or only mocked.
- Exact Gmail scopes, token storage, revocation behavior and verification status.
- Exact browser-extension permissions, supported sites and submission behavior.
- Job sources, redistribution rights, freshness SLA, expiry handling and deduplication quality.
- Current pricing enforcement, credit consumption, renewal, tax, refund and cancellation behavior.
- Current analytics events, data completeness, retention, conversion and user outcomes.
- Any competitor outcome or volume claim. Public marketing remains a competitor claim.
- Any claim that an alignment or ATS score predicts hiring or employer-system behavior.
- Baskaran's identity, role scope, working preferences and ownership.

## Broad initiatives split

| Original | Canonical split | Reason |
|---|---|---|
| HN-004 Job-centered journey hub | HN-004A Journey architecture; HN-004B Application packet | Navigation and domain model have different effort, dependencies and test criteria |
| HN-006 Provenance, freshness, expiry and dedupe | HN-006A Source rights strategy; HN-006B Lifecycle quality | Commercial permission must not be hidden inside ingestion engineering |
| HN-010 Safe portfolio publishing | HN-010A Sensitive-data incident remediation; HN-010B Safe publishing | Immediate critical remediation and a later optional feature cannot share priority or horizon |
| HN-022 Founder/product education engine | HN-022A Organic learning; HN-022B Paid readiness | Organic learning can start earlier; paid scale needs activation and margin gates |
| HN-028 Privacy, security and AI transparency center | HN-028A User controls; HN-028B Security baseline; HN-028C Transparency | Product controls, internal security and public disclosure need separate ownership and proof |

## Initiatives narrowed rather than split

- HN-003 covers a minimal candidate evidence profile for the chosen workflow, not a universal career-data platform.
- HN-009 covers editable, job-linked material variants. It excludes autonomous sending.
- HN-013 is one provider, one jurisdiction and one use case. It excludes a general contact database.
- HN-018 is a four-cohort learning program, subject to a 10-user calibration gate.
- HN-020 is one destination and one role family, not global mobility coverage.
- HN-025 is buyer research and a bounded pilot after D2C evidence, not an institutional product line.
- HN-029 is one decision-grade free tool, not scaled programmatic SEO.
- HN-030 is a later message/motion test, not a mascot-led redesign.

## Priority corrections

P0 now covers only necessary trust, launch, security, compliance, activation or critical-retention work. The following original P0 labels were lowered:

- HN-018 First 100 customers: **P1 / Research**, because it validates strategy but is not a product control.
- HN-019 ICP validation: **P1 / Research**, because the founder must choose a provisional focus before product expansion.
- HN-011 Tracker: split by scope in the plan; the minimum outcome loop remains **P0**, while advanced board views are not implied.
- HN-028: user controls and the security baseline remain **P0**; a polished public transparency center is **P1**.
- HN-010: incident remediation remains **P0**; portfolio feature work becomes **P2**.

## Missing metrics, owners and dependencies

All original initiatives lacked assigned owners. The canonical register uses `Unassigned`; suggested functions belong in notes and do not assign people. Founder priority remains unset.

Metrics exist for most initiatives, but baselines and thresholds are absent. HN-021, HN-022A/B, HN-023, HN-024, HN-025, HN-029 and HN-030 especially need pre-registered thresholds before experiments. Every metric shown in the dashboard must display `Baseline not supplied` until internal data arrive.

Common missing dependencies:

- founder choices for outcome, ICP, autonomy, product object and evidence standard;
- engineering inventory of live surfaces, event schema, models, job ingestion, OAuth and extension architecture;
- legal review of claims, job rights, contact data, outreach, TerraTern cross-use, privacy and billing;
- internal analytics, support, cancellation, customer-interview and unit-cost data;
- named accountable owners and decision deadlines.

## Build-readiness conclusion

The strategy dashboard can be built as a local, read-only presentation of this register after founder review of the content and labels. It must not present operational metrics, approvals, owners or deadlines as known. Coding should wait for confirmation of the canonical IDs, P0 list, founder-decision wording, existing-app integration path and whether sensitive incident details belong in the presentation view.
