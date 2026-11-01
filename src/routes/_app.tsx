import { createFileRoute, redirect } from '@tanstack/react-router'

import { AppLayout } from '@/app/layouts/app-layout'
import { setProgressOwner } from '@/entities/progress'
import { auth } from '@/shared/lib/firebase'

export const Route = createFileRoute('/_app')({
  // Firebase restores the session asynchronously; without waiting, a reload would always land on /login.
  beforeLoad: async () => {
    await auth.authStateReady()
    if (!auth.currentUser) {
      throw redirect({ to: '/login' })
    }
    // Before any page renders, so another account's local progress never shows.
    setProgressOwner(auth.currentUser.uid)
  },
  component: AppLayout,
})
