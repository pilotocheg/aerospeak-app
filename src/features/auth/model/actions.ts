import { loginWithEmail, loginWithGoogle, logoutCurrentUser, registerWithEmail } from '../api'

import { useAuthStore } from './auth-store'
import type { User } from './types'

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

const setUser = (user: User | null) => {
  const { setAuthenticatedUser, clearAuthenticatedUser } = useAuthStore.getState()
  if (user) {
    setAuthenticatedUser(user)
  } else {
    clearAuthenticatedUser()
  }
}

/** Puts the signed-in user (or nobody) into the auth store. */
export const useSetUser = () => setUser
