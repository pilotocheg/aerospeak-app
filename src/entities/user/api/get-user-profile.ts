import { queryOptions } from '@tanstack/react-query'

import { apiClient, type MeDto } from '@/shared/api'

import { meKeys } from './me-keys'

/** The backend profile, or null while registration is not finished (`POST /me` was never called). */
export const getUserProfile = async (): Promise<MeDto | null> => {
  const { data, response } = await apiClient.GET('/me')
  if (response.status === 404) {
    return null
  }
  if (!data) {
    throw new Error('Could not load your profile')
  }
  return data
}

export const getUserProfileQueryOptions = (uid: string) =>
  queryOptions({
    queryKey: meKeys.profile(uid),
    queryFn: getUserProfile,
    staleTime: 5 * 60_000,
  })
