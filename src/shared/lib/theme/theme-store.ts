import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type Theme = 'light' | 'dark'

type ThemeState = {
  theme: Theme
  setTheme: (theme: Theme) => void
  toggleTheme: () => void
}

const getSystemTheme = (): Theme => {
  if (typeof window === 'undefined') return 'dark'
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

const getInitialTheme = (): Theme => {
  if (typeof window === 'undefined') return 'dark'
  try {
    const raw = window.localStorage.getItem('aerospeak.theme')
    if (raw) {
      const parsed = JSON.parse(raw) as { state?: { theme?: unknown } }
      const stored = parsed?.state?.theme
      if (stored === 'light' || stored === 'dark') return stored
    }
  } catch {
    // ignore storage errors
  }
  return getSystemTheme()
}

// Theme must survive reloads, so this store is persisted.
export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: getInitialTheme(),
      setTheme: (theme) => set({ theme }),
      toggleTheme: () =>
        set((state: ThemeState) => ({ theme: state.theme === 'dark' ? 'light' : 'dark' })),
    }),
    { name: 'aerospeak.theme' },
  ),
)