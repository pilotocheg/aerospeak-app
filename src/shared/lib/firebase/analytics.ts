import { app } from './firebase'
import { getAnalytics, isSupported, logEvent, setUserId, type Analytics } from 'firebase/analytics'

let analyticsInstance: Analytics | null = null
let initPromise: Promise<Analytics | null> | null = null

/** Analytics is active only in production, in a browser, and when a Measurement ID is configured. */
export const isAnalyticsEnabled = (): boolean => {
  if (!import.meta.env.PROD) return false
  if (typeof window === 'undefined') return false
  if (!import.meta.env.VITE_FIREBASE_MEASUREMENT_ID) return false
  return true
}

/** Returns the Firebase Analytics instance, lazily initialised once. Resolves to null when analytics is disabled or unsupported. */
const getAnalyticsInstance = async (): Promise<Analytics | null> => {
  if (!isAnalyticsEnabled()) return null
  if (analyticsInstance !== null) return analyticsInstance
  if (initPromise) return initPromise

  initPromise = (async () => {
    try {
      const supported = await isSupported()
      if (!supported) return null
      analyticsInstance = getAnalytics(app)
      return analyticsInstance
    } catch {
      // AdBlock or other tracker blockers may prevent Firebase Analytics from loading.
      // Fail silently so the app keeps working without analytics.
      return null
    }
  })()

  return initPromise
}

/** Send a page_view event for the given path. No-op outside production. */
export const logPageView = (path: string): void => {
  void getAnalyticsInstance().then((instance) => {
    if (instance) {
      logEvent(instance, 'page_view', { page_path: path })
    }
  })
}

/** Set the Firebase uid in analytics. Pass null to clear (on sign-out). No-op outside production. */
export const setAnalyticsUserId = (uid: string | null): void => {
  void getAnalyticsInstance().then((instance) => {
    if (instance) {
      setUserId(instance, uid)
    }
  })
}

/*
 * TODO (future): user properties via setUserProperties
 * Uncomment and wire up when needed:
 *
 * import { setUserProperties } from 'firebase/analytics'
 *
 * export const setAnalyticsUserProperties = (properties: Record<string, string | number>): void => {
 *   void getAnalyticsInstance().then((instance) => {
 *     if (instance) {
 *       setUserProperties(instance, properties)
 *     }
 *   })
 * }
 *
 * Example: setAnalyticsUserProperties({ subscription_tier: 'free', role: 'student' })
 */

/*
 * TODO (future): traffic source / referrer / UTM capture
 * Uncomment and wire up when needed:
 *
 * export const captureTrafficSource = (): void => {
 *   void getAnalyticsInstance().then((instance) => {
 *     if (instance) {
 *       const url = new URL(window.location.href)
 *       const utmSource = url.searchParams.get('utm_source')
 *       const utmMedium = url.searchParams.get('utm_medium')
 *       const utmCampaign = url.searchParams.get('utm_campaign')
 *       const referrer = document.referrer || undefined
 *
 *       logEvent(instance, 'session_start', {
 *         traffic_source: utmSource ?? referrer ?? 'direct',
 *         utm_medium: utmMedium ?? undefined,
 *         utm_campaign: utmCampaign ?? undefined,
 *         referrer,
 *       })
 *     }
 *   })
 * }
 *
 * Call on app startup: captureTrafficSource()
 */
