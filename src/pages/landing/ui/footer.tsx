import { Link } from '@tanstack/react-router'

import { Logo } from '@/shared/ui/logo'

const FOOTER_LINKS = [{ label: "FAQ's", href: '#' }]

const LEGAL_LINKS = [{ label: 'Privacy policy', to: '/privacy-policy' }] as const

export const Footer = () => (
  <footer className="border-t border-foreground/10">
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-8 text-sm text-muted-foreground sm:px-6">
      <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
        <Link to="/" className="flex items-center gap-2 font-semibold text-foreground">
          <Logo className="size-7" />
          AeroSpeak
        </Link>

        <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-2">
          {FOOTER_LINKS.map(({ label, href }) => (
            <a key={label} href={href} className="hover:text-foreground">
              {label}
            </a>
          ))}
          {LEGAL_LINKS.map(({ label, to }) => (
            <Link key={label} to={to} className="hover:text-foreground">
              {label}
            </Link>
          ))}
        </nav>
      </div>

      <div className="flex flex-col justify-between gap-2 border-t border-foreground/10 pt-6 text-xs sm:flex-row">
        <p>© {new Date().getFullYear()} AeroSpeak</p>
        <p>For training only. Not a substitute for flight instruction.</p>
      </div>
    </div>
  </footer>
)
