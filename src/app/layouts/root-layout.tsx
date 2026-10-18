import { Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

import { Toaster } from '@/shared/ui/sonner'

export const RootLayout = () => (
  <>
    <Outlet />
    <Toaster position="top-center" />
    {import.meta.env.DEV && <TanStackRouterDevtools position="bottom-left" />}
  </>
)
