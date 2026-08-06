import { NextRequest, NextResponse } from "next/server";
import { requireApiUser } from "@/lib/api-auth";
import { getSectionIntelligenceData } from "@/lib/data";

export const dynamic = "force-dynamic";

export async function GET(request:NextRequest) {
  const user = await requireApiUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try { return NextResponse.json(await getSectionIntelligenceData(request.nextUrl.searchParams.get("section")||"today")); }
  catch (error) { return NextResponse.json({ error: error instanceof Error ? error.message : "Live dataset unavailable" }, { status: 503 }); }
}
