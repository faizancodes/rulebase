import { create } from "zustand";

interface CompareState {
  selectedIds: string[];
  leftId: string;
  rightId: string;
  addToCompare: (id: string) => void;
  removeFromCompare: (id: string) => void;
  clearCompare: () => void;
  setLeftId: (id: string) => void;
  setRightId: (id: string) => void;
  swap: () => void;
}

export const useCompareStore = create<CompareState>((set) => ({
  selectedIds: [],
  leftId: "",
  rightId: "",
  addToCompare: (id) => set((state) => ({ selectedIds: state.selectedIds.includes(id) ? state.selectedIds : [...state.selectedIds, id] })),
  removeFromCompare: (id) => set((state) => ({ selectedIds: state.selectedIds.filter((item) => item !== id) })),
  clearCompare: () => set({ selectedIds: [], leftId: "", rightId: "" }),
  setLeftId: (id) => set({ leftId: id }),
  setRightId: (id) => set({ rightId: id }),
  swap: () => set((state) => ({ leftId: state.rightId, rightId: state.leftId })),
}));
