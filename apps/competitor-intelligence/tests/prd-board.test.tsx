// @vitest-environment jsdom
import "@testing-library/jest-dom/vitest";
import React from "react";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { prdRecords } from "../src/features/prd/data";
import { PrdProvider } from "../src/features/prd/prd-provider";
import { RequirementsBoard } from "../src/features/prd/requirements-board";

afterEach(cleanup);

describe("PRD requirements board", () => {
  it("moves a task between delivery lanes through an accessible command", () => {
    const record = { ...prdRecords[0], deliveryStatus: "Not Started" as const, founderNotes: "", localOrder: 0, removed: false };
    render(<PrdProvider><RequirementsBoard records={[record]} mode="delivery" onOpen={() => undefined} /></PrdProvider>);
    fireEvent.click(screen.getByRole("button", { name: new RegExp(`move ${record.id}`, "i") }));
    fireEvent.change(screen.getByLabelText("Move to delivery status"), { target: { value: "In Design" } });
    fireEvent.click(screen.getByRole("button", { name: "Move task" }));
    expect(screen.getByRole("region", { name: "In Design" })).toHaveTextContent(record.id);
  });
});
