# Google Sheets edit trigger

1. Open the native Google Sheet and choose Extensions → Apps Script.
2. Replace the default script with `Code.gs`.
3. Save, run `setupInstallableTrigger`, and approve the requested spreadsheet permissions.
4. Edit one status cell in `04 Opportunities & Tracker` and verify:
   - its row version increments;
   - `_System Meta!B2` increments;
   - `_System Meta!B3:B4` records the edit time and actor;
   - `16 Change Log` receives an audit row;
   - the dashboard reloads within 60 seconds.

The trigger does not approve evidence. It only versions human edits and records an audit event.
