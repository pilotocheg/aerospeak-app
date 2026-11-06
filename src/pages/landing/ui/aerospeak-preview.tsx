import { Check, X } from 'lucide-react'

const CHECKS = [
  { label: 'Callsign', ok: true, note: 'SP-KLM' },
  { label: 'Landing clearance', ok: true, note: 'cleared to land' },
  { label: 'Runway', ok: false, note: 'Missing. Read back "runway 29".' },
]

export const AeroSpeakPreview = () => (
  <figure
    aria-label="Example of a practice drill"
    className="w-full max-w-md rounded-2xl bg-card p-5 ring-1 ring-foreground/10"
  >
    <div className="flex flex-col gap-4">
      <div className="max-w-[88%] rounded-2xl rounded-tl-sm bg-muted px-4 py-3 text-left">
        <p className="mb-1 text-xs text-muted-foreground">ATC</p>
        <p className="text-sm">SP-KLM, Poznań Tower, runway 29, cleared to land, wind 270 at 8 knots.</p>
      </div>

      <div className="ml-auto max-w-[88%] rounded-2xl rounded-tr-sm bg-brand/10 px-4 py-3 text-left ring-1 ring-brand/30">
        <p className="mb-1 text-xs text-muted-foreground">You</p>
        <p className="text-sm">Cleared to land, SP-KLM.</p>
      </div>

      <ul className="flex flex-col gap-2 border-t border-foreground/10 pt-4 text-left">
        {CHECKS.map(({ label, ok, note }) => (
          <li key={label} className="flex items-start gap-3 text-sm">
            <span
              className={
                ok
                  ? 'mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-400'
                  : 'mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-red-500/15 text-red-400'
              }
            >
              {ok ? (
                <Check className="size-3.5" aria-label="Correct" />
              ) : (
                <X className="size-3.5" aria-label="Missed" />
              )}
            </span>
            <span>
              <span className="font-medium">{label}</span>
              <span className="text-muted-foreground"> · {note}</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  </figure>
)
