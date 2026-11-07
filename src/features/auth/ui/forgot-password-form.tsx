import type { FormEvent, ReactNode } from 'react'
import { cn } from 'cn'

import { Link } from '@tanstack/react-router'
import { Button } from '@/shared/ui/button'
import { Card, CardContent } from '@/shared/ui/card'
import { Field, FieldDescription, FieldGroup, FieldLabel } from '@/shared/ui/field'
import { Input } from '@/shared/ui/input'

type ForgotPasswordFormProps = {
  email: string
  onEmailChange: (value: string) => void
  onSubmit: (event: FormEvent<HTMLFormElement>) => void
  footer?: ReactNode
}

export const ForgotPasswordForm = ({
  className,
  email,
  onEmailChange,
  onSubmit,
  footer,
  ...props
}: Omit<React.ComponentProps<'div'>, 'onSubmit'> & ForgotPasswordFormProps) => {
  return (
    <div className={cn('flex w-full flex-col gap-6', className)} {...props}>
      <Card className="border-border/60 shadow-sm">
        <CardContent>
          <form onSubmit={onSubmit} className="space-y-5">
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@aerospeak.io"
                  value={email}
                  onChange={(event) => onEmailChange(event.target.value)}
                  autoComplete="email"
                  inputMode="email"
                  required
                />
              </Field>
              <Field>
                <Button type="submit" className="w-full">
                  Send reset link
                </Button>
                {footer ? <FieldDescription className="text-center">{footer}</FieldDescription> : null}
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center">
        Remembered your password?{' '}
        <Link to="/login" className="font-medium text-brand underline-offset-4 hover:underline">
          Sign in
        </Link>
      </FieldDescription>
    </div>
  )
}
