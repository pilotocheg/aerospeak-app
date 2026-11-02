import { useMutation, useQueryClient } from '@tanstack/react-query'

import { apiClient } from '@/shared/api'

import { meKeys } from './me-keys'

export const useGrantVoiceConsentMutation = (uid: string) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async () => {
      const { data, error } = await apiClient.POST('/me/voice-consent')
      if (error || !data) {
        throw new Error('Could not grant voice consent')
      }
      return data
    },
    onSuccess: (data) => {
      queryClient.setQueryData(meKeys.profile(uid), data)
    },
  })
}
