import { Button } from '@/shared/ui/button'
import { Field, FieldGroup } from '@/shared/ui/field'

import { useChangePasswordForm } from '../../model/form/use-change-password-form'
import { useHasPasswordProvider } from '../../model/session/use-has-password-provider'
import { PasswordField } from './password-field'

export const ChangePasswordForm = () => {
  const hasPassword = useHasPasswordProvider()
  const { register, errors, isSubmitting, onSubmit } = useChangePasswordForm()

  if (!hasPassword) {
    return (
      <p className="text-sm text-muted-foreground">
        You signed in with Google, so your password is managed by your Google account.
      </p>
    )
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      <FieldGroup>
        <PasswordField
          id="currentPassword"
          label="Current password"
          autoComplete="current-password"
          placeholder="Enter your current password"
          error={errors.currentPassword}
          inputProps={register('currentPassword')}
        />
        <PasswordField
          id="newPassword"
          label="New password"
          autoComplete="new-password"
          placeholder="At least 8 characters"
          error={errors.newPassword}
          inputProps={register('newPassword')}
        />
        <PasswordField
          id="confirmPassword"
          label="Repeat new password"
          autoComplete="new-password"
          placeholder="Repeat the new password"
          error={errors.confirmPassword}
          inputProps={register('confirmPassword')}
        />
        <Field>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Updating…' : 'Update password'}
          </Button>
        </Field>
      </FieldGroup>
    </form>
  )
}
