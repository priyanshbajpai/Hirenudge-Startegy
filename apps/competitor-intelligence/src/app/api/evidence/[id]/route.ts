import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { requireApiUser } from "@/lib/api-auth";
import { EvidenceVersionConflictError, reviewEvidence, sheetsConfigured } from "@/lib/sheets";

const payloadSchema = z.object({
  decision: z.enum(["Approved", "Rejected", "Superseded"]),
  rowVersion: z.number().int().positive(),
});

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const user = await requireApiUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!['Reviewer', 'Administrator'].includes(user.role)) return NextResponse.json({ error: "Reviewer permission required" }, { status: 403 });
  if (!sheetsConfigured) return NextResponse.json({ error: "Google Sheets credentials are not configured." }, { status: 503 });
  const parsed = payloadSchema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: "Invalid evidence decision", details: parsed.error.flatten() }, { status: 400 });
  try {
    const { id } = await params;
    const item = await reviewEvidence(id, parsed.data.decision, parsed.data.rowVersion, user.email);
    return NextResponse.json({ item });
  } catch (error) {
    if (error instanceof EvidenceVersionConflictError) return NextResponse.json({ error: error.message, current: error.current, submitted: error.submitted }, { status: 409 });
    return NextResponse.json({ error: error instanceof Error ? error.message : "Evidence review failed" }, { status: 500 });
  }
}
