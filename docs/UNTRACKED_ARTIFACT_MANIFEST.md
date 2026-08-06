# Untracked Artifact Manifest

This manifest records locally preserved artifacts intentionally excluded from the repository baseline. Counts and sizes are approximate snapshots from the Phase 0B audit. No listed artifact was deleted.

| Category | Local path | Approximate count | Approximate size | Why excluded | Backup or review guidance |
|---|---|---:|---:|---|---|
| Root outputs | `outputs/` | 25 files | 6.9 MiB | Generated dashboard images, research output, and a spreadsheet/binary export | Review for business value; externally back up deliverables that cannot be reproduced |
| Generated reports | `reports/` | 2 files | 520 KiB | Generated HTML and JSON report artifacts | External backup may be appropriate; review before any future release-asset decision |
| Research manifests | `apps/competitor-intelligence/data/research/generated/` | 3 files | 31.3 MiB | Large generated JSON manifests/checkpoints | High-priority review: confirm reproducibility and whether any file is an authoritative dataset before cleanup |
| QA output | `apps/competitor-intelligence/outputs/` | 14 files, including 13 PNG screenshots | 3.6 MiB | QA screenshots and smoke output are execution evidence rather than application source | Back up externally only if needed for a release or audit trail; otherwise regenerate during QA |
| Local logs | `.gstack/*.log` | 2 files | 160 KiB | Local browser console/network logs may contain machine-specific or sensitive operational data | Do not commit; retain only as long as needed for debugging and review before sharing |
| Local audit state | `.gstack/` excluding logs | 2 files | About 48 KiB | Local audit and tool-availability state | No repository backup expected; retain locally only while operationally useful |
| Dependency installation | `apps/competitor-intelligence/node_modules/` | About 39,885 files | 880 MiB | Reproducible third-party dependencies | No backup needed; restore from `package.json` and `pnpm-lock.yaml` |
| Next.js output | `apps/competitor-intelligence/.next/` | About 2,234 files | 923 MiB | Reproducible framework build/cache output | No backup needed; regenerate with the production build workflow |
| OS metadata | `.DS_Store` | 1 file | 8 KiB | Local Finder metadata | No backup needed |

## Review notes

- Exclusion is not authorization to delete. The generated research manifests, research outputs, reports, spreadsheets, and screenshots must remain locally preserved until their owners decide whether they require external backup.
- Research outputs may require additional privacy, provenance, licensing, and retention review.
- Any artifact later proposed for Git must first be checked for secrets, sensitive user data, generated bulk, and reproducibility.
