import { useMutation, useQueryClient } from '@tanstack/react-query'

import { apiClient } from '@/shared/api'

import { meKeys } from './me-keys'

export const useRegisterUserProfileMutation = (uid: string) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (payload: { acceptTerms: true; name?: string }) => {
      const { data, error } = await apiClient.POST('/me', { body: payload })
      if (error || !data) {
        throw new Error('Could not finish registration')
      }
      return data
    },
    onSuccess: (data) => {
      queryClient.setQueryData(meKeys.profile(uid), data)
    },
  })
}
