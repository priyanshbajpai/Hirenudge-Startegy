# UI/UX evaluation

## Decision

Do not start a full visual redesign yet. First validate the job-centered information architecture and one activation flow. Use a light, accessible system with selective brand contrast; treat gradients, mascot and motion as subordinate tools.

## Strongest observed issues

| Gap | Evidence | Consequence | Recommendation | ID |
|---|---|---|---|---|
| Dashboard exposes many modules/cards at once | 28 HireNudge screenshots | Cognitive load and weak next action | Stage-aware home with one primary action | HN-004 |
| Navigation is module-first | Supplied screens | User must assemble the journey | Job/application packet as hub | HN-004 |
| Scores carry more visual weight than explanations | Matcher/resume screens | False precision | Evidence/gap/unknown view | HN-005 |
| Gmail connection appears as profile-completion task | Onboarding screen | Trust requested before value | Ask only when user chooses send | HN-012 |
| Tracker empty state is detached from current jobs | Supplied screens | Low first-use momentum | Save first target job during onboarding | HN-011 |
| Credits are visible, but value/action cost is unclear | Pricing and product screens | Anxiety and surprise | Preview credit cost and remaining value before action | HN-017 |
| State/history/undo are not evident | Editors/generators | Users fear losing truthful edits | Versions, diffs, save state and rollback | HN-007 |
| Accessibility evidence is absent | No test artefact supplied | Users with motion, vision, hearing or motor needs may be excluded | WCAG 2.2 AA acceptance criteria | HN-021 |

## Recommended information architecture

1. **Home:** current search stage, next action, recent outcomes, deadlines.
2. **Jobs:** discover, saved, provenance/freshness, alignment explanation.
3. **Applications:** packet per job, base/tailored resume, letter, questions, submission history.
4. **Tracker:** stages, reminders, outcomes and follow-ups.
5. **Practice:** interview plan and job/round-specific sessions.
6. **Profile:** evidence, preferences, work authorization, privacy and integrations.

`Nudge Studio` can be the editing environment inside Applications; it should not become a disconnected destination containing every generator.

## Target activation flow

`Import profile → select one real role → review alignment evidence → improve one truthful packet → save next action`.

Progressive questions:

- Ask notice period, CTC and location constraints when ranking Indian jobs.
- Ask authorization/sponsorship only when a foreign corridor is selected, with a reason statement.
- Ask Gmail permission only on Send.
- Ask audio consent only on Start voice practice.

## Visual direction

- Keep a warm white/light-neutral base and one primary brand color plus a high-contrast action color.
- Reserve gradients for campaign/brand moments, not controls or data meaning.
- Use semantic colors for success, warning, risk and unknown; never communicate state by color alone.
- Use a contemporary, highly legible variable sans such as Inter, Geist or Manrope only after real rendering tests; do not select a font because a competitor uses it.
- Build a type scale around task hierarchy, not decorative display text.
- Design explicit loading, stale-data, permission, error, empty, partial-success and revoked-access states.
- Provide visible source, last-updated and uncertainty affordances close to AI output.

## Motion and mascot

The pinball/maze landing idea is visually memorable but P3. It risks obscuring the proposition, slowing the page and creating keyboard/reduced-motion problems. Test the idea as a lightweight prototype against a linear scroll journey; require equivalent static content and `prefers-reduced-motion` behavior under [WCAG 2.2](https://www.w3.org/TR/WCAG22/).

A mascot should explain a decision or state, not become a permanent chat interruption. A professional guide can be original and context-aware, but Jobright's Orion visual identity, character, poses and language are not a reference to reproduce.

## Portfolio reference audit

The live reference has a polished editorial system: strong whitespace, serif/sans contrast, blue accent, career timeline, metric cards and good content hierarchy. Its personal positioning is too broad for a reusable default, and the page is long. Templates should let users prioritize role, proof and selected work.

Critical issue: the rendered public page exposes identity-document numbers. Remove them immediately and implement:

- sensitive-pattern detection for passport, national ID, tax, bank and seafarer/document identifiers;
- private-by-default fields and explicit public preview;
- publish confirmation listing every public field;
- one-click unpublish/revoke link;
- no indexing until the user opts in;
- mobile, contrast and keyboard QA.

## Tool evaluation

| Tool | Verified purpose/current pricing signal | Best HireNudge use | Not for | Recommendation |
|---|---|---|---|---|
| [v0](https://v0.dev/pricing) | AI full-stack/UI generation, visual editing and export. Free `$0` with `$5` monthly credit; Plus `$30/user/month`; Business `$100/user/month`; Enterprise custom on access date | Rapid coded prototypes against the existing stack | Final design judgment, security or accessibility sign-off | Pilot after flow spec; code review required. `Vo` was not verified as a separate relevant product and may be a typo for `v0` |
| [Relume](https://www.relume.ai/) | AI sitemaps, wireframes, style guides; Figma/Webflow/React/HTML export. Free/Design/Build/Grow plans were visible, but exact prices were client-rendered and not captured reliably | Landing-page content architecture and low-fidelity variants | Complex authenticated application behavior | Useful for marketing IA; confirm checkout price before purchase |
| [21st.dev](https://21st.dev/pricing) | Component marketplace plus MCP/CLI and AI generation. Builder `$6/month` annual, Builder + AI from `$15/month` annual, Team `$7.50/seat/month` annual | Inspiration and bounded component experiments | Copying a mixed visual library into production | Use a curated allowlist and licence check |
| [Grainrad](https://grainrad.com/) | WebGPU ASCII/dither/halftone/VHS effects. No paid plan/account requirement was surfaced | Original campaign texture or one-off social art | Product design system | Optional P3 creative utility |
| [MotionSites AI](https://motionsites.ai/unlimited) | Prompt/reference library for motion websites; a time-limited lifetime/founding offer was displayed, not a stable SaaS price | Motion inspiration and prompt studies | Evidence of conversion or production quality | Confirm intended vendor and live checkout; name is ambiguous with the unrelated `motionsites.net` agency |
| [HyperFrames](https://github.com/heygen-com/hyperframes) | Open-source HTML-to-video, agent-oriented framework; no separate stable SaaS price established from the primary repository | Repeatable UI-demo videos and branded data motion | Spontaneous UGC or unreviewed creative | Small deterministic prototype; verify licence/render costs |
| [Remotion](https://www.remotion.dev/) | React video system. Free for individuals/companies up to 3; company Creator `$25/seat/month`; Automator `$0.01/render` with `$100/month` minimum displayed | Template-driven product demos, localized variants | AI video ideation alone | Strong fit if engineering owns templates and licence |
| [HeyGen](https://www.heygen.com/faq) | Avatar, voice and localization. Creator `$29/month`, Pro `$49/month`, Business `$149/month + $20/additional seat`; API advertised from `$5` pay-as-you-go | Consent-based localization or presenter experiments | Synthetic customer testimonials or undisclosed likeness | Use sparingly with disclosure/consent |
| [Higgsfield](https://higgsfield.ai/) | Current image/video/audio/cinema/marketing suite. Pricing page existed but values were client-rendered and not reliably captured | Concept/visual experimentation for ads | Product UI and factual product demos | Trial only; verify live credits/rights before procurement |

## Usability research plan

Test five tasks with 5–8 users per chosen role family before redesign approval:

1. find one role worth applying to and explain why;
2. identify a hard blocker versus missing information;
3. create and verify one tailored resume change;
4. save the application and schedule the next action;
5. disconnect Gmail/delete a document.

Measure completion, time, critical errors, confidence with evidence, help requests and post-task comprehension. Aesthetic preference is secondary.
