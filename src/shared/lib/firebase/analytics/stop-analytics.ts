import { setAnalyticsCollectionEnabled } from 'firebase/analytics'

import { deleteCookies, findCookieNames } from '@/shared/lib/cookies'

import { analyticsState } from './analytics-state'

const GOOGLE_ANALYTICS_COOKIE_PREFIX = '_ga'

/** Stops collection after the visitor withdrew consent and removes the Google Analytics cookies. */
export const stopAnalytics = async (): Promise<void> => {
  const analytics = await analyticsState.instance
  if (analytics) {
    setAnalyticsCollectionEnabled(analytics, false)
  }

  const analyticsCookieNames = findCookieNames(document.cookie, GOOGLE_ANALYTICS_COOKIE_PREFIX)
  deleteCookies(analyticsCookieNames, window.location.hostname)
}
