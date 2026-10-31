import { useState } from 'react'
import { apiClient } from '@/shared/api'
import { useRegisterProfileMutation } from '@/entities/user/api/me-queries'

export const useSyncProfile = () => {
  const [needsTerms, setNeedsTerms] = useState(false)
  const registerProfile = useRegisterProfileMutation()

  const checkAndSyncProfile = async () => {
    const { error } = await apiClient.GET('/me')

    if (error) {
      if (error.code === 'profile_not_found') {
        setNeedsTerms(true)
        return false
      }
      throw error
    }

    return true
  }

  const acceptTermsAndRegister = async (name?: string) => {
    await registerProfile.mutateAsync({
      acceptTerms: true,
      name,
    })
    setNeedsTerms(false)
  }

  return {
    needsTerms,
    checkAndSyncProfile,
    acceptTermsAndRegister,
    isRegistering: registerProfile.isPending,
  }
}