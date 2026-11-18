import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'

import { PracticePage } from '@/pages/practice/practice-page'

const searchSchema = z.object({
  /** Variant key (aerodrome, weather, aircraft) picked on the scenario page; the default one when absent. */
  variant: z.string().optional(),
})

export const Route = createFileRoute('/_app/practice/$scenarioId')({
  validateSearch: searchSchema,
  component: PracticePage,
})
