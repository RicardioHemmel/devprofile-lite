// middleware.ts
import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;

  const isProfileRoute = request.nextUrl.pathname.startsWith("/profile");

  if (!token && isProfileRoute) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/profile"],
};
