# Project Overview

## Project

Thingspire Flow is an organizational culture survey and analytics platform.

## Current Direction

The project started around Replit, Express, session auth, and local PostgreSQL assumptions.

The active migration target is:

- GitHub as the source repository
- Vercel for deployment
- Supabase Auth for authentication
- Supabase Postgres for database hosting

## Current Codebase Shape

- Frontend: `artifacts/thingspire-flow`
- Legacy API server: `artifacts/api-server`
- Shared DB schema: `lib/db`
- Generated API clients/spec: `lib/api-client-react`, `lib/api-spec`, `lib/api-zod`

## Important Strategy

- Keep the current React + Vite app for the first migration pass
- Do not keep Express session auth
- Introduce Supabase Auth and a `profiles`-style app user model
- Reduce Replit-specific runtime assumptions over time

## Core Reference Docs

- `MIGRATION_PLAN.md`
- `SUPABASE_AUTH_MIGRATION.md`

## Working Assumption

Do not combine architecture migration and unrelated feature expansion in the same pass.
