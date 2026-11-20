import { Field, FieldSeparator } from '@/shared/ui/field'

import { GoogleAuthButton } from './google-auth-button'

type GoogleAuthSectionProps = {
  separatorLabel: string
}

export const GoogleAuthSection = ({ separatorLabel }: GoogleAuthSectionProps) => (
  <>
    <Field>
      <GoogleAuthButton />
    </Field>
    <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">{separatorLabel}</FieldSeparator>
  </>
)
