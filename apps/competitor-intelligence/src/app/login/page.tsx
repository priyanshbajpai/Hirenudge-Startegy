import { passwordAuthConfigured } from "@/lib/password-session";

const messages: Record<string, string> = {
  InvalidPassword: "Incorrect password. Please try again.",
  RateLimited: "Too many attempts. Wait 15 minutes before trying again.",
  Configuration: "Password access is not configured on Vercel yet.",
};

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ error?: string; callbackUrl?: string }> }) {
  const params = await searchParams;
  const callback = params.callbackUrl?.startsWith("/") && !params.callbackUrl.startsWith("//") ? params.callbackUrl : "/";
  const message = params.error ? messages[params.error] : "";
  return <main className="auth-page"><section className="auth-panel"><div className="brand auth-brand">HireNudge</div><h1>Competitor Intelligence</h1><p>Private Founder’s Office workspace. Enter the dashboard password to continue.</p>{message ? <p className="auth-error" role="alert">{message}</p> : null}<form className="password-form" action="/api/auth/password" method="post"><input type="hidden" name="callbackUrl" value={callback} /><label htmlFor="dashboard-password">Password</label><input id="dashboard-password" name="password" type="password" autoComplete="current-password" minLength={12} required autoFocus disabled={!passwordAuthConfigured} /><button className="primary-button" type="submit" disabled={!passwordAuthConfigured}>Unlock dashboard</button></form>{!passwordAuthConfigured ? <p className="auth-note">Administrator setup: add <code>DASHBOARD_PASSWORD</code> (12+ characters) and <code>PASSWORD_AUTH_SECRET</code> (32+ random characters) to the Vercel production environment, then redeploy.</p> : <p className="auth-note">Sessions expire after eight hours. Five failed attempts trigger a 15-minute cooldown.</p>}</section></main>;
}
