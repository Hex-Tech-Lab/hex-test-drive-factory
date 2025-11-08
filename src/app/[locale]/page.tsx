'use client';

import { useState, useMemo, useEffect } from 'react';
import { Container, Grid, Typography, Box, TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Header from '@/components/Header';
import VehicleCard from '@/components/VehicleCard';
import FilterPanel from '@/components/FilterPanel';
import { Vehicle } from '@/lib/mock-data';
import { supabase } from '@/lib/supabase';
import { useLanguageStore } from '@/stores/language-store';
import { useParams} from 'next/navigation';

export default function CatalogPage() {
  const params = useParams();
  const locale = params.locale as string;
  const language = useLanguageStore((state) => state.language);
  const setLanguage = useLanguageStore((state) => state.setLanguage);
  const [searchQuery, setSearchQuery] = useState('');
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
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

  // Fetch vehicles from Supabase with JOINs for normalized schema
  useEffect(() => {
    async function fetchVehicles() {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('vehicles')
          .select(`
            *,
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
        
        if (error) {
          console.error('Error fetching vehicles from Supabase:', error);
          setVehicles([]);
        } else {
          setVehicles((data as Vehicle[]) || []);
        }
      } catch (err) {
        console.error('Unexpected error fetching vehicles:', err);
        setVehicles([]);
      } finally {
        setLoading(false);
      }
    }

    fetchVehicles();
  }, []);

  const filteredVehicles = useMemo(() => {
    // Apply filters to vehicles from Supabase with nested properties
    let results = vehicles.filter((vehicle) => {
      // Brand filter - use nested brand name
      if (filters.brands.length > 0 && !filters.brands.includes(vehicle.models.brands.name)) {
        return false;
      }

      // Price range filter
      if (vehicle.price_egp < filters.priceRange[0] || vehicle.price_egp > filters.priceRange[1]) {
        return false;
      }

      // Category filter - use nested category name
      if (filters.categories.length > 0 && !filters.categories.includes(vehicle.categories.name)) {
        return false;
      }

      return true;
    });

    // Search query filter - use nested properties
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      results = results.filter(
        (v) =>
          v.models.brands.name.toLowerCase().includes(query) ||
          v.models.name.toLowerCase().includes(query) ||
          v.trim_name.toLowerCase().includes(query) ||
          v.categories.name.toLowerCase().includes(query)
      );
    }

    return results;
  }, [vehicles, filters, searchQuery]);

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
            <FilterPanel onFilterChange={setFilters} vehicles={vehicles} />
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
