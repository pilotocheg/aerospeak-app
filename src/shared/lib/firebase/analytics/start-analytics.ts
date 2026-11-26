import { initializeAnalytics, isSupported, setAnalyticsCollectionEnabled, setUserId } from 'firebase/analytics'
import type { Analytics } from 'firebase/analytics'

import { app } from '../firebase'
import { analyticsState } from './analytics-state'
import { isAnalyticsConfigured } from './is-analytics-configured'

const createAnalytics = async (): Promise<Analytics | null> => {
  try {
    const isAnalyticsSupported = await isSupported()
    if (!isAnalyticsSupported) return null

    // Page views are sent by Google Analytics itself: one on start, then one per history change
    // (enhanced measurement), so the app logs no page_view of its own.
    return initializeAnalytics(app)
  } catch {
    // Tracker blockers can stop the SDK from loading; the app keeps working without analytics.
    return null
  }
}

/**
 * Starts Firebase Analytics after the visitor allowed it. Safe to call again: the instance is
 * created once, and a later call turns collection back on after `stopAnalytics`.
 */
export const startAnalytics = async (): Promise<void> => {
  if (!isAnalyticsConfigured()) return

  analyticsState.instance ??= createAnalytics()
  const analytics = await analyticsState.instance
  if (!analytics) return

  setAnalyticsCollectionEnabled(analytics, true)
  setUserId(analytics, analyticsState.userId)
}
