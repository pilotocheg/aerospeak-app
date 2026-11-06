const LANGUAGES = ['Ukrainian', 'Polish', 'German', 'French', 'Italian', 'Spanish', 'Czech', 'Dutch', 'Swedish']

export const Languages = () => (
  <section
    aria-labelledby="languages"
    className="mx-auto flex w-full max-w-6xl flex-col items-center gap-5 px-4 py-16 text-center sm:px-6 lg:py-24"
  >
    <h2 id="languages" className="max-w-lg text-3xl font-bold tracking-tight sm:text-4xl">
      We support 20+ European languages
    </h2>
    <p className="max-w-2xl text-muted-foreground">
      Pilots in Europe speak English with every accent you can think of. Your radio trainer should understand all of
      them.
    </p>
    <p className="max-w-2xl text-muted-foreground">
      AeroSpeak recognizes English spoken with European accents and also works in other European languages, so you can
      practice the way you actually fly. Feedback is about what you said on the radio, not how you pronounced it.
    </p>
    <ul className="mx-auto mt-4 flex max-w-2xl flex-wrap justify-center gap-2">
      {LANGUAGES.map((name) => (
        <li key={name} className="rounded-full bg-card px-4 py-1.5 text-sm ring-1 ring-foreground/10">
          {name}
        </li>
      ))}
      <li className="rounded-full px-4 py-1.5 text-sm text-muted-foreground">+ more</li>
    </ul>
  </section>
)
