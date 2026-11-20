import { useNavigate } from '@tanstack/react-router'

import { useLogout } from './actions'

/** Logs out and opens the login page. Logout never fails: a Firebase error still signs out locally. */
export const useLogoutToLogin = () => {
  const navigate = useNavigate()
  const logout = useLogout()

  return async () => {
    await logout()
    await navigate({ to: '/login', replace: true })
  }
}
