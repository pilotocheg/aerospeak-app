import { createFileRoute } from '@tanstack/react-router'

import { LoginPage } from '@/pages/auth/login-page'
import { requireGuest } from '@/features/auth'

export const Route = createFileRoute('/login')({
  beforeLoad: requireGuest,
  component: LoginPage,
})
