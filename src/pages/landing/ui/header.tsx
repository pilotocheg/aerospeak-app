import { Link } from '@tanstack/react-router'

import { Button } from '@/shared/ui/button'
import { Logo } from '@/shared/ui/logo'

export const Header = () => (
  <header className="sticky top-0 z-40 border-b border-foreground/10 bg-background/80 backdrop-blur-md">
    <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
      <Link to="/" className="flex items-center gap-2.5 rounded-md font-semibold">
        <Logo className="size-9" />
        <span className="hidden sm:inline">AeroSpeak</span>
      </Link>
      <Button render={<Link to="/lessons" />}>Start practice</Button>
    </div>
  </header>
)
