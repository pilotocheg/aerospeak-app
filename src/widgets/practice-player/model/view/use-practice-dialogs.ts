import { useState } from 'react'

type PracticeDialog = 'help' | 'feedback'

/** One practice dialog open at a time: help or feedback. */
export const usePracticeDialogs = () => {
  const [openDialog, setOpenDialog] = useState<PracticeDialog | null>(null)

  const openHelp = () => setOpenDialog('help')

  const openFeedback = () => setOpenDialog('feedback')

  const closeDialog = () => setOpenDialog(null)

  /** For a dialog's `onOpenChange`: opening shows it, closing closes whichever is open. */
  const toggleDialog = (dialog: PracticeDialog) => (open: boolean) => {
    setOpenDialog(open ? dialog : null)
  }

  return {
    isAnyDialogOpen: openDialog !== null,
    isHelpOpen: openDialog === 'help',
    isFeedbackOpen: openDialog === 'feedback',
    openHelp,
    openFeedback,
    closeDialog,
    toggleDialog,
  }
}
