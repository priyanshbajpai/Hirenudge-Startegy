import DashboardClient from "@/components/dashboard-client";
import { getSectionIntelligenceData } from "@/lib/data";

export const dynamic = "force-dynamic";
export default async function HomePage() { return <DashboardClient key="today" initialData={await getSectionIntelligenceData("today")} section="today" />; }
