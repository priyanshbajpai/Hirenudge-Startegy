import { NextRequest } from "next/server";
import { runProtectedJob } from "@/lib/cron";
export async function GET(request: NextRequest) { return runProtectedJob(request, "source-refresh", "Review due sources in staggered batches and create change candidates only."); }
