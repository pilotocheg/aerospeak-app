import { ForgotPasswordForm } from '@/features/auth/ui/forgot-password-form'

import { AuthPageContainer } from './auth-page-container'

export const ForgotPasswordPage = () => (
  <AuthPageContainer
    title="Reset your password"
    subtitle="We’ll send a reset link to your email if an account exists."
    showLegal={false}
  >
    <ForgotPasswordForm />
  </AuthPageContainer>
)
