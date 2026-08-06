import { NextRequest } from "next/server";
import { runProtectedJob } from "@/lib/cron";
export async function GET(request: NextRequest) { return runProtectedJob(request, "monthly-review", "Create reviewer tasks for open completeness and freshness gates."); }
