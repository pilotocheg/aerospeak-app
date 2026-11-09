import { createFileRoute } from '@tanstack/react-router'

import { ForgotPasswordPage } from '@/pages/auth/forgot-password-page'
import { requireGuest } from '@/features/auth/model/auth-guards'

export const Route = createFileRoute('/forgot-password')({
  beforeLoad: requireGuest,
  component: ForgotPasswordPage,
})
