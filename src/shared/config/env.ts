// In dev, requests go through the Vite proxy (vite.config.ts) to avoid CORS.
export const API_URL: string = import.meta.env.DEV
  ? '/api'
  : (import.meta.env.VITE_API_URL ?? 'https://aerospeak-be.onrender.com')

/** "local" reads content/ from this repo, "api" reads GET /packs and /scenarios/:id. */
export const CONTENT_SOURCE: 'local' | 'api' = import.meta.env.VITE_CONTENT_SOURCE === 'api' ? 'api' : 'local'
