# Thingspire Flow

## Overview

Thingspire Flow Phase 1 - 조직문화 설문 + 데이터 기반 대시보드 플랫폼.
An organizational culture survey and analytics platform for Korean companies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **Frontend**: React + Vite (artifacts/thingspire-flow)
- **API framework**: Express 5 (artifacts/api-server)
- **Database**: PostgreSQL + Drizzle ORM
- **Auth**: Session-based (express-session + connect-pg-simple), SHA-256 password hashing
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Frontend state**: TanStack React Query + generated hooks

## Structure

```text
artifacts-monorepo/
├── artifacts/
│   ├── api-server/         # Express API server
│   └── thingspire-flow/    # React + Vite frontend (preview at /)
├── lib/
│   ├── api-spec/           # OpenAPI spec + Orval codegen config
│   ├── api-client-react/   # Generated React Query hooks
│   ├── api-zod/            # Generated Zod schemas from OpenAPI
│   └── db/                 # Drizzle ORM schema + DB connection
└── scripts/                # Utility scripts
```

## Database Schema

Tables:
- `departments` - Organizational departments (hierarchical support)
- `users` - System users with roles (admin/leader/member)
- `survey_cycles` - Survey campaigns with intro content
- `survey_sections` - Sections within a survey
- `survey_questions` - Questions (likert_5, short_text, long_text)
- `survey_responses` - Per-user response tracking
- `survey_answers` - Individual question answers

## User Roles

- **admin** (email: admin@thingspire.com / password: admin1234): Full access, create surveys, view all data
- **leader** (email: leader@thingspire.com / password: member1234): Team results, partial management
- **member** (email: member1@thingspire.com / password: member1234): Survey responses only

## Features (Phase 1)

- Session-based login (ready for Microsoft OAuth migration)
- Survey lifecycle: draft → active → closed
- Multi-step survey UX: intro page → section-by-section → submit
- Draft save (auto-save) and final submit
- Admin dashboard: response rates, section scores, charts
- Department management
- User management with role assignment
- Anonymity policy (5-person minimum threshold)

## API Routes

All routes at `/api`:
- `POST /auth/login`, `POST /auth/logout`, `GET /auth/me`
- `GET/POST /departments`, `PATCH /departments/:id`
- `GET/PATCH /users/:id`, `GET /users`
- `GET/POST /surveys`, `GET/PATCH /surveys/:id`
- `POST /surveys/:id/activate`, `POST /surveys/:id/close`
- `GET/POST /surveys/:surveyId/sections`
- `GET/POST /sections/:sectionId/questions`
- `GET /surveys/:surveyId/my-response`, `POST /surveys/:surveyId/responses/start`
- `PUT /responses/:responseId/answers`, `POST /responses/:responseId/submit`
- `GET /dashboard/overview`, `GET /dashboard/surveys/:surveyId`

## Development Notes

- Run codegen after OpenAPI spec changes: `pnpm --filter @workspace/api-spec run codegen`
- Push DB schema: `pnpm --filter @workspace/db run push`
- Dev server: workflows auto-start for both api-server and thingspire-flow
- Cookies require credentials:true in fetch for session auth to work cross-origin

## Future Phases

- Phase 2: 다면평가 (peer reviews), 성과평가 (performance reviews)
- Phase 3: AI analysis, natural language queries on aggregated data
- Microsoft Entra ID OAuth integration (structure is ready)
