import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { requireApiUser } from "@/lib/api-auth";
import { getIntelligenceData } from "@/lib/data";
import { createActionComment, sheetsConfigured } from "@/lib/sheets";

const schema=z.object({
  body:z.string().min(1).max(6000),
  author:z.enum(["Founder’s Office","Priyansh","Baskaran","Divyansh"]).default("Founder’s Office"),
  commentType:z.enum(["Comment","Question","Decision","Evidence"]).default("Comment"),
  decision:z.string().max(1000).default(""), sourceSnapshotId:z.string().max(180).default(""),
  parentCommentId:z.string().max(180).default(""),
});

export async function GET(_:NextRequest,{params}:{params:Promise<{id:string}>}){
  const user=await requireApiUser(); if(!user)return NextResponse.json({error:"Unauthorized"},{status:401});
  const {id}=await params; const data=await getIntelligenceData();
  return NextResponse.json({comments:data.actionComments.filter((comment)=>comment.actionId===id).sort((a,b)=>a.createdAt.localeCompare(b.createdAt))});
}

export async function POST(request:NextRequest,{params}:{params:Promise<{id:string}>}){
  const user=await requireApiUser(); if(!user)return NextResponse.json({error:"Unauthorized"},{status:401});
  if(!sheetsConfigured)return NextResponse.json({error:"Google Sheets is not connected."},{status:503});
  const parsed=schema.safeParse(await request.json()); if(!parsed.success)return NextResponse.json({error:"Invalid comment",details:parsed.error.flatten()},{status:400});
  const {id}=await params; const now=new Date().toISOString(); const comment={id:`comment-${crypto.randomUUID()}`,actionId:id,...parsed.data,createdAt:now,updatedAt:now,rowVersion:1,datasetRevision:0,status:"Current",fingerprint:`${id}:${now}:${parsed.data.body}`};
  try{return NextResponse.json({comment:await createActionComment(comment,user.email)},{status:201});}catch(error){return NextResponse.json({error:error instanceof Error?error.message:"Create failed"},{status:500});}
}

