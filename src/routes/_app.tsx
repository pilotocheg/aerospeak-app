import { createFileRoute } from '@tanstack/react-router'

import { AppLayout } from '@/app/layouts/app-layout'
import { requireAuth } from '@/features/auth'

export const Route = createFileRoute('/_app')({
  beforeLoad: requireAuth,
  component: AppLayout,
})
