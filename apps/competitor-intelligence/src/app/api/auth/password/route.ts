import { NextRequest, NextResponse } from "next/server";
import { passwordMatches } from "@/lib/password-credentials";
import { createSessionToken, passwordAuthConfigured, SESSION_COOKIE, SESSION_MAX_AGE_SECONDS } from "@/lib/password-session";

type AttemptState = { failures: number[] };
const globalAttempts = globalThis as typeof globalThis & { __hirenudgePasswordAttempts?: Map<string, AttemptState> };
const attempts = globalAttempts.__hirenudgePasswordAttempts ??= new Map<string, AttemptState>();
const WINDOW_MS = 15 * 60 * 1000;
const MAX_FAILURES = 5;

function clientKey(request: NextRequest) {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown";
}

function activeFailures(key: string, now: number) {
  const state = attempts.get(key) ?? { failures: [] };
  state.failures = state.failures.filter((timestamp) => now - timestamp < WINDOW_MS);
  attempts.set(key, state);
  return state;
}

function safeCallback(value: FormDataEntryValue | null) {
  const callback = typeof value === "string" ? value : "/";
  return callback.startsWith("/") && !callback.startsWith("//") ? callback : "/";
}

export async function POST(request: NextRequest) {
  if (!passwordAuthConfigured) return NextResponse.redirect(new URL("/login?error=Configuration", request.url), 303);
  const form = await request.formData();
  const callback = safeCallback(form.get("callbackUrl"));
  const key = clientKey(request);
  const now = Date.now();
  const state = activeFailures(key, now);
  if (state.failures.length >= MAX_FAILURES) {
    const response = NextResponse.redirect(new URL(`/login?error=RateLimited&callbackUrl=${encodeURIComponent(callback)}`, request.url), 303);
    response.headers.set("Retry-After", String(Math.ceil((WINDOW_MS - (now - state.failures[0])) / 1000)));
    return response;
  }
  const password = String(form.get("password") ?? "");
  if (!passwordMatches(password)) {
    state.failures.push(now);
    return NextResponse.redirect(new URL(`/login?error=InvalidPassword&callbackUrl=${encodeURIComponent(callback)}`, request.url), 303);
  }
  attempts.delete(key);
  const response = NextResponse.redirect(new URL(callback, request.url), 303);
  response.cookies.set(SESSION_COOKIE, await createSessionToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: SESSION_MAX_AGE_SECONDS,
  });
  return response;
}
