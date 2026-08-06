// @vitest-environment jsdom
import "@testing-library/jest-dom/vitest";
import React from "react";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { OverviewSection } from "../src/features/strategy/sections/overview-section";
import { ProductSection } from "../src/features/strategy/sections/product-section";
import { UxSection } from "../src/features/strategy/sections/ux-section";
import { BrandSection } from "../src/features/strategy/sections/brand-section";
import { SocialSection } from "../src/features/strategy/sections/social-section";
import { GtmSection } from "../src/features/strategy/sections/gtm-section";
import { First100Section } from "../src/features/strategy/sections/first-100-section";
import { RetentionSection } from "../src/features/strategy/sections/retention-section";
import { EvidenceSection } from "../src/features/strategy/sections/evidence-section";

afterEach(cleanup);

describe("strategy dashboard sections", () => {
  it.each([
    [OverviewSection, "The decision system for HireNudge’s next chapter"],
    [ProductSection, "Connect one real application from role to outcome"],
    [UxSection, "Reframe the product around the job seeker’s next decision"],
    [BrandSection, "Sound precise, calm and worthy of sensitive career data"],
    [SocialSection, "Earn attention with useful proof, not louder promises"],
    [GtmSection, "Prove one India-first workflow before widening the map"],
    [First100Section, "One hundred paying learners, not one hundred sign-ups"],
    [RetentionSection, "Follow the search state, not a fixed email calendar"],
    [EvidenceSection, "Keep the strategy traceable to what is known—and unknown"],
  ])("renders an evidence-safe founder section", (Component, heading) => {
    render(<Component />);
    expect(screen.getByRole("heading", { level: 1, name: heading })).toBeVisible();
    expect(screen.queryByText(/approved strategy/i)).not.toBeInTheDocument();
  });
});
