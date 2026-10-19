import { Link } from '@tanstack/react-router'
import { Headphones, MessageSquareText, Repeat } from 'lucide-react'

import { Button } from '@/shared/ui/button'
import { Logo } from '@/shared/ui/logo'

const FEATURES = [
  { icon: Headphones, title: 'Hear ATC', text: 'Realistic VFR calls at Poznań and Piła.' },
  { icon: MessageSquareText, title: 'Answer by voice', text: 'Instant feedback on every required element.' },
  { icon: Repeat, title: 'Retry and improve', text: 'Short drills you can repeat until they stick.' },
]

/** Placeholder for the future landing page. */
export const LandingPage = () => (
  <div className="flex min-h-dvh flex-col items-center justify-center gap-10 bg-background px-4 py-12 text-center">
    <div className="flex flex-col items-center gap-4">
      <Logo className="size-20" />
      <h1 className="max-w-xl text-4xl font-bold tracking-tight sm:text-5xl">
        Practice VFR radio calls before you fly
      </h1>
      <p className="max-w-md text-muted-foreground">
        Listen to ATC, respond by voice and fix your phraseology mistakes in minutes.
      </p>
      <Button size="lg" className="mt-2 px-8" render={<Link to="/lessons" />}>
        Start training
      </Button>
    </div>
    <div className="grid max-w-3xl gap-4 sm:grid-cols-3">
      {FEATURES.map(({ icon: Icon, title, text }) => (
        <div key={title} className="rounded-xl bg-card p-5 ring-1 ring-foreground/10">
          <Icon className="mx-auto mb-2 size-6 text-primary" />
          <p className="font-semibold">{title}</p>
          <p className="text-sm text-muted-foreground">{text}</p>
        </div>
      ))}
    </div>
  </div>
)
