import { create } from "zustand";

interface AlertState {
  unreadCount: number;
  setUnreadCount: (count: number) => void;
  markAllRead: () => void;
}

export const useAlertStore = create<AlertState>((set) => ({
  unreadCount: 0,
  setUnreadCount: (count) => set({ unreadCount: count }),
  markAllRead: () => set({ unreadCount: 0 }),
}));