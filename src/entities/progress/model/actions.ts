import { useProgressStore } from './progress-store'

export const useRecordScenarioResult = () => useProgressStore((state) => state.recordScenarioResult)

/** Called on sign-in: keeps progress per account (see setOwner). */
export const setProgressOwner = (uid: string) => useProgressStore.getState().setOwner(uid)
