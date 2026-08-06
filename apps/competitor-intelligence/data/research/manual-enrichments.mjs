import { candidateCohortEnrichments } from "./candidate-cohort-enrichments.mjs";
import { candidateAutomationEnrichments } from "./candidate-automation-enrichments.mjs";
import { candidateExpansionEnrichments } from "./candidate-expansion-enrichments.mjs";

const tealSources = [
  { id: "source-teal-pricing", title: "Teal+ pricing and feature comparison", url: "https://www.tealhq.com/pricing", type: "Official pricing", status: "Company claim", confidence: "High" },
  { id: "source-teal-help", title: "Teal vs Teal+ knowledge-base comparison", url: "https://help.tealhq.com/en/articles/9530153-teal-vs-teal", type: "Official help", status: "Observed", confidence: "High", effectiveDate: "2025-09-22" },
  { id: "source-teal-chrome", title: "Teal Job Search Companion — Chrome Web Store", url: "https://chromewebstore.google.com/detail/teal-job-search-companion/opafjjlpbiaicbbgifbejoochmmeikep", type: "App store", status: "Observed", confidence: "High" },
  { id: "source-teal-techcrunch", title: "Teal raises $5M to help people land a job", url: "https://techcrunch.com/2020/07/08/tealhq-with-5-million-in-funding-looks-to-help-people-land-a-job/", type: "Credible press", status: "Observed", confidence: "High", effectiveDate: "2020-07-08" },
  { id: "source-teal-crunchbase", title: "Teal company profile", url: "https://www.crunchbase.com/organization/teal-d505", type: "Funding database", status: "Third-party estimate", confidence: "Medium" },
  { id: "source-teal-trustpilot", title: "Teal customer reviews", url: "https://www.trustpilot.com/review/tealhq.com", type: "Review platform", status: "Observed", confidence: "Medium" },
  { id: "source-teal-privacy", title: "Teal privacy policy", url: "https://www.tealhq.com/privacy-policy", type: "Official privacy", status: "Company claim", confidence: "High", effectiveDate: "2026-01-21" },
  { id: "source-teal-terms", title: "Teal terms and subscription policy", url: "https://www.tealhq.com/terms", type: "Official legal", status: "Company claim", confidence: "High", effectiveDate: "2026-01-21" },
];

const tealClaims = {
  company_identity: ["Teal", "Verified", "Official pricing, help centre and Chrome Web Store publisher identity corroborate Teal Labs, Inc.", ["source-teal-pricing", "source-teal-help", "source-teal-chrome"], "High"],
  official_website: ["https://www.tealhq.com/", "Verified", "Official pricing and help-centre links resolve to Teal.", ["source-teal-pricing", "source-teal-help"], "High"],
  category: ["Career OS", "Analyst inference", "Classified from the breadth of the observed candidate workflow.", ["source-teal-pricing", "source-teal-help"], "Medium"],
  geography: ["Global", "Analyst inference", "The public candidate product is available globally; country-level eligibility was not asserted.", ["source-teal-pricing", "source-teal-chrome"], "Medium"],
  side: ["Candidate-side", "Observed", "The product, entitlements and extension are designed for job seekers.", ["source-teal-pricing", "source-teal-chrome"], "High"],
  lifecycle: ["Active", "Observed", "Current pricing, knowledge-base and Chrome Web Store listings were observed.", ["source-teal-pricing", "source-teal-help", "source-teal-chrome"], "High"],
  founding_year: ["2019", "Third-party estimate", "Crunchbase reports the founding year; it is not treated as a filed disclosure.", ["source-teal-crunchbase"], "Medium"],
  headquarters: ["Miami, Florida, United States", "Third-party estimate", "Crunchbase company profile; not treated as a filed disclosure.", ["source-teal-crunchbase"], "Medium"],
  ownership: ["Privately held; specific current ownership percentages are not publicly disclosed", "Third-party estimate", "Funding coverage and company-database evidence indicate a private venture-backed company.", ["source-teal-techcrunch", "source-teal-crunchbase"], "Medium"],
  acquisition_history: ["No acquisition identified in the checked official, press and company-database sources", "Not found after exhaustive search", "Official, credible press and company-database checks completed.", ["source-teal-techcrunch", "source-teal-crunchbase"], "Medium"],
  user: ["Job seekers creating, tailoring and managing applications", "Analyst inference", "Inferred from the observed workflow and candidate-facing entitlements.", ["source-teal-pricing", "source-teal-help"], "Medium"],
  buyer: ["Individual job seeker; education, outplacement or workforce partner where offered", "Analyst inference", "Inferred from self-serve pricing and public partner language.", ["source-teal-pricing"], "Medium"],
  jobs_to_be_done: ["Build and tailor resumes, match them to job descriptions, save and track applications, generate cover letters and email templates, autofill forms, and practice interviews in one job-search workspace.", "Company claim", "Official pricing and knowledge-base feature comparison.", ["source-teal-pricing", "source-teal-help"], "High"],
  business_model: ["Freemium candidate SaaS with recurring Teal+ weekly, 30-day and 90-day subscriptions.", "Observed", "Official pricing page.", ["source-teal-pricing"], "High"],
  positioning: ["An all-in-one suite of tools for job seekers to manage and improve the job search.", "Company claim", "Official pricing and product language.", ["source-teal-pricing"], "High"],
  promise: ["Help job seekers build stronger applications and land a job sooner through organization, tailoring and AI assistance.", "Company claim", "Official promise; the employment outcome is not independently verified.", ["source-teal-pricing"], "Medium"],
  usp: ["A broad career operating system combines an unlimited free job tracker and resume builder with paid, unlimited tailoring and AI-generation workflows.", "Analyst inference", "Synthesis of official pricing and extension evidence.", ["source-teal-pricing", "source-teal-chrome"], "Medium"],
  wedge: ["The free Chrome job-tracking workflow creates a daily organization habit, then Teal+ monetizes deeper resume analysis, keyword matching, design controls and unlimited AI credits.", "Analyst inference", "Inference from packaging, entitlements and extension distribution.", ["source-teal-pricing", "source-teal-chrome"], "Medium"],
  moat: ["No defensible moat can be verified publicly; extension distribution, accumulated workflow data and breadth may contribute, but retention and proprietary-data advantages are not disclosed.", "Analyst inference", "Public evidence does not establish an economic moat.", ["source-teal-chrome", "source-teal-pricing"], "Low"],
  pricing: ["Free Forever; Teal+ USD 13 every 7 days, USD 29 every 30 days, or USD 79 every 90 days. Paid plans auto-renew; the official terms document the cancellation and plan-specific refund windows.", "Company claim", "Current official pricing, help and terms pages agree on the public prices.", ["source-teal-pricing", "source-teal-help", "source-teal-terms"], "High"],
  funding_status: ["TechCrunch reported a USD 5 million funding round in July 2020; total current funding is not asserted without a controlling disclosure.", "Observed", "Credible press report, separated from database estimates.", ["source-teal-techcrunch"], "High"],
  revenue_status: ["Not publicly disclosed", "Not publicly disclosed", "Revenue is not inferred from funding, store users, ratings or product claims.", ["source-teal-techcrunch", "source-teal-crunchbase"], "Medium"],
  observable_reach: ["Chrome Web Store: 200,000 users and 4.9/5 from 3.2K ratings; these are store observations, not active-user or revenue claims.", "Observed", "Direct Chrome Web Store observation; values change over time.", ["source-teal-chrome"], "High"],
  gtm: ["Freemium PLG, a high-rated Chrome extension, SEO-led free tools and career content, short-duration subscriptions, and partner distribution to education or workforce organizations.", "Analyst inference", "Observed distribution and packaging; channel interpretation is analyst inference.", ["source-teal-pricing", "source-teal-chrome"], "Medium"],
  trust: ["Teal states that data is encrypted in transit and at rest, career content can be exported or deleted, third-party AI providers process content under service-provider controls, and anonymized/aggregated career content may improve its AI models. No SOC 2 or ISO certification was found.", "Company claim", "Official privacy policy and terms; certification absence is limited to checked public sources.", ["source-teal-privacy", "source-teal-terms", "source-teal-chrome"], "High"],
  review_themes: ["Strength theme: users value job capture and tracking through the Chrome extension. Complaint theme: some want direct application from tracked jobs and supported-site coverage can be uneven.", "Analyst inference", "Qualitative synthesis of review evidence; not a representative satisfaction measure.", ["source-teal-trustpilot", "source-teal-chrome"], "Medium"],
  strengths: ["Strong free tracker habit, broad candidate workflow, transparent short-duration pricing, and a Chrome extension with 200K observed users and 4.9/5 across 3.2K ratings.", "Analyst inference", "Inference from official product, pricing and store evidence.", ["source-teal-pricing", "source-teal-chrome"], "Medium"],
  weaknesses: ["Feature breadth can create cognitive load; weekly subscription framing raises renewal-risk perception; keyword guidance can be over-trusted; generated claims and applications still require review.", "Analyst inference", "Product and trust-risk interpretation, not a company admission.", ["source-teal-pricing", "source-teal-trustpilot"], "Medium"],
  india_relevance: ["Medium: the workflow transfers to English-speaking Indian job seekers but lacks verified India-specific hiring, salary, notice-period and mobility context.", "Analyst inference", "Assessed against HireNudge's India-first hypothesis.", ["source-teal-pricing", "source-teal-help"], "Medium"],
  mobility_relevance: ["No sponsorship, visa, work-authorization or relocation workflow was found in checked product and help sources.", "Not found after exhaustive search", "Official product and help content checked.", ["source-teal-pricing", "source-teal-help"], "Medium"],
  hirenudge_recommendation: ["Adapt Teal’s tracker habit and job-specific content workflow, but differentiate with explainable fit, verified evidence provenance, India-to-global role context and human-reviewed outreach.", "Analyst inference", "Founder’s Office transfer analysis grounded in observed workflows.", ["source-teal-pricing", "source-teal-chrome"], "Medium"],
  smallest_experiment: ["Concierge-test one evidence-backed resume and follow-up plan for 10 active Indian job seekers; compare qualified-interview rate with their prior 10 applications.", "Analyst inference", "Smallest decision-changing experiment derived from the observed workflow.", ["source-teal-pricing", "source-teal-help"], "Medium"],
  expected_outcome: ["Improve qualified interview rate per 10 high-fit, human-reviewed applications or produce a clear stop decision.", "Analyst inference", "HireNudge outcome hypothesis; baseline requires internal analytics.", ["source-teal-pricing"], "Medium"],
  risk: ["Hallucinated achievements, generic optimization, sensitive resume data and over-reliance on ATS scores.", "Analyst inference", "Trust, data and automation review grounded in the observed workflow.", ["source-teal-pricing", "source-teal-help"], "Medium"],
};

const tealFeatureOverrides = {
  "feature-resume-jd-parsing": ["Yes", 2, "Free top five keywords; Teal+ full keyword list"],
  "feature-explainable-fit": ["Partial", 2, "Free basic match and recommendations; Teal+ advanced"],
  "feature-resume-builder": ["Yes", 3, "Free unlimited resumes; paid advanced controls"],
  "feature-ats-optimization": ["Yes", 3, "Basic free; advanced paid"],
  "feature-cover-letters": ["Yes", 3, "Limited free credits; unlimited paid"],
  "feature-application-tailoring": ["Yes", 3, "Keyword matching and job-specific AI content"],
  "feature-browser-autofill": ["Yes", 2, "Chrome extension"],
  "feature-assisted-apply": ["Partial", 1, "Autofill supports reviewed completion; autonomous submission not evidenced"],
  "feature-application-tracker": ["Yes", 3, "Unlimited free job tracking"],
  "feature-recruiter-outreach": ["Partial", 1, "Email templates by job stage; not autonomous outreach"],
  "feature-interview-preparation": ["Yes", 2, "Two free AI practice sessions; unlimited in Teal+"],
  "feature-outcome-learning": ["Partial", 1, "Tracker insights; no verified closed-loop outcome model"],
  "feature-api-integrations": ["Partial", 1, "Chrome extension observed; public API not found"],
};

export const manualEnrichments = {
  ...candidateCohortEnrichments,
  ...candidateAutomationEnrichments,
  ...candidateExpansionEnrichments,
  "platform-teal": {
    sources: tealSources,
    claimOverrides: tealClaims,
    featureOverrides: tealFeatureOverrides,
    defaultFeatureSources: ["source-teal-pricing", "source-teal-help"],
    pricing: [
      { id: "price-teal-free", platformId: "platform-teal", platform: "Teal", tier: "Free Forever", nativePrice: 0, currency: "USD", billingPeriod: "Lifetime", monthlyEquivalent: 0, limits: "10 resume-bullet credits; 2 summary credits; 2 cover-letter credits; 2 interview sessions; unlimited resumes and job tracking; 10 templates; top five JD keywords; basic analysis", pricingStatus: "Company claim", tax: "Not stated", sourceId: "source-teal-pricing" },
      { id: "price-teal-weekly", platformId: "platform-teal", platform: "Teal", tier: "Weekly", nativePrice: 13, currency: "USD", billingPeriod: "7 days", monthlyEquivalent: 56.33, limits: "Unlimited listed AI tools and premium feature set; two-day refund-request window", pricingStatus: "Company claim", tax: "Not stated", sourceId: "source-teal-pricing" },
      { id: "price-teal-monthly", platformId: "platform-teal", platform: "Teal", tier: "30-day", nativePrice: 29, currency: "USD", billingPeriod: "30 days", monthlyEquivalent: 29, limits: "Unlimited listed AI tools and premium feature set", pricingStatus: "Company claim", tax: "Not stated", sourceId: "source-teal-pricing" },
      { id: "price-teal-quarterly", platformId: "platform-teal", platform: "Teal", tier: "90-day", nativePrice: 79, currency: "USD", billingPeriod: "90 days", monthlyEquivalent: 26.33, limits: "Unlimited listed AI tools and premium feature set", pricingStatus: "Company claim", tax: "Not stated", sourceId: "source-teal-pricing" },
    ],
    metrics: [
      { id: "metric-teal-chrome-users", platformId: "platform-teal", channel: "Chrome Web Store", valueLabel: "200,000 users", numericValue: 200000, unit: "users", methodology: "Direct store observation; not active users", sourceId: "source-teal-chrome", confidence: "High", evidenceStatus: "Observed" },
      { id: "metric-teal-chrome-rating", platformId: "platform-teal", channel: "Chrome Web Store", valueLabel: "4.9/5 from 3.2K ratings", numericValue: 4.9, unit: "rating", methodology: "Direct store observation; values update daily", sourceId: "source-teal-chrome", confidence: "High", evidenceStatus: "Observed" },
    ],
    gtmObservations: [
      { id: "gtm-teal-plg-extension", platformId: "platform-teal", channel: "PLG, extension, SEO/content and partner distribution", strategy: "Unlimited free tracker and resume workflow creates acquisition and habit; Teal+ monetizes depth through short subscriptions.", evidenceStatus: "Analyst inference", sourceId: "source-teal-pricing", confidence: "Medium" },
    ],
    status: "Green",
    blockers: "None. Public tiers, privacy and terms, independent store, credible press and review sources are linked; unavailable certifications and revenue use explicit terminal states.",
  },
};
