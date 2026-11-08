import { redirect } from '@tanstack/react-router'

import { setProgressOwner } from '@/entities/progress'

import { auth } from '@/shared/lib/firebase'

export const requireGuest = async () => {
  await auth.authStateReady()
  if (auth.currentUser) {
    throw redirect({ to: '/lessons' })
  }
}

export const requireAuth = async () => {
  await auth.authStateReady()
  if (!auth.currentUser) {
    throw redirect({ to: '/login' })
  }
  // Before any page renders, so another account's local progress never shows.
  setProgressOwner(auth.currentUser.uid)
}