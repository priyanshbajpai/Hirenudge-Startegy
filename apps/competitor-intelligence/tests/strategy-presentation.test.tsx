// @vitest-environment jsdom
import "@testing-library/jest-dom/vitest";
import React from "react";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { StrategyPresentation } from "../src/features/strategy/strategy-presentation";

afterEach(cleanup);

describe("founder presentation mode", () => {
  it("navigates all 15 chapters with controls and keyboard", () => {
    render(<StrategyPresentation />);
    expect(screen.getAllByText("01 / 15")[0]).toBeVisible();
    expect(screen.getByRole("heading", { name: "Where HireNudge is today" })).toBeVisible();
    fireEvent.keyDown(window, { key: "ArrowRight" });
    expect(screen.getAllByText("02 / 15")[0]).toBeVisible();
    fireEvent.click(screen.getByRole("button", { name: "Previous chapter" }));
    expect(screen.getAllByText("01 / 15")[0]).toBeVisible();
  });

  it("opens chapter navigation and jumps to founder decisions", () => {
    render(<StrategyPresentation />);
    fireEvent.click(screen.getByRole("button", { name: "Open chapter navigator" }));
    fireEvent.click(screen.getByRole("button", { name: /15 Founder decisions/i }));
    expect(screen.getAllByText("15 / 15")[0]).toBeVisible();
    expect(screen.getByRole("heading", { name: "Founder decisions" })).toBeVisible();
    expect(screen.getAllByText("P0 — Must Have").length).toBeGreaterThan(0);
  });
});
