import { isAnalyticsConfigured } from '@/shared/lib/firebase'

import { useAnalyticsConsent } from './selectors'

/** The banner asks only where analytics can actually run, and only until the visitor answers. */
export const useIsConsentBannerShown = (): boolean => {
  const consent = useAnalyticsConsent()
  const isUnanswered = consent === null
  return isUnanswered && isAnalyticsConfigured()
}
