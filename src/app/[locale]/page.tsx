'use client';

import { useEffect, useState } from 'react';
import { Container, Grid, Typography, Box, TextField, InputAdornment, CircularProgress } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Header from '@/components/Header';
import VehicleCard from '@/components/VehicleCard';
import FilterPanel from '@/components/FilterPanel';
import { Vehicle } from '@/types/vehicle';
import { supabase } from '@/lib/supabase';
import { useLanguageStore } from '@/stores/language-store';
import { useFilterStore } from '@/stores/filter-store';
import { useParams } from 'next/navigation';

export default function CatalogPage() {
  const params = useParams();
  const locale = params.locale as string;
  const language = useLanguageStore((state) => state.language);
  const setLanguage = useLanguageStore((state) => state.setLanguage);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Use persistent filter store
  const filters = useFilterStore((state) => ({
    brands: state.brands,
    priceRange: state.priceRange,
    categories: state.categories,
  }));
  const setFiltersInStore = useFilterStore((state) => state.setFilters);

  useEffect(() => {
    if (locale === 'ar' || locale === 'en') {
      setLanguage(locale);
    }
  }, [locale, setLanguage]);

  useEffect(() => {
    async function fetchVehicles() {
      try {
        setLoading(true);
        const { data, error: fetchError } = await supabase
          .from('vehicle_trims')
          .select(`
            id,
            trim_name,
            model_year,
            price_egp,
            engine,
            seats,
            horsepower,
            torque_nm,
            acceleration_0_100,
            top_speed,
            fuel_consumption,
            features,
            model_id,
            models!inner(
              name,
              hero_image_url,
              hover_image_url,
              brands!inner(
                name,
                logo_url
              )
            ),
            categories!inner(name),
            transmissions!inner(name),
            fuel_types!inner(name)
          `);

        if (fetchError) {
          console.error('Supabase query error:', fetchError);
          setError(fetchError.message);
        } else {
          setVehicles((data as unknown as Vehicle[]) || []);
        }
      } catch (err) {
        console.error('Unexpected error:', err);
        setError('Failed to load vehicles');
      } finally {
        setLoading(false);
      }
    }

    fetchVehicles();
  }, []);

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
    if (filters.categories.length > 0 && !filters.categories.includes(vehicle.categories.name)) {
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

  if (loading) {
    return (
      <>
        <Header />
        <Container maxWidth="xl" sx={{ py: 4, textAlign: 'center' }}>
          <CircularProgress />
          <Typography variant="h6" sx={{ mt: 2 }}>
            {language === 'ar' ? 'جاري التحميل...' : 'Loading...'}
          </Typography>
        </Container>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header />
        <Container maxWidth="xl" sx={{ py: 4 }}>
          <Typography variant="h6" color="error">
            {language === 'ar' ? 'فشل تحميل المركبات' : 'Failed to load vehicles'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {error}
          </Typography>
        </Container>
      </>
    );
  }

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
    </>
  );
}
