import { create } from "zustand";

import type { SavedSearch, SearchParams } from "@/lib/types";

interface SearchState {
  query: string;
  filters: SearchParams;
  savedSearches: SavedSearch[];
  recentItemIds: string[];
  setQuery: (query: string) => void;
  setFilters: (filters: Partial<SearchParams>) => void;
  resetFilters: () => void;
  saveSearch: (search: SavedSearch) => void;
  removeSavedSearch: (id: string) => void;
  addRecentItem: (id: string) => void;
  clearQuery: () => void;
  selectedEntity: string | null;
  setSelectedEntity: (entity: string | null) => void;
}

const DEFAULT_FILTERS: SearchParams = {};

export const useSearchStore = create<SearchState>((set) => ({
  query: "",
  filters: DEFAULT_FILTERS,
  savedSearches: [],
  recentItemIds: [],
  setQuery: (query) => set({ query }),
  setFilters: (filters) => set((state) => ({ filters: { ...state.filters, ...filters } })),
  resetFilters: () => set({ filters: DEFAULT_FILTERS }),
  saveSearch: (search) => set((state) => ({ savedSearches: [search, ...state.savedSearches.filter((item) => item.id !== search.id)] })),
  removeSavedSearch: (id) => set((state) => ({ savedSearches: state.savedSearches.filter((item) => item.id !== id) })),
  addRecentItem: (id) => set((state) => ({ recentItemIds: [id, ...state.recentItemIds.filter((itemId) => itemId !== id)].slice(0, 10) })),
  clearQuery: () => set({ query: "", selectedEntity: null }),
  selectedEntity: null,
  setSelectedEntity: (selectedEntity) => set({ selectedEntity }),
}));
