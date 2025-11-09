'use client';

import { useEffect } from 'react';
import { Container, Typography, Grid, Card, CardMedia, CardContent, Box, Button, IconButton, Table, TableBody, TableRow, TableCell, Divider } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Header from '@/components/Header';
import { useCompareStore } from '@/stores/compare-store';
import { useLanguageStore } from '@/stores/language-store';
import { useParams, useRouter } from 'next/navigation';

export default function ComparePage() {
  const params = useParams();
  const locale = params.locale as string;
  const router = useRouter();
  const language = useLanguageStore((state) => state.language);
  const setLanguage = useLanguageStore((state) => state.setLanguage);
  const { compareItems, removeFromCompare, clearCompare } = useCompareStore();

  useEffect(() => {
    if (locale === 'ar' || locale === 'en') {
      setLanguage(locale);
    }
  }, [locale, setLanguage]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat(language === 'ar' ? 'ar-EG' : 'en-US').format(price);
  };

  if (compareItems.length === 0) {
    return (
      <>
        <Header />
        <Container maxWidth="xl" sx={{ py: 4 }}>
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h5" gutterBottom>
              {language === 'ar' ? 'لا توجد مركبات للمقارنة' : 'No vehicles to compare'}
            </Typography>
            <Typography variant="body1" color="text.secondary" gutterBottom>
              {language === 'ar' ? 'أضف ما يصل إلى 3 مركبات للمقارنة' : 'Add up to 3 vehicles to compare'}
            </Typography>
            <Button
              variant="contained"
              startIcon={<ArrowBackIcon />}
              onClick={() => router.push(`/${language}`)}
              sx={{ mt: 2 }}
            >
              {language === 'ar' ? 'العودة إلى الكتالوج' : 'Back to Catalog'}
            </Button>
          </Box>
        </Container>
      </>
    );
  }

  return (
    <>
      <Header />
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4" sx={{ fontWeight: 600 }}>
            {language === 'ar' ? 'مقارنة المركبات' : 'Compare Vehicles'}
          </Typography>
          <Box>
            <Button
              startIcon={<ArrowBackIcon />}
              onClick={() => router.push(`/${language}`)}
              sx={{ mr: 2 }}
            >
              {language === 'ar' ? 'عودة' : 'Back'}
            </Button>
            <Button variant="outlined" color="error" onClick={clearCompare}>
              {language === 'ar' ? 'مسح الكل' : 'Clear All'}
            </Button>
          </Box>
        </Box>

        <Grid container spacing={3}>
          {compareItems.map((vehicle) => (
            <Grid item key={vehicle.id} xs={12} md={4}>
              <Card>
                <Box sx={{ position: 'relative' }}>
                  <IconButton
                    onClick={() => removeFromCompare(vehicle.id)}
                    sx={{
                      position: 'absolute',
                      top: 8,
                      right: language === 'ar' ? 'auto' : 8,
                      left: language === 'ar' ? 8 : 'auto',
                      zIndex: 1,
                      bgcolor: 'background.paper',
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                  <CardMedia
                    component="img"
                    height="200"
                    image={vehicle.models.hero_image_url || 'https://via.placeholder.com/800x600?text=No+Image'}
                    alt={`${vehicle.models.brands.name} ${vehicle.models.name}`}
                  />
                </Box>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {vehicle.models.brands.name} {vehicle.models.name}
                  </Typography>
                  <Typography variant="h5" color="primary" gutterBottom>
                    {formatPrice(vehicle.price_egp)} {language === 'ar' ? 'ج.م' : 'EGP'}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" gutterBottom>
            {language === 'ar' ? 'المواصفات' : 'Specifications'}
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Table>
            <TableBody>
              <TableRow>
                <TableCell><strong>{language === 'ar' ? 'السنة' : 'Year'}</strong></TableCell>
                {compareItems.map((v) => (
                  <TableCell key={v.id}>{v.model_year}</TableCell>
                ))}
              </TableRow>
              <TableRow>
                <TableCell><strong>{language === 'ar' ? 'الفئة' : 'Trim'}</strong></TableCell>
                {compareItems.map((v) => (
                  <TableCell key={v.id}>{v.trim_name}</TableCell>
                ))}
              </TableRow>
              <TableRow>
                <TableCell><strong>{language === 'ar' ? 'التصنيف' : 'Category'}</strong></TableCell>
                {compareItems.map((v) => (
                  <TableCell key={v.id}>{v.categories.name}</TableCell>
                ))}
              </TableRow>
              <TableRow>
                <TableCell><strong>{language === 'ar' ? 'المحرك' : 'Engine'}</strong></TableCell>
                {compareItems.map((v) => (
                  <TableCell key={v.id}>{v.engine || '-'}</TableCell>
                ))}
              </TableRow>
              <TableRow>
                <TableCell><strong>{language === 'ar' ? 'ناقل الحركة' : 'Transmission'}</strong></TableCell>
                {compareItems.map((v) => (
                  <TableCell key={v.id}>{v.transmissions.name}</TableCell>
                ))}
              </TableRow>
              <TableRow>
                <TableCell><strong>{language === 'ar' ? 'نوع الوقود' : 'Fuel Type'}</strong></TableCell>
                {compareItems.map((v) => (
                  <TableCell key={v.id}>{v.fuel_types.name}</TableCell>
                ))}
              </TableRow>
              <TableRow>
                <TableCell><strong>{language === 'ar' ? 'القوة الحصانية' : 'Horsepower'}</strong></TableCell>
                {compareItems.map((v) => (
                  <TableCell key={v.id}>{v.horsepower ? `${v.horsepower} HP` : '-'}</TableCell>
                ))}
              </TableRow>
              <TableRow>
                <TableCell><strong>{language === 'ar' ? 'عزم الدوران' : 'Torque'}</strong></TableCell>
                {compareItems.map((v) => (
                  <TableCell key={v.id}>{v.torque_nm ? `${v.torque_nm} Nm` : '-'}</TableCell>
                ))}
              </TableRow>
              <TableRow>
                <TableCell><strong>{language === 'ar' ? 'التسارع 0-100' : '0-100 km/h'}</strong></TableCell>
                {compareItems.map((v) => (
                  <TableCell key={v.id}>{v.acceleration_0_100 ? `${v.acceleration_0_100}s` : '-'}</TableCell>
                ))}
              </TableRow>
              <TableRow>
                <TableCell><strong>{language === 'ar' ? 'السرعة القصوى' : 'Top Speed'}</strong></TableCell>
                {compareItems.map((v) => (
                  <TableCell key={v.id}>{v.top_speed ? `${v.top_speed} km/h` : '-'}</TableCell>
                ))}
              </TableRow>
              <TableRow>
                <TableCell><strong>{language === 'ar' ? 'استهلاك الوقود' : 'Fuel Consumption'}</strong></TableCell>
                {compareItems.map((v) => (
                  <TableCell key={v.id}>{v.fuel_consumption || '-'}</TableCell>
                ))}
              </TableRow>
              <TableRow>
                <TableCell><strong>{language === 'ar' ? 'المقاعد' : 'Seats'}</strong></TableCell>
                {compareItems.map((v) => (
                  <TableCell key={v.id}>{v.seats || '-'}</TableCell>
                ))}
              </TableRow>
            </TableBody>
          </Table>
        </Box>
      </Container>
    </>
  );
}
