import { validateToken } from "@/libs/JWTUtility";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { token } = body;

    try {
      const object = validateToken(token);
      return NextResponse.json(object, { status: 200 });
    } catch (error) {
		console.error(error);
      return NextResponse.json(
        { message: "Invalid token signature" },
        { status: 400 },
      );
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
