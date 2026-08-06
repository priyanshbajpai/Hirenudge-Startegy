# Interview preparation evaluation

## Recommendation

Build transcript-first, job- and round-specific practice before realtime voice. Feedback should be anchored to the question, job evidence and a disclosed rubric. Do not score personality, honesty, accent, emotion, attractiveness, employability or probability of passing.

## MVP sequence

### Phase 1 — text/transcript

- User selects job, company, expected round and date.
- System generates a small question set with source/rationale and editable assumptions.
- User types or records an answer; recording is optional.
- Feedback covers relevance, completeness, evidence/examples, structure, concision and likely follow-up.
- User sees transcript quotes supporting each comment, edits the transcript and retries.
- STAR is suggested only when appropriate; it is not a universal score.

### Phase 2 — opt-in realtime

Current APIs make low-latency speech interaction and speech-to-text technically feasible; OpenAI, for example, documents realtime audio/text over WebRTC/WebSocket/SIP and a separate transcription model ([Realtime](https://developers.openai.com/api/docs/models/gpt-realtime), [transcription](https://developers.openai.com/api/docs/models/gpt-4o-transcribe)). This is vendor evidence, not a recommendation to lock in.

Architecture needs:

- client audio capture with explicit recording indicator and device control;
- short-lived client authorization; server-held provider key;
- voice activity/turn detection with user interrupt;
- streaming transcription with user correction;
- job/rubric retrieval separated from delivery feedback;
- structured feedback schema and provenance;
- encrypted storage, raw-audio deletion job and consent ledger;
- cost/latency/quality telemetry without retaining unnecessary content.

## What can be usefully evaluated

| Area | Treatment |
|---|---|
| Answer relevance | Rubric plus transcript evidence; allow user correction |
| Structure | Identify opening, evidence, action/result and conclusion; do not force one template |
| Missing content | Compare answer to disclosed job/round rubric and mark unknowns |
| Examples/metrics | Check whether examples exist and are user-confirmed, not whether numbers sound impressive |
| Word choice | Suggest clarity, specificity and jargon reduction |
| Pace/pauses/filler words | Report descriptive counts/ranges and user-controlled goals; no employability inference |
| Small talk/open/close | Provide practice scripts and alternatives, not cultural personality judgments |
| Follow-up questions | Generate from claims/evidence in the answer |
| Readiness | Use checklist completion and practice history; avoid a single global score |

## What should not be scored

- confidence inferred from pitch, volume, gaze or accent;
- emotion, truthfulness, personality or culture fit;
- disability, neurodivergence or fluency proxies;
- attractiveness, facial expression or body language as candidate quality;
- probability of hiring/interview success.

NIST recommends governance, mapping, measurement and management of AI risk, including validity, transparency, privacy and harmful bias ([AI RMF](https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-ai-rmf-10)). EEOC resources show how AI assessment can disadvantage people with disabilities; although HireNudge is candidate-side coaching, the product should not recreate the same proxies ([EEOC AI and ADA](https://www.eeoc.gov/eeoc-disability-related-resources/artificial-intelligence-and-ada)).

## Accessibility and consent

- Full text mode with equivalent learning value.
- Editable transcript, captions and keyboard controls.
- Adjustable time pressure, speed and voice; no penalty for using accommodation.
- Clear notice before recording: purpose, processor, retention and deletion.
- Raw audio default deletion after feedback generation; let user save only by explicit choice.
- Delete session/transcript/audio independently where architecture permits.
- Avoid background recording and require visible stop control.
- Test English varieties and Indian accents by role/language; publish known limitations.
- Meet relevant [WCAG 2.2](https://www.w3.org/TR/WCAG22/) media, keyboard, contrast and motion requirements.

## Evaluation plan

Create a consented, de-identified benchmark of answers rated by trained human coaches using the disclosed rubric. Measure transcription word error rate by accent/noise/device, feedback agreement, unsupported feedback, user corrections, retry improvement, latency and cost. Run counterfactual tests where only accent/gender-coded voice features change; content feedback should remain stable.

## Business model

Interview practice is close to a user outcome and can support a premium search sprint. Validate transcript-first willingness to pay and human-rated value before adding high-cost realtime sessions. A human expert add-on can be tested as a service/partner offer without building a marketplace.

Related initiatives: HN-014 and HN-015.

