/**
 * HireNudge intelligence workbook edit trigger.
 * The simple onEdit trigger works immediately after this bound script is saved.
 * setupInstallableTrigger() can still be run later when editor identity capture is required.
 */
const META_SHEET = '_System Meta';
const AUDIT_SHEET = '16 Change Log';
const HEADER_ROW = 4;
const VERSIONED_SHEETS = new Set([
  '01 Competitor Research',
  '04 Opportunities & Tracker',
  '05 Sources & Changes',
  '_Research Notes',
]);

function setupInstallableTrigger() {
  const spreadsheet = SpreadsheetApp.getActive();
  ScriptApp.getProjectTriggers()
    .filter((trigger) => trigger.getHandlerFunction() === 'stampIntelligenceEdit')
    .forEach((trigger) => ScriptApp.deleteTrigger(trigger));
  ScriptApp.newTrigger('stampIntelligenceEdit').forSpreadsheet(spreadsheet).onEdit().create();
}

function onEdit(event) {
  stampIntelligenceEdit(event);
}

function stampIntelligenceEdit(event) {
  if (!event || !event.range) return;
  const lock = LockService.getDocumentLock();
  if (!lock.tryLock(5000)) throw new Error('Could not acquire workbook revision lock.');
  try {
    const sheet = event.range.getSheet();
    if (!VERSIONED_SHEETS.has(sheet.getName()) || event.range.getRow() <= HEADER_ROW) return;

    const lastColumn = sheet.getLastColumn();
    const headers = sheet.getRange(HEADER_ROW, 1, 1, lastColumn).getDisplayValues()[0];
    const normalizedHeaders = headers.map((header) => String(header).trim().toLowerCase());
    const row = event.range.getRow();
    const rowVersionColumn = normalizedHeaders.indexOf('row version') + 1;
    const updatedAtColumn = normalizedHeaders.indexOf('updated at') + 1;
    const updatedByColumn = normalizedHeaders.indexOf('updated by') + 1;
    const recordId = String(sheet.getRange(row, 1).getDisplayValue() || 'unknown');
    const actor = Session.getActiveUser().getEmail() || 'Google Sheets editor';
    const timestamp = new Date();

    if (rowVersionColumn > 0) {
      const cell = sheet.getRange(row, rowVersionColumn);
      cell.setValue(Number(cell.getValue() || 0) + 1);
    }
    if (updatedAtColumn > 0) sheet.getRange(row, updatedAtColumn).setValue(timestamp);
    if (updatedByColumn > 0) sheet.getRange(row, updatedByColumn).setValue(actor);

    const meta = event.source.getSheetByName(META_SHEET);
    const revisionCell = meta.getRange('B2');
    revisionCell.setValue(Number(revisionCell.getValue() || 0) + 1);
    meta.getRange('B3').setValue(timestamp);
    meta.getRange('B4').setValue(actor);

    const audit = event.source.getSheetByName(AUDIT_SHEET);
    audit.appendRow([
      `audit-${Utilities.getUuid()}`, timestamp, actor, sheet.getName(), recordId,
      event.range.getA1Notation(), event.oldValue || '', event.value || '', 'Google Sheets edit trigger'
    ]);
  } finally {
    lock.releaseLock();
  }
}
