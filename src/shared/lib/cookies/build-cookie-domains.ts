/**
 * Lists the domains a cookie for this host may have been set on: the host itself and each parent
 * domain (`app.example.com` → `app.example.com`, `.app.example.com`, `.example.com`). A cookie can
 * only be deleted with the domain it was set on, and scripts such as gtag pick the widest one allowed.
 */
export const buildCookieDomains = (hostname: string): string[] => {
  const labels = hostname.split('.')
  const parentDomains = labels.slice(0, -1).map((_, index) => `.${labels.slice(index).join('.')}`)
  return [hostname, ...parentDomains]
}
