import { setProgressOwner } from '@/entities/progress'

import { loginWithEmail, loginWithGoogle, logoutCurrentUser, observeAuthState, registerWithEmail } from '../api'

import { useAuthStore } from './auth-store'
import type { LoginInput, RegisterInput } from './types'

export const useLogin = () => async (payload: LoginInput) => {
  const { setLoading } = useAuthStore.getState()
  setLoading(true)
  try {
    await loginWithEmail(payload)
  } finally {
    setLoading(false)
  }
}

export const useLoginWithGoogle = () => async () => {
  const { setLoading } = useAuthStore.getState()
  setLoading(true)
  try {
    await loginWithGoogle()
  } finally {
    setLoading(false)
  }
}

export const useRegister = () => async (payload: RegisterInput) => {
  const { setLoading } = useAuthStore.getState()
  setLoading(true)
  try {
    await registerWithEmail(payload)
  } finally {
    setLoading(false)
  }
}

export const useLogout = () => async () => {
  const { setLoading, clearAuthenticatedUser } = useAuthStore.getState()
  setLoading(true)
  try {
    await logoutCurrentUser()
    clearAuthenticatedUser()
  } finally {
    setLoading(false)
  }
}

export const initAuthSession = () => {
  const { setAuthenticatedUser, clearAuthenticatedUser } = useAuthStore.getState()

  return observeAuthState((user) => {
    if (user) {
      setProgressOwner(user.id)
      setAuthenticatedUser(user)
      return
    }
    clearAuthenticatedUser()
  })
}
