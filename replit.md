# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Artifacts

### Pilumpiku Production (`artifacts/pilimpiku`)
- **Kind**: react-vite
- **Preview path**: `/`
- **Stack**: React + Vite + Tailwind CSS + Framer Motion + Wouter + react-hook-form + zod
- **Fonts**: Cormorant Garamond + Inter (via @fontsource)
- **Description**: Official website for Pilumpiku Production, an African cinematic production company based in Ouagadougou, Burkina Faso
- **Pages (public)**: Home, À Propos, Projets, Projet/:slug, Services, Partenaires, Actualités, Contact
- **Admin** (`/admin`): Authenticated dashboard with tabs for Projets, Actualités, Services, Partenaires, and Site settings. CRUD via `@workspace/api-client-react` hooks; mutations invalidate the matching query keys so public pages auto-refresh.
- **Data source**: All content fetched from the API server (`@workspace/api-client-react`). Public pages and admin share the same hooks/keys.
- **Color palette**: Dark cinematic theme (warm blacks, monarch butterfly orange #E8921A, gold #C9A84C)

### API Server (`artifacts/api-server`)
- **Kind**: api (Express 5)
- **Auth**: Replit Auth (OIDC) via `@workspace/replit-auth-server`. Sessions in PostgreSQL.
- **Admin model**: `users.isAdmin` boolean. Per project owner request, every user that signs in via Replit Auth is auto-promoted to admin in `routes/auth.ts:upsertUser`.
- **Write protection**: All POST/PATCH/DELETE routes for projects, news, services, partners, and settings use `requireAdmin` middleware.
- **Entities**: `projects`, `news`, `services`, `partners`, single-row `site_settings`. See `db/schema.ts`.
- **Seed**: `pnpm --filter @workspace/api-server exec tsx src/seed.ts` populates initial content. The live database is populated with researched content about the real Pilumpiku Production (founded January 2011 by Mamounata Nikiéma, Ouagadougou) — site settings, founder bio, services, partners (FESPACO, Africadoc/Ardèche Images, Arte GEIE, Africalia, OIF, Institut français, FNCA…), real filmography (L''Odyssée d''Omar, Lumière d''octobre, Savoir Raison Garder, Aïcha la petite ouagalaise, Une journée avec, Osez la lune/scène, Circulation ya yélé, An 27, Monsieur Bayala, La lutte continue) and news. The seed.ts file still holds the older fictional content; future re-seed should be reconciled with the live values.

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.

## Replit Development Setup

- The managed API workflow runs database migrations and seeds the development database automatically at startup.
- Local development prioritizes Replit's managed `DATABASE_URL`. `RAILWAY_DATABASE_URL` remains a fallback for Railway deployments.
- Start the API workflow before the web workflow; the web app calls its API through the `/api` proxy path.
