import { usePracticeStore } from './practice-store'

export const useStartPractice = () => usePracticeStore((state) => state.start)

export const useGoToStep = () => usePracticeStore((state) => state.goToStep)

export const useAddAttempt = () => usePracticeStore((state) => state.addAttempt)

export const useFinishPractice = () => usePracticeStore((state) => state.finish)
