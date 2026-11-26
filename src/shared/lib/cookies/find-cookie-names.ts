/** Returns the names of the cookies in a `document.cookie` string that start with the prefix. */
export const findCookieNames = (cookieString: string, prefix: string): string[] => {
  const cookieNames = cookieString.split(';').map((cookie) => cookie.split('=')[0].trim())
  return cookieNames.filter((name) => name.startsWith(prefix))
}
