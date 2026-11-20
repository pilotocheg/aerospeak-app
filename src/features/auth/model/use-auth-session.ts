import { useEffect } from 'react'

import { setProgressOwner } from '@/entities/progress'

import { observeAuthState } from '../api'

import { useAuthStore } from './auth-store'

/** Mirrors the Firebase auth state into the auth store for the app's lifetime. */
export const useAuthSession = () => {
  useEffect(
    () =>
      observeAuthState((user) => {
        const { setAuthenticatedUser, clearAuthenticatedUser } = useAuthStore.getState()
        if (user) {
          setProgressOwner(user.id)
          setAuthenticatedUser(user)
          return
        }
        clearAuthenticatedUser()
      }),
    [],
  )
}
