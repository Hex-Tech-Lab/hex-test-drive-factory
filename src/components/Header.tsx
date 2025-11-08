'use client';

import { AppBar, Toolbar, Typography, IconButton, Badge, Button, Container } from '@mui/material';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import { useLanguageStore } from '@/stores/language-store';
import { useCompareStore } from '@/stores/compare-store';
import { useRouter } from 'next/navigation';

export default function Header() {
  const language = useLanguageStore((state) => state.language);
  const setLanguage = useLanguageStore((state) => state.setLanguage);
  const compareItems = useCompareStore((state) => state.compareItems);
  const router = useRouter();

  const toggleLanguage = () => {
    const newLang = language === 'ar' ? 'en' : 'ar';
    setLanguage(newLang);
    router.push(`/${newLang}`);
  };

  const goToCompare = () => {
    router.push(`/${language}/compare`);
  };

  return (
    <AppBar position="sticky" color="default" elevation={1}>
      <Container maxWidth="xl">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 600 }}>
            {language === 'ar' ? 'منصة اختبار القيادة' : 'Test Drive Platform'}
          </Typography>

          <Button
            variant="outlined"
            onClick={toggleLanguage}
            sx={{ mr: 2 }}
          >
            {language === 'ar' ? 'English' : 'العربية'}
          </Button>

          <IconButton color="primary" onClick={goToCompare}>
            <Badge badgeContent={compareItems.length} color="error">
              <CompareArrowsIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
