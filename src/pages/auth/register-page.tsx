import { useState } from 'react'
import { Link, useNavigate } from '@tanstack/react-router'
import { Plane } from 'lucide-react'
import { SignupForm } from '@/features/auth/ui/signup-form'
import { useAuthStore } from '@/features/auth/model/auth-store'

export function RegisterPage() {
  const navigate = useNavigate()
  const register = useAuthStore((state) => state.register)
  const [name, setName] = useState('Maya Green')
  const [email, setEmail] = useState('maya@aerospeak.io')
  const [password, setPassword] = useState('password123')
  const [confirmPassword, setConfirmPassword] = useState('password123')

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (password !== confirmPassword) {
      return
    }

    register({ name, email, password, role: 'Student' })
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
          <h1 className="text-3xl font-semibold tracking-tight">Create your account</h1>
          <p className="mt-2 text-sm text-muted-foreground">Start improving your aviation communication skills today.</p>
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
