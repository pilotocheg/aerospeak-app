import { Link, useNavigate } from '@tanstack/react-router'
import { cn } from 'cn'
import { House, LogOut } from 'lucide-react'
import { toast } from 'sonner'

import { useLogout } from '@/features/auth/model/actions'
import { useUser } from '@/features/auth/model/selectors'
import { sections } from '@/shared/content'
import { Button } from '@/shared/ui/button'
import { Logo } from '@/shared/ui/logo'

import { useCloseSidebar } from '../model/actions'
import { useIsSidebarOpen } from '../model/selectors'
import { SidebarSectionLink } from './sidebar-section-link'

export const AppSidebar = () => {
  const navigate = useNavigate()
  const isOpen = useIsSidebarOpen()
  const close = useCloseSidebar()
  const user = useUser()
  const logout = useLogout()

  const handleLogout = async () => {
    close()
    try {
      await logout()
      await navigate({ to: '/login', replace: true })
    } catch {
      toast.error('Failed to log out. Please try again.')
    }
  }

  return (
    <>
      {isOpen && <div className="fixed inset-0 z-40 bg-black/60 lg:hidden" onClick={close} aria-hidden />}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 flex w-64 shrink-0 flex-col border-r bg-card transition-transform lg:static lg:translate-x-0',
          isOpen ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        <Link to="/" className="flex items-center gap-3 px-5 py-5" onClick={close}>
          <Logo className="size-9" />
          <span className="text-xl font-bold tracking-tight">AeroSpeak</span>
        </Link>

        <nav className="flex-1 space-y-1 overflow-y-auto px-3" aria-label="Main">
          <Link
            to="/lessons"
            onClick={close}
            activeOptions={{ exact: true }}
            className="flex items-center gap-3 rounded-md px-3 py-2 text-sm transition hover:bg-muted/60"
            activeProps={{ className: 'bg-primary text-primary-foreground hover:bg-primary' }}
          >
            <House className="size-4" />
            Home
          </Link>
          <p className="px-3 pt-5 pb-1 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
            Training plan
          </p>
          {sections.map((section) => (
            <SidebarSectionLink key={section.id} section={section} onNavigate={close} />
          ))}
        </nav>

        <div className="flex items-center gap-2 border-t p-3">
          <span className="flex size-8 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground uppercase">
            {user?.name.at(0) ?? 'P'}
          </span>
          <span className="flex-1 truncate text-sm">{user?.name ?? 'Pilot'}</span>
          <Button variant="ghost" size="icon-sm" aria-label="Logout" onClick={handleLogout}>
            <LogOut />
          </Button>
        </div>
      </aside>
    </>
  )
}
