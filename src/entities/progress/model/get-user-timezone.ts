const FALLBACK_TIMEZONE = 'UTC'

/** Resolve the user's time zone from the browser environment. */
export const getUserTimezone = (): string => {
  if (typeof window === 'undefined' || typeof Intl === 'undefined') {
    return FALLBACK_TIMEZONE
  }
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone
  } catch {
    return FALLBACK_TIMEZONE
  }
}

export { FALLBACK_TIMEZONE }
