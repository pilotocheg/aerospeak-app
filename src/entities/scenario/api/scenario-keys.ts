export const scenarioKeys = {
  all: ['scenarios'] as const,
  packs: () => [...scenarioKeys.all, 'packs'] as const,
  detail: (id: string) => [...scenarioKeys.all, 'detail', id] as const,
  deployed: (id: string) => [...scenarioKeys.all, 'deployed', id] as const,
}
