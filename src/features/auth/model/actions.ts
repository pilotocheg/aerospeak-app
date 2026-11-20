import { loginWithEmail, loginWithGoogle, logoutCurrentUser, registerWithEmail } from '../api'

import { useAuthStore } from './auth-store'

const withAuthLoading =
  <Args extends unknown[]>(run: (...args: Args) => Promise<void>) =>
  async (...args: Args) => {
    const { setLoading } = useAuthStore.getState()
    setLoading(true)
    try {
      await run(...args)
    } finally {
      setLoading(false)
    }
  }

const login = withAuthLoading(loginWithEmail)
const loginWithGooglePopup = withAuthLoading(loginWithGoogle)
const register = withAuthLoading(registerWithEmail)
const logout = withAuthLoading(async () => {
  await logoutCurrentUser()
  useAuthStore.getState().clearAuthenticatedUser()
})

export const useLogin = () => login

export const useLoginWithGoogle = () => loginWithGooglePopup

export const useRegister = () => register

export const useLogout = () => logout
