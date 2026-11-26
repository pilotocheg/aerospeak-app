import { buildCookieDomains } from './build-cookie-domains'

const EXPIRED = 'Thu, 01 Jan 1970 00:00:00 GMT'

/** Deletes the named cookies on every domain they could have been set on for this host. */
export const deleteCookies = (cookieNames: string[], hostname: string): void => {
  const cookieDomains = buildCookieDomains(hostname)

  for (const name of cookieNames) {
    document.cookie = `${name}=; expires=${EXPIRED}; path=/`
    for (const domain of cookieDomains) {
      document.cookie = `${name}=; expires=${EXPIRED}; path=/; domain=${domain}`
    }
  }
}
