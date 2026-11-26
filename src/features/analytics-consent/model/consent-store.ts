import { create } from 'zustand'
import { persist } from 'zustand/middleware'

/** `null` until the visitor answers the banner. */
export type AnalyticsConsent = 'granted' | 'denied' | null

type ConsentState = {
  consent: AnalyticsConsent
  grantConsent: () => void
  denyConsent: () => void
  resetConsent: () => void
}

// The visitor's answer must survive reloads (and is asked before sign-in), so this store is persisted.
export const useConsentStore = create<ConsentState>()(
  persist(
    (set) => ({
      consent: null,
      grantConsent: () => set({ consent: 'granted' }),
      denyConsent: () => set({ consent: 'denied' }),
      resetConsent: () => set({ consent: null }),
    }),
    { name: 'aerospeak.analytics-consent' },
  ),
)
