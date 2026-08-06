# Presentation mode specification

## Purpose

Presentation mode turns the strategy dashboard into a focused founder meeting. It uses the same canonical data and content as the dashboard. It does not maintain a second slide dataset or allow a presentation claim to drift from its source.

## Entry and exit

- Global `Presentation mode` action opens the current section or the full 13-part sequence.
- Default start is chapter 1, Strategic direction.
- `Esc` exits after a visible confirmation only when the browser is in fullscreen; otherwise it closes directly.
- Exit restores the prior route, filters and scroll position.
- Browser fullscreen is optional and user-initiated.

## Chapter sequence

| # | Chapter | Founder takeaway | Primary visual |
|---:|---|---|---|
| 1 | HireNudge's strategic direction | Prove higher-quality, truthful applications for a narrow India-first cohort | Direction statement and wedge |
| 2 | What was evaluated | Public product, screenshots, competitors, ads, policies, APIs, regulation and repository | Evidence-scope strip |
| 3 | What is already in progress | Team discussion is broad; approval and delivery remain unconfirmed | Current-state grouping |
| 4 | What should be improved | Protect trust and connect the core application journey | P0 priority rail |
| 5 | New feature opportunities | Evidence profile, packet, provenance, search status and transcript practice | Product workstream map |
| 6 | UI/UX direction | Move from module-first to job-centered; validate before full redesign | Current/proposed journey |
| 7 | Brand-language direction | Make behavior inspectable and remove unsupported certainty | Copy comparison |
| 8 | Social strategy | Use original organic content to learn before paid scale | Channel and content-pillar map |
| 9 | GTM strategy | Start India-to-India with a provisional employed-switcher wedge | ICP and funnel |
| 10 | First 100 customers | Four paid cohorts; first 10 eligible users calibrate cohort 1 | Allocation and cohort timeline |
| 11 | Now, Next and Later | Protect and prove before expansion | Roadmap sequence |
| 12 | Risks and dependencies | Internal evidence, claims, data rights, Gmail, consent and security gate execution | Dependency chain |
| 13 | Founder decisions | End with explicit choices and unassigned ownership | Decision queue |

## Chapter anatomy

Each chapter contains:

- a chapter number and short title;
- one sentence stating the decision or takeaway;
- one visual or structured comparison;
- up to three supporting points;
- a bottom evidence line with source IDs or `Internal evidence not supplied`;
- optional speaker notes in an expandable panel outside fullscreen.

Use 16:9 composition when space allows, while maintaining responsive reflow rather than fixed slide pixels.

## Controls

### Visible controls

- previous;
- next;
- chapter picker;
- progress `7 of 13`;
- exit;
- optional fullscreen.

Controls sit on a quiet bottom bar and fade only after keyboard focus leaves and pointer inactivity exceeds three seconds. They reappear on pointer movement, focus or key input.

### Keyboard

| Key | Action |
|---|---|
| Right Arrow, Space, Page Down | Next chapter |
| Left Arrow, Page Up | Previous chapter |
| Home | First chapter |
| End | Founder decisions |
| 1–9 | Jump to chapter 1–9 |
| `g` | Open chapter picker |
| `f` | Request fullscreen |
| `Esc` | Close picker/fullscreen or exit mode |

Keyboard shortcuts do not fire while focus is in a link, button or form control where the key has another meaning.

## Responsive behavior

### Desktop and projector

- Title 44–64px depending on viewport height.
- Body 20–26px.
- Keep key content inside a safe area with at least 48px edge spacing.
- A chapter should fit without vertical scrolling at 1366×768 when possible.
- Long tables show the decision subset and link to the full dashboard.

### Tablet

- Content may scroll within a chapter.
- Controls remain sticky.
- Two-column comparisons stay side by side in landscape and stack in portrait.

### Mobile

- One-column layout.
- Title 30–38px and body 18px.
- Horizontal swipe is optional and must not replace buttons.
- Progress and navigation remain visible.
- Diagrams use stacked text equivalents.

## Content rules

- Do not show fake customer, revenue, funnel, retention or outcome metrics.
- Planning counts and channel allocations must state what they count.
- Founder priority displays `Not set` until entered through a future approved workflow.
- `To Be Discussed` appears on every unmade decision.
- Proposed visuals display `Concept`.
- Public claims display `Publicly marketed; not substantiated` when proof is absent.
- Sensitive incident detail appears as `Critical privacy remediation` in the main presentation; operational detail stays in the dashboard risk drawer.

## Founder-decisions finale

The final chapter shows no more than eight decisions at once, ordered by unblock value:

1. outcome and activation;
2. ICP and role family;
3. autonomy boundary;
4. claims standard and remediation authority;
5. application packet and alignment language;
6. job-source and Gmail boundaries;
7. TerraTern consent boundary;
8. owners, target and capacity for the evidence/customer sprint.

The presenter can reveal the remaining decisions through `More decisions`. Each row shows recommendation, impact of delay and status. The final action reads `Record decisions after the meeting`; it must remain non-functional in V1 unless a reviewed persistence workflow is approved.

## Deep links and handoff

Each chapter has a `View evidence` link that exits presentation mode into the relevant dashboard section with filters applied. Browser refresh preserves chapter through `?present=1&chapter=07`. Copying the URL should not expose private data.

## Accessibility

- Focus enters the presentation heading on chapter change.
- An `aria-live="polite"` region announces chapter number and title.
- Controls have visible focus and 44px targets.
- No automatic chapter advance.
- Motion reduces to an immediate change under `prefers-reduced-motion`.
- Visuals have a concise text equivalent.
- Contrast stays AA under projector-like low brightness.

## Acceptance criteria

- All 13 chapters render from canonical local content.
- Next, previous, Home, End, chapter picker and exit work by keyboard.
- Progress remains correct after direct-link navigation.
- The founder-decisions chapter is always last.
- No chapter shows an approval, owner, deadline or metric not present in data.
- Presentation and dashboard use the same initiative IDs and status definitions.
- The experience works at 1366×768, 1024×768, 390×844 and 844×390.
- Reduced-motion and screen-reader smoke tests pass.
