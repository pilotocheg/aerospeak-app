import { Bell, BookOpenText, LogOut, Search, UserCircle2 } from 'lucide-react'
import { useNavigate } from '@tanstack/react-router'
import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'
import { useAuthStore } from '@/features/auth/model/auth-store'

export function DashboardHeader() {
  const navigate = useNavigate()
  const user = useAuthStore((state) => state.user)
  const logout = useAuthStore((state) => state.logout)

  const handleLogout = () => {
    logout()
    navigate({ to: '/login', replace: true })
  }

  return (
    <header className="sticky top-0 z-20 border-b bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 md:px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted text-foreground">
            <BookOpenText className="h-5 w-5" />
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">AeroSpeak</p>
            <h2 className="text-base font-semibold">Learning hub</h2>
          </div>
        </div>

        <div className="hidden flex-1 max-w-xl items-center gap-3 md:flex">
          <div className="relative w-full">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search courses, mentors, lessons" className="pl-9" />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" aria-label="Notifications">
            <Bell className="h-4 w-4" />
          </Button>

          <div className="hidden items-center gap-2 rounded-full border bg-muted px-3 py-2 text-sm sm:flex">
            <UserCircle2 className="h-4 w-4" />
            <span>{user?.name ?? 'Student'}</span>
          </div>

          <Button variant="secondary" onClick={handleLogout} className="gap-2">
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>
    </header>
  )
}
