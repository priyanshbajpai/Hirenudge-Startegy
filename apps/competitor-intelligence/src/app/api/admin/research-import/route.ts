import { NextResponse } from "next/server";
import { requireApiUser } from "@/lib/api-auth";
import { importGreenResearchToStaging } from "@/lib/research-import";
import { sheetsConfigured } from "@/lib/sheets";

export const maxDuration = 60;

export async function POST() {
  const user=await requireApiUser();
  if(!user)return NextResponse.json({error:"Unauthorized"},{status:401});
  if(!sheetsConfigured)return NextResponse.json({error:"Google Sheets is not connected."},{status:503});
  try{return NextResponse.json(await importGreenResearchToStaging("Founder’s Office research importer"));}
  catch(error){return NextResponse.json({error:error instanceof Error?error.message:"Research import failed"},{status:500});}
}
