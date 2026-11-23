import { createFileRoute } from '@tanstack/react-router'

import { StatisticPage } from '@/pages/statistic/statistic-page'

export const Route = createFileRoute('/_app/statistic')({
  component: StatisticPage,
})
