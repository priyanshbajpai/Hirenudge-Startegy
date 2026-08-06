# HireNudge Competitive Intelligence — Implementation Design System

Approved visual reference: `/Users/priyansh/.codex/generated_images/019fb929-f3ce-7561-b1c0-d86d3af27931/exec-bc489aff-042b-4d55-aa9e-b0a5dd088643.png`

## Interface contract

- Dense, desktop-first research workspace with a compact mobile summary mode.
- True white canvas, navy text, blue interaction color, hairline borders, minimal shadows.
- Left navigation rail, compact global header, operating-cadence strip, directory/detail/action three-column workbench, comparison tables, and evidence ledger.
- UI labels and data remain code-native. No screenshot is shipped as the application.

## Tokens

- Brand: `#0581dd`; strong blue: `#005ace`; ink: `#0f2744`.
- Muted text: `#61738a`; border: `#d8e0ea`; soft surface: `#f6f9fc`; selected: `#eaf3ff`.
- Success: `#0f9d58`; warning: `#d88a00`; danger: `#c9372c`.
- Radius: 4px controls, 6px panels. Shadows are reserved for menus/modals.
- Body/controls: Inter; display fallback: Poppins/Inter. Control type 12–13px, table type 11–12px.

## Component inventory

- App shell, primary navigation, filter toolbar, cadence strip.
- Searchable platform directory with lifecycle/geography group labels.
- Platform header and evidence tabs.
- Dense fact table, source/confidence/status cells.
- HireNudge response rail with Copy/Avoid/Differentiate actions and tracker creation.
- Feature and pricing comparison tables.
- Evidence ledger and review-state controls.
- Tracker table with editable owner, priority, status, and due date.
- Health states for authentication, Sheets connectivity, source freshness, sync conflicts, and cron failures.

## Responsive rules

- Desktop `>=1280px`: preserve the three-column workbench and bottom comparison bands.
- Tablet `768–1279px`: directory becomes a collapsible rail; response rail moves below detail.
- Mobile `<768px`: summary-first route, horizontal table scroll, sticky filter button, no clipped controls.

## Allowed first-viewport copy

`HireNudge`, `Competitor Intelligence`, search placeholder, `Geography`, `Category`, `Evidence`, `Open Google Sheet`, `Sheet synced`, operating cadence labels, navigation labels, platform names, platform tabs, and source/evidence labels from the approved concept. Data values may change only to reflect verified source records.

## Interaction contract

- Search and global filters update directory and table rows.
- Selecting a platform updates profile, comparison, recommendations, pricing, and evidence.
- Tracker edits preserve local form state until the server confirms the Sheet write.
- Revision polling checks one metadata cell every 30 seconds and refetches only after change.
- Conflicts show submitted/current values and never silently overwrite.

