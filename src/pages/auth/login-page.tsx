import { LoginForm } from '@/features/auth'

import { AuthPageContainer } from './auth-page-container'

export const LoginPage = () => (
  <AuthPageContainer title="Welcome back" subtitle="Sign in to continue your communication training.">
    <LoginForm />
  </AuthPageContainer>
)
