/**
 * The account progress failed to load and there is nothing to show instead. A failed background
 * refetch keeps the last (possibly persisted) progress, which is shown rather than an error.
 */
export const isProgressUnavailable = (isError: boolean, hasProgress: boolean) => isError && !hasProgress
