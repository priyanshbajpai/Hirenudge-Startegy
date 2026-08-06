# Founder decisions required

No decision below is made by this research. Recommended order is designed to unblock evidence collection and prevent material risk.

## Decisions for the next founder session

| # | Decision | Recommended default | Alternatives/trade-off | Evidence required | By when |
|---:|---|---|---|---|---|
| FD-01 | What exact outcome should HireNudge optimize? | Qualified interview responses per 10 high-fit, human-reviewed applications, as a hypothesis | Activation or paid retention can lead temporarily; never application volume alone | Event feasibility, user reporting completeness | Now |
| FD-02 | What is the provisional ICP? | India-based, English-speaking employed switchers, 1–5 years, 30–60 day intent; select 1–2 role families from data | Students/unemployed/senior/global increase breadth and different needs | Current user/job/channel distribution; interviews | Now |
| FD-03 | Is autonomous apply/outreach allowed? | Reject fully autonomous/high-volume behavior; require human review | Limited automation only with explicit later review | Platform terms, quality and complaint data | Now |
| FD-04 | What public claim standard applies? | Every claim/logo/testimonial needs source, method, permission, owner and review date | Remove all outcome claims until substantiated | Claim pack | Now |
| FD-05 | Authorize immediate portfolio remediation? | Remove identity-document numbers immediately and scan all public outputs | No credible reason to defer | Site ownership/access | Immediate |
| FD-06 | What is the core product object? | Job-centered application packet backed by candidate evidence | Continue module-first suite risks fragmentation | Prototype/user test | Now–30d |
| FD-07 | How should alignment be described? | `Profile-to-role alignment`; requirements/evidence/gaps/unknowns; no hiring probability | A numeric score can remain secondary only after validation | Extraction/evaluator results | Now |
| FD-08 | What job-source policy is acceptable? | Curated public ATS + licensed partners; no restricted scraping core | More coverage via scraping raises rights/quality risk | Contracts, source audit, costs | Now–30d |
| FD-09 | Gmail/mailbox boundary? | Send-only `gmail.send`, connect at send, no inbox read initially | Compose/read scopes add verification/security and trust burden | OAuth config/security design | Now |
| FD-10 | Contact enrichment scope? | One provider, one country/use case, capped pilot after legal review | Multiple vendors/sequences increase data and spam risk | DPA, upstream rights, LIA/notice analysis | Before build |
| FD-11 | Which 100-customer offer and price cells? | Paid Application Quality Sprint in four cohorts of 25 | Free cohort gives weaker WTP evidence | COGS, 10–15 pricing interviews, team capacity | 2 weeks |
| FD-12 | What is the product/brand promise? | Higher-quality, truthful applications and clear next steps | Broad `all-in-one/autopilot` is easier to claim but harder to prove | Message tests and proof inventory | 2–4 weeks |
| FD-13 | Is `Nudge Studio` a rename or architecture? | Approve only as evidence/packet/version workspace | Cosmetic rename has low value | Flow spec | 30d |
| FD-14 | Which international corridor, if any? | Defer broad global; later select one destination and role family | All-corridor launch is high-cost/high-risk | Demand, job coverage, sponsorship data, TerraTern role | 60–90d |
| FD-15 | TerraTern/HireNudge data boundary? | Separate purpose and access; explicit opt-in for every cross-use | Shared pool may ease distribution but creates severe trust/legal risk | Counsel/controller map and consent design | Now |
| FD-16 | Interview-prep first release? | Transcript-first; voice later; prohibit personality/emotion/employability scores | Realtime voice is more marketable but riskier/costlier | Human benchmark, privacy and accessibility design | 30–60d |
| FD-17 | Pricing structure? | Test INR tax-inclusive short search sprints with transparent metering | Keep USD+GST/credits for simplicity | COGS, conversion/refund and WTP | 30–60d |
| FD-18 | When can paid acquisition scale? | After stable activation, repeated-use, claims and margin gates | Scaling early buys faster but uninterpretable traffic | Two clean cohorts and attribution | After first cohorts |
| FD-19 | What visual redesign scope is approved? | Prototype job-centered IA and design system; defer mascot/maze | Full redesign creates speed/novelty but high rework risk | Usability baseline and message test | 30d |
| FD-20 | Who owns trust, evidence and decision cadence? | Named product analytics, job data, security/privacy, claims and research owners | Shared ownership leads to gaps | Team capacity/roles | Now |

## Engineering confirmations required

- Current live/beta/hidden/retired module inventory and roadmap commitments.
- Existing analytics SDK, event names, identity model and data quality.
- Match pipeline, prompt/model versions, parsing method and evaluation artefacts.
- Job sources, contracts, refresh/deletion/dedupe logic and coverage.
- Gmail scopes, token storage, revocation, sending and audit behavior.
- Extension permissions, supported sites, security review and whether anything submits.
- Versioning/storage architecture and deletion propagation.
- Model/subprocessor list, data residency/retention and feature-level COGS.
- Voice/interview prototype latency, accessibility and raw-audio lifecycle.
- Production security controls, incident response, RBAC and audit logging.

## Legal/compliance confirmations required

- Public claims, testimonials, employer logos and comparative statements.
- Privacy notice alignment with actual model training/service-improvement behavior.
- DPDP phased applicability and operational notice/rights/security obligations.
- Gmail verification/security assessment requirements for the final scope.
- Contact-data provider rights, lawful basis, Article 14/notice, objections and suppression.
- CAN-SPAM, UK PECR, GDPR/ePrivacy and country-specific outreach classification.
- Job-feed contracts, attribution, retention, scraping restrictions and takedown.
- TerraTern/HireNudge controller roles, consent and cross-border transfers.
- Audio/transcript/voice privacy, accessibility and prohibited scoring claims.
- Refund, renewal, GST/display-currency and credit-expiry terms.

## Exact next task

Run a **10-business-day Evidence and Activation Sprint**:

1. complete `docs/hirenudge-internal-evidence-intake.md` with aggregate/de-identified exports;
2. remediate the public identifier exposure and unsupported/contradictory claims;
3. hold a 90-minute founder decision session for FD-01 through FD-10 and FD-15/20;
4. produce a one-page job-centered activation specification and event dictionary;
5. recruit the first 10 calibration users for observed activation sessions.

Do not design or build the strategy dashboard during this sprint.

