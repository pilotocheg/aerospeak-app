import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { Link } from '@tanstack/react-router'

import { Button } from '@/shared/ui/button'
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from '@/shared/ui/field'
import { Input } from '@/shared/ui/input'

import { useSendPasswordResetEmail } from '../model/actions'
import { passwordResetSchema, type PasswordResetFormValues } from '../model/schemas'

export const ForgotPasswordForm = () => {
  const sendPasswordReset = useSendPasswordResetEmail()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PasswordResetFormValues>({
    resolver: zodResolver(passwordResetSchema),
    mode: 'onTouched',
    defaultValues: { email: '' },
  })

  const onSubmit = handleSubmit(async (values) => {
    await sendPasswordReset.mutateAsync(values)
    toast.success('If an account exists with this email, we have sent a password reset link')
  })

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      <FieldGroup>
        <Field data-invalid={!!errors.email}>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            id="email"
            type="email"
            placeholder="name@aerospeak.io"
            autoComplete="email"
            inputMode="email"
            aria-invalid={!!errors.email}
            {...register('email')}
          />
          <FieldError errors={[errors.email]} />
        </Field>
        <Field>
          <Button type="submit" className="w-full" disabled={sendPasswordReset.isPending}>
            {sendPasswordReset.isPending ? 'Sending…' : 'Send reset link'}
          </Button>
          <FieldDescription className="text-center">
            Remembered your password?{' '}
            <Link to="/login" className="font-medium text-brand underline-offset-4 hover:underline">
              Sign in
            </Link>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  )
}
