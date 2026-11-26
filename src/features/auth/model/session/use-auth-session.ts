import { useEffect } from 'react'

import { setAnalyticsUserId } from '@/shared/lib/firebase'

import { observeAuthState } from '../../api'
import { useSetUser } from '../actions'
import type { User } from '../types'

type UseAuthSessionOptions = {
  /** Called whenever Firebase reports no user: logout, expired or revoked session, sign-out in another tab. */
  onSignOut: () => void
}

/** Mirrors the Firebase auth state into the auth store (and the analytics user id) for the app's lifetime. */
export const useAuthSession = ({ onSignOut }: UseAuthSessionOptions) => {
  const setUser = useSetUser()

  useEffect(() => {
    const handleAuthChange = (user: User | null) => {
      if (!user) {
        onSignOut()
      }
      const analyticsUserId = user?.id ?? null
      void setAnalyticsUserId(analyticsUserId)
      setUser(user)
    }

    const unsubscribe = observeAuthState(handleAuthChange)
    return unsubscribe
  }, [setUser, onSignOut])
}
