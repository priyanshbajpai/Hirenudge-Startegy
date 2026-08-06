import { describe, expect, it } from "vitest";
import * as seed from "../data/research-seed.mjs";

describe("launch research dataset", () => {
  it("contains the committed launch cohort and watchlist", () => {
    expect(seed.platforms).toHaveLength(79);
    expect(seed.platforms.filter((item) => item.side === "Candidate-side")).toHaveLength(34);
    expect(seed.platforms.filter((item) => item.side === "Employer-side")).toHaveLength(45);
    expect(seed.watchlist).toHaveLength(50);
  });

  it("preserves the attached research and resolves aliases without merging Huntr and JobHuntr", () => {
    expect(seed.importedResearch).toHaveLength(10);
    expect(seed.importedResearch.every((row) => ["name", "reach", "product", "url", "countryBase", "founder", "userAcquisitionStrategy", "importantLinks"].every((field) => field in row))).toBe(true);
    expect(seed.aliases).toContainEqual(expect.objectContaining({ alias: "KickResume", platformId: "platform-kickresume" }));
    expect(seed.aliases).toContainEqual(expect.objectContaining({ alias: "SimplifyJobs", platformId: "platform-simplify" }));
    expect(seed.platforms.find((item) => item.name === "Huntr")?.id).not.toBe(seed.platforms.find((item) => item.name === "JobHuntr")?.id);
  });

  it("uses immutable unique IDs", () => {
    expect(new Set(seed.platforms.map((item) => item.id)).size).toBe(seed.platforms.length);
    expect(new Set(seed.sources.map((item) => item.id)).size).toBe(seed.sources.length);
    expect(new Set(seed.actions.map((item) => item.id)).size).toBe(seed.actions.length);
  });

  it("does not convert undisclosed pricing into zero", () => {
    const contactSales = seed.pricing.filter((item) => item.pricingStatus === "Contact sales");
    expect(contactSales.length).toBeGreaterThan(0);
    expect(contactSales.every((item) => item.nativePrice === null && item.monthlyEquivalent === null)).toBe(true);
  });

  it("keeps automation and trust risks separate from transfer score", () => {
    const vetoes = seed.recommendations.filter((item) => item.priority === "Trust veto");
    expect(vetoes.length).toBeGreaterThanOrEqual(2);
    expect(vetoes.every((item) => item.privacyRisk === "Critical")).toBe(true);
  });
});
