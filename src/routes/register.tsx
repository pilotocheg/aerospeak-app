import { createFileRoute, redirect } from '@tanstack/react-router'

import { RegisterPage } from '@/pages/auth/register-page'
import { auth } from '@/shared/lib/firebase'

export const Route = createFileRoute('/register')({
  beforeLoad: async () => {
    await auth.authStateReady()
    if (auth.currentUser) {
      throw redirect({ to: '/lessons' })
    }
  },
  component: RegisterPage,
})
