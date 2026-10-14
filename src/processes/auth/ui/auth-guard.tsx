import { Navigate, useLocation } from '@tanstack/react-router'
import type { PropsWithChildren } from 'react'
import { useAuthStore } from '@/features/auth/model/auth-store'

export function AuthGuard({ children }: PropsWithChildren) {
  const location = useLocation()
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  const isPublicRoute = location.pathname === '/login' || location.pathname === '/register'

  if (!isAuthenticated && !isPublicRoute) {
    return <Navigate to="/login" replace />
  }

  if (isAuthenticated && isPublicRoute) {
    return <Navigate to="/" replace />
  }

  return <>{children}</>
}
