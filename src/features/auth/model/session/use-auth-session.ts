import { useEffect } from 'react'

import { observeAuthState } from '../../api'
import { useSetUser } from '../actions'

/** Mirrors the Firebase auth state into the auth store for the app's lifetime. */
export const useAuthSession = () => {
  const setUser = useSetUser()

  useEffect(() => {
    const unsubscribe = observeAuthState(setUser)
    return unsubscribe
  }, [setUser])
}
