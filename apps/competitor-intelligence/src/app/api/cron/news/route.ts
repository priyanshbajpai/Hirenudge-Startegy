import { NextRequest } from "next/server";
import { runProtectedJob } from "@/lib/cron";
export async function GET(request:NextRequest){return runProtectedJob(request,"news","Collect current hiring launches and publish source-backed facts only.");}
