import { Candidate, castVote } from "@/database";
import { validateToken } from "@/libs/JWTUtility";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { token, votes }: { token: string; votes: Candidate[] } = body;

  try {
    const user: any = validateToken(token);
    castVote(user, votes);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Not allowed" }, { status: 403 });
  }
}
