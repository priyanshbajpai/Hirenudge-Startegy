import { buildAutomationEnrichment as build } from "./candidate-automation-enrichments.mjs";
const d = "2026-08-01";
const s = (id, title, url, type, status = "Observed", confidence = "High") => ({
  id,
  title,
  url,
  type,
  status,
  confidence,
  observedAt: d,
});
const auto = {
  "feature-job-discovery": [
    "Yes",
    3,
    "Automated matching across public job sources",
  ],
  "feature-resume-jd-parsing": ["Yes", 2, "CV-to-role matching"],
  "feature-explainable-fit": [
    "Partial",
    1,
    "Filters/match output; full ranking explanation not disclosed",
  ],
  "feature-resume-builder": [
    "Yes",
    2,
    "Resume/CV builder or improvement workflow",
  ],
  "feature-ats-optimization": ["Yes", 2, "AI CV checks and optimization"],
  "feature-cover-letters": ["Yes", 2, "AI cover-letter generation"],
  "feature-application-tailoring": [
    "Yes",
    2,
    "Job-specific content or filters",
  ],
  "feature-browser-autofill": ["Yes", 2, "Browser-assisted application flow"],
  "feature-assisted-apply": [
    "Yes",
    3,
    "Automated applications with optional review",
  ],
  "feature-application-tracker": [
    "Yes",
    3,
    "Application dashboard and analytics",
  ],
  "feature-recruiter-outreach": [
    "Partial",
    2,
    "Email finder or follow-up messaging",
  ],
  "feature-interview-preparation": ["Yes", 2, "AI mock-interview/career tools"],
  "feature-fraud-authenticity": [
    "Not offered",
    0,
    "No candidate evidence-provenance or employer-authorized identity workflow found",
  ],
  "feature-outcome-learning": [
    "Partial",
    1,
    "Tracker results; causal outcome-learning model not disclosed",
  ],
  "feature-api-integrations": [
    "Partial",
    1,
    "Browser/job-source integrations; public API not found",
  ],
  "feature-trust-center": [
    "Partial",
    1,
    "Privacy/legal pages; no independent certification found",
  ],
};

const loopSources = [
  s(
    "source-loopcv-official",
    "LoopCV AI job-search automation",
    "https://www.loopcv.pro/",
    "Official product",
  ),
  s(
    "source-loopcv-pricing-current",
    "LoopCV plans and refund terms",
    "https://www.loopcv.pro/pricing/index.html",
    "Official pricing",
    "Company claim",
  ),
  s(
    "source-loopcv-privacy-current",
    "LoopCV privacy policy",
    "https://www.loopcv.pro/privacy/",
    "Official privacy",
    "Company claim",
  ),
  s(
    "source-loopcv-terms-current",
    "LoopCV terms and conditions",
    "https://www.loopcv.pro/terms/",
    "Official legal",
    "Company claim",
  ),
  s(
    "source-loopcv-trustpilot",
    "LoopCV customer reviews",
    "https://www.trustpilot.com/review/loopcv.pro",
    "Review platform",
    "Observed",
    "Medium",
  ),
  s(
    "source-loopcv-stepmark",
    "LoopCV public-information ecosystem profile",
    "https://stepmark.ai/wp-content/uploads/2026/04/Talent-Management-Ecosystem-Overview-vF.pdf",
    "Independent profile",
    "Observed",
    "Low",
  ),
];
const copilotSources = [
  s(
    "source-jobcopilot-official",
    "JobCopilot application automation",
    "https://jobcopilot.com/",
    "Official product",
  ),
  s(
    "source-jobcopilot-pricing-current",
    "JobCopilot pricing",
    "https://jobcopilot.com/pricing/",
    "Official pricing",
    "Company claim",
  ),
  s(
    "source-jobcopilot-privacy-current",
    "JobCopilot privacy policy",
    "https://jobcopilot.com/privacy-policy/",
    "Official privacy",
    "Company claim",
  ),
  s(
    "source-jobcopilot-terms-current",
    "JobCopilot terms of service",
    "https://jobcopilot.com/terms-of-service/",
    "Official legal",
    "Company claim",
  ),
  s(
    "source-jobcopilot-about",
    "About JobCopilot and responsible AI",
    "https://jobcopilot.com/about-us/",
    "Official company",
    "Company claim",
  ),
  s(
    "source-jobcopilot-trustpilot",
    "JobCopilot customer reviews",
    "https://www.trustpilot.com/review/jobcopilot.com",
    "Review platform",
    "Observed",
    "Medium",
  ),
  s(
    "source-jobcopilot-sprout",
    "JobCopilot 2026 product review",
    "https://www.usesprout.com/blog/jobcopilot-review-pricing-alternatives",
    "Independent review",
    "Third-party estimate",
    "Low",
  ),
];
const wonsSources = [
  s(
    "source-wonsultingai-official",
    "WonsultingAI product suite",
    "https://www.wonsulting.com/wonsultingai",
    "Official product",
  ),
  s(
    "source-wonsultingai-pricing-current",
    "WonsultingAI pricing",
    "https://www.wonsulting.com/pricing",
    "Official pricing",
    "Company claim",
  ),
  s(
    "source-wonsultingai-terms-current",
    "Wonsulting terms and guarantees",
    "https://www.wonsulting.com/terms-and-conditions",
    "Official legal",
    "Company claim",
  ),
  s(
    "source-wonsultingai-help",
    "Wonsulting service and subscription pricing help",
    "https://wonsulting.zohodesk.com/portal/en/kb/articles/how-can-i-find-out-the-prices-for-wonsulting-s-services-or-subscriptions",
    "Official help",
    "Company claim",
  ),
  s(
    "source-wonsultingai-forbes",
    "Wonsulting company profile",
    "https://www.forbes.com/profile/wonsulting/",
    "Credible press",
    "Observed",
    "Medium",
  ),
  s(
    "source-wonsultingai-global",
    "Wonsulting Work Beyond Borders programme",
    "https://www.wonsulting.com/work-beyond-borders",
    "Official product",
    "Company claim",
  ),
];

export const candidateExpansionEnrichments = {
  "platform-loopcv": build({
    slug: "loopcv",
    name: "LoopCV",
    website: "https://www.loopcv.pro/",
    category: "Auto-apply",
    geography: "Global; Greece-based operator",
    sources: loopSources,
    ids: {
      official: "source-loopcv-official",
      pricing: "source-loopcv-pricing-current",
      privacy: "source-loopcv-privacy-current",
      terms: "source-loopcv-terms-current",
      independent: "source-loopcv-stepmark",
      review: "source-loopcv-trustpilot",
    },
    founding: "2019",
    foundingMethod:
      "Independent public-information profile and company material agree on 2019.",
    hq: "Thessaloniki, Greece",
    hqMethod: "Official pricing footer and independent profile.",
    user: "Job seekers seeking automatic discovery, application submission, recruiter emails and tracking",
    jtbd: "Upload a CV, set preferences, scan 30+ job boards, match and automatically apply, send follow-up emails, and track results from one dashboard.",
    business:
      "Free-forever candidate product with paid Pro/Premium upgrades starting at EUR 9.99/month, higher quotas, priority processing and advanced filters; student and employer offerings extend packaging.",
    positioning:
      "An AI job-search automation platform that finds and applies to matching roles across job boards.",
    promise:
      "Help users find a job faster by automating repetitive discovery, application and follow-up work.",
    usp: "Broad 30+ source coverage combines automatic submissions, recruiter email outreach, optional review, exclusion controls and a browser apply tool.",
    wedge:
      "A no-card free auto-apply plan proves the workflow; higher daily volumes, filters, CV checks and processing priority monetize active search periods.",
    pricingSummary:
      "Free forever with no credit card; paid Pro/Premium plans start at EUR 9.99/month and unlock higher application volumes, priority processing and advanced filters. Exact current plan-by-plan amounts beyond the public starting price were not displayed on the accessible page. Refunds are offered within seven days when less than 10% of the application quota has been used.",
    pricingState: "Company claim",
    reach:
      "LoopCV claims 50,000+ job seekers in 90+ countries and thousands of users; Trustpilot shows roughly 126 reviews and a rating around 4.1/5. Company reach is not active-user evidence.",
    reachState: "Company claim",
    reachMethod:
      "Company cumulative claims separated from direct review-platform observations.",
    gtm: "Freemium PLG, multilingual SEO/content, comparison pages, affiliate/referral routes, Chrome/browser distribution, Trustpilot social proof, student discounts and employer services.",
    channels: "PLG, multilingual SEO, browser, referrals and employer services",
    trust:
      "LoopCV states the browser tool can apply on logged-in job boards without collecting the user's credentials and lets users review/edit generic messages. Applications may be sent without disclosing automation; this creates consent, platform-terms and reputation risk.",
    trustState: "Company claim",
    trustMethod:
      "Official pricing/privacy/legal workflow and independent reviews.",
    reviews:
      "Positive themes emphasize time saved and dashboard convenience. Negative themes include weak match quality, email-versus-form application ambiguity, support concerns and doubts about whether high-volume applications improve outcomes.",
    strengths:
      "Wide job-source coverage, free automation, follow-up email tooling, review option, multilingual acquisition and explicit cancellation/refund rules.",
    weaknesses:
      "Exact tier transparency is incomplete, public outcome evidence is company-led, and automation can trade relevance and consent for volume.",
    india:
      "High relevance because the product has Hindi localization and global coverage, but it does not prove India-specific recruiter, notice-period, salary or mobility logic.",
    recommendation:
      "Adapt exclusion controls, review queues and multilingual guidance; reject undisclosed bulk submission and optimize for qualified interviews rather than volume.",
    experiment:
      "For 10 Indian job seekers, compare a reviewed 10-role queue against automatic broad submission; measure match rejection, form errors and interviews per qualified application.",
    risk: "Spam, non-disclosed automation, incorrect submissions, platform-account risk and storing sensitive CV/application data.",
    features: auto,
    prices: [
      {
        id: "price-loopcv-free",
        platformId: "platform-loopcv",
        platform: "LoopCV",
        tier: "Free Forever",
        nativePrice: 0,
        currency: "EUR",
        billingPeriod: "Lifetime",
        monthlyEquivalent: 0,
        limits:
          "Limited automated applications; matching and dashboard; no card required",
        pricingStatus: "Company claim",
        tax: "Not stated",
        sourceId: "source-loopcv-pricing-current",
      },
      {
        id: "price-loopcv-paid-start",
        platformId: "platform-loopcv",
        platform: "LoopCV",
        tier: "Paid plans — starting price",
        nativePrice: 9.99,
        currency: "EUR",
        billingPeriod: "1 month",
        monthlyEquivalent: 9.99,
        limits:
          "Higher volumes, priority processing and advanced filters; exact tier amounts not publicly visible",
        pricingStatus: "Company claim",
        tax: "Not stated",
        sourceId: "source-loopcv-pricing-current",
      },
    ],
    metrics: [
      {
        id: "metric-loopcv-trustpilot",
        platformId: "platform-loopcv",
        channel: "Trustpilot",
        valueLabel: "About 4.1/5 from 126 reviews",
        numericValue: 4.1,
        unit: "rating",
        methodology: "Direct review-platform observation; not active users",
        sourceId: "source-loopcv-trustpilot",
        confidence: "Medium",
        evidenceStatus: "Observed",
      },
    ],
  }),

  "platform-jobcopilot": build({
    slug: "jobcopilot",
    name: "JobCopilot",
    website: "https://jobcopilot.com/",
    category: "Agentic auto-apply",
    geography: "Global; France-based operator",
    sources: copilotSources,
    ids: {
      official: "source-jobcopilot-official",
      pricing: "source-jobcopilot-pricing-current",
      privacy: "source-jobcopilot-privacy-current",
      terms: "source-jobcopilot-terms-current",
      help: "source-jobcopilot-about",
      independent: "source-jobcopilot-trustpilot",
      review: "source-jobcopilot-trustpilot",
    },
    hq: "France",
    hqMethod:
      "Official about context and Trustpilot company details; exact legal headquarters not asserted.",
    user: "Job seekers seeking automated matching, applications, hiring-manager contacts, application materials and career guidance",
    buyer:
      "Individual job seeker; white-label partners, career coaches and employers are separate distribution buyers",
    jtbd: "Train one or more AI copilots to find daily matches, save or automate applications, tailor resumes, contact hiring managers, track progress and practice interviews.",
    business:
      "Paid candidate subscriptions across weekly, monthly and quarterly durations, with Premium and Elite tiers; additional hiring-manager credits and white-label/partner distribution.",
    positioning:
      "A job-application automation platform and configurable AI copilot.",
    promise:
      "Generate more interview opportunities while reducing manual job-search work.",
    usp: "Multiple trained copilots, high daily match quotas, optional save-for-review, per-application resume tailoring and hiring-manager contact credits combine search and outreach.",
    wedge:
      "Automation demos and career tools attract users; Premium/Elite duration pricing, multiple copilots and contact credits monetize intensity.",
    pricingSummary:
      "Premium starts at USD 0.93/day for one copilot and up to 20 daily matches; Elite starts at USD 1.05/day for three copilots, up to 50 matches, per-application resume tailoring and hiring-manager credits. Weekly, monthly and quarterly durations exist, but exact checkout totals were not public on the accessible pricing page.",
    pricingState: "Company claim",
    reach:
      "Trustpilot shows 2.8/5 from 105 reviews, including 72 in the preceding 12 months. JobCopilot claims capacity up to 1,500 applications per month and 50,000 companies; these are product-scope claims, not observed customer traction.",
    reachState: "Observed",
    reachMethod:
      "Direct review-platform observation separated from company capability claims.",
    gtm: "Outcome-led landing pages, comparison/SEO tools, localized sites, affiliate and white-label programmes, career-coach/employer partnerships, Trustpilot engagement, and subscription/credit monetization.",
    channels:
      "SEO/localization, affiliates, white-label partnerships and subscriptions",
    trust:
      "The product offers automated submission and a save-for-review option. Job relevance, form correctness and consent require human verification; responsible-AI language exists, but public security certification and independent bias evaluation were not found.",
    trustState: "Analyst inference",
    trustMethod:
      "Official product/privacy/legal pages plus independent review patterns.",
    reviews:
      "Positive reviews value saved time and setup simplicity. Negative reviews cite cancellation friction, irrelevant or expired roles, corrupted autofill, limited networking credits and little measurable traction; the company responds to most negative reviews.",
    strengths:
      "Broad tool suite, configurable copilots, review queue, localization, partner distribution and transparent daily starting prices.",
    weaknesses:
      "Low review score, unclear exact checkout totals, job freshness/match complaints, add-on credit complexity and substantial autonomous-application risk.",
    india:
      "High relevance as an automation benchmark and includes Indian review evidence, but sponsorship, notice-period and India-specific quality controls are not demonstrated.",
    recommendation:
      "Adapt trainable preferences, save-for-review and hiring-manager context; avoid automatic broad submission and make exact plan/credit costs visible.",
    experiment:
      "Create one trainable role copilot for five users but keep all matches in review; measure relevance, expired-job rate, editing time and qualified-interview yield.",
    risk: "Stale jobs, corrupted forms, platform violations, extra credits, cancellation friction and false application content.",
    features: {
      ...auto,
      "feature-offers-compensation": [
        "Yes",
        2,
        "AI offer and salary negotiation",
      ],
      "feature-recruiter-outreach": [
        "Paid-only",
        3,
        "Hiring-manager contact credits and email discovery",
      ],
    },
    prices: [
      {
        id: "price-jobcopilot-premium-start",
        platformId: "platform-jobcopilot",
        platform: "JobCopilot",
        tier: "Premium — starting daily equivalent",
        nativePrice: 0.93,
        currency: "USD",
        billingPeriod: "Per day equivalent",
        monthlyEquivalent: 28.29,
        limits:
          "1 copilot; up to 20 matches/day; automation, review queue, tracker and AI career tools",
        pricingStatus: "Company claim",
        tax: "Not stated",
        sourceId: "source-jobcopilot-pricing-current",
      },
      {
        id: "price-jobcopilot-elite-start",
        platformId: "platform-jobcopilot",
        platform: "JobCopilot",
        tier: "Elite — starting daily equivalent",
        nativePrice: 1.05,
        currency: "USD",
        billingPeriod: "Per day equivalent",
        monthlyEquivalent: 31.94,
        limits:
          "3 copilots; up to 50 matches/day; tailoring and hiring-manager credits",
        pricingStatus: "Company claim",
        tax: "Not stated",
        sourceId: "source-jobcopilot-pricing-current",
      },
    ],
    metrics: [
      {
        id: "metric-jobcopilot-trustpilot",
        platformId: "platform-jobcopilot",
        channel: "Trustpilot",
        valueLabel: "2.8/5 from 105 reviews",
        numericValue: 2.8,
        unit: "rating",
        methodology: "Direct review-platform observation",
        sourceId: "source-jobcopilot-trustpilot",
        confidence: "Medium",
        evidenceStatus: "Observed",
      },
    ],
  }),

  "platform-wonsultingai": build({
    slug: "wonsultingai",
    name: "WonsultingAI",
    website: "https://www.wonsulting.com/wonsultingai",
    category: "Career tools",
    geography: "Global; United States-based",
    sources: wonsSources,
    ids: {
      official: "source-wonsultingai-official",
      pricing: "source-wonsultingai-pricing-current",
      terms: "source-wonsultingai-terms-current",
      help: "source-wonsultingai-help",
      independent: "source-wonsultingai-forbes",
    },
    founding: "2020",
    foundingMethod:
      "Forbes reports the Los Angeles-based company was started in early 2020; Wonsulting content also references a 2019 launch, retained as a date conflict.",
    hq: "Los Angeles, California, United States",
    hqMethod: "Forbes profile.",
    ownership:
      "Privately held, co-founded by Jonathan Javier and Jerry Lee; current ownership percentages are not publicly disclosed",
    user: "Students, early-career and nontraditional-background job seekers needing application and networking support",
    buyer:
      "Individual job seeker; universities, partners and service clients through adjacent Wonsulting offerings",
    jtbd: "Build and score resumes, tailor bullets and cover letters, generate networking/cold emails, track jobs, search a job board, prepare for interviews and use learning content.",
    business:
      "Free-forever AI toolkit plus USD 19.99 monthly Premium; adjacent Wonsulting coaching, reviews, courses, guarantees and partner programmes expand monetization.",
    positioning:
      "An AI-powered job-search platform from a career-services brand focused on helping underdogs land jobs.",
    promise:
      "Give underserved and nontraditional candidates affordable professional-level guidance and interview support.",
    usp: "A strong founder/creator brand, networking-first methodology and adjacent human career services differentiate it from pure software resume tools.",
    wedge:
      "Free resume builder, scoring, limited AI generations and job tracking acquire users; unlimited Premium, human services, content and education partnerships monetize trust.",
    pricingSummary:
      "Starter is free forever with a resume builder, unlimited downloads, five bullet generations, three cover letters, three networking messages, one interview preparation, two cold emails and 30 tracked jobs. Premium is USD 19.99/month with unlimited listed AI tools, job tracking, learning hub, interview preparation and future releases. It renews monthly until cancellation; individual-service pricing is separate.",
    reach:
      "WonsultingAI claims 1.6 million users, more than 24,000 Premium upgrades, 62% receiving an interview within 30 days, and a 51% interview-to-offer conversion among users reaching interviews. Methodology is not published, so these remain company claims. Forbes reported more than one million social followers and revenue approaching USD 1 million in 2021; that figure is stale, historical and reported—not current revenue.",
    reachState: "Company claim",
    reachMethod:
      "Current company claims separated from dated Forbes reporting; no active-user or causal-outcome methodology disclosed.",
    gtm: "Founder-led creator distribution, LinkedIn/social content, freemium PLG, success stories, SEO, UGC creators, partnerships, higher education, live global-career events and human-service cross-sell.",
    channels:
      "Founder-led social, PLG, partnerships, higher education, events and services",
    trust:
      "Users can delete accounts. Terms condition interview guarantees and can void them under specified circumstances. No public model-training disclosure, security certification or independent fairness evaluation was found in checked pages.",
    trustState: "Company claim",
    trustMethod: "Official pricing, account-deletion and terms evidence.",
    reviews:
      "Official success stories emphasize confidence, clearer resumes, networking and interviews. Independent current product-review depth is limited; guarantees and company-reported outcomes require methodological caution.",
    strengths:
      "Distinct creator brand, underserved-candidate positioning, networking tools, freemium value, human-service adjacency and higher-education/partner distribution.",
    weaknesses:
      "Material outcome metrics are company claims without disclosed methodology; guarantee terms are conditional; the suite spans software and services, complicating product-only attribution.",
    india:
      "High relevance for nontraditional and early-career Indian users; networking education and global-remote programmes transfer well, though India-specific recruiter and mobility evidence remains limited.",
    mobility:
      "A Work Beyond Borders programme addresses global remote careers, but no end-to-end visa, sponsorship or legal work-authorization product was found.",
    mobilityState: "Observed",
    recommendation:
      "Adapt networking-first education, founder-led distribution and free-value limits; differentiate with measured interview outcomes, evidence provenance and an India-to-global mobility layer.",
    experiment:
      "Run a founder-led networking clinic for 20 Indian candidates with five human-reviewed messages each; measure qualified replies, referrals and interviews against resume-only support.",
    risk: "Unverified outcome claims, conditional guarantees, fabricated AI achievements, resume-data sensitivity and blending service testimonials with software causality.",
    features: {
      "feature-job-discovery": ["Yes", 2, "JobBoardAI"],
      "feature-resume-jd-parsing": ["Yes", 2, "Tailoring and scoring"],
      "feature-explainable-fit": [
        "Partial",
        2,
        "Score breakdown without full fit model",
      ],
      "feature-resume-builder": [
        "Yes",
        3,
        "Free builder and unlimited downloads",
      ],
      "feature-ats-optimization": ["Yes", 3, "Resume score and breakdown"],
      "feature-cover-letters": ["Yes", 3, "Limited free, unlimited paid"],
      "feature-application-tailoring": [
        "Paid-only",
        3,
        "Unlimited resume/cover-letter tailoring",
      ],
      "feature-application-tracker": [
        "Yes",
        3,
        "30 jobs free, unlimited Premium",
      ],
      "feature-recruiter-outreach": [
        "Yes",
        3,
        "NetworkAI, cold emails and company emails",
      ],
      "feature-interview-preparation": [
        "Yes",
        3,
        "InterviewAI and learning hub",
      ],
      "feature-global-mobility": [
        "Partial",
        1,
        "Global remote-career programme, no visa workflow",
      ],
      "feature-outcome-learning": [
        "Partial",
        1,
        "Company outcome claims; closed-loop product analytics not disclosed",
      ],
      "feature-trust-center": [
        "Partial",
        1,
        "Terms/account deletion; certification not found",
      ],
    },
    prices: [
      {
        id: "price-wonsultingai-free",
        platformId: "platform-wonsultingai",
        platform: "WonsultingAI",
        tier: "Starter",
        nativePrice: 0,
        currency: "USD",
        billingPeriod: "Lifetime",
        monthlyEquivalent: 0,
        limits:
          "Limited generations; 30 tracked jobs; resume builder and JobBoardAI",
        pricingStatus: "Company claim",
        tax: "Not stated",
        sourceId: "source-wonsultingai-pricing-current",
      },
      {
        id: "price-wonsultingai-premium",
        platformId: "platform-wonsultingai",
        platform: "WonsultingAI",
        tier: "Premium",
        nativePrice: 19.99,
        currency: "USD",
        billingPeriod: "1 month",
        monthlyEquivalent: 19.99,
        limits: "Unlimited listed WonsultingAI tools and future releases",
        pricingStatus: "Company claim",
        tax: "Not stated",
        sourceId: "source-wonsultingai-pricing-current",
      },
    ],
    metrics: [],
  }),
};
