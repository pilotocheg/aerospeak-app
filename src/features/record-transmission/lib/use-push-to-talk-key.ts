import { useEffect } from 'react'

const isTypingTarget = (target: EventTarget | null) =>
  target instanceof HTMLElement &&
  (target.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName))

/** Space bar as a push-to-talk key: hold to record, release to stop. */
export const usePushToTalkKey = (enabled: boolean, onPress: () => void, onRelease: () => void) => {
  useEffect(() => {
    if (!enabled) {
      return
    }

    const handleDown = (event: KeyboardEvent) => {
      if (event.code !== 'Space' || event.repeat || isTypingTarget(event.target)) {
        return
      }
      event.preventDefault()
      onPress()
    }
    const handleUp = (event: KeyboardEvent) => {
      if (event.code !== 'Space' || isTypingTarget(event.target)) {
        return
      }
      event.preventDefault()
      onRelease()
    }

    window.addEventListener('keydown', handleDown)
    window.addEventListener('keyup', handleUp)
    return () => {
      window.removeEventListener('keydown', handleDown)
      window.removeEventListener('keyup', handleUp)
    }
  }, [enabled, onPress, onRelease])
}
