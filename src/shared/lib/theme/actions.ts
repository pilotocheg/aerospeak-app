import { useThemeStore } from './theme-store'

export const useSetTheme = () => useThemeStore((state) => state.setTheme)

export const useToggleTheme = () => useThemeStore((state) => state.toggleTheme)