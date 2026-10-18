import { useProgressStore } from './progress-store'

export const useRecordScenarioResult = () => useProgressStore((state) => state.recordScenarioResult)
