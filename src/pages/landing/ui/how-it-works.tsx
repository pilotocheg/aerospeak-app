import { Headphones, MessageSquareText, Repeat } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

const STEPS: { icon: LucideIcon; title: string; description: string }[] = [
  {
    icon: Headphones,
    title: 'Hear ATC',
    description: 'Realistic VFR calls at Poznań and Piła. Listen to the instruction as you would in the cockpit.',
  },
  {
    icon: MessageSquareText,
    title: 'Answer by voice',
    description: 'Say your reply out loud. You get instant feedback on every required element.',
  },
  {
    icon: Repeat,
    title: 'Retry and improve',
    description: 'Short drills you can repeat until they stick.',
  },
]

export const HowItWorks = () => (
  <section aria-labelledby="how-it-works" className="border-y border-foreground/10 bg-card/40">
    <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 lg:py-20">
      <h2 id="how-it-works" className="max-w-md text-2xl font-bold tracking-tight sm:text-3xl">
        Your personal radio comms instructor
      </h2>
      <ol className="mt-10 grid gap-10 sm:grid-cols-3 sm:gap-8">
        {STEPS.map(({ icon: Icon, title, description }, i) => (
          <li key={title} className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <span className="flex size-10 items-center justify-center rounded-xl bg-brand/10 text-brand">
                <Icon className="size-5" aria-hidden />
              </span>
              <span className="text-sm text-muted-foreground">Step {i + 1}</span>
            </div>
            <h3 className="text-lg font-semibold">{title}</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">{description}</p>
          </li>
        ))}
      </ol>
    </div>
  </section>
)
