import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface FilterState {
  brands: string[];
  categories: string[];
  priceRange: [number, number];
  setFilters: (filters: Partial<Omit<FilterState, 'setFilters' | 'resetFilters'>>) => void;
  resetFilters: () => void;
}

export const useFilterStore = create<FilterState>()(
  persist(
    (set) => ({
      brands: [],
      categories: [],
      priceRange: [0, 20_000_000],
      setFilters: (filters) => set((state) => ({ ...state, ...filters })),
      resetFilters: () => set({ brands: [], categories: [], priceRange: [0, 20_000_000] }),
    }),
    {
      name: 'vehicle-filters',
    }
  )
);
