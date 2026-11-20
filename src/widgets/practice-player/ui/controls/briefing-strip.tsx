import type { BriefingItemDto } from '@/shared/api'

const STRIP_LABELS = ['Callsign', 'Station', 'ATIS', 'Runway', 'Wind', 'QNH', 'Frequency']

type BriefingStripProps = {
  briefing: BriefingItemDto[]
}

export const BriefingStrip = ({ briefing }: BriefingStripProps) => {
  const items = STRIP_LABELS.map((label) => briefing.find((item) => item.label === label)).filter(
    (item) => item !== undefined,
  )

  if (!items.length) {
    return null
  }

  return (
    <div className="flex shrink-0 gap-6 overflow-x-auto bg-primary px-4 py-2 text-primary-foreground sm:gap-10 sm:px-8">
      {items.map((item) => (
        <div key={item.label} className="shrink-0 text-center">
          <p className="text-[11px] tracking-wide uppercase opacity-80">{item.label}</p>
          <p className="font-semibold whitespace-nowrap">{item.value}</p>
        </div>
      ))}
    </div>
  )
}
