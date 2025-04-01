import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { generateToken } from "@/libs/JWTUtility";
import { getUser, validateUser } from "@/database";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { matric, password, adminLogin } = body;

    // Example validation (replace with actual auth logic)
    if (!matric || !password) {
      return NextResponse.json(
        { message: "Email and password are required" },
        { status: 400 },
      );
    }

    if (await validateUser(matric, password)) {
      const user = await getUser(matric);
      const admin = user!.admin ? true : false;

      if (admin === adminLogin) {
        const response = NextResponse.json(
          { message: "Login successful" },
          { status: 200 },
        );

        response.headers.set(
          "Set-Cookie",
          `token=${generateToken(user!)}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=3600`,
        );

        return response;
      } else
        return NextResponse.json(
          { message: "Not allowed here" },
          { status: 403 },
        );
    } else {
      return NextResponse.json(
        { message: "User name and password invalid" },
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
