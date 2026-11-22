import { useSyncExternalStore } from 'react'

/** Whether the CSS media query matches; updates when it starts or stops matching. */
export const useMediaQuery = (query: string) => {
  const subscribe = (onChange: () => void) => {
    const mediaQueryList = window.matchMedia(query)
    mediaQueryList.addEventListener('change', onChange)
    return () => mediaQueryList.removeEventListener('change', onChange)
  }
  const getSnapshot = () => window.matchMedia(query).matches

  const matches = useSyncExternalStore(subscribe, getSnapshot)
  return matches
}
