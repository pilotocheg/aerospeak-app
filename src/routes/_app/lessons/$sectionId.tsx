import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'

import { SectionPage } from '@/pages/section/section-page'

const searchSchema = z.object({
  scenario: z.string().optional(),
})

export const Route = createFileRoute('/_app/lessons/$sectionId')({
  validateSearch: searchSchema,
  component: SectionPage,
})
