// @vitest-environment jsdom
import "@testing-library/jest-dom/vitest";
import React from "react";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { prdRecords } from "../src/features/prd/data";
import { PrdProvider, usePrd } from "../src/features/prd/prd-provider";
import { RecordInspector } from "../src/features/prd/record-inspector";

afterEach(cleanup);

function InspectorHarness() {
  const { records } = usePrd();
  return <RecordInspector record={records[0]} onClose={() => undefined} />;
}

describe("PRD record inspector", () => {
  it("edits delivery status and ETA while preserving evidence limitation", () => {
    render(<PrdProvider><InspectorHarness /></PrdProvider>);
    fireEvent.click(screen.getByRole("tab", { name: "Delivery" }));
    fireEvent.change(screen.getByLabelText("Delivery status"), { target: { value: "In Development" } });
    fireEvent.change(screen.getByLabelText("Planning ETA"), { target: { value: "2026-08-28" } });
    expect(screen.getByDisplayValue("In Development")).toBeVisible();
    fireEvent.click(screen.getByRole("tab", { name: "PRD" }));
    expect(screen.getByText(/visible screens and planning documents do not verify/i)).toBeVisible();
  });

  it("exposes PRD, delivery, UX, partners, compliance and evidence tabs", () => {
    render(<PrdProvider><RecordInspector record={{ ...prdRecords[0], founderNotes: "", localOrder: 0, removed: false }} onClose={() => undefined} /></PrdProvider>);
    for (const tab of ["PRD", "Delivery", "UX", "Partners", "Compliance", "Evidence"]) expect(screen.getByRole("tab", { name: tab })).toBeVisible();
  });
});
