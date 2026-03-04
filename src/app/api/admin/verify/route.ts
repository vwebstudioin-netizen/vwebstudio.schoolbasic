import { NextRequest, NextResponse } from "next/server";
import { adminAuth } from "@/lib/firebase-admin";
import { cookies } from "next/headers";

export async function POST(request: NextRequest) {
  try {
    const { idToken } = await request.json();

    if (!idToken) {
      return NextResponse.json({ error: "No token provided" }, { status: 400 });
    }

    // Verify the ID token
    const decodedToken = await adminAuth.verifyIdToken(idToken);

    // Check if user has admin custom claim
    // Admin claims must be set via: npx tsx scripts/set-admin.ts <email>
    if (!decodedToken.admin) {
      return NextResponse.json({ error: "Not an admin" }, { status: 403 });
    }

    // Create a session cookie (5 days)
    const expiresIn = 60 * 60 * 24 * 5 * 1000;
    const sessionCookie = await adminAuth.createSessionCookie(idToken, { expiresIn });

    // Set the session cookie
    const cookieStore = await cookies();
    cookieStore.set("__session", sessionCookie, {
      maxAge: expiresIn / 1000,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      sameSite: "lax",
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Admin verify error:", error);
    return NextResponse.json(
      { error: "Authentication failed" },
      { status: 401 }
    );
  }
}
