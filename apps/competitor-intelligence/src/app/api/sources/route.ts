import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { requireApiUser } from "@/lib/api-auth";
import { createSource, sheetsConfigured } from "@/lib/sheets";

const schema = z.object({ platformId:z.string().min(3), claim:z.string().min(3).max(2000), url:z.string().url(), title:z.string().min(2).max(240), type:z.string().max(100), observedDate:z.string().max(32), confidence:z.enum(["High","Medium","Low","Unknown"]) });
export async function POST(request:NextRequest){ const user=await requireApiUser(); if(!user)return NextResponse.json({error:"Unauthorized"},{status:401}); if(!sheetsConfigured)return NextResponse.json({error:"Google Sheets is not connected."},{status:503}); const parsed=schema.safeParse(await request.json()); if(!parsed.success)return NextResponse.json({error:"Invalid source",details:parsed.error.flatten()},{status:400}); const source={id:`source-${crypto.randomUUID()}`,...parsed.data,status:"Needs verification",effectiveDate:"",reviewer:"Unassigned",rowVersion:1}; try{return NextResponse.json({source:await createSource(source,user.email)},{status:201});}catch(error){return NextResponse.json({error:error instanceof Error?error.message:"Create failed"},{status:500});} }
