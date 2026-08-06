# HireNudge Competitive Intelligence Operations

## Deployment status

- Production: `https://hirenudge-competitor-intelligence.vercel.app`
- Production Sheet: `https://docs.google.com/spreadsheets/d/14r1uVHzxlq1kqfrUTw47VnS18aNscYJbHwv3DtSEtfE/edit`
- Staging Sheet: `https://docs.google.com/spreadsheets/d/1bAZDhGso089sYplGHBX-YKrIRUVy3rCdDbaRdCpBRQg/edit`
- Safety backup: `https://docs.google.com/spreadsheets/d/1hqWV796-B0MQYhbOc2Wq5nvW-qUjdjx16apcqEPXMpk/edit`
- Vercel project: `hirenudge-competitor-intelligence` (`prj_9ijtDJgMAxcvNGsWl4ghVnfQWPJ9`)
- Production is intentionally fail-closed at the private password screen until password secrets are configured.

## One-time production activation

1. Add `DASHBOARD_PASSWORD` (at least 12 characters) and a separately generated `PASSWORD_AUTH_SECRET` (at least 32 random characters) as encrypted Vercel production variables.
2. Create a Google service account, enable the Google Sheets API, and share the native Sheet with the service-account email as Editor.
3. Add `GOOGLE_SHEETS_SPREADSHEET_ID`, `GOOGLE_SERVICE_ACCOUNT_EMAIL`, `GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY`, and `CRON_SECRET` as encrypted Vercel environment variables.
4. Install and authorize the Apps Script trigger using `google-apps-script/Code.gs`.
5. Redeploy, sign in as `priyanshbajpai@gmail.com`, and run the three acceptance tests: dashboard-to-Sheet edit, Sheet-to-dashboard edit within 60 seconds, and stale-row version conflict.
6. Connect the Vercel project to `priyanshbajpai/hirex` after the implementation files are committed; future previews can then be Git-triggered and promoted without rebuilding.

## Weekly review

1. Review Startup Radar and the Evidence Queue.
2. Reject duplicate, dead, unsupported, or irrelevant discoveries.
3. Promote only records with a functioning product, one primary source, a second independent or observable source, and transfer relevance of at least 4/5.
4. Approve changed pricing, feature, GTM, traction, funding, revenue, or trust facts only after source reconciliation.
5. Convert accepted learning into a transfer recommendation and bounded tracker item.

## Monthly deep review

- Revisit stale official pricing and product sources.
- Confirm acquisitions, rebrands, product shutdowns, and duplicate company/product entities.
- Review HireNudge gaps with product analytics, entitlement configuration, support evidence, roadmap constraints, and product owners.
- Reconcile dashboard aggregates to Sheet formulas and inspect failed sync/audit events.

## Quarterly trust and company review

- Recheck revenue/funding classification, legal entity, privacy, security, recording/consent, AI transparency, bias controls, appeal, accessibility, and candidate data retention.
- Never infer revenue from funding, headcount, traffic, customers, logos, or review counts.

## Sync recovery

1. Confirm the service-account email still has Editor access to the Sheet.
2. Confirm `_System Meta`, `04 Opportunities & Tracker`, `05 Sources & Changes`, and `16 Change Log` retain their names and headers.
3. Check Vercel environment variables and runtime logs.
4. Re-authorize the installable Apps Script trigger if the trigger owner changed.
5. Resolve version conflicts from the dashboard comparison UI; do not lower row versions.

## Secret rotation

- Rotate the dashboard password, session-signing, service-account, cron, and connector secrets in Vercel.
- Do not place credentials in the repository or browser-exposed variables.
- After rotation, test sign-in, one dashboard write, one Sheet edit, and one protected cron route.
