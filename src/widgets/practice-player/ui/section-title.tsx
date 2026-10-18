type SectionTitleProps = {
  children: string
}

export const SectionTitle = ({ children }: SectionTitleProps) => (
  <h3 className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">{children}</h3>
)
