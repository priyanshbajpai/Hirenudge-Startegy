# Current-state audit

Date: 6 August 2026  
Decision status of every recommendation in this audit: **To Be Discussed**, unless a founder changes it. Priority and decision status are deliberately separate.

## Executive conclusion

HireNudge already presents a broad job-search suite, but neither the supplied evidence nor the repository establishes that it is a coherent, validated operating system. The visible product covers onboarding, resume creation/optimization, cover letters, job matching, outreach, tracking, interview preparation and browser autofill. The dominant risk is breadth without a proven activation loop: the dashboard asks users to understand many modules and scores before HireNudge has demonstrated one measurable job-search outcome.

The repository is more mature as a research-and-decision system than as proof of product-market fit. Its seeded initiatives are `Proposed`, the dataset records `approvedCount: 0`, and the internal-evidence intake remains unanswered ([SRC-INT-03/04](./00_SOURCE_REGISTER.md)). The correct interpretation is therefore:

- the supplied baseline is **Discussed with team** or **Currently in progress** only where the user explicitly said so;
- the screenshots are **Observed on HireNudge** only;
- the website is **Publicly marketed by HireNudge** only;
- no proposed feature is marked approved, technically feasible or legally cleared.

## What the team is already discussing

The user-provided baseline covers a modern light visual system, a journey dashboard, module synchronization, a professional mascot, `Nudge Studio`, richer personalization, explainable job fit, fresher job data, voice-led interviews, Gmail OAuth, contact enrichment, outreach sequences, competitor advertising, social/content, lifecycle messaging, multiple geographic corridors, pricing and broad product improvements.

This breadth is strategically useful as a discovery backlog, but it is not an executable roadmap. It contains conflicting ambitions: quality-first applications versus `autopilot` language; data minimization versus richer inbox/contact/mobility data; India-first focus versus simultaneous global corridors; and activation work versus a high-effort visual redesign.

## What is visibly present

From the 28 supplied HireNudge screenshots (`SRC-SS-HN`):

- a three-step preference/experience/resume onboarding;
- a post-upload Gmail connection prompt that frames profile completion as moving from 82% to 100%;
- Dashboard, Resume Nudge/Studio, Optimizer, Cover Letter, AI Job Matcher, Email Outreach, Job Tracker and Interview Prep navigation;
- job cards with numeric match percentages, job totals and freshness labels;
- a Resume Studio/editor, optimizer, cover-letter flow and question-preparation surface;
- an outreach surface gated by Gmail connection;
- a tracker empty state and browser-extension promotion;
- credit-based plans and email/outreach allowances.

From public pages:

- the homepage markets `10,000+ Job Seekers`, broad outcome testimonials and employer logos ([HireNudge homepage](https://hirenudge.ai/));
- pricing displays Free `$0`, Pro `$19 + 18% GST` for 30 days and Career Boost `$45 + 18% GST` for 90 days, with credits and outreach limits ([pricing](https://hirenudge.ai/pricing/));
- the Chrome listing showed 6 users and one rating on the access date ([extension listing](https://chromewebstore.google.com/detail/hirenudge-job-autofill/kaceapaemigjdjknghjkgigimlkakhde?hl=en-US));
- the privacy policy states that AI output may be inaccurate, users should review it, and the extension fills but does not auto-submit ([privacy policy](https://hirenudge.ai/privacy-policy/)).

## Contradictions and trust debt

| Issue | Evidence status | Why it matters | Required action |
|---|---|---|---|
| Pricing says `bulk` outreach and `autopilot`; privacy/extension language emphasizes review and no auto-submit | Publicly marketed / Observed | Users cannot tell whether HireNudge assists or acts autonomously | P0 claims-and-controls reconciliation before more acquisition |
| Numeric match scores appear prominent, but methodology and uncertainty are not visible in supplied screens | Observed on HireNudge | Users may read alignment as hiring probability | Replace the hero score with requirements, evidence, gaps and unknowns |
| Gmail is requested during onboarding completion | Observed on HireNudge | High-trust permission appears before the user has received core value | Move connection to the moment a user chooses to send outreach |
| `10,000+`, testimonials and employer logos appear publicly | Publicly marketed | Evidence, calculation period and logo/testimonial permissions were not supplied | Build a substantiation register or remove/qualify claims |
| Public portfolio reference exposes identity-document numbers | Observed on public portfolio | Immediate identity/privacy harm and unsafe precedent for generated portfolios | Remove now; block sensitive identifiers by default |
| Pricing copy mixes `unlimited` language with credit limits | Publicly marketed | Creates expectation and refund risk | State exactly which action consumes how many credits before purchase/use |

## Product-flow audit

### Onboarding and time to value

Current onboarding captures role/country preferences, experience and resume. That is enough to start, but it is not visibly job-first. A stronger activation path is:

1. import a truthful base profile;
2. choose one real target role;
3. see requirements classified as aligned, missing or unknown with evidence;
4. improve and save one job-specific application packet;
5. add a human-reviewed next step to the tracker.

The first-value event should be an actionable, evidence-linked plan for a real role—not profile completion, Gmail connection, a dashboard tour or a score.

### Dashboard and navigation

The visible dashboard is feature-rich but card-heavy. It mixes progress, credits, jobs, documents, email, interview and extension promotion without a single dominant next action. Competitor screenshots show a clearer pattern: Careerflow explicitly groups the journey; Huntr and Simplify anchor work to a saved job; Teal connects jobs, versions and tracking. HireNudge should turn the job detail/application packet into the hub and make modules contextual tools.

### Nudge Studio

Renaming can improve coherence, but the useful product change is not the label. The missing system is a candidate-owned evidence base plus version lineage: base profile → role-specific packet → user edits → exported file → submitted application → outcome. The system must never convert a responsibility into an invented metric. Suggestions should be tagged as source-backed, inferred or user-confirmed.

### Job matching

The existing score-centric UI should be treated as a profile-to-role alignment estimate. No evidence was provided for scientific validity as a probability of hire. Job quality also depends on source provenance, fetched time, publisher time, last verified time, duplicate group and expiry reason—none of which can be inferred from a visible `fresh` label alone.

### Outreach

Outreach is the highest combined platform, privacy and reputational-risk surface. A safe first version is send-only Gmail OAuth, explicit review for each message, low daily limits, recipient relevance rationale, suppression/unsubscribe handling and an auditable send event. Inbox reading and autonomous sequences should not be the initial scope.

### Interview preparation

Job- and round-specific practice is feasible, but a voice agent should coach answer content before attempting personality-like scoring. Transcript evidence, STAR structure, completeness, examples, question coverage and descriptive pacing/filler counts are useful. `Confidence`, emotion, accent, honesty or employability scores are not sufficiently grounded and should not be marketed.

## Pricing audit

The current USD-plus-GST pricing is observable, not validated. For an India-first hypothesis, display-currency fit, tax-inclusive clarity and short job-search episodes need testing. Credit economics are unclear to a user because high-value and low-cost actions can appear equally priced. No plan-level conversion, refund, churn, usage-cost or willingness-to-pay evidence was supplied.

## Privacy and security audit

The published policy is a foundation, not an implementation audit. Material gaps requiring evidence are:

- exact retention schedules by resume, job, prompt, email draft, OAuth token, audio and transcript;
- in-product export, deletion and OAuth revocation rather than email-only requests;
- named subprocessors/model providers and transfer mechanisms;
- role-based access, audit logs, encryption/key handling and incident response;
- extension permission review and field-level data minimization;
- explicit consent boundaries between TerraTern and HireNudge;
- policy-to-product verification for AI training/service improvement language.

## Current evidence-state table

| Area | Current state | Evidence classification | Confidence | What would change confidence |
|---|---|---|---|---|
| Broad candidate workflow | Visible in supplied screenshots | Observed on HireNudge | High | Live task test and analytics |
| Nudge Studio rename/redesign | Discussed/explored | Discussed with team | High | Founder decision and PRD |
| Explainable fit | Proposed in repository and prompt | Discussed with team / Recommendation | High | Prototype test and scoring validation |
| Fresh job-data pipeline | Problem visible; implementation unknown | Requires engineering confirmation | Medium | Source contracts, schema and freshness benchmark |
| Gmail OAuth | Connect gate visible; scopes unknown | Observed / Requires engineering and legal confirmation | Medium | Cloud consent config, code and security review |
| Voice mock interview | Current question surface visible; voice scope discussed | Discussed with team | Medium | Architecture prototype, consent design, evaluations |
| Lifecycle CRM | Discussed | Discussed with team | High | Event taxonomy, consent state and deliverability baseline |
| India-to-global mobility | Preference intent discussed | Strategic hypothesis | Medium | Interviews, job coverage and willingness-to-pay |
| First-100 acquisition | No execution evidence supplied | Recommendation | High that evidence is missing | Paid cohort data |
| Public traction/outcome claims | Published | Publicly marketed by HireNudge | High for existence, low for truth | Claim substantiation pack |

## Immediate actions

1. **P0 / To Be Discussed:** remove identity-document numbers from the public portfolio and add a sensitive-content scan to future portfolio publishing.
2. **P0 / To Be Discussed:** freeze new outcome/autopilot claims until each has an owner, source, calculation, permission and review date.
3. **P0 / To Be Discussed:** collect the internal evidence pack already specified in `docs/hirenudge-internal-evidence-intake.md`.
4. **P0 / To Be Discussed:** define and instrument one activation loop and a qualified-application outcome denominator.
5. **P0 / To Be Discussed:** run a job-source/freshness audit and Gmail scope/security audit before scaling those surfaces.

