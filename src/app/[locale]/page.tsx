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
  
  // Use persistent filter store - separate selectors to avoid infinite loop
  const filterBrands = useFilterStore((state) => state.brands);
  const filterPriceRange = useFilterStore((state) => state.priceRange);
  const filterCategories = useFilterStore((state) => state.categories);
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

        // DEBUG LOGGING
        console.log('[CATALOG DEBUG]', {
          vehicleCount: data?.length ?? 0,
          hasError: !!fetchError,
          errorMessage: fetchError?.message,
          errorDetails: fetchError?.details,
          errorCode: fetchError?.code,
          rawData: data?.[0] || null
        });

        if (fetchError) {
          console.error('[CATALOG ERROR]', JSON.stringify(fetchError, null, 2));
          setError(fetchError.message);
        } else {
          const vehicleData = (data as unknown as Vehicle[]) || [];
          console.log('[CATALOG] Setting vehicles:', vehicleData.length);
          setVehicles(vehicleData);
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

  // Debug: Log filter state
  console.log('[FILTER DEBUG]', {
    totalVehicles: vehicles.length,
    filterBrands,
    filterPriceRange,
    filterCategories
  });

  // TEMPORARY: Bypass filters to test if they're causing the issue
  const filteredVehicles = vehicles; // Show ALL vehicles temporarily

  console.log('[FILTER RESULTS]', {
    totalVehicles: vehicles.length,
    filteredCount: filteredVehicles.length,
    sampleVehicle: vehicles[0] ? {
      brand: vehicles[0].models.brands.name,
      model: vehicles[0].models.name,
      price: vehicles[0].price_egp
    } : null
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
