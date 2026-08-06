const encoder = new TextEncoder();

export const SESSION_COOKIE = "hirenudge_session";
export const SESSION_MAX_AGE_SECONDS = 8 * 60 * 60;

export const passwordAuthConfigured = Boolean(
  process.env.DASHBOARD_PASSWORD &&
  process.env.DASHBOARD_PASSWORD.length >= 12 &&
  process.env.PASSWORD_AUTH_SECRET &&
  process.env.PASSWORD_AUTH_SECRET.length >= 32,
);

function encodeBase64Url(bytes: Uint8Array) {
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function decodeBase64Url(value: string) {
  const padded = value.replace(/-/g, "+").replace(/_/g, "/").padEnd(Math.ceil(value.length / 4) * 4, "=");
  const binary = atob(padded);
  return Uint8Array.from(binary, (character) => character.charCodeAt(0));
}

async function importHmacKey(secret: string, usage: KeyUsage[]) {
  return crypto.subtle.importKey("raw", encoder.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, usage);
}

export async function createSessionToken(secret = process.env.PASSWORD_AUTH_SECRET ?? "", nowSeconds = Math.floor(Date.now() / 1000)) {
  if (secret.length < 32) throw new Error("Password session secret is not configured.");
  const payload = `v1.${nowSeconds + SESSION_MAX_AGE_SECONDS}`;
  const key = await importHmacKey(secret, ["sign"]);
  const signature = new Uint8Array(await crypto.subtle.sign("HMAC", key, encoder.encode(payload)));
  return `${payload}.${encodeBase64Url(signature)}`;
}

export async function verifySessionToken(token: string | undefined, secret = process.env.PASSWORD_AUTH_SECRET ?? "", nowSeconds = Math.floor(Date.now() / 1000)) {
  if (!token || secret.length < 32) return false;
  const [version, expiry, signature] = token.split(".");
  const expiresAt = Number(expiry);
  if (version !== "v1" || !Number.isFinite(expiresAt) || expiresAt <= nowSeconds || !signature) return false;
  try {
    const key = await importHmacKey(secret, ["verify"]);
    return crypto.subtle.verify("HMAC", key, decodeBase64Url(signature), encoder.encode(`${version}.${expiry}`));
  } catch {
    return false;
  }
}
