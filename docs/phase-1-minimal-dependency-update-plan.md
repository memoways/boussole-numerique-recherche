# Phase 1 Minimal Dependency Update Plan

## Goal

Apply the smallest set of high-confidence dependency updates that reduce known vulnerabilities without taking on major-version migration risk.

## Current risk snapshot (from latest scan)

- `pnpm audit --prod`: 4 high, 14 moderate, 1 low, 0 critical.
- Highest-priority runtime items:
  - Direct: `axios`
  - Transitive: `path-to-regexp`, `qs`, `lodash`, `lodash-es`, `dompurify`, `mdast-util-to-hast`
- Additional high findings in full audit include tooling (`vite`, `pnpm`, `rollup`, `tar`, `picomatch`).

## Phase 1 scope (minimal and safe)

1. Upgrade direct vulnerable package in place:
   - `axios` -> `^1.15.0`
2. Apply transitive `pnpm.overrides` for vulnerable dependency chains:
   - `path-to-regexp` -> `0.1.13`
   - `qs` -> `6.14.2`
   - `lodash` -> `4.18.1`
   - `lodash-es` -> `4.18.1`
   - `dompurify` -> `3.4.0`
   - `mdast-util-to-hast` -> `13.2.1`
3. Patch high-risk tooling advisories without crossing majors:
   - Keep Vite on major 7, but upgrade to a patched 7.x release.
   - Keep Tailwind plugin on major 4, but upgrade within 4.x.
4. Align package manager pinning:
   - Update `devDependency pnpm` and `packageManager` pin to patched `10.x` (>= `10.26.0`).

## Explicit non-goals for Phase 1

Do not include major-version upgrades that likely require code or config migration:

- `express` 4 -> 5
- `vite` 7 -> 8
- `vitest` 2 -> 4
- `typescript` 5 -> 6
- `recharts` 2 -> 3
- `streamdown` 1 -> 2
- `react-resizable-panels` 3 -> 4
- `lucide-react` 0.x -> 1.x
- `wouter` upgrades that conflict with the existing local patch unless that patch is reworked

## Execution steps

1. Create a working branch for implementation.
2. Update direct dependency and lockfile:
   - `pnpm add axios@^1.15.0`
3. Update safe tooling versions inside same major (example):
   - `pnpm add -D vite@^7.3.2 @tailwindcss/vite@^4.2.2 tailwindcss@^4.2.2`
4. Add/extend `pnpm.overrides` in `package.json`:
   - `path-to-regexp: 0.1.13`
   - `qs: 6.14.2`
   - `lodash: 4.18.1`
   - `lodash-es: 4.18.1`
   - `dompurify: 3.4.0`
   - `mdast-util-to-hast: 13.2.1`
5. Align `pnpm` pins:
   - `pnpm add -D pnpm@^10.33.0`
   - update `packageManager` field to the same installed `pnpm` version format
6. Regenerate lockfile via `pnpm install`.
7. Validate:
   - `pnpm audit --prod`
   - `pnpm check`
   - `pnpm build`
8. Stop and document anything that fails due to dependency behavior changes.

## Acceptance criteria

- `pnpm audit --prod` reports:
  - `critical = 0`
  - `high = 0`
- Typecheck and build both pass.
- No app behavior changes intentionally introduced.
- No major-version migrations included.

## Rollback and safety

- If any in-scope update causes runtime/type/build regressions:
  - revert only the offending package bump or override,
  - keep the rest of Phase 1 changes,
  - re-run validation gates.
- If a transitive override causes unexpected breakage, remove only that override and record follow-up for Phase 2.

## Phase 2 follow-up backlog (separate PRs)

- Major upgrades with migration guides and targeted tests:
  - Express 5 migration
  - Vite 8 / Vitest 4 alignment
  - TypeScript 6
  - Recharts 3
  - Streamdown 2
  - React-resizable-panels 4
  - Lucide-react 1.x
- Reassess the `wouter` local patch strategy before upgrading `wouter`.
