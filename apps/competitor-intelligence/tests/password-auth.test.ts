import { describe, expect, it } from "vitest";
import { passwordMatches } from "../src/lib/password-credentials";
import { createSessionToken, verifySessionToken } from "../src/lib/password-session";

const secret = "test-secret-that-is-longer-than-thirty-two-characters";

describe("password authentication", () => {
  it("compares passwords without exposing the expected value", () => {
    expect(passwordMatches("correct horse battery staple", "correct horse battery staple")).toBe(true);
    expect(passwordMatches("wrong password", "correct horse battery staple")).toBe(false);
  });

  it("creates and verifies a signed eight-hour session", async () => {
    const token = await createSessionToken(secret, 1_000);
    expect(await verifySessionToken(token, secret, 1_001)).toBe(true);
    expect(await verifySessionToken(token, "different-secret-that-is-long-enough-for-testing", 1_001)).toBe(false);
  });

  it("rejects expired and malformed sessions", async () => {
    const token = await createSessionToken(secret, 1_000);
    expect(await verifySessionToken(token, secret, 1_000 + 8 * 60 * 60)).toBe(false);
    expect(await verifySessionToken("not-a-session", secret, 1_001)).toBe(false);
  });
});
