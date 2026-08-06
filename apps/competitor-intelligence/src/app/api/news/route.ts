import { NextRequest, NextResponse } from "next/server";
import { requireApiUser } from "@/lib/api-auth";
import { getIntelligenceData } from "@/lib/data";

export async function GET(request:NextRequest){
  const user=await requireApiUser(); if(!user)return NextResponse.json({error:"Unauthorized"},{status:401});
  const data=await getIntelligenceData(); const days=Math.min(90,Math.max(1,Number(request.nextUrl.searchParams.get("days")||7))); const cutoff=Date.now()-days*86400000;
  const news=data.news.filter((item)=>new Date(item.publicationDate||item.eventDate).getTime()>=cutoff&&item.status!=="Superseded").sort((a,b)=>new Date(b.eventDate).getTime()-new Date(a.eventDate).getTime());
  return NextResponse.json({news,total:news.length,days,revision:data.meta.datasetRevision});
}

