import type { FormEvent, ReactNode } from 'react'
import { cn } from 'cn'

import { Link } from '@tanstack/react-router'
import { Button } from '@/shared/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card'
import { Field, FieldDescription, FieldGroup, FieldLabel, FieldSeparator } from '@/shared/ui/field'
import { Input } from '@/shared/ui/input'
import { GoogleAuthButton } from '@/features/auth/ui/google-auth-button'

type LoginFormProps = {
  email: string
  password: string
  onEmailChange: (value: string) => void
  onPasswordChange: (value: string) => void
  onSubmit: (event: FormEvent<HTMLFormElement>) => void
  footer?: ReactNode
}

export const LoginForm = ({
  className,
  email,
  password,
  onEmailChange,
  onPasswordChange,
  onSubmit,
  footer,
  ...props
}: Omit<React.ComponentProps<'div'>, 'onSubmit'> & LoginFormProps) => {
  return (
    <div className={cn('flex w-full flex-col gap-6', className)} {...props}>
      <Card className="border-border/60 shadow-sm">
        <CardHeader className="space-y-2 text-center">
          <CardTitle className="text-xl font-semibold tracking-tight">Welcome back</CardTitle>
          <CardDescription>Login with your Apple or Google account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="space-y-5">
            <FieldGroup>
              <Field>
                <GoogleAuthButton />
              </Field>
              <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                Or continue with
              </FieldSeparator>
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
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <Link to="/forgot-password" className="ml-auto text-sm underline-offset-4 hover:underline">
                    Forgot your password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(event) => onPasswordChange(event.target.value)}
                  autoComplete="current-password"
                  required
                />
              </Field>
              <Field>
                <Button type="submit" className="w-full">
                  Login
                </Button>
                {footer ? <FieldDescription className="text-center">{footer}</FieldDescription> : null}
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our{' '}
        <Link to="/terms-and-conditions" target="_blank" rel="noreferrer">
          Terms of Service
        </Link>{' '}
        and{' '}
        <Link to="/privacy-policy" target="_blank" rel="noreferrer">
          Privacy Policy
        </Link>
        .
      </FieldDescription>
    </div>
  )
}
