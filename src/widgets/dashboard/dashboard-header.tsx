import { Bell, BookOpenText, LogOut, Search, UserCircle2 } from 'lucide-react'
import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'
import { useAuthStore } from '@/features/auth/model/auth-store'

export function DashboardHeader() {
  const user = useAuthStore((state) => state.user)
  const logout = useAuthStore((state) => state.logout)

  return (
    <header className="sticky top-0 z-20 border-b border-slate-800 bg-slate-950/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/15 text-indigo-300">
            <BookOpenText className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Aerospeak</p>
            <h2 className="text-lg font-semibold text-white">Learning hub</h2>
          </div>
        </div>

        <div className="hidden flex-1 max-w-xl items-center gap-3 md:flex">
          <div className="relative w-full">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
            <Input
              placeholder="Search courses, mentors, lessons"
              className="border-slate-700 bg-slate-900 pl-9 text-slate-100 placeholder:text-slate-400"
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="text-slate-300 hover:bg-slate-800 hover:text-white">
            <Bell className="h-4 w-4" />
          </Button>
          <div className="hidden items-center gap-2 rounded-full border border-slate-700 bg-slate-900 px-3 py-2 sm:flex">
            <UserCircle2 className="h-4 w-4 text-indigo-300" />
            <span className="text-sm text-slate-200">{user?.name ?? 'Student'}</span>
          </div>
          <Button variant="secondary" className="gap-2 border-slate-700 bg-slate-900 text-slate-200 hover:bg-slate-800" onClick={logout}>
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>
    </header>
  )
}
