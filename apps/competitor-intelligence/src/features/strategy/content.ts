export interface StrategyNavigationItem {
  slug: string;
  href: string;
  label: string;
  shortLabel: string;
  description: string;
}

export const strategyNavigation: readonly StrategyNavigationItem[] = [
  { slug: "overview", href: "/strategy", label: "Overview", shortLabel: "Overview", description: "Direction, priorities, risks and decisions" },
  { slug: "product", href: "/strategy/product", label: "Product & Features", shortLabel: "Product", description: "Capabilities, improvements and new opportunities" },
  { slug: "ux", href: "/strategy/ux", label: "UI/UX", shortLabel: "UI/UX", description: "Journey, interface and accessibility direction" },
  { slug: "brand", href: "/strategy/brand", label: "Brand Language", shortLabel: "Brand", description: "Positioning, tone, terminology and claims" },
  { slug: "social", href: "/strategy/social", label: "Social & Advertising", shortLabel: "Social", description: "Channels, content, campaigns and paid gates" },
  { slug: "gtm", href: "/strategy/gtm", label: "GTM", shortLabel: "GTM", description: "ICP, corridors, offer and acquisition" },
  { slug: "first-100", href: "/strategy/first-100", label: "First 100 Customers", shortLabel: "First 100", description: "Paid cohort plan, learning goals and gates" },
  { slug: "retention", href: "/strategy/retention", label: "Retention", shortLabel: "Retention", description: "Lifecycle, search state and frequency controls" },
  { slug: "roadmap", href: "/strategy/roadmap", label: "Roadmap", shortLabel: "Roadmap", description: "Now, Next, Later, Research and Blocked" },
  { slug: "decisions", href: "/strategy/decisions", label: "Founder Decisions", shortLabel: "Decisions", description: "Choices that unblock evidence and execution" },
  { slug: "evidence", href: "/strategy/evidence", label: "Research & Evidence", shortLabel: "Evidence", description: "Sources, confidence, unknowns and caveats" },
];

export const strategicSummary = "HireNudge has broad candidate-workflow coverage, but the supplied evidence does not prove a coherent, retained or outcome-improving product. Protect trust, define activation, connect one real application from role selection to outcome, and test that workflow with a narrow India-based cohort.";

export const strongestFindings = [
  "Product breadth is visible; product-market fit is not.",
  "The observed interface is module-first while the user’s task is job-first.",
  "Numeric scores carry more certainty than the supplied methodology supports.",
  "Job freshness, source rights, expiry and duplicates are core product quality.",
  "AI content needs candidate-evidence provenance and confirmation gates.",
  "Gmail permission appears earlier than its value moment in supplied screens.",
  "Public claims, automation language and the review posture are not reconciled.",
  "A supplied public portfolio reference exposed sensitive identifiers.",
  "Paid acquisition cannot be interpreted before activation, repeat use and margin are measured.",
  "India-first global mobility is a hypothesis, not an approved ICP or corridor.",
] as const;

export const observedCapabilities = [
  "Three-step preference, experience and resume onboarding",
  "Resume creation and optimisation",
  "Cover-letter generation",
  "Numeric job matching and job cards",
  "Outreach surface with Gmail connection gate",
  "Application tracker",
  "Interview-question preparation",
  "Browser autofill extension listing",
  "Credit-based pricing",
] as const;

export const productSystem = [
  { stage: "Candidate evidence", detail: "Confirmed career facts, proof, source and sensitivity" },
  { stage: "Verified job", detail: "Source, requirements, freshness, expiry and constraints" },
  { stage: "Application packet", detail: "Alignment, documents, outreach, notes and history" },
  { stage: "Reviewed submission", detail: "Human-confirmed application and message actions" },
  { stage: "Tracker and outcome", detail: "Next action, response, interview and search status" },
] as const;

export const journeyStages = [
  { number: "01", title: "Import evidence", detail: "Bring in truthful profile facts without forcing optional integrations." },
  { number: "02", title: "Choose one live role", detail: "Verify source and freshness before asking the user to invest time." },
  { number: "03", title: "Review alignment", detail: "Show requirements, evidence, gaps and unknowns instead of false certainty." },
  { number: "04", title: "Improve one packet", detail: "Keep edits source-backed, editable and linked to the job." },
  { number: "05", title: "Set the next action", detail: "Track submission, follow-up, interview and outcome without requiring inbox access." },
] as const;

export const uxComparisons = [
  { current: "Many equal dashboard modules", proposed: "One stage-aware next action", validation: "Task completion and time to first packet" },
  { current: "Module-first navigation", proposed: "Job and application packet as context", validation: "Navigation errors and comprehension" },
  { current: "Score-first matcher", proposed: "Requirements, evidence, gaps and unknowns", validation: "Reviewer agreement and user corrections" },
  { current: "Gmail as profile completion", proposed: "Connect only when the user chooses Send", validation: "Permission acceptance after value and disconnect success" },
  { current: "Detached tracker empty state", proposed: "Save the first target job during activation", validation: "First tracker action within 24 hours" },
  { current: "Credits without clear action value", proposed: "Preview cost and remaining balance", validation: "Pricing comprehension and surprise reports" },
  { current: "Limited visible history", proposed: "Versions, diffs, save state and rollback", validation: "Restore rate and wrong-version errors" },
  { current: "Unclear system states", proposed: "Loading, stale, error, partial, revoked and deletion states", validation: "Critical-error recovery" },
] as const;

export const interfaceDirections = [
  { title: "Landing page", text: "Use a linear job-search story first. Test motion only after message comprehension and performance baselines exist." },
  { title: "Dashboard", text: "Lead with search status, one next action, deadlines and recent outcomes rather than a grid of equal modules." },
  { title: "Nudge Studio", text: "Make it the editing environment inside an application packet, with provenance, variants, history and rollback." },
  { title: "Job matcher", text: "Lead with must-have requirements, source text, candidate evidence, gaps, unknowns and one recommended action." },
  { title: "Interview", text: "Use job and round context, editable transcripts and disclosed rubrics before realtime voice." },
  { title: "Mobile", text: "Prioritise next action and detail disclosure; convert dense tables into readable stacked rows." },
] as const;

export const visualPrinciples = [
  "Light neutral canvas and true white reading surfaces",
  "Charcoal text and one controlled HireNudge teal accent",
  "Geist typography with open editorial hierarchy",
  "Semantic labels that always include text",
  "Hairline borders and restrained shadows",
  "Purposeful motion with reduced-motion parity",
  "WCAG 2.2 AA contrast, focus and keyboard behavior",
] as const;

export const mascotDirection = "Use an original guide only when it explains a decision or state. Defer a permanent character, pinball or maze concept until the message and activation flow are validated. Do not reproduce Jobright’s Orion.";

export const workingPosition = "An India-first job-search operating system for higher-quality applications.";
export const workingPromise = "Know which roles deserve your time. Build one truthful, tailored application. Keep every next step clear.";

export const brandPrinciples = [
  "Specific before clever",
  "Calm, respectful and non-judgmental",
  "Explain why information is requested",
  "Separate fact, inference and suggestion",
  "Never imply access to an employer’s private decision",
  "Use India hiring realities without stereotype",
  "Label sponsorship evidence and uncertainty",
] as const;

export const brandComparisons = [
  { current: "Trusted by 10,000+ Job Seekers", risk: "Count source and period were not supplied", improved: "Publish with calculation, period and owner, or remove" },
  { current: "Landing interviews faster", risk: "Causal outcome is not substantiated", improved: "Organize and improve your job-search workflow" },
  { current: "Autopilot / bulk", risk: "Conflicts with human review", improved: "Assisted; draft, review and send" },
  { current: "Match score", risk: "May imply hiring probability", improved: "Profile-to-role alignment with evidence and gaps" },
  { current: "ATS score", risk: "Implies one universal employer system", improved: "Name parseability, format, stated requirement and evidence checks" },
  { current: "Fix your resume", risk: "Frames the candidate as defective", improved: "Make your evidence clearer for this role" },
  { current: "Complete your profile with Gmail", risk: "Creates permission pressure", improved: "Connect Gmail when you choose to send a reviewed email" },
  { current: "Perfect / guaranteed / job-winning", risk: "Unverifiable promise", improved: "Source-backed, role-specific, editable, reviewed" },
] as const;

export const ctaDirections = [
  ["Get started", "Review one role"],
  ["Improve now", "Make this evidence clearer"],
  ["Auto outreach", "Draft a reviewed message"],
  ["See your score", "Review alignment evidence"],
] as const;

export const socialChannels = [
  { channel: "LinkedIn", role: "Founder authority and evidence", formats: "Teardowns, data notes, product decisions, live clinics", cta: "Review one role or join a clinic" },
  { channel: "Instagram", role: "Reach and relatable education", formats: "Reels, carousels, short demos, Q&A", cta: "Save, share or start one workflow" },
  { channel: "X", role: "Fast learning and category conversation", formats: "Myths, build notes, concise research, clips", cta: "Read the evidence or test a tool" },
] as const;

export const contentPillars = [
  "Application quality",
  "Job-search systems",
  "India hiring realities",
  "Mobility truth",
  "Interview practice",
  "Build in public and trust boundaries",
] as const;

export const campaignThemes = [
  { title: "Qualified Application Clinic", hook: "One role. One evidence-led teardown.", proof: "Anonymised requirement and resume comparison", funnel: "Consideration" },
  { title: "The 83% Myth", hook: "A score is not a hiring decision.", proof: "Requirement, evidence, gap and unknown view", funnel: "Awareness" },
  { title: "One Job, One Packet, One Next Step", hook: "Stop assembling your search across disconnected tools.", proof: "Job-to-packet-to-tracker workflow", funnel: "Consideration" },
  { title: "Fresh or Dead Job?", hook: "The role is in your feed. Is it live at source?", proof: "Source and last-verified state", funnel: "Awareness" },
  { title: "India Switch Reality", hook: "Notice period changes the shortlist.", proof: "India-specific preference and constraint logic", funnel: "Awareness" },
  { title: "A Better Answer Starts with Evidence", hook: "Practice content before scoring delivery.", proof: "Transcript and disclosed feedback rubric", funnel: "Conversion" },
] as const;

export const contentPlan = [
  { week: "Week 1", linkedin: "Founder position on application quality", instagram: "83% myth reel and carousel", x: "Five evidence and score observations", learning: "Does evidence-led matching earn qualified attention?" },
  { week: "Week 2", linkedin: "Anonymised job and resume teardown", instagram: "One job, one packet demo", x: "Build notes and objections", learning: "Does packet language improve product comprehension?" },
  { week: "Week 3", linkedin: "India notice-period decision post", instagram: "India switch reality reel", x: "Short constraint examples", learning: "Which India-specific problem attracts the target cohort?" },
  { week: "Week 4", linkedin: "What HireNudge will not automate", instagram: "Fresh or dead job demo", x: "Source and freshness thread", learning: "Does visible restraint increase product trust?" },
] as const;

export const competitorAdLearnings = [
  "Make the first-frame problem understandable without sound.",
  "Pair founder or creator presence with a real product artifact.",
  "Use one job-search problem and one call to action per creative.",
  "Demonstrate the product before the CTA.",
  "Keep native captions and accessible visual hierarchy.",
  "Maintain offer-to-landing-page continuity.",
  "Use proof objects rather than unsupported outcome statistics.",
  "Use local language and examples only where the corridor warrants them.",
] as const;

export const paidReadinessGate = "Do not scale paid until activation and attribution are stable, two cohorts show repeat use, material claims are substantiated, onboarding no longer pressures Gmail, and a contribution-margin CAC ceiling exists.";
export const socialSuccessMetrics = ["Qualified workflow starts by channel", "Activated users from content", "Saves and shares on educational artifacts", "Message-test lift with claim-quality guardrails", "Paid CAC only after contribution margin exists"] as const;

export const primaryIcp = "Provisional: English-speaking, India-based employed professionals with roughly one to five years of experience who intend to switch private-sector roles within 30–60 days.";
export const secondaryIcp = "Not selected. Choose only after current-user, job-coverage and paid-behavior evidence.";

export const corridors = [
  { name: "India → India", recommendation: "Start", reason: "Lowest legal and data burden with the strongest immediate learning path" },
  { name: "India → one foreign country", recommendation: "Research later", reason: "Potential differentiation with high sponsorship and accuracy burden" },
  { name: "Foreign → foreign", recommendation: "Defer", reason: "No clear initial distribution or data advantage" },
  { name: "Remote", recommendation: "Treat as a constraint", reason: "Remote does not mean globally employable" },
  { name: "Sponsorship-dependent", recommendation: "Evidence-only pilot", reason: "Never guarantee sponsorship" },
] as const;

export const gtmOffer = "Application Quality Sprint: build verified profile evidence, assess two real roles, produce two truthful packets, set follow-ups and practise one relevant interview answer.";
export const gtmFunnel = ["Qualified reach", "Screened prospect", "Paying customer", "Activated user", "D7 repeat user", "Outcome reported"] as const;
export const acquisitionSequence = [
  "Founder, team and alumni network",
  "Role-family communities and small clinics",
  "Disclosed career-coach and creator partnerships",
  "Value-triggered referrals",
  "One free tool after conversion works",
  "University buyer research after D2C proof",
  "Paid social after activation and margin gates",
] as const;

export const partnerships = [
  { partner: "Career coaches", use: "Co-run application clinics", guardrail: "No placement guarantees" },
  { partner: "Creators", use: "Original educational briefs", guardrail: "Disclose commercial relationships" },
  { partner: "Role communities", use: "Cohort recruitment and problem discovery", guardrail: "Do not scrape member data" },
  { partner: "Universities", use: "Later readiness cohort research", guardrail: "Student consent and aggregate reporting" },
  { partner: "TerraTern", use: "Potential distribution or mobility expertise", guardrail: "Purpose-specific opt-in and separate access" },
] as const;
export const gtmSuccessMetrics = ["Eligible prospect → paid customer", "Paid customer → activated user", "D7 repeat workflow", "Qualified interview response per 10 reviewed applications", "Refund, complaint and support burden"] as const;

export const customerDefinitions = [
  { label: "Lead", definition: "A person or organisation with a relevant contact or expression of interest; no account required." },
  { label: "Sign-up", definition: "An account created; this does not count as activation or a customer." },
  { label: "Activated user", definition: "A user who completes the reviewed job-centered activation definition." },
  { label: "Beta participant", definition: "A consented research participant; payment is not implied." },
  { label: "Paid customer", definition: "A person who pays for the bounded offer and completes enough of the workflow to evaluate value." },
  { label: "Retained paid customer", definition: "A paid customer who repeats the core workflow at the agreed D7 or later checkpoint while still actively searching." },
] as const;

export const customerAllocation = [
  { channel: "Founder/team network and alumni", count: 25 },
  { channel: "Role-family communities", count: 25 },
  { channel: "Two creators or coaches", count: 25 },
  { channel: "Activated-user referrals", count: 15 },
  { channel: "Small paid retargeting", count: 10 },
] as const;

export const first100Weeks = [
  { week: 1, focus: "Decisions, evidence intake and screening brief", target: "Approve the research target and offer; screen 20 prospects", learning: "Can the team identify the cohort consistently?" },
  { week: 2, focus: "Calibration recruitment", target: "Recruit 10 paying calibration users within cohort 1", learning: "What blocks payment and participation?" },
  { week: 3, focus: "Observed activation", target: "Observe 10 activation sessions", learning: "Where does the loop depend on hidden concierge work?" },
  { week: 4, focus: "Calibration retrospective", target: "Record one stop, change or continue memo", learning: "What must change before cohort 1 completes?" },
  { week: 5, focus: "Complete cohort 1", target: "Reach 25 eligible paying users including calibration", learning: "What is the workflow and support burden?" },
  { week: 6, focus: "Cohort 1 D7 review", target: "Review behavior and interviews", learning: "Does real application work repeat?" },
  { week: 7, focus: "Cohort 2", target: "Recruit 25 paying users", learning: "Which role-family and message fit?" },
  { week: 8, focus: "Cohort 2 D7 review", target: "Choose a price and workflow change", learning: "Which offer survives?" },
  { week: 9, focus: "Cohort 3", target: "Recruit 25 through partner and community mix", learning: "Do partner economics and trust work?" },
  { week: 10, focus: "Cohort 3 review", target: "Make the referral-gate decision", learning: "Is there a verified value moment?" },
  { week: 11, focus: "Cohort 4", target: "Recruit the final 25 paying users", learning: "Is the motion repeatable across the selected mix?" },
  { week: 12, focus: "Synthesis", target: "Make a founder go, change or stop decision", learning: "What earns the next 90 days?" },
] as const;

export const requiredAssets = [
  "ICP screening brief",
  "Consent and research notice",
  "Bounded offer and payment page",
  "Activation event dictionary",
  "Facilitator guide and support SLA",
  "Weekly evidence memo template",
  "Refund and cancellation terms",
] as const;

export const operatingRoles = [
  { role: "Founder", responsibility: "ICP, offer, price and stop/change/continue decisions", owner: "Unassigned" },
  { role: "Founder’s Office", responsibility: "Recruitment, interviews, cohort operations and weekly memo", owner: "Unassigned" },
  { role: "Product and engineering", responsibility: "Event quality, bugs and bounded experiments", owner: "Unassigned" },
  { role: "Trust and legal", responsibility: "Consent, claims, outreach and data use", owner: "Unassigned" },
  { role: "Support", responsibility: "Response SLA and tagged failure modes", owner: "Unassigned" },
] as const;

export const conversionAssumptions = [
  "Channel allocations are planning targets, not forecasts.",
  "No lead-to-paid, paid-to-activated or D7 conversion baseline was supplied.",
  "Set numeric thresholds after the first 10 eligible users in cohort 1.",
  "Calibration users count toward the 100 when they meet the same paid-customer definition.",
] as const;

export const cohortRules = [
  { action: "Scale", condition: "Event data are reliable, users repeat the workflow, willingness to pay is credible and no material trust blocker remains." },
  { action: "Modify", condition: "Users value the outcome but the workflow, offer, segment or price creates consistent friction." },
  { action: "Stop", condition: "The loop depends on unscalable concierge work, users do not return for real applications, or a material legal or data-quality blocker remains." },
] as const;

export const lifecycleRows = [
  { moment: "Welcome", trigger: "Account created", value: "Explain the one-job activation path", cta: "Select one role", exit: "Stop after activation", metric: "24-hour activation" },
  { moment: "Incomplete action", trigger: "A required field blocks the chosen task", value: "Explain why only that field matters", cta: "Complete the needed field", exit: "Suppress after abandonment or opt-out", metric: "Task completion" },
  { moment: "Saved job, no packet", trigger: "Saved job without packet", value: "Show job age and the next step", cta: "Review alignment", exit: "Applied, expired or dismissed", metric: "Packet start" },
  { moment: "Resume evidence gap", trigger: "Missing requirement reviewed", value: "Ask for proof, not invented metrics", cta: "Add or confirm evidence", exit: "Dismissed or submitted", metric: "Confirmed evidence rate" },
  { moment: "Weekly job summary", trigger: "Opt-in and fresh qualified jobs", value: "A small ranked set with source and freshness", cta: "Review jobs", exit: "No qualifying jobs means no send", metric: "Save, apply and stale-click rate" },
  { moment: "Application follow-up", trigger: "Submitted and user set a reminder", value: "Human-reviewed follow-up guidance", cta: "Review next action", exit: "Rejected, withdrawn or opted out", metric: "Completion and reply" },
  { moment: "Interview reminder", trigger: "Interview date entered", value: "Round plan and practice checklist", cta: "Practise one answer", exit: "Interview passed or cancelled", metric: "Practice completion" },
  { moment: "Hiring or company alert", trigger: "User opted in and a verified relevant event exists", value: "Explain why the event matters to the saved role", cta: "Review the role", exit: "Role expired or user suppresses company", metric: "Qualified action, not clicks alone" },
  { moment: "Startup opportunity", trigger: "User opted in and a source-verified startup role fits", value: "Show source, freshness and uncertainty", cta: "Review opportunity", exit: "No relevant fresh role", metric: "Qualified saves" },
  { moment: "Inactivity recovery", trigger: "Activated user leaves a clear next step unfinished", value: "Resume the exact unfinished action", cta: "Continue", exit: "Cap attempts and suppress", metric: "Reactivation and unsubscribe" },
  { moment: "Upgrade", trigger: "A user reaches a valuable limit after activation", value: "Explain the exact benefit and cost", cta: "Compare plans", exit: "Stop pressure after decline", metric: "Paid conversion and refunds" },
  { moment: "Referral", trigger: "Verified value event", value: "Invite a peer without sharing job data", cta: "Refer", exit: "Fraud and frequency limit", metric: "Activated referrals" },
  { moment: "Win-back", trigger: "Search paused, ended or subscription stopped", value: "Update status; offer export or pause", cta: "Update search status", exit: "Search closed or opted out", metric: "Return without complaint" },
] as const;

export const searchStatuses = ["Active", "Interviewing", "Paused", "Offer received", "Search ended"] as const;
export const lifecycleControls = [
  "Separate product-critical and marketing messages",
  "Category-level preferences",
  "Global frequency cap",
  "Quiet or pause mode",
  "One-click unsubscribe where required",
  "Global suppression list",
  "No sensitive employer, application or immigration detail in previews",
] as const;
export const retentionSuccessMetrics = ["D7 repeat application workflow", "Incremental completion versus a holdout", "Useful action per lifecycle send", "Unsubscribe and complaint rate", "Search-status update and suppression accuracy"] as const;

export const majorRisks = [
  { id: "R-01", risk: "Public sensitive-data exposure", response: "Remove, scan and document incident closure", severity: "Critical" },
  { id: "R-02", risk: "Unsupported claims and employer logos", response: "Claim ledger and removal authority", severity: "High" },
  { id: "R-03", risk: "Autopilot and review contradiction", response: "Human-review boundary and enforced caps", severity: "High" },
  { id: "R-05", risk: "Stale, duplicate or unlicensed jobs", response: "Rights policy, lifecycle schema and quality audit", severity: "Critical" },
  { id: "R-06", risk: "Gmail over-scoping or token compromise", response: "Send-only scope, vault, revoke and delete tests", severity: "Critical" },
  { id: "R-09", risk: "AI invents candidate or company facts", response: "Evidence provenance and confirmation gate", severity: "High" },
  { id: "R-12", risk: "TerraTern cross-use without consent", response: "Purpose separation and explicit opt-in", severity: "Critical" },
  { id: "R-18", risk: "No internal analytics or customer evidence", response: "Complete the internal evidence intake", severity: "Critical" },
] as const;

export const evidenceSummary = [
  { label: "HireNudge screenshots", value: "28", note: "Research input count" },
  { label: "Competitor product screenshots", value: "116", note: "Research input count" },
  { label: "Competitor ad assets", value: "296", note: "Creative archive; no performance data" },
  { label: "Core research reports", value: "18", note: "Completed 6 Aug 2026" },
  { label: "Canonical initiatives", value: "38", note: "Planning records" },
  { label: "Internal evidence pack", value: "Not supplied", note: "Analytics, support, interviews and contracts" },
] as const;

export const evidenceDefinitions = [
  { status: "Verified", meaning: "Confirmed by appropriate internal or authoritative evidence" },
  { status: "Observed", meaning: "Visible in supplied screenshots or a public surface" },
  { status: "Discussed", meaning: "Provided as a team discussion or exploration" },
  { status: "In Progress", meaning: "Explicitly described as current work without a completion claim" },
  { status: "Proposed", meaning: "Strategic recommendation or concept" },
  { status: "Requires Verification", meaning: "Material claim lacks internal, engineering or legal proof" },
  { status: "Blocked", meaning: "Cannot proceed safely without a named dependency" },
] as const;

export const researchUnknowns = [
  "Live, beta, hidden and retired product inventory",
  "Event dictionary, activation, cohorts and outcomes",
  "Current user, role, country and acquisition mix",
  "Support, cancellations and customer interviews",
  "Job providers, contracts and lifecycle quality",
  "Gmail scopes, token security and extension permissions",
  "Model and provider inventory, retention and feature COGS",
  "Claim substantiation and permissions",
  "TerraTern and HireNudge data flows and controller roles",
  "Named owners, runway, revenue targets and engineering capacity",
] as const;

export const sourceRegisterUrl = "https://github.com/priyanshbajpai/Hirenudge-Startegy/blob/main/docs/research/00_SOURCE_REGISTER.md";
