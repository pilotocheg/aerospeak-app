import { useState } from 'react'
import { Link } from '@tanstack/react-router'
import { toast } from 'sonner'
import { LoginForm } from '@/features/auth/ui/login-form'
import { useLogin } from '@/features/auth/model/actions'
import { Logo } from '@/shared/ui/logo'
import { useRedirectIfAuthenticated } from '@/features/auth/model/use-redirect-if-authenticated'

export const LoginPage = () => {
  const login = useLogin()
  const [email, setEmail] = useState('student@aerospeak.io')
  const [password, setPassword] = useState('password123')

  useRedirectIfAuthenticated('/lessons')

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      await login({ email, password })
      toast.success('Successfully logged in')
    } catch {
      toast.error('Failed to sign in')
    }
  }

  return (
    <div className="flex min-h-dvh items-center justify-center bg-background px-4 py-6 sm:px-6">
      <div className="w-full max-w-md">
        <div className="mb-6 text-center">
          <div className="mb-4 flex flex-col items-center gap-2">
            <Logo className="size-14" />
            <span className="text-sm font-semibold tracking-[0.2em] text-muted-foreground uppercase">AeroSpeak</span>
          </div>
          <h1 className="text-3xl font-semibold tracking-tight">Welcome back</h1>
          <p className="mt-2 text-sm text-muted-foreground">Sign in to continue your communication training.</p>
        </div>

        <LoginForm
          email={email}
          password={password}
          onEmailChange={setEmail}
          onPasswordChange={setPassword}
          onSubmit={handleSubmit}
          footer={
            <>
              New here?{' '}
              <Link to="/register" className="font-medium text-brand underline-offset-4 hover:underline">
                Create an account
              </Link>
            </>
          }
        />
      </div>
    </div>
  )
}