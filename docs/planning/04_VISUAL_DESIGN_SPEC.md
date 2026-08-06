# Visual design specification

## Design intent

The founder dashboard should feel like a precise editorial briefing with an operational spine. It should be calm enough for reading, structured enough for decisions and restrained enough that urgency comes from content rather than decoration.

The existing competitor-intelligence application provides a useful technical and visual base: true white surfaces, dark navy text, blue interaction color, hairline borders, responsive navigation and reduced-motion support. The strategy dashboard should soften its dense research-workbench character, increase whitespace and typography, and keep the evidence discipline.

## Visual principles

1. One decisive statement per viewport.
2. Editorial sections before containers.
3. Tables for exact mappings; diagrams for journeys and dependencies.
4. Color supports labels and never replaces them.
5. White space separates ideas before borders or cards do.
6. Unknown and blocked states receive the same design care as approved states.
7. Charts appear only when real comparable quantities exist.
8. Motion clarifies sequence or focus and respects reduced motion.

## Page composition

- Maximum reading width: `1440px`.
- Narrative column: `680–760px`.
- Data/table region: up to `1280px`.
- Desktop grid: 12 columns, `24px` gutters, `32–48px` outer margin.
- Tablet grid: 8 columns, `20px` gutters, `24px` margin.
- Mobile: 4 columns, `16px` gutters and margin.
- Major section spacing: `72–96px` desktop, `56–72px` tablet, `40–56px` mobile.
- Internal content rhythm: `8, 12, 16, 24, 32, 48, 64, 96`.

Avoid a wall of equal cards. Use open sections, dividers, aligned lists and occasional bordered panels for risk, decision or interaction.

## Color system

### Foundation

| Token | Value | Use |
|---|---|---|
| `canvas` | `#F7F8F6` | Very light neutral page background |
| `surface` | `#FFFFFF` | Primary reading surface |
| `surface-subtle` | `#F2F4F1` | Secondary band or table header |
| `ink` | `#171A19` | Primary text |
| `ink-muted` | `#66706C` | Supporting text |
| `border` | `#E2E6E2` | Hairline structure |
| `border-strong` | `#C9D0CB` | Active control or table emphasis |
| `accent` | `#0A7C72` | Controlled HireNudge accent |
| `accent-strong` | `#075E57` | High-contrast accent interaction |
| `accent-soft` | `#E7F3F0` | Selected background |

The accent is a proposed dashboard token, not a final HireNudge brand decision. Confirm it against current brand assets before coding.

### Priority

| Label | Foreground | Background | Border |
|---|---|---|---|
| P0 — Must Have | `#9B1C1C` | `#FFF0F0` | `#F3B7B7` |
| P1 — Important | `#9A4D00` | `#FFF5E6` | `#F2C27B` |
| P2 — Good to Have | `#175CD3` | `#EEF4FF` | `#B2CCFF` |
| P3 — Later | `#59636E` | `#F2F4F7` | `#D0D5DD` |

### Decision

| Label | Foreground | Background | Border |
|---|---|---|---|
| To Be Discussed | `#6941C6` | `#F4F0FF` | `#D6BBFB` |
| Approved | `#067647` | `#ECFDF3` | `#ABEFC6` |
| Deferred | `#59636E` | `#F2F4F7` | `#D0D5DD` |
| Rejected | `#7A271A` | `#FEF3F2` | `#FECDCA` |

### Evidence

| Label | Foreground | Background | Border |
|---|---|---|---|
| Verified | `#067647` | `#ECFDF3` | `#ABEFC6` |
| Observed | `#175CD3` | `#EEF4FF` | `#B2CCFF` |
| Discussed | `#475467` | `#F2F4F7` | `#D0D5DD` |
| In Progress | `#9A4D00` | `#FFF5E6` | `#F2C27B` |
| Proposed | `#6941C6` | `#F4F0FF` | `#D6BBFB` |
| Requires Verification | `#59636E` | `#F7F8F9` | `#D0D5DD` |
| Blocked | `#9B1C1C` | `#FFF0F0` | `#F3B7B7` |

Every semantic mark includes icon or dot, full text label and accessible name. Status does not depend on hue.

## Typography

### Recommended family

Use the existing Geist setup for the first implementation. It is already loaded through `next/font`, performs well in interface and editorial sizes, and avoids a new font dependency. Test a serif only for presentation-mode chapter titles if it materially improves the founder-meeting tone; omit it in V1 unless approved.

### Scale

| Role | Desktop | Mobile | Weight / line height |
|---|---:|---:|---|
| Display | 56px | 38px | 600 / 1.05 |
| Page title | 40px | 32px | 600 / 1.1 |
| Section title | 28px | 24px | 600 / 1.2 |
| Subsection | 20px | 18px | 600 / 1.3 |
| Lead | 20px | 18px | 420 / 1.55 |
| Body | 16px | 16px | 420 / 1.6 |
| Data/table | 14px | 14px | 450 / 1.45 |
| Label | 12px | 12px | 650 / 1.3, `0.02em` tracking |

Use sentence case. Reserve uppercase for short metadata labels. Use tabular numerals for counts and dates.

## Surfaces and depth

- Default radius: `10px` for controls and `12px` for the few contained panels.
- Tables and editorial comparisons may use square or `8px` corners.
- Shadow level 1: `0 1px 2px rgba(23,26,25,.06)` for raised controls only.
- Shadow level 2: `0 16px 48px rgba(23,26,25,.12)` for modal or presentation controls.
- Main content should rely on borders and spacing.
- Avoid nested cards. Expanded detail should use an inset rule or drawer.

## Iconography

Use Lucide, already installed. Choose one icon per concept and keep stroke at `1.75–2px`. Common mappings:

- ShieldCheck: trust or compliance;
- Route: journey or roadmap;
- FileStack: packet and versions;
- Database: evidence or job source;
- Scale: decision or trade-off;
- CircleHelp: unknown;
- LockKeyhole: blocked or security;
- Presentation: presentation mode.

Icons support scanning. Do not add icons to every label or decorative heading.

## Required patterns

### Executive overview

An open lead section with a 7–10 word direction, a two-line explanation and a single evidence caveat. Below it, use a priority rail and two aligned lists for decisions and risks. Do not use a KPI card grid.

### Priority rail

Four vertical or horizontal bands labeled P0–P3. P0 receives the strongest border, not the largest area. Each item displays title, horizon and decision status. On mobile, bands become a vertical list.

### Initiative register

Use a table on wide screens and stacked rows on mobile. Sticky ID/title column, optional sticky header, visible filter summary and a detail drawer. The default columns are priority, title, workstream, type, evidence, horizon, decision and effort.

### Roadmap

Five lanes for Now, Next, Later, Research and Blocked. Use structured rows instead of draggable cards. Blocked rows show `Blocked by` inline. Presentation mode collapses this into a horizontal sequence with Research and Blocked beneath.

### User journey

Use a connected flow with five stages. Each stage contains user intent, artifact, risk and success event. A second muted row maps current modules, allowing the founder to see where fragmentation occurs.

### Workstream map

Use a dependency diagram centered on Application Packet. Candidate Evidence and Job Data feed it; Nudge Studio, Outreach and Interview Practice act on it; Tracker and Outcomes feed Analytics and Lifecycle. Arrows require labels where the relationship is not obvious.

### UI/UX comparison

Use two editorial columns with a shared task title. Left is `Current observed pattern`, right is `Proposed concept`. An annotation rail explains evidence, expected behavior and validation metric. Avoid faux-device mockups unless a real prototype exists.

### Brand-language comparison

Use a three-column table: current phrase, risk, recommended direction. Risk terms may use semantic text color but keep full labels.

### GTM funnel

Use a linear funnel with named stages and no percentages until internal data are supplied: qualified reach → screening → paid customer → activated user → repeat user → outcome reported. Each stage displays `Baseline not supplied`.

### First-100 allocation

Use one compact horizontal stacked bar because the plan contains exact allocations. Label it `Planning allocation, not forecast`. List 25/25/25/15/10 in text adjacent to the bar so color is not required.

### Research and decision queues

Use ranked rows with ID, question, evidence, delay impact, deadline and status. Detail opens in a right-side drawer on desktop and full-screen sheet on mobile.

### Risk and dependency view

Use a two-column register: risk and required exit criterion. Add dependency links to initiatives. Avoid a decorative probability matrix unless the team supplies calibrated likelihood and impact definitions.

## Motion

- Page transitions: none in V1.
- Drawer: 160–200ms opacity and translate, ease-out.
- Filter updates: no animated reflow.
- Presentation section change: 200ms fade or immediate under reduced motion.
- Focus changes must remain visible without motion.
- `prefers-reduced-motion: reduce` removes all nonessential animation.

No pinball, maze, parallax, looping mascot, auto-advancing carousel or animated chart belongs in the founder dashboard.

## Responsive behavior

### Desktop, `>=1280px`

- persistent 232px navigation rail;
- wide editorial canvas;
- tables show default columns;
- decision/evidence details open in a 520–640px drawer;
- presentation controls remain at bottom center.

### Tablet, `768–1279px`

- collapsible navigation;
- two-column content becomes one or two columns by section;
- tables may hide low-priority columns behind `More details`;
- roadmap scrolls horizontally with clear lane labels.

### Mobile, `<768px`

- top app bar and full-height navigation sheet;
- content order follows the founder narrative;
- initiative rows show priority, title, decision, horizon and evidence before expansion;
- filters use a full-height sheet;
- comparison views stack current then proposed;
- presentation mode remains operable in portrait and landscape.

## Accessibility

- WCAG 2.2 AA contrast minimum.
- Visible `:focus-visible` ring at least 2px with offset.
- Touch targets at least 44×44px.
- Landmarks, logical heading order and skip link.
- Table caption and accessible column headers.
- Status label text and icon in addition to color.
- Keyboard access for filters, drawer, roadmap items and presentation navigation.
- Escape closes transient surfaces and returns focus.
- Charts include a text/table equivalent.
- No hover-only evidence.

## Content density rules

- Overview: no more than seven visible P0 rows and five decision rows before `View all`.
- Initiative register: 50 rows per page is acceptable because data are local; virtualisation is unnecessary at 38 items.
- Primary copy: 65–85 characters per line.
- Detail drawer: no more than three metadata columns.
- Status labels may use restrained pills; routine metadata stays plain text.

## Design QA checklist

- The founder can distinguish AI priority, founder priority and decision status in three seconds.
- No customer or performance number lacks source, period and label.
- Every blocked item names its dependency.
- Every proposed state is visibly different from an observed state.
- Tables work at 200% zoom.
- Presentation mode fits at 1366×768 and mobile landscape.
- Reduced-motion behavior is equivalent.
- No screen contains nested card stacks or a rainbow of semantic colors.
