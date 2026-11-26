import { Outlet, useMatch } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

import { AnalyticsConsentBanner } from '@/features/analytics-consent'
import { Toaster } from '@/shared/ui/sonner'

export const RootLayout = () => {
  // The banner would cover the recording controls; the visitor is asked on any other page.
  const practiceMatch = useMatch({ from: '/_app/practice/$scenarioId', shouldThrow: false })
  const isPracticeScreen = practiceMatch !== undefined

  return (
    <>
      <Outlet />
      {!isPracticeScreen && <AnalyticsConsentBanner />}
      <Toaster position="top-center" />
      {import.meta.env.DEV && <TanStackRouterDevtools position="bottom-left" />}
    </>
  )
}
