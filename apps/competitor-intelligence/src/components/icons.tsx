import { BarChart3, Binoculars, BriefcaseBusiness, ClipboardCheck, Database, FileSearch2, Gauge, Grid3X3, Lightbulb, ListChecks, Radar, Settings2, ShieldCheck, Tags, TrendingUp } from "lucide-react";

export const navItems = [
  ["/", "Overview", Gauge], ["/ecosystem", "Ecosystem", Radar], ["/platforms", "Competitors", Binoculars],
  ["/features", "Feature Matrix", Grid3X3], ["/pricing", "Pricing", Tags], ["/gtm", "GTM Map", TrendingUp],
  ["/traction", "Traction", BarChart3], ["/trends", "Startup Radar", BriefcaseBusiness], ["/transfer", "Feature Transfer", Lightbulb],
  ["/gaps", "HireNudge Gaps", FileSearch2], ["/tracker", "Action Tracker", ListChecks], ["/evidence", "Evidence Queue", ClipboardCheck],
  ["/admin", "Admin", Settings2],
] as const;

export { Database, ShieldCheck };
