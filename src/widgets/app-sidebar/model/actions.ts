import { useSidebarStore } from './sidebar-store'

export const useOpenSidebar = () => useSidebarStore((state) => state.open)

export const useCloseSidebar = () => useSidebarStore((state) => state.close)
