import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { Link } from '@tanstack/react-router'

import { Button } from '@/shared/ui/button'
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel, FieldSeparator } from '@/shared/ui/field'
import { Input } from '@/shared/ui/input'
import { GoogleAuthButton } from '@/features/auth/ui/google-auth-button'

import { useLogin } from '../model/actions'
import { loginSchema, type LoginFormValues } from '../model/schemas'

export const LoginForm = () => {
  const login = useLogin()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    mode: 'onTouched',
    defaultValues: { email: '', password: '' },
  })

  const onSubmit = handleSubmit(async (values) => {
    try {
      await login(values)
      toast.success('Successfully logged in')
    } catch {
      toast.error('Failed to sign in')
    }
  })

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      <FieldGroup>
        <Field>
          <GoogleAuthButton />
        </Field>
        <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">Or sign in with email</FieldSeparator>
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
        <Field data-invalid={!!errors.password}>
          <div className="flex items-center">
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <a href="#" className="ml-auto text-sm text-foreground underline-offset-4 hover:underline">
              Forgot your password?
            </a>
          </div>
          <Input
            id="password"
            type="password"
            placeholder="Enter your password"
            autoComplete="current-password"
            aria-invalid={!!errors.password}
            {...register('password')}
          />
          <FieldError errors={[errors.password]} />
        </Field>
        <Field>
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? 'Signing in…' : 'Login'}
          </Button>
          <FieldDescription className="text-center">
            New here?{' '}
            <Link to="/register" className="font-medium text-brand underline-offset-4 hover:underline">
              Create an account
            </Link>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  )
}
