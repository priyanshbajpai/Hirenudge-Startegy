import { cookies } from "next/headers";
import { passwordAuthConfigured, SESSION_COOKIE, verifySessionToken } from "@/lib/password-session";

export async function requireApiUser() {
  if (!passwordAuthConfigured && process.env.NODE_ENV !== "production") return { email: "local-dev@hirenudge.ai", role: "Administrator" };
  const cookieStore = await cookies();
  const authenticated = await verifySessionToken(cookieStore.get(SESSION_COOKIE)?.value);
  return authenticated ? { email: "password-admin@hirenudge.ai", role: "Administrator" } : null;
}
