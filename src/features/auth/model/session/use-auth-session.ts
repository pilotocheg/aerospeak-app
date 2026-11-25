import { useEffect } from 'react'

import { observeAuthState } from '../../api'
import { useSetUser } from '../actions'
import type { User } from '../types'

type UseAuthSessionOptions = {
  /** Called whenever Firebase reports no user: logout, expired or revoked session, sign-out in another tab. */
  onSignOut: () => void
}

/** Mirrors the Firebase auth state into the auth store for the app's lifetime. */
export const useAuthSession = ({ onSignOut }: UseAuthSessionOptions) => {
  const setUser = useSetUser()

  useEffect(() => {
    const handleAuthChange = (user: User | null) => {
      if (!user) {
        onSignOut()
      }
      setUser(user)
    }

    const unsubscribe = observeAuthState(handleAuthChange)
    return unsubscribe
  }, [setUser, onSignOut])
}
