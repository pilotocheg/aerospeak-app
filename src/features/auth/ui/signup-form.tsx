import { Field, FieldError, FieldGroup, FieldLabel } from '@/shared/ui/field'
import { Input } from '@/shared/ui/input'

import { useSignupForm } from '../model/use-signup-form'
import { AuthFormFooter } from './auth-form-footer'
import { EmailField } from './email-field'
import { GoogleAuthSection } from './google-auth-section'

export const SignupForm = () => {
  const { register, errors, isSubmitting, onSubmit } = useSignupForm()

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      <FieldGroup>
        <GoogleAuthSection separatorLabel="Or sign up with email" />
        <Field data-invalid={!!errors.name}>
          <FieldLabel htmlFor="name">Full Name</FieldLabel>
          <Input
            id="name"
            type="text"
            placeholder="Jane Cooper"
            autoComplete="name"
            aria-invalid={!!errors.name}
            {...register('name')}
          />
          <FieldError errors={[errors.name]} />
        </Field>
        <EmailField error={errors.email} inputProps={register('email')} />
        <Field className="grid gap-4 sm:grid-cols-2">
          <Field data-invalid={!!errors.password}>
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <Input
              id="password"
              type="password"
              placeholder="Create a password"
              autoComplete="new-password"
              aria-invalid={!!errors.password}
              {...register('password', { deps: ['confirmPassword'] })}
            />
            <FieldError errors={[errors.password]} />
          </Field>
          <Field data-invalid={!!errors.confirmPassword}>
            <FieldLabel htmlFor="confirm-password">Confirm password</FieldLabel>
            <Input
              id="confirm-password"
              type="password"
              placeholder="Repeat password"
              autoComplete="new-password"
              aria-invalid={!!errors.confirmPassword}
              {...register('confirmPassword')}
            />
            <FieldError errors={[errors.confirmPassword]} />
          </Field>
        </Field>
        <AuthFormFooter
          submitLabel="Create Account"
          pendingLabel="Creating account…"
          isSubmitting={isSubmitting}
          prompt="Already have an account?"
          linkTo="/login"
          linkLabel="Sign in"
        />
      </FieldGroup>
    </form>
  )
}
