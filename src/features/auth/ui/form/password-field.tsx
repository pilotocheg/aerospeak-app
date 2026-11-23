import type { FieldError as FormFieldError, UseFormRegisterReturn } from 'react-hook-form'

import { Field, FieldError, FieldLabel } from '@/shared/ui/field'
import { Input } from '@/shared/ui/input'

type PasswordFieldProps = {
  id: string
  label: string
  autoComplete: 'current-password' | 'new-password'
  placeholder?: string
  error?: FormFieldError
  inputProps: UseFormRegisterReturn
}

export const PasswordField = ({ id, label, autoComplete, placeholder, error, inputProps }: PasswordFieldProps) => (
  <Field data-invalid={!!error}>
    <FieldLabel htmlFor={id}>{label}</FieldLabel>
    <Input
      id={id}
      type="password"
      autoComplete={autoComplete}
      placeholder={placeholder}
      aria-invalid={!!error}
      {...inputProps}
    />
    <FieldError errors={[error]} />
  </Field>
)
