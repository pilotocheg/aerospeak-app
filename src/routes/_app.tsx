import { createFileRoute } from '@tanstack/react-router'

import { AppLayout } from '@/app/layouts/app-layout'
import { requireAuth } from '@/features/auth/model/auth-guards'

export const Route = createFileRoute('/_app')({
  beforeLoad: requireAuth,
  component: AppLayout,
})
