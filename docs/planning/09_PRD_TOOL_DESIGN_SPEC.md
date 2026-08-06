# HireNudge Product Command Center — PRD tool design specification

Date: 6 August 2026  
Status: Proposed for founder review  
Implementation state: Not started

## 1. Product decision

Replace the document-like strategy dashboard experience with a dedicated, founder-facing PRD operating tool.

The tool should feel purpose-built for HireNudge rather than like a generic admin dashboard, spreadsheet clone, or long research report. Research remains the evidence layer; the primary interface is for scanning, comparing, deciding, assigning, sequencing, and reviewing product work.

V1 remains a local, browser-only planning tool. It has no authentication, backend, production APIs, production customer data, or team collaboration.

## 2. Product principles

1. **Work before prose.** Open on requirements, decisions, risks, and delivery state—not narrative paragraphs.
2. **Current versus changing.** Every product area starts with observed current behaviour beside the proposed change.
3. **Evidence travels with the requirement.** A claim, source, confidence label, and verification gap remain attached to the record.
4. **Priority, decision, and delivery are separate.** A requirement can be Must Have, To Be Discussed, and Not Started at the same time.
5. **Local edits never rewrite research.** Editable founder fields are stored as a versioned overlay on the immutable evidence baseline.
6. **Dense but calm.** The interface may hold substantial information without becoming card-heavy, visually noisy, or spreadsheet-like.
7. **No false certainty.** Proposed ETAs, compliance requirements, and technical feasibility are labelled as planning assumptions until confirmed.

## 3. Product name and shell

Working product name: **HireNudge Product Command Center**  
Descriptor: **Founder PRD & Execution Workspace**

### Persistent shell

- Narrow left navigation with product-area icons and text labels.
- Top command bar with global search, `Create view`, presentation mode, and local-draft state.
- A compact context strip showing the selected workspace, active filters, and visible record count.
- Main workspace occupying most of the viewport.
- Right-side inspector drawer for the selected record.
- Mobile uses a sheet-based navigation and full-screen record inspector.

The shell should not use a mosaic of KPI cards. Counts may be calculated from records and displayed as compact text or rails.

## 4. Primary navigation

1. **Command Center**
2. **Product PRDs**
3. **Screens & UX**
4. **Partners & APIs**
5. **Legal & Trust**
6. **GTM & First 100**
7. **Social Studio**
8. **Activation & Retention**
9. **Roadmap**
10. **Decision Queue**
11. **Evidence Library**

Presentation mode is launched globally and is not a normal navigation destination.

## 5. Information hierarchy

The product database uses this hierarchy:

`Workspace → Product area → Module → Screen or flow → Requirement`

### Product areas and modules

- **Acquisition:** landing page, pricing, signup, login.
- **Onboarding:** goals, target roles, job type, experience, locations, work authorisation, sponsorship, resume import, first-value transition.
- **Home:** journey dashboard, search status, next action, recommended jobs, profile completeness.
- **Nudge Studio:** resume builder, resume optimiser, cover letters, outreach drafts, portfolio.
- **Job Discovery:** AI Job Matcher, job detail, provenance, freshness, expiry, duplicates, saved jobs.
- **Outreach:** recipient selection, Gmail connection, message review, send, follow-up, suppression, disconnect.
- **Job Tracker:** saved, applied, interviewing, assessments, accepted, rejected, reminders, outcome history.
- **Interview:** setup, question bank, transcript practice, voice practice, feedback, round progression.
- **Extension:** autofill, tracker save, LinkedIn optimisation, permissions, local data controls.
- **Account:** settings, alerts, subscriptions, credits, privacy, export, deletion, consent.
- **Lifecycle:** onboarding messages, reminders, job alerts, follow-ups, interview reminders, win-back, referral, search-ended state.

## 6. Command Center

The opening screen is an operating surface, not an executive essay.

### Focus rail

Horizontal sections show:

- Must Have and not started;
- blocked work;
- decisions due;
- overdue planning ETAs;
- legal or security gates;
- current team-described work;
- items lacking an owner.

Each item is directly selectable and opens the inspector.

### Product change map

A compact product-journey rail shows the modules from onboarding to search ended. Each module displays requirement counts by category and delivery status. Selecting a module filters the primary workspace.

### Today panel

Shows the active planning date, 6 August 2026, local edit status, recently edited records, and unresolved founder decisions. It does not show fabricated performance metrics.

## 7. Product PRD workspace

This is the primary product experience.

### Default view: Requirements table

The table is purpose-built rather than spreadsheet-like. It uses strong row hierarchy, a frozen requirement title, controlled column density, and a selected-row inspector.

Default columns:

- requirement;
- module and screen;
- category;
- current state;
- delivery status;
- planning ETA;
- owner;
- decision status;
- usability;
- legal gate;
- evidence confidence.

Columns can be shown or hidden through saved local views. Horizontal overflow is contained inside the workspace; mobile changes to requirement cards with the same information order.

### Alternative views

- **Current → Changing:** paired visual comparison grouped by module or screen.
- **Priority board:** Must Have, Important, Good to Have, To Be Decided, and Not Recommended lanes.
- **Delivery board:** Not Started, Researching, In Design, In Development, Blocked, In QA, and Done lanes.
- **Journey view:** requirements arranged from onboarding through job-search completion.
- **Timeline:** planning ETAs and dependency gates.

Changing views never changes the underlying records.

## 8. Requirement record

Every requirement contains:

- `id`;
- title;
- workspace;
- product area;
- module;
- screen or flow;
- requirement type;
- current observed behaviour;
- current evidence limitation;
- user problem;
- proposed change;
- requirement category;
- founder priority;
- decision status;
- delivery status;
- planning ETA;
- owner;
- user-friendliness rating;
- user-friendliness rationale;
- expected user impact;
- expected business impact;
- effort;
- technical dependencies;
- data dependencies;
- partner/API references;
- legal and security requirements;
- risks;
- success metrics;
- evidence status;
- evidence sources;
- confidence;
- founder question;
- founder notes;
- last local edit.

### Requirement category colours

- Current — teal/blue;
- Must Have — red;
- Important — amber;
- Good to Have — blue;
- To Be Decided — purple;
- Not Recommended — dark red.

### Decision colours

- To Be Discussed — purple;
- Approved — green;
- Deferred — grey;
- Rejected — dark red.

### Delivery colours

- Not Started — neutral;
- Researching — blue-grey;
- In Design — indigo;
- In Development — amber;
- Blocked — red;
- In QA — blue;
- Done — green.

Every status always includes a text label and never relies on colour alone.

## 9. Record inspector

Selecting a row opens a wide right-hand inspector divided into actionable tabs:

1. **PRD:** current behaviour, problem, proposed requirement, acceptance direction, success metric.
2. **Delivery:** editable status, ETA, owner, founder priority, decision, dependencies, notes.
3. **UX:** user-friendliness rating, friction, accessibility, mobile implications, current-to-proposed comparison.
4. **Partners:** tools, APIs, repositories, resources, official links, commercial and security considerations.
5. **Compliance:** processing purpose, data involved, jurisdictions, obligation, evidence, legal confirmation and release gate.
6. **Evidence:** source links, screenshot-reference IDs, claim supported, access date, reliability, and limitation.

The inspector uses short structured blocks and controls. It does not reproduce long research documents.

## 10. Editable local state

Editable V1 fields:

- delivery status;
- planning ETA;
- owner;
- founder priority;
- decision status;
- founder notes.

The canonical research record remains read-only.

### Persistence

- Store edits in a versioned `localStorage` document keyed by requirement ID.
- Display `Local draft` persistently.
- Save automatically after a valid change.
- Display last-saved time.
- Sync changes across tabs using the browser storage event.
- Provide export, import, reset-record, and reset-all actions.
- Validate imported JSON before applying it.
- Store no resume, candidate, customer, inbox, or other personal data.

### ETA behaviour

- Accept an exact date or `Unscheduled`.
- Label every ETA `Planning ETA — not an engineering commitment` until confirmed.
- Highlight overdue records when ETA is before the active date and delivery status is not Done.
- Do not fabricate default dates. Existing `Now`, `Next`, and `Later` horizons may guide filtering but do not become dates automatically.

## 11. Current → Changing comparison

The comparison view must begin each module with three explicit columns:

1. **Current observed product** — supported by supplied screenshots or public surfaces.
2. **Team-described change** — discussed or described as in progress, without implying completion.
3. **Recommended requirement** — research-backed direction, validation step, and success measure.

Examples:

- Interview preparation: visible question-generation setup → team-described voice interview → transcript-first evaluation before opt-in voice.
- Job Matcher: visible numeric fit score → team-described explanation and more job sources → requirements, candidate evidence, gaps, uncertainty, provenance, freshness, and expiry.
- Email outreach: visible single Gmail-connected campaign → team-described sequences and contact enrichment → send-only, reviewed, capped workflow after provider and jurisdiction review.

Private screenshots are referenced internally by safe filename/sequence identifiers and are not copied into the deployed application.

## 12. Partners & APIs workspace

Partners are first-class records rather than prose inside feature pages.

Fields include:

- partner/tool name;
- category;
- applicable modules;
- proposed use;
- official source;
- API availability;
- authentication;
- pricing evidence;
- commercial-use status;
- data handled;
- security requirements;
- legal dependencies;
- implementation complexity;
- recommendation;
- verification state.

The workspace includes filters for job data, ATS, outreach, AI, voice, design, content production, analytics, and infrastructure.

Unverified tool names such as `Vo` or `Grainrad` remain labelled `Name/vendor confirmation required` until an authoritative source is recorded.

## 13. Legal & Trust workspace

Compliance is expressed as actionable obligations and release gates—not a `compliant/not compliant` badge.

Each record links:

`Requirement → Data involved → Processing purpose → Jurisdiction → Obligation → Product control → Evidence → Confirmation owner`

Initial regimes:

- India DPDP;
- EU GDPR;
- EU ePrivacy and national electronic-marketing rules;
- UK GDPR and PECR;
- US CAN-SPAM and applicable state privacy requirements;
- Canada CASL when the recipient or campaign is in scope;
- additional regimes only after a target corridor is selected.

Possible states:

- Applies;
- Possibly applies;
- Legal review required;
- Not applicable;
- Blocked.

### Privacy-policy treatment

The [HireNudge Privacy Policy](https://hirenudge.ai/privacy-policy/) is a public company statement dated 28 May 2026. It is evidence of published disclosure, not proof that the described controls are implemented or that HireNudge satisfies every applicable law.

The tool must track verification of Gmail scopes and token handling, retention schedules, subprocessors, lawful bases, transfer mechanisms, cookie controls, deletion/export behaviour, extension permissions, AI-provider handling, and the consistency between manual-review language and `Auto Apply` or `autopilot` product wording.

## 14. Screens & UX workspace

This workspace is a structured screen inventory with:

- screen and flow name;
- current observed pattern;
- primary user task;
- usability rating;
- friction and accessibility issues;
- proposed interaction;
- linked requirements;
- device impact;
- evidence reference;
- validation task and metric.

The visual centrepiece is a journey canvas from onboarding through search completion. Selecting a stage reveals its current screens, issues, planned changes, and decisions.

The dashboard must not publish supplied screenshots containing personal identifiers. Future use requires redacted derivatives approved for inclusion.

## 15. GTM & First 100 workspace

This workspace behaves like a cohort planner.

It explicitly separates:

- lead;
- signup;
- activated user;
- beta participant;
- paid customer;
- retained paid customer.

Editable cohort records include geography, source, organic/paid, allocation target, actual count when supplied, owner, ETA, delivery status, conversion assumption, consent requirement, learning goal, and scale/modify/stop rule.

TerraTern is always displayed with a consent and data-purpose gate. An allocation is not a forecast, and an unsupplied actual is shown as `Not supplied` rather than zero.

## 16. Social Studio

Social strategy becomes a campaign database with board, calendar, channel, and funnel views.

Records contain channel, audience, funnel stage, content pillar, format, original hook direction, CTA, organic/paid mode, claim-review requirement, owner, ETA, delivery status, and success metric.

Competitor advertisements appear only as learnings and principle references. No competitor copy, artwork, layouts, character, or distinctive expression is reproduced.

## 17. Activation & Retention workspace

The primary view is a state machine rather than an email list:

`Registered → Profile ready → First verified job → Reviewed application packet → Applied → Interviewing → Offer → Hired / Paused / Continuing`

Each state shows:

- activation requirement;
- next useful action;
- product prompt;
- lifecycle message;
- paid-value opportunity;
- consent and frequency rule;
- exit condition;
- metric;
- linked requirements.

Successful users can enter career maintenance, alumni/referral, or export-and-leave states. The product should not manufacture retention after the user has completed the job-to-be-done.

## 18. Roadmap and decision queue

### Roadmap

Supports Now, Next, Later, Research, and Blocked views. Requirements can also be arranged by planning ETA. Filters cover module, category, founder priority, decision, evidence, delivery status, owner, and legal gate.

### Decision queue

This is the strongest review surface after Product PRDs. Each decision shows the question, recommended option, alternatives, evidence, impact of delay, dependency, deadline, status, and linked requirements.

Changing a decision status updates only the local founder overlay.

## 19. Presentation mode

Presentation mode is generated from the same PRD data and local founder edits. It is not a second hand-written report.

It shows one decision-oriented canvas at a time:

1. current product map;
2. current versus changing;
3. Must Have queue;
4. product module changes;
5. UI/UX journey;
6. partners and APIs;
7. legal and trust gates;
8. GTM and first 100;
9. social strategy;
10. activation and retention;
11. roadmap;
12. founder decisions.

Editing controls are hidden. Priority, decision, evidence, and delivery labels remain visible.

## 20. Visual direction

### Character

- editorial precision with product-tool density;
- true white and warm neutral surfaces;
- charcoal typography;
- one controlled teal HireNudge accent;
- strong typographic rhythm;
- thin structural rules;
- restrained elevation only for drawers and active overlays;
- occasional subtle gradient confined to command/presentation moments;
- purposeful motion with reduced-motion support.

### Distinctive product patterns

- journey rail instead of metric cards;
- current-to-changing split view;
- focused row inspector;
- status edge markers on requirements;
- module initials and typographic indexing instead of excessive icons;
- evidence markers attached to claims;
- compliance gates presented as release conditions;
- local-draft status visible as a product affordance.

### Avoid

- a landing-page-style reading experience;
- generic four-card dashboards;
- nested card grids;
- Notion or Airtable imitation;
- decorative charts;
- fake metrics;
- excessive pills;
- rainbow colour systems;
- gradients or glassmorphism as default surfaces;
- long research prose in primary views.

## 21. Responsive behaviour

- Desktop: sidebar, full workspace, inspector drawer.
- Laptop: collapsible sidebar, controlled table columns, overlay inspector.
- Tablet: workspace list with view switcher; full-height inspector sheet.
- Mobile: module navigation sheet, requirement cards, full-screen inspector, sticky edit actions.

No horizontal page overflow is allowed. Only the contained desktop table viewport may scroll horizontally.

## 22. Acceptance criteria for the design direction

The implemented product should pass these questions:

1. Can the founder identify every Must Have item without reading a report?
2. Can the founder see what exists now, what the team says is changing, and what research recommends?
3. Can status and ETA be edited and recovered after refresh?
4. Can the founder distinguish requirement category, decision status, delivery status, and evidence?
5. Can every material feature expose its partner/API and legal gates?
6. Can the founder inspect supporting evidence without exposing private screenshots?
7. Do GTM, social, and retention behave like operating workspaces rather than strategy articles?
8. Does presentation mode derive from the same records?
9. Does the interface remain clearly HireNudge-specific rather than a generic database template?
10. Does the application make uncertainty and required confirmations visible?

## 23. Items requiring review before implementation

- Approve the working name `HireNudge Product Command Center` or provide a replacement.
- Confirm whether founder priority should be editable in V1 alongside status and ETA.
- Confirm whether `Create view` means saved filter configurations only; creation of new canonical requirements is proposed for a later shared/backend version.
- Confirm whether private screenshot references should be filename-free in the deployed tool and mapped only in research documentation.

