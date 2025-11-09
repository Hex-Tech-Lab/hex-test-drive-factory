'use client';

import { useMemo, useState } from 'react';
import { Box, Typography, Checkbox, FormControlLabel, Slider, Paper, Divider, Button } from '@mui/material';
import { Vehicle } from '@/types/vehicle';
import { useLanguageStore } from '@/stores/language-store';

interface FilterPanelProps {
  vehicles: Vehicle[];
  onFilterChange: (filters: {
    brands: string[];
    priceRange: [number, number];
    categories: string[];
  }) => void;
}

export default function FilterPanel({ vehicles, onFilterChange }: FilterPanelProps) {
  const language = useLanguageStore((state) => state.language);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 20000000]);

  // Extract unique brands from live data
  const brands = useMemo(() => {
    const brandSet = new Set<string>();
    vehicles.forEach((v) => {
      if (v.models?.brands?.name) {
        brandSet.add(v.models.brands.name);
      }
    });
    return Array.from(brandSet).sort();
  }, [vehicles]);

  // Extract unique categories from live data
  const categories = useMemo(() => {
    const catSet = new Set<string>();
    vehicles.forEach((v) => {
      if (v.categories?.name) {
        catSet.add(v.categories.name);
      }
    });
    return Array.from(catSet).sort();
  }, [vehicles]);

  const handleBrandToggle = (brand: string) => {
    const newBrands = selectedBrands.includes(brand)
      ? selectedBrands.filter((b) => b !== brand)
      : [...selectedBrands, brand];
    setSelectedBrands(newBrands);
    onFilterChange({ brands: newBrands, priceRange, categories: selectedCategories });
  };

  const handleCategoryToggle = (category: string) => {
    const newCategories = selectedCategories.includes(category)
      ? selectedCategories.filter((c) => c !== category)
      : [...selectedCategories, category];
    setSelectedCategories(newCategories);
    onFilterChange({ brands: selectedBrands, priceRange, categories: newCategories });
  };

  const handlePriceChange = (_event: Event, newValue: number | number[]) => {
    const newRange = newValue as [number, number];
    setPriceRange(newRange);
    onFilterChange({ brands: selectedBrands, priceRange: newRange, categories: selectedCategories });
  };

  // Dynamic max price based on available vehicles
  const maxPrice = useMemo(() => {
    if (vehicles.length === 0) return 20_000_000;
    const prices = vehicles.map(v => v.price_egp).filter(p => p > 0);
    return prices.length > 0 ? Math.max(...prices) : 20_000_000;
  }, [vehicles]);

  const handleReset = () => {
    setSelectedBrands([]);
    setSelectedCategories([]);
    const resetRange: [number, number] = [0, maxPrice];
    setPriceRange(resetRange);
    onFilterChange({ brands: [], priceRange: resetRange, categories: [] });
  };

  const formatPrice = (value: number): string => {
    if (value >= 1_000_000) {
      return `${(value / 1_000_000).toFixed(1)}M`;
    }
    if (value >= 1_000) {
      return `${(value / 1_000).toFixed(0)}K`;
    }
    return `${value}`;
  };

  return (
    <Paper sx={{ p: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6">
          {language === 'ar' ? 'تصفية' : 'Filters'}
        </Typography>
        <Button size="small" onClick={handleReset}>
          {language === 'ar' ? 'إعادة تعيين' : 'Reset'}
        </Button>
      </Box>

      <Divider sx={{ mb: 2 }} />

      {/* Brands */}
      <Box mb={3}>
        <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600 }}>
          {language === 'ar' ? 'العلامات التجارية' : 'Brands'}
        </Typography>
        {brands.map((brand) => (
          <FormControlLabel
            key={brand}
            control={
              <Checkbox
                checked={selectedBrands.includes(brand)}
                onChange={() => handleBrandToggle(brand)}
              />
            }
            label={brand}
          />
        ))}
      </Box>

      <Divider sx={{ mb: 2 }} />

      {/* Categories */}
      <Box mb={3}>
        <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600 }}>
          {language === 'ar' ? 'الفئات' : 'Categories'}
        </Typography>
        {categories.map((cat) => (
          <FormControlLabel
            key={cat}
            control={
              <Checkbox
                checked={selectedCategories.includes(cat)}
                onChange={() => handleCategoryToggle(cat)}
              />
            }
            label={cat}
          />
        ))}
      </Box>

      <Divider sx={{ mb: 2 }} />

      {/* Price Range */}
      <Box>
        <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600 }}>
          {language === 'ar' ? 'نطاق السعر' : 'Price Range'}
        </Typography>
        <Slider
          value={priceRange}
          onChange={handlePriceChange}
          valueLabelDisplay="auto"
          min={0}
          max={maxPrice}
          step={100_000}
          valueLabelFormat={formatPrice}
          sx={{ mt: 2, mb: 1 }}
        />
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="body2" color="text.secondary">
            {formatPrice(priceRange[0])} EGP
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {formatPrice(priceRange[1])} EGP
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
}
