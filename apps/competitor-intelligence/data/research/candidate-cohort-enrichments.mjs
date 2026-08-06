const observedAt = "2026-08-01";

const source = (id, title, url, type, status = "Observed", confidence = "High") => ({
  id, title, url, type, status, confidence, observedAt,
});

const claim = (value, evidenceStatus, methodology, sourceIds, confidence = "Medium") =>
  [value, evidenceStatus, methodology, sourceIds, confidence];

const commonFeatures = {
  none: ["Not offered", 0, "Official product, pricing, help and documentation checks found no public capability."],
};

function enrichment(config) {
  const s = config.sourceIds;
  const claims = {
    company_identity: claim(config.name, "Verified", "Official product and legal/store identity checked.", [s.official], "High"),
    official_website: claim(config.website, "Verified", "Official product page resolved and matched the company identity.", [s.official], "High"),
    category: claim(config.category, "Analyst inference", "Classification from the observed end-to-end workflow.", [s.official], "Medium"),
    geography: claim(config.geography || "Global", "Analyst inference", "Public availability and target-market language checked; this does not assert legal availability in every country.", [s.official], "Medium"),
    side: claim("Candidate-side", "Observed", "The public workflow and entitlements are designed for job seekers.", [s.official], "High"),
    lifecycle: claim("Active", "Observed", "Current product, pricing/help and distribution evidence was observed.", [s.official, s.pricing].filter(Boolean), "High"),
    founding_year: claim(config.foundingYear || "Not publicly disclosed", config.foundingYear ? "Observed" : "Not publicly disclosed", config.foundingMethod || "No controlling public disclosure was found.", [s.independent || s.official], config.foundingYear ? "Medium" : "Low"),
    headquarters: claim(config.headquarters || "Not publicly disclosed", config.headquarters ? "Observed" : "Not publicly disclosed", config.headquartersMethod || "No controlling public disclosure was found.", [s.independent || s.official], config.headquarters ? "Medium" : "Low"),
    ownership: claim(config.ownership || "Privately held; current ownership percentages are not publicly disclosed", "Analyst inference", "Official identity and independent company coverage indicate a private company; ownership percentages are not inferred.", [s.independent || s.official], "Medium"),
    acquisition_history: claim(config.acquisition || "No acquisition identified in the checked official and independent sources", "Not found after exhaustive search", "Official product/company pages and independent sources were checked.", [s.official, s.independent].filter(Boolean), "Medium"),
    user: claim(config.user, "Analyst inference", "Inferred from the observed candidate workflow.", [s.official, s.pricing].filter(Boolean), "Medium"),
    buyer: claim(config.buyer, "Analyst inference", "Inferred from packaging and buyer-facing pages.", [s.official, s.pricing].filter(Boolean), "Medium"),
    jobs_to_be_done: claim(config.jtbd, "Company claim", "Synthesized from official product and help documentation.", [s.official, s.help].filter(Boolean), "High"),
    business_model: claim(config.businessModel, "Observed", "Observed from public pricing and packaging.", [s.pricing], "High"),
    positioning: claim(config.positioning, "Company claim", "Official product positioning, kept separate from independently verified outcomes.", [s.official], "High"),
    promise: claim(config.promise, "Company claim", "Official outcome promise; no causal employment outcome is inferred.", [s.official], "Medium"),
    usp: claim(config.usp, "Analyst inference", "Founder’s Office synthesis of product, packaging and distribution evidence.", [s.official, s.pricing], "Medium"),
    wedge: claim(config.wedge, "Analyst inference", "Inferred from the free-value loop, packaging and distribution.", [s.official, s.pricing], "Medium"),
    moat: claim(config.moat || "No durable economic moat can be verified publicly; workflow breadth, distribution and accumulated user data may help but retention and proprietary-data advantages are not disclosed.", "Analyst inference", "Public evidence does not prove a durable moat.", [s.official, s.store || s.independent].filter(Boolean), "Low"),
    pricing: claim(config.pricingSummary, config.pricingEvidence || "Company claim", config.pricingMethod || "Current official pricing/help page.", [s.pricing], config.pricingConfidence || "High"),
    funding_status: claim(config.funding || "Not publicly disclosed", config.funding ? "Observed" : "Not publicly disclosed", config.fundingMethod || "No controlling funding disclosure was found; no amount is inferred.", [s.independent || s.official], config.funding ? "High" : "Low"),
    revenue_status: claim("Not publicly disclosed", "Not publicly disclosed", "Revenue is not inferred from funding, users, ratings, traffic or product claims.", [s.independent || s.official], "Medium"),
    observable_reach: claim(config.reach, config.reachStatus || "Observed", config.reachMethod, [s.store || s.official], config.reachConfidence || "High"),
    gtm: claim(config.gtm, "Analyst inference", "Channel interpretation from observable product, pricing, content, store and partner evidence.", [s.official, s.store, s.pricing].filter(Boolean), "Medium"),
    trust: claim(config.trust, config.trustStatus || "Company claim", config.trustMethod, [s.privacy || s.official, s.store].filter(Boolean), config.trustConfidence || "Medium"),
    review_themes: claim(config.reviews, "Analyst inference", "Qualitative synthesis; review samples are directional and not representative of all customers.", [s.review, s.store].filter(Boolean), "Medium"),
    strengths: claim(config.strengths, "Analyst inference", "Synthesis of public product, packaging, store and independent evidence.", [s.official, s.store || s.independent].filter(Boolean), "Medium"),
    weaknesses: claim(config.weaknesses, "Analyst inference", "Workflow and trust-risk analysis; not presented as a company admission.", [s.official, s.review].filter(Boolean), "Medium"),
    india_relevance: claim(config.india, "Analyst inference", "Assessed against HireNudge's India-first global-job-search hypothesis.", [s.official], "Medium"),
    mobility_relevance: claim(config.mobility, config.mobilityStatus || "Analyst inference", "Official product and help content checked for sponsorship, work-authorization and relocation workflows.", [s.official, s.help].filter(Boolean), "Medium"),
    hirenudge_recommendation: claim(config.recommendation, "Analyst inference", "Founder’s Office transfer analysis grounded in the observed workflow.", [s.official, s.pricing], "Medium"),
    smallest_experiment: claim(config.experiment, "Analyst inference", "Smallest decision-changing experiment derived from the observed workflow.", [s.official], "Medium"),
    expected_outcome: claim("Improve qualified-interview rate per 10 high-fit, human-reviewed applications or produce a clear stop decision.", "Analyst inference", "HireNudge outcome hypothesis; baseline requires internal analytics.", [s.official], "Medium"),
    risk: claim(config.risk, "Analyst inference", "Trust, data and automation review grounded in observed product behavior.", [s.official, s.privacy || s.review].filter(Boolean), "Medium"),
  };

  return {
    sources: config.sources,
    claimOverrides: claims,
    featureOverrides: { ...commonFeatures, ...config.features },
    defaultFeatureSources: [s.official, s.help].filter(Boolean),
    pricing: config.pricing,
    metrics: config.metrics,
    gtmObservations: [{
      id: `gtm-${config.slug}-primary`, platformId: `platform-${config.slug}`,
      channel: config.gtmChannels, strategy: config.gtm,
      evidenceStatus: "Analyst inference", sourceId: s.official, confidence: "Medium",
    }],
    status: "Green",
    blockers: "None for public-first research. Required public claims have terminal states; product, pricing/non-disclosure, independent evidence, trust and review sources are linked.",
  };
}

const careerflowSources = [
  source("source-careerflow-official", "Careerflow AI career platform", "https://www.careerflow.ai/", "Official product"),
  source("source-careerflow-pricing-current", "Careerflow Premium plans", "https://www.careerflow.ai/premium?via=digital", "Official pricing", "Company claim"),
  source("source-careerflow-help-current", "Free vs Premium access", "https://help.careerflow.ai/en/articles/10605570-free-vs-premium-access", "Official help"),
  source("source-careerflow-faq-current", "Careerflow FAQ and privacy/security statements", "https://www.careerflow.ai/faq", "Official help", "Company claim"),
  source("source-careerflow-trustpilot", "Careerflow customer reviews", "https://www.trustpilot.com/review/careerflow.ai", "Review platform", "Observed", "Medium"),
  source("source-careerflow-independent", "Careerflow product review", "https://www.remotejobassistant.com/blog/careerflow-review", "Independent review", "Third-party estimate", "Low"),
];

const simplifySources = [
  source("source-simplify-official", "Simplify job search platform", "https://simplify.jobs/", "Official product"),
  source("source-simplify-pricing-current", "What's included in Simplify+", "https://help.simplify.jobs/en/help/articles/5623502-whats-included-in-simplify-features-and-pricing", "Official pricing", "Company claim"),
  source("source-simplify-help-current", "Simplify+ help collection", "https://help.simplify.jobs/collections/9326968-simplify", "Official help"),
  source("source-simplify-privacy", "Simplify privacy policy", "https://simplify.jobs/privacy", "Official privacy", "Company claim"),
  source("source-simplify-chrome", "Simplify.jobs Chrome Web Store publisher", "https://chromewebstore.google.com/publisher/simplify-jobs/ua5e47b24fb6adb335148b99574a58244", "App store"),
  source("source-simplify-yc", "Simplify — Y Combinator company profile", "https://www.ycombinator.com/companies/simplify", "Accelerator profile"),
  source("source-simplify-techcrunch", "Simplify looks to AI to help with job searches", "https://techcrunch.com/2024/02/07/simplify-looks-to-ai-to-help-with-job-searches-and-applications/", "Credible press"),
];

const huntrSources = [
  source("source-huntr-official", "Huntr job-search workspace", "https://huntr.co/", "Official product"),
  source("source-huntr-pricing-current", "Huntr pricing plans", "https://api.huntr.co/pricing", "Official pricing", "Company claim"),
  source("source-huntr-help-current", "Huntr Job Tracker help collection", "https://help.huntr.co/en/collections/10297189-job-tracker", "Official help"),
  source("source-huntr-privacy", "Huntr privacy policy", "https://huntr.co/privacy", "Official privacy", "Company claim"),
  source("source-huntr-chrome", "Huntr Job Search Tracker — Chrome Web Store", "https://chromewebstore.google.com/detail/huntr-job-search-tracker/mihdfbecejheednfigjpdacgeilhlmnf?hl=en", "App store"),
  source("source-huntr-trustpilot", "Huntr customer reviews", "https://www.trustpilot.com/review/huntr.co", "Review platform", "Observed", "Medium"),
  source("source-huntr-mongodb", "MongoDB Startup of the Month: Huntr", "https://www.mongodb.com/community/forums/t/our-startup-of-the-month-is-huntr/340344", "Independent profile", "Observed", "Medium"),
];

const jobrightSources = [
  source("source-jobright-official", "Jobright AI job-search copilot", "https://jobright.ai/", "Official product"),
  source("source-jobright-pricing-check", "Jobright product and subscription check", "https://jobright.ai/", "Official pricing", "Company claim", "Medium"),
  source("source-jobright-help", "Jobright blog and product guidance", "https://jobright.ai/blog", "Official help", "Company claim", "Medium"),
  source("source-jobright-privacy", "Jobright privacy policy", "https://jobright.ai/legal/privacy", "Official privacy", "Company claim"),
  source("source-jobright-chrome", "Jobright Autofill — Chrome Web Store", "https://chromewebstore.google.com/detail/jobright-autofill-%E2%80%93-insta/odcnpipkhjegpefkfplmedhmkmmhmoko", "App store"),
  source("source-jobright-techcrunch", "Jobright uses AI to help foreign workers navigate the US job market", "https://techcrunch.com/2024/06/25/jobright-uses-ai-to-help-foreign-workers-navigate-the-us-job-market/", "Credible press"),
  source("source-jobright-trustpilot", "Jobright customer reviews", "https://www.trustpilot.com/review/jobright.ai", "Review platform", "Observed", "Medium"),
  source("source-jobright-googleplay", "Jobright mobile app — Google Play", "https://play.google.com/store/apps/details?hl=en_US&id=ai.jobright.orion", "App store"),
];

const kickresumeSources = [
  source("source-kickresume-official", "Kickresume AI resume and career toolkit", "https://www.kickresume.com/en/", "Official product"),
  source("source-kickresume-pricing-current", "Kickresume Premium pricing", "https://www.kickresume.com/en/pricing/sale/", "Official pricing", "Company claim"),
  source("source-kickresume-help-current", "Kickresume Help Center", "https://support.kickresume.com/", "Official help"),
  source("source-kickresume-privacy", "Kickresume privacy policy", "https://www.kickresume.com/en/privacy/", "Official privacy", "Company claim"),
  source("source-kickresume-googleplay", "Kickresume AI Resume Builder — Google Play", "https://play.google.com/store/apps/details?id=com.kickresume", "App store"),
  source("source-kickresume-trustpilot", "Kickresume customer reviews", "https://www.trustpilot.com/review/kickresume.com", "Review platform", "Observed", "Medium"),
  source("source-kickresume-about", "About Kickresume", "https://www.kickresume.com/en/about/", "Official company", "Company claim"),
];

export const candidateCohortEnrichments = {
  "platform-careerflow": enrichment({
    slug: "careerflow", name: "Careerflow", website: "https://www.careerflow.ai/", category: "Career OS",
    sources: careerflowSources,
    sourceIds: { official:"source-careerflow-official", pricing:"source-careerflow-pricing-current", help:"source-careerflow-help-current", privacy:"source-careerflow-faq-current", review:"source-careerflow-trustpilot", independent:"source-careerflow-independent" },
    headquarters:"California, United States", headquartersMethod:"User-provided research is retained; no controlling legal filing was found in the checked public sources.",
    user:"Individual job seekers, students, recent graduates and professionals managing a job search", buyer:"Individual job seekers plus universities, bootcamps, outplacement firms, workforce programmes and career coaches",
    jtbd:"Build and tailor resumes, assess ATS fit, optimize LinkedIn, track applications and networking, generate cover letters and pitches, and practice interviews.",
    businessModel:"Freemium candidate SaaS with weekly, monthly, quarterly and annual Premium access, a Premium Plus interview tier, human expert-service add-ons and organization plans.",
    positioning:"An AI-powered career readiness platform and career copilot that puts job-search tools in one workspace.", promise:"Help job seekers improve application materials, professional presence, organization and interview readiness.",
    usp:"The broadest differentiation is LinkedIn optimization plus networking tracking and AI mock interviews alongside the resume-and-tracker core; human resume review is an add-on.",
    wedge:"Free job tracker, one resume, LinkedIn optimizer and browser extension acquire users; unlimited AI and interview practice monetize urgency.",
    pricingSummary:"Basic Free; Premium USD 8.99/week or USD 23.99/month; company comparison content also lists USD 54.99/quarter and USD 172.92/year; Premium Plus USD 19.99/week; Expert Resume Review starts at USD 79. Seven-day refund window stated in FAQ.",
    funding:null,
    reach:"Careerflow claims more than 2 million users in its FAQ, while another official product page cites 1.2 million; the conflicting company claims are not treated as active-user evidence.", reachStatus:"Conflicting evidence", reachMethod:"Conflicting official public claims; no monthly-active-user methodology disclosed.", reachConfidence:"Medium",
    gtm:"Freemium PLG, Chrome extension distribution, SEO/content comparisons and free tools, creator/career content, university and workforce partnerships, and expert-service upsells.", gtmChannels:"PLG, extension, SEO/content, B2B2C partnerships and services",
    trust:"Careerflow states encryption in transit and at rest, no sale of personal data, no employer/recruiter sharing without explicit consent, and user-directed deletion. Public certification and model-training details were not found in the checked FAQ/help sources.", trustMethod:"Official FAQ statements; absent certifications are limited to checked public pages.",
    reviews:"Positive themes emphasize a consolidated toolkit and LinkedIn/resume guidance. Risks include inconsistent value across tools, generic AI output and subscription-value concerns; all generated content needs human review.",
    strengths:"Broad career workflow, differentiated LinkedIn/networking tools, interview practice, organization distribution and transparent self-serve entry prices.",
    weaknesses:"Official reach claims conflict, outcome claims lack disclosed methodology, and a wide suite can trade depth for breadth; premium packaging varies by duration and product.",
    india:"High workflow relevance for English-speaking Indian applicants, especially LinkedIn-led discovery and interview practice; India-specific notice-period, salary, document and mobility logic is not evidenced.",
    mobility:"No dedicated sponsorship, visa, work-authorization or relocation workflow was found in checked product/help pages.", mobilityStatus:"Not found after exhaustive search",
    recommendation:"Adapt the integrated LinkedIn/networking and interview-practice loop; differentiate with explainable fit, India-specific constraints, evidence provenance and measurable interview outcomes.",
    experiment:"Test a LinkedIn-to-application concierge loop with 10 Indian job seekers: optimize one target-role profile, generate five human-reviewed warm outreaches and measure qualified replies/interviews.",
    risk:"Generic AI claims, resume-data sensitivity, misleading ATS certainty, conflicting marketing metrics and subscription renewal confusion.",
    features:{
      "feature-resume-jd-parsing":["Yes",2,"ATS and keyword analysis"], "feature-explainable-fit":["Partial",2,"Match/skill score without full causal explanation"], "feature-resume-builder":["Yes",3,"One free; unlimited paid"], "feature-ats-optimization":["Yes",3,"Basic free and advanced paid"], "feature-cover-letters":["Paid-only",3,"Unlimited in Premium"], "feature-application-tailoring":["Yes",2,"One-click optimizer and JD matching"], "feature-browser-autofill":["Partial",1,"Extension functionality; supported-site depth not fully disclosed"], "feature-application-tracker":["Yes",3,"Free and paid"], "feature-recruiter-outreach":["Paid-only",2,"Networking emails and outreach drafts"], "feature-interview-preparation":["Paid-only",3,"Premium Plus AI mock interview and analysis"], "feature-ai-interviewer":["Partial",2,"Practice interviewer, not employer selection"], "feature-api-integrations":["Partial",1,"Extension and organization integrations; public API not found"], "feature-trust-center":["Partial",1,"FAQ privacy controls; no public certification found"]
    },
    pricing:[
      {id:"price-careerflow-free",platformId:"platform-careerflow",platform:"Careerflow",tier:"Basic",nativePrice:0,currency:"USD",billingPeriod:"Lifetime",monthlyEquivalent:0,limits:"One resume; job tracker; LinkedIn optimizer; extension; limited AI",pricingStatus:"Company claim",tax:"Not stated",sourceId:"source-careerflow-pricing-current"},
      {id:"price-careerflow-weekly",platformId:"platform-careerflow",platform:"Careerflow",tier:"Premium Weekly",nativePrice:8.99,currency:"USD",billingPeriod:"7 days",monthlyEquivalent:38.96,limits:"Unlimited listed Premium tools",pricingStatus:"Company claim",tax:"Not stated",sourceId:"source-careerflow-pricing-current"},
      {id:"price-careerflow-plus-weekly",platformId:"platform-careerflow",platform:"Careerflow",tier:"Premium Plus Weekly",nativePrice:19.99,currency:"USD",billingPeriod:"7 days",monthlyEquivalent:86.62,limits:"Premium plus AI mock interview, interview analysis and priority support",pricingStatus:"Company claim",tax:"Not stated",sourceId:"source-careerflow-pricing-current"},
      {id:"price-careerflow-monthly",platformId:"platform-careerflow",platform:"Careerflow",tier:"Premium Monthly",nativePrice:23.99,currency:"USD",billingPeriod:"1 month",monthlyEquivalent:23.99,limits:"Unlimited listed Premium tools",pricingStatus:"Company claim",tax:"Not stated",sourceId:"source-careerflow-pricing-current"},
      {id:"price-careerflow-quarterly",platformId:"platform-careerflow",platform:"Careerflow",tier:"Premium Quarterly",nativePrice:54.99,currency:"USD",billingPeriod:"3 months",monthlyEquivalent:18.33,limits:"Listed by Careerflow comparison content; verify checkout availability",pricingStatus:"Company claim",tax:"Not stated",sourceId:"source-careerflow-official"},
      {id:"price-careerflow-annual",platformId:"platform-careerflow",platform:"Careerflow",tier:"Premium Annual",nativePrice:172.92,currency:"USD",billingPeriod:"12 months",monthlyEquivalent:14.41,limits:"Listed by Careerflow comparison content",pricingStatus:"Company claim",tax:"Not stated",sourceId:"source-careerflow-official"}
    ],
    metrics:[],
  }),

  "platform-simplify": enrichment({
    slug:"simplify",name:"Simplify",website:"https://simplify.jobs/",category:"Career OS",sources:simplifySources,
    sourceIds:{official:"source-simplify-official",pricing:"source-simplify-pricing-current",help:"source-simplify-help-current",privacy:"source-simplify-privacy",store:"source-simplify-chrome",independent:"source-simplify-yc"},
    foundingYear:"2021", foundingMethod:"Launch cohort and credible press date the product/company to 2021.", headquarters:"San Francisco, California, United States", headquartersMethod:"Y Combinator company profile.", funding:"TechCrunch reported a USD 3 million seed round in February 2024.", fundingMethod:"Credible press report; no later total is asserted.",
    user:"Students and professionals discovering jobs, applying and managing a job search",buyer:"Individual job seeker; employers are not the buyer of the candidate product",
    jtbd:"Discover matched roles, autofill applications, tailor resumes, write cover letters and application responses, manage applications, identify referral paths and draft outreach.",
    businessModel:"Freemium candidate platform with a free job board, Copilot and tracker; Simplify+ sells time-bound access to advanced AI, targeting, networking and analytics.",
    positioning:"An AI agent for the job search that combines job discovery, Copilot application assistance and job-search organization.",promise:"Help candidates apply faster and more strategically with stronger, role-specific materials.",
    usp:"A large free job-discovery surface and browser Copilot connect discovery directly to autofill, tailoring, networking and a tracker rather than starting with a standalone resume builder.",
    wedge:"Free job listings and Copilot autofill create frequent acquisition and use; Simplify+ monetizes role-specific writing, networking and application analytics.",
    pricingSummary:"Free core product; Simplify+ USD 19.99 for one week, USD 39.99 for one month, or USD 89.99 for three months. All paid durations list the same feature suite; cancellation is self-serve.",
    reach:"Y Combinator reports more than 1 million job seekers; Simplify's pricing help says more than 50,000 Simplify+ users have landed jobs and states internal outcome uplifts without a published causal methodology.", reachStatus:"Company claim", reachMethod:"Accelerator/company claims, not independently audited active-user or outcome evidence.",
    gtm:"Free job-board SEO/programmatic discovery, freemium PLG, Chrome extension/Copilot distribution, campus and early-career word of mouth, and paid Simplify+ conversion.",gtmChannels:"PLG, job SEO, extension and community distribution",
    trust:"Simplify lets users review and edit generated content before use. The public privacy policy governs candidate data; a public certification or independent bias evaluation was not found in checked sources.",trustMethod:"Official help and privacy pages; absence limited to checked sources.",
    reviews:"Strength themes center on saving time and organizing applications. Risks include incorrect autofill, over-tailored or generic AI text, application mistakes and depending on estimated job-popularity data.",
    strengths:"Discovery-to-application loop, free Copilot distribution, referral-path tooling, clear short-duration packaging, and strong accelerator/press visibility.",weaknesses:"Outcome claims are company-reported, autofill can propagate profile errors at scale, and broad job inventory quality depends on source freshness and deduplication.",
    india:"High relevance for globally oriented Indian students and professionals; explicit India hiring conventions, notice-period filters and mobility workflows are not evidenced.",
    mobility:"No dedicated visa, sponsorship, work-authorization or relocation workflow was found in checked product/help pages.",mobilityStatus:"Not found after exhaustive search",
    recommendation:"Adapt the discovery-to-assisted-apply and referral-path loop, but gate every submission with fit explanation, evidence provenance and human review; differentiate on India/global constraints.",
    experiment:"For 10 target roles, compare a Simplify-like one-click draft against HireNudge's evidence-backed application checklist; measure completion time, error rate and qualified interview rate.",risk:"Autofill errors, stale or duplicated jobs, over-application, fabricated application answers and sensitive profile data.",
    features:{"feature-job-discovery":["Yes",3,"Job board and matching"],"feature-resume-jd-parsing":["Yes",2,"Requirement and keyword comparison"],"feature-explainable-fit":["Partial",2,"Alignment and missing keywords"],"feature-resume-builder":["Yes",3,"Free core, paid AI depth"],"feature-ats-optimization":["Yes",2,"Tailoring and feedback"],"feature-cover-letters":["Paid-only",2,"Simplify+"],"feature-application-tailoring":["Paid-only",3,"Role-specific resume and answers"],"feature-browser-autofill":["Yes",3,"Copilot extension"],"feature-assisted-apply":["Yes",2,"Human-reviewable autofill"],"feature-application-tracker":["Yes",3,"Job Tracker"],"feature-recruiter-outreach":["Paid-only",3,"Follow-up/referral/outreach drafts"],"feature-outcome-learning":["Partial",1,"Job popularity and tracker analytics"],"feature-api-integrations":["Partial",1,"Extension observed; public API not found"],"feature-trust-center":["Partial",1,"Privacy policy; no public certification found"]},
    pricing:[
      {id:"price-simplify-free",platformId:"platform-simplify",platform:"Simplify",tier:"Free",nativePrice:0,currency:"USD",billingPeriod:"Lifetime",monthlyEquivalent:0,limits:"Core job discovery, Copilot and tracker; paid AI depth excluded",pricingStatus:"Company claim",tax:"Not stated",sourceId:"source-simplify-pricing-current"},
      {id:"price-simplify-week",platformId:"platform-simplify",platform:"Simplify",tier:"Simplify+ 1 week",nativePrice:19.99,currency:"USD",billingPeriod:"7 days",monthlyEquivalent:86.62,limits:"Full listed Simplify+ suite",pricingStatus:"Company claim",tax:"Not stated",sourceId:"source-simplify-pricing-current"},
      {id:"price-simplify-month",platformId:"platform-simplify",platform:"Simplify",tier:"Simplify+ 1 month",nativePrice:39.99,currency:"USD",billingPeriod:"1 month",monthlyEquivalent:39.99,limits:"Full listed Simplify+ suite",pricingStatus:"Company claim",tax:"Not stated",sourceId:"source-simplify-pricing-current"},
      {id:"price-simplify-quarter",platformId:"platform-simplify",platform:"Simplify",tier:"Simplify+ 3 months",nativePrice:89.99,currency:"USD",billingPeriod:"3 months",monthlyEquivalent:30,limits:"Full listed Simplify+ suite",pricingStatus:"Company claim",tax:"Not stated",sourceId:"source-simplify-pricing-current"}
    ],metrics:[]
  }),

  "platform-huntr": enrichment({
    slug:"huntr",name:"Huntr",website:"https://huntr.co/",category:"Career CRM",sources:huntrSources,
    sourceIds:{official:"source-huntr-official",pricing:"source-huntr-pricing-current",help:"source-huntr-help-current",privacy:"source-huntr-privacy",store:"source-huntr-chrome",review:"source-huntr-trustpilot",independent:"source-huntr-mongodb"},
    foundingYear:"2017", foundingMethod:"Independent MongoDB company profile names the founder and launch year.", headquarters:"Not publicly disclosed", ownership:"Bootstrapped/private according to an independent MongoDB profile; current ownership percentages are not disclosed",
    user:"Individual job seekers managing applications, documents, contacts and outreach",buyer:"Individual job seeker; career-placement organizations through a separate partner product",
    jtbd:"Build and tailor resumes and cover letters, match a resume to a job, clip and autofill applications, track jobs and contacts, and analyze job-search activity.",businessModel:"Freemium candidate SaaS with monthly, quarterly and six-month Pro subscriptions plus a career-placement platform for organizations.",
    positioning:"A personal job-search CRM and AI application toolkit.",promise:"Make a job search organized and faster while improving job-specific application materials.",usp:"The strongest differentiation is a structured personal CRM—jobs, contacts, notes, tasks, documents, maps and analytics—combined with resume tailoring and unlimited autofill.",wedge:"Free tracker, resume builder and Chrome clipper establish the workflow; Pro removes job limits and monetizes unlimited tailoring, AI and advanced insights.",
    pricingSummary:"Free; Pro USD 40/month, USD 90 every three months (USD 30/month), or USD 160 every six months (USD 26.66/month). No Pro free trial; free credits are available. Self-serve cancellation.",
    reach:"Chrome Web Store shows 90,000 users and 4.8/5 from about 1.3K ratings. Huntr additionally claims 250,000+ people and five million tracked jobs; those company claims are not active-user evidence.",reachMethod:"Direct store observations separated from company cumulative claims.",
    gtm:"Freemium PLG through resume tools and the tracker, Chrome extension distribution, SEO templates/resources, candidate subscriptions and B2B2C career-placement distribution.",gtmChannels:"PLG, extension, SEO/templates and B2B2C",
    trust:"The Chrome listing discloses handling personally identifiable information, authentication, web history, activity and website content. The privacy policy applies; public certification, bias testing and model-training opt-out were not found in checked sources.",trustMethod:"Store disclosure and official privacy check.",
    reviews:"Positive themes emphasize organization, tailoring and the tracker. Complaint themes include autofill misses, limited real-time support and AI output that still requires careful verification.",strengths:"Deep job-search CRM, transparent limits and pricing, strong extension ratings, free core utility and placement-partner pathway.",weaknesses:"Autofill can fail on unsupported forms; the data surface is sensitive; high monthly price and complex workspace may be excessive for casual users.",
    india:"High relevance for organized, global-oriented Indian applicants, but no verified India-specific notice-period, compensation, recruiter or mobility layer.",mobility:"No dedicated visa, sponsorship, work-authorization or relocation workflow was found in checked sources.",mobilityStatus:"Not found after exhaustive search",recommendation:"Adapt the job/contact CRM and evidence vault; keep applications bounded and human-reviewed, then add India-specific constraints and next-best-action logic.",experiment:"Give 10 active job seekers a lightweight jobs-and-contacts board with one evidence-backed tailored packet per role; measure follow-up completion and interview yield.",risk:"Sensitive cross-site browsing data, autofill errors, fabricated AI content and productivity metrics that optimize volume instead of fit.",
    features:{"feature-resume-jd-parsing":["Yes",3,"Advanced keyword, responsibility and qualification matching"],"feature-explainable-fit":["Partial",2,"Matching and qualification insights"],"feature-resume-builder":["Yes",3,"Unlimited base resumes free"],"feature-ats-optimization":["Yes",3,"Scoring, checker and advanced matching"],"feature-cover-letters":["Paid-only",3,"Unlimited Pro"],"feature-application-tailoring":["Paid-only",3,"Unlimited Pro"],"feature-browser-autofill":["Yes",3,"Unlimited application autofills listed in free plan"],"feature-assisted-apply":["Yes",2,"Autofill; autonomous submission not evidenced"],"feature-application-tracker":["Yes",3,"100 jobs free; unlimited Pro"],"feature-recruiter-outreach":["Partial",2,"Contact CRM, notes and tasks"],"feature-outcome-learning":["Partial",2,"Search metrics and insights"],"feature-api-integrations":["Partial",1,"Chrome extension and organization product; public API not found"],"feature-trust-center":["Partial",1,"Privacy disclosures; no public certification found"]},
    pricing:[
      {id:"price-huntr-free",platformId:"platform-huntr",platform:"Huntr",tier:"Free",nativePrice:0,currency:"USD",billingPeriod:"Lifetime",monthlyEquivalent:0,limits:"100 tracked jobs; 2 tailored resumes; 2 application packets; basic matching/scoring; unlimited autofill",pricingStatus:"Company claim",tax:"Not stated",sourceId:"source-huntr-pricing-current"},
      {id:"price-huntr-month",platformId:"platform-huntr",platform:"Huntr",tier:"Pro Monthly",nativePrice:40,currency:"USD",billingPeriod:"1 month",monthlyEquivalent:40,limits:"Unlimited listed Pro AI and tracking features",pricingStatus:"Company claim",tax:"Not stated",sourceId:"source-huntr-pricing-current"},
      {id:"price-huntr-quarter",platformId:"platform-huntr",platform:"Huntr",tier:"Pro Quarterly",nativePrice:90,currency:"USD",billingPeriod:"3 months",monthlyEquivalent:30,limits:"Same Pro features",pricingStatus:"Company claim",tax:"Not stated",sourceId:"source-huntr-pricing-current"},
      {id:"price-huntr-six",platformId:"platform-huntr",platform:"Huntr",tier:"Pro Six Months",nativePrice:160,currency:"USD",billingPeriod:"6 months",monthlyEquivalent:26.67,limits:"Same Pro features",pricingStatus:"Company claim",tax:"Not stated",sourceId:"source-huntr-pricing-current"}
    ],metrics:[
      {id:"metric-huntr-chrome-users",platformId:"platform-huntr",channel:"Chrome Web Store",valueLabel:"90,000 users",numericValue:90000,unit:"users",methodology:"Direct store observation; not active users",sourceId:"source-huntr-chrome",confidence:"High",evidenceStatus:"Observed"},
      {id:"metric-huntr-chrome-rating",platformId:"platform-huntr",channel:"Chrome Web Store",valueLabel:"4.8/5 from about 1.3K ratings",numericValue:4.8,unit:"rating",methodology:"Direct store observation",sourceId:"source-huntr-chrome",confidence:"High",evidenceStatus:"Observed"}
    ]
  }),

  "platform-jobright": enrichment({
    slug:"jobright",name:"Jobright",website:"https://jobright.ai/",category:"AI job discovery",sources:jobrightSources,
    sourceIds:{official:"source-jobright-official",pricing:"source-jobright-pricing-check",help:"source-jobright-help",privacy:"source-jobright-privacy",store:"source-jobright-chrome",review:"source-jobright-trustpilot",independent:"source-jobright-techcrunch"},
    headquarters:"United States", headquartersMethod:"Credible press profile; exact controlling legal headquarters not asserted.",user:"Job seekers in the United States, including international candidates navigating H-1B and sponsorship constraints",buyer:"Individual job seeker; coaching may be sold as an add-on",
    jtbd:"Discover and rank matching jobs, identify sponsorship signals, tailor resumes, autofill applications, track progress and obtain career-agent or coaching guidance.",businessModel:"Freemium candidate product with paid premium access and coaching; exact current public checkout prices were not accessible from the checked official pages.",positioning:"An AI job-search copilot, with a notable wedge for foreign workers navigating the U.S. market.",promise:"Reduce job-search effort and surface better-fit opportunities, including sponsorship-aware options.",usp:"Sponsorship/H-1B context and an integrated job-discovery agent differentiate it from generic resume-first products.",wedge:"Free AI job matching and a Chrome autofill extension create acquisition; premium guidance, tailoring and coaching deepen monetization.",
    pricingSummary:"Exact current public prices were not found on accessible official product/help pages. Competitor comparison pages cite weekly, monthly, quarterly and coaching prices, but these are not accepted as controlling checkout evidence.",pricingEvidence:"Not found after exhaustive search",pricingMethod:"Official product/help pages checked; third-party competitor pricing was rejected as controlling evidence.",pricingConfidence:"Low",
    reach:"Chrome Web Store shows 200,000 users, 4.8/5 and 282 ratings; the listing claims 500,000+ job seekers. Google Play shows 577 reviews. Store counts are not monthly-active-user evidence.",reachMethod:"Direct Chrome and Google Play observations separated from company cumulative claims.",
    gtm:"Freemium PLG, extension and mobile distribution, job-search SEO/content, H-1B and foreign-worker positioning, and coaching upsell.",gtmChannels:"PLG, extension/mobile, SEO/content and coaching",
    trust:"The Chrome listing discloses handling personally identifiable information, user activity and website content. The privacy policy applies; automated application data should be treated as sensitive and human-reviewed.",trustMethod:"Official privacy policy and direct store data-practice disclosure.",
    reviews:"Positive themes emphasize relevant discovery and sponsorship filters. Complaint themes include autofill problems, irrelevant matches and the need to verify AI-generated or submitted content.",strengths:"Distinct mobility/sponsorship wedge, job discovery, multi-surface distribution and a large observed extension install base.",weaknesses:"Official public price transparency is weak; matching and autofill quality can vary; sponsorship data can become stale and materially affect candidate decisions.",
    india:"Very high relevance for Indian candidates targeting U.S. roles because sponsorship is explicit, though India-origin documentation, notice periods and other destination countries remain gaps.",mobility:"H-1B/foreign-worker navigation and sponsorship-aware job discovery are explicitly part of the public wedge.",mobilityStatus:"Observed",recommendation:"Adapt sponsorship-aware discovery and role prioritization, but show source freshness and uncertainty for every mobility signal; combine it with India-origin readiness and TerraTern consent boundaries.",experiment:"For 20 U.S.-target roles, compare generic matching with sponsorship-aware, evidence-backed ranking for five Indian applicants; measure saved dead-end applications and qualified replies.",risk:"Stale sponsorship inference, autofill errors, sensitive immigration/profile data, over-application and opaque ranking.",
    features:{"feature-job-discovery":["Yes",3,"AI matching and job search"],"feature-resume-jd-parsing":["Yes",2,"Resume/job matching"],"feature-explainable-fit":["Partial",2,"Match guidance; full model explanation not found"],"feature-resume-builder":["Partial",2,"Resume tailoring rather than template-first builder"],"feature-ats-optimization":["Yes",2,"Tailoring and scoring"],"feature-application-tailoring":["Yes",2,"Job-specific assistance"],"feature-browser-autofill":["Yes",3,"Chrome extension"],"feature-assisted-apply":["Yes",2,"Autofill/instant apply with user review required"],"feature-application-tracker":["Yes",2,"Application management"],"feature-global-mobility":["Yes",3,"H-1B and sponsorship focus"],"feature-outcome-learning":["Partial",1,"Career-agent guidance; closed-loop model not disclosed"],"feature-api-integrations":["Partial",1,"Browser/mobile surfaces; public API not found"],"feature-trust-center":["Partial",1,"Privacy policy and store disclosures"]},
    pricing:[],metrics:[
      {id:"metric-jobright-chrome-users",platformId:"platform-jobright",channel:"Chrome Web Store",valueLabel:"200,000 users",numericValue:200000,unit:"users",methodology:"Direct store observation; not active users",sourceId:"source-jobright-chrome",confidence:"High",evidenceStatus:"Observed"},
      {id:"metric-jobright-chrome-rating",platformId:"platform-jobright",channel:"Chrome Web Store",valueLabel:"4.8/5 from 282 ratings",numericValue:4.8,unit:"rating",methodology:"Direct store observation",sourceId:"source-jobright-chrome",confidence:"High",evidenceStatus:"Observed"}
    ]
  }),

  "platform-kickresume": enrichment({
    slug:"kickresume",name:"Kickresume",website:"https://www.kickresume.com/en/",category:"Resume & career toolkit",sources:kickresumeSources,
    sourceIds:{official:"source-kickresume-official",pricing:"source-kickresume-pricing-current",help:"source-kickresume-help-current",privacy:"source-kickresume-privacy",store:"source-kickresume-googleplay",review:"source-kickresume-trustpilot",independent:"source-kickresume-trustpilot"},
    foundingYear:"2013", foundingMethod:"Company about page describes more than a decade of operation; exact year is treated as company-provided context.",headquarters:"Slovakia",headquartersMethod:"Company/legal context; exact current principal office is not asserted.",
    user:"Job seekers, students and professionals creating application materials and preparing for career decisions",buyer:"Individual job seeker; verified students and teachers receive a separate education offer",
    jtbd:"Create resumes and cover letters, import LinkedIn/PDF data, check ATS compatibility, generate content, publish a personal website and explore career paths.",businessModel:"Freemium candidate SaaS with monthly, quarterly and annual Premium subscriptions; education verification grants six months of Premium; mobile apps extend distribution.",positioning:"An AI resume builder and career toolkit with designer templates and a large example library.",promise:"Help users create professional, ATS-compatible application materials quickly.",usp:"Polished templates, 2,200+ resume examples, multi-platform mobile access, personal websites and career-map guidance create a stronger design/content library wedge than tracker-first tools.",wedge:"Free resume creation, examples and templates acquire users; Premium monetizes full template access, AI, ATS checks, career tools and exports.",
    pricingSummary:"Current sale page lists Premium at USD 19.20 for the first month (normally USD 24/month), USD 43.20 for the first three months or USD 14.40/month (normally USD 18/month), and USD 76.80 for the first year or USD 6.40/month (normally USD 8/month). Fourteen-day money-back promise shown. Promotional prices are time-sensitive.",
    reach:"Google Play shows 100,000+ downloads, 4.3/5 and about 2.44K reviews. Kickresume claims more than eight million users across the platform; this is cumulative company-reported reach, not active use.",reachMethod:"Direct Google Play observations separated from company cumulative claims.",
    gtm:"Freemium PLG, SEO through resume examples/templates and career content, mobile apps, student/teacher offers, referrals and premium subscription conversion.",gtmChannels:"PLG, SEO/template library, mobile, education and referrals",
    trust:"The official privacy policy governs account, resume and AI-processing data. Users should verify generated claims and control exports; no independently verified bias evaluation was found in checked sources.",trustMethod:"Official privacy policy and public product review.",
    reviews:"Positive themes emphasize ease of use, templates and output quality. Complaint themes include subscription/refund expectations, template constraints and AI text that can become generic.",strengths:"Large template/example corpus, strong design experience, mobile apps, student distribution, transparent promotional pricing and broad application-material coverage.",weaknesses:"Resume creation is a crowded category; promotional renewal pricing can confuse; design quality does not prove interview outcomes and generated content needs provenance review.",
    india:"High relevance as a polished application-material benchmark, but limited evidence of India-specific resumes, notice periods, salary, recruiting channels or international mobility.",mobility:"No dedicated visa, sponsorship, work-authorization or relocation workflow was found in checked product/help pages.",mobilityStatus:"Not found after exhaustive search",recommendation:"Adapt the content/example library and polished mobile-friendly creation flow; differentiate with evidence-backed achievements, role fit, job tracking and India-to-global execution.",experiment:"Test an evidence-vault-assisted resume builder against a template-only flow with 10 Indian professionals; measure unsupported-claim rate, completion time and recruiter-screen conversion.",risk:"Fabricated achievements, generic AI language, resume-data exposure, promotional renewal confusion and optimizing aesthetics rather than qualified interview outcomes.",
    features:{"feature-resume-jd-parsing":["Yes",2,"ATS checker and job alignment"],"feature-explainable-fit":["Partial",1,"ATS feedback; full role-fit model not found"],"feature-resume-builder":["Yes",3,"Templates, examples, import and mobile"],"feature-ats-optimization":["Yes",3,"ATS checker"],"feature-cover-letters":["Yes",3,"Builder and AI"],"feature-application-tailoring":["Partial",2,"Job-specific content support"],"feature-interview-preparation":["Partial",1,"Career toolkit; deep interview workflow not central"],"feature-outcome-learning":["Partial",1,"Career Map guidance; closed-loop application outcome learning not found"],"feature-api-integrations":["Partial",1,"LinkedIn/PDF import, mobile; public API not found"],"feature-global-mobility":["Not offered",0,"No dedicated mobility workflow found"],"feature-trust-center":["Partial",1,"Privacy/legal pages; independent certification not found"]},
    pricing:[
      {id:"price-kickresume-free",platformId:"platform-kickresume",platform:"Kickresume",tier:"Free",nativePrice:0,currency:"USD",billingPeriod:"Lifetime",monthlyEquivalent:0,limits:"Limited templates and features",pricingStatus:"Company claim",tax:"Not stated",sourceId:"source-kickresume-pricing-current"},
      {id:"price-kickresume-month-sale",platformId:"platform-kickresume",platform:"Kickresume",tier:"Premium Monthly — introductory sale",nativePrice:19.2,currency:"USD",billingPeriod:"First month",monthlyEquivalent:19.2,limits:"Normally USD 24/month; promotional and time-sensitive",pricingStatus:"Company claim",tax:"Not stated",sourceId:"source-kickresume-pricing-current"},
      {id:"price-kickresume-quarter-sale",platformId:"platform-kickresume",platform:"Kickresume",tier:"Premium Quarterly — introductory sale",nativePrice:43.2,currency:"USD",billingPeriod:"First 3 months",monthlyEquivalent:14.4,limits:"Normally USD 18/month; promotional and time-sensitive",pricingStatus:"Company claim",tax:"Not stated",sourceId:"source-kickresume-pricing-current"},
      {id:"price-kickresume-year-sale",platformId:"platform-kickresume",platform:"Kickresume",tier:"Premium Annual — introductory sale",nativePrice:76.8,currency:"USD",billingPeriod:"First 12 months",monthlyEquivalent:6.4,limits:"Normally USD 8/month; promotional and time-sensitive",pricingStatus:"Company claim",tax:"Not stated",sourceId:"source-kickresume-pricing-current"}
    ],metrics:[
      {id:"metric-kickresume-play-downloads",platformId:"platform-kickresume",channel:"Google Play",valueLabel:"100,000+ downloads",numericValue:100000,unit:"downloads",methodology:"Direct store threshold; not active users",sourceId:"source-kickresume-googleplay",confidence:"High",evidenceStatus:"Observed"},
      {id:"metric-kickresume-play-rating",platformId:"platform-kickresume",channel:"Google Play",valueLabel:"4.3/5 from about 2.44K reviews",numericValue:4.3,unit:"rating",methodology:"Direct store observation",sourceId:"source-kickresume-googleplay",confidence:"High",evidenceStatus:"Observed"}
    ]
  }),
};
