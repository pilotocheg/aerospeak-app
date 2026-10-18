import { useNavigate } from '@tanstack/react-router'
import { LogOut, UserCircle2 } from 'lucide-react'

import { useLogout } from '@/features/auth/model/actions'
import { useUser } from '@/features/auth/model/selectors'
import { Button } from '@/shared/ui/button'
import { Logo } from '@/shared/ui/logo'

export const AppHeader = () => {
  const navigate = useNavigate()
  const user = useUser()
  const logout = useLogout()

  const handleLogout = () => {
    logout()
    navigate({ to: '/login', replace: true })
  }

  return (
    <header className="flex h-14 shrink-0 items-center justify-between gap-4 border-b bg-card px-4">
      <div className="flex items-center gap-2">
        <Logo className="size-8" />
        <span className="font-semibold tracking-tight">AeroSpeak</span>
        <span className="hidden text-xs tracking-[0.2em] text-muted-foreground uppercase sm:inline">Trainer</span>
      </div>

      <div className="flex items-center gap-2">
        <div className="hidden items-center gap-2 text-sm text-muted-foreground sm:flex">
          <UserCircle2 className="size-4" />
          <span>{user?.name ?? 'Pilot'}</span>
        </div>
        <Button variant="ghost" size="sm" onClick={handleLogout}>
          <LogOut />
          Logout
        </Button>
      </div>
    </header>
  )
}
