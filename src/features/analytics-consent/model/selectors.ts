import { useConsentStore } from './consent-store'

export const useAnalyticsConsent = () => useConsentStore((state) => state.consent)
