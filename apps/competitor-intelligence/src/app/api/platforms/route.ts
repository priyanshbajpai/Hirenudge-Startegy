import { NextRequest, NextResponse } from "next/server";
import { requireApiUser } from "@/lib/api-auth";
import { getIntelligenceData } from "@/lib/data";

export async function GET(request:NextRequest){
  const user=await requireApiUser(); if(!user)return NextResponse.json({error:"Unauthorized"},{status:401});
  const data=await getIntelligenceData(); const search=request.nextUrl.searchParams.get("q")?.toLowerCase()||"";
  const profiles=new Map(data.profiles.map((profile)=>[profile.platformId,profile])); const completion=new Map(data.completion.map((row)=>[row.platformId,row]));
  const platforms=data.platforms.filter((platform)=>!search||`${platform.name} ${platform.category} ${platform.geography} ${platform.side} ${profiles.get(platform.id)?.productSummary||""}`.toLowerCase().includes(search)).map((platform)=>({platform,profile:profiles.get(platform.id),completion:completion.get(platform.id)}));
  return NextResponse.json({platforms,total:platforms.length,revision:data.meta.datasetRevision});
}

