import { NextRequest } from "next/server";
import { runProtectedJob } from "@/lib/cron";
export async function GET(request: NextRequest) { return runProtectedJob(request, "source-health", "Check official source availability, redirects and review-due status; never replace approved data."); }
