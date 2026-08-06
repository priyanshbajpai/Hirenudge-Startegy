# Repository Baseline Policy

## Purpose

This repository stores the human-authored source, configuration, tests, operating documentation, and reproducible inputs needed to develop and operate HireNudge. Generated artifacts and local machine state remain outside Git unless a later review explicitly promotes a specific artifact to a versioned source or release asset.

## What belongs in Git

- Application source, routes, API handlers, components, libraries, middleware, and types.
- Tests and test configuration.
- Package manifests, workspace configuration, and package-manager lockfiles.
- Build, lint, type-check, framework, and deployment configuration.
- Human-authored scripts, Google Apps Script source, seed/source data, and manual research enrichments.
- README files, operating documentation, strategy documents, agent briefs, and repository policies.
- Safe environment templates such as `.env.example`, `*.env.example`, and `.env.*.example` with empty or clearly non-secret placeholders.

## What is generated

The following are generated or machine-local by default:

- Dependency installations such as `node_modules/`.
- Next.js and other build outputs such as `.next/`, `dist/`, and `build/`.
- Coverage, cache, TypeScript build-info, and log files.
- Research manifests produced by scripts under `data/research/generated/`.
- QA screenshots, smoke-test output, rendered reports, dashboards, spreadsheets, and other binary exports under output or report directories.
- Local agent/audit state under `.gstack/` and operating-system/editor temporary files.

## What remains outside Git

Generated reports, manifests, screenshots, research outputs, logs, caches, build products, installed dependencies, and local audit artifacts remain present locally but untracked. Exclusion from Git is not a deletion or backup policy. Owners must decide whether valuable outputs need durable object storage, shared-drive storage, or another approved external backup.

## Environment-file rules

Real environment files and local secret-bearing variants must never be committed. Repository ignore rules cover `.env`, `.env.*`, `*.env`, `*.env.*`, and `.envrc`. Safe examples remain trackable through exceptions for `.env.example`, `*.env.example`, and `.env.*.example`.

Environment examples must contain only empty values or explicit non-secret placeholders. Credentials, tokens, passwords, private keys, and production identifiers belong in an approved secret manager or deployment environment. If a secret is ever committed or shared in an artifact, remove it from the working baseline and rotate it; deleting a Git line alone does not invalidate the exposed credential.

## Reports, manifests, screenshots, and research outputs

- Human-authored research inputs, manual enrichments, source ledgers, and reproducible scripts may be versioned.
- Generated manifests remain excluded until the team confirms that they are authoritative, non-sensitive, reasonably sized, and not reproducible from versioned inputs.
- QA screenshots and smoke outputs remain excluded unless intentionally selected as durable test fixtures or release evidence.
- Rendered HTML reports, generated JSON reports, spreadsheets, and dashboard exports remain excluded. Store important deliverables externally and record their owner, date, and restoration source.
- Raw research outputs require privacy, licensing, provenance, and retention review before any future inclusion.

## Dependency and build restoration

Dependencies must be restored from the committed package manifest and `pnpm-lock.yaml` using the documented pnpm workflow. Never copy or commit `node_modules/`. Next.js output must be regenerated from source and must never be committed from `.next/`. The same rule applies to caches, coverage, and other build output.

## Prohibited content

Do not commit:

- `node_modules/`, `.next/`, dependency caches, or build output;
- real environment files, credentials, tokens, passwords, private keys, or secret-manager exports;
- local logs, `.gstack/` state, OS/editor artifacts, or unreviewed generated outputs;
- customer or job-seeker sensitive data without an explicit, approved data-handling decision.

Any exception requires an explicit review documenting why the file is source-of-truth, how it will be maintained, and why its security, privacy, licensing, and repository-size risks are acceptable.
