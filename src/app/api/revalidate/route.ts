import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function POST(request: NextRequest) {
  try {
    const { secret, path } = await request.json();

    // Validate secret
    if (secret !== process.env.REVALIDATION_SECRET) {
      return NextResponse.json({ error: "Invalid secret" }, { status: 401 });
    }

    if (path) {
      revalidatePath(path);
      return NextResponse.json({ revalidated: true, path });
    }

    // Revalidate all public pages
    revalidatePath("/", "layout");
    return NextResponse.json({ revalidated: true, path: "/" });
  } catch (error) {
    console.error("Revalidation error:", error);
    return NextResponse.json(
      { error: "Revalidation failed" },
      { status: 500 }
    );
  }
}
