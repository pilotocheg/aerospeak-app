import { createFileRoute, redirect } from '@tanstack/react-router'

import { AppLayout } from '@/app/layouts/app-layout'

export const Route = createFileRoute('/_app')({
  beforeLoad: ({ context }) => {
    if (!context.authStore.getState().isAuthenticated) {
      throw redirect({ to: '/login' })
    }
  },
  component: AppLayout,
})
