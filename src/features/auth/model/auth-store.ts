import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

import type { User } from './types'

type AuthState = {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  setLoading: (value: boolean) => void
  setAuthenticatedUser: (user: User) => void
  clearAuthenticatedUser: () => void
}

export const useAuthStore = create<AuthState>()(
  devtools(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: true,
      setLoading: (value) => set({ isLoading: value }, false, 'auth/set-loading'),
      setAuthenticatedUser: (user) =>
        set(
          {
            user,
            isAuthenticated: true,
            isLoading: false,
          },
          false,
          'auth/set-user',
        ),
      clearAuthenticatedUser: () =>
        set(
          {
            user: null,
            isAuthenticated: false,
            isLoading: false,
          },
          false,
          'auth/clear-user',
        ),
    }),
    { name: 'AuthStore' },
  ),
)
