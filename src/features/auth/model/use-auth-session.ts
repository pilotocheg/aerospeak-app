import { useEffect } from 'react'

import { setProgressOwner } from '@/entities/progress'

import { observeAuthState } from '../api'

import { useSetUser } from './actions'

/** Mirrors the Firebase auth state into the auth store for the app's lifetime. */
export const useAuthSession = () => {
  const setUser = useSetUser()

  useEffect(
    () =>
      observeAuthState((user) => {
        if (user) {
          setProgressOwner(user.id)
        }
        setUser(user)
      }),
    [setUser],
  )
}
