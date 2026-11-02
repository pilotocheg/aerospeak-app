// Keyed by Firebase uid so a cached profile never leaks to another account in this browser.
export const meKeys = {
  all: ['me'] as const,
  profile: (uid: string) => [...meKeys.all, uid] as const,
}
