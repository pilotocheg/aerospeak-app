export const attemptKeys = {
  all: ['attempts'] as const,
  list: (uid: string, limit: number) => [...attemptKeys.all, uid, 'list', limit] as const,
}