import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { generateToken } from "@/libs/JWTUtility";
import { getUser, validateUser } from "@/database";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { matric, password, adminLogin } = body;

    // This is where you would validate the credentials
    // and implement your authentication logic

    // Example validation (replace with actual auth logic)
    if (!matric || !password) {
      return NextResponse.json(
        { message: "Email and password are required" },
        { status: 400 },
      );
    }

    // Mock successful login (replace with actual authentication)
    // In a real app, you would:
    // 1. Check credentials against your database
    // 2. Generate JWT or session token
    // 3. Set cookies, etc.

    if (validateUser(matric, password)) {
      const user = getUser(matric);

	  if (user.admin === adminLogin)
		  return NextResponse.json(
			{
			  token: generateToken(user),
			  message: "Login successful",
			},
			{ status: 200 },
		  );
	  else
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
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
