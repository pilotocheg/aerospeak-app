import { useEffect, useRef } from 'react'

import { signInWithGoogleIdToken } from '@/entities/user'
import { auth } from '@/shared/lib/firebase'

const GOOGLE_ONE_TAP_WAIT_TIMEOUT_MS = 8000
const GOOGLE_ONE_TAP_WAIT_INTERVAL_MS = 100

type GoogleOneTapCredentialResponse = {
  credential?: string
}

type GoogleOneTapClient = {
  accounts: {
    id: {
      initialize: (payload: {
        client_id: string
        callback: (response: GoogleOneTapCredentialResponse) => void
        auto_select?: boolean
        use_fedcm_for_prompt?: boolean
      }) => void
      prompt: () => void
      cancel?: () => void
    }
  }
}

declare global {
  interface Window {
    google?: GoogleOneTapClient
  }
}

type UseGoogleOneTapOptions = {
  clientId?: string
  enabled?: boolean
  onError?: (error: unknown) => void
  onSignedIn?: () => void
}

const waitForGoogleOneTapClient = async (timeoutMs = GOOGLE_ONE_TAP_WAIT_TIMEOUT_MS) => {
  const start = Date.now()

  return new Promise<GoogleOneTapClient | null>((resolve) => {
    const timer = window.setInterval(() => {
      if (window.google?.accounts?.id) {
        window.clearInterval(timer)
        resolve(window.google)
        return
      }

      if (Date.now() - start >= timeoutMs) {
        window.clearInterval(timer)
        resolve(null)
      }
    }, GOOGLE_ONE_TAP_WAIT_INTERVAL_MS)
  })
}

export const useGoogleOneTap = ({
  clientId,
  enabled = true,
  onError,
  onSignedIn,
}: UseGoogleOneTapOptions) => {
  const isSignInInFlightRef = useRef(false)

  useEffect(() => {
    if (!enabled || auth.currentUser) {
      return
    }

    if (!clientId) {
      onError?.(new Error('Google One Tap client id is not configured'))
      return
    }

    let isUnmounted = false

    const start = async () => {
      const googleClient = await waitForGoogleOneTapClient()

      if (isUnmounted) {
        return
      }

      if (!googleClient) {
        onError?.(new Error('Google One Tap script is unavailable'))
        return
      }

      googleClient.accounts.id.initialize({
        client_id: clientId,
        use_fedcm_for_prompt: true,
        callback: async (response) => {
          if (!response.credential || isSignInInFlightRef.current) {
            return
          }

          isSignInInFlightRef.current = true
          try {
            await signInWithGoogleIdToken(response.credential)
            onSignedIn?.()
          } catch (error) {
            onError?.(error)
          } finally {
            isSignInInFlightRef.current = false
          }
        },
      })

      googleClient.accounts.id.prompt()
    }

    void start()

    return () => {
      isUnmounted = true
      window.google?.accounts?.id.cancel?.()
    }
  }, [clientId, enabled, onError, onSignedIn])
}

export type { UseGoogleOneTapOptions }
