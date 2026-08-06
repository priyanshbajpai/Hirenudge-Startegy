# Analytics and measurement

## Measurement decision

Do not use signups, generated documents, applications sent or aggregate match score as the north star. The leading candidate is:

> **Qualified interview responses per 10 high-fit, human-reviewed submitted applications.**

It must be validated because interview outcomes are self-reported, delayed and affected by market factors. Always show numerator, denominator, cohort, period and completeness.

## Proposed activation

Within 24 hours, the user:

1. creates/imports enough verified profile evidence;
2. saves one live source-verified target role;
3. reviews alignment requirements/evidence/gaps;
4. accepts, edits or rejects at least one truthful packet improvement;
5. saves the packet and next action.

The activation definition is a founder decision; profile completion or Gmail connection should not count.

## Event taxonomy

| Domain | Core events | Required properties |
|---|---|---|
| Identity/consent | `account_created`, `consent_updated`, `data_exported`, `data_deleted` | anonymous/user ID, purpose, policy version, source |
| Profile | `profile_import_started/completed`, `evidence_confirmed/rejected` | source type, fields, sensitivity class, latency/error |
| Jobs | `job_viewed/saved/dismissed`, `source_verified`, `job_expired_clicked` | canonical job/source, fetched/verified age, duplicate group, role/country |
| Alignment | `alignment_generated/viewed/corrected` | version, requirements count, evidence/gap/unknown counts, model/rubric version |
| Packet | `packet_created`, `artifact_generated/edited/exported`, `packet_submitted` | job, artifact/version, source evidence, human-reviewed flag, credits |
| Tracker | `stage_changed`, `reminder_created/completed`, `outcome_reported` | prior/new stage, job, packet, source, timestamp |
| Outreach | `contact_revealed`, `message_generated/edited/approved/sent`, `oauth_connected/revoked` | provider/source, recipient role, jurisdiction, scope set, approval, bounce/reply/opt-out |
| Interview | `practice_started/completed`, `transcript_corrected`, `feedback_viewed`, `retry_completed` | job/round, mode, consent, retention choice, rubric/model, latency |
| Lifecycle | `message_eligible/sent/delivered/clicked/actioned`, `preference_changed` | trigger, experiment, channel, cap state, consent |
| Commerce | `paywall_viewed`, `checkout_started/completed`, `credit_consumed/refunded`, `subscription_cancelled/refunded` | plan, currency, tax, price cell, action, COGS, reason |

## Metric tree

### Acquisition

Qualified visitor → signup → ICP-qualified signup → activated user. Report source/creative and assisted attribution; never optimize to cheap signups alone.

### Activation

Activation rate, median time to activation, step conversion, errors, concierge intervention and first-job source quality.

### Engagement/retention

D1/D7/D30 activated retention; weekly active searchers; jobs saved; reviewed packets; tracker updates; practice sessions. Segment by search stage so a user who found a job is not mislabeled churn.

### Outcome

Submitted qualified applications, recruiter responses, interviews, interview stages, offers and accepted outcomes—user-reported, with completion rate. Also measure application quality review and AI correction rate.

### Trust/quality

Expired-job click rate, duplicate rate, explanation correction, unsupported AI edits, Gmail scope set, unreviewed sends, bounce/complaint/opt-out, deletion/revocation SLA, security incidents and accessibility defects.

### Monetisation

Paid activation, conversion by value event, revenue, contribution margin, credit utilization, refunds, cancellation reason, search-completed churn and plan cohort.

## Experiment standard

Every experiment records hypothesis, owner, eligible population, primary metric, guardrails, baseline, sample/decision rule, start/end, result and decision. Avoid peeking-driven conclusions. For small early cohorts, pair event data with observed task sessions and report uncertainty rather than false significance.

## Founder-facing dashboard specification—not a build

The future dashboard should contain:

- current ICP/cohort and data completeness;
- activation funnel and D7/D30 retention;
- qualified applications → responses → interviews → offers;
- job freshness/duplicate/expired-click quality;
- AI corrections/unsupported edits and outreach trust metrics;
- pricing conversion/margin/refunds;
- active experiments and founder decisions;
- risks/blockers and evidence freshness;
- source register links and data caveats.

It should not lead with total users, documents generated, emails sent, job count, social impressions or average match score.

## Data governance

Use de-identified aggregate reporting, purpose limitation, retention by event class, role-based access, deletion propagation and a data dictionary. Resume, inbox, contact, audio, immigration and outcome data are sensitive; do not place raw content in the strategy dashboard or research sheet.

Related initiatives: HN-002 and HN-011.

