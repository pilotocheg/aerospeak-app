import { useNavigate } from '@tanstack/react-router'
import { toast } from 'sonner'

import { useLoginWithGoogle } from '../actions'

export const useGoogleLogin = () => {
  const loginWithGoogle = useLoginWithGoogle()
  const navigate = useNavigate()

  const googleLogin = async () => {
    try {
      await loginWithGoogle()
      await navigate({ to: '/lessons', replace: true })
    } catch {
      toast.error('Failed to sign in with Google')
    }
  }

  return googleLogin
}
