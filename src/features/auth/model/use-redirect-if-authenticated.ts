import { useEffect } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { useIsAuthenticated } from './selectors'

export const useRedirectIfAuthenticated = (to: string = '/lessons') => {
  const navigate = useNavigate()
  const isAuth = useIsAuthenticated()

  useEffect(() => {
    if (isAuth) {
      void navigate({ to, replace: true })
    }
  }, [isAuth, navigate, to])
}