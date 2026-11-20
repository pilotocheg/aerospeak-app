import { Link, type LinkProps } from '@tanstack/react-router'

import { Button } from '@/shared/ui/button'
import { Field, FieldDescription } from '@/shared/ui/field'

type AuthFormFooterProps = {
  submitLabel: string
  pendingLabel: string
  isSubmitting: boolean
  prompt: string
  linkTo: LinkProps['to']
  linkLabel: string
}

/** Submit button plus the "switch to another auth page" link under it. */
export const AuthFormFooter = ({
  submitLabel,
  pendingLabel,
  isSubmitting,
  prompt,
  linkTo,
  linkLabel,
}: AuthFormFooterProps) => (
  <Field>
    <Button type="submit" className="w-full" disabled={isSubmitting}>
      {isSubmitting ? pendingLabel : submitLabel}
    </Button>
    <FieldDescription className="text-center">
      {prompt}{' '}
      <Link to={linkTo} className="font-medium text-brand underline-offset-4 hover:underline">
        {linkLabel}
      </Link>
    </FieldDescription>
  </Field>
)
