// In dev, requests go through the Vite proxy (vite.config.ts) to avoid CORS.
export const API_URL: string = import.meta.env.DEV
  ? '/api'
  : (import.meta.env.VITE_API_URL ?? 'https://aerospeak-be.onrender.com')
