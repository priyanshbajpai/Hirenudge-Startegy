import { NextRequest, NextResponse } from "next/server";
import { requireApiUser } from "@/lib/api-auth";
import { getIntelligenceData } from "@/lib/data";

export async function GET(_:NextRequest,{params}:{params:Promise<{id:string}>}){
  const user=await requireApiUser(); if(!user)return NextResponse.json({error:"Unauthorized"},{status:401});
  const {id}=await params; const data=await getIntelligenceData(); const platform=data.platforms.find((row)=>row.id===id);
  if(!platform)return NextResponse.json({error:"Platform not found"},{status:404});
  const sourceIds=new Set([
    ...data.claims.filter((row)=>row.platformId===id).flatMap((row)=>row.sourceIds),
    ...data.featureObservations.filter((row)=>row.platformId===id).flatMap((row)=>row.sourceIds?.length?row.sourceIds:[row.sourceId]),
    ...data.pricing.filter((row)=>row.platformId===id).map((row)=>row.sourceId),
  ]);
  return NextResponse.json({platform,profile:data.profiles.find((row)=>row.platformId===id),claims:data.claims.filter((row)=>row.platformId===id),modules:data.modules.filter((row)=>row.platformId===id),features:data.featureObservations.filter((row)=>row.platformId===id),pricing:data.pricing.filter((row)=>row.platformId===id),metrics:data.reachMetrics.filter((row)=>row.platformId===id),gtm:data.gtmObservations.filter((row)=>row.platformId===id),sources:data.sources.filter((row)=>sourceIds.has(row.id)),notes:data.notes.filter((row)=>row.platformId===id),completion:data.completion.find((row)=>row.platformId===id),revision:data.meta.datasetRevision});
}

