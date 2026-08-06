# HireNudge Founder’s Office OS

This repository is Priyansh Bajpai’s durable strategy, research, and execution system for building HireNudge.

## Start here

- [Founder capability map](docs/strategy/00-founder-capability-map.md)
- [Market and competitor baseline](docs/strategy/01-market-competitor-baseline.md)
- [First 50 customers GTM](docs/strategy/02-first-50-gtm.md)
- [Market gaps and product improvement analysis](docs/strategy/03-market-gaps-product-improvement.md)
- [GTM and product–market fit plan](docs/strategy/04-gtm-product-market-fit-plan.md)
- [GTM and market analysis handbook](docs/strategy/05-gtm-market-analysis-handbook.md)
- [Portable executive report](reports/hirenudge-market-strategy.html)
- [Specialist agent roster](agents/README.md)
- [Research source ledger](docs/research/source-ledger.md)
- [Research summary](docs/RESEARCH_SUMMARY.md)
- [Founder dashboard content specification](docs/planning/07_DASHBOARD_CONTENT_SPEC.md)
- [Canonical initiative register](docs/planning/01_CANONICAL_INITIATIVE_REGISTER.md)

## Founder Strategy Dashboard

The founder-ready dashboard is implemented in the existing Next.js application at `/strategy`. It uses local, typed initiative data and exposes no customer data, live APIs, AI generation, authentication dependency, or external analytics. The canonical register remains at `src/data/initiatives.json`; the app carries an exact deployment mirror at `apps/competitor-intelligence/data/strategy-initiatives.json`, enforced by a test.

```bash
cd apps/competitor-intelligence
pnpm install
pnpm dev
```

Open `http://localhost:3000/strategy`.

Quality and production commands:

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm start
```

The strategy route is intentionally presentation-safe and public in V1. The existing competitor-intelligence routes retain their production password protection and environment requirements.

## Current recommendation

Do not position HireNudge as another generic all-in-one AI career copilot. Test an India-first wedge around one concrete job-search outcome before expanding into global mobility.

The current planning recommendation is four cohorts of 25 eligible paying customers, with the first 10 used to calibrate the workflow. This replaces the earlier first-50 planning threshold as a recommendation only; the founder has not approved the target.

## Status

The research cut-off is August 6, 2026. Recommendations remain provisional until company analytics, roadmap, customer research, pricing data, job-source quality, support history, engineering constraints and founder objectives are reviewed. No founder approvals are recorded in the dashboard.
