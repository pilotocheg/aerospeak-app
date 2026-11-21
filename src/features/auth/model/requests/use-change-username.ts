import { useMutation, useQueryClient } from '@tanstack/react-query'

import { meKeys } from '@/entities/user'
import { apiClient } from '@/shared/api'

import { changeCurrentUserUsername } from '../../api'
import { useAuthStore } from '../auth-store'

type ChangeUsernameInput = {
  username: string
}

export const useChangeUsername = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ username }: ChangeUsernameInput) => {
      const { error } = await apiClient.PATCH('/me', { body: { name: username } })
      if (error) {
        throw new Error('Could not update username')
      }
      await changeCurrentUserUsername(username)
    },
    onSuccess: (_, { username }) => {
      const { user, setAuthenticatedUser } = useAuthStore.getState()
      if (user) {
        setAuthenticatedUser({ ...user, name: username })
      }
      void queryClient.invalidateQueries({ queryKey: meKeys.all })
    },
  })
}
