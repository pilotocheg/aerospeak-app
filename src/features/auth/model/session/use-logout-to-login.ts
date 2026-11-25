import { useQueryClient } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'

import { progressKeys } from '@/entities/progress'

import { useLogout } from '../actions'

/** Logs out and opens the login page. Logout never fails: a Firebase error still signs out locally. */
export const useLogoutToLogin = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const logout = useLogout()

  const logoutToLogin = async () => {
    await logout()
    // Progress is persisted in this browser: drop it so the next person here never loads it.
    queryClient.removeQueries({ queryKey: progressKeys.all })
    await navigate({ to: '/login', replace: true })
  }

  return logoutToLogin
}
