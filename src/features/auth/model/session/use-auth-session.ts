import { useEffect } from 'react'

import { setProgressOwner } from '@/entities/progress'

import { observeAuthState } from '../../api'
import { useSetUser } from '../actions'
import type { User } from '../types'

/** Mirrors the Firebase auth state into the auth store for the app's lifetime. */
export const useAuthSession = () => {
  const setUser = useSetUser()

  useEffect(() => {
    const handleAuthChange = (user: User | null) => {
      if (user) {
        setProgressOwner(user.id)
      }
      setUser(user)
    }

    const unsubscribe = observeAuthState(handleAuthChange)
    return unsubscribe
  }, [setUser])
}
