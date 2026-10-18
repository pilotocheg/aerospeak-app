import { useState } from 'react'
import { Link, useNavigate } from '@tanstack/react-router'
import { Plane } from 'lucide-react'
import { LoginForm } from '@/features/auth/ui/login-form'
import { useLogin } from '@/features/auth/model/actions'

export const LoginPage = () => {
  const navigate = useNavigate()
  const login = useLogin()
  const [email, setEmail] = useState('student@aerospeak.io')
  const [password, setPassword] = useState('password123')

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    login({ email, password })
    navigate({ to: '/', replace: true })
  }

  return (
    <div className="flex min-h-dvh items-center justify-center bg-background px-4 py-6 sm:px-6">
      <div className="w-full max-w-md">
        <div className="mb-6 text-center">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border bg-secondary px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
            <Plane className="h-3.5 w-3.5" />
            AeroSpeak
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
              <Link to="/register" className="font-medium text-primary underline-offset-4 hover:underline">
                Create an account
              </Link>
            </>
          }
        />
      </div>
    </div>
  )
}
