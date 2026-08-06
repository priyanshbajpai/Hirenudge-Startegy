# Retention and lifecycle

## Principle

Lifecycle communication should help the user complete the next job-search action. It is not a news/content broadcast engine. Product events, consent and a shared frequency cap are prerequisites.

## Lifecycle map

| Moment | Trigger | Message value | CTA | Exit/suppression | Metric |
|---|---|---|---|---|---|
| Welcome | Account created | Explain one-job activation path | Add profile/select role | Stop after activation | 24h activation |
| Incomplete profile | Required field blocks chosen task | Explain why field matters | Complete only needed field | Do not send if user abandoned permissions | Task completion |
| Saved job, no packet | Job saved; no packet after user-set interval | Surface job age and next step | Review alignment | Expired/applied/dismissed | Packet start |
| Resume evidence gap | User reviews missing requirement | Ask for evidence, not invented metric | Add/confirm evidence | Dismissed or packet submitted | Confirmed evidence rate |
| Weekly job digest | User opted in; fresh qualified jobs exist | Small ranked set with source/freshness | Review jobs | No qualifying jobs → no email | Save/apply rate, stale click rate |
| Application follow-up | User marked submitted and set reminder | Human-reviewed follow-up guidance | Draft/review message | Rejected/withdrawn/opted out | Action completion/reply |
| Interview reminder | Interview date entered | Round plan and practice checklist | Practice answer | Interview passed/cancelled | Practice completion |
| Inactivity recovery | Previously activated, no use | Resume exact unfinished next step | Continue search | Cap attempts; suppress after no response | Reactivation and unsubscribe |
| Upgrade | User hits valuable limit after value | Explain benefit and exact cost | Compare plan | No repeated pressure after decline | Paid conversion/refund |
| Referral | Verified value milestone | Invite peer without sharing job data | Refer | Fraud/frequency limits | Activated referred users |
| Win-back | Ended search or subscription | Ask status; offer export/pause | Update status | Closed search/opt-out | Return without complaint |

## Preferences and fatigue controls

- Separate product-critical messages from marketing consent.
- Let users choose jobs, reminders, interview, educational/news and promotional categories.
- Global frequency cap across channels; fewer messages when no fresh value exists.
- Quiet/pause mode for interviews, exams, notice periods or ended searches.
- One-click unsubscribe where required, granular preferences and a suppression list.
- Do not put sensitive employer/application/immigration details in subject lines or push previews.
- Never manufacture urgency from an unverified application deadline.

## Personalization hierarchy

Use: user-set role/location/authorization → current job/application state → verified fresh job/company event → behavior. Avoid inferred desperation, protected traits, salary anxiety or private inbox content. A message must explain why it was sent.

## Deliverability and consent

Implement SPF, DKIM, DMARC, bounce handling, complaint monitoring, suppression and domain segmentation before scale. Record consent source, purpose, time and policy version. CAN-SPAM, GDPR/ePrivacy, UK PECR and India DPDP analysis varies by recipient and purpose; see `11_EMAIL_OUTREACH_AND_GMAIL.md`.

## Experiment rules

- Randomize at user level and predefine primary metric.
- Optimize downstream action/retention, not open rate.
- Monitor unsubscribe, complaint and notification-disable rates as guardrails.
- Hold out a control group to detect whether reminders create incremental value.
- Do not launch sophisticated personalization before event correctness is ≥95% in sampled audits.

Related initiative: HN-016.

