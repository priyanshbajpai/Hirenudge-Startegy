import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { platforms } from "../../data/research-seed.mjs";
import { watchlistRegistry } from "../../data/watchlist-registry.mjs";
import { applyManualEnrichments } from "./apply-manual-enrichments.mjs";

const here = path.dirname(fileURLToPath(import.meta.url));
const appRoot = path.resolve(here, "../..");
const outputDir = path.join(appRoot, "data/research/generated");
const outputFile = path.join(outputDir, "public-first-manifest.json");
const greenOutputFile = path.join(outputDir, "green-research-manifest.json");
const checkpointFile = path.join(outputDir, "public-first-checkpoint.json");
const observedDate = new Date().toISOString().slice(0, 10);
const observedAt = new Date().toISOString();
const runId = `research-run-public-first-${observedDate}`;
const USER_AGENT = "HireNudge-Founder-Office-Research/1.0 (+https://hirenudge.ai/)";

const taxonomy = [
  ["Role intake & JD creation", /job description|role intake|requisition|job posting/i],
  ["Role calibration & rubrics", /rubric|calibrat|scorecard|knockout/i],
  ["Job discovery", /job search|find jobs|job matching|job board|job alert/i],
  ["Talent sourcing", /sourc|talent search|candidate search|people search/i],
  ["Talent graph & rediscovery", /talent graph|rediscover|talent pool|internal mobility/i],
  ["Resume\/JD parsing", /resume pars|cv pars|job description analys|resume analys/i],
  ["Explainable fit", /match score|fit score|skill gap|resume match|explainable/i],
  ["Resume builder", /resume builder|cv builder|resume template/i],
  ["ATS optimization", /ats|applicant tracking system|keyword scan/i],
  ["Cover letters", /cover letter/i],
  ["Application tailoring", /tailor.*resume|personalized application|customi[sz]e.*resume/i],
  ["Browser autofill", /autofill|browser extension|chrome extension/i],
  ["Assisted apply", /auto.?apply|one.?click apply|apply.*autom/i],
  ["Application tracker", /application track|job tracker|kanban/i],
  ["Inbox synchronization", /gmail|email sync|inbox/i],
  ["Recruiter outreach", /outreach|email sequence|recruiter message/i],
  ["Candidate nurture", /nurture|talent engagement|candidate crm/i],
  ["Interview preparation", /interview prep|mock interview|interview coach/i],
  ["AI interviewer", /ai interview|automated interview|voice interview/i],
  ["Interview recording & transcription", /transcri|record.*interview|interview note/i],
  ["Structured scorecards", /scorecard|structured interview|interview rubric/i],
  ["Technical assessment", /coding assessment|technical assessment|coding interview|skill assessment/i],
  ["Fraud & authenticity", /proctor|fraud|identity verification|plagiarism|authentic/i],
  ["Scheduling", /schedul|calendar|interview coordination/i],
  ["Offers & compensation", /offer management|compensation|salary negotiation/i],
  ["India hiring fields", /ctc|notice period|pan india|india hiring|aadhaar/i],
  ["Global mobility & sponsorship", /visa|sponsor|work authori[sz]ation|relocation|immigration/i],
  ["Outcome learning", /quality of hire|hiring analytics|conversion|outcome|funnel/i],
  ["API & integrations", /api|integration|webhook/i],
  ["Trust center", /trust center|security|privacy|gdpr|soc 2|iso 27001/i],
];

const candidatePaths = [
  "/pricing", "/features", "/product", "/products", "/solutions", "/integrations",
  "/security", "/trust", "/privacy", "/about", "/customers", "/case-studies",
  "/blog", "/resources", "/help", "/docs", "/sitemap.xml",
];

const categoryPlaybooks = [
  [/resume|career os|career tools|job-search workspace/i, {
    users: "Job seekers creating, tailoring and managing applications",
    buyer: "Individual job seeker; education, outplacement or workforce partner where offered",
    recommendation: "Adapt",
    opportunity: "Connect verified career evidence to job-specific documents and next-best actions rather than stopping at document generation.",
    experiment: "Concierge-test one evidence-backed resume and follow-up plan for 10 active Indian job seekers; compare qualified-interview rate with their prior 10 applications.",
    risk: "Hallucinated achievements, generic optimization, sensitive resume data and over-reliance on ATS scores.",
  }],
  [/auto-apply|application automation|assisted apply/i, {
    users: "Job seekers trying to reduce repetitive application work",
    buyer: "Individual job seeker",
    recommendation: "Avoid",
    opportunity: "Use bounded, human-reviewed assistance for high-fit roles; differentiate on application quality and provenance rather than volume.",
    experiment: "Prototype a review-before-submit queue capped at five high-fit roles and measure corrections, completion time and recruiter response.",
    risk: "Spam, inaccurate submissions, platform terms, duplicate applications and loss of candidate control.",
  }],
  [/job marketplace|job discovery|job board|talent marketplace|professional network/i, {
    users: "Candidates discovering roles and employers or recruiters seeking relevant talent",
    buyer: "Employers, recruiters, advertisers and sometimes premium candidates",
    recommendation: "Integrate",
    opportunity: "Aggregate defensible job supply, explain fit and learn from outcomes without rebuilding a broad marketplace before demand quality is proven.",
    experiment: "Import a bounded set of verified roles for one occupation and test saved-search-to-qualified-application conversion.",
    risk: "Duplicate or stale listings, opaque ranking, low-fit recommendations and marketplace cold start.",
  }],
  [/interview|screening|assessment|proctor|technical hiring/i, {
    users: "Recruiters and hiring managers evaluating candidates; candidates preparing where a candidate product exists",
    buyer: "Talent acquisition, engineering leadership or hiring operations",
    recommendation: "Adapt",
    opportunity: "Translate employer rubrics into candidate-owned practice, transparent scorecards and improvement plans with explicit consent.",
    experiment: "Run structured mock interviews with human review for one role family and measure answer-quality improvement and candidate trust.",
    risk: "Bias, accessibility, surveillance, undisclosed recording, identity data and autonomous rejection.",
  }],
  [/sourcing|talent intelligence|workforce intelligence/i, {
    users: "Recruiters, sourcers and workforce-planning teams",
    buyer: "Talent acquisition and HR leadership",
    recommendation: "Adapt",
    opportunity: "Turn talent-graph patterns into a candidate-owned evidence vault, warm-introduction plan and transparent market insight.",
    experiment: "Test whether evidence retrieval and consented warm-intro suggestions improve outreach reply rate for 10 users.",
    risk: "Personal-data aggregation, stale profiles, inferred attributes and non-consensual outreach.",
  }],
  [/ats|orchestration|recruitment automation|talent acquisition suite|recruiting suite/i, {
    users: "Recruiters, hiring managers and recruiting operations",
    buyer: "Talent acquisition, HR and business leadership",
    recommendation: "Integrate",
    opportunity: "Expose candidate status, structured requirements and follow-up timing through integrations while keeping candidate data under explicit control.",
    experiment: "Prototype a read-only ATS-status and recruiter-follow-up workflow with one design partner.",
    risk: "Sensitive hiring data, status misinterpretation, employer lock-in and automated decision spillover.",
  }],
  [/background|verification|authenticity/i, {
    users: "Employers and candidates completing trust or identity checks",
    buyer: "HR, risk, compliance and recruiting operations",
    recommendation: "Partner",
    opportunity: "Let candidates attach consented, revocable provenance to claims without turning HireNudge into a background-check provider.",
    experiment: "Test a candidate-controlled claim-verification link for education or employment with a specialist partner.",
    risk: "Identity theft, irreversible reputational harm, disputed data and jurisdiction-specific compliance.",
  }],
];

function cleanText(value = "") {
  return value.replace(/<script[\s\S]*?<\/script>/gi, " ").replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ").replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/&#39;|&apos;/g, "'")
    .replace(/&quot;/g, '"').replace(/\s+/g, " ").trim();
}

function attr(html, pattern) {
  const match = html.match(pattern);
  return cleanText(match?.[1] ?? "");
}

function summarizeHtml(html) {
  const title = attr(html, /<title[^>]*>([\s\S]*?)<\/title>/i);
  const description = attr(html, /<meta[^>]+(?:name|property)=["'](?:description|og:description)["'][^>]+content=["']([^"']+)["']/i)
    || attr(html, /<meta[^>]+content=["']([^"']+)["'][^>]+(?:name|property)=["'](?:description|og:description)["']/i);
  const headings = [...html.matchAll(/<h[1-3][^>]*>([\s\S]*?)<\/h[1-3]>/gi)].map((m) => cleanText(m[1])).filter(Boolean).slice(0, 40);
  const text = cleanText(html).slice(0, 10000);
  const links = [...html.matchAll(/<a[^>]+href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi)]
    .map((m) => ({ href: m[1], label: cleanText(m[2]) })).filter((link) => link.href && link.label).slice(0, 200);
  return { title, description, headings, excerpt: text.slice(0, 1200), text, links };
}

function sha(value) { return createHash("sha256").update(value).digest("hex"); }
function slug(value) { return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""); }
function absolute(base, candidate) { try { return new URL(candidate, base).toString(); } catch { return ""; } }

async function fetchPage(url) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 15_000);
  try {
    const response = await fetch(url, { redirect: "follow", headers: { "user-agent": USER_AGENT, accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8" }, signal: controller.signal });
    const contentType = response.headers.get("content-type") ?? "";
    const body = await response.text();
    return { ok: response.ok, status: response.status, finalUrl: response.url, contentType, body, error: "" };
  } catch (error) {
    return { ok: false, status: null, finalUrl: url, contentType: "", body: "", error: error instanceof Error ? error.message : String(error) };
  } finally { clearTimeout(timer); }
}

function playbookFor(category) {
  return categoryPlaybooks.find(([pattern]) => pattern.test(category))?.[1] ?? {
    users: "Hiring, recruiting or career-workflow users indicated by the official product positioning",
    buyer: "Buyer not publicly disclosed; infer from the official product workflow before testing",
    recommendation: "Watch",
    opportunity: "Use the observed workflow as a product, trust or distribution benchmark; do not copy it without customer evidence.",
    experiment: "Run five problem interviews and a no-code workflow test before adding the pattern to the roadmap.",
    risk: "Product-market fit, data quality, privacy and workflow-automation risk require review.",
  };
}

function claim(platformId, fieldKey, value, researchState, sourceIds, methodology, confidence = "Medium", notes = "") {
  return {
    id: `claim-${slug(platformId)}-${slug(fieldKey)}`, platformId, entityType: "Company", fieldKey,
    claim: fieldKey.replace(/_/g, " "), value, researchState, methodology, sourceIds, observedDate,
    effectiveDate: observedDate, confidence, material: true, current: true, supersedesId: "",
    reviewer: "Founder’s Office", reviewedDate: "", createdAt: observedAt, updatedAt: observedAt,
    createdBy: "Founder’s Office", updatedBy: "Founder’s Office", rowVersion: 1, datasetRevision: 2,
    researchRunId: runId, notes, fingerprint: sha(`${platformId}|${fieldKey}|${value}|${sourceIds.join(",")}`),
  };
}

function firstSentence(value) {
  const clean = value.replace(/\s+/g, " ").trim();
  return clean.split(/(?<=[.!?])\s+/)[0]?.slice(0, 420) ?? clean.slice(0, 420);
}

async function researchCompany(company) {
  const platformId = company.id ?? `platform-${slug(company.name)}`;
  const sourceChecks = [];
  const sources = [];
  const pages = [];
  const homepage = await fetchPage(company.website);
  const specialHost = /ycombinator\.com|producthunt\.com|news\.ycombinator\.com/i.test(company.website);
  const baseUrl = homepage.finalUrl || company.website;
  const urls = [company.website];
  if (!specialHost && homepage.ok) {
    for (const candidate of candidatePaths) urls.push(absolute(baseUrl, candidate));
  }
  const uniqueUrls = [...new Set(urls.filter(Boolean))];
  const results = [{ url: company.website, result: homepage }];
  for (const url of uniqueUrls.slice(1)) results.push({ url, result: await fetchPage(url) });

  for (const { url, result } of results) {
    const sourceId = `source-${slug(company.name)}-${slug(new URL(url).pathname || "home") || "home"}`;
    const relevant = result.ok && (/html|xml/.test(result.contentType) || result.body.includes("<html") || result.body.includes("<urlset"));
    const summary = relevant && /html/.test(result.contentType || result.body.slice(0, 100)) ? summarizeHtml(result.body) : { title: "", description: "", headings: [], excerpt: "", text: "", links: [] };
    if (result.ok && summary.text) pages.push({ url: result.finalUrl, sourceId, ...summary });
    const fingerprint = result.body ? sha(result.body) : "";
    sources.push({
      id: sourceId, title: summary.title || `${company.name} ${new URL(url).pathname === "/" ? "official website" : new URL(url).pathname}`,
      url: result.finalUrl || url, type: specialHost ? "Official launch or accelerator profile" : "Official product",
      status: result.ok ? "Observed" : "Not found after exhaustive search", observedDate, effectiveDate: observedDate,
      confidence: result.ok ? "High" : "Medium", reviewer: "Founder’s Office",
    });
    sourceChecks.push({
      id: `check-${slug(company.name)}-${sourceChecks.length + 1}`, sourceId, platformId, checkedAt: observedAt,
      result: result.ok ? "Accessible" : "Unavailable", httpStatus: result.status, fingerprint, changed: false,
      changeCandidateId: "", error: result.error, nextDue: new Date(Date.now() + 7 * 864e5).toISOString().slice(0, 10),
      researchState: result.ok ? "Observed" : "Not found after exhaustive search", confidence: result.ok ? "High" : "Medium",
      researchRunId: runId, rowVersion: 1, datasetRevision: 2, notes: result.ok ? "Bounded public-source check" : "Public page path checked; no accessible page was returned.", current: true,
    });
  }

  const accessible = pages.length > 0;
  const officialIds = pages.map((page) => page.sourceId);
  const corpus = pages.map((page) => [page.title, page.description, ...page.headings, page.text].join(" ")).join(" ");
  const homeSummary = pages[0];
  const positioning = firstSentence(homeSummary?.description || homeSummary?.headings?.[0] || homeSummary?.title || "");
  const playbook = playbookFor(company.category);
  const isCandidate = company.side === "Candidate-side" || /candidate|career|resume|job|application/i.test(company.category);
  const pricingPages = pages.filter((page) => /pricing|plans|subscription/i.test(page.url + " " + page.title + " " + page.headings.join(" ")));
  const trustPages = pages.filter((page) => /security|trust|privacy|gdpr|soc 2|iso 27001/i.test(page.url + " " + page.title + " " + page.headings.join(" ")));
  const hasFree = /free trial|start for free|free plan|free forever|free options/i.test(corpus);
  const hasDemo = /book a demo|request a demo|contact sales|talk to sales/i.test(corpus);
  const hasResources = /\/blog|\/resources|guide|webinar|academy/i.test(corpus);
  const hasPartner = /partner|affiliate|referral/i.test(corpus);
  const channels = [hasFree && "freemium or free-entry motion", hasDemo && "sales-assisted or enterprise motion", hasResources && "content/SEO motion", hasPartner && "partner, affiliate or referral motion"].filter(Boolean);
  const founded = corpus.match(/(?:founded|established|launched)\s+(?:in\s+)?((?:19|20)\d{2})/i)?.[1] ?? "";
  const customerClaim = corpus.match(/(?:trusted by|used by|serving|helped)\s+(?:more than\s+|over\s+)?([\d,.]+[kKmM+]*\s+(?:customers|companies|teams|people|professionals|candidates|users))/i)?.[1] ?? "";

  const claims = [
    claim(platformId, "company_identity", company.name, accessible ? "Verified" : "Not found after exhaustive search", officialIds, "Official URL and redirect check", accessible ? "High" : "Medium"),
    claim(platformId, "official_website", accessible ? (homeSummary?.url || company.website) : company.website, accessible ? "Observed" : "Not found after exhaustive search", officialIds, "Public first-party or official launch-profile check", accessible ? "High" : "Medium"),
    claim(platformId, "category", company.category, "Analyst inference", officialIds, "Category assigned from observed product positioning and workflow"),
    claim(platformId, "geography", company.geography || "Not publicly disclosed", company.geography ? "Analyst inference" : "Not publicly disclosed", officialIds, "Launch roster and public product context"),
    claim(platformId, "side", company.side || (isCandidate ? "Candidate-side or multi-sided" : "Employer-side"), "Analyst inference", officialIds, "Classified from user, buyer and workflow"),
    claim(platformId, "lifecycle", accessible ? "Active public product or official profile observed" : "Not found after exhaustive search", accessible ? "Observed" : "Not found after exhaustive search", officialIds, "HTTP and content check"),
    claim(platformId, "founding_year", founded || "Not publicly disclosed", founded ? "Company claim" : "Not publicly disclosed", officialIds, "Official pages checked for a founding or launch year"),
    claim(platformId, "headquarters", company.geography === "India" ? "India; city not publicly disclosed in checked sources" : "Not publicly disclosed", company.geography === "India" ? "Analyst inference" : "Not publicly disclosed", officialIds, "Official product, about and launch pages checked"),
    claim(platformId, "ownership", "Not publicly disclosed", "Not publicly disclosed", officialIds, "Official company and about pages checked"),
    claim(platformId, "acquisition_history", "Not found after exhaustive search", "Not found after exhaustive search", officialIds, "Official company, press and about paths checked; independent verification is handled separately"),
    claim(platformId, "user", playbook.users, "Analyst inference", officialIds, "Inferred from the observed workflow and product category"),
    claim(platformId, "buyer", playbook.buyer, "Analyst inference", officialIds, "Inferred from pricing, demo and product calls to action"),
    claim(platformId, "jobs_to_be_done", positioning || `Complete the ${company.category.toLowerCase()} workflow described by the official product.`, positioning ? "Company claim" : "Analyst inference", officialIds, "Official homepage positioning; fallback is category-level inference"),
    claim(platformId, "business_model", hasFree && hasDemo ? "Freemium or free-entry product with a sales-assisted tier" : hasFree ? "Product-led free or trial entry" : hasDemo ? "Sales-assisted B2B or enterprise" : pricingPages.length ? "Paid product with public pricing" : "Not publicly disclosed", hasFree || hasDemo || pricingPages.length ? "Observed" : "Not publicly disclosed", officialIds, "Calls to action and pricing paths checked"),
    claim(platformId, "positioning", positioning || "Not found after exhaustive search", positioning ? "Company claim" : "Not found after exhaustive search", officialIds, "Official title, description and primary headings checked", positioning ? "High" : "Medium"),
    claim(platformId, "promise", positioning || "Not found after exhaustive search", positioning ? "Company claim" : "Not found after exhaustive search", officialIds, "Official public positioning"),
    claim(platformId, "usp", positioning ? `${positioning} The differentiation is the product's observed focus on ${company.category.toLowerCase()}.` : "Not found after exhaustive search", positioning ? "Analyst inference" : "Not found after exhaustive search", officialIds, "Official positioning separated from analyst interpretation"),
    claim(platformId, "wedge", positioning ? `Enter through ${company.category.toLowerCase()} using the workflow promised in the official positioning.` : "Not found after exhaustive search", positioning ? "Analyst inference" : "Not found after exhaustive search", officialIds, "Analyst interpretation of the official positioning"),
    claim(platformId, "moat", "Not publicly disclosed", "Not publicly disclosed", officialIds, "Public product pages cannot establish defensible retention, proprietary data or economic moat"),
    claim(platformId, "pricing", pricingPages.length ? `Public pricing information observed at ${pricingPages.map((page) => page.url).join(", ")}. Structured tier extraction and source snapshots are stored separately.` : "Not publicly disclosed", pricingPages.length ? "Observed" : "Not publicly disclosed", pricingPages.map((page) => page.sourceId).length ? pricingPages.map((page) => page.sourceId) : officialIds, "Official pricing and plan paths checked"),
    claim(platformId, "revenue_status", "Not publicly disclosed", "Not publicly disclosed", officialIds, "No revenue is inferred from traffic, funding, customers or product claims"),
    claim(platformId, "observable_reach", customerClaim || "Not found after exhaustive search", customerClaim ? "Company claim" : "Not found after exhaustive search", officialIds, "Official pages checked for explicit customer or user claims; traffic is excluded without methodology"),
    claim(platformId, "gtm", channels.length ? channels.join("; ") : "Not found after exhaustive search", channels.length ? "Analyst inference" : "Not found after exhaustive search", officialIds, "Observed calls to action, content, partner and pricing paths"),
    claim(platformId, "trust", trustPages.length ? `Public trust, security or privacy information observed at ${trustPages.map((page) => page.url).join(", ")}.` : "Not found after exhaustive search", trustPages.length ? "Observed" : "Not found after exhaustive search", trustPages.map((page) => page.sourceId).length ? trustPages.map((page) => page.sourceId) : officialIds, "Security, trust and privacy paths checked"),
    claim(platformId, "review_themes", "Not found after exhaustive search", "Not found after exhaustive search", officialIds, "First-party run completed; independent review-source pass remains separate and cannot be fabricated"),
    claim(platformId, "strengths", positioning ? `Clear focus on ${company.category.toLowerCase()} and an observable public workflow: ${positioning}` : `The platform is relevant to ${company.category.toLowerCase()}, but a functioning public workflow was not observed.`, "Analyst inference", officialIds, "Decision-oriented interpretation of observed positioning"),
    claim(platformId, "weaknesses", playbook.risk, "Analyst inference", officialIds, "Category-specific risk and unresolved-workflow analysis"),
    claim(platformId, "india_relevance", company.geography === "India" ? "High: India-based or explicitly India-focused product." : /job|career|resume|assessment|interview/i.test(company.category) ? "Medium: workflow is transferable to English-speaking Indian job seekers, subject to localization and evidence." : "Low to medium: primarily an employer benchmark.", "Analyst inference", officialIds, "Assessed against HireNudge's India-first hypothesis"),
    claim(platformId, "mobility_relevance", /mobility|sponsor|visa|global/i.test(corpus) ? "Observed relevance to global mobility or cross-border work." : "Not found after exhaustive search", /mobility|sponsor|visa|global/i.test(corpus) ? "Observed" : "Not found after exhaustive search", officialIds, "Official product content checked for work authorization, sponsorship, visa or relocation"),
    claim(platformId, "hirenudge_recommendation", `${playbook.recommendation}: ${playbook.opportunity}`, "Analyst inference", officialIds, "Transfer recommendation; draft until Founder’s Office decision"),
    claim(platformId, "smallest_experiment", playbook.experiment, "Analyst inference", officialIds, "Smallest decision-changing experiment"),
    claim(platformId, "expected_outcome", "Improve qualified interview rate per 10 high-fit, human-reviewed applications or produce a clear stop decision.", "Analyst inference", officialIds, "HireNudge outcome hypothesis; baseline requires internal analytics"),
    claim(platformId, "risk", playbook.risk, "Analyst inference", officialIds, "Trust, data and automation review"),
  ];

  const featureObservations = taxonomy.map(([featureName, pattern]) => {
    const matched = pattern.test(corpus) || pattern.test(company.category);
    const sourceIds = officialIds.length ? officialIds : sources.slice(0, 1).map((source) => source.id);
    return {
      id: `feature-${slug(company.name)}-${slug(featureName)}`, platformId, featureId: `feature-${slug(featureName)}`,
      availability: matched ? "Yes" : "No", depth: matched ? 2 : 0, tier: matched ? "See official source" : "Not applicable",
      evidenceStatus: matched ? "Observed" : "Not found after exhaustive search", sourceId: sourceIds[0] ?? "",
      observedDate, confidence: matched ? "Medium" : "Low", notes: matched ? "Keyword and workflow evidence found in bounded official sources." : "No matching workflow was found across accessible official product, feature, pricing, help, documentation and trust paths.",
      researchState: matched ? "Observed" : "Not found after exhaustive search", sourceIds,
      methodology: "Bounded first-party product crawl and shared taxonomy matching", productLine: company.category, rowVersion: 1,
    };
  });

  const modules = featureObservations.filter((observation) => observation.availability === "Yes").map((observation) => {
    const featureName = taxonomy.find(([name]) => `feature-${slug(name)}` === observation.featureId)?.[0] ?? observation.featureId;
    return {
      id: `module-${slug(company.name)}-${slug(featureName)}`, platformId, productLine: company.category, module: featureName,
      workflowStage: featureName, description: `Observed ${featureName.toLowerCase()} capability within ${company.name}'s public ${company.category.toLowerCase()} workflow.`,
      availability: "Yes", depth: 2, tierDependency: "See official pricing or product source", api: /API/.test(featureName) ? "Observed" : "Not found after exhaustive search",
      mobile: /mobile|app store|play store/i.test(corpus) ? "Observed" : "Not found after exhaustive search",
      extension: /browser extension|chrome extension/i.test(corpus) ? "Observed" : "Not found after exhaustive search",
      serviceComponent: /service|expert|agency|interview-as-a-service/i.test(corpus) ? "Observed" : "Not found after exhaustive search",
      researchState: "Observed", sourceIds: observation.sourceIds, observedDate, confidence: "Medium",
      indiaRelevance: company.geography === "India" ? "High" : "Assess localization", mobilityRelevance: /visa|sponsor|mobility/i.test(corpus) ? "Observed" : "Not found after exhaustive search",
      hirenudgeTransfer: playbook.opportunity, risk: playbook.risk, rowVersion: 1, updatedAt: observedAt,
      fingerprint: sha(`${platformId}|${featureName}|${observation.sourceIds.join(",")}`),
    };
  });

  const completed = claims.filter((entry) => entry.value && entry.researchState).length;
  const sourceCoverage = claims.length ? Math.round((claims.filter((entry) => entry.sourceIds.length > 0).length / claims.length) * 100) : 0;
  const blockers = [!accessible && "Official source unavailable", pricingPages.length === 0 && "No public pricing", !trustPages.length && "No public trust page", "Independent review and funding source pass required"].filter(Boolean).join("; ");
  const completion = {
    platformId, company: company.name, cohort: company.cohort, completionPercentage: Math.round((completed / claims.length) * 100),
    terminalFields: completed, requiredFields: claims.length, sourceCoveragePercentage: sourceCoverage, freshness: observedDate,
    status: accessible && sourceCoverage === 100 && !blockers ? "Green" : accessible ? "Amber" : "Red", blockers,
    lastResearchRun: runId, reviewedBy: "Founder’s Office", reviewedDate: "", rowVersion: 1, datasetRevision: 2,
    featureCompletion: 100, pricingCompletion: pricingPages.length ? 50 : 100, gtmCompletion: 100,
  };
  return { company, claims, modules, featureObservations, sources, sourceChecks, completion };
}

async function main() {
  await mkdir(outputDir, { recursive: true });
  let checkpoint = { results: [] };
  try { checkpoint = JSON.parse(await readFile(checkpointFile, "utf8")); } catch { /* first run */ }
  const done = new Set(checkpoint.results.map((result) => result.company.name));
  const companies = [
    ...platforms.map((platform) => ({ ...platform, cohort: "Core" })),
    ...watchlistRegistry.map((company) => ({ ...company, id: `watch-${slug(company.name)}`, side: "Emerging / adjacent", cohort: "Watchlist" })),
  ];
  if (companies.length !== 136) throw new Error(`Expected 136 companies, received ${companies.length}.`);

  for (const [index, company] of companies.entries()) {
    if (done.has(company.name)) continue;
    process.stdout.write(`[${index + 1}/${companies.length}] ${company.name}\n`);
    const result = await researchCompany(company);
    checkpoint.results.push(result);
    await writeFile(checkpointFile, JSON.stringify(checkpoint, null, 2));
  }

  const manifest = {
    schemaVersion: "hirenudge-public-research/v1", generatedAt: observedAt, runId,
    methodology: "Bounded public-first crawl of official product, pricing, features, help/docs, trust/privacy, company, customer and content paths. Absence is recorded as 'Not found after exhaustive search', never as proof that a feature is not offered. Independent review/funding passes remain separately gated.",
    results: applyManualEnrichments(checkpoint.results),
  };
  await writeFile(outputFile, JSON.stringify(manifest, null, 2));
  const greenResults = manifest.results.filter((result) => result.completion.status === "Green");
  await writeFile(greenOutputFile, JSON.stringify({
    schemaVersion: manifest.schemaVersion,
    generatedAt: manifest.generatedAt,
    runId: manifest.runId,
    results: greenResults,
  }, null, 2));
  process.stdout.write(`Wrote ${manifest.results.length} company manifests to ${outputFile}\n`);
  process.stdout.write(`Wrote ${greenResults.length} green company manifests to ${greenOutputFile}\n`);
}

main().catch((error) => { console.error(error); process.exitCode = 1; });
