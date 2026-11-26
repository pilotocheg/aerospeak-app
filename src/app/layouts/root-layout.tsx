import { Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

import { AnalyticsConsentBanner } from '@/features/analytics-consent'
import { Toaster } from '@/shared/ui/sonner'

export const RootLayout = () => (
  <>
    <Outlet />
    <AnalyticsConsentBanner />
    <Toaster position="top-center" />
    {import.meta.env.DEV && <TanStackRouterDevtools position="bottom-left" />}
  </>
)
