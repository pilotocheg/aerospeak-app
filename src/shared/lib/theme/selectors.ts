import { useThemeStore } from './theme-store'

export const useTheme = () => useThemeStore((state) => state.theme)