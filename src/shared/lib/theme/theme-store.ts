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

// Theme must survive reloads, so this store is persisted.
export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      // persist hydrates a stored choice synchronously; the system theme is the default.
      theme: getSystemTheme(),
      setTheme: (theme) => set({ theme }),
      toggleTheme: () => set((state: ThemeState) => ({ theme: state.theme === 'dark' ? 'light' : 'dark' })),
    }),
    { name: 'aerospeak.theme' },
  ),
)
