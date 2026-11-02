import { useMutation, useQueryClient } from '@tanstack/react-query'

import { apiClient } from '@/shared/api'

import { meKeys } from './me-keys'

export const useDeleteUserAccountMutation = (uid: string) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async () => {
      const { error } = await apiClient.DELETE('/me')
      if (error) {
        throw new Error('Could not delete account')
      }
    },
    onSuccess: () => {
      queryClient.setQueryData(meKeys.profile(uid), null)
    },
  })
}
