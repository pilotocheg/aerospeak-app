import { Button } from '@/shared/ui/button'

import { useDenyAnalyticsConsent, useGrantAnalyticsConsent } from '../model/actions'
import { useAnalyticsConsent } from '../model/selectors'

export const AnalyticsConsentSetting = () => {
  const consent = useAnalyticsConsent()
  const grantConsent = useGrantAnalyticsConsent()
  const denyConsent = useDenyAnalyticsConsent()
  const isGranted = consent === 'granted'

  const status = isGranted
    ? 'Google Analytics cookies are allowed in this browser.'
    : 'Google Analytics cookies are off in this browser.'
  const toggleLabel = isGranted ? 'Turn off analytics' : 'Allow analytics'
  const handleToggle = isGranted ? denyConsent : grantConsent

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm text-muted-foreground">{status}</p>
      <Button variant="outline" onClick={handleToggle}>
        {toggleLabel}
      </Button>
    </div>
  )
}
