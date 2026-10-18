import { queryOptions } from '@tanstack/react-query'

import { apiClient } from '@/shared/api'

const STORAGE_KEY = 'aerospeak.guestId'

const readStoredGuestId = () => {
  try {
    return localStorage.getItem(STORAGE_KEY)
  } catch {
    return null
  }
}

const storeGuestId = (guestId: string) => {
  try {
    localStorage.setItem(STORAGE_KEY, guestId)
  } catch {
    // Private mode: the guest id lives only for this session.
  }
}

/** Returns the backend guest id, creating one on first use. Kept in localStorage across reloads. */
const fetchGuestId = async () => {
  const stored = readStoredGuestId()
  if (stored) {
    return stored
  }

  const { data, error } = await apiClient.POST('/guests')
  if (error || !data) {
    throw new Error('Could not start a guest session')
  }
  storeGuestId(data.guestId)
  return data.guestId
}

export const guestQueryOptions = () =>
  queryOptions({
    queryKey: ['guest'] as const,
    queryFn: fetchGuestId,
    staleTime: Infinity,
    gcTime: Infinity,
  })
