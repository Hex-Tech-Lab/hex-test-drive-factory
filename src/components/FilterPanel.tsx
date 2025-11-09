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

  const handleReset = () => {
    setSelectedBrands([]);
    setSelectedCategories([]);
    setPriceRange([0, 20000000]);
    onFilterChange({ brands: [], priceRange: [0, 20000000], categories: [] });
  };

  const formatPrice = (value: number) => {
    return `${(value / 1000).toFixed(0)}K`;
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
          max={5000000}
          step={100000}
          valueLabelFormat={formatPrice}
        />
        <Typography variant="body2" color="text.secondary">
          {priceRange[0].toLocaleString()} - {priceRange[1].toLocaleString()} EGP
        </Typography>
      </Box>
    </Paper>
  );
}
