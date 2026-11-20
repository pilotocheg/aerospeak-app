import createClient from 'openapi-fetch'

import { API_URL } from '@/shared/config/env'

import { getAuthHeaders } from './get-auth-headers'
import type { paths } from './schema'

export const apiClient = createClient<paths>({ baseUrl: API_URL })

apiClient.use({
  async onRequest({ request }) {
    for (const [name, value] of Object.entries(await getAuthHeaders())) {
      request.headers.set(name, value)
    }
    return request
  },
})
