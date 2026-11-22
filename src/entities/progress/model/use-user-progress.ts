import { useQuery } from '@tanstack/react-query'

import { getProgressQueryOptions } from '@/entities/progress/api'

export const useUserProgress = (uid: string) => {
  return useQuery({
    ...getProgressQueryOptions(uid),
    enabled: Boolean(uid),
  })
}
