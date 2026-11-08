import type { ReactNode } from 'react'
import { useEffect } from 'react'

import { useTheme } from '@/shared/lib/theme'

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const theme = useTheme()

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])

  return <>{children}</>
}