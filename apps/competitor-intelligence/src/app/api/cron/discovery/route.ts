import { NextRequest } from "next/server";
import { runProtectedJob } from "@/lib/cron";
export async function GET(request: NextRequest) { return runProtectedJob(request, "discovery", "Scan Product Hunt and YC using compliant public sources."); }
