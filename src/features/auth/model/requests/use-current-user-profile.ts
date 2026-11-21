import { useQuery } from '@tanstack/react-query'

import { getUserProfileQueryOptions } from '@/entities/user'

import { useUser } from '../selectors'

/** The signed-in user's backend profile (`GET /me`); idle while signed out. */
export const useCurrentUserProfile = () => {
  const user = useUser()
  return useQuery({ ...getUserProfileQueryOptions(user?.id ?? ''), enabled: Boolean(user) })
}
