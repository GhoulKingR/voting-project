import { getElection } from "@/database";
import { NextRequest, NextResponse } from "next/server";

export async function GET(_request: NextRequest) {
  return NextResponse.json({ election: getElection() }, { status: 200 });
}
