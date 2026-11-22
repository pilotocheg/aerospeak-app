import { toast } from 'sonner'

import { useLoginWithGoogle } from '../actions'

/** Google popup sign-in. The auth pages leave for /lessons on their own (`useRedirectIfAuthenticated`). */
export const useGoogleLogin = () => {
  const loginWithGoogle = useLoginWithGoogle()

  const googleLogin = async () => {
    try {
      await loginWithGoogle()
    } catch {
      toast.error('Failed to sign in with Google')
    }
  }

  return googleLogin
}
