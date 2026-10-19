import { useEffect } from 'react'

const isTypingTarget = (target: EventTarget | null) =>
  target instanceof HTMLElement &&
  (target.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName))

/** Space bar toggles recording: press to start, press again to stop. */
export const useRecordToggleKey = (enabled: boolean, onToggle: () => void) => {
  useEffect(() => {
    if (!enabled) {
      return
    }

    const handleDown = (event: KeyboardEvent) => {
      if (event.code !== 'Space' || event.repeat || isTypingTarget(event.target)) {
        return
      }
      event.preventDefault()
      onToggle()
    }

    window.addEventListener('keydown', handleDown)
    return () => window.removeEventListener('keydown', handleDown)
  }, [enabled, onToggle])
}
