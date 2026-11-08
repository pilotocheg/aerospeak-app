import type { ReactNode } from 'react'
import { Link } from '@tanstack/react-router'

import { useGoogleOneTap } from '@/features/auth/model/use-google-one-tap'
import { useRedirectIfAuthenticated } from '@/features/auth/model/use-redirect-if-authenticated'
import { Card, CardContent } from '@/shared/ui/card'
import { FieldDescription } from '@/shared/ui/field'
import { Logo } from '@/shared/ui/logo'

type AuthPageContainerProps = {
  title: string
  subtitle: string
  children: ReactNode
}

/** Shared shell of the login and register pages: branding, form card, legal links, One Tap. */
export const AuthPageContainer = ({ title, subtitle, children }: AuthPageContainerProps) => {
  useRedirectIfAuthenticated('/lessons')
  useGoogleOneTap()

  return (
    <div className="flex min-h-dvh items-center justify-center bg-background px-4 py-6 sm:px-6">
      <div className="flex w-full max-w-md flex-col gap-6">
        <div className="text-center">
          <div className="mb-4 flex flex-col items-center gap-2">
            <Logo className="size-14" />
            <span className="text-sm font-semibold tracking-[0.2em] text-muted-foreground uppercase">AeroSpeak</span>
          </div>
          <h1 className="text-3xl font-semibold tracking-tight">{title}</h1>
          <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>
        </div>

        <Card className="border-border/60 shadow-sm">
          <CardContent>{children}</CardContent>
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
    </div>
  )
}
