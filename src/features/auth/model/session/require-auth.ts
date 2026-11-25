import { redirect } from '@tanstack/react-router'

import { auth } from '@/shared/lib/firebase'

export const requireAuth = async () => {
  await auth.authStateReady()
  if (!auth.currentUser) {
    throw redirect({ to: '/login' })
  }
}
