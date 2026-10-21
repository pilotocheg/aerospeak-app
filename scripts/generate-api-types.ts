/**
 * Regenerates src/shared/api/schema.d.ts from the backend OpenAPI schema
 * (VITE_API_URL from the environment or .env, production by default).
 * A script instead of an npm one-liner so it also works in Windows shells.
 * Usage: npm run api:types
 */
import { execSync } from 'node:child_process'

import { API_URL, ROOT } from './fetch-content.ts'

execSync(`npx -y openapi-typescript@7 ${API_URL}/api-json -o src/shared/api/schema.d.ts`, {
  cwd: ROOT,
  stdio: 'inherit',
})
