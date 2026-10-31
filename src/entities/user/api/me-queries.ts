import { queryOptions, useMutation, useQueryClient } from '@tanstack/react-query'

import { apiClient } from '@/shared/api'

export const meKeys = {
  all: ['me'] as const,
  profile: () => [...meKeys.all, 'profile'] as const,
}

const fetchProfile = async () => {
  const { data, error } = await apiClient.GET('/me')

  if (error) {
    throw error
  }

  return data
}

export const meQueryOptions = () =>
  queryOptions({
    queryKey: meKeys.profile(),
    queryFn: fetchProfile,
    retry: (failureCount, error: unknown) => {
      if (typeof error === 'object' && error !== null && 'status' in error && error.status === 404) {
        return false
      }
      return failureCount < 3
    },
  })

export const useRegisterProfileMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (payload: { acceptTerms: true; name?: string }) => {
      const { data, error } = await apiClient.POST('/me', {
        body: payload,
      })
      if (error || !data) {
        throw new Error('Could not register user profile')
      }
      return data
    },
    onSuccess: (data) => {
      queryClient.setQueryData(meKeys.profile(), data)
    },
  })
}

export const useVoiceConsentMutation = () => {
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
      queryClient.setQueryData(meKeys.profile(), data)
    },
  })
}

export const useDeleteAccountMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async () => {
      const { error } = await apiClient.DELETE('/me')
      if (error) {
        throw new Error('Could not delete account')
      }
    },
    onSuccess: () => {
      queryClient.setQueryData(meKeys.profile(), null)
    },
  })
}