import { createHash, timingSafeEqual } from "node:crypto";

export function passwordMatches(candidate: string, expected = process.env.DASHBOARD_PASSWORD ?? "") {
  if (!candidate || expected.length < 12) return false;
  const candidateDigest = createHash("sha256").update(candidate, "utf8").digest();
  const expectedDigest = createHash("sha256").update(expected, "utf8").digest();
  return timingSafeEqual(candidateDigest, expectedDigest);
}
