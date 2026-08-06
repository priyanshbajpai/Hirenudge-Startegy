const candidatePlatforms = [
  ["Teal", "Career OS", "Global", "https://www.tealhq.com/"],
  ["Careerflow", "Career OS", "Global", "https://www.careerflow.ai/"],
  ["Simplify", "Career OS", "Global", "https://simplify.jobs/"],
  ["Huntr", "Career CRM", "Global", "https://huntr.co/"],
  ["LoopCV", "Auto-apply", "Global", "https://www.loopcv.pro/"],
  ["Jobright", "AI job discovery", "Global", "https://jobright.ai/"],
  ["Sonara", "Auto-apply", "Global", "https://www.sonara.ai/"],
  ["LazyApply", "Auto-apply", "Global", "https://lazyapply.com/"],
  ["JobCopilot", "Auto-apply", "Global", "https://jobcopilot.com/"],
  ["WonsultingAI", "Career tools", "Global", "https://www.wonsulting.com/wonsultingai"],
  ["NexApply", "AI job search", "Global", "https://nexapply.com/"],
  ["NextJob.ai", "AI job search", "Global", "https://nextjob.ai/"],
  ["Jobscan", "ATS optimization", "Global", "https://www.jobscan.co/"],
  ["Rezi", "Resume tools", "Global", "https://www.rezi.ai/"],
  ["Kickresume", "Resume tools", "Global", "https://www.kickresume.com/"],
  ["Resume Worded", "Resume tools", "Global", "https://resumeworded.com/"],
  ["Enhancv", "Resume tools", "Global", "https://enhancv.com/"],
  ["Resume.io", "Resume tools", "Global", "https://resume.io/"],
  ["Zety", "Resume tools", "Global", "https://zety.com/"],
  ["Final Round AI", "Interview copilot", "Global", "https://www.finalroundai.com/"],
  ["Naukri", "Job marketplace", "India", "https://www.naukri.com/"],
  ["Naukri Clear", "Career tools", "India", "https://naukriclear.com/"],
  ["Mployee.me", "Career tools", "India", "https://www.mployee.me/"],
  ["Internshala", "Early career marketplace", "India", "https://internshala.com/"],
  ["Cutshort", "Tech talent marketplace", "India", "https://cutshort.io/"],
  ["Apna", "Jobs marketplace", "India", "https://apna.co/"],
  ["JobTrackker", "Application tracker", "India", "https://jobtrackker.com/"],
  ["LinkedIn Premium", "Professional network", "Global", "https://premium.linkedin.com/careers/compare-plans"],
  ["Indeed", "Job marketplace", "Global", "https://www.indeed.com/"],
  ["ChatGPT", "General AI substitute", "Global", "https://chatgpt.com/"]
  ,["AiApply", "Auto-apply & interview tools", "Global", "https://aiapply.co/"]
  ,["JobHuntr", "Career CRM", "Global", "https://www.jobhuntr.fyi/"]
  ,["ApplyHero", "Auto-apply", "Global", "https://www.applyhero.ai/"]
  ,["JobLeads", "Job marketplace", "Global", "https://www.jobleads.com/"]
];

const employerPlatforms = [
  ["SeekOut", "Sourcing & talent intelligence", "Global", "https://www.seekout.com/"],
  ["hireEZ", "Sourcing & talent intelligence", "Global", "https://hireez.com/"],
  ["Findem", "Sourcing & talent intelligence", "Global", "https://www.findem.ai/"],
  ["Gem", "Sourcing & talent intelligence", "Global", "https://www.gem.com/"],
  ["Fetcher", "Sourcing & talent intelligence", "Global", "https://fetcher.ai/"],
  ["Juicebox PeopleGPT", "Sourcing & talent intelligence", "Global", "https://juicebox.ai/"],
  ["AmazingHiring", "Sourcing & talent intelligence", "Global", "https://amazinghiring.com/"],
  ["Pearch.ai", "Sourcing & talent intelligence", "Global", "https://pearch.ai/"],
  ["Ashby", "ATS & orchestration", "Global", "https://www.ashbyhq.com/"],
  ["Greenhouse", "ATS & orchestration", "Global", "https://www.greenhouse.com/"],
  ["Lever", "ATS & orchestration", "Global", "https://www.lever.co/"],
  ["Workable", "ATS & orchestration", "Global", "https://www.workable.com/"],
  ["SmartRecruiters", "ATS & orchestration", "Global", "https://www.smartrecruiters.com/"],
  ["Eightfold AI", "ATS & orchestration", "Global", "https://eightfold.ai/"],
  ["Phenom", "ATS & orchestration", "Global", "https://www.phenom.com/"],
  ["TurboHire", "ATS & orchestration", "India", "https://turbohire.co/"],
  ["HireVue", "AI screening", "Global", "https://www.hirevue.com/"],
  ["HiPeople", "AI screening", "Global", "https://www.hipeople.io/"],
  ["Humanly", "AI screening", "Global", "https://www.humanly.io/"],
  ["Sapia.ai", "AI screening", "Global", "https://sapia.ai/"],
  ["Hyring", "AI screening", "India", "https://hyring.com/"],
  ["HirePlusPlus", "AI screening", "India", "https://hireplusplus.com/"],
  ["Elly.ai", "AI screening", "Global", "https://elly.ai/"],
  ["Round1", "AI screening", "Global", "https://round1.ai/"],
  ["IntervAI", "AI screening", "Global", "https://intervai.ai/"],
  ["Intervue.io", "Technical interviews", "India", "https://www.intervue.io/"],
  ["Karat", "Technical interviews", "Global", "https://karat.com/"],
  ["BarRaiser", "Interview-as-a-service", "India", "https://www.barraiser.com/"],
  ["InCruiter", "Interview-as-a-service", "India", "https://incruiter.com/"],
  ["InterviewVector", "Interview-as-a-service", "India", "https://www.interviewvector.com/"],
  ["HackerRank", "Technical assessment", "Global", "https://www.hackerrank.com/"],
  ["CodeSignal", "Technical assessment", "Global", "https://codesignal.com/"],
  ["TestGorilla", "Assessment & proctoring", "Global", "https://www.testgorilla.com/"],
  ["Canditech", "Assessment & proctoring", "Global", "https://www.canditech.io/"],
  ["Vervoe", "Assessment & proctoring", "Global", "https://vervoe.com/"],
  ["Mercer Mettl", "Assessment & proctoring", "India", "https://mettl.com/"],
  ["iMocha", "Assessment & proctoring", "India", "https://www.imocha.io/"],
  ["WeCP", "Assessment & proctoring", "India", "https://www.wecreateproblems.com/"],
  ["Talview", "Assessment & proctoring", "India", "https://www.talview.com/"],
  ["BrightHire", "Interview intelligence", "Global", "https://brighthire.com/"],
  ["Metaview", "Interview intelligence", "Global", "https://www.metaview.ai/"],
  ["Screenloop", "Interview intelligence", "Global", "https://www.screenloop.com/"],
  ["Pillar", "Interview intelligence", "Global", "https://www.pillar.hr/"],
  ["Clovers", "Interview intelligence", "Global", "https://www.clovers.ai/"],
  ["Paradox", "Conversational hiring", "Global", "https://www.paradox.ai/"]
];

const watchlistNames = [
  "ApplyFriend", "ApplyWave", "BestApply", "HirePilot", "innerTrack", "Reactive Resume", "HiringCafe", "Foundit", "Shine", "JobHai", "Hirect", "Instahyre", "Wellfound", "RoleGrowth", "Algohire", "Mishuk Labs", "Intervyo", "Atollo Scout", "AI.HYR", "Interviewer.AI", "HireVire", "Adaface", "HackerEarth", "CoderPad", "Coderbyte", "Glider AI", "Maki People", "Bryq", "Harver", "GoodTime", "XOR", "ConverzAI", "Ribbon", "Sense", "Fountain", "Manatal", "Zoho Recruit", "Freshteam", "Keka", "Darwinbox", "Zwayam", "Recruit CRM", "SpringVerify", "OnGrid", "Checkr", "Beamery", "Gloat", "SkyHive", "iCIMS", "Avature"
];

const slug = (name) => name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
const id = (prefix, name) => `${prefix}-${slug(name)}`;

export const platforms = [...candidatePlatforms.map((p) => [...p, "Candidate-side"]), ...employerPlatforms.map((p) => [...p, "Employer-side"])].map(([name, category, geography, website, side], index) => ({
  id: id("platform", name), name, category, geography, website, side,
  lifecycle: "Active / verification pending",
  evidenceStatus: ["Teal", "Careerflow", "Simplify", "Huntr", "Rezi", "Kickresume", "Ashby", "HireVue", "TestGorilla"].includes(name) ? "In review" : "Needs verification",
  sourceFreshness: index < 30 ? "Core" : "Benchmark",
  classificationSource: "User-provided implementation plan",
  reviewDue: "2026-08-31",
  rowVersion: 1
}));

export const aliases = [
  { id: "alias-kickresume", alias: "KickResume", platformId: "platform-kickresume" },
  { id: "alias-simplifyjobs", alias: "SimplifyJobs", platformId: "platform-simplify" },
];

export const importedResearch = [
  { name:"KickResume", reach:"17k followers Insta\n772.5K Traffic\n421k Linkedin", product:"Features\nResume Templates\nCover Letter Templates\nWebsite/ Portfolio Building\nCareer Mapping- based on Skillset\nATS Score Checker", url:"https://www.kickresume.com/en/", countryBase:"Brastilava", founder:"https://www.linkedin.com/in/peterduris/?originalSubdomain=sk", userAcquisitionStrategy:"", importantLinks:"" },
  { name:"Teal", reach:"165K Linkedin\n1.9M Traffic\n9k Insta\n33k YT", product:"AI Resume Builder\nBookmark and Job application organiser using a Chrome extension [ Job Tracker ]\nResume Keyword Scanner\nJob Search based on scrapping from 40 websites and using the above functionality.", url:"https://www.tealhq.com/", countryBase:"Florida", founder:"https://www.linkedin.com/in/davidfano/", userAcquisitionStrategy:"", importantLinks:"" },
  { name:"Careerflow", reach:"440k Traffic", product:"Same as Teal along with AI Mock Interview feature, couldnt find the jobs listing of their own like teal", url:"https://www.careerflow.ai/", countryBase:"California", founder:"https://www.linkedin.com/in/punkohl/", userAcquisitionStrategy:"", importantLinks:"https://jobright.ai/blog/careerflow-review-2026-features-pricing-and-user-experience/" },
  { name:"Jobright", reach:"2.8M Traffic\n4k Insta\n52k LinkedIn", product:"Scrapping for Jobs, mapping your resume to it and giving you realtime insights and tips to improve it. \n\nBest tool so far I have come across, has 4.7 Rating on TrustPilot", url:"https://jobright.ai/", countryBase:"California", founder:"https://www.linkedin.com/in/ericcheng26/", userAcquisitionStrategy:"", importantLinks:"https://www.linkedin.com/posts/zhengyudian_startups-founderstory-ai-activity-7419793411806801920-d6sy?utm_source=share&utm_medium=member_desktop&rcm=ACoAADOLreMB4fmDDiaXe3VC2zbFwk_YoEqOSu4" },
  { name:"SimplifyJobs", reach:"1.2M Traffic\n41k Linkedin\n44k Insta", product:"Extension 4.9 Rated\nJob Application tracking\nResume", url:"https://simplify.jobs/", countryBase:"California", founder:"https://www.linkedin.com/in/myan/", userAcquisitionStrategy:"", importantLinks:"" },
  { name:"AiApply", reach:"525k Traffic\n103K insta\n5k Linkedin", product:"Auto Job apply\nAI interview buddy [realtime interview cheating]\nAI resume\nAI mock interview", url:"https://aiapply.co/", countryBase:"London", founder:"https://www.linkedin.com/in/aidancramer/?originalSubdomain=uk", userAcquisitionStrategy:"", importantLinks:"" },
  { name:"JobHuntr", reach:"", product:"ATS Resume\nAutomated OutReach\nApplication Tracking Management", url:"https://www.jobhuntr.fyi/", countryBase:"", founder:"", userAcquisitionStrategy:"", importantLinks:"https://www.jobhuntr.fyi/jobhuntr-101" },
  { name:"ApplyHero", reach:"10k Traffic\n", product:"AI job application", url:"https://www.applyhero.ai/", countryBase:"US", founder:"", userAcquisitionStrategy:"", importantLinks:"2.7 Rated on Trustpilot" },
  { name:"JobLeads", reach:"553k Linkedin\n22k Insta\n53k YT\n6.3M Traffic", product:"Jobs Listed from 40+ nations", url:"https://www.jobleads.com/", countryBase:"Hamburg Germany", founder:"", userAcquisitionStrategy:"", importantLinks:"" },
  { name:"LazyApply", reach:"165k Traffic\n11k Linkedin\n1200 Insta", product:"Automated Job Application\napplication tracking dashboard\nResume maker and AI checker", url:"https://lazyapply.com/", countryBase:"Bangalore", founder:"https://www.linkedin.com/in/prakhar-gupta-a8a859175/", userAcquisitionStrategy:"", importantLinks:"" },
].map((row, index) => ({ ...row, id:`imported-research-${String(index+1).padStart(2,"0")}`, observedDate:"2026-08-01", evidenceStatus:"Provided research — verification required", rowVersion:1 }));

const importPlatformName = (name) => name === "KickResume" ? "Kickresume" : name === "SimplifyJobs" ? "Simplify" : name;
const importedByPlatform = new Map(importedResearch.map((row) => [importPlatformName(row.name), row]));

export const profiles = platforms.map((platform) => {
  const research = importedByPlatform.get(platform.name);
  const candidateSummary = platform.side === "Candidate-side"
    ? `${platform.category} product supporting parts of the job-search workflow.`
    : `${platform.category} benchmark included for transferable hiring-product, data, trust, or GTM patterns.`;
  return {
    id:`profile-${slug(platform.name)}`, platformId:platform.id, location:research?.countryBase || platform.geography,
    founder:research?.founder || "", founderUrl:research?.founder || "", productSummary:research?.product || candidateSummary,
    featuresSummary:research?.product || "Needs research", usp:research ? "Provided research requires verification against official product sources." : "Needs research",
    acquisitionStrategy:research?.userAcquisitionStrategy || "Needs research", reachSummary:research?.reach || "Needs research",
    pricingSummary:"See sourced pricing tiers", revenueStatus:"Not publicly disclosed / research pending",
    importantLinks:research?.importantLinks || "", whyTheyWin:"Needs research", strengths:"Needs research", weaknesses:"Needs research",
    hirenudgeImplication:platform.side === "Candidate-side" ? "Assess the workflow, trust, pricing and distribution pattern for a bounded HireNudge test." : "Translate employer-side capability into a candidate-owned outcome before considering transfer.",
    confidence:research ? "Provided research — verification required" : "Needs verification", freshness:"2026-08-01", owner:"Unassigned",
    tier:["SeekOut","Ashby","Greenhouse","HireVue","Humanly","Sapia.ai","Karat","HackerRank","CodeSignal","TestGorilla","TurboHire","Hyring","HirePlusPlus","Intervue.io","BarRaiser","InCruiter","InterviewVector","Mercer Mettl","iMocha","WeCP","Talview"].includes(platform.name) || platform.side === "Candidate-side" ? "Deep" : "Summary",
    rowVersion:1,
  };
});

const reachLines = (row) => row.reach.split("\n").map((line) => line.trim()).filter(Boolean);
export const reachMetrics = importedResearch.flatMap((row) => reachLines(row).map((line, index) => ({
  id:`reach-${slug(importPlatformName(row.name))}-${index+1}`, platformId:id("platform", importPlatformName(row.name)), channel:/traffic/i.test(line)?"Website traffic":/linkedin/i.test(line)?"LinkedIn":/insta/i.test(line)?"Instagram":/yt/i.test(line)?"YouTube":"Provided reach",
  valueLabel:line, numericValue:null, unit:"Provided label", methodology:"No source, method or date supplied in attached research CSV",
  sourceId:`source-import-${slug(importPlatformName(row.name))}`, observedDate:"2026-08-01", confidence:"Low", evidenceStatus:"Provided research — verification required", rowVersion:1,
})));

export const gtmObservations = importedResearch.map((row) => ({
  id:`gtm-import-${slug(importPlatformName(row.name))}`, platformId:id("platform", importPlatformName(row.name)), channel:"Provided research",
  strategy:row.userAcquisitionStrategy || "Not populated in attached CSV", evidenceStatus:"Provided research — verification required",
  sourceId:`source-import-${slug(importPlatformName(row.name))}`, observedDate:"2026-08-01", confidence:"Low", rowVersion:1,
}));

export const researchNotes = importedResearch.map((row) => ({
  id:`note-import-${slug(importPlatformName(row.name))}`, platformId:id("platform", importPlatformName(row.name)), title:"Imported Research_Div.csv record",
  body:`Name: ${row.name}\nReach: ${row.reach}\nProduct: ${row.product}\nURL: ${row.url}\nCountry Base: ${row.countryBase}\nFounder: ${row.founder}\nUser Acquisition Strategy: ${row.userAcquisitionStrategy}\nImportant Links: ${row.importantLinks}`,
  sourceType:"User-provided CSV", evidenceStatus:"Provided research — verification required", createdAt:"2026-08-01T09:00:00+05:30", createdBy:"Priyansh", rowVersion:1,
}));

export const watchlist = watchlistNames.map((name) => ({
  id: id("watch", name), name, category: "Emerging / adjacent", geography: "Unknown",
  source: "User-provided seed watchlist", status: "Needs verification", transferRelevance: "Unknown",
  nextReview: "2026-08-08", rowVersion: 1
}));

export const features = [
  "Role intake & JD creation", "Role calibration & rubrics", "Job discovery", "Talent sourcing", "Talent graph & rediscovery", "Resume/JD parsing", "Explainable fit", "Resume builder", "ATS optimization", "Cover letters", "Application tailoring", "Browser autofill", "Assisted apply", "Application tracker", "Inbox synchronization", "Recruiter outreach", "Candidate nurture", "Interview preparation", "AI interviewer", "Interview recording & transcription", "Structured scorecards", "Technical assessment", "Fraud & authenticity", "Scheduling", "Offers & compensation", "India hiring fields", "Global mobility & sponsorship", "Outcome learning", "API & integrations", "Trust center"
].map((name) => ({ id: id("feature", name), name }));

const observed = (platform, featureNames, sourceId, depth = 2) => featureNames.map((feature) => ({
  id: id("obs", `${platform}-${feature}`), platformId: id("platform", platform), featureId: id("feature", feature),
  availability: "Yes", depth, tier: "See source", evidenceStatus: "Observed", sourceId,
  observedDate: "2026-08-01", confidence: "High", notes: "Official product or pricing page."
}));

export const featureObservations = [
  ...observed("Teal", ["Job discovery", "Resume builder", "ATS optimization", "Cover letters", "Application tailoring", "Browser autofill", "Application tracker", "Interview preparation"], "src-teal-pricing"),
  ...observed("Careerflow", ["Resume builder", "ATS optimization", "Cover letters", "Application tracker", "Recruiter outreach", "Interview preparation"], "src-careerflow-faq"),
  ...observed("Simplify", ["Job discovery", "Resume builder", "ATS optimization", "Application tailoring", "Browser autofill", "Application tracker", "Recruiter outreach"], "src-simplify-pricing"),
  ...observed("Huntr", ["Resume builder", "Resume/JD parsing", "ATS optimization", "Cover letters", "Browser autofill", "Application tracker"], "src-huntr-pricing"),
  ...observed("Rezi", ["Resume builder", "ATS optimization", "Interview preparation"], "src-rezi-pricing"),
  ...observed("Kickresume", ["Resume builder", "ATS optimization", "Cover letters"], "src-kickresume-pricing"),
  ...observed("Ashby", ["Role intake & JD creation", "Role calibration & rubrics", "Talent sourcing", "Talent graph & rediscovery", "Application tracker", "Candidate nurture", "Structured scorecards", "Scheduling", "Offers & compensation", "Fraud & authenticity", "API & integrations"], "src-ashby-pricing", 3),
  ...observed("HireVue", ["AI interviewer", "Technical assessment", "Scheduling", "API & integrations", "Trust center"], "src-hirevue-pricing", 3),
  ...observed("TestGorilla", ["AI interviewer", "Technical assessment", "Fraud & authenticity", "API & integrations", "Trust center"], "src-testgorilla-pricing", 3)
  ,...observed("AiApply", ["Resume builder", "Assisted apply", "Interview preparation", "AI interviewer"], "source-import-aiapply")
  ,...observed("JobHuntr", ["ATS optimization", "Recruiter outreach", "Application tracker"], "source-import-jobhuntr")
  ,...observed("ApplyHero", ["Assisted apply"], "source-import-applyhero")
  ,...observed("JobLeads", ["Job discovery"], "source-import-jobleads")
  ,...observed("LazyApply", ["Assisted apply", "Application tracker", "Resume builder", "ATS optimization"], "source-import-lazyapply")
];

const tier = (platform, name, price, currency, billing, monthly, limits, sourceId, status = "Observed") => ({
  id: id("price", `${platform}-${name}-${billing}`), platformId: platform === "HireNudge" ? "platform-hirenudge" : id("platform", platform), platform,
  tier: name, nativePrice: price, currency, billingPeriod: billing, monthlyEquivalent: monthly, limits,
  pricingStatus: status, tax: platform === "HireNudge" && name !== "Free" ? "18% GST additional" : "Not specified",
  observedDate: "2026-08-01", sourceId, rowVersion: 1
});

export const pricing = [
  tier("HireNudge", "Free", 0, "USD", "Lifetime", 0, "30 credits; 10 outreach contacts", "src-hirenudge-pricing"),
  tier("HireNudge", "Pro", 19, "USD", "30 days", 19, "120 credits; 100 outreach contacts; $22.42 incl. GST", "src-hirenudge-pricing"),
  tier("HireNudge", "Career Boost", 45, "USD", "90 days", 15, "500 credits; 300 outreach contacts; $53.10 incl. GST", "src-hirenudge-pricing"),
  tier("Teal", "Free Forever", 0, "USD", "Lifetime", 0, "Limited premium analysis and AI credits", "src-teal-pricing"),
  tier("Teal", "Teal+ Weekly", 13, "USD", "7 days", 56.33, "Unlimited premium features shown on page", "src-teal-pricing"),
  tier("Teal", "Teal+ Monthly", 29, "USD", "30 days", 29, "Unlimited premium features shown on page", "src-teal-pricing"),
  tier("Teal", "Teal+ Quarterly", 79, "USD", "90 days", 26.33, "Unlimited premium features shown on page", "src-teal-pricing"),
  tier("Careerflow", "Basic", 0, "USD", "Lifetime", 0, "Free core tools", "src-careerflow-pricing"),
  tier("Careerflow", "Premium Weekly", 8.99, "USD", "7 days", 38.96, "Premium toolkit", "src-careerflow-pricing"),
  tier("Careerflow", "Premium Monthly", 23.99, "USD", "1 month", 23.99, "Premium toolkit", "src-careerflow-pricing"),
  tier("Huntr", "Free", 0, "USD", "Lifetime", 0, "100 tracked jobs; 2 tailored resumes", "src-huntr-pricing"),
  tier("Huntr", "Pro Monthly", 40, "USD", "1 month", 40, "Unlimited premium usage described", "src-huntr-pricing"),
  tier("Huntr", "Pro Quarterly", 90, "USD", "3 months", 30, "Same Pro features", "src-huntr-pricing"),
  tier("Huntr", "Pro Biannual", 160, "USD", "6 months", 26.67, "Same Pro features", "src-huntr-pricing"),
  tier("Rezi", "Free", 0, "USD", "Lifetime", 0, "1 resume; 1 AI interview; 3 PDF downloads", "src-rezi-pricing"),
  tier("Rezi", "Pro", 29, "USD", "1 month", 29, "Unlimited resumes, AI interviews and downloads", "src-rezi-pricing"),
  tier("Rezi", "Lifetime", 149, "USD", "One-time", null, "Pro except monthly expert review", "src-rezi-pricing"),
  tier("Rezi", "Enterprise", 99, "USD", "1 month / 200 users", 99, "Per 200 users", "src-rezi-pricing"),
  tier("Kickresume", "Free", 0, "USD", "Lifetime", 0, "Free customization options", "src-kickresume-pricing"),
  tier("Kickresume", "Premium Monthly promo", 19.2, "USD", "1 month", 19.2, "Promo; regular $24", "src-kickresume-pricing"),
  tier("Kickresume", "Premium Quarterly promo", 43.2, "USD", "3 months", 14.4, "Promo; regular $18/month", "src-kickresume-pricing"),
  tier("Kickresume", "Premium Yearly promo", 76.8, "USD", "12 months", 6.4, "Promo; regular $8/month", "src-kickresume-pricing"),
  tier("Ashby", "Foundations", 400, "USD", "1 month", 400, "Up to 100 employees; annual discount available", "src-ashby-pricing"),
  tier("Ashby", "Plus", null, "USD", "Contact sales", null, "101–1,000 employees", "src-ashby-pricing", "Contact sales"),
  tier("Ashby", "Enterprise", null, "USD", "Contact sales", null, "1,000+ employees", "src-ashby-pricing", "Contact sales"),
  tier("HireVue", "Essential", null, "USD", "Contact sales", null, "Package named; public price not disclosed", "src-hirevue-pricing", "Contact sales"),
  tier("HireVue", "Premium", null, "USD", "Contact sales", null, "Package named; public price not disclosed", "src-hirevue-pricing", "Contact sales"),
  tier("TestGorilla", "Free", 0, "USD", "1 month", 0, "10 credits/month; 1 seat", "src-testgorilla-pricing"),
  tier("TestGorilla", "Core", 1704, "USD", "12 months", 142, "Annual commitment", "src-testgorilla-pricing")
];

const reviewedSources = [
  ["src-hirenudge-pricing", "HireNudge pricing API and page", "https://hirenudge.ai/pricing/", "Official pricing", "Verified"],
  ["src-teal-pricing", "Teal+ pricing", "https://www.tealhq.com/pricing", "Official pricing", "Verified"],
  ["src-careerflow-pricing", "Careerflow Premium", "https://www.careerflow.ai/premium", "Official pricing", "Verified"],
  ["src-careerflow-faq", "Careerflow FAQ", "https://www.careerflow.ai/faq", "Official help", "Verified"],
  ["src-simplify-pricing", "Simplify+ features and pricing", "https://help.simplify.jobs/en/help/articles/5623502-whats-included-in-simplify-features-and-pricing", "Official help", "Verified"],
  ["src-huntr-pricing", "Huntr pricing", "https://api.huntr.co/pricing", "Official pricing", "Verified"],
  ["src-rezi-pricing", "Rezi pricing", "https://www.rezi.ai/pricing", "Official pricing", "Verified"],
  ["src-kickresume-pricing", "Kickresume pricing sale", "https://www.kickresume.com/en/pricing/sale/", "Official pricing", "Verified"],
  ["src-ashby-pricing", "Ashby pricing and feature comparison", "https://www.ashbyhq.com/pricing", "Official pricing", "Verified"],
  ["src-hirevue-pricing", "HireVue pricing", "https://www.hirevue.com/pricing", "Official pricing", "Verified"],
  ["src-testgorilla-pricing", "TestGorilla pricing", "https://www.testgorilla.com/pricing/", "Official pricing", "Verified"],
  ["src-yc-recruiting", "YC recruiting startups directory", "https://www.ycombinator.com/companies/industry/recruiting", "Accelerator directory", "Verified"],
  ["src-yc-perfectly", "Perfectly YC profile", "https://www.ycombinator.com/companies/perfectly", "Accelerator profile", "Verified"],
  ["src-yc-alex", "Alex YC profile", "https://www.ycombinator.com/companies/alex-com", "Accelerator profile", "Verified"],
  ["src-ph-hirehunch", "HireHunch Product Hunt profile", "https://www.producthunt.com/products/hirehunch", "Launch platform", "Verified"],
  ["src-ph-finalround", "Final Round AI Product Hunt profile", "https://www.producthunt.com/products/final-round-ai", "Launch platform", "Verified"],
  ["src-hn-teeming", "Show HN Teeming", "https://news.ycombinator.com/item?id=45657100", "Community launch", "Qualitative only"],
  ["src-hirenudge-baseline", "HireNudge internal market baseline", "Internal: docs/strategy/01-market-competitor-baseline.md", "Internal working document", "Internal validation pending"]
].map(([id, title, url, type, status]) => ({ id, title, url, type, status, observedDate: "2026-08-01", effectiveDate: "2026-08-01", confidence: status === "Verified" ? "High" : "Medium", reviewer: "Unassigned" }));

const reviewedUrls = new Set(reviewedSources.map((source) => source.url));
export const sources = [
  ...reviewedSources,
  ...importedResearch.map((row) => ({
    id:`source-import-${slug(importPlatformName(row.name))}`, title:`${row.name} — attached Research_Div.csv`, url:row.url,
    type:"User-provided CSV", status:"Provided research — verification required", observedDate:"2026-08-01", effectiveDate:"",
    confidence:"Low", reviewer:"Unassigned",
  })),
  ...platforms.filter((platform) => !reviewedUrls.has(platform.website)).map((platform) => ({
    id: id("src-home", platform.name), title: `${platform.name} official website`, url: platform.website,
    type: "Official product", status: "Manual verification required", observedDate: "2026-08-01", effectiveDate: "2026-08-01",
    confidence: "Low", reviewer: "Unassigned",
  })),
];

export const discoveries = [
  { id: "discovery-yc-litmus", name: "Litmus", sourceId: "src-yc-recruiting", sourceFamily: "YC", signal: "S2026 technical assessment built from employer context", status: "Needs verification", transferScore: 5, risk: "Candidate work-product and monitoring boundaries" },
  { id: "discovery-yc-sorce", name: "Sorce", sourceId: "src-yc-recruiting", sourceFamily: "YC", signal: "Swipe-led job discovery with agentic apply claim", status: "Trust review required", transferScore: 4, risk: "Fully autonomous applications" },
  { id: "discovery-yc-contrario", name: "Contrario", sourceId: "src-yc-recruiting", sourceFamily: "YC", signal: "Expert recruiter network plus vertical AI agents", status: "Needs verification", transferScore: 4, risk: "Company-reported revenue and outcomes" },
  { id: "discovery-yc-perfectly", name: "Perfectly / Parker", sourceId: "src-yc-perfectly", sourceFamily: "YC", signal: "Candidate super-connector and employer recruiting OS", status: "Needs verification", transferScore: 5, risk: "Warm-intro consent and claim substantiation" },
  { id: "discovery-yc-alex", name: "Alex", sourceId: "src-yc-alex", sourceFamily: "YC", signal: "Real-time adaptive AI interviews", status: "Trust review required", transferScore: 5, risk: "Fairness, recording, explainability and appeal" },
  { id: "discovery-ph-hirehunch", name: "HireHunch / Saina", sourceId: "src-ph-hirehunch", sourceFamily: "Product Hunt", signal: "AI first-round interviewer; India signal", status: "Needs verification", transferScore: 4, risk: "Company claims need independent evidence" },
  { id: "discovery-hn-teeming", name: "Teeming", sourceId: "src-hn-teeming", sourceFamily: "Hacker News", signal: "High-signal job board positioning against AI application noise", status: "Qualitative only", transferScore: 4, risk: "Community launch; traction unknown" }
];

export const recommendations = [
  ["Explainable Opportunity Fit", "Differentiate", "Critical", 4.8, "Show must-haves, blockers, preferences, unknowns and evidence instead of one opaque score.", "src-hirenudge-baseline"],
  ["Career Evidence Vault", "Build / Test", "Critical", 4.7, "Candidate-owned verified achievements and claim provenance for every generated application.", "src-hirenudge-baseline"],
  ["Outcome learning loop", "Differentiate", "Critical", 4.7, "Learn which role, resume, source, timing and follow-up produce qualified interviews.", "src-hirenudge-baseline"],
  ["Reviewed application quality gate", "Adapt", "High", 4.5, "Keep user review and cap low-fit automation rather than optimizing application volume.", "src-simplify-pricing"],
  ["India hiring fields", "Differentiate", "High", 4.5, "Operationalize CTC, notice period, serving notice, location and joining constraints.", "src-hirenudge-baseline"],
  ["Mobility and sponsorship layer", "Differentiate", "High", 4.6, "Add work authorization, sponsorship evidence, country CV and relocation readiness.", "src-hirenudge-baseline"],
  ["Structured interview practice scorecards", "Adapt", "High", 4.2, "Translate employer rubrics and scorecards into candidate-owned practice feedback.", "src-ashby-pricing"],
  ["Expert mock interview marketplace", "Partner / Test", "Medium", 3.9, "Test paid expert interviews and role clinics before building supply.", "src-hirenudge-baseline"],
  ["High-volume autonomous applications", "Avoid", "Trust veto", 1.2, "Do not ship fully autonomous or spray-and-pray application behavior.", "src-hirenudge-baseline"],
  ["Emotion inference or black-box rejection", "Avoid", "Trust veto", 1.0, "Do not copy invasive surveillance, emotion inference or unexplained automated decisions.", "src-hirenudge-baseline"]
].map(([name, recommendation, priority, score, rationale, sourceId], index) => ({ id: `transfer-${index + 1}`, name, recommendation, priority, score, rationale, sourceId, evidenceConfidence: "Medium", feasibility: score >= 4 ? 4 : 3, privacyRisk: priority === "Trust veto" ? "Critical" : "Review", status: "Proposed", reviewer: "Unassigned" }));

export const actions = recommendations.slice(0, 8).map((r, index) => ({
  id: `action-${String(index + 1).padStart(3, "0")}`, title: r.name, sourceId: r.sourceId,
  customerProblem: r.rationale, intendedOutcome: index < 3 ? "Increase qualified interview rate per 10 high-fit applications" : "Improve activation or trust",
  recommendationType: r.recommendation, owner: "Unassigned", dueDate: "2026-08-31", priority: r.priority === "Critical" ? "P0" : r.priority === "High" ? "P1" : "P2",
  effort: index < 3 ? "L" : "M", risk: r.privacyRisk, confidence: r.evidenceConfidence,
  experiment: `Run a bounded prototype or concierge test for ${r.name.toLowerCase()} with 5–10 active job seekers.`,
  baseline: "Internal validation pending", successMetric: "Qualified interview rate per 10 high-fit applications", threshold: "Predefine after analytics baseline", status: "Proposed",
  decision: "Pending", resultNotes: "", rowVersion: 1, createdAt: "2026-08-01T09:00:00+05:30", updatedAt: "2026-08-01T09:00:00+05:30"
}));

export const meta = { datasetRevision: 1, generatedAt: "2026-08-01T09:00:00+05:30", coreCount: platforms.length, watchlistCount: watchlist.length, approvedCount: 0, sourceCount: sources.length, sheetUrl: "https://docs.google.com/spreadsheets/d/14r1uVHzxlq1kqfrUTw47VnS18aNscYJbHwv3DtSEtfE/edit" };
