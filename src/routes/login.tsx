import { createFileRoute, redirect } from '@tanstack/react-router'

import { LoginPage } from '@/pages/auth/login-page'
import { auth } from '@/shared/lib/firebase'

export const Route = createFileRoute('/login')({
  beforeLoad: async () => {
    await auth.authStateReady()
    if (auth.currentUser) {
      throw redirect({ to: '/lessons' })
    }
  },
  component: LoginPage,
})
