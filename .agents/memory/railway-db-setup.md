---
name: Railway + DB migration setup
description: How Drizzle migrations are bundled and run in the API server for Railway deployment
---

# Railway + PostgreSQL migration setup

## The rule
`build.mjs` copies `lib/db/migrations/` into `dist/migrations/` after esbuild runs. `migrate.ts` resolves the path as `./migrations` relative to `import.meta.url` (the bundle file location). This makes the bundle self-contained.

**Why:** esbuild bundles everything into `dist/index.mjs`. When that file runs, `import.meta.url` points to the bundle, not the original source. So `../migrations` from the source location is wrong — the migrations must be copied into `dist/` alongside the bundle.

**How to apply:** Any time the schema changes, run `pnpm --filter @workspace/db run generate` to create a new migration file, then rebuild. The `build.mjs` copy step ensures the new file ends up in `dist/migrations/` automatically.

## Railway deployment files
- `railway.toml` at repo root — single service: builds frontend + API, starts API which serves frontend static files
- `MIGRATIONS_PATH` env var overrides the default migrations location if needed
- `FRONTEND_DIST_PATH` env var overrides frontend static files location
- Vite build requires `BASE_PATH` (defaults to `/` if not set — safe for Railway)

## Key env vars required on Railway
- `DATABASE_URL` — auto-provided by Railway PostgreSQL plugin
- `PORT` — auto-provided by Railway
- `NODE_ENV=production`
- `SESSION_SECRET` — must set manually (auth sessions)
- `REPLIT_DOMAINS` — must set to Railway domain (auth OIDC)
