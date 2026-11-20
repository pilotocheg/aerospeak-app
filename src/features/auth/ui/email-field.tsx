import type { FieldError as FormFieldError, UseFormRegisterReturn } from 'react-hook-form'

import { Field, FieldError, FieldLabel } from '@/shared/ui/field'
import { Input } from '@/shared/ui/input'

type EmailFieldProps = {
  error?: FormFieldError
  inputProps: UseFormRegisterReturn<'email'>
}

export const EmailField = ({ error, inputProps }: EmailFieldProps) => (
  <Field data-invalid={!!error}>
    <FieldLabel htmlFor="email">Email</FieldLabel>
    <Input
      id="email"
      type="email"
      placeholder="name@aerospeak.io"
      autoComplete="email"
      inputMode="email"
      aria-invalid={!!error}
      {...inputProps}
    />
    <FieldError errors={[error]} />
  </Field>
)
