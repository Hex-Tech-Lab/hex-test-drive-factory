'use client';

import { Container, Typography, Box, Button } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { useRouter } from 'next/navigation';

interface ErrorDisplayProps {
  error: {
    message: string;
    code?: string;
  };
  locale: string;
}

export default function ErrorDisplay({ error, locale }: ErrorDisplayProps) {
  const router = useRouter();
  const isArabic = locale === 'ar';

  const handleRetry = () => {
    router.refresh();
  };

  return (
    <Container maxWidth="md" sx={{ py: 8, textAlign: 'center' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
        <ErrorOutlineIcon sx={{ fontSize: 80, color: 'error.main' }} />
        
        <Typography variant="h4" gutterBottom>
          {isArabic ? 'فشل تحميل المركبات' : 'Failed to Load Vehicles'}
        </Typography>

        <Typography variant="body1" color="text.secondary">
          {isArabic 
            ? 'حدث خطأ أثناء جلب البيانات. يرجى المحاولة مرة أخرى.'
            : 'An error occurred while fetching data. Please try again.'}
        </Typography>

        {error.message && (
          <Box 
            sx={{ 
              bgcolor: 'error.light', 
              color: 'error.contrastText',
              p: 2, 
              borderRadius: 1,
              maxWidth: '100%',
              overflow: 'auto'
            }}
          >
            <Typography variant="body2" component="pre" sx={{ m: 0, whiteSpace: 'pre-wrap' }}>
              {error.code && `[${error.code}] `}
              {error.message}
            </Typography>
          </Box>
        )}

        <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
          <Button 
            variant="contained" 
            onClick={handleRetry}
            size="large"
          >
            {isArabic ? 'إعادة المحاولة' : 'Retry'}
          </Button>
          
          <Button 
            variant="outlined" 
            onClick={() => router.push(`/${locale}`)}
            size="large"
          >
            {isArabic ? 'الصفحة الرئيسية' : 'Go Home'}
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
