import { Link } from '@tanstack/react-router'

import { Button } from '@/shared/ui/button'

import { useDenyAnalyticsConsent, useGrantAnalyticsConsent } from '../model/actions'
import { useIsConsentBannerShown } from '../model/use-is-consent-banner-shown'

export const AnalyticsConsentBanner = () => {
  const isShown = useIsConsentBannerShown()
  const grantConsent = useGrantAnalyticsConsent()
  const denyConsent = useDenyAnalyticsConsent()

  if (!isShown) return null

  return (
    <section
      aria-label="Analytics cookies"
      className="fixed inset-x-4 bottom-4 z-50 mx-auto flex max-w-2xl flex-col gap-3 rounded-xl bg-card p-4 text-sm shadow-lg ring-1 ring-foreground/10 sm:flex-row sm:items-center"
    >
      <p className="flex-1 text-muted-foreground">
        May we use Google Analytics cookies to count visits and see which pages help pilots most? Nothing is collected
        unless you allow it. Details in our{' '}
        <Link to="/privacy-policy" className="text-foreground underline">
          Privacy Policy
        </Link>
        .
      </p>
      <div className="flex shrink-0 gap-2">
        <Button variant="outline" onClick={denyConsent}>
          Decline
        </Button>
        <Button onClick={grantConsent}>Allow</Button>
      </div>
    </section>
  )
}
