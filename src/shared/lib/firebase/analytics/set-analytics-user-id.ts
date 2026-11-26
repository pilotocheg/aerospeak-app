import { setUserId } from 'firebase/analytics'

import { analyticsState } from './analytics-state'

/** Links analytics events to the signed-in account's uid; pass null on sign-out. */
export const setAnalyticsUserId = async (uid: string | null): Promise<void> => {
  analyticsState.userId = uid

  const analytics = await analyticsState.instance
  if (analytics) {
    setUserId(analytics, uid)
  }
}
