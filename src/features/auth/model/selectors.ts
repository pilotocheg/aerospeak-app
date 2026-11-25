import { useAuthStore } from './auth-store'

export const useUser = () => useAuthStore((state) => state.user)

/** Firebase uid of the signed-in user, '' until the auth state arrives (keys the account's queries). */
export const useUserId = () => useAuthStore((state) => state.user?.id ?? '')

export const useIsAuthenticated = () => useAuthStore((state) => state.isAuthenticated)

export const useIsAuthLoading = () => useAuthStore((state) => state.isLoading)
