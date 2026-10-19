import { createFileRoute, redirect } from '@tanstack/react-router'

import { LoginPage } from '@/pages/auth/login-page'

export const Route = createFileRoute('/login')({
  beforeLoad: ({ context }) => {
    if (context.authStore.getState().isAuthenticated) {
      throw redirect({ to: '/lessons' })
    }
  },
  component: LoginPage,
})
