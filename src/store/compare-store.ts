import { create } from "zustand";

interface CompareState {
  leftId: string;
  rightId: string;
  setLeftId: (id: string) => void;
  setRightId: (id: string) => void;
  swap: () => void;
}

export const useCompareStore = create<CompareState>((set) => ({
  leftId: "",
  rightId: "",
  setLeftId: (id) => set({ leftId: id }),
  setRightId: (id) => set({ rightId: id }),
  swap: () => set((state) => ({ leftId: state.rightId, rightId: state.leftId })),
}));