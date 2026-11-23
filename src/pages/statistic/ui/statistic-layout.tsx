import type { ReactNode } from 'react'

import { SidebarToggle } from '@/widgets/app-sidebar'

type StatisticLayoutProps = {
  children: ReactNode
}

/** Scroll area of the statistics page: the menu button on small screens, then the padded content. */
export const StatisticLayout = ({ children }: StatisticLayoutProps) => (
  <div className="min-h-0 flex-1 overflow-y-auto">
    <div className="flex items-center gap-2 px-2 pt-2 lg:hidden">
      <SidebarToggle />
    </div>
    <div className="mx-auto max-w-6xl space-y-8 px-4 py-6 sm:px-6 lg:px-8">{children}</div>
  </div>
)
