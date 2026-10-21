import { createFileRoute } from '@tanstack/react-router'

import { TermsAndConditionsPage } from '@/pages/legal/terms-and-conditions-page'

export const Route = createFileRoute('/terms-and-conditions')({
  component: TermsAndConditionsPage,
})
