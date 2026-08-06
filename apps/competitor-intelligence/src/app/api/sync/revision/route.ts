import { NextResponse } from "next/server";
import { requireApiUser } from "@/lib/api-auth";
import { readDatasetRevision, sheetsConfigured } from "@/lib/sheets";

export const dynamic = "force-dynamic";
export async function GET() {
  if (!(await requireApiUser())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!sheetsConfigured) return NextResponse.json({ revision: 1, mode: "seed", lastSync: "Connector setup required" });
  return NextResponse.json({ ...(await readDatasetRevision()), mode: "google-sheets" });
}
