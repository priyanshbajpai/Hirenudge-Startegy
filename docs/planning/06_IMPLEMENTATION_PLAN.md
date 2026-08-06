# Technical implementation plan

## Recommendation

Extend the existing `apps/competitor-intelligence` application with a read-only `/strategy` area. The repository already uses Next.js 15 App Router, React 19, strict TypeScript, Lucide, Zod, Vitest, React Testing Library and a responsive founder-workspace shell. A separate React/Vite application would duplicate routing, deployment, access control and visual primitives.

Do not add Tailwind for V1. The current application uses authored CSS and has no Tailwind dependency. Use scoped CSS Modules for the strategy area plus shared CSS custom properties. This avoids a styling migration during a dashboard-content build.

V1 uses local structured data only. It adds no database, live API, customer data, editing workflow or new authentication. If deployed inside the existing private application, the existing password middleware continues to protect the route; the strategy feature itself implements no auth.

## Existing constraints

- Application root: `apps/competitor-intelligence`.
- Framework: Next.js 15.5 App Router and React 19.1.
- TypeScript: strict mode and `resolveJsonModule` are already enabled.
- Icons: Lucide is installed.
- Charts: Recharts is installed, but V1 does not need it.
- Validation: Zod is installed.
- Tests: Vitest and Testing Library are installed.
- Deployment: current Vercel standalone build.
- Existing `/` routes serve competitor intelligence and should not be repurposed.
- Existing Google Sheets APIs remain unrelated to V1 strategy data.
- The current worktree is staged user work; implementation must preserve it.

## Proposed routes

| Route | Purpose |
|---|---|
| `/strategy` | Overview |
| `/strategy/product` | Product and Features |
| `/strategy/ux` | UI/UX |
| `/strategy/brand` | Brand Language |
| `/strategy/social` | Social and Advertising |
| `/strategy/gtm` | GTM |
| `/strategy/first-100` | First 100 Customers |
| `/strategy/retention` | Retention |
| `/strategy/roadmap` | Roadmap |
| `/strategy/decisions` | Founder Decisions |
| `/strategy/evidence` | Research and Evidence |
| `/strategy/presentation` | Presentation mode, with `?chapter=01` |

Use one route config and static generation for all sections. Unknown section slugs return 404. All routes render server-first; only filters, drawers and presentation controls require client components.

## Data architecture

### Canonical source

`src/data/initiatives.json` at repository root remains the single canonical initiative dataset required by this planning task.

Create an app adapter during implementation:

```ts
// apps/competitor-intelligence/src/features/strategy/data.ts
import rawInitiatives from "../../../../../src/data/initiatives.json";
```

Validate on import with Zod and export a frozen typed array. Confirm that the Next standalone output traces the root JSON during the first build. If it does not, add a small prebuild copy step with parity verification; do not maintain two hand-edited files.

### Supporting local data

Add build-time TypeScript or JSON files for:

- `strategy-summary.ts`: the founder direction, findings and roadmap copy;
- `founder-decisions.ts`: decision IDs, recommendation, options, delay impact and evidence;
- `journey.ts`: current and proposed stages;
- `content-plan.ts`: channels, pillars and 30-day plan;
- `first-100.ts`: cohort plan and planning allocations;
- `lifecycle.ts`: trigger/value/CTA/exit/metric rows;
- `research-index.ts`: source-register summaries and validation queues;
- `presentation.ts`: chapter order and references to the same content objects.

Do not copy entire research reports into JavaScript. Store concise display content and link to Markdown files where detail belongs.

### Initiative type

```ts
type Priority =
  | "P0 — Must Have"
  | "P1 — Important"
  | "P2 — Good to Have"
  | "P3 — Later";

type DecisionStatus =
  | "To Be Discussed"
  | "Approved"
  | "Deferred"
  | "Rejected";

type RoadmapHorizon = "Now" | "Next" | "Later" | "Research" | "Blocked";

interface Initiative {
  id: string;
  title: string;
  workstream: string;
  sub_workstream: string;
  initiative_type:
    | "Existing"
    | "Improvement"
    | "In Progress"
    | "Proposed"
    | "Research Required"
    | "Experiment"
    | "Compliance Requirement"
    | "Operational Requirement"
    | "Not Recommended";
  current_state: string;
  problem: string;
  recommendation: string;
  target_user: string;
  evidence_status: string;
  evidence_sources: string[];
  confidence: string;
  expected_user_impact: string;
  expected_business_impact: string;
  effort: string;
  technical_dependencies: string[];
  data_dependencies: string[];
  legal_dependencies: string[];
  risks: string[];
  success_metrics: string[];
  ai_suggested_priority: Priority;
  founder_priority: Priority | null;
  decision_status: DecisionStatus;
  owner: string;
  roadmap_horizon: RoadmapHorizon;
  founder_question: string;
  notes: string;
}
```

### Validation invariants

- unique initiative IDs;
- required non-empty strings and arrays where relevant;
- exact enum values;
- `founder_priority` is null or a valid priority;
- all current decision statuses equal `To Be Discussed` until an explicit source changes them;
- `owner` may be `Unassigned`;
- every P0 has a rationale category from usability, trust, launch, security, compliance, activation, retention or revenue;
- every Blocked item has at least one named dependency;
- every evidence source resolves to a known source ID or repository document path;
- presentation references resolve to a valid section or initiative.

## Component architecture

```text
StrategyLayout
├── StrategyNavigation
├── StrategyHeader
│   ├── GlobalSearch
│   ├── FilterTrigger
│   └── PresentationModeLink
├── StrategyPage
│   ├── EditorialLead
│   ├── EvidenceNotice
│   └── Section-specific composition
└── InitiativeDetailDrawer
```

### Reusable primitives

- `SectionIntro`
- `MetadataLabel`
- `StatusLabel`
- `PriorityLabel`
- `DecisionLabel`
- `EvidenceLabel`
- `InlineCaveat`
- `DefinitionList`
- `EditorialTable`
- `EmptyState`
- `SourceLinks`
- `ResponsiveDrawer`
- `FilterSummary`
- `SkipLink`

### Domain components

- `ExecutiveOverview`
- `PriorityRail`
- `InitiativeRegister`
- `RoadmapLanes`
- `UserJourneyMap`
- `ProductWorkstreamMap`
- `UxComparison`
- `BrandLanguageComparison`
- `GtmFunnel`
- `CustomerAllocation`
- `LifecycleMatrix`
- `FounderDecisionQueue`
- `ResearchQueue`
- `RiskDependencyList`
- `PresentationShell`

Keep components compositional. A status label should not know about filtering; the register should not own presentation content.

## State and URL behavior

Use local component state for drawer visibility and presentation controls. Use URL search parameters for shareable filters:

- `q`;
- `workstream`;
- `priority`;
- `decision`;
- `horizon`;
- `evidence`;
- `confidence`.

Use `useDeferredValue` for text search, matching the existing dashboard pattern. Compute filters with `useMemo`. At 38 initiatives no client data library or virtualization is needed. Use `sessionStorage` only to restore the previous route/scroll position when exiting presentation mode; the dashboard remains fully usable without it.

## Design tokens

Define scoped custom properties under `.strategyRoot`:

- foundation color and type tokens from `04_VISUAL_DESIGN_SPEC.md`;
- spacing scale `8–96px`;
- radii `8, 10, 12px`;
- two shadow levels;
- content widths;
- semantic priority, decision and evidence triples for text/background/border.

Retain Geist from the root layout. Keep the existing competitor-intelligence variables intact to avoid regressions.

## Responsive breakpoints

| Breakpoint | Behavior |
|---|---|
| `<768px` | Mobile navigation and filter sheets; stacked comparisons; condensed initiative rows |
| `768–1023px` | Collapsible rail; two-column layouts selectively; scrollable roadmap |
| `1024–1279px` | Full route content with reduced table columns |
| `>=1280px` | Persistent rail, full register columns, right-side detail drawer |

Test presentation mode separately at `1366×768`, `1024×768`, `390×844` and `844×390`.

## Accessibility implementation

- native headings, nav, main, aside and table markup;
- skip link to content;
- keyboard-operable filters, drawer and presentation controls;
- dialog focus trap and focus return;
- `aria-live` chapter announcement;
- status text in addition to color;
- accessible names for icons;
- table captions and header scope;
- logical DOM order matching mobile reading order;
- reduced-motion media query;
- text alternatives for diagrams and the allocation bar.

## Testing

### Data tests

- schema validation and unique IDs;
- enum and required-field coverage;
- computed priority/horizon/workstream counts;
- no non-null founder priorities;
- no decision status other than To Be Discussed in the initial dataset;
- Markdown/JSON ID parity;
- all presentation initiative references resolve.

### Component tests

- filter combinations and clear behavior;
- no-results state;
- initiative drawer open/close and focus restoration;
- priority, decision and evidence labels render text;
- roadmap assigns every initiative exactly once;
- founder-priority null renders `Not set`;
- missing baseline renders `Not supplied`;
- presentation next/previous/Home/End/Escape behavior;
- reduced-motion class or media behavior where testable.

### Route tests

- each strategy route renders its title and content;
- invalid section returns 404;
- direct presentation chapter URL works;
- existing competitor routes remain unchanged.

Use current Vitest and Testing Library. Add Playwright only if the team approves the dependency; otherwise complete browser QA manually with the existing app runner.

## Visual QA

1. Render every route at desktop, tablet and mobile widths.
2. Capture light-theme screenshots for comparison against the spec.
3. Check 200% browser zoom and long text wrapping.
4. Verify priority, decision and evidence colors under common color-vision simulations.
5. Run keyboard-only navigation.
6. Test reduced motion.
7. Verify no unbuilt concept resembles live functionality.
8. Verify no raw customer, applicant, OAuth, recruiter or immigration data appear.

## Performance budget

- No chart library import for V1.
- Strategy JavaScript target under 120KB compressed beyond shared framework code.
- No image required above the fold.
- LCP under 2.5s on a representative mobile connection in production-like build.
- INP under 200ms for filters and drawer.
- Avoid client rendering for narrative and static tables.

## Build and deployment

Run from `apps/competitor-intelligence`:

1. `pnpm test`;
2. `pnpm typecheck`;
3. `pnpm lint`;
4. `pnpm build`;
5. manual route and visual QA against the production build.

Deploy as a preview through the existing Vercel project. Confirm that the root initiative JSON is included in standalone output and that current competitor-intelligence routes, password screen and Google Sheets behavior remain intact. Do not promote until founder content review and accessibility QA pass.

## Delivery phases

### Phase 0: content approval

Approve canonical IDs, P0s, founder-decision copy, visual accent, incident-detail treatment and route integration. No code.

### Phase 1: read-only foundation

Add validated data adapter, layout, navigation, overview, initiative register, roadmap and evidence drawer. No editing or analytics.

### Phase 2: strategic views

Add journey, workstream map, brand comparison, GTM, first 100, retention and research queues.

### Phase 3: presentation mode

Add the 13 chapters, keyboard navigation, progress and deep links.

### Phase 4: hardening

Data parity tests, accessibility, responsive QA, performance, existing-route regression and preview review.

## Out of scope for V1

- founder approval or editing workflow;
- Google Sheets write-back;
- backend database;
- customer analytics ingestion;
- authentication changes;
- live provider APIs;
- production customer data;
- generated AI summaries;
- PDF export;
- collaborative comments;
- dashboard application redesign outside `/strategy`.
