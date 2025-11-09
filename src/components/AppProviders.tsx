'use client';

import { ThemeProvider, CssBaseline } from '@mui/material';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { prefixer } from 'stylis';
import rtlPlugin from 'stylis-plugin-rtl';
import { getTheme } from '@/lib/theme';
import { useLanguageStore } from '@/stores/language-store';
import { useEffect, useState } from 'react';

const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
});

const cacheLtr = createCache({
  key: 'muiltr',
  stylisPlugins: [prefixer],
});

export default function AppProviders({ children }: { children: React.ReactNode }) {
  const language = useLanguageStore((state) => state.language);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    document.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  if (!mounted) {
    return null;
  }

  const theme = getTheme(language);
  const cache = language === 'ar' ? cacheRtl : cacheLtr;

  return (
    <CacheProvider value={cache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </CacheProvider>
  );
}
