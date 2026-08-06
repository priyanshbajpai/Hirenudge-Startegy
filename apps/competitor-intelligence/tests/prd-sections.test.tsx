// @vitest-environment jsdom
import "@testing-library/jest-dom/vitest";
import React from "react";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { PrdProvider } from "../src/features/prd/prd-provider";
import { ProductPrds } from "../src/features/prd/workspaces/product-prds";
import { LegalTrust } from "../src/features/prd/workspaces/legal-trust";
import { GtmFirst100 } from "../src/features/prd/workspaces/gtm-first-100";
import { CommandCenter } from "../src/features/prd/workspaces/command-center";
import { ScreensUx } from "../src/features/prd/workspaces/screens-ux";
import { PartnersApis } from "../src/features/prd/workspaces/partners-apis";
import { SocialStudio } from "../src/features/prd/workspaces/social-studio";
import { ActivationRetention } from "../src/features/prd/workspaces/activation-retention";
import { RoadmapWorkspace } from "../src/features/prd/workspaces/roadmap";
import { DecisionQueue } from "../src/features/prd/workspaces/decision-queue";
import { EvidenceLibrary } from "../src/features/prd/workspaces/evidence-library";

afterEach(cleanup);

describe("PRD operating workspaces", () => {
  it("compares current evidence, team change and recommendation", () => {
    render(<PrdProvider><ProductPrds initialWorkspace="Onboarding" /></PrdProvider>);
    expect(screen.getByText("Current observed product")).toBeVisible();
    expect(screen.getByText("Team-described change")).toBeVisible();
    expect(screen.getByText("Recommended requirement")).toBeVisible();
  });

  it("shows required product modules", () => {
    render(<PrdProvider><ProductPrds /></PrdProvider>);
    for (const moduleName of ["Nudge Studio", "AI Job Matcher", "Email Outreach", "Job Tracker", "Interview Preparation"]) {
      expect(screen.getAllByText(moduleName)[0]).toBeVisible();
    }
  });

  it("shows obligations as release gates rather than compliance claims", () => {
    render(<PrdProvider><LegalTrust /></PrdProvider>);
    expect(screen.getByText(/published disclosure, not proof/i)).toBeVisible();
    expect(screen.getByText("India DPDP")).toBeVisible();
    expect(screen.getByText("EU GDPR")).toBeVisible();
  });

  it("distinguishes first-100 funnel states", () => {
    render(<PrdProvider><GtmFirst100 /></PrdProvider>);
    for (const state of ["Lead", "Signup", "Activated user", "Beta participant", "Paid customer", "Retained paid customer"]) expect(screen.getByText(state)).toBeVisible();
  });

  it("renders every PRD command workspace", () => {
    const sections = [
      [<CommandCenter key="command" />, "PRD Command Center"],
      [<ScreensUx key="ux" />, "Screens & UX"],
      [<PartnersApis key="partners" />, "Partners & APIs"],
      [<SocialStudio key="social" />, "Social Studio"],
      [<ActivationRetention key="retention" />, "Activation & Retention"],
      [<RoadmapWorkspace key="roadmap" />, "Delivery Roadmap"],
      [<DecisionQueue key="decisions" />, "Founder Decision Queue"],
      [<EvidenceLibrary key="evidence" />, "Evidence Library"],
    ] as const;
    for (const [component, heading] of sections) {
      const view = render(<PrdProvider>{component}</PrdProvider>);
      expect(screen.getByRole("heading", { name: heading })).toBeVisible();
      view.unmount();
    }
  });
});
