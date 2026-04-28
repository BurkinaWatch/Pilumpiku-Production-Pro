# Threat Model

## Project Overview

This project is a pnpm workspace monorepo with a small current production surface:
- `artifacts/pilimpiku`: a React + Vite marketing website for Pilimpiku Production.
- `artifacts/api-server`: an Express 5 API.
- `lib/db`: shared PostgreSQL + Drizzle database bootstrap.
- `lib/api-spec`, `lib/api-zod`, and `lib/api-client-react`: the shared API contract, validation schemas, and generated client.

At the time of this scan, the public production API contract exposes only `GET /api/healthz`, and the frontend is primarily static content with client-side routing. The `artifacts/mockup-sandbox` package is a component preview environment and is treated as dev-only unless production reachability is demonstrated.

## Assets

- **Deployment and application integrity** — the correctness and availability of the marketing site and API process. Compromise would allow defacement, misleading visitors, or service disruption.
- **Application secrets** — `DATABASE_URL`, logging configuration, and any future deployment secrets supplied via environment variables. Exposure could allow database compromise or lateral movement.
- **Database contents** — even though the current schema is effectively empty, any future records in PostgreSQL would sit behind the API-to-database boundary and must be protected from unauthorized access and injection.
- **Operational metadata** — request logs and runtime errors. These must not leak cookies, bearer tokens, or other secrets.

## Trust Boundaries

- **Browser to frontend application** — all URL paths, browser state, and user interactions are untrusted. Client-side code must not treat route parameters or DOM state as trusted input.
- **Browser to API (`/api`)** — all HTTP requests crossing into Express are untrusted and must be validated server-side before being used.
- **API to PostgreSQL** — the API process holds database connectivity via `DATABASE_URL`; any injection or over-broad query at this layer would directly expose stored data.
- **Build/runtime environment to application** — deployment-provided environment variables such as `PORT`, `BASE_PATH`, and `DATABASE_URL` configure runtime behavior and must not be reflected into unsafe execution paths.
- **Dev-only preview boundary** — `artifacts/mockup-sandbox` is considered internal/development-only and is out of scope for production findings unless evidence shows it is deployed or otherwise reachable in production.

## Scan Anchors

- **Production entry points**: `artifacts/api-server/src/index.ts`, `artifacts/api-server/src/app.ts`, `artifacts/pilimpiku/src/main.tsx`
- **Highest-risk areas**: `artifacts/api-server/src/**`, `lib/db/src/**`, `lib/api-client-react/src/**`
- **Public surfaces**: `GET /api/healthz`, all routes in `artifacts/pilimpiku/src/App.tsx`
- **Authenticated/admin surfaces**: none currently implemented in production code
- **Dev-only areas to usually ignore**: `artifacts/mockup-sandbox/**`, unless production reachability is demonstrated

## Threat Categories

### Tampering

The main tampering risk is any future use of request data at the Express boundary or route parameters in the frontend without validation. All production API inputs MUST be validated server-side before use, and client-side route parameters MUST only influence presentation unless backed by trusted server data. All database interactions MUST use parameterized ORM/query mechanisms.

### Information Disclosure

The project must prevent leakage of secrets and sensitive operational data. Runtime logs MUST redact authorization headers and cookies, API responses MUST avoid exposing internals or stack traces, and secrets such as `DATABASE_URL` MUST remain server-side only. Any future database-backed responses MUST return only fields required by the client.

### Denial of Service

Because the API process and frontend are small, availability risks mainly come from configuration mistakes or adding resource-intensive endpoints later. Public API endpoints MUST bound request parsing and any future upload or expensive processing paths. Outbound dependencies, if introduced later, MUST use reasonable timeouts and failure handling.

### Elevation of Privilege

There is no current authentication or admin plane in production, so classic privilege escalation is limited today. The key guarantee is that future authenticated or admin endpoints MUST enforce authorization server-side and MUST NOT rely on client-only checks. Shared client helpers MUST NOT create an execution path where untrusted input controls code loading in a production deployment.
