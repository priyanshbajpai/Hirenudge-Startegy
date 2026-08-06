import { describe, expect, it } from "vitest";
import { complianceRecords, partnerRecords, prdRecords } from "../src/features/prd/data";

describe("PRD source data", () => {
  it("contains detailed landing, onboarding, product-module, GTM, social and retention work", () => {
    expect([...new Set(prdRecords.map((item) => item.workspace))]).toEqual(expect.arrayContaining([
      "Landing Page",
      "Onboarding",
      "Product Modules",
      "GTM & First 100",
      "Social",
      "Activation & Retention",
    ]));
    expect(prdRecords.filter((item) => item.workspace === "Landing Page").length).toBeGreaterThanOrEqual(25);
    expect(prdRecords.filter((item) => item.workspace === "Onboarding").length).toBeGreaterThanOrEqual(25);
    expect(prdRecords.filter((item) => item.workspace === "Product Modules").length).toBeGreaterThanOrEqual(45);
  });

  it("keeps planning states distinct and defaults decisions to discussion", () => {
    expect(prdRecords.every((item) => item.decisionStatus === "To Be Discussed")).toBe(true);
    expect(prdRecords.every((item) => item.category && item.deliveryStatus && item.evidenceStatus)).toBe(true);
  });

  it("includes feature-level partner and compliance references", () => {
    expect(partnerRecords.some((item) => item.name === "Gmail API")).toBe(true);
    expect(partnerRecords.some((item) => item.name === "Greenhouse Job Board API")).toBe(true);
    expect(complianceRecords.some((item) => item.regime === "India DPDP")).toBe(true);
    expect(complianceRecords.some((item) => item.regime === "EU GDPR")).toBe(true);
  });

  it("does not expose private screenshot paths or claim hiring probability", () => {
    const payload = JSON.stringify({ prdRecords, partnerRecords, complianceRecords });
    expect(payload).not.toContain("/Users/priyansh/Desktop");
    expect(payload.toLowerCase()).not.toContain("probability of being hired");
  });
});
