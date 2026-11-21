import { FieldGroup } from '@/shared/ui/field'

import { useForgotPasswordForm } from '../../model/form/use-forgot-password-form'
import { AuthFormFooter } from './auth-form-footer'
import { EmailField } from './email-field'

export const ForgotPasswordForm = () => {
  const { register, errors, isSubmitting, onSubmit } = useForgotPasswordForm()

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      <FieldGroup>
        <EmailField error={errors.email} inputProps={register('email')} />
        <AuthFormFooter
          submitLabel="Send reset link"
          pendingLabel="Sending…"
          isSubmitting={isSubmitting}
          prompt="Remembered your password?"
          linkTo="/login"
          linkLabel="Sign in"
        />
      </FieldGroup>
    </form>
  )
}
