import { create } from 'zustand'

type SidebarState = {
  isOpen: boolean
  open: () => void
  close: () => void
}

/** Mobile drawer state; on desktop the sidebar is always visible. */
export const useSidebarStore = create<SidebarState>()((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}))
