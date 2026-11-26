import type { Analytics } from 'firebase/analytics'

type AnalyticsState = {
  /** Resolves to the instance once analytics has started, or to null when it cannot run here. */
  instance: Promise<Analytics | null> | null
  /** The signed-in account's uid, kept so analytics started later still gets it. */
  userId: string | null
}

/** Module state shared by the analytics helpers: one Firebase Analytics instance per page load. */
export const analyticsState: AnalyticsState = {
  instance: null,
  userId: null,
}
