import { Link } from '@tanstack/react-router'

import { Button } from '@/shared/ui/button'

export const FinalCta = () => (
  <section className="mx-auto flex w-full max-w-6xl flex-col items-center gap-5 px-4 py-16 text-center sm:px-6 lg:py-24">
    <h2 className="max-w-lg text-3xl font-bold tracking-tight sm:text-4xl">
      Be radio-ready before you reach the cockpit
    </h2>
    <p className="max-w-md text-muted-foreground">
      A few minutes of practice is enough to notice what you keep forgetting to say.
    </p>
    <Button size="lg" className="px-8" render={<Link to="/lessons" />}>
      Start training
    </Button>
  </section>
)
