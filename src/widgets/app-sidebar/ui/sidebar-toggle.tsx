import { Menu } from 'lucide-react'

import { Button } from '@/shared/ui/button'

import { useOpenSidebar } from '../model/actions'

/** Opens the navigation drawer on small screens; hidden on desktop. */
export const SidebarToggle = () => {
  const open = useOpenSidebar()

  return (
    <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open menu" onClick={open}>
      <Menu />
    </Button>
  )
}
