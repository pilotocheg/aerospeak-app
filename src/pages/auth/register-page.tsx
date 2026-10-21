import { useState, useEffect } from 'react'
import { Link, useNavigate } from '@tanstack/react-router'
import { SignupForm } from '@/features/auth/ui/signup-form'
import { useRegister } from '@/features/auth/model/actions'
import { Logo } from '@/shared/ui/logo'
import { useIsAuthenticated } from '@/features/auth/model/selectors'

export const RegisterPage = () => {
  const navigate = useNavigate()
  const register = useRegister()
  const [name, setName] = useState('Maya Green')
  const [email, setEmail] = useState('maya@aerospeak.io')
  const [password, setPassword] = useState('password123')
  const [confirmPassword, setConfirmPassword] = useState('password123')

  const isAuth = useIsAuthenticated()

  useEffect(() => {
    if (isAuth) {
      navigate({ to: '/lessons', replace: true })
    }
  }, [isAuth, navigate])

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (password !== confirmPassword) {
      return
    }

    register({ name, email, password, role: 'Student' })
  }

  return (
    <div className="flex min-h-dvh items-center justify-center bg-background px-4 py-6 sm:px-6">
      <div className="w-full max-w-md">
        <div className="mb-6 text-center">
          <div className="mb-4 flex flex-col items-center gap-2">
            <Logo className="size-14" />
            <span className="text-sm font-semibold tracking-[0.2em] text-muted-foreground uppercase">AeroSpeak</span>
          </div>
          <h1 className="text-3xl font-semibold tracking-tight">Create your account</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Start improving your aviation communication skills today.
          </p>
        </div>

        <SignupForm
          name={name}
          email={email}
          password={password}
          confirmPassword={confirmPassword}
          onNameChange={setName}
          onEmailChange={setEmail}
          onPasswordChange={setPassword}
          onConfirmPasswordChange={setConfirmPassword}
          onSubmit={handleSubmit}
          footer={
            <>
              Already have an account?{' '}
              <Link to="/login" className="font-medium text-primary underline-offset-4 hover:underline">
                Sign in
              </Link>
            </>
          }
        />
      </div>
    </div>
  )
}

