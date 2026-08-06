import { NextRequest, NextResponse } from "next/server";
import { collectHiringNews, discoverStartups, generateMonthlyReview, refreshDueSources } from "@/lib/research-jobs";

export async function runProtectedJob(request: NextRequest, job: string, details: string) {
  const secret = process.env.CRON_SECRET;
  if (!secret || request.headers.get("authorization") !== `Bearer ${secret}`) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try{
    const result=job==="source-refresh"?await refreshDueSources(8):job==="source-health"?await refreshDueSources(25):job==="news"?await collectHiringNews(20):job==="discovery"?await discoverStartups():job==="monthly-review"?await generateMonthlyReview():{details};
    return NextResponse.json({ ok:true,job,completedAt:new Date().toISOString(),result,behavior:"Collected facts and source checks are append-only; approved evidence is never overwritten." });
  }catch(error){return NextResponse.json({ok:false,job,error:error instanceof Error?error.message:"Job failed"},{status:500});}
}
