import { createFileRoute, redirect } from '@tanstack/react-router'

import { ForgotPasswordPage } from '@/pages/auth/forgot-password-page'
import { auth } from '@/shared/lib/firebase'

export const Route = createFileRoute('/forgot-password')({
  beforeLoad: async () => {
    await auth.authStateReady()
    if (auth.currentUser) throw redirect({ to: '/lessons' })
  },
  component: ForgotPasswordPage,
})
