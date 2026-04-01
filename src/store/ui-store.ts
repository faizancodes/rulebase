import { create } from "zustand";

interface UiState {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  toggleSidebar: () => void;
  activeSource: "all" | "federal-register" | "congress" | "sec";
  setActiveSource: (source: UiState["activeSource"]) => void;
}

export const useUiStore = create<UiState>((set) => ({
  sidebarOpen: true,
  activeSource: "all",
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  setActiveSource: (activeSource) => set({ activeSource }),
}));