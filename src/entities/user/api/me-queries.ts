import { queryOptions, useMutation, useQueryClient } from '@tanstack/react-query'

import { apiClient, type MeDto } from '@/shared/api'

// Keyed by the Firebase uid, so a cached profile never leaks to the next account in this browser.
export const meKeys = {
  all: ['me'] as const,
  profile: (uid: string) => [...meKeys.all, uid] as const,
}

/** The backend profile, or null while registration is not finished (`POST /me` never called). */
const fetchProfile = async (): Promise<MeDto | null> => {
  const { data, response } = await apiClient.GET('/me')
  if (response.status === 404) {
    return null
  }
  if (!data) {
    throw new Error('Could not load your profile')
  }
  return data
}

export const meQueryOptions = (uid: string) =>
  queryOptions({
    queryKey: meKeys.profile(uid),
    queryFn: fetchProfile,
    staleTime: 5 * 60_000,
  })

export const useRegisterProfileMutation = (uid: string) => {
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

export const useVoiceConsentMutation = (uid: string) => {
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

export const useDeleteAccountMutation = (uid: string) => {
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
