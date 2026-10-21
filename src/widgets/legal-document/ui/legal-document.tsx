import { Link } from '@tanstack/react-router'

import { Button } from '@/shared/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card'
import { Logo } from '@/shared/ui/logo'
import { Separator } from '@/shared/ui/separator'

export type LegalSection = {
  heading: string
  paragraphs: string[]
}

type LegalDocumentProps = {
  title: string
  subtitle: string
  lastUpdated: string
  sections: LegalSection[]
}

export const LegalDocument = ({ title, subtitle, lastUpdated, sections }: LegalDocumentProps) => (
  <div className="min-h-dvh bg-background px-4 py-10 sm:px-6">
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-6">
      <div className="flex items-center justify-between gap-3">
        <Link to="/" className="inline-flex items-center gap-2">
          <Logo className="size-10" />
          <span className="text-sm font-semibold tracking-[0.2em] text-muted-foreground uppercase">AeroSpeak</span>
        </Link>

        <Button variant="outline" size="sm" render={<Link to="/login" />}>
          Sign in
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl sm:text-3xl">{title}</CardTitle>
          <CardDescription>{subtitle}</CardDescription>
          <CardDescription className="text-xs">Last updated: {lastUpdated}</CardDescription>
        </CardHeader>

        <CardContent className="gap-6">
          {sections.map((section, index) => (
            <section key={section.heading} className="space-y-3">
              {index > 0 ? <Separator /> : null}
              <h2 className="pt-3 text-lg font-semibold">{section.heading}</h2>
              <div className="space-y-2 text-sm text-muted-foreground sm:text-base">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </section>
          ))}
        </CardContent>
      </Card>
    </div>
  </div>
)
