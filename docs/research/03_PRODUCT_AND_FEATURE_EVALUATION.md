# Product and feature evaluation

Date: 6 August 2026  
Canonical initiative register: this file contains the required evaluation fields for every material initiative. Other research files refer to these IDs. **All decision statuses are `To Be Discussed`; none is approved by this research.**

## Evaluation rules

- Priority is AI-suggested sequencing, not approval.
- `Impact` is directional because no internal baseline was supplied.
- `Confidence` concerns the recommendation, not implementation success.
- `Current state` never upgrades a discussion or screenshot into a live backend capability.
- Recommended horizons: **Now (0–30d)**, **Next (31–90d)**, **Later (91–180d)**, **Do not pursue yet**.

## Register A — problem and evidence

| ID | Workstream | Title | Initiative type | Current state | User problem | Evidence | Evidence status |
|---|---|---|---|---|---|---|---|
| HN-001 | Trust | Claims and proof control | Risk remediation | Public claims visible; proof not supplied | Users cannot distinguish evidence from promise | Homepage, pricing, ads, internal intake | Publicly marketed; Requires founder confirmation |
| HN-002 | Analytics | Activation and outcome instrumentation | Foundation | Event data not supplied | Team cannot tell whether users reach value or improve outcomes | Internal evidence gap; broad dashboard | Requires engineering confirmation |
| HN-003 | Profile | Candidate evidence profile | New capability | Resume/preferences collected; canonical evidence model unverified | Re-entered, inconsistent or invented career claims | Competitor version patterns; team proposal | Inferred / Recommendation |
| HN-004 | Core UX | Job-centered journey hub | Improvement | Modules and dashboard observed; synchronization discussed | Users must translate a module menu into a job-search plan | HireNudge and competitor screenshots | Observed on HireNudge / Discussed with team |
| HN-005 | Matching | Explainable alignment | Improvement | Numeric scores observed; explanation quality unverified | A score does not reveal requirements, evidence, gaps or uncertainty | HireNudge/Jobright/Teal screens; NIST principles | Observed / Recommendation |
| HN-006 | Job data | Provenance, freshness, expiry and dedupe | Foundation | Freshness labels visible; pipeline unknown | Stale/duplicate/unlicensed jobs waste time and break trust | Team concern; ATS/API research | Discussed; Requires engineering/legal confirmation |
| HN-007 | Nudge Studio | Base and job-specific version lineage | Improvement | Editor visible; multi-version depth discussed | Users lose which resume/letter was used for which job | Huntr/Careerflow/Teal screenshots | Publicly observed competitor capability / Recommendation |
| HN-008 | Nudge Studio | Truth-preserving achievement coach | New capability | Quantification discussed | Users need stronger evidence without fabricated metrics | Team baseline; AI accuracy risk | Discussed / Recommendation |
| HN-009 | Materials | Role-specific cover letter and outreach variants | Improvement | Generators/outreach visible; controls discussed | Generic text is low-value and risky to send | Screenshots and team baseline | Observed / Discussed |
| HN-010 | Portfolio | Safe template-based portfolio publishing | Improvement | Generator quality discussed; reference observed | Generated portfolios need credible hierarchy without leaking sensitive data | Public portfolio inspection | Observed; Requires immediate remediation |
| HN-011 | Tracker | Packet-level tracker and outcome loop | Improvement | Empty tracker/board visible; outcome linkage unverified | Users cannot learn which job, source, material and follow-up worked | HireNudge/Huntr/Careerflow/Simplify screens | Observed / Recommendation |
| HN-012 | Outreach | Gmail send-only OAuth and explicit review | Risk-bounded integration | Connect prompt visible; scopes unknown | Users need convenient sending without granting mailbox reading | Google OAuth docs; HireNudge screens | Observed; Requires engineering/legal confirmation |
| HN-013 | Outreach | Contact enrichment governance | Risk-bounded pilot | Apollo/Hunter discussed; no contract supplied | Users need relevant contacts, but sourced personal data creates compliance risk | Apollo/Hunter/PDL sources | Discussed; Requires legal confirmation |
| HN-014 | Interview | Transcript-first job/round practice | New capability | Interview questions visible; deeper practice discussed | Generic questions do not improve a specific upcoming round | Competitor screens; team baseline | Discussed / Recommendation |
| HN-015 | Interview | Opt-in realtime voice practice | New capability | Discussed; not verified live | Users need realistic practice and descriptive delivery feedback | Realtime/STT docs; NIST/WCAG/EEOC | Discussed; Requires engineering/legal confirmation |
| HN-016 | Lifecycle | Triggered lifecycle and preference center | Growth/product | Personalized messages discussed; system unverified | Users forget next actions or receive noisy generic email | Team baseline | Discussed / Recommendation |
| HN-017 | Monetisation | India-tested search-sprint pricing | Experiment | USD+GST credit plans observed | Price/credits do not clearly map to a short job-search episode | Current and competitor pricing | Observed / Recommendation |
| HN-018 | GTM | First 100 paid customer cohort | Experiment | Existing first-50 hypothesis; results not supplied | Team needs behavior/WTP evidence before paid scale | Internal strategy docs | Recommendation |
| HN-019 | ICP | India domestic employed-switcher wedge | Strategy | Hypothesis in repository | Targeting all corridors dilutes product and distribution | Internal baseline and competitive audit | Inferred / Requires founder confirmation |
| HN-020 | Mobility | One India-to-country sponsorship pilot | Experiment | Multiple corridors discussed | Global applicants lack verified eligibility/sponsorship context | Jobright screens; team baseline | Discussed / Recommendation |
| HN-021 | UI system | Accessible journey design system | Improvement | Modern light redesign discussed | Inconsistent cards, hierarchy and states increase cognitive load | Screenshot audit; WCAG | Discussed / Recommendation |
| HN-022 | Content | Original founder/product education engine | Growth experiment | Ads/content exploration in progress | Trust is hard to build with generic AI creative | 296 supplied ads; public social signal | Currently in progress / Recommendation |
| HN-023 | Operations | Support, feedback and release loop | Foundation | Operational evidence not supplied | Bugs, objections and feature requests do not reliably change priorities | Required-source gap | Recommendation |
| HN-024 | Growth | Value-triggered referral loop | Experiment | Not observed | Satisfied users lack a safe sharing moment | Category pattern; internal gap | Inferred / Recommendation |
| HN-025 | B2B | University/placement-cell pilot | Expansion experiment | Discussed as opportunity; not validated | Institutions may need measurable application readiness | Strategy hypothesis | Recommendation |
| HN-026 | Automation | Autonomous high-volume apply/outreach | Avoid | Public `autopilot`/bulk language; exact behavior unclear | Volume can create bad applications, spam and account harm | HireNudge/competitor claims and policies | Publicly marketed / High-risk |
| HN-027 | Data governance | TerraTern consent boundary | Risk control | Potential advantage; data sharing not evidenced | Users did not necessarily consent to cross-product reuse | Repository operating context | Requires founder/legal confirmation |
| HN-028 | Trust | Privacy, security and AI transparency center | Foundation | General policy exists; operational detail missing | Users cannot inspect retention, providers, permissions or AI limits | Privacy audit | Publicly observed / Recommendation |
| HN-029 | SEO | Decision-grade free tools and corridor pages | Growth experiment | Broad SEO desire; no execution evidence | Searchers need utility before signup | Competitor education/free-tool pattern | Recommendation |
| HN-030 | Brand UX | Mascot and motion-led landing concept | Brand experiment | Discussed | Brand could feel warmer, but motion can distract from value | Team baseline; competitor inspiration | Discussed / Recommendation |

## Register B — recommendation, impact and dependencies

| ID | Competitor/benchmark observation | Strategic recommendation | Target user | Expected user impact | Expected business impact | Effort | Technical dependency | Data dependency |
|---|---|---|---|---|---|---|---|---|
| HN-001 | Strong competitors also qualify AI/no-guarantee language | Create claim ledger; remove/qualify unsupported claims and reconcile `autopilot` | All prospects/users | Higher informed trust | Lower regulatory/refund/reputation risk | S | Content inventory, approval workflow | Claim calculations, permissions |
| HN-002 | Mature journey products make progression measurable | Instrument signup → real job → reviewed packet → submitted application → response/interview | Team and active seekers | Faster issue resolution | Enables prioritization, conversion and retention decisions | M | Event SDK, identity, warehouse/analytics | Event dictionary, cohort baselines |
| HN-003 | Huntr/Careerflow separate base and tailored artifacts | Build structured, candidate-owned facts/evidence with field provenance | Active switchers | Less repetition and fewer hallucinated claims | Reusable personalization moat | L | Profile schema, permissions, version store | Resume/LinkedIn/user-confirmed facts |
| HN-004 | Competitors anchor work to journey/job | Make saved job/application packet the hub; show one next best action | Active seekers | Lower cognitive load, clearer progress | Higher activation/adoption | L | Shared entities/navigation/state | User stage and action history |
| HN-005 | Match tools often over-index on a number | Show must-haves, evidence, gaps, unknowns and editable rationale; label alignment | All match users | Better decisions and learning | Differentiated trust and job-save quality | M | JD parsing, retrieval, explanation UI | Labeled requirements/evaluation set |
| HN-006 | Teal documents ATS ingestion; others surface freshness | Persist source/publisher/fetched/verified/expiry/duplicate metadata and audit it | Job seekers | Fewer dead or duplicate jobs | Retention and provider-cost control | L | Ingestion, canonicalization, scheduler, takedown | Source contracts, freshness samples |
| HN-007 | Version lineage is explicit in Huntr/Careerflow | Treat each export/submission as immutable version linked to job and outcome | Multi-application seekers | Confidence and recoverability | More repeated use and outcome learning | M | Object/version storage, diff, linking | Edit/export/submission history |
| HN-008 | Generic AI rewrites commoditize quickly | Ask for missing evidence; offer placeholders/questions; require confirmation before adding numbers | Resume users | Stronger truthful bullets | Trust differentiation, lower hallucination risk | M | Guardrailed generation, provenance UI | Candidate examples and confirmed metrics |
| HN-009 | Competitors offer job-linked editable drafts | Provide purpose/recipient/tone/length controls, source panel, variations and edit diff | Applicants/outreach users | Faster personalized drafts | Feature value without autonomous risk | M | Prompt templates, editor, versioning | Job/company/contact facts |
| HN-010 | Portfolio reference has strong hierarchy but unsafe data | Offer 3–5 original responsive templates, field controls, preview, publish, revoke and PII scanner | Portfolio-relevant roles | Better personal brand with safer sharing | Selective acquisition/referral surface | M | Renderer/hosting/domain/privacy scanner | User-approved public fields |
| HN-011 | Trackers are common; linked actions add value | Track stage, packet, source, follow-up and outcome; allow manual use without inbox access | Active applicants | Clear next steps and learning | Retention/outcome dataset | M | Workflow state, reminders, packet links | User-updated outcomes |
| HN-012 | Google distinguishes send-only from restricted mailbox scopes | Use `gmail.send` only; connect at send moment; review every message; revoke and delete token on disconnect | Outreach users | Lower permission burden and mistakes | Lower verification/security exposure | M | OAuth, encrypted token vault, send audit | Consent/scopes/send events |
| HN-013 | Apollo/Hunter expose data and opt-out machinery | Run a capped provider pilot only after DPA/rights/LIA; show source, relevance and suppression | High-intent outreach users | Fewer irrelevant contacts/messages | Reply learning with bounded risk | M | Provider adapter, verification, suppression | Provider contract, recipient jurisdiction |
| HN-014 | Careerflow/Jobright show job-specific preparation | Start with text/transcript answers, rubric, examples and retry by interview round | Candidates with interview date | More specific, actionable practice | Premium value close to outcome | M | Question/rubric engine, editor | JD/company/user stage; calibrated examples |
| HN-015 | Realtime voice is technically available | Add opt-in voice only after transcript MVP; default-delete raw audio; provide text mode | Interviewing candidates | Realistic practice with accessibility choice | Premium usage, subject to trust | L | Realtime audio, STT/TTS, secure storage | Consent, retention, accent/language evals |
| HN-016 | Lifecycle works when tied to actual workflow | Build event-triggered, user-controlled reminders/digests with global cap and quiet mode | Active/inactive users | Timely value without fatigue | Retention and conversion | M | Messaging, preference center, scheduler | Consent, events, deliverability |
| HN-017 | Competitors sell weekly/monthly/search-period access | Test INR, tax-inclusive 2/4/8-week or monthly plans; explain credit cost before action | India-first cohort | Easier purchase comparison | WTP/unit-economics evidence | S-M | Billing/entitlements/experiments | COGS, conversion, refund, usage |
| HN-018 | No public benchmark replaces direct paid behavior | Recruit 100 paying searchers in small role-family cohorts with concierge research | Chosen ICP | High-touch outcomes and feedback | Validates wedge, WTP and workflow | M | Lightweight CRM/analytics | Screening, interviews, behavior/outcomes |
| HN-019 | India-local nuance under-served by global tools | Start with English-speaking India-based employed professionals, 1–5 years, switching in 30–60 days; select 1–2 role families from data | Initial ICP | More relevant constraints and guidance | Focused positioning/distribution | S | Segmentation and content configuration | Current user/job/channel mix |
| HN-020 | Jobright makes sponsorship a first-class filter | Validate one destination and role family; source sponsorship evidence, not guesses | India-to-global subgroup | Safer opportunity selection | TerraTern-aligned differentiated pilot | L | Work-authorization schema, source evidence | Sponsorship records, legal content |
| HN-021 | Journey coherence beats decorative novelty | Define tokens/components/states; WCAG 2.2 AA; progressive disclosure; reduced motion | All users | Clearer, faster, accessible work | Higher activation, lower rework | M | Frontend design system and QA | Usability baseline/task results |
| HN-022 | Archive favors creator-native problem/demo formats | Produce original weekly founder teardown, product demo, trust and India-reality series; test hooks, not imitation | Organic/paid prospects | Useful proof before signup | Organic learning and later paid creative | M | Content workflow, analytics, asset system | Claim approvals, content performance |
| HN-023 | Category speed makes qualitative evidence essential | Centralize support tags, research notes, requests, bugs, releases and experiment decisions | Users and team | Faster resolution and voice | Better prioritization and retention | S-M | Helpdesk/CRM/issue links | Tagged tickets, research repository |
| HN-024 | Trackers/docs create natural share moments | Ask after a verified value event; reward non-sensitive invites, not public application data | Activated users | Easy peer help | Lower-CAC acquisition signal | S-M | Referral codes/attribution | Activation and fraud events |
| HN-025 | Campus distribution can aggregate demand | Only pilot after D2C activation; sell measured readiness/cohort support, not placement guarantees | Institutions/students | Structured support | B2B revenue/distribution evidence | L | Admin/privacy/consent/cohort reporting | Institution buyer research and outcomes |
| HN-026 | Agentic apply claims create speed but trust risk | Do not ship fully autonomous apply or sequences; keep human review and quality caps | All users/platforms | Avoids bad applications/account harm | Protects brand/platform access | S to prohibit | Policy enforcement/audit | Quality/spam complaints |
| HN-027 | Distribution advantage can become privacy dependency | Separate brands/data; explicit purpose-specific opt-in; no pre-checked consent | TerraTern/HireNudge users | Preserves agency | Sustainable trust and legal posture | M | Consent ledger, access controls | Data map, lawful-purpose review |
| HN-028 | Competitors publish caveats but operational clarity varies | Publish permissions, retention matrix, subprocessors, AI limitations, deletion/export and incident contact | Trust-conscious users | Informed control | Conversion trust and enterprise readiness | M | Privacy APIs, security docs/process | System inventory, audits |
| HN-029 | Free tools attract intent but can become thin SEO | Build tools only around real decisions: alignment explainer, notice-period planner, sponsorship evidence checklist | Search prospects | Immediate utility | Qualified organic demand | M | Indexable tools/content CMS | Search demand, activation attribution |
| HN-030 | Mascots/motion aid memory only when subordinate | Delay mascot/maze work; test a linear scroll journey and reduced-motion prototype after message/flow validation | Prospects | Clearer story without distraction | Avoids redesign waste | S-M | Prototype/performance/accessibility | Message test and landing conversion |

## Register C — risk, measurement, priority and decision

| ID | Legal/compliance risk | Product risk | Confidence | Success metric | AI priority | Founder decision required | Decision status | Horizon |
|---|---|---|---|---|---|---|---|---|
| HN-001 | High if unsupported/misleading | Short-term conversion dip after claim removal | High | 100% public claims have evidence owner, source and review date | P0 — Must Have | Approve claim standard and removal authority | To Be Discussed | Now |
| HN-002 | Medium; sensitive event data | Bad taxonomy creates false certainty | High | ≥95% clean event coverage; cohort report reproducible | P0 — Must Have | Choose activation and outcome definitions | To Be Discussed | Now |
| HN-003 | High; resume/immigration data | Large build before ICP proof | Medium-high | Lower repeated entry; zero unconfirmed facts in sampled outputs | P1 — Important | Approve canonical-profile scope | To Be Discussed | Next |
| HN-004 | Low-medium | Large navigation change before usability baseline | High | Median time to saved reviewed packet; task completion | P1 — Important | Choose job-centered product architecture | To Be Discussed | Next |
| HN-005 | Medium-high; misleading inference/bias | Explanation may be confidently wrong | High | Requirement-level precision/reviewer agreement; user correction rate | P0 — Must Have | Ban hiring-probability language; approve label | To Be Discussed | Now |
| HN-006 | High; data rights/takedown | Coverage may fall after quality controls | High | ≥95% fresh verified inventory; expired-click and duplicate rates below set threshold | P0 — Must Have | Choose licensed/ATS-source policy and coverage tradeoff | To Be Discussed | Now |
| HN-007 | Medium; document retention | Version clutter | High | Packet-to-job link coverage; restore/use rate | P1 — Important | Approve packet/version model | To Be Discussed | Next |
| HN-008 | Medium; false claims | User over-trust | High | Zero inserted metrics without confirmation; edit acceptance/correction | P0 — Must Have | Approve truth-preservation rule | To Be Discussed | Now |
| HN-009 | High for external messages | Generic variants and choice overload | Medium-high | Human edit rate, send approval, reply quality; no fabricated company facts | P1 — Important | Set permitted recipients/use cases | To Be Discussed | Next |
| HN-010 | Critical until exposed IDs removed | Low relevance outside certain roles | High | Sensitive-field publish block; portfolio publish/share/use rate | P0 removal / P2 feature | Authorize immediate removal; decide portfolio role | To Be Discussed | Now removal; Later feature |
| HN-011 | Medium; user-entered outcomes | Incomplete self-reporting | High | D7 tracker return; outcome completeness; interviews/10 qualified applications | P0 — Must Have | Approve outcome taxonomy and denominator | To Be Discussed | Now–Next |
| HN-012 | High; OAuth/email/platform | Suspension/spam/user mistake | High | 100% sends reviewed; scope audit passes; token revocation test | P0 — Must Have | Approve send-only/no-inbox initial boundary | To Be Discussed | Now |
| HN-013 | Critical across jurisdictions | Irrelevant data and low replies | Medium | Valid contact/relevance/reply; suppression=100%; complaint threshold predefined | P1 — Important | Approve countries/providers and legal-review gate | To Be Discussed | Next |
| HN-014 | Medium; AI feedback accuracy | Rubrics feel generic | High | Practice completion; human-rated answer improvement and correction | P1 — Important | Select first rounds/role families | To Be Discussed | Next |
| HN-015 | High; biometric-like audio perception, consent | Pseudoscientific scores, latency/cost | High on sequencing | Opt-in, deletion SLA, transcription accuracy by accent, human-rated helpfulness | P2 — Good to Have | Approve non-score list and retention | To Be Discussed | Later |
| HN-016 | High; consent/direct marketing | Notification fatigue | High | Action completion per message, unsub/complaint and cap adherence | P1 — Important | Approve channel/frequency principles | To Be Discussed | Next |
| HN-017 | Medium; tax/refunds/renewal | Underpricing COGS or confusing credits | Medium-high | Paid activation, conversion, contribution margin, refunds, renewal | P1 — Important | Approve experiment cells and guardrails | To Be Discussed | Next |
| HN-018 | Medium; research consent/data | Concierge behavior may not generalize | High | 100 paid participants; activation, D7 use, WTP and interview outcome with confidence intervals | P0 — Must Have | Choose ICP/roles/price/capacity | To Be Discussed | Now |
| HN-019 | Low | Wrong wedge excludes better segment | Medium | Segment activation/retention/WTP beats alternatives | P0 — Must Have | Confirm provisional ICP and exclusions | To Be Discussed | Now |
| HN-020 | High; immigration/job-claim accuracy | Narrow coverage and stale sponsor evidence | Medium | Eligible fresh-role rate; user comprehension; interview outcomes | P2 — Good to Have | Choose one corridor and whether TerraTern participates | To Be Discussed | Later |
| HN-021 | Medium accessibility | Cosmetic redesign diverts core work | High | WCAG AA checks; usability success; reduced-motion support | P1 — Important | Approve principles, not competitor look | To Be Discussed | Next |
| HN-022 | High for claims/IP/endorsement disclosure | Content volume without learning | High | Qualified signup and activation by creative; claim-review compliance | P1 — Important | Choose voice, channel and proof threshold | To Be Discussed | Next |
| HN-023 | Medium; support PII | Tool sprawl/no ownership | High | Time-to-triage/resolve; insight-to-decision; release-read rate | P1 — Important | Assign owners and cadence | To Be Discussed | Next |
| HN-024 | Medium; referral consent/fraud | Incentive attracts low-quality users | Medium | Activated referral rate and downstream retention | P2 — Good to Have | Decide reward only after baseline | To Be Discussed | Later |
| HN-025 | High; student data/placement claims | Premature B2B customization | Medium | Paid pilot renewal and student activation/outcomes | P3 — Later | Approve only after D2C gates | To Be Discussed | Later |
| HN-026 | Critical; spam/platform terms | Core quality and brand harm | High | Zero unreviewed submissions/sends; complaint and suspension rate | P0 — Must Have | Explicitly reject or constrain autonomy | To Be Discussed | Do not pursue yet |
| HN-027 | Critical; consent/purpose limitation | Brand coupling and mistrust | High | 100% purpose-specific consent; zero unauthorized joins | P0 — Must Have | Decide separation, controller roles and opt-in | To Be Discussed | Now |
| HN-028 | High; accuracy of disclosures | Trust center can outpace reality | High | Retention/deletion/revocation tests pass; current subprocessor register | P0 — Must Have | Fund security/privacy owner and audits | To Be Discussed | Now–Next |
| HN-029 | Medium; thin/misleading content | SEO scale before activation | Medium | Organic activated signup, index quality, content-to-value rate | P2 — Good to Have | Select utility and no-programmatic-scale gate | To Be Discussed | Later |
| HN-030 | Medium accessibility/IP | Novelty hurts clarity/performance | High | Message comprehension, LCP/INP, conversion, reduced-motion parity | P3 — Later | Decide whether brand work follows activation | To Be Discussed | Later |

## Recommended product sequence

### Now: prove and protect

HN-001, HN-002, HN-005, HN-006, HN-008, HN-010 immediate remediation, HN-011 foundations, HN-012, HN-018, HN-019, HN-026, HN-027 and HN-028.

### Next: make one workflow coherent

HN-003, HN-004, HN-007, HN-009, HN-011 completion, HN-014, HN-016, HN-017, HN-021, HN-022 and HN-023.

### Later: expand only after gates

HN-010 portfolio feature, HN-015, HN-020, HN-024, HN-025, HN-029 and HN-030.

## Product ideas explicitly not prioritized

- fully autonomous applications or recruiter sequences;
- full-mailbox read access for a send-only use case;
- all countries/corridors at once;
- an employer-side screening product;
- emotion, honesty, personality, accent or employability scoring;
- a large template marketplace before the base/packet model works;
- a mascot-led or maze/pinball landing rebuild before message and activation evidence;
- scraping restricted platforms as the core job-data strategy.

