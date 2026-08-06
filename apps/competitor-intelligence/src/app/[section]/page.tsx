import { notFound, redirect } from "next/navigation";
import DashboardClient from "@/components/dashboard-client";
import { getSectionIntelligenceData } from "@/lib/data";

const sections = new Set(["competitors", "compare", "opportunities", "tracker", "settings"]);
const legacy: Record<string,string> = { ecosystem:"/competitors", platforms:"/competitors", features:"/compare", pricing:"/compare", gtm:"/competitors", traction:"/competitors", trends:"/opportunities", transfer:"/opportunities", gaps:"/opportunities", evidence:"/competitors", admin:"/settings", overview:"/" };
export const dynamic = "force-dynamic";
export default async function SectionPage({ params }: { params: Promise<{ section: string }> }) {
  const { section } = await params;
  if (legacy[section]) redirect(legacy[section]);
  if (!sections.has(section)) notFound();
  return <DashboardClient key={section} initialData={await getSectionIntelligenceData(section)} section={section} />;
}
