import createClient from 'openapi-fetch'

import { API_URL } from '@/shared/config/env'

import { getAuthHeaders } from './get-auth-headers'
import type { paths } from './schema'

export const apiClient = createClient<paths>({ baseUrl: API_URL })

apiClient.use({
  async onRequest({ request }) {
    const authHeaders = await getAuthHeaders()
    const authHeaderEntries = Object.entries(authHeaders)
    for (const [headerName, headerValue] of authHeaderEntries) {
      request.headers.set(headerName, headerValue)
    }
    return request
  },
})
