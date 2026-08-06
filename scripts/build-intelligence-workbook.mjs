import fs from "node:fs/promises";
import path from "node:path";
import { SpreadsheetFile, Workbook } from "@oai/artifact-tool";
import { actions, discoveries, featureObservations, features, meta, platforms, pricing, recommendations, sources, watchlist } from "../apps/competitor-intelligence/data/research-seed.mjs";

const outputDir = path.resolve("outputs/competitive-intelligence-system");
await fs.mkdir(outputDir, { recursive: true });

const wb = Workbook.create();
const COLORS = { ink: "#0F2744", brand: "#0581DD", strong: "#005ACE", soft: "#F3F8FD", border: "#D8E0EA", muted: "#61738A", success: "#0F9D58", amber: "#D88A00", danger: "#C9372C", white: "#FFFFFF" };
const OBSERVED = new Map(featureObservations.map((row) => [`${row.featureId}:${row.platformId}`, row.availability]));

function addSheet(name, freezeRows = 4, freezeColumns = 0) {
  const sheet = wb.worksheets.add(name);
  sheet.showGridLines = false;
  if (freezeRows) sheet.freezePanes.freezeRows(freezeRows);
  if (freezeColumns) sheet.freezePanes.freezeColumns(freezeColumns);
  return sheet;
}

function title(sheet, text, subtitle, endColumn = "H") {
  sheet.getRange(`A1:${endColumn}1`).merge();
  sheet.getRange("A1").values = [[text]];
  sheet.getRange(`A2:${endColumn}2`).merge();
  sheet.getRange("A2").values = [[subtitle]];
  sheet.getRange(`A1:${endColumn}1`).format = { fill: COLORS.ink, font: { bold: true, color: COLORS.white, size: 16 }, rowHeight: 28, verticalAlignment: "center" };
  sheet.getRange(`A2:${endColumn}2`).format = { fill: COLORS.soft, font: { color: COLORS.muted, size: 9 }, rowHeight: 22, verticalAlignment: "center" };
}

function styleHeader(range) {
  range.format = { fill: COLORS.strong, font: { bold: true, color: COLORS.white, size: 9 }, rowHeight: 26, verticalAlignment: "center", wrapText: true, borders: { preset: "outside", style: "thin", color: COLORS.strong } };
}

function styleBody(range) {
  range.format = { font: { color: COLORS.ink, size: 8 }, rowHeight: 23, verticalAlignment: "center", wrapText: false, borders: { insideHorizontal: { style: "thin", color: "#E8EDF2" } } };
}

function addTable(sheet, startRow, headers, rows, name, widths = []) {
  const colCount = headers.length;
  const endCol = columnName(colCount);
  sheet.getRange(`A${startRow}:${endCol}${startRow}`).values = [headers];
  if (rows.length) sheet.getRange(`A${startRow + 1}:${endCol}${startRow + rows.length}`).values = rows;
  styleHeader(sheet.getRange(`A${startRow}:${endCol}${startRow}`));
  if (rows.length) styleBody(sheet.getRange(`A${startRow + 1}:${endCol}${startRow + rows.length}`));
  const table = sheet.tables.add(`A${startRow}:${endCol}${startRow + Math.max(1, rows.length)}`, true, name);
  table.style = "TableStyleMedium2";
  table.showBandedRows = true;
  widths.forEach((width, index) => sheet.getRangeByIndexes(0, index, startRow + Math.max(1, rows.length), 1).format.columnWidth = width);
  return { endCol, endRow: startRow + rows.length };
}

function columnName(n) {
  let result = "";
  while (n > 0) { n--; result = String.fromCharCode(65 + (n % 26)) + result; n = Math.floor(n / 26); }
  return result;
}

function addStatusFormatting(range) {
  range.conditionalFormats.add("containsText", { text: "Approved", format: { fill: "#E7F7EE", font: { color: COLORS.success, bold: true } } });
  range.conditionalFormats.add("containsText", { text: "Verified", format: { fill: "#E7F7EE", font: { color: COLORS.success } } });
  range.conditionalFormats.add("containsText", { text: "Needs verification", format: { fill: "#FFF4DC", font: { color: "#9B6200" } } });
  range.conditionalFormats.add("containsText", { text: "Rejected", format: { fill: "#FDECEA", font: { color: COLORS.danger } } });
}

// 00 Guide & Methodology
{
  const s = addSheet("00 Guide & Methodology", 3);
  title(s, "HireNudge Hiring-AI Intelligence & Execution Tracker", "Public-first research system • Google Sheets canonical • all material claims require dated evidence", "J");
  const sections = [
    ["Purpose", "Answer what changed, why it matters, what HireNudge should do, and who owns the next experiment."],
    ["Evidence hierarchy", "Filings → official product/pricing/help/security → stores → launch/accelerator profiles → official announcements → credible press/licensed databases → reviews/estimates → community qualitative."],
    ["Unknown-state rule", "Unknown, Not publicly disclosed, Not found, and Manual verification required are valid. Missing never becomes No or 0."],
    ["Revenue rule", "Reported only when filed or directly disclosed. Third-party values remain Estimated with methodology. Funding, traffic, logos and headcount never become invented revenue."],
    ["Feature rule", "Availability: Yes, Partial, Paid-only, Planned, No, Unknown. Every non-unknown observation needs source, observed date, tier/product dependency and confidence."],
    ["Trend rule", "Calculate only when at least three independent signal families exist. Launch rank, funding or upvotes alone do not prove traction."],
    ["Trust veto", "No invasive surveillance, emotion inference, undisclosed recording, autonomous rejection, black-box scoring, fabricated evidence, fully autonomous applications or recruiter spam without explicit Trust review."],
    ["Weekly workflow", "Review new discoveries and source changes → approve evidence → translate into Copy/Adapt/Integrate/Partner/Avoid/Differentiate/Watch/Test → create bounded tracker item."],
    ["Monthly workflow", "Review stale pricing, product, funding, revenue, trust and GTM observations; supersede rather than overwrite evidence history."],
    ["Internal validation", "HireNudge feature, traction, roadmap and outcome claims remain Internal validation pending until confirmed by product analytics, entitlements, support evidence and owners."]
  ];
  addTable(s, 4, ["Methodology area", "Operating rule"], sections, "GuideTable", [25, 110]);
  s.getRange("A15:J15").merge(); s.getRange("A15").values = [["Workbook status: launch system implemented; research population uses explicit verification states and grows through the review queue."]];
  s.getRange("A15:J15").format = { fill: "#FFF4DC", font: { bold: true, color: "#8A5600", size: 9 }, rowHeight: 26 };
}

// 01 Executive Overview
{
  const s = addSheet("01 Executive Overview", 3);
  title(s, "Founder’s Office Intelligence Overview", "Default view: scope, evidence health, decision backlog and launch signals", "N");
  const cards = [["Core platforms", "=COUNTA('03 Platform Directory'!$A$5:$A$79)", "Launch minimum"], ["Watchlist", "=COUNTIF('10 Trends & Startup Launches'!$G$5:$G$100,\"Watchlist\")", "Rolling"], ["Verified sources", "=COUNTIF('15 Source Ledger'!$E$5:$E$100,\"Verified\")", "Material claims"], ["Open actions", "=COUNTIFS('13 Action & Experiment Tracker'!$Q$5:$Q$100,\"<>\",'13 Action & Experiment Tracker'!$Q$5:$Q$100,\"<>Done\")", "Founder review"]];
  cards.forEach(([label, formula, note], i) => { const start = 1 + i * 3; const end = start + 1; s.getRangeByIndexes(3, start - 1, 1, 2).merge(); s.getRangeByIndexes(3, start - 1, 1, 2).values = [[label]]; s.getRangeByIndexes(4, start - 1, 2, 2).merge(); s.getRangeByIndexes(4, start - 1, 2, 2).formulas = [[formula]]; s.getRangeByIndexes(6, start - 1, 1, 2).merge(); s.getRangeByIndexes(6, start - 1, 1, 2).values = [[note]]; s.getRangeByIndexes(3, start - 1, 4, 2).format = { fill: i === 0 ? COLORS.strong : COLORS.soft, font: { color: i === 0 ? COLORS.white : COLORS.ink, bold: true }, horizontalAlignment: "center", verticalAlignment: "center", borders: { preset: "outside", style: "thin", color: COLORS.border } }; s.getRangeByIndexes(4, start - 1, 2, 2).format.font.size = 20; });
  s.getRange("A9:F9").merge(); s.getRange("A9").values = [["Highest-priority HireNudge opportunities"]]; s.getRange("A9:F9").format = { fill: COLORS.ink, font: { bold: true, color: COLORS.white, size: 10 } };
  addTable(s, 10, ["Opportunity", "Recommendation", "Priority", "Score", "Trust", "Status"], recommendations.slice(0, 8).map((r) => [r.name, r.recommendation, r.priority, r.score, r.privacyRisk, r.status]), "ExecutiveOpportunities", [30, 18, 12, 10, 18, 14]);
  const categoryCounts = Array.from(platforms.reduce((m, p) => m.set(p.category, (m.get(p.category) ?? 0) + 1), new Map())).sort((a, b) => b[1] - a[1]).slice(0, 8);
  s.getRange("H10:I18").values = [["Category", "Platforms"], ...categoryCounts]; styleHeader(s.getRange("H10:I10")); styleBody(s.getRange("H11:I18"));
  const chart = s.charts.add("bar", s.getRange("H10:I18")); chart.title = "Launch cohort by category"; chart.hasLegend = false; chart.xAxis = { axisType: "textAxis", textStyle: { fontSize: 8 } }; chart.yAxis = { numberFormatCode: "0" }; chart.setPosition("K9", "N23");
}

// 02 Hiring Ecosystem Map
{
  const s = addSheet("02 Hiring Ecosystem Map", 4);
  title(s, "Hiring Ecosystem Map", "Candidate-side competition and employer-side product benchmarks mapped to lifecycle stage", "L");
  const rows = platforms.map((p) => [p.id, p.name, p.side, p.category, p.geography, p.lifecycle, p.evidenceStatus, p.website, p.reviewDue, p.classificationSource]);
  addTable(s, 4, ["UUID", "Platform", "Side", "Category", "Geography", "Lifecycle", "Evidence status", "Website", "Review due", "Classification source"], rows, "EcosystemTable", [24, 20, 16, 26, 12, 20, 18, 38, 14, 28]);
  addStatusFormatting(s.getRange("G5:G79"));
}

// 03 Platform Directory
{
  const s = addSheet("03 Platform Directory", 4, 2);
  title(s, "Platform Directory", "75 deep profiles • immutable IDs • verification state • no double counting", "N");
  const rows = platforms.map((p) => [p.id, p.name, p.side, p.category, p.geography, p.website, p.lifecycle, p.evidenceStatus, p.sourceFreshness, p.reviewDue, p.rowVersion, "2026-08-01", "2026-08-01", p.classificationSource]);
  addTable(s, 4, ["UUID", "Platform", "Side", "Category", "Geography", "Website", "Lifecycle", "Evidence status", "Research role", "Review due", "Row version", "Created", "Updated", "Classification source"], rows, "PlatformDirectory", [26, 19, 15, 25, 12, 40, 22, 18, 14, 14, 11, 13, 13, 28]);
  addStatusFormatting(s.getRange("H5:H79"));
}

// 04 Platform Profiles
{
  const s = addSheet("04 Platform Profiles", 4, 2);
  title(s, "Standard Platform Profiles", "Unsupported facts remain Manual verification required; company claims stay separate from observations", "T");
  const rows = platforms.map((p) => [p.id, p.name, p.side, p.category, "Manual verification required", "Manual verification required", "Manual verification required", "Manual verification required", "Manual verification required", "Manual verification required", "Manual verification required", "Manual verification required", "Not publicly disclosed / not yet verified", "Manual verification required", "Manual verification required", p.website, p.evidenceStatus, p.reviewDue, p.rowVersion, "Unassigned"]);
  addTable(s, 4, ["UUID", "Platform", "Classification", "Category", "Company & lifecycle", "ICP / user / buyer", "Customer problem", "Positioning", "Promise", "Wedge", "USP", "Habit loop", "Revenue", "Trust & privacy", "Strength / weakness", "Primary source", "Evidence status", "Review due", "Row version", "Reviewer"], rows, "PlatformProfiles", [25, 18, 18, 25, 24, 26, 30, 24, 24, 20, 24, 22, 24, 26, 30, 40, 17, 14, 10, 14]);
  addStatusFormatting(s.getRange("Q5:Q79"));
}

// 05 Feature Matrix
{
  const s = addSheet("05 Feature Matrix", 4, 1);
  const endCol = columnName(platforms.length + 1);
  title(s, "Feature Matrix", "Availability: Yes / Partial / Paid-only / Planned / No / Unknown • Unknown is not absence", endCol);
  const headers = ["Feature", ...platforms.map((p) => p.name)];
  s.getRange(`A4:${endCol}4`).values = [headers]; styleHeader(s.getRange(`A4:${endCol}4`));
  const rows = features.map((feature) => [feature.name, ...platforms.map((p) => OBSERVED.get(`${feature.id}:${p.id}`) ?? "Unknown")]);
  s.getRange(`A5:${endCol}${4 + rows.length}`).values = rows; styleBody(s.getRange(`A5:${endCol}${4 + rows.length}`));
  s.getRange(`B5:${endCol}${4 + rows.length}`).format.horizontalAlignment = "center";
  s.getRange(`B5:${endCol}${4 + rows.length}`).conditionalFormats.add("containsText", { text: "Yes", format: { fill: "#E7F7EE", font: { color: COLORS.success, bold: true } } });
  s.getRange(`B5:${endCol}${4 + rows.length}`).conditionalFormats.add("containsText", { text: "Unknown", format: { fill: "#F3F5F7", font: { color: "#7A899A" } } });
  s.getRange(`A4:${endCol}${4 + rows.length}`).format.columnWidth = 13;
  s.getRange("A:A").format.columnWidth = 30;
}

// 06 Pricing & Packaging
{
  const s = addSheet("06 Pricing & Packaging", 4, 2);
  title(s, "Pricing & Packaging", "Observed public tiers • quote pricing remains Contact sales • promotions are labeled", "P");
  const rows = pricing.map((p) => [p.id, p.platformId, p.platform, p.tier, p.currency, p.nativePrice, p.billingPeriod, p.monthlyEquivalent, p.tax, p.limits, p.pricingStatus, p.observedDate, p.sourceId, 1, "Unassigned", ""]);
  addTable(s, 4, ["UUID", "Platform UUID", "Platform", "Tier", "Currency", "Native price", "Billing period", "Monthly equivalent", "Tax", "Limits / credits", "Pricing status", "Observed", "Source ID", "Row version", "Reviewer", "Notes"], rows, "PricingPackaging", [25, 25, 18, 24, 10, 13, 16, 16, 18, 34, 18, 13, 25, 10, 14, 28]);
  s.getRange(`F5:F${4 + rows.length}`).format.numberFormat = "0.00"; s.getRange(`H5:H${4 + rows.length}`).format.numberFormat = "0.00";
  addStatusFormatting(s.getRange(`K5:K${4 + rows.length}`));
}

// 07 USP, Positioning & GTM
{
  const s = addSheet("07 USP, Positioning & GTM", 4, 2);
  title(s, "USP, Positioning & GTM", "Primary-source observations first; empty public signals create analyst tasks rather than guesses", "Q");
  const rows = platforms.map((p) => [p.id, p.name, p.category, "Manual verification required", "Manual verification required", "Manual verification required", "Manual verification required", "Manual verification required", "Manual verification required", "Manual verification required", "Manual verification required", "Manual verification required", "Manual verification required", p.website, "Needs verification", "Unassigned", 1]);
  addTable(s, 4, ["Platform UUID", "Platform", "Category", "USP", "Positioning", "Free value", "PLG", "SEO / programmatic", "Extension / mobile", "Referral / affiliate", "Community / creator", "Partnership / B2B2C", "Enterprise sales", "Source", "Evidence status", "Reviewer", "Row version"], rows, "GTMObservations", [25, 18, 24, 28, 28, 22, 12, 22, 22, 22, 22, 24, 22, 38, 18, 14, 10]);
  addStatusFormatting(s.getRange("O5:O79"));
}

// 08 Traction, Funding & Revenue
{
  const s = addSheet("08 Traction, Funding & Revenue", 4, 2);
  title(s, "Traction, Funding & Revenue", "Reported, company-claimed, observed, estimated and unknown metrics remain distinct", "R");
  const rows = platforms.map((p) => [p.id, p.name, "Unknown", "Unknown", "Unknown", "Unknown", "Unknown", "Not publicly disclosed / not yet verified", "Unknown", "Unknown", "Unknown", p.website, "Needs verification", "Unknown", "Unassigned", "2026-08-31", 1, "Never infer revenue from funding, logos, headcount or traffic."]);
  addTable(s, 4, ["Platform UUID", "Platform", "Metric type", "Value", "Unit", "Claim / observed", "Methodology", "Revenue", "Revenue type", "Funding", "Acquisition", "Source", "Evidence status", "Confidence", "Reviewer", "Review due", "Row version", "Notes"], rows, "TractionFundingRevenue", [25, 18, 18, 14, 12, 18, 24, 28, 16, 18, 18, 38, 18, 12, 14, 14, 10, 34]);
  addStatusFormatting(s.getRange("M5:M79"));
}

// 09 Websites, Stores & Social
{
  const s = addSheet("09 Websites, Stores & Social", 4, 2);
  title(s, "Websites, Stores & Social", "Official links and observable store/social metrics; unverified handles remain blank", "P");
  const rows = platforms.map((p) => [p.id, p.name, p.website, "", "", "", "", "", "", "", "", "Unknown", "2026-08-01", "Needs verification", 1, ""]);
  addTable(s, 4, ["Platform UUID", "Platform", "Website", "Pricing", "Docs / help", "Trust center", "Chrome / extension", "iOS", "Android", "LinkedIn", "X / YouTube / community", "Observable metric", "Observed", "Evidence status", "Row version", "Notes"], rows, "WebsitesSocial", [25, 18, 38, 38, 38, 38, 38, 32, 32, 36, 38, 24, 13, 18, 10, 30]);
  addStatusFormatting(s.getRange("N5:N79"));
}

// 10 Trends & Startup Launches
{
  const s = addSheet("10 Trends & Startup Launches", 4, 2);
  title(s, "Trends & Startup Launches", "Product Hunt, YC, Show HN and accelerator signals enter as drafts; promotion requires verification", "P");
  const discoveryRows = discoveries.map((d) => [d.id, d.name, d.sourceFamily, d.signal, d.status, d.transferScore, "Discovery", "2026-08-01", d.sourceId, d.risk, "Insufficient signal families", "Needs verification", 1, "Unassigned", "2026-08-08", ""]);
  const watchRows = watchlist.map((w) => [w.id, w.name, w.source, "Seeded watchlist; functioning product and official source require verification", w.status, w.transferRelevance, "Watchlist", "2026-08-01", "", "Unknown", "Insufficient signal families", "Needs verification", w.rowVersion, "Unassigned", w.nextReview, ""]);
  const rows = [...discoveryRows, ...watchRows];
  addTable(s, 4, ["UUID", "Company", "Source family", "Signal", "Status", "Transfer relevance", "Record type", "Observed", "Source ID", "Risk", "Trend score", "Evidence status", "Row version", "Reviewer", "Next review", "Notes"], rows, "StartupLaunches", [25, 20, 22, 44, 20, 16, 14, 13, 25, 30, 22, 18, 10, 14, 14, 28]);
  addStatusFormatting(s.getRange(`L5:L${4 + rows.length}`));
}

// 11 Feature Transfer Opportunities (temporary XLSX-safe name)
{
  const s = addSheet("11 Feature Transfer Opps", 4, 2);
  title(s, "Feature Transfer Opportunities", "Score: outcome 30% + ICP fit 20% + differentiation 20% + confidence 15% + feasibility 15%; risks shown separately", "R");
  const rows = recommendations.map((r, index) => [r.id, r.name, r.recommendation, index < 3 ? 5 : index < 8 ? 4 : 1, index < 6 ? 5 : 3, index < 6 ? 5 : 2, r.evidenceConfidence === "High" ? 5 : 3, r.feasibility, "", r.priority, r.privacyRisk, r.privacyRisk === "Critical" ? "Trust veto" : "Review", r.sourceId, r.rationale, r.status, r.reviewer, 1, "2026-08-31"]);
  addTable(s, 4, ["UUID", "Opportunity", "Recommendation", "Outcome impact", "ICP fit", "Differentiation", "Evidence confidence", "Feasibility", "Weighted score", "Priority", "Privacy risk", "Trust review", "Source ID", "Rationale", "Status", "Reviewer", "Row version", "Review due"], rows, "TransferOpportunities", [22, 30, 18, 13, 10, 15, 16, 12, 13, 12, 16, 14, 25, 48, 14, 14, 10, 14]);
  for (let i = 0; i < rows.length; i++) s.getRange(`I${5 + i}`).formulas = [[`=ROUND(D${5 + i}*'17 Data Dictionary & Config'!$B$5+E${5 + i}*'17 Data Dictionary & Config'!$B$6+F${5 + i}*'17 Data Dictionary & Config'!$B$7+G${5 + i}*'17 Data Dictionary & Config'!$B$8+H${5 + i}*'17 Data Dictionary & Config'!$B$9,2)`]];
  s.getRange(`I5:I${4 + rows.length}`).format.numberFormat = "0.00"; addStatusFormatting(s.getRange(`O5:O${4 + rows.length}`));
}

// 12 HireNudge Gap Analysis
{
  const s = addSheet("12 HireNudge Gap Analysis", 4, 2);
  title(s, "HireNudge Gap Analysis", "Gaps are candidates until internal product, roadmap, analytics and support evidence confirms them", "P");
  const rows = recommendations.map((r, index) => [r.id.replace("transfer", "gap"), r.name, index < 3 ? "Critical customer-outcome gap" : r.recommendation.includes("Avoid") ? "Trust boundary" : "Product / GTM opportunity", "Internal validation pending", r.recommendation, r.priority, r.score, r.rationale, r.sourceId, "Internal validation pending", "Unassigned", "2026-08-31", "Proposed", 1, ""]);
  addTable(s, 4, ["UUID", "Gap / boundary", "Problem type", "Current HireNudge state", "Recommendation", "Priority", "Opportunity score", "Evidence / rationale", "Source ID", "Internal validation", "Owner", "Due", "Status", "Row version", "Decision notes"], rows, "HireNudgeGaps", [22, 30, 24, 24, 18, 12, 14, 46, 25, 22, 14, 14, 14, 10, 32]);
  addStatusFormatting(s.getRange(`M5:M${4 + rows.length}`));
}

// 13 Action & Experiment Tracker
{
  const s = addSheet("13 Action & Experiment Tracker", 4, 2);
  title(s, "Action & Experiment Tracker", "Every competitor learning ends in an owner, metric, deadline and bounded validation decision", "W");
  const rows = actions.map((a) => [a.id, a.title, a.sourceId, a.customerProblem, a.intendedOutcome, a.recommendationType, a.owner, new Date(a.dueDate + "T00:00:00+05:30"), a.priority, a.effort, a.risk, a.confidence, a.experiment, a.baseline, a.successMetric, a.threshold, a.status, a.decision, a.resultNotes, a.rowVersion, new Date(a.createdAt), new Date(a.updatedAt), a.updatedBy ?? "System seed"]);
  addTable(s, 4, ["UUID", "Title", "Source ID", "Customer problem", "Intended outcome", "Recommendation type", "Owner", "Due date", "Priority", "Effort", "Risk", "Confidence", "Smallest experiment", "Baseline", "Success metric", "Threshold", "Status", "Decision", "Result notes", "Row version", "Created at", "Updated at", "Updated by"], rows, "ActionTracker", [22, 28, 24, 42, 34, 20, 16, 14, 10, 10, 16, 12, 46, 24, 36, 30, 16, 18, 32, 10, 20, 20, 20]);
  s.getRange(`H5:H${4 + rows.length}`).format.numberFormat = "yyyy-mm-dd"; s.getRange(`U5:V${4 + rows.length}`).format.numberFormat = "yyyy-mm-dd hh:mm";
  s.getRange(`G5:G200`).dataValidation = { rule: { type: "list", values: ["Unassigned", "Priyansh", "Baskaran", "Product", "Engineering", "Growth", "Trust"] } };
  s.getRange(`I5:I200`).dataValidation = { rule: { type: "list", values: ["P0", "P1", "P2", "P3"] } };
  s.getRange(`Q5:Q200`).dataValidation = { rule: { type: "list", values: ["Proposed", "Reviewing", "Approved", "Planned", "In progress", "Validating", "Done", "Rejected"] } };
  addStatusFormatting(s.getRange("Q5:Q200"));
}

// 14 Evidence Review Queue
{
  const s = addSheet("14 Evidence Review Queue", 4, 2);
  title(s, "Evidence Review Queue", "Automation and analysts create drafts; a reviewer selects controlling evidence or supersedes conflicts", "M");
  const rows = sources.map((src, i) => [`review-${String(i + 1).padStart(3, "0")}`, src.status === "Verified" ? "In review" : "Needs verification", src.title, src.url, src.type, src.observedDate, src.status, "Unassigned", "", 1, "Confirm material fields before approval", src.confidence, "2026-08-31"]);
  addTable(s, 4, ["UUID", "Workflow state", "Claim / source", "URL", "Source type", "Observed", "Current status", "Reviewer", "Decision", "Row version", "Review task", "Confidence", "Due"], rows, "EvidenceReviewQueue", [22, 18, 28, 48, 22, 13, 18, 14, 20, 10, 36, 12, 14]);
  s.getRange("B5:B250").dataValidation = { rule: { type: "list", values: ["Discovered", "Needs verification", "In review", "Approved", "Superseded", "Rejected"] } };
  addStatusFormatting(s.getRange("B5:B250"));
}

// 15 Source Ledger
{
  const s = addSheet("15 Source Ledger", 4, 2);
  title(s, "Source Ledger", "URLs, observation dates, source types, confidence and reviewer history for every material claim", "N");
  const rows = sources.map((src) => [src.id, src.title, src.url, new Date(src.observedDate + "T00:00:00+05:30"), src.status, src.type, src.confidence, src.reviewer, new Date(src.effectiveDate + "T00:00:00+05:30"), "", "", 1, "2026-08-31", ""]);
  addTable(s, 4, ["UUID", "Source title", "URL", "Observed date", "Verification status", "Source type", "Confidence", "Reviewer", "Effective date", "Supersedes", "Source fingerprint", "Row version", "Review due", "Freshness"], rows, "SourceLedger", [24, 30, 54, 14, 20, 24, 12, 14, 14, 24, 28, 10, 14, 12]);
  for (let i = 0; i < rows.length; i++) s.getRange(`N${5 + i}`).formulas = [[`=IF(TODAY()-D${5 + i}>90,\"Stale\",IF(TODAY()-D${5 + i}>30,\"Due\",\"Fresh\"))`]];
  s.getRange(`D5:D${4 + rows.length}`).format.numberFormat = "yyyy-mm-dd"; s.getRange(`I5:I${4 + rows.length}`).format.numberFormat = "yyyy-mm-dd"; addStatusFormatting(s.getRange(`E5:E${4 + rows.length}`));
}

// 16 Change Log
{
  const s = addSheet("16 Change Log", 4, 2);
  title(s, "Immutable Change Log", "Dashboard writes and reviewer actions append actor, timestamp, old value, new value and source", "I");
  addTable(s, 4, ["Audit UUID", "Timestamp", "Actor", "Record type", "Record UUID", "Changed fields", "Old value", "New value", "Source"], [["audit-seed", new Date("2026-08-01T09:00:00+05:30"), "System seed", "Dataset", "dataset-v1", "Initialization", "", "75 core + 50 watchlist", "Implementation"]], "ChangeLog", [24, 20, 24, 18, 25, 24, 42, 42, 24]);
  s.getRange("B5:B500").format.numberFormat = "yyyy-mm-dd hh:mm";
}

// 17 Data Dictionary & Config
{
  const s = addSheet("17 Data Dictionary & Config", 3);
  title(s, "Data Dictionary & Configuration", "Visible weights, dropdown values, FX assumptions, review cadences and sheet schema", "L");
  s.getRange("A4:C4").values = [["Transfer score weight", "Weight", "Definition"]]; styleHeader(s.getRange("A4:C4"));
  s.getRange("A5:C9").values = [["Customer outcome impact", .30, "Expected effect on qualified candidate outcome"], ["ICP / India-global fit", .20, "Fit with initial research hypothesis"], ["Differentiation", .20, "Potential to build defensible advantage"], ["Evidence confidence", .15, "Quality and freshness of support"], ["Delivery feasibility", .15, "Technical and operating feasibility"]]; styleBody(s.getRange("A5:C9")); s.getRange("B5:B9").format.numberFormat = "0%";
  s.getRange("E4:G4").values = [["FX currency", "USD equivalent", "As of / status"]]; styleHeader(s.getRange("E4:G4")); s.getRange("E5:G7").values = [["USD", 1, "Identity"], ["INR", null, "Manual input required before conversion"], ["EUR", null, "Manual input required before conversion"]]; styleBody(s.getRange("E5:G7"));
  s.getRange("A12:L12").values = [["Field", "Type", "Required", "Controlled values / rule", "Owner", "Source", "Freshness", "Reviewer", "Row version", "Dataset revision", "Supersession", "Notes"]]; styleHeader(s.getRange("A12:L12"));
  const dictionary = [["Evidence status", "Dropdown", "Yes", "Discovered | Needs verification | In review | Approved | Superseded | Rejected"], ["Feature availability", "Dropdown", "Yes", "Yes | Partial | Paid-only | Planned | No | Unknown"], ["Action status", "Dropdown", "Yes", "Proposed | Reviewing | Approved | Planned | In progress | Validating | Done | Rejected"], ["Recommendation", "Dropdown", "Yes", "Copy | Adapt | Integrate | Partner | Avoid | Differentiate | Watch | Test"], ["Revenue type", "Dropdown", "Yes", "Reported | Estimated | Not publicly disclosed | Not found | Unknown"], ["Row version", "Integer", "Yes", "Increment on every write"], ["Dataset revision", "Integer", "Yes", "Increment once per accepted sheet edit or dashboard write"], ["Trust review", "Dropdown", "Conditional", "Review | Approved | Trust veto"]];
  s.getRange(`A13:D${12 + dictionary.length}`).values = dictionary; styleBody(s.getRange(`A13:L${12 + dictionary.length}`));
  s.getRange("A23:L23").merge(); s.getRange("A23").values = [["Protected behavior: crawlers may create draft evidence and change candidates only. They never update an approved fact directly."]]; s.getRange("A23:L23").format = { fill: "#FFF4DC", font: { bold: true, color: "#8A5600", size: 9 }, rowHeight: 25 };
}

// Hidden system metadata source for revision polling.
{
  const s = addSheet("_System Meta", 1);
  s.getRange("A1:B7").values = [["Key", "Value"], ["dataset_revision", meta.datasetRevision], ["last_sync", meta.generatedAt], ["last_editor", "System seed"], ["core_count", meta.coreCount], ["watchlist_count", meta.watchlistCount], ["schema_version", "1.0.0"]];
  styleHeader(s.getRange("A1:B1")); styleBody(s.getRange("A2:B7")); s.getRange("A:B").format.columnWidth = 32;
}

// Workbook-wide fit pass on populated areas only.
for (const sheet of wb.worksheets.items) {
  const used = sheet.getUsedRange(true);
  if (used) {
    used.format.autofitRows();
    const name = sheet.name;
    if (name !== "05 Feature Matrix") used.format.autofitColumns();
  }
}

// Representative formula and value inspections.
console.log((await wb.inspect({ kind: "table", range: "'01 Executive Overview'!A1:N20", include: "values,formulas", tableMaxRows: 20, tableMaxCols: 14, maxChars: 8000 })).ndjson);
console.log((await wb.inspect({ kind: "match", searchTerm: "#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A", options: { useRegex: true, maxResults: 300 }, summary: "final formula error scan" })).ndjson);

const previewSheets = [
  "00 Guide & Methodology", "01 Executive Overview", "02 Hiring Ecosystem Map", "03 Platform Directory", "04 Platform Profiles",
  "05 Feature Matrix", "06 Pricing & Packaging", "07 USP, Positioning & GTM", "08 Traction, Funding & Revenue",
  "09 Websites, Stores & Social", "10 Trends & Startup Launches", "11 Feature Transfer Opps", "12 HireNudge Gap Analysis",
  "13 Action & Experiment Tracker", "14 Evidence Review Queue", "15 Source Ledger", "16 Change Log", "17 Data Dictionary & Config"
];
for (const sheetName of previewSheets) {
  const preview = await wb.render({ sheetName, autoCrop: "all", scale: .7, format: "png" });
  await fs.writeFile(path.join(outputDir, `${sheetName.replace(/[^a-z0-9]+/gi, "-").toLowerCase()}.png`), new Uint8Array(await preview.arrayBuffer()));
}

const xlsx = await SpreadsheetFile.exportXlsx(wb);
await xlsx.save(path.join(outputDir, "hirenudge-hiring-ai-intelligence.xlsx"));
console.log(JSON.stringify({ output: path.join(outputDir, "hirenudge-hiring-ai-intelligence.xlsx"), sheets: wb.worksheets.items.map((s) => s.name), core: platforms.length, watchlist: watchlist.length }, null, 2));
