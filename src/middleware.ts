import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const { pathname } = request.nextUrl;

  // Allow access to auth routes
  if (pathname.startsWith("/auth") || pathname.startsWith("/api/auth")) {
    return NextResponse.next();
  }

  // Protect all routes that require authentication
  if (pathname.startsWith("/student") && token?.role !== "student") {
    return NextResponse.redirect(new URL("/auth/signin", request.url));
  }

  if (pathname.startsWith("/teacher") && token?.role !== "teacher") {
    return NextResponse.redirect(new URL("/auth/signin", request.url));
  }

  // Allow access to public routes
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
