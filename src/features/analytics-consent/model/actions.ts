import { useConsentStore } from './consent-store'

export const useGrantAnalyticsConsent = () => useConsentStore((state) => state.grantConsent)

export const useDenyAnalyticsConsent = () => useConsentStore((state) => state.denyConsent)

export const useResetAnalyticsConsent = () => useConsentStore((state) => state.resetConsent)
