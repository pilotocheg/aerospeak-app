import { createFileRoute } from '@tanstack/react-router'

import { PracticePage } from '@/pages/practice/practice-page'

export const Route = createFileRoute('/practice/$scenarioId')({
  component: PracticePage,
})
