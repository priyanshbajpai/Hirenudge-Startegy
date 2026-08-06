import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { requireApiUser } from "@/lib/api-auth";
import { sheetsConfigured, updateAction, VersionConflictError } from "@/lib/sheets";

const schema = z.object({
  rowVersion: z.number().int().positive(),
  changes: z.object({
    owner: z.string().max(120).optional(), dueDate: z.string().max(32).optional(),
    priority: z.enum(["P0", "P1", "P2", "P3"]).optional(),
    status: z.enum(["Proposed", "Discussing", "Approved", "Planned", "In progress", "Validating", "Done", "Rejected", "Deferred"]).optional(),
    decision: z.string().max(500).optional(), resultNotes: z.string().max(4000).optional(),
  }).strict(),
});

export async function PATCH(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  const user = await requireApiUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!sheetsConfigured) return NextResponse.json({ error: "Sheets connector is not configured. Your draft was preserved in the browser." }, { status: 503 });
  const body = schema.safeParse(await request.json());
  if (!body.success) return NextResponse.json({ error: "Invalid tracker update", details: body.error.flatten() }, { status: 400 });
  try {
    const { id } = await context.params;
    const action = await updateAction(id, body.data.changes, body.data.rowVersion, user.email);
    return NextResponse.json({ action });
  } catch (error) {
    if (error instanceof VersionConflictError) return NextResponse.json({ error: error.message, current: error.current, submitted: error.submitted }, { status: 409 });
    return NextResponse.json({ error: error instanceof Error ? error.message : "Write failed" }, { status: 500 });
  }
}
