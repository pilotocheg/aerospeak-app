import type { FormEvent, ReactNode } from 'react'
import { cn } from 'cn'

import { Link } from '@tanstack/react-router'
import { Button } from '@/shared/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card'
import { Field, FieldDescription, FieldGroup, FieldLabel } from '@/shared/ui/field'
import { Input } from '@/shared/ui/input'

type SignupFormProps = {
  name: string
  email: string
  password: string
  confirmPassword: string
  onNameChange: (value: string) => void
  onEmailChange: (value: string) => void
  onPasswordChange: (value: string) => void
  onConfirmPasswordChange: (value: string) => void
  onSubmit: (event: FormEvent<HTMLFormElement>) => void
  footer?: ReactNode
}

export const SignupForm = ({
  className,
  name,
  email,
  password,
  confirmPassword,
  onNameChange,
  onEmailChange,
  onPasswordChange,
  onConfirmPasswordChange,
  onSubmit,
  footer,
  ...props
}: Omit<React.ComponentProps<'div'>, 'onSubmit'> & SignupFormProps) => {
  return (
    <div className={cn('flex w-full flex-col gap-6', className)} {...props}>
      <Card className="border-border/60 shadow-sm">
        <CardHeader className="space-y-2 text-center">
          <CardTitle className="text-xl font-semibold tracking-tight">Create your account</CardTitle>
          <CardDescription>Enter your details below to create your AeroSpeak account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="space-y-5">
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="name">Full Name</FieldLabel>
                <Input
                  id="name"
                  type="text"
                  placeholder="Jane Cooper"
                  value={name}
                  onChange={(event) => onNameChange(event.target.value)}
                  autoComplete="name"
                  required
                />
              </Field>
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
              <Field className="grid gap-4 sm:grid-cols-2">
                <Field>
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Create a password"
                    value={password}
                    onChange={(event) => onPasswordChange(event.target.value)}
                    autoComplete="new-password"
                    required
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="confirm-password">Confirm password</FieldLabel>
                  <Input
                    id="confirm-password"
                    type="password"
                    placeholder="Repeat password"
                    value={confirmPassword}
                    onChange={(event) => onConfirmPasswordChange(event.target.value)}
                    autoComplete="new-password"
                    required
                  />
                </Field>
              </Field>
              <Field>
                <Button type="submit" className="w-full">
                  Create Account
                </Button>
                {footer ? <FieldDescription className="text-center">{footer}</FieldDescription> : null}
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our <Link to="/terms-and-conditions" target="_blank" rel="noreferrer">Terms of Service</Link> and <Link to="/privacy-policy" target="_blank" rel="noreferrer">Privacy Policy</Link>.
      </FieldDescription>
    </div>
  )
}
