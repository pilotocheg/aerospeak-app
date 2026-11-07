import { useEffect } from 'react'
import { toast } from 'sonner'

import { signInWithGoogleIdToken } from '@/entities/user'

import { loadGoogleIdentity, type GoogleCredentialResponse } from '../lib/load-google-identity'

import { useIsAuthenticated, useIsAuthLoading } from './selectors'

const { VITE_GOOGLE_ONE_TAP_CLIENT_ID } = import.meta.env

const handleCredentialResponse = async ({ credential }: GoogleCredentialResponse) => {
  if (!credential) return

  try {
    await signInWithGoogleIdToken(credential)
    toast.success('Successfully signed in with Google')
  } catch (error) {
    console.error('Failed to sign in with Google', error)
    toast.error('Failed to sign in with Google')
  }
}

/** Shows the Google One Tap prompt while the component is mounted and the user is signed out. */
export const useGoogleOneTap = () => {
  const isAuthenticated = useIsAuthenticated()
  const isAuthLoading = useIsAuthLoading()

  useEffect(() => {
    if (isAuthenticated || isAuthLoading) return

    if (!VITE_GOOGLE_ONE_TAP_CLIENT_ID) {
      console.warn('Google One Tap is disabled: VITE_GOOGLE_ONE_TAP_CLIENT_ID is not set')
      return
    }

    let isCancelled = false

    loadGoogleIdentity()
      .then((google) => {
        if (isCancelled) return

        google.accounts.id.initialize({
          client_id: VITE_GOOGLE_ONE_TAP_CLIENT_ID,
          use_fedcm_for_prompt: true,
          callback: handleCredentialResponse,
        })
        google.accounts.id.prompt()
      })
      .catch((error: unknown) => {
        console.warn('Google One Tap is unavailable', error)
      })

    return () => {
      isCancelled = true
      window.google?.accounts.id.cancel()
    }
  }, [isAuthenticated, isAuthLoading])
}
