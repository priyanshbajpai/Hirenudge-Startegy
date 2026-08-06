// @vitest-environment jsdom
import "@testing-library/jest-dom/vitest";
import React from "react";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { InitiativeExplorer } from "../src/features/strategy/initiative-explorer";
import { initiatives } from "../src/features/strategy/data";

afterEach(cleanup);

describe("initiative explorer", () => {
  it("searches and combines filters with a visible selected state", () => {
    render(<InitiativeExplorer initiatives={initiatives} showModuleFilter />);
    fireEvent.change(screen.getByRole("searchbox", { name: "Search initiatives" }), { target: { value: "Gmail" } });
    fireEvent.change(screen.getByLabelText("Priority"), { target: { value: "P0 — Must Have" } });
    expect(screen.getByText(/1 initiative shown/i)).toBeVisible();
    expect(screen.getByText("Send-only Gmail integration")).toBeVisible();
    expect(screen.getByText("2 active filters")).toBeVisible();
  });

  it("opens complete details and closes with Escape", () => {
    render(<InitiativeExplorer initiatives={initiatives.slice(0, 1)} />);
    fireEvent.click(screen.getByRole("button", { name: /View details for/i }));
    expect(screen.getByRole("dialog", { name: /Claims and proof governance/i })).toBeVisible();
    expect(screen.getByText("Success metrics")).toBeVisible();
    expect(screen.getByText("Founder question")).toBeVisible();
    fireEvent.keyDown(document, { key: "Escape" });
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("clears filters", () => {
    render(<InitiativeExplorer initiatives={initiatives} />);
    fireEvent.change(screen.getByRole("searchbox", { name: "Search initiatives" }), { target: { value: "no-result-query" } });
    expect(screen.getByText("No initiatives match these filters")).toBeVisible();
    fireEvent.click(screen.getByRole("button", { name: "Clear all filters" }));
    expect(screen.getByText(/38 initiatives shown/i)).toBeVisible();
  });
});
