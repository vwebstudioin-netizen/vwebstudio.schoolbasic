import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip login page — no protection needed
  if (pathname === "/admin/login") {
    return NextResponse.next();
  }

  // Protect all /admin/* routes
  if (pathname.startsWith("/admin")) {
    const sessionCookie = request.cookies.get("__session");

    if (!sessionCookie?.value) {
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
