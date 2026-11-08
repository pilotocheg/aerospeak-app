import { Link } from '@tanstack/react-router'

import { Button } from '@/shared/ui/button'

import { AeroSpeakPreview } from './aerospeak-preview'

export const Hero = () => (
  <section className="mx-auto grid w-full max-w-6xl items-center gap-12 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:py-24">
    <div className="flex flex-col items-center gap-5 text-center lg:items-start lg:text-left">
      <h1 className="max-w-xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
        Practice VFR radio calls before you fly
      </h1>
      <p className="max-w-md text-lg text-muted-foreground">
        Listen to ATC, respond by voice and fix your phraseology mistakes in minutes. Every call follows ICAO standard
        phraseology.
      </p>
      <div className="mt-2 flex flex-wrap justify-center gap-3 lg:justify-start">
        <Button size="lg" className="px-8" render={<Link to="/lessons" />}>
          Start training
        </Button>
        <Button size="lg" variant="outline" render={<Link to="/register" />}>
          Create account
        </Button>
      </div>
    </div>

    <div className="flex justify-center lg:justify-end">
      <AeroSpeakPreview />
    </div>
  </section>
)
