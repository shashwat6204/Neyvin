import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { sign } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@neyvintechnologies.com";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123"; // Change this in production

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // In production, you should:
    // 1. Store admin credentials in a database
    // 2. Hash passwords
    // 3. Use proper session management
    // 4. Implement rate limiting
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      // Create JWT token
      const token = sign({ email, role: "admin" }, JWT_SECRET, {
        expiresIn: "1d",
      });

      // Set cookie
      cookies().set("admin_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 86400, // 1 day
        path: "/",
      });

      return NextResponse.json({ success: true });
    }

    return NextResponse.json(
      { error: "Invalid credentials" },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
} 