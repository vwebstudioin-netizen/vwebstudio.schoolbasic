import { NextRequest, NextResponse } from "next/server";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { contactFormSchema } from "@/lib/validations";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate
    const result = contactFormSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: "Invalid form data", details: result.error.flatten() },
        { status: 400 }
      );
    }

    // Save to Firestore
    await addDoc(collection(db, "contactSubmissions"), {
      ...result.data,
      status: "unread",
      createdAt: serverTimestamp(),
    });

    return NextResponse.json({ success: true, message: "Message sent successfully" });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    );
  }
}
