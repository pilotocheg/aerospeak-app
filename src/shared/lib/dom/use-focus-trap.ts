import { type RefObject, useEffect } from 'react'

import { getFocusableElements } from './get-focusable-elements'

/**
 * While active, moves focus into the container, keeps Tab and Shift+Tab inside it and, when it
 * stops, returns focus to the element that had it before (the button that opened the container).
 */
export const useFocusTrap = (containerRef: RefObject<HTMLElement | null>, isActive: boolean) => {
  useEffect(() => {
    const container = containerRef.current
    if (!isActive || !container) return

    const { activeElement: previouslyFocused } = document
    const [firstFocusable] = getFocusableElements(container)
    firstFocusable?.focus()

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return

      const focusable = getFocusableElements(container)
      const first = focusable.at(0)
      const last = focusable.at(-1)
      if (!first || !last) {
        event.preventDefault()
        return
      }

      const { activeElement } = document
      const isFocusInside = container.contains(activeElement)
      const isLeavingStart = event.shiftKey && (activeElement === first || !isFocusInside)
      const isLeavingEnd = !event.shiftKey && (activeElement === last || !isFocusInside)

      if (isLeavingStart) {
        event.preventDefault()
        last.focus()
      } else if (isLeavingEnd) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      if (previouslyFocused instanceof HTMLElement && previouslyFocused.isConnected) previouslyFocused.focus()
    }
  }, [containerRef, isActive])
}
