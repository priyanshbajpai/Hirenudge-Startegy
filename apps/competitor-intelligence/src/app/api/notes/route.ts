import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { requireApiUser } from "@/lib/api-auth";
import { createResearchNote, sheetsConfigured } from "@/lib/sheets";

const schema=z.object({platformId:z.string().min(3),title:z.string().min(2).max(180),body:z.string().min(2).max(6000)});
export async function POST(request:NextRequest){const user=await requireApiUser();if(!user)return NextResponse.json({error:"Unauthorized"},{status:401});if(!sheetsConfigured)return NextResponse.json({error:"Google Sheets is not connected."},{status:503});const parsed=schema.safeParse(await request.json());if(!parsed.success)return NextResponse.json({error:"Invalid note",details:parsed.error.flatten()},{status:400});const note={id:`note-${crypto.randomUUID()}`,...parsed.data,sourceType:"Research note",evidenceStatus:"Needs verification",createdAt:new Date().toISOString(),createdBy:user.email,rowVersion:1};try{return NextResponse.json({note:await createResearchNote(note,user.email)},{status:201});}catch(error){return NextResponse.json({error:error instanceof Error?error.message:"Create failed"},{status:500});}}
