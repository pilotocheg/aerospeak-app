const LEGACY_PROGRESS_KEY = 'aerospeak.progress'

/** Progress used to live in this browser's storage; it now comes from the account (`GET /me/progress`). */
export const clearLegacyProgress = () => {
  try {
    window.localStorage.removeItem(LEGACY_PROGRESS_KEY)
  } catch {
    // Storage can be blocked (private mode, disabled cookies): nothing to clear then.
  }
}
