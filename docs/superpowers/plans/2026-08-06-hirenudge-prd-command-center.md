# HireNudge PRD Command Center Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the reading-oriented HireNudge founder strategy dashboard with a detailed, locally editable PRD operating tool built from the reviewed landing-page, onboarding, after-onboarding, competitive-feature, GTM, social, retention, compliance, and partner research.

**Architecture:** Keep the existing Next.js `/strategy` application shell and replace its primary content model with validated `PrdRecord` data plus a versioned browser-local overlay. All workspaces consume the same normalized records; table, board, comparison, journey, roadmap, decision, and presentation views are projections rather than separate content stores. Canonical evidence is read-only, while status, ETA, owner, founder priority, decision, order, removal, and notes are editable in `localStorage`.

**Tech Stack:** Next.js 15, React 19, TypeScript strict mode, Zod, Vitest, Testing Library, Lucide, CSS Modules, `@dnd-kit/core` 6.3.1, `@dnd-kit/sortable` 10.0.0, `@dnd-kit/utilities` 3.2.2.

## Global Constraints

- Planning date is `2026-08-06` in `Asia/Kolkata`; dates before it are overdue only when delivery status is not `Done`.
- V1 stores edits only in browser `localStorage`; no authentication, backend, production API, or production customer data.
- Supplied screenshots remain private evidence and are not embedded, copied, or named in deployed data.
- Observed UI does not prove backend behavior, data quality, customer value, live status, accessibility, or compliance.
- Team discussion and workbook status never imply founder approval or engineering completion.
- Requirement category, founder priority, decision status, delivery status, evidence status, and compliance state remain separate fields.
- No unsupported customer, revenue, conversion, retention, outcome, employer, testimonial, job-quality, or match-accuracy number may appear.
- No requirement may describe a match score as hiring probability.
- The public privacy policy is evidence of published disclosure, not proof of GDPR, DPDP, or global compliance.
- Every external send or application recommendation remains human-reviewed; fully autonomous high-volume behavior is represented as not recommended.
- Preserve unrelated working-tree changes in `README.md`, `docs/audits/`, and `docs/planning/08_FOUNDER_DASHBOARD_EXPLANATION.md`.

---

## File map

### Data and domain

- Create `apps/competitor-intelligence/src/features/prd/types.ts`: PRD enums and interfaces.
- Create `apps/competitor-intelligence/src/features/prd/schema.ts`: Zod validation and normalization.
- Create `apps/competitor-intelligence/data/prd-records.json`: normalized requirement records derived from supplied workbooks/research.
- Create `apps/competitor-intelligence/data/prd-partners.json`: partner/API/tool records with official references and verification states.
- Create `apps/competitor-intelligence/data/prd-compliance.json`: feature-level obligation/release-gate records.
- Create `apps/competitor-intelligence/src/features/prd/data.ts`: parsed exports, indexes, counts, and filters.

### Local editing

- Create `apps/competitor-intelligence/src/features/prd/local-draft.ts`: versioned overlay reducer, serialization, import validation, reorder, remove, restore, and overdue logic.
- Create `apps/competitor-intelligence/src/features/prd/prd-provider.tsx`: React context, `localStorage`, storage-event sync, autosave, import/export/reset actions.

### Shared UI

- Create `apps/competitor-intelligence/src/features/prd/prd-badges.tsx`: semantic text-backed labels.
- Create `apps/competitor-intelligence/src/features/prd/prd-filters.tsx`: search, workspace, module, category, status, decision, evidence, owner, and legal-gate filters.
- Create `apps/competitor-intelligence/src/features/prd/record-inspector.tsx`: six-tab editable inspector.
- Create `apps/competitor-intelligence/src/features/prd/requirements-table.tsx`: dense responsive list/table.
- Create `apps/competitor-intelligence/src/features/prd/requirements-board.tsx`: accessible sortable priority/delivery board.
- Create `apps/competitor-intelligence/src/features/prd/current-changing-view.tsx`: observed/team/recommended comparison.
- Create `apps/competitor-intelligence/src/features/prd/workspace-shell.tsx`: command bar, view switcher, selected record, and removed-items controls.
- Create `apps/competitor-intelligence/src/features/prd/prd.module.css`: command-center visual system and responsive behavior.

### Workspaces and routing

- Create `apps/competitor-intelligence/src/features/prd/workspaces/command-center.tsx`.
- Create `apps/competitor-intelligence/src/features/prd/workspaces/product-prds.tsx`.
- Create `apps/competitor-intelligence/src/features/prd/workspaces/screens-ux.tsx`.
- Create `apps/competitor-intelligence/src/features/prd/workspaces/partners-apis.tsx`.
- Create `apps/competitor-intelligence/src/features/prd/workspaces/legal-trust.tsx`.
- Create `apps/competitor-intelligence/src/features/prd/workspaces/gtm-first-100.tsx`.
- Create `apps/competitor-intelligence/src/features/prd/workspaces/social-studio.tsx`.
- Create `apps/competitor-intelligence/src/features/prd/workspaces/activation-retention.tsx`.
- Create `apps/competitor-intelligence/src/features/prd/workspaces/roadmap.tsx`.
- Create `apps/competitor-intelligence/src/features/prd/workspaces/decision-queue.tsx`.
- Create `apps/competitor-intelligence/src/features/prd/workspaces/evidence-library.tsx`.
- Modify `apps/competitor-intelligence/src/features/strategy/strategy-shell.tsx`: use PRD navigation and wrap pages with `PrdProvider`.
- Modify `apps/competitor-intelligence/src/features/strategy/content.ts`: replace route metadata with PRD workspace navigation.
- Modify pages under `apps/competitor-intelligence/src/app/strategy/`: render the new workspaces; retain compatibility redirects for removed route names.
- Modify `apps/competitor-intelligence/src/features/strategy/strategy-presentation.tsx`: derive presentation chapters from PRD data and local edits.

### Tests and documentation

- Create `apps/competitor-intelligence/tests/prd-data.test.ts`.
- Create `apps/competitor-intelligence/tests/prd-local-draft.test.ts`.
- Create `apps/competitor-intelligence/tests/prd-workspace.test.tsx`.
- Create `apps/competitor-intelligence/tests/prd-inspector.test.tsx`.
- Create `apps/competitor-intelligence/tests/prd-board.test.tsx`.
- Create `apps/competitor-intelligence/tests/prd-sections.test.tsx`.
- Modify `apps/competitor-intelligence/tests/strategy-shell.test.tsx` and `strategy-presentation.test.tsx`.
- Modify `README.md` only after reconciling the user’s concurrent changes; add PRD-tool controls and local-storage notes without deleting their content.

---

### Task 1: Normalize and validate the PRD evidence model

**Files:**
- Create: `apps/competitor-intelligence/src/features/prd/types.ts`
- Create: `apps/competitor-intelligence/src/features/prd/schema.ts`
- Create: `apps/competitor-intelligence/src/features/prd/data.ts`
- Create: `apps/competitor-intelligence/data/prd-records.json`
- Create: `apps/competitor-intelligence/data/prd-partners.json`
- Create: `apps/competitor-intelligence/data/prd-compliance.json`
- Test: `apps/competitor-intelligence/tests/prd-data.test.ts`

**Interfaces:**
- Produces: `PrdRecord`, `PartnerRecord`, `ComplianceRecord`, `prdRecords`, `partnerRecords`, `complianceRecords`, `filterPrdRecords(filters)`, and `prdCounts`.
- Consumes: supplied workbook rows, pasted PRDs, canonical initiatives, source register, and privacy-policy audit.

- [ ] **Step 1: Write failing schema and content tests**

```ts
import { describe, expect, it } from "vitest";
import { complianceRecords, partnerRecords, prdRecords } from "../src/features/prd/data";

describe("PRD source data", () => {
  it("contains detailed landing, onboarding, product-module, GTM, social and retention work", () => {
    expect(new Set(prdRecords.map((item) => item.workspace))).toEqual(expect.arrayContaining([
      "Landing Page", "Onboarding", "Product Modules", "GTM & First 100", "Social", "Activation & Retention",
    ]));
    expect(prdRecords.filter((item) => item.workspace === "Landing Page").length).toBeGreaterThanOrEqual(25);
    expect(prdRecords.filter((item) => item.workspace === "Onboarding").length).toBeGreaterThanOrEqual(25);
    expect(prdRecords.filter((item) => item.workspace === "Product Modules").length).toBeGreaterThanOrEqual(45);
  });

  it("keeps planning states distinct and defaults decisions to discussion", () => {
    expect(prdRecords.every((item) => item.decisionStatus === "To Be Discussed")).toBe(true);
    expect(prdRecords.every((item) => item.category && item.deliveryStatus && item.evidenceStatus)).toBe(true);
  });

  it("includes feature-level partner and compliance references", () => {
    expect(partnerRecords.some((item) => item.name === "Gmail API")).toBe(true);
    expect(partnerRecords.some((item) => item.name === "Greenhouse Job Board API")).toBe(true);
    expect(complianceRecords.some((item) => item.regime === "India DPDP")).toBe(true);
    expect(complianceRecords.some((item) => item.regime === "EU GDPR")).toBe(true);
  });

  it("does not expose private screenshot paths or claim hiring probability", () => {
    const payload = JSON.stringify({ prdRecords, partnerRecords, complianceRecords });
    expect(payload).not.toContain("/Users/priyansh/Desktop");
    expect(payload.toLowerCase()).not.toContain("probability of being hired");
  });
});
```

- [ ] **Step 2: Run the data test and confirm it fails because the PRD model is absent**

Run: `pnpm test -- tests/prd-data.test.ts`
Expected: failure resolving `src/features/prd/data`.

- [ ] **Step 3: Define strict enums and record interfaces**

Use exact enums:

```ts
export const requirementCategories = ["Current", "Must Have", "Important", "Good to Have", "To Be Decided", "Not Recommended"] as const;
export const deliveryStatuses = ["Not Started", "Researching", "In Design", "In Development", "Blocked", "In QA", "Done"] as const;
export const decisionStatuses = ["To Be Discussed", "Approved", "Deferred", "Rejected"] as const;
export const usabilityRatings = ["Good", "Mixed", "Needs Improvement", "Poor", "Unknown"] as const;
export const complianceStates = ["Applies", "Possibly Applies", "Legal Review Required", "Not Applicable", "Blocked"] as const;
```

`PrdRecord` must include `id`, `sourceIds`, `workspace`, `productArea`, `module`, `screen`, `title`, `requirementType`, `currentBehaviour`, `currentEvidenceLimitation`, `userProblem`, `proposedChange`, `acceptanceCriteria`, `category`, `aiSuggestedPriority`, `founderPriority`, `decisionStatus`, `deliveryStatus`, `planningEta`, `owner`, `usabilityRating`, `usabilityRationale`, `expectedUserImpact`, `expectedBusinessImpact`, `effort`, `technicalDependencies`, `dataDependencies`, `partnerIds`, `complianceIds`, `risks`, `successMetrics`, `evidenceStatus`, `evidenceSources`, `confidence`, `founderQuestion`, `notes`, `roadmapHorizon`, and `canonicalGroup`.

- [ ] **Step 4: Populate normalized safe records**

Create records for every landing-page requirement (`LP-01` through `LP-25`), onboarding requirement/principle (`ON-M1` through `ON-I8`), after-onboarding improvement (`AO-M01` onward), competitive feature inventory (`HN-F001` onward), and the reviewed GTM/social/retention/partner/compliance work that is not already represented. Preserve original IDs in `sourceIds`; use `canonicalGroup` to connect related items rather than silently discarding context-specific acceptance criteria.

Default `founderPriority` to `null`, `decisionStatus` to `To Be Discussed`, and `planningEta` to `null`. Preserve source delivery labels only when the source explicitly supplies them; otherwise use `Not Started` or `Researching` according to evidence, never `Done`.

- [ ] **Step 5: Add partner and compliance records with direct references**

Include at minimum Gmail API, Greenhouse Job Board API, Ashby public job postings API, Apify, Fantastic Jobs, Apollo, Hunter, transcript/realtime model options, v0 by Vercel, Relume, 21st.dev, Remotion, HyperFrames, Higgsfield, and unverified-name placeholders for `Vo` and `Grainrad`. Each record states proposed use, official URL, verification state, commercial/terms dependency, data handled, security review, legal review, and recommendation.

Add feature-level release gates for India DPDP, EU GDPR, EU ePrivacy, UK GDPR/PECR, US CAN-SPAM, Canada CASL, Google OAuth/platform rules, Chrome extension permissions, AI transparency, accessibility, data retention/deletion, and international transfers. Avoid global compliance conclusions.

- [ ] **Step 6: Run the data test and full existing data tests**

Run: `pnpm test -- tests/prd-data.test.ts tests/strategy-data.test.ts`
Expected: both files pass; canonical legacy initiative tests remain unchanged.

- [ ] **Step 7: Commit Task 1**

```bash
git add apps/competitor-intelligence/data/prd-*.json apps/competitor-intelligence/src/features/prd/{types,schema,data}.ts apps/competitor-intelligence/tests/prd-data.test.ts
git commit -m "feat: add validated HireNudge PRD data model"
```

---

### Task 2: Implement the versioned browser-local draft overlay

**Files:**
- Create: `apps/competitor-intelligence/src/features/prd/local-draft.ts`
- Create: `apps/competitor-intelligence/src/features/prd/prd-provider.tsx`
- Test: `apps/competitor-intelligence/tests/prd-local-draft.test.ts`

**Interfaces:**
- Produces: `PrdDraft`, `PrdRecordOverride`, `applyDraft(records, draft)`, `updateRecord`, `moveRecord`, `removeRecord`, `restoreRecord`, `serializeDraft`, `parseDraft`, `isOverdue`, and `usePrd()`.
- Consumes: `PrdRecord[]` from Task 1.

- [ ] **Step 1: Write failing reducer and persistence tests**

```ts
it("keeps canonical evidence immutable while applying founder edits", () => {
  const original = makeRecord({ id: "LP-03", deliveryStatus: "Not Started" });
  const draft = updateRecord(emptyDraft(), "LP-03", { deliveryStatus: "In Design", planningEta: "2026-08-20" });
  expect(applyDraft([original], draft)[0].deliveryStatus).toBe("In Design");
  expect(original.deliveryStatus).toBe("Not Started");
});

it("soft-removes, restores and reorders records", () => {
  let draft = removeRecord(emptyDraft(), "LP-03");
  expect(applyDraft([makeRecord({ id: "LP-03" })], draft)).toHaveLength(0);
  draft = restoreRecord(draft, "LP-03");
  draft = moveRecord(draft, "LP-03", { category: "Important", index: 0 });
  expect(draft.overrides["LP-03"].category).toBe("Important");
});

it("rejects malformed or future-version imports", () => {
  expect(() => parseDraft('{"version":999}')).toThrow(/version/i);
});
```

- [ ] **Step 2: Run the local-draft test and confirm it fails**

Run: `pnpm test -- tests/prd-local-draft.test.ts`
Expected: failure resolving `local-draft`.

- [ ] **Step 3: Implement pure draft functions**

Use storage key `hirenudge.prd-command-center.v1`. Only allow editable fields: `deliveryStatus`, `planningEta`, `owner`, `founderPriority`, `decisionStatus`, `category`, `founderNotes`, `order`, and `removed`. Parse imports with Zod; never merge unknown fields into canonical records.

- [ ] **Step 4: Implement the React provider**

Load once after mount, autosave after valid mutations, expose `lastSavedAt`, listen to `storage`, generate a downloadable JSON blob, import validated JSON, reset one record, reset all records, and expose removed records separately. Avoid hydration mismatch by rendering canonical defaults until local state is ready.

- [ ] **Step 5: Run local-draft and type tests**

Run: `pnpm test -- tests/prd-local-draft.test.ts && pnpm typecheck`
Expected: reducer tests and TypeScript pass.

- [ ] **Step 6: Commit Task 2**

```bash
git add apps/competitor-intelligence/src/features/prd/local-draft.ts apps/competitor-intelligence/src/features/prd/prd-provider.tsx apps/competitor-intelligence/tests/prd-local-draft.test.ts
git commit -m "feat: add local editable PRD draft state"
```

---

### Task 3: Build the PRD shell, command bar, semantic labels, and filters

**Files:**
- Create: `apps/competitor-intelligence/src/features/prd/prd-badges.tsx`
- Create: `apps/competitor-intelligence/src/features/prd/prd-filters.tsx`
- Create: `apps/competitor-intelligence/src/features/prd/workspace-shell.tsx`
- Create: `apps/competitor-intelligence/src/features/prd/prd.module.css`
- Modify: `apps/competitor-intelligence/src/features/strategy/strategy-shell.tsx`
- Modify: `apps/competitor-intelligence/src/features/strategy/content.ts`
- Test: `apps/competitor-intelligence/tests/prd-workspace.test.tsx`
- Modify: `apps/competitor-intelligence/tests/strategy-shell.test.tsx`

**Interfaces:**
- Produces: `PrdWorkspaceShell`, `PrdBadge`, `PrdFilters`, `PrdViewMode`.
- Consumes: `usePrd()` and `filterPrdRecords()`.

- [ ] **Step 1: Write failing shell and filter tests**

```tsx
it("identifies the workspace as a local founder PRD tool", () => {
  render(<PrdWorkspaceShell title="Product PRDs"><div>content</div></PrdWorkspaceShell>);
  expect(screen.getByText("Local draft")).toBeVisible();
  expect(screen.getByRole("searchbox", { name: /search requirements/i })).toBeVisible();
  expect(screen.getByRole("button", { name: /export local changes/i })).toBeEnabled();
});

it("shows separate category, decision and delivery labels", () => {
  render(<RecordStatusLine record={makeRecord()} />);
  expect(screen.getByText("Must Have")).toBeVisible();
  expect(screen.getByText("To Be Discussed")).toBeVisible();
  expect(screen.getByText("Not Started")).toBeVisible();
});
```

- [ ] **Step 2: Run the workspace test and confirm it fails**

Run: `pnpm test -- tests/prd-workspace.test.tsx`
Expected: unresolved PRD workspace components.

- [ ] **Step 3: Add PRD navigation and provider**

Use the exact destinations: Command Center, Product PRDs, Screens & UX, Partners & APIs, Legal & Trust, GTM & First 100, Social Studio, Activation & Retention, Roadmap, Decision Queue, and Evidence Library. Brand the shell `HireNudge Product Command Center` with descriptor `Founder PRD & Execution Workspace`.

- [ ] **Step 4: Build filters and view controls**

Implement global search plus workspace, module, category, delivery status, decision status, evidence, owner, roadmap, and legal-gate filters. Implement view switcher values `table`, `priority-board`, `delivery-board`, `current-changing`, `journey`, and `timeline`. Clear-filters and selected states must work.

- [ ] **Step 5: Implement the visual foundation**

Use a narrow left rail, restrained teal accent, white/warm-neutral canvas, charcoal text, semantic edge markers, thin structural rules, visible focus, reduced-motion support, and a large work surface. Avoid a top-level KPI-card grid and long prose blocks.

- [ ] **Step 6: Run shell/workspace tests**

Run: `pnpm test -- tests/prd-workspace.test.tsx tests/strategy-shell.test.tsx`
Expected: navigation, local-draft label, filters, and text-backed statuses pass.

- [ ] **Step 7: Commit Task 3**

```bash
git add apps/competitor-intelligence/src/features/prd apps/competitor-intelligence/src/features/strategy/strategy-shell.tsx apps/competitor-intelligence/src/features/strategy/content.ts apps/competitor-intelligence/tests/{prd-workspace,strategy-shell}.test.tsx
git commit -m "feat: add PRD command center shell"
```

---

### Task 4: Build the requirements table, inspector, removal, and editing flow

**Files:**
- Create: `apps/competitor-intelligence/src/features/prd/requirements-table.tsx`
- Create: `apps/competitor-intelligence/src/features/prd/record-inspector.tsx`
- Test: `apps/competitor-intelligence/tests/prd-inspector.test.tsx`

**Interfaces:**
- Produces: `RequirementsTable` and `RecordInspector`.
- Consumes: filtered effective records and mutation methods from `usePrd()`.

- [ ] **Step 1: Write failing interaction tests**

```tsx
it("edits delivery status and ETA without changing evidence", async () => {
  render(<TestPrd record={makeRecord({ id: "ON-M4" })} />);
  await user.click(screen.getByRole("button", { name: /open ON-M4/i }));
  await user.selectOptions(screen.getByLabelText("Delivery status"), "In Development");
  await user.clear(screen.getByLabelText("Planning ETA"));
  await user.type(screen.getByLabelText("Planning ETA"), "2026-08-28");
  expect(screen.getByText("In Development")).toBeVisible();
  expect(screen.getByText(/planning ETA/i)).toBeVisible();
  expect(screen.getByText(/observed UI does not prove/i)).toBeVisible();
});

it("soft-removes a requirement and restores it", async () => {
  render(<TestPrd record={makeRecord({ id: "LP-03" })} />);
  await user.click(screen.getByRole("button", { name: /remove LP-03/i }));
  expect(screen.queryByText("LP-03")).not.toBeInTheDocument();
  await user.click(screen.getByRole("button", { name: /removed items/i }));
  await user.click(screen.getByRole("button", { name: /restore LP-03/i }));
  expect(screen.getByText("LP-03")).toBeVisible();
});
```

- [ ] **Step 2: Run the inspector test and confirm it fails**

Run: `pnpm test -- tests/prd-inspector.test.tsx`
Expected: unresolved table/inspector components.

- [ ] **Step 3: Implement the responsive requirements table**

Desktop columns: requirement, module/screen, category, current state, delivery, ETA, owner, decision, usability, legal gate, and evidence. Freeze the requirement column within the contained table viewport. Mobile renders semantic cards without horizontal page overflow.

- [ ] **Step 4: Implement the six-tab inspector**

Tabs: PRD, Delivery, UX, Partners, Compliance, Evidence. Editable controls appear only in Delivery. Evidence limitations and source access dates remain visible. Use a labelled dialog/drawer with focus management, Escape close, and focus restoration.

- [ ] **Step 5: Implement remove, restore, reset, import, and export UI**

Removal is always soft. Show an undo toast and a removed-items sheet. Reset actions require explicit confirmation. Imported JSON is validated and reports errors without clearing the current draft.

- [ ] **Step 6: Run inspector tests and accessibility assertions**

Run: `pnpm test -- tests/prd-inspector.test.tsx`
Expected: edit, persistence callbacks, soft removal, restoration, labelling, and dialog behavior pass.

- [ ] **Step 7: Commit Task 4**

```bash
git add apps/competitor-intelligence/src/features/prd/{requirements-table,record-inspector}.tsx apps/competitor-intelligence/tests/prd-inspector.test.tsx
git commit -m "feat: add editable PRD table and inspector"
```

---

### Task 5: Add accessible drag-and-drop priority and delivery boards

**Files:**
- Modify: `apps/competitor-intelligence/package.json`
- Modify: `pnpm-lock.yaml`
- Create: `apps/competitor-intelligence/src/features/prd/requirements-board.tsx`
- Test: `apps/competitor-intelligence/tests/prd-board.test.tsx`

**Interfaces:**
- Produces: `RequirementsBoard({ mode: "category" | "delivery" })`.
- Consumes: `moveRecord`, effective records, and `@dnd-kit` keyboard/pointer sensors.

- [ ] **Step 1: Install exact drag-and-drop dependencies**

Run: `pnpm add @dnd-kit/core@6.3.1 @dnd-kit/sortable@10.0.0 @dnd-kit/utilities@3.2.2`
Expected: package and lockfile contain exact compatible versions.

- [ ] **Step 2: Write failing board behavior tests**

```tsx
it("moves a task between delivery lanes through an accessible command", async () => {
  render(<BoardHarness record={makeRecord({ id: "AO-M04", deliveryStatus: "Not Started" })} />);
  await user.click(screen.getByRole("button", { name: /move AO-M04/i }));
  await user.selectOptions(screen.getByLabelText("Move to delivery status"), "In Design");
  await user.click(screen.getByRole("button", { name: "Move task" }));
  expect(screen.getByRole("region", { name: "In Design" })).toHaveTextContent("AO-M04");
});
```

- [ ] **Step 3: Run the board test and confirm it fails**

Run: `pnpm test -- tests/prd-board.test.tsx`
Expected: unresolved board component.

- [ ] **Step 4: Implement drag, keyboard movement, and touch-safe fallback**

Pointer drag changes lane and order. Keyboard uses `KeyboardSensor` with sortable coordinates. Every item also exposes `Move task`, allowing lane and position changes without drag. Announce moves through an `aria-live` region. Dragging category changes `category`; dragging delivery changes `deliveryStatus`.

- [ ] **Step 5: Run board and draft tests**

Run: `pnpm test -- tests/prd-board.test.tsx tests/prd-local-draft.test.ts`
Expected: both pointer-independent move behavior and reducer ordering pass.

- [ ] **Step 6: Commit Task 5**

```bash
git add apps/competitor-intelligence/package.json pnpm-lock.yaml apps/competitor-intelligence/src/features/prd/requirements-board.tsx apps/competitor-intelligence/tests/prd-board.test.tsx
git commit -m "feat: add sortable PRD boards"
```

---

### Task 6: Build Command Center, Product PRDs, current-changing, journey, and screen views

**Files:**
- Create: `apps/competitor-intelligence/src/features/prd/current-changing-view.tsx`
- Create: `apps/competitor-intelligence/src/features/prd/workspaces/command-center.tsx`
- Create: `apps/competitor-intelligence/src/features/prd/workspaces/product-prds.tsx`
- Create: `apps/competitor-intelligence/src/features/prd/workspaces/screens-ux.tsx`
- Modify: `apps/competitor-intelligence/src/app/strategy/page.tsx`
- Modify: `apps/competitor-intelligence/src/app/strategy/product/page.tsx`
- Modify: `apps/competitor-intelligence/src/app/strategy/ux/page.tsx`
- Test: `apps/competitor-intelligence/tests/prd-sections.test.tsx`

**Interfaces:**
- Produces: the three primary workspaces and current-to-changing projection.
- Consumes: shared workspace shell, views, data, and local edits.

- [ ] **Step 1: Write failing section tests**

```tsx
it("compares current evidence, team change and recommendation", () => {
  render(<ProductPrds initialWorkspace="Onboarding" />);
  expect(screen.getByText("Current observed product")).toBeVisible();
  expect(screen.getByText("Team-described change")).toBeVisible();
  expect(screen.getByText("Recommended requirement")).toBeVisible();
});

it("shows all required product modules", () => {
  render(<ProductPrds />);
  for (const module of ["Nudge Studio", "AI Job Matcher", "Email Outreach", "Job Tracker", "Interview Preparation"]) {
    expect(screen.getByRole("button", { name: new RegExp(module, "i") })).toBeVisible();
  }
});
```

- [ ] **Step 2: Run section tests and confirm they fail**

Run: `pnpm test -- tests/prd-sections.test.tsx`
Expected: unresolved workspace components.

- [ ] **Step 3: Implement the Command Center**

Render compact focus rails for Must Have/not started, blocked, decision due, overdue ETA, legal/security gates, team-described in-progress work, and unassigned items. Add a journey rail from Landing → Onboarding → First role → Application packet → Outreach/Apply → Tracker → Interview → Offer/Search ended. All counts are derived from records.

- [ ] **Step 4: Implement Product PRDs and screen inventory**

Product PRDs default to the requirements table and expose all six views. Screens & UX uses a journey canvas plus structured screen inventory. Current observations always include their evidence limitation. Add module filters for Landing, Onboarding, Dashboard, Nudge Studio, Resume Optimizer, Cover Letter, Portfolio, AI Job Matcher, Outreach, Job Tracker, Interview Prep, Extension, Settings, Pricing, and Lifecycle.

- [ ] **Step 5: Run section tests**

Run: `pnpm test -- tests/prd-sections.test.tsx`
Expected: current-changing headings, module coverage, focus rails, and route renderings pass.

- [ ] **Step 6: Commit Task 6**

```bash
git add apps/competitor-intelligence/src/features/prd apps/competitor-intelligence/src/app/strategy/{page.tsx,product/page.tsx,ux/page.tsx} apps/competitor-intelligence/tests/prd-sections.test.tsx
git commit -m "feat: add product PRD and UX workspaces"
```

---

### Task 7: Build partners, compliance, GTM, social, activation, roadmap, decisions, and evidence workspaces

**Files:**
- Create: `apps/competitor-intelligence/src/features/prd/workspaces/partners-apis.tsx`
- Create: `apps/competitor-intelligence/src/features/prd/workspaces/legal-trust.tsx`
- Create: `apps/competitor-intelligence/src/features/prd/workspaces/gtm-first-100.tsx`
- Create: `apps/competitor-intelligence/src/features/prd/workspaces/social-studio.tsx`
- Create: `apps/competitor-intelligence/src/features/prd/workspaces/activation-retention.tsx`
- Create: `apps/competitor-intelligence/src/features/prd/workspaces/roadmap.tsx`
- Create: `apps/competitor-intelligence/src/features/prd/workspaces/decision-queue.tsx`
- Create: `apps/competitor-intelligence/src/features/prd/workspaces/evidence-library.tsx`
- Create/modify: corresponding `src/app/strategy/*/page.tsx` routes.
- Test: extend `apps/competitor-intelligence/tests/prd-sections.test.tsx`.

**Interfaces:**
- Produces: all secondary operating workspaces.
- Consumes: normalized records, local overlay, filters, inspector, and partner/compliance indexes.

- [ ] **Step 1: Add failing workspace content tests**

```tsx
it("shows obligations as release gates rather than compliance claims", () => {
  render(<LegalTrust />);
  expect(screen.getByText(/published disclosure, not proof/i)).toBeVisible();
  expect(screen.getByText("India DPDP")).toBeVisible();
  expect(screen.getByText("EU GDPR")).toBeVisible();
});

it("distinguishes first-100 funnel states", () => {
  render(<GtmFirst100 />);
  for (const state of ["Lead", "Signup", "Activated user", "Beta participant", "Paid customer", "Retained paid customer"]) {
    expect(screen.getByText(state)).toBeVisible();
  }
});
```

- [ ] **Step 2: Run section tests and confirm the new assertions fail**

Run: `pnpm test -- tests/prd-sections.test.tsx`
Expected: unresolved secondary workspaces.

- [ ] **Step 3: Implement partner and legal registers**

Partners use structured records and official links. Legal uses `Requirement → Data → Purpose → Jurisdiction → Obligation → Control → Evidence → Confirmation owner`. Include the privacy-policy effective date and extension/manual-submit statement, while flagging Gmail scopes, token handling, retention, subprocessors, lawful basis, transfers, cookies, deletion/export, AI-provider handling, and auto-apply wording for verification.

- [ ] **Step 4: Implement operating workspaces**

GTM uses cohort planner fields and clearly labels allocations as hypotheses. Social uses channel/funnel/calendar/board projections. Activation uses the lifecycle state machine. Roadmap supports Now/Next/Later/Research/Blocked plus ETA. Decision Queue provides local editable decisions with recommendation, options, delay impact, dependency and evidence. Evidence Library exposes safe source links and limitations without private paths.

- [ ] **Step 5: Run all section tests**

Run: `pnpm test -- tests/prd-sections.test.tsx`
Expected: every workspace renders required content and safe evidence language.

- [ ] **Step 6: Commit Task 7**

```bash
git add apps/competitor-intelligence/src/features/prd/workspaces apps/competitor-intelligence/src/app/strategy apps/competitor-intelligence/tests/prd-sections.test.tsx
git commit -m "feat: add PRD operating workspaces"
```

---

### Task 8: Regenerate presentation mode from PRD data

**Files:**
- Modify: `apps/competitor-intelligence/src/features/strategy/strategy-presentation.tsx`
- Modify: `apps/competitor-intelligence/src/features/strategy/presentation.ts`
- Modify: `apps/competitor-intelligence/tests/strategy-presentation.test.tsx`

**Interfaces:**
- Produces: a 12-chapter presentation derived from effective PRD records.
- Consumes: `usePrd()` and PRD indexes.

- [ ] **Step 1: Rewrite the presentation test first**

```tsx
it("presents the PRD narrative and preserves operational labels", () => {
  render(<StrategyPresentation />);
  expect(screen.getByText(/current product map/i)).toBeVisible();
  expect(screen.getByText(/Must Have/i)).toBeVisible();
  fireEvent.keyDown(window, { key: "ArrowRight" });
  expect(screen.getByText(/current versus changing/i)).toBeVisible();
  expect(screen.getByText(/2 of 12/i)).toBeVisible();
});
```

- [ ] **Step 2: Run the presentation test and confirm it fails against the old 15-chapter narrative**

Run: `pnpm test -- tests/strategy-presentation.test.tsx`
Expected: chapter titles/count mismatch.

- [ ] **Step 3: Implement derived presentation chapters**

Use 12 chapters: current product map, current versus changing, Must Have queue, product modules, UI/UX journey, partners/APIs, legal/trust gates, GTM/first 100, social, activation/retention, roadmap, founder decisions. Hide editing controls; support previous/next, ArrowLeft/ArrowRight, Home/End, progress, responsive layout, and text-backed statuses.

- [ ] **Step 4: Run presentation tests**

Run: `pnpm test -- tests/strategy-presentation.test.tsx`
Expected: chapter order, navigation, progress, and labels pass.

- [ ] **Step 5: Commit Task 8**

```bash
git add apps/competitor-intelligence/src/features/strategy/strategy-presentation.tsx apps/competitor-intelligence/src/features/strategy/presentation.ts apps/competitor-intelligence/tests/strategy-presentation.test.tsx
git commit -m "feat: derive presentation from PRD records"
```

---

### Task 9: Full verification, visual QA, content QA, README, and deployment

**Files:**
- Modify: `README.md` without removing concurrent user content.
- Modify: any PRD component/style/data file required by verified defects.

**Interfaces:**
- Produces: verified production dashboard and deployment metadata.
- Consumes: all prior tasks.

- [ ] **Step 1: Run the complete automated verification suite**

Run from `apps/competitor-intelligence`:

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

Expected: all commands exit 0 with no test failures.

- [ ] **Step 2: Start production mode and run browser verification**

Run: `pnpm start --hostname 127.0.0.1 --port 3100`
Verify all 11 workspaces plus presentation mode at 1440×900, 1280×800, 1024×768, 768×1024, 390×844, and 360×800.

- [ ] **Step 3: Exercise all interactions**

Verify navigation, search, every filter, view switching, table inspector, all six inspector tabs, editable status, ETA, owner, priority, decision and notes, local persistence after refresh, drag reorder, accessible move fallback, soft remove/restore, reset record/all, export/import, source links, presentation keyboard navigation, and browser-local draft messaging.

- [ ] **Step 4: Run content QA searches**

Run:

```bash
rg -n "probability of (being )?hired|guaranteed interview|guaranteed job|10,000\+|/Users/priyansh/Desktop|@gmail\.com|passport|Aadhaar" src data
```

Expected: no unsafe claims, personal identifiers, or private screenshot paths. Any intentional discussion of prohibited phrasing must be clearly labelled as a claim to avoid.

- [ ] **Step 5: Fix material visual, interaction, and content defects and repeat Steps 1–4**

No completion claim is allowed until the fresh repeated commands and browser checks pass.

- [ ] **Step 6: Update README**

Document development/build commands, `/strategy`, editable local draft behavior, export/import/reset, data safety, presentation mode, and Vercel deployment. Re-read and preserve all concurrent README additions before patching.

- [ ] **Step 7: Inspect Git safety**

Run `git status --short`, `git diff --check`, and a staged secret/private-data scan. Stage only intended application, data, test, documentation, lockfile, and configuration changes.

- [ ] **Step 8: Commit the verified implementation**

```bash
git add apps/competitor-intelligence README.md
git commit -m "feat: build HireNudge PRD command center"
```

- [ ] **Step 9: Deploy preview, verify, then deploy production**

Use the existing Vercel project configuration. Create a preview deployment, verify all routes/interactions/responsive states, fix deployment-only defects, then deploy production. Report preview URL, production URL, project name, branch, framework, build command, output behavior, environment variables, and limitations.

---

## Self-review

- Spec coverage: all sections of `docs/planning/09_PRD_TOOL_DESIGN_SPEC.md` map to Tasks 1–9.
- Data coverage: the four supplied workbooks and pasted PRDs map to Task 1; existing research fills GTM, social, retention, partners and compliance.
- Interaction coverage: local edits, drag, remove/restore, filters, inspector, import/export/reset and presentation mode have explicit tests.
- Safety coverage: private screenshots, unsupported claims, compliance overstatement, founder approvals, and external automation have explicit constraints and QA searches.
- Type consistency: all workspaces consume `PrdRecord` plus the local overlay; no secondary workspace owns a competing status store.
- No implementation placeholders are left in this plan.
