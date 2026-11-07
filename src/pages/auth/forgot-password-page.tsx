import { useState } from 'react'
import { toast } from 'sonner'

import { ForgotPasswordForm } from '@/features/auth/ui/forgot-password-form'
import { useSendPasswordResetEmail } from '@/features/auth/model/actions'
import { Logo } from '@/shared/ui/logo'
import { useRedirectIfAuthenticated } from '@/features/auth/model/use-redirect-if-authenticated'

export const ForgotPasswordPage = () => {
  const send = useSendPasswordResetEmail()
  const [email, setEmail] = useState('')

  useRedirectIfAuthenticated('/lessons')

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      await send({ email })
    } catch {
      // ignore
    }
    toast.success('If an account exists with this email, we have sent a password reset link')
  }

  return (
    <div className="flex min-h-dvh items-center justify-center bg-background px-4 py-6 sm:px-6">
      <div className="w-full max-w-md">
        <div className="mb-6 text-center">
          <div className="mb-4 flex flex-col items-center gap-2">
            <Logo className="size-14" />
            <span className="text-sm font-semibold tracking-[0.2em] text-muted-foreground uppercase">
              AeroSpeak
            </span>
          </div>
          <h1 className="text-3xl font-semibold tracking-tight">Reset your password</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            We’ll send a reset link to your email if an account exists.
          </p>
        </div>

        <ForgotPasswordForm
          email={email}
          onEmailChange={setEmail}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  )
}
