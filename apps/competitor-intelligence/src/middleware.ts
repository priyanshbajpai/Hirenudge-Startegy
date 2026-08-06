import { NextRequest, NextResponse } from "next/server";
import { passwordAuthConfigured, SESSION_COOKIE, verifySessionToken } from "@/lib/password-session";

export default async function middleware(request: NextRequest) {
  if (!passwordAuthConfigured && process.env.NODE_ENV !== "production") return NextResponse.next();
  if (!passwordAuthConfigured) return NextResponse.redirect(new URL("/login?error=Configuration", request.url));
  const authenticated = await verifySessionToken(request.cookies.get(SESSION_COOKIE)?.value);
  if (!authenticated) {
    if (request.nextUrl.pathname.startsWith("/api/")) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    return NextResponse.redirect(new URL(`/login?callbackUrl=${encodeURIComponent(request.nextUrl.pathname)}`, request.url));
  }
  return NextResponse.next();
}

export const config = { matcher: ["/((?!api/auth/password|api/auth/logout|api/cron|login|strategy|_next/static|_next/image|favicon.ico).*)"] };
