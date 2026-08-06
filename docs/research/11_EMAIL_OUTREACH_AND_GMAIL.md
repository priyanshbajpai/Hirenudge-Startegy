# Email outreach and Gmail

This is product/compliance research, not legal advice. Counsel must confirm target-country rules and platform terms before sequences or enrichment launch.

## Product boundary

Initial release: **user-directed, send-only, one reviewed message at a time.** No inbox read, no autonomous follow-up sequence, no hidden bulk send and no shared TerraTern contact pool.

## Gmail architecture

Google classifies [`gmail.send`](https://developers.google.com/workspace/gmail/api/auth/scopes) as a **sensitive** scope. Read, compose and modify scopes are **restricted**. For a send-only need, request `gmail.send` at the moment the user selects Send; do not request inbox access during onboarding. Google explicitly emphasizes the narrowest scope ([minimum-scope guidance](https://support.google.com/cloud/answer/13807380?hl=en)).

Required flow:

1. user drafts or generates a message without Gmail permission;
2. user sees recipient, source, rationale, subject, body and attachments;
3. user edits and explicitly selects Send;
4. OAuth requests only `gmail.send` through the authorization-code flow;
5. encrypted refresh token is stored only if continued sending is needed;
6. audit records message ID, user approval and template/version, not unnecessary email content;
7. Disconnect revokes access with Google, deletes tokens and confirms status;
8. deletion/retention follows a published schedule.

Using restricted scopes or storing restricted Gmail data can trigger a security assessment; sensitive scopes still require consent-screen verification ([verification](https://support.google.com/cloud/answer/13463073), [restricted-scope verification](https://support.google.com/cloud/answer/13464321)). API quota is not a safe sending policy: Gmail's published quotas are infrastructure limits, so HireNudge should impose much lower behavior/reputation caps ([Gmail quotas](https://developers.google.com/workspace/gmail/api/reference/quota)).

## Email-only alternatives

- Copy subject/body to clipboard.
- Open a prefilled `mailto:` link where browser/client limits allow.
- Download a plain-text draft.
- Let the user send manually from their own client.

Saving a Gmail draft would require a broader restricted scope such as compose; avoid it in the initial boundary.

## Contact-data provider comparison

| Provider | Capability | Commercial/API signal | Privacy/rights signal | Suitability |
|---|---|---|---|---|
| [Apollo](https://docs.apollo.io/reference/apollo-api) | Contact/company search, enrichment and engagement workflows | Plan-based API/credits/rate limits | Policy describes public/third-party/contributor data, opt-out and legitimate-interest posture; customer still needs lawful purpose | Pilot only after contract, DPA, purpose and country review |
| [Hunter](https://help.hunter.io/en/articles/1970956-hunter-api) | Domain search, email finder/verifier, enrichment and sequences | Key auth; published credit costs; finder/search 15 req/s and 500/min, verifier 10 req/s and 300/min | API can return 451 for legal removal; professional-email focus | Narrower finder/verifier pilot may be easier to govern |
| [People Data Labs](https://docs.peopledatalabs.com/docs/reference-person-enrichment-api) | Person enrichment and bulk matching | Match-based usage; default 100/min free, 1,000/min paid | Large personal-data surface; purpose/notice/rights handling required | Not needed for initial recipient-specific outreach |

Provider availability or its own privacy policy does not create HireNudge's lawful basis. Publicly visible contact details are not blanket permission for automated marketing.

## Recipient and message controls

- User selects or confirms each recipient and why that person is relevant.
- Prefer one appropriate recruiter/hiring manager, not multiple employees sprayed at a company.
- Verify role/company/email before send and show data source/date.
- Never invent familiarity, referral, company fact or candidate credential.
- Default to a single message; follow-up only after explicit opt-in and review.
- Maintain a global suppression list across users/providers where legally and operationally appropriate.
- Provide opt-out/unsubscribe mechanics for messages classed as commercial; honor objections everywhere.
- Do not evade provider/domain limits through account rotation.
- Monitor bounce, reply, complaint, block and account-suspension signals.

## Regulatory map

| Regime | Official guidance | Design implication |
|---|---|---|
| US CAN-SPAM | [FTC guide](https://www.ftc.gov/business-guidance/resources/can-spam-act-compliance-guide-business) covers commercial B2B mail, accurate identity/subject, address and opt-out | Classify message purpose; accurate headers; physical address where required; opt-out and timely suppression |
| EU GDPR | [Official text](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32016R0679), including transparency for third-party data | Document lawful basis; Article 14-type notice where applicable; rights and minimization |
| EU ePrivacy | [Directive](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32002L0058) implemented nationally | Country-specific electronic marketing analysis; sender identity and opt-out |
| UK GDPR/PECR | [ICO B2B guidance](https://ico.org.uk/for-organisations/direct-marketing-and-privacy-and-electronic-communications/business-to-business-marketing/) | Corporate vs individual subscriber matters; legitimate-interest assessment is not automatic permission |
| India DPDP | [Act](https://www.meity.gov.in/static/uploads/2024/02/Digital-Personal-Data-Protection-Act-2023.pdf) and [final Rules source](https://www.meity.gov.in/documents/act-and-policies/digital-personal-data-protection-rules-2025-gDOxUjMtQWa) | Purpose/notice/consent-or-legitimate-use analysis, rights, safeguards and phased commencement review |

A candidate's one-to-one networking email may differ from HireNudge's own commercial marketing, but automated enrichment/sequences can change the risk analysis. Counsel must classify use cases rather than apply one global banner.

## Release gates

- OAuth scope and consent-screen review complete.
- Token encryption/revocation/deletion tests pass.
- Legal matrix approved for initial recipient countries.
- Provider contract/DPA/upstream-use rights reviewed.
- Suppression/unsubscribe and user-review controls verified.
- Low daily cap, bounce/complaint stop rules and incident owner set.
- Public copy no longer says bulk/autopilot unless exact behavior is approved and accurately controlled.

Related initiatives: HN-012, HN-013, HN-026, HN-028.

