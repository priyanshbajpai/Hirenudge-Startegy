# Dashboard information architecture

## Purpose

The dashboard is a founder decision surface. It answers what matters, why it matters, what is blocked, and which choice must be made. It is not a product analytics dashboard, a project-management clone or a complete research archive.

## Navigation model

Desktop uses a restrained left rail. Mobile uses a top bar and section drawer. The default landing route is Overview.

| Order | Section | Primary question | Default view |
|---:|---|---|---|
| 1 | Overview | What needs attention now? | Strategic brief with priority rail |
| 2 | Product & Features | Which product system should we improve or add? | Initiative groups by user journey |
| 3 | UI/UX | How should the journey and interface change? | Journey map and comparison stories |
| 4 | Brand Language | What should HireNudge promise and call things? | Current versus recommended language |
| 5 | Social & Advertising | What should we publish, test and defer? | Channel and funnel map |
| 6 | GTM | Who is the initial customer and how do we reach them? | ICP, corridor and funnel |
| 7 | First 100 Customers | How do we learn from paying customers? | Cohort and 12-week plan |
| 8 | Retention | What brings users back for a useful next step? | Lifecycle map by search state |
| 9 | Roadmap | What happens Now, Next, Later, in Research or while Blocked? | Five-lane roadmap |
| 10 | Founder Decisions | What must the founder decide? | Ranked decision queue |
| 11 | Research & Evidence | What supports this and what remains unknown? | Source and verification queue |

Presentation mode is a global view, not a twelfth content section.

## Global shell

### Persistent controls

- section navigation;
- global search by ID, title, recommendation, risk or source;
- filters for workstream, priority, decision status, horizon, evidence status and confidence;
- `Presentation mode` action;
- `Last research cut-off: 6 Aug 2026`;
- persistent caveat: `No founder approvals recorded`.

### Global rules

- Priority and decision status always appear as separate labeled fields.
- Founder priority displays `Not set`, never a copied AI priority.
- Unknown internal metrics display `Not supplied` with the missing source.
- Counts describe the register, not customer traction.
- Every recommendation opens an evidence drawer with source IDs, limitations and validation step.
- Sensitive incident details are hidden from presentation mode unless the founder explicitly enables operational risk detail.

## 1. Overview

### Content hierarchy

1. One-sentence strategic direction.
2. Evidence-state notice: public research complete; internal evidence missing.
3. Priority rail showing P0 items grouped by Protect, Prove and Operate.
4. Now/Next/Later snapshot.
5. Founder decisions due.
6. Critical risks and blockers.
7. Strongest findings and strongest opportunities.

### Visual patterns

- editorial lead statement rather than a hero card;
- horizontal priority rail with text labels and short rationale;
- two-column decision/risk list;
- no fake KPI strip;
- register counts may be shown with explicit label `planning records`.

## 2. Product and Features

### Groups

- Profile and evidence;
- Jobs and alignment;
- Application packet and Nudge Studio;
- Tracker and outcomes;
- Outreach;
- Interview preparation;
- Privacy and user control.

### Item treatment

Each row shows current state, initiative type, recommendation, impact, effort, AI priority, decision status, horizon and dependencies. Expanded detail adds problem, evidence, risks, metrics and founder question.

Existing, In Progress, Improvement, Proposed, Research Required, Compliance and Not Recommended items must remain visually distinct by label and icon, not color alone.

## 3. UI/UX

### Primary views

- current module-first journey;
- proposed job-centered journey;
- target activation flow;
- module-level issue and improvement list;
- before-and-after stories expressed as annotated wireframes or structured comparisons;
- competitor principles: adapt the pattern, avoid distinctive expression;
- system-state checklist for loading, stale, permission, error, empty, partial success and revoked access.

### Before-and-after rule

Use conceptual states, not fabricated screenshots of unbuilt functionality. Label them `Current observed pattern` and `Proposed concept`. Link current claims to supplied screenshot evidence; link proposed concepts to the responsible initiative.

## 4. Brand Language

### Primary views

- current broad category and claims;
- working position and proof hierarchy;
- current versus recommended wording;
- feature-naming decisions, including Nudge Studio;
- prohibited or high-risk claims;
- founder language decisions.

The comparison should be a clean two-column editorial table, not a carousel of cards.

## 5. Social and Advertising

### Primary views

- channel roles for LinkedIn, Instagram and X;
- organic, paid, founder-led, product-led, educational, proof and community content;
- content pillars;
- competitor-ad principles and archive limitation;
- creative test matrix;
- 30-day organic learning plan;
- paid-readiness gate.

The section must show funnel stage and proof object for each campaign. Competitor creatives remain appendix evidence, not dashboard decoration.

## 6. GTM

### Primary views

- provisional primary and secondary ICP;
- corridor comparison;
- offer and positioning test;
- acquisition funnel;
- channel sequence and partnerships;
- experiment queue and metrics.

Primary ICP is clearly labeled `Provisional`. Secondary ICP remains `Not selected` until data support it.

## 7. First 100 Customers

### Primary views

- definition: paying and active, not registered;
- first-50 versus first-100 contradiction notice;
- 10-user calibration gate within cohort 1;
- four cohorts of 25;
- channel allocation as a plan, not forecast;
- 12-week operating plan;
- weekly targets, suggested functions and learning questions;
- funnel assumptions with an `Assumption` label;
- stop/continue gates.

The view must not imply that any customers have been recruited.

## 8. Retention

### Primary views

- onboarding and activation;
- saved-job and packet reminders;
- fresh-job digest;
- application follow-up;
- interview reminders;
- inactivity recovery;
- upgrade, referral and win-back;
- search-status mode;
- consent, preferences, quiet mode and global frequency cap.

Default ordering follows the user journey. A secondary table lists trigger, message value, CTA, exit rule, metric and risk.

## 9. Roadmap

### Five independent lanes

- Now;
- Next;
- Later;
- Research;
- Blocked.

Each initiative appears once according to `roadmap_horizon`. Priority remains visible inside the row. Blocked items show the named missing dependency. Research items show the decision they are meant to change. No drag-and-drop or editing is required for V1.

## 10. Founder Decisions

### Queue schema

- decision ID;
- question;
- recommended default;
- options and trade-offs;
- impact of delay;
- linked initiatives;
- evidence needed;
- priority;
- deadline;
- status.

Unknown deadlines display `Founder to set`. Status defaults to To Be Discussed. The list ends with owner assignments because execution cannot start cleanly without them.

## 11. Research and Evidence

### Primary views

- source register with type, access date, claim, reliability and limitation;
- evidence-status legend;
- weakly supported recommendations;
- volatile-source refresh queue;
- claims requiring verification;
- engineering, legal and founder confirmation queues;
- contradictions and their unresolved choices.

Research detail stays searchable and expandable. The primary dashboard links to it instead of reproducing entire reports.

## Required visual-pattern map

| Pattern | Section | Purpose |
|---|---|---|
| Executive overview | Overview | One meeting-ready strategic state |
| Priority rail | Overview | Separate urgent necessity from the full backlog |
| Initiative register | Product, Roadmap | Canonical filterable inventory |
| Now/Next/Later roadmap | Overview, Roadmap | Sequence without implying approval |
| User-journey map | UI/UX | Show the transition from modules to a job-centered loop |
| Product workstream map | Product | Show dependencies among profile, job, packet, tracker and outcome |
| UI/UX comparison | UI/UX | Explain current versus proposed behavior |
| Brand-language comparison | Brand | Make claim changes concrete |
| GTM funnel | GTM | Connect channels to paid activation and outcome |
| First-100 allocation | First 100 | Show planning mix without calling it a forecast |
| Research queue | Research | Surface unknowns and refresh work |
| Founder-decision queue | Decisions | End meetings with explicit choices |
| Risk and dependency view | Overview, Roadmap | Expose blocked work and sequencing |
| Presentation mode | Global | Run a focused founder meeting |

## Search and filtering

Global search indexes initiative ID, title, problem, recommendation, question and source IDs. Filters combine with AND logic and remain encoded in the URL. A `Clear filters` action restores the section default. Mobile opens filters in a full-height sheet with the current result count.

## Detail levels

- **Founder layer:** decision, rationale, impact, priority, horizon, risk and question.
- **Expandable detail:** current state, evidence status, dependencies and success metrics.
- **Appendix:** full source lineage, limitations, provider comparisons and legal references.
- **Research only:** raw notes, screenshot filenames, sensitive operational details and unresolved internal exports.

## Empty and uncertainty states

- `No founder priority set`;
- `No owner assigned`;
- `Baseline not supplied`;
- `Deadline not set`;
- `Requires engineering confirmation`;
- `Requires legal confirmation`;
- `Source refresh due`;
- `No initiatives match these filters`.

These are valid product states, not errors to hide.
