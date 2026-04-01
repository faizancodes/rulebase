import { create } from "zustand";

import type { AlertItem, AlertRule } from "@/lib/types";

interface AlertState {
  rules: AlertRule[];
  alerts: AlertItem[];
  unreadCount: number;
  isLoading: boolean;
  setRules: (rules: AlertRule[]) => void;
  addRule: (rule: AlertRule) => void;
  toggleRule: (id: string) => void;
  removeRule: (id: string) => void;
  setAlerts: (alerts: AlertItem[]) => void;
  addAlert: (alert: AlertItem) => void;
  markAlertRead: (id: string) => void;
  markAllRead: () => void;
  setLoading: (isLoading: boolean) => void;
}

export const useAlertStore = create<AlertState>((set, get) => ({
  rules: [],
  alerts: [],
  unreadCount: 0,
  isLoading: false,
  setRules: (rules) => set({ rules }),
  addRule: (rule) => set((state) => ({ rules: [rule, ...state.rules] })),
  toggleRule: (id) =>
    set((state) => ({
      rules: state.rules.map((rule) => (rule.id === id ? { ...rule, isActive: !rule.isActive } : rule)),
    })),
  removeRule: (id) => set((state) => ({ rules: state.rules.filter((rule) => rule.id !== id) })),
  setAlerts: (alerts) => set({ alerts, unreadCount: alerts.filter((alert) => !alert.read).length }),
  addAlert: (alert) =>
    set((state) => ({
      alerts: [alert, ...state.alerts],
      unreadCount: state.unreadCount + (alert.read ? 0 : 1),
    })),
  markAlertRead: (id) =>
    set((state) => ({
      alerts: state.alerts.map((alert) => (alert.id === id ? { ...alert, read: true } : alert)),
      unreadCount: Math.max(0, state.unreadCount - 1),
    })),
  markAllRead: () =>
    set((state) => ({
      alerts: state.alerts.map((alert) => ({ ...alert, read: true })),
      unreadCount: 0,
    })),
  setLoading: (isLoading) => set({ isLoading }),
}));