import { redirect } from '@tanstack/react-router'

import { auth } from '@/shared/lib/firebase'

export const requireGuest = async () => {
  await auth.authStateReady()
  if (auth.currentUser) {
    throw redirect({ to: '/lessons' })
  }
}
