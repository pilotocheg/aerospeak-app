/**
 * Paths and the backend URL shared by the scripts. Scenario content lives in the backend repo;
 * scripts read it through the API: VITE_API_URL from the environment or .env, production by
 * default. To try content that is not deployed yet, run the backend locally and set
 * VITE_API_URL=http://localhost:3000.
 */
import { join } from 'node:path'

export const ROOT = join(import.meta.dirname, '..')
export const PUBLIC_DIR = join(ROOT, 'public')

try {
  // Values already in the environment win over .env.
  process.loadEnvFile(join(ROOT, '.env'))
} catch {
  // No .env: use the environment or the default.
}

export const API_URL = (process.env.VITE_API_URL ?? 'https://aerospeak-be.onrender.com').replace(/\/$/, '')
