import type { ReactNode } from "react";
import type { Metadata } from "next";
import { StrategyShell } from "@/features/strategy/strategy-shell";

export const metadata: Metadata = {
  title: "HireNudge Founder Strategy",
  description: "Evidence-backed product, GTM and founder decision dashboard for HireNudge.",
};

export default function StrategyLayout({ children }: { children: ReactNode }) {
  return <StrategyShell>{children}</StrategyShell>;
}
