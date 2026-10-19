import { Outlet } from '@tanstack/react-router'

import { AppSidebar } from '@/widgets/app-sidebar'

/** Authenticated area: sidebar navigation + page. */
export const AppLayout = () => (
  <div className="flex h-dvh overflow-hidden">
    <AppSidebar />
    <main className="flex min-w-0 flex-1 flex-col">
      <Outlet />
    </main>
  </div>
)
