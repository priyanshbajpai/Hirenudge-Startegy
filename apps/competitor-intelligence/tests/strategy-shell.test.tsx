// @vitest-environment jsdom
import "@testing-library/jest-dom/vitest";
import React from "react";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { PriorityBadge, StatusBadge } from "../src/features/strategy/primitives";
import { StrategyShell } from "../src/features/strategy/strategy-shell";

vi.mock("next/navigation", () => ({ usePathname: () => "/strategy" }));

afterEach(cleanup);

describe("strategy shell", () => {
  it("renders text-backed semantic status labels", () => {
    render(<div><PriorityBadge value="P0 — Must Have" /><StatusBadge kind="decision" value="To Be Discussed" /></div>);
    expect(screen.getByText("P0 — Must Have")).toBeVisible();
    expect(screen.getByText("To Be Discussed")).toBeVisible();
  });

  it("provides accessible navigation and presentation entry", () => {
    render(<StrategyShell><h1>Strategy overview</h1></StrategyShell>);
    expect(screen.getByRole("link", { name: "Skip to strategy content" })).toHaveAttribute("href", "#strategy-content");
    expect(screen.getByRole("navigation", { name: "Strategy sections" })).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: /Presentation mode/i })[0]).toHaveAttribute("href", "/strategy/presentation");
    expect(screen.getByText("No founder approvals recorded")).toBeVisible();
  });

  it("opens and closes responsive navigation", () => {
    render(<StrategyShell><h1>Strategy overview</h1></StrategyShell>);
    const open = screen.getByRole("button", { name: "Open strategy navigation" });
    fireEvent.click(open);
    expect(screen.getByRole("button", { name: "Close strategy navigation" })).toBeVisible();
    fireEvent.click(screen.getByRole("button", { name: "Close strategy navigation" }));
    expect(screen.queryByRole("button", { name: "Close strategy navigation" })).not.toBeInTheDocument();
  });
});
