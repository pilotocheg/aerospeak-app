import { createFileRoute } from '@tanstack/react-router'

import { RegisterPage } from '@/pages/auth/register-page'
import { requireGuest } from '@/features/auth/model/auth-guards'

export const Route = createFileRoute('/register')({
  beforeLoad: requireGuest,
  component: RegisterPage,
})
