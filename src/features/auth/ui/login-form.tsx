import { Link } from '@tanstack/react-router'

import { Field, FieldError, FieldGroup, FieldLabel } from '@/shared/ui/field'
import { Input } from '@/shared/ui/input'

import { useLoginForm } from '../model/use-login-form'
import { AuthFormFooter } from './auth-form-footer'
import { EmailField } from './email-field'
import { GoogleAuthSection } from './google-auth-section'

export const LoginForm = () => {
  const { register, errors, isSubmitting, onSubmit } = useLoginForm()

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      <FieldGroup>
        <GoogleAuthSection separatorLabel="Or sign in with email" />
        <EmailField error={errors.email} inputProps={register('email')} />
        <Field data-invalid={!!errors.password}>
          <div className="flex items-center">
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <Link to="/forgot-password" className="ml-auto text-sm text-foreground underline-offset-4 hover:underline">
              Forgot your password?
            </Link>
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
        <AuthFormFooter
          submitLabel="Login"
          pendingLabel="Signing in…"
          isSubmitting={isSubmitting}
          prompt="New here?"
          linkTo="/register"
          linkLabel="Create an account"
        />
      </FieldGroup>
    </form>
  )
}
