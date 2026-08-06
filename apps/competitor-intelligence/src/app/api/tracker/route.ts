import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { requireApiUser } from "@/lib/api-auth";
import { createAction, sheetsConfigured } from "@/lib/sheets";

const actionSchema = z.object({
  id: z.string().min(3), title: z.string().min(3).max(180), sourceId: z.string().max(120).default(""),
  customerProblem: z.string().max(2000).default("Internal validation pending"), intendedOutcome: z.string().max(1000).default("Improve qualified candidate outcome"),
  recommendationType: z.string().max(80).default("Test"), owner: z.string().max(120).default("Unassigned"), dueDate: z.string().max(32),
  priority: z.enum(["P0", "P1", "P2", "P3"]).default("P2"), effort: z.string().max(20).default("M"), risk: z.string().max(80).default("Review"),
  confidence: z.string().max(30).default("Medium"), experiment: z.string().max(3000), baseline: z.string().max(1000).default("Internal validation pending"),
  successMetric: z.string().max(1000), threshold: z.string().max(1000).default("Predefine before test"), status: z.string().max(40).default("Proposed"),
  decision: z.string().max(500).default("Pending"), resultNotes: z.string().max(4000).default(""), rowVersion: z.number().default(1), createdAt: z.string().default(""), updatedAt: z.string().default(""),
  actionType: z.enum(["Add","Improve","Remove","Discuss","Research","Test","Partner","Watch","Defer"]).default("Discuss"),
  coOwners: z.array(z.string().max(80)).default(["Priyansh","Baskaran"]),
  origin: z.object({ entityType:z.string().max(80), entityId:z.string().max(160), snapshot:z.string().max(4000), sourceIds:z.array(z.string().max(160)) }).optional(),
});

export async function POST(request: NextRequest) {
  const user = await requireApiUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const parsed = actionSchema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: "Invalid action", details: parsed.error.flatten() }, { status: 400 });
  if (!sheetsConfigured) return NextResponse.json({ error: "Sheets connector is not configured. Your draft was preserved in the browser." }, { status: 503 });
  try { return NextResponse.json({ action: await createAction(parsed.data, user.email) }, { status: 201 }); }
  catch (error) { return NextResponse.json({ error: error instanceof Error ? error.message : "Create failed" }, { status: 500 }); }
}
