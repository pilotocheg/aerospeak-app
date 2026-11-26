import { useEffect } from 'react'

import { startAnalytics, stopAnalytics } from '@/shared/lib/firebase'

import { useAnalyticsConsent } from './selectors'

/** Starts analytics once the visitor allowed it and stops it when they withdraw consent. */
export const useAnalyticsConsentSync = () => {
  const consent = useAnalyticsConsent()

  useEffect(() => {
    if (consent === 'granted') {
      void startAnalytics()
    }
    if (consent === 'denied') {
      void stopAnalytics()
    }
  }, [consent])
}
