import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Vehicle } from '@/types/vehicle';

interface CompareStore {
  compareItems: Vehicle[];
  addToCompare: (vehicle: Vehicle) => void;
  removeFromCompare: (vehicleId: string) => void;
  clearCompare: () => void;
}

export const useCompareStore = create<CompareStore>()(
  persist(
    (set) => ({
      compareItems: [],
      addToCompare: (vehicle) => {
        set((state) => ({
          compareItems: [...state.compareItems, vehicle],
        }));
      },
      removeFromCompare: (vehicleId) => {
        set((state) => ({
          compareItems: state.compareItems.filter(v => v.id !== vehicleId),
        }));
      },
      clearCompare: () => {
        set({ compareItems: [] });
      },
    }),
    {
      name: 'compare-storage', // localStorage key
    }
  )
);
