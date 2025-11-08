import { create } from 'zustand';
import { Vehicle } from '@/lib/mock-data';

interface CompareStore {
  compareItems: Vehicle[];
  addToCompare: (vehicle: Vehicle) => void;
  removeFromCompare: (vehicleId: string) => void;
  clearCompare: () => void;
}

export const useCompareStore = create<CompareStore>((set) => ({
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
}));
