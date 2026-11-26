import { isAnalyticsConfigured } from '@/shared/lib/firebase'

import { useResetAnalyticsConsent } from '../model/actions'

type CookieSettingsButtonProps = {
  className?: string
}

/** Opens the consent banner again, so a visitor without an account can change their analytics choice. */
export const CookieSettingsButton = ({ className }: CookieSettingsButtonProps) => {
  const resetConsent = useResetAnalyticsConsent()

  if (!isAnalyticsConfigured()) return null

  return (
    <button type="button" onClick={resetConsent} className={className}>
      Cookie settings
    </button>
  )
}
