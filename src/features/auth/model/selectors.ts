import { useAuthStore } from './auth-store'

export const useUser = () => useAuthStore((state) => state.user)

export const useIsAuthenticated = () => useAuthStore((state) => state.isAuthenticated)

export const useIsAuthLoading = () => useAuthStore((state) => state.isLoading)
