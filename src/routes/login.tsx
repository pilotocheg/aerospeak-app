import { createFileRoute } from '@tanstack/react-router'

import { LoginPage } from '@/pages/auth/login-page'
import { requireGuest } from '@/features/auth/model/auth-guards'

export const Route = createFileRoute('/login')({
  beforeLoad: requireGuest,
  component: LoginPage,
})
