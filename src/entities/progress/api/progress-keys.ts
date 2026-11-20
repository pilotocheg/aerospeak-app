export const progressKeys = {
  all: ['progress'] as const,
  detail: (uid: string) => [...progressKeys.all, uid] as const,
  daily: (uid: string, days: number, tz: string) => [...progressKeys.all, uid, 'daily', days, tz] as const,
}
