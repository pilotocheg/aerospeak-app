import { Link } from '@tanstack/react-router'

import { Button } from '@/shared/ui/button'
import { Logo } from '@/shared/ui/logo'

export const Header = () => (
  <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
    <Link to="/" className="flex items-center gap-2.5 rounded-md font-semibold">
      <Logo className="size-9" />
      <span className="hidden sm:inline">AeroSpeak</span>
    </Link>
    <nav aria-label="Account" className="flex items-center gap-2">
      <Button variant="ghost" render={<Link to="/login" />}>
        Log in
      </Button>
      <Button render={<Link to="/register" />}>Sign up</Button>
    </nav>
  </header>
)
