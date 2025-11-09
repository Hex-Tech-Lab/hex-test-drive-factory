'use client';

import { useState, useEffect } from 'react';
import { Container, Grid, Typography, TextField, InputAdornment, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import VehicleCard from '@/components/VehicleCard';
import FilterPanel from '@/components/FilterPanel';
import { Vehicle } from '@/types/vehicle';
import { useLanguageStore } from '@/stores/language-store';
import { useFilterStore } from '@/stores/filter-store';

interface CatalogClientProps {
  vehicles: Vehicle[];
  locale: string;
}

export default function CatalogClient({ vehicles, locale }: CatalogClientProps) {
  const language = useLanguageStore((state) => state.language);
  const setLanguage = useLanguageStore((state) => state.setLanguage);
  const [searchQuery, setSearchQuery] = useState('');

  // Use persistent filter store
  const filters = useFilterStore((state) => ({
    brands: state.brands,
    priceRange: state.priceRange,
    categories: state.categories,
  }));
  const setFiltersInStore = useFilterStore((state) => state.setFilters);

  // Sync language with locale on mount
  useEffect(() => {
    if (locale === 'ar' || locale === 'en') {
      setLanguage(locale);
    }
  }, [locale, setLanguage]);

  // Filter vehicles based on selected filters and search query
  const filteredVehicles = vehicles.filter((vehicle) => {
    // Brand filter
    if (filters.brands.length > 0 && !filters.brands.includes(vehicle.models.brands.name)) {
      return false;
    }

    // Price filter
    if (vehicle.price_egp < filters.priceRange[0] || vehicle.price_egp > filters.priceRange[1]) {
      return false;
    }

    // Category filter
    if (filters.categories.length > 0 && vehicle.categories && !filters.categories.includes(vehicle.categories.name)) {
      return false;
    }

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        vehicle.models.brands.name.toLowerCase().includes(query) ||
        vehicle.models.name.toLowerCase().includes(query) ||
        vehicle.trim_name.toLowerCase().includes(query)
      );
    }

    return true;
  });

  return (
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
          <FilterPanel onFilterChange={setFiltersInStore} vehicles={vehicles} />
        </Grid>

        <Grid item xs={12} md={9}>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            {language === 'ar'
              ? `${filteredVehicles.length} مركبة متاحة`
              : `${filteredVehicles.length} vehicles available`}
          </Typography>

          {filteredVehicles.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 8 }}>
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
  );
}
