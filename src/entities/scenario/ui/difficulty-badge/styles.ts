import { cva } from 'class-variance-authority'

/** Easy reads green, medium amber, hard red; tinted so the text stays readable in both themes. */
export const difficultyBadgeVariants = cva('capitalize', {
  variants: {
    difficulty: {
      easy: 'border-green-500/40 bg-green-500/15 text-green-700 dark:text-green-400',
      medium: 'border-amber-500/40 bg-amber-500/15 text-amber-700 dark:text-amber-400',
      hard: 'border-red-500/40 bg-red-500/15 text-red-700 dark:text-red-400',
    },
  },
})
