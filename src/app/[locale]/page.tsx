'use client';

import { useState, useMemo, useEffect } from 'react';
import { Container, Grid, Typography, Box, TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Header from '@/components/Header';
import VehicleCard from '@/components/VehicleCard';
import FilterPanel from '@/components/FilterPanel';
import { vehicles, filterVehicles } from '@/lib/mock-data';
import { useLanguageStore } from '@/stores/language-store';
import { useParams } from 'next/navigation';

export default function CatalogPage() {
  const params = useParams();
  const locale = params.locale as string;
  const language = useLanguageStore((state) => state.language);
  const setLanguage = useLanguageStore((state) => state.setLanguage);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<{
    brands: string[];
    priceRange: [number, number];
    categories: string[];
  }>({
    brands: [],
    priceRange: [0, 20000000],
    categories: [],
  });

  useEffect(() => {
    if (locale === 'ar' || locale === 'en') {
      setLanguage(locale);
    }
  }, [locale, setLanguage]);

  const filteredVehicles = useMemo(() => {
    let results = filterVehicles({
      brands: filters.brands,
      priceMin: filters.priceRange[0],
      priceMax: filters.priceRange[1],
      categories: filters.categories,
    });

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      results = results.filter(
        (v) =>
          v.brand.toLowerCase().includes(query) ||
          v.model.toLowerCase().includes(query) ||
          v.category.toLowerCase().includes(query)
      );
    }

    return results;
  }, [filters, searchQuery]);

  return (
    <>
      <Header />
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ mb: 3, fontWeight: 600 }}>
          {language === 'ar' ? 'استكشف المركبات' : 'Explore Vehicles'}
        </Typography>

        <TextField
          fullWidth
          placeholder={language === 'ar' ? 'ابحث عن مركبة...' : 'Search for a vehicle...'}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{ mb: 3 }}
        />

        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <FilterPanel onFilterChange={setFilters} />
          </Grid>

          <Grid item xs={12} md={9}>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              {language === 'ar'
                ? `${filteredVehicles.length} مركبة متاحة`
                : `${filteredVehicles.length} vehicles available`}
            </Typography>

            {filteredVehicles.length === 0 ? (
              <Box
                sx={{
                  textAlign: 'center',
                  py: 8,
                }}
              >
                <Typography variant="h6" color="text.secondary">
                  {language === 'ar' ? 'لا توجد نتائج' : 'No results found'}
                </Typography>
              </Box>
            ) : (
              <Grid container spacing={3}>
                {filteredVehicles.map((vehicle) => (
                  <Grid item key={vehicle.id} xs={12} sm={6} md={4}>
                    <VehicleCard vehicle={vehicle} />
                  </Grid>
                ))}
              </Grid>
            )}
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
