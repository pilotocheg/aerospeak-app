import { useMutation, useQueryClient } from '@tanstack/react-query'

import { meKeys } from '@/entities/user'
import { apiClient } from '@/shared/api'

import { deleteCurrentFirebaseUser, reauthenticateCurrentUser } from '../../api'
import { useAuthStore } from '../auth-store'

type DeleteAccountInput = {
  password?: string
}

/** Confirms identity, deletes the backend profile (`DELETE /me`), then the Firebase account. */
export const useDeleteAccount = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ password }: DeleteAccountInput) => {
      const { user, clearAuthenticatedUser } = useAuthStore.getState()

      await reauthenticateCurrentUser(password)

      const { error } = await apiClient.DELETE('/me')
      if (error) {
        throw new Error('Could not delete account')
      }

      // Clear the user first so the terms dialog does not flash for the now empty profile.
      clearAuthenticatedUser()
      if (user) {
        queryClient.removeQueries({ queryKey: meKeys.profile(user.id) })
      }
      await deleteCurrentFirebaseUser()
    },
  })
}
