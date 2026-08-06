// @vitest-environment jsdom
import "@testing-library/jest-dom/vitest";
import React from "react";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { RoadmapSection } from "../src/features/strategy/sections/roadmap-section";
import { DecisionsSection } from "../src/features/strategy/sections/decisions-section";

afterEach(cleanup);

describe("roadmap and founder decision views", () => {
  it("filters the roadmap and preserves five horizons", () => {
    render(<RoadmapSection />);
    expect(screen.getAllByRole("heading", { level: 2 })).toHaveLength(5);
    fireEvent.change(screen.getByLabelText("Priority"), { target: { value: "P3 — Later" } });
    expect(screen.getByText(/2 initiatives across the roadmap/i)).toBeVisible();
  });

  it("shows a complete founder decision and expands its alternatives", () => {
    render(<DecisionsSection />);
    expect(screen.getByText("15 decisions · 0 approved")).toBeVisible();
    const first = screen.getByRole("button", { name: /What exact outcome and activation definition/i });
    fireEvent.click(first);
    expect(screen.getByText("Impact of delay")).toBeVisible();
    expect(screen.getByText("Alternatives considered")).toBeVisible();
    expect(screen.getAllByText("To Be Discussed").length).toBeGreaterThan(0);
  });
});
