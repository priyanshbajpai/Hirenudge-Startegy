import { describe, expect, it } from "vitest";
import { strategyNavigation, strongestFindings } from "../src/features/strategy/content";
import { founderDecisions } from "../src/features/strategy/decisions";
import { presentationChapters } from "../src/features/strategy/presentation";

describe("founder strategy content", () => {
  it("defines the eleven PRD command destinations", () => {
    expect(strategyNavigation).toHaveLength(11);
    expect(strategyNavigation.map((item) => item.label)).toEqual([
      "Command Center",
      "Product PRDs",
      "Screens & UX",
      "Partners & APIs",
      "Legal & Trust",
      "GTM & First 100",
      "Social Studio",
      "Activation & Retention",
      "Roadmap",
      "Decision Queue",
      "Evidence Library",
    ]);
  });

  it("keeps findings concise and evidence-safe", () => {
    expect(strongestFindings.length).toBeGreaterThanOrEqual(8);
    expect(strongestFindings.join(" ")).not.toMatch(/guaranteed|verified customer count|approval granted/i);
  });

  it("defines a complete founder decision queue without approvals", () => {
    expect(founderDecisions).toHaveLength(15);
    expect(founderDecisions.every((item) => item.question.endsWith("?"))).toBe(true);
    expect(founderDecisions.every((item) => item.status === "To Be Discussed")).toBe(true);
    expect(founderDecisions.every((item) => item.alternatives.length >= 1 && item.evidence.length >= 1)).toBe(true);
  });

  it("defines the approved fifteen-chapter presentation narrative", () => {
    expect(presentationChapters).toHaveLength(15);
    expect(presentationChapters[0].title).toBe("Where HireNudge is today");
    expect(presentationChapters.at(-1)?.title).toBe("Founder decisions");
    expect(presentationChapters.map((chapter) => chapter.number)).toEqual(Array.from({ length: 15 }, (_, index) => index + 1));
  });
});
