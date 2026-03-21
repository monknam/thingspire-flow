# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Mandatory Read Order

Before making any code or documentation changes, read these files in order:

1. `project-docs/00_project_overview.md`
2. `project-docs/01_current_goal.md`
3. `project-docs/02_work_log.md`
4. `project-docs/03_rules.md`
5. `project-docs/04_product_vision.md`

If the task involves authentication or deployment migration, also read `MIGRATION_PLAN.md` and `SUPABASE_AUTH_MIGRATION.md`.

## Commands

**Root workspace:**
```bash
pnpm build          # Typecheck + build all packages
pnpm typecheck      # Type-check all packages
```

**Frontend (`artifacts/thingspire-flow`):**
```bash
pnpm dev            # Vite dev server
pnpm build          # Production build
pnpm typecheck      # Type-check only
```

**API server (`artifacts/api-server`):**
```bash
pnpm dev            # Express dev server (NODE_ENV=development)
pnpm build          # Transpile to dist/
pnpm typecheck      # Type-check only
```

**Code generation & DB:**
```bash
pnpm --filter @workspace/api-spec run codegen   # Regenerate React Query hooks from OpenAPI spec
pnpm --filter @workspace/db run push            # Push Drizzle schema to database
```

## Architecture

This is a **pnpm monorepo** for Thingspire Flow — a modular HR and organizational operations platform. Survey is the first module; peer review and performance review come next.

**Packages:**
- `artifacts/thingspire-flow` — React 19 + Vite 7 frontend, TanStack Query, Tailwind 4, Radix UI, Wouter routing
- `artifacts/api-server` — Express 5 REST API (legacy, being thinned)
- `lib/api-spec` — OpenAPI spec; run codegen after editing
- `lib/api-client-react` — Orval-generated React Query hooks (do not hand-edit)
- `lib/api-zod` — Orval-generated Zod schemas (do not hand-edit)
- `lib/db` — Drizzle ORM schema + DB connection (source of truth for data model)

**Current migration direction:** Replit → Vercel + Supabase. Express session auth is **legacy**. Supabase Auth is the target. Do not add new features on top of the old auth model.

**Data model core:** `organizations → departments → profiles → survey_cycles → survey_sections → survey_questions → survey_responses → survey_answers`. User roles: `admin`, `leader`, `member`.

## Rules

- Every meaningful work cycle must end with an update to `project-docs/02_work_log.md` (what changed, why, remaining issues, recommended next task).
- Do not frame the product as survey-only in naming, navigation, or IA — it is an integrated system.
- Prefer additive/transitional changes over big-bang rewrites.
- Preserve existing user changes in the worktree; do not revert unrelated files.
- When handing off to another agent or session, use `project-docs/agent_handoff_template.md`.
