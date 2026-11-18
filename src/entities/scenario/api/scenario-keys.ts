export const scenarioKeys = {
  all: ['scenarios'] as const,
  packs: () => [...scenarioKeys.all, 'packs'] as const,
  /** Without a variant: the default one, which also lists every variant key. */
  detail: (id: string, variant?: string) => [...scenarioKeys.all, 'detail', id, variant ?? 'default'] as const,
}
