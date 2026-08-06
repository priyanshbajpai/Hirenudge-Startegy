import { describe, expect, it } from "vitest";
import {
  filterInitiatives,
  initiatives,
  moduleOptions,
  strategyCounts,
} from "../src/features/strategy/data";

describe("strategy initiative data", () => {
  it("loads the complete reviewed canonical register", () => {
    expect(initiatives).toHaveLength(38);
    expect(new Set(initiatives.map((initiative) => initiative.id)).size).toBe(38);
    expect(strategyCounts.priority).toEqual({ P0: 13, P1: 17, P2: 6, P3: 2 });
    expect(strategyCounts.horizon).toEqual({ Now: 9, Next: 11, Later: 5, Research: 7, Blocked: 6 });
  });

  it("does not invent founder approvals, priorities, or owners", () => {
    expect(initiatives.every((initiative) => initiative.decision_status === "To Be Discussed")).toBe(true);
    expect(initiatives.every((initiative) => initiative.founder_priority === null)).toBe(true);
    expect(initiatives.every((initiative) => initiative.owner === "Unassigned")).toBe(true);
  });

  it("supports combined search and semantic filters", () => {
    const result = filterInitiatives(initiatives, {
      query: "Gmail",
      priorities: ["P0 — Must Have"],
      workstreams: ["Outreach"],
      initiativeTypes: ["Compliance Requirement"],
      evidenceStatuses: ["Requires Verification"],
      decisionStatuses: ["To Be Discussed"],
      horizons: ["Blocked"],
      owners: ["Unassigned"],
      modules: ["Outreach"],
    });

    expect(result.map((initiative) => initiative.id)).toEqual(["HN-012"]);
  });

  it("exposes every required product module filter", () => {
    expect(moduleOptions).toEqual(expect.arrayContaining([
      "Nudge Studio",
      "AI Job Matcher",
      "Application Tracking",
      "Interview Preparation",
      "Outreach",
      "Portfolio",
      "Onboarding",
      "Retention",
      "Job Data",
      "Other",
    ]));
  });
});
