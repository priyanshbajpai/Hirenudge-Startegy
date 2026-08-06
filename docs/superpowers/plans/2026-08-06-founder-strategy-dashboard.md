# Founder Strategy Dashboard Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build, verify and deploy a complete read-only HireNudge founder strategy dashboard from the approved research, planning documents and canonical initiative register.

**Architecture:** Extend the existing Next.js 15 application with an isolated `/strategy` route family. Parse the root initiative JSON through a strict typed adapter, keep founder-facing copy in focused local data modules, render server-first section pages, and use client components only for filters, drawers, mobile navigation and presentation controls.

**Tech Stack:** Next.js 15, React 19, strict TypeScript, CSS Modules, Lucide, Zod, Vitest, React Testing Library, Vercel.

## Global constraints

- Preserve the current competitor-intelligence routes and Google Sheets integration.
- Add no database, production API, live AI generation, external analytics or production user data.
- Add no new authentication system; retain existing route protection when configured.
- Never show a proposed capability as live, a discussion as approved, or an unsupported number as performance data.
- Keep AI priority, founder priority, evidence status and decision status separate.
- Every interactive control must work by pointer and keyboard.
- Use the approved content in `docs/planning/07_DASHBOARD_CONTENT_SPEC.md` and the visual tokens in `docs/planning/04_VISUAL_DESIGN_SPEC.md`.
- Do not import Recharts for V1.
- Do not commit QA screenshots, `.vercel`, `.next`, environment files or secrets.

---

### Task 1: Validate and adapt canonical strategy data

**Files:**
- Create: `apps/competitor-intelligence/tests/strategy-data.test.ts`
- Create: `apps/competitor-intelligence/src/features/strategy/types.ts`
- Create: `apps/competitor-intelligence/src/features/strategy/data.ts`
- Read: `src/data/initiatives.json`

**Interfaces:**
- Produces: `Initiative`, `Priority`, `DecisionStatus`, `EvidenceStatus`, `RoadmapHorizon`, `initiatives`, `strategyCounts`, `filterInitiatives()`.

- [ ] Write failing tests for 38 unique initiatives, exact priority counts, null founder priorities, unassigned owners, valid horizons, working multi-filter search and selected module aliases.
- [ ] Run `pnpm test -- strategy-data.test.ts` and confirm failure because the adapter does not exist.
- [ ] Implement Zod validation, immutable typed exports, computed counts, module alias mapping and filter function.
- [ ] Run the focused test and the full test suite.

### Task 2: Create typed founder content modules

**Files:**
- Create: `apps/competitor-intelligence/tests/strategy-content.test.ts`
- Create: `apps/competitor-intelligence/src/features/strategy/content.ts`
- Create: `apps/competitor-intelligence/src/features/strategy/decisions.ts`
- Create: `apps/competitor-intelligence/src/features/strategy/presentation.ts`

**Interfaces:**
- Produces: navigation sections, findings, capability groups, UX comparisons, brand comparisons, social plan, GTM content, first-100 plan, lifecycle rows, decision queue, risks, evidence summary and 15 presentation chapters.

- [ ] Write failing tests asserting 11 navigation sections, 15 decision questions, 15 ordered presentation chapters, a final Founder Decisions chapter and no invented approvals.
- [ ] Run the focused test and verify the expected missing-module failure.
- [ ] Implement the content modules from the approved content specification.
- [ ] Run focused and full tests.

### Task 3: Build the strategy shell and visual system

**Files:**
- Create: `apps/competitor-intelligence/src/features/strategy/strategy.module.css`
- Create: `apps/competitor-intelligence/src/features/strategy/strategy-shell.tsx`
- Create: `apps/competitor-intelligence/src/features/strategy/primitives.tsx`
- Create: `apps/competitor-intelligence/src/app/strategy/layout.tsx`
- Create: `apps/competitor-intelligence/src/app/strategy/page.tsx`

**Interfaces:**
- Produces: `StrategyShell`, responsive navigation, search/filter affordances, semantic badges, section headers, empty state and content containers.

- [ ] Write failing component tests for labeled statuses, responsive-navigation accessible names, skip link and presentation link.
- [ ] Verify the focused tests fail because the components are missing.
- [ ] Implement the shell, central CSS tokens, light editorial layout, focus styles and responsive navigation.
- [ ] Run focused tests, typecheck and lint.

### Task 4: Build the filterable initiative register and detail drawer

**Files:**
- Create: `apps/competitor-intelligence/tests/initiative-register.test.tsx`
- Create: `apps/competitor-intelligence/src/features/strategy/initiative-explorer.tsx`
- Create: `apps/competitor-intelligence/src/features/strategy/initiative-detail.tsx`
- Create: `apps/competitor-intelligence/src/features/strategy/filters.tsx`

**Interfaces:**
- Consumes: `filterInitiatives()`, canonical initiatives and semantic primitives.
- Produces: searchable/filterable initiative list and accessible detail dialog.

- [ ] Write failing tests for search, workstream, priority, type, evidence, decision and horizon filters, selected states, clear action, no-results state, detail expansion and focus return.
- [ ] Verify failure before implementation.
- [ ] Implement functional filters, URL-independent local state, responsive rows and modal detail with source links.
- [ ] Run focused and full tests.

### Task 5: Build Overview and Product sections

**Files:**
- Create: `apps/competitor-intelligence/src/features/strategy/overview-section.tsx`
- Create: `apps/competitor-intelligence/src/features/strategy/product-section.tsx`
- Create: `apps/competitor-intelligence/src/features/strategy/initiative-list.tsx`
- Create: `apps/competitor-intelligence/src/app/strategy/[section]/page.tsx`

**Interfaces:**
- Produces: Overview and Product routes plus section dispatch for all approved slugs.

- [ ] Write failing route/content tests for strategy summary, computed counts, P0 list, strongest findings, capabilities, proposed items, not-recommended items and module filters.
- [ ] Verify the tests fail on missing routes/components.
- [ ] Implement Overview, Product and route dispatch without fake performance metrics.
- [ ] Run tests, typecheck and lint.

### Task 6: Build UX, Brand, Social, GTM, First 100 and Retention sections

**Files:**
- Create: `apps/competitor-intelligence/src/features/strategy/ux-section.tsx`
- Create: `apps/competitor-intelligence/src/features/strategy/brand-section.tsx`
- Create: `apps/competitor-intelligence/src/features/strategy/social-section.tsx`
- Create: `apps/competitor-intelligence/src/features/strategy/gtm-section.tsx`
- Create: `apps/competitor-intelligence/src/features/strategy/first-100-section.tsx`
- Create: `apps/competitor-intelligence/src/features/strategy/retention-section.tsx`

**Interfaces:**
- Produces: journey map, comparisons, channel plan, GTM funnel, channel allocation, 12-week plan and lifecycle matrix.

- [ ] Write failing tests for current/proposed labels, claims caveats, planning-allocation label, lead/sign-up/activation/paid/retained definitions and lifecycle controls.
- [ ] Verify failure before implementation.
- [ ] Implement each focused section with responsive lists instead of mobile tables.
- [ ] Run focused and full tests.

### Task 7: Build Roadmap, Founder Decisions and Evidence sections

**Files:**
- Create: `apps/competitor-intelligence/tests/roadmap-decisions.test.tsx`
- Create: `apps/competitor-intelligence/src/features/strategy/roadmap-section.tsx`
- Create: `apps/competitor-intelligence/src/features/strategy/decisions-section.tsx`
- Create: `apps/competitor-intelligence/src/features/strategy/evidence-section.tsx`

**Interfaces:**
- Produces: five-lane filtered roadmap, founder decision queue and evidence/unknowns views.

- [ ] Write failing tests that every initiative appears in exactly one roadmap lane, owner filtering works, all decisions have a question and delay impact, and research counts are labeled as inputs.
- [ ] Verify failure before implementation.
- [ ] Implement roadmap filters, decision detail disclosures and evidence links/caveats.
- [ ] Run focused and full tests.

### Task 8: Build 15-chapter presentation mode

**Files:**
- Create: `apps/competitor-intelligence/tests/presentation-mode.test.tsx`
- Create: `apps/competitor-intelligence/src/features/strategy/presentation-mode.tsx`
- Create: `apps/competitor-intelligence/src/app/strategy/presentation/page.tsx`

**Interfaces:**
- Produces: `PresentationMode` with previous, next, Home, End, arrow, Space and Escape behavior plus `chapter` query handling.

- [ ] Write failing tests for 15 chapters, progress, next/previous, keyboard navigation, boundary states and founder decisions last.
- [ ] Verify failure before implementation.
- [ ] Implement responsive single-chapter presentation mode with large typography, visible labels and reduced-motion behavior.
- [ ] Run focused and full tests.

### Task 9: Documentation and local production verification

**Files:**
- Modify: `README.md`
- Modify only if required: `apps/competitor-intelligence/next.config.ts`

- [ ] Add setup, development, test, typecheck, lint, build and strategy-route instructions.
- [ ] Run `pnpm test`, `pnpm typecheck`, `pnpm lint` and `pnpm build` from the app directory.
- [ ] Start the production server and verify all 12 strategy routes return successful responses.
- [ ] Run browser QA at desktop, laptop, tablet and mobile sizes.
- [ ] Capture temporary screenshots outside Git, compare against the visual spec, record mismatches and fix every material issue through a failing test where behavior is involved.
- [ ] Verify keyboard navigation, source links, filters, drawers and presentation flow.

### Task 10: Repository safety, preview, production and post-deploy QA

**Files:**
- Modify `apps/competitor-intelligence/vercel.json` only if the current configuration cannot deploy the app root.

- [ ] Inspect Git status, staged files and secret patterns.
- [ ] Confirm the Vercel CLI/project link and correct Next.js root directory.
- [ ] Create a preview deployment and record the URL.
- [ ] Run deployed browser QA for routes, filters, drawer, presentation, assets and responsive layouts.
- [ ] Fix deployment-specific defects and redeploy preview until clean.
- [ ] Promote the verified artifact or deploy the same commit to production.
- [ ] Verify the production URL, status, routes and browser flows.
- [ ] Record framework, project, repository, production branch, commands, required environment variables and limitations in the completion report.
