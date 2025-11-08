import { create } from 'zustand';

interface LanguageStore {
  language: 'ar' | 'en';
  setLanguage: (lang: 'ar' | 'en') => void;
}

export const useLanguageStore = create<LanguageStore>((set) => ({
  language: 'ar',
  setLanguage: (lang) => set({ language: lang }),
}));
