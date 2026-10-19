import { useSidebarStore } from './sidebar-store'

export const useIsSidebarOpen = () => useSidebarStore((state) => state.isOpen)
