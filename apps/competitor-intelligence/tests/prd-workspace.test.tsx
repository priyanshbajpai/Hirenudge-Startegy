// @vitest-environment jsdom
import "@testing-library/jest-dom/vitest";
import React from "react";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { PrdBadge } from "../src/features/prd/prd-badges";
import { PrdProvider } from "../src/features/prd/prd-provider";
import { PrdWorkspaceShell } from "../src/features/prd/workspace-shell";

afterEach(cleanup);

describe("PRD workspace shell", () => {
  it("identifies the workspace as a local founder PRD tool", () => {
    render(<PrdProvider><PrdWorkspaceShell title="Product PRDs"><div>content</div></PrdWorkspaceShell></PrdProvider>);
    expect(screen.getByText("Local draft")).toBeVisible();
    expect(screen.getByRole("searchbox", { name: /search requirements/i })).toBeVisible();
    expect(screen.getByRole("button", { name: /export local changes/i })).toBeEnabled();
  });

  it("shows separate category, decision and delivery labels", () => {
    render(<div><PrdBadge kind="category" value="Must Have" /><PrdBadge kind="decision" value="To Be Discussed" /><PrdBadge kind="delivery" value="Not Started" /></div>);
    expect(screen.getByText("Must Have")).toBeVisible();
    expect(screen.getByText("To Be Discussed")).toBeVisible();
    expect(screen.getByText("Not Started")).toBeVisible();
  });
});
