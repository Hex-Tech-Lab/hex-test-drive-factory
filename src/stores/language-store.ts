import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface LanguageStore {
  language: 'ar' | 'en';
  setLanguage: (lang: 'ar' | 'en') => void;
}

export const useLanguageStore = create<LanguageStore>()(
  persist(
    (set) => ({
      language: 'ar',
      setLanguage: (lang) => set({ language: lang }),
    }),
    {
      name: 'language-storage', // localStorage key
    }
  )
);
