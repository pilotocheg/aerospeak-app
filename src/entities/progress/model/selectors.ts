import { useProgressStore } from './progress-store'

export const useScenarioProgress = (scenarioId: string) => useProgressStore((state) => state.byScenario[scenarioId])

export const useAllProgress = () => useProgressStore((state) => state.byScenario)
