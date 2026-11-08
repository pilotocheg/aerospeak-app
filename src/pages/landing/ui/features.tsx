import { Dot, Headset, MapPinned, Mic, NotebookPen } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

import { Logo } from '@/shared/ui/logo'

const FEATURES: { icon: LucideIcon; title: string; description: string; shorts: string[] }[] = [
  {
    icon: Mic,
    title: 'Practice on your schedule',
    description:
      'Practice VFR radio calls whenever you have a few free minutes. Listen to the instruction from ATC, answer out loud and see how you did right away. No instructor or aircraft needed.',
    shorts: ['Answer by voice', 'Short, self-guided sessions', 'Instant feedback'],
  },
  {
    icon: MapPinned,
    title: 'Fly the circuit at Poznań and Piła',
    description:
      'Train on the airfields you actually fly from. Each scenario puts you in a realistic VFR situation, so you know what to expect from ATC before you start the engine.',
    shorts: ['Poznań and Piła', 'Realistic VFR calls', 'Hear ATC, then reply'],
  },
  {
    icon: Headset,
    title: 'Learn the right phraseology',
    description:
      'Every ATC call has required elements, and missing one is easy when you are busy flying. Our phraseology follows ICAO standards, and after each reply you see what you said correctly and what you left out.',
    shorts: ['Check on every required element', 'Missed items highlighted', 'Clear corrections to learn from'],
  },
  {
    icon: NotebookPen,
    title: 'Build radio habits that stick',
    description:
      'Repeat a drill until the right words come out without thinking. A few minutes of practice before a flight is enough to make your calls shorter, clearer and more confident.',
    shorts: ['Short drills you can repeat', 'Progress in minutes, not hours', 'Calm, confident radio calls'],
  },
]

export const Features = () => (
  <section aria-labelledby="features" className="border-y border-foreground/10 bg-card/40">
    <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
      <h2 id="features" className="flex items-center gap-3 text-3xl font-bold tracking-tight sm:text-4xl">
        <Logo className="size-9" />
        AeroSpeak features
      </h2>

      <ul className="mt-12 grid gap-10 sm:grid-cols-2 sm:gap-12">
        {FEATURES.map(({ icon: Icon, title, description, shorts }) => (
          <li key={title} className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <span className="flex size-10 items-center justify-center rounded-xl bg-brand/10 text-brand">
                <Icon className="size-5" aria-hidden />
              </span>
              <h3 className="text-lg font-semibold">{title}</h3>
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">{description}</p>
            <ul className="flex flex-col gap-1.5">
              {shorts.map((short) => (
                <li key={short} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Dot className="size-5 shrink-0 text-brand" aria-hidden />
                  {short}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  </section>
)
