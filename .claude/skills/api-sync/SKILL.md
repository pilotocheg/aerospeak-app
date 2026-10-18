---
name: api-sync
description: Regenerate frontend API types from the AeroSpeak backend OpenAPI schema and fix the code that uses them. Use when the backend contract changed, a DTO is missing, or an API call fails on types.
---

# Syncing the API contract

1. Wake the backend (Render free plan sleeps): `curl -s https://aerospeak-be.onrender.com/health`
   (up to ~60 s on a cold start).
2. Run `npm run api:types`. It writes `src/shared/api/schema.d.ts` from `/api-json`.
   Never edit that file by hand.
3. Run `npm run build`. Fix every type error in `src/entities/*/api` and the components
   that use the changed DTOs. Type aliases for DTOs live in `src/shared/api/types.ts`.
4. If an endpoint was added, add a query/mutation in the matching entity with a key from
   that entity's key factory.
5. Mention the backend commit or date of the schema in the commit message.
