import { createFileRoute, redirect } from '@tanstack/react-router'

import { RegisterPage } from '@/pages/auth/register-page'

export const Route = createFileRoute('/register')({
  beforeLoad: ({ context }) => {
    if (context.authStore.getState().isAuthenticated) {
      throw redirect({ to: '/lessons' })
    }
  },
  component: RegisterPage,
})
