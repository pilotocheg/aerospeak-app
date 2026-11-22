import { Link } from '@tanstack/react-router'
import { cn } from 'cn'
import { House, LogOut, Moon, Sun } from 'lucide-react'

import { useLogoutToLogin, useUser } from '@/features/auth'
import { sections } from '@/shared/content'
import { useTheme, useToggleTheme } from '@/shared/lib/theme'
import { Button } from '@/shared/ui/button'
import { Logo } from '@/shared/ui/logo'
import { SectionTitle } from '@/shared/ui/section-title'

import { useSidebarDrawer } from '../model/use-sidebar-drawer'
import { SidebarSectionLink } from './sidebar-section-link'

export const AppSidebar = () => {
  const { drawerRef, isOpen, isModal, isHidden, close } = useSidebarDrawer()
  const user = useUser()
  const logoutToLogin = useLogoutToLogin()
  const theme = useTheme()
  const toggleTheme = useToggleTheme()
  const userName = user?.name ?? 'Pilot'
  const userInitial = userName.at(0) ?? 'P'

  const handleLogout = () => {
    close()
    void logoutToLogin()
  }

  return (
    <>
      {isOpen && <div className="fixed inset-0 z-40 bg-black/60 lg:hidden" onClick={close} aria-hidden />}
      <aside
        ref={drawerRef}
        inert={isHidden}
        role={isModal ? 'dialog' : undefined}
        aria-modal={isModal || undefined}
        aria-label={isModal ? 'Navigation' : undefined}
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
          <SectionTitle as="p" className="px-3 pt-5 pb-1">
            Training plan
          </SectionTitle>
          {sections.map((section) => (
            <SidebarSectionLink key={section.id} section={section} onNavigate={close} />
          ))}
        </nav>

        <div className="flex items-center gap-2 border-t p-3">
          <Link
            to="/profile"
            onClick={close}
            aria-label="Open profile"
            className="-m-1 flex min-w-0 flex-1 items-center gap-2 rounded-md p-1 transition hover:bg-muted/60"
          >
            <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground uppercase">
              {userInitial}
            </span>
            <span className="flex-1 truncate text-sm">{userName}</span>
          </Link>
          <Button variant="ghost" size="icon-sm" aria-label="Toggle color theme" onClick={toggleTheme}>
            {theme === 'dark' ? <Sun /> : <Moon />}
          </Button>
          <Button variant="ghost" size="icon-sm" aria-label="Logout" onClick={handleLogout}>
            <LogOut />
          </Button>
        </div>
      </aside>
    </>
  )
}
