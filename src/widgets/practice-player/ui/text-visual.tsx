type TextVisualProps = {
  text: string
  caption?: string
}

/** Big centered item for drills: a letter, a number, a registration. */
export const TextVisual = ({ text, caption }: TextVisualProps) => (
  <div className="flex min-h-0 flex-1 flex-col items-center justify-center gap-3 bg-sky-950/40 px-4 text-center">
    <p className="text-6xl font-bold tracking-wide text-slate-200 tabular-nums sm:text-8xl">{text}</p>
    {caption && <p className="text-lg text-muted-foreground">{caption}</p>}
  </div>
)
