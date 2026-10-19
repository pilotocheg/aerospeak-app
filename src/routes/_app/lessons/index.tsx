import { createFileRoute } from '@tanstack/react-router'

import { LessonsHomePage } from '@/pages/lessons-home/lessons-home-page'

export const Route = createFileRoute('/_app/lessons/')({
  component: LessonsHomePage,
})
