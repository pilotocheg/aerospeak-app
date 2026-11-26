import { vi } from 'vitest'

// Unit tests never talk to Firebase. A slice index can pull in the API client, which
// initializes Firebase on import and fails without an API key (as in CI): stub it here.
vi.mock('@/shared/lib/firebase', () => ({
  app: {},
  auth: {},
  isAnalyticsConfigured: () => false,
  setAnalyticsUserId: vi.fn(async () => {}),
  startAnalytics: vi.fn(async () => {}),
  stopAnalytics: vi.fn(async () => {}),
}))
