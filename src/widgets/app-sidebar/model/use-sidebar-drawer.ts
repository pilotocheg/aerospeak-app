import { useEffect, useRef } from 'react'

import { useFocusTrap, useMediaQuery } from '@/shared/lib/dom'

import { useCloseSidebar } from './actions'
import { useIsSidebarOpen } from './selectors'

/** Tailwind `lg`: from here on the sidebar is static, below it is an off-canvas drawer. */
const DESKTOP_QUERY = '(min-width: 64rem)'

/**
 * Drawer behaviour of the sidebar below `lg`: while open it is a modal dialog (focus trapped,
 * Escape closes it, focus returns to the toggle), while closed it is inert so its links are
 * not reachable off-canvas.
 */
export const useSidebarDrawer = () => {
  const isOpen = useIsSidebarOpen()
  const close = useCloseSidebar()
  const isDesktop = useMediaQuery(DESKTOP_QUERY)
  const drawerRef = useRef<HTMLElement>(null)
  const isModal = isOpen && !isDesktop
  const isHidden = !isOpen && !isDesktop

  useFocusTrap(drawerRef, isModal)

  useEffect(() => {
    if (!isModal) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close()
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isModal, close])

  return { drawerRef, isOpen, isModal, isHidden, close }
}
