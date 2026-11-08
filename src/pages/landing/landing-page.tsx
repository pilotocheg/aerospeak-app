import { Features } from './ui/features'
import { FinalCta } from './ui/final-cta'
import { Footer } from './ui/footer'
import { Header } from './ui/header'
import { Hero } from './ui/hero'
import { HowItWorks } from './ui/how-it-works'
import { Languages } from './ui/languages'

export const LandingPage = () => (
  <div className="flex min-h-dvh flex-col bg-background text-foreground">
    <Header />
    <main className="flex-1">
      <Hero />
      <HowItWorks />
      <Languages />
      <Features />
      <FinalCta />
    </main>
    <Footer />
  </div>
)
