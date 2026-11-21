/**
 * Regenerates src/shared/api/schema.d.ts from the backend OpenAPI schema
 * (VITE_API_URL from the environment or .env, production by default).
 * A script instead of an npm one-liner so it also works in Windows shells.
 * Usage: npm run api:types
 */
import { execSync } from 'node:child_process'
import { readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

import { API_URL, ROOT } from './config'

const SCHEMA_PATH = join(ROOT, 'src/shared/api/schema.d.ts')

/**
 * openapi-typescript types `format: binary` fields (uploaded files) as `string`; the browser sends a
 * Blob. Its `transform` option would do this, but its Node API needs TypeScript 5 and the project
 * is on 6, so the CLI output is patched instead.
 */
const BINARY_FIELD = /(\*\s+Format: binary[\s\S]*?\*\/\s*\n\s*[\w"]+\??): string;/g

execSync(`npx -y openapi-typescript@7 ${API_URL}/api-json -o src/shared/api/schema.d.ts`, {
  cwd: ROOT,
  stdio: 'inherit',
})

const schema = readFileSync(SCHEMA_PATH, 'utf8')
const schemaWithBlobs = schema.replace(BINARY_FIELD, '$1: Blob;')
writeFileSync(SCHEMA_PATH, schemaWithBlobs)
