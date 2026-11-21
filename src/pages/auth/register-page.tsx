import { SignupForm } from '@/features/auth'

import { AuthPageContainer } from './auth-page-container'

export const RegisterPage = () => (
  <AuthPageContainer title="Create your account" subtitle="Start improving your aviation communication skills today.">
    <SignupForm />
  </AuthPageContainer>
)
