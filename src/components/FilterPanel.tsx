'use client';

import { Box, Paper, Typography, FormGroup, FormControlLabel, Checkbox, Slider, Divider, Button } from '@mui/material';
import { useState } from 'react';
import { getBrands } from '@/lib/mock-data';
import { useLanguageStore } from '@/stores/language-store';

interface FilterPanelProps {
  onFilterChange: (filters: {
    brands: string[];
    priceRange: [number, number];
    categories: string[];
  }) => void;
}

export default function FilterPanel({ onFilterChange }: FilterPanelProps) {
  const language = useLanguageStore((state) => state.language);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 20000000]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const brands = getBrands();
  const categories = ['sedan', 'suv', 'crossover', 'sports', 'electric', 'luxury'];

  const categoryLabels: Record<string, { ar: string; en: string }> = {
    sedan: { ar: 'سيدان', en: 'Sedan' },
    suv: { ar: 'دفع رباعي', en: 'SUV' },
    crossover: { ar: 'كروس أوفر', en: 'Crossover' },
    sports: { ar: 'رياضية', en: 'Sports' },
    electric: { ar: 'كهربائية', en: 'Electric' },
    luxury: { ar: 'فاخرة', en: 'Luxury' },
  };

  const handleBrandChange = (brand: string) => {
    const newBrands = selectedBrands.includes(brand)
      ? selectedBrands.filter((b) => b !== brand)
      : [...selectedBrands, brand];
    setSelectedBrands(newBrands);
    onFilterChange({ brands: newBrands, priceRange, categories: selectedCategories });
  };

  const handleCategoryChange = (category: string) => {
    const newCategories = selectedCategories.includes(category)
      ? selectedCategories.filter((c) => c !== category)
      : [...selectedCategories, category];
    setSelectedCategories(newCategories);
    onFilterChange({ brands: selectedBrands, priceRange, categories: newCategories });
  };

  const handlePriceChange = (_: Event, newValue: number | number[]) => {
    const newRange = newValue as [number, number];
    setPriceRange(newRange);
    onFilterChange({ brands: selectedBrands, priceRange: newRange, categories: selectedCategories });
  };

  const handleReset = () => {
    setSelectedBrands([]);
    setPriceRange([0, 20000000]);
    setSelectedCategories([]);
    onFilterChange({ brands: [], priceRange: [0, 20000000], categories: [] });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat(language === 'ar' ? 'ar-EG' : 'en-US', {
      notation: 'compact',
      maximumFractionDigits: 1,
    }).format(price);
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6">
          {language === 'ar' ? 'الفلاتر' : 'Filters'}
        </Typography>
        <Button size="small" onClick={handleReset}>
          {language === 'ar' ? 'إعادة تعيين' : 'Reset'}
        </Button>
      </Box>

      <Divider sx={{ mb: 2 }} />

      <Typography variant="subtitle2" gutterBottom>
        {language === 'ar' ? 'السعر' : 'Price Range'}
      </Typography>
      <Slider
        value={priceRange}
        onChange={handlePriceChange}
        valueLabelDisplay="auto"
        min={0}
        max={20000000}
        step={100000}
        valueLabelFormat={formatPrice}
        sx={{ mb: 3 }}
      />
      <Typography variant="body2" color="text.secondary" gutterBottom>
        {formatPrice(priceRange[0])} - {formatPrice(priceRange[1])} {language === 'ar' ? 'ج.م' : 'EGP'}
      </Typography>

      <Divider sx={{ my: 2 }} />

      <Typography variant="subtitle2" gutterBottom>
        {language === 'ar' ? 'الفئة' : 'Category'}
      </Typography>
      <FormGroup>
        {categories.map((category) => (
          <FormControlLabel
            key={category}
            control={
              <Checkbox
                checked={selectedCategories.includes(category)}
                onChange={() => handleCategoryChange(category)}
              />
            }
            label={categoryLabels[category][language]}
          />
        ))}
      </FormGroup>

      <Divider sx={{ my: 2 }} />

      <Typography variant="subtitle2" gutterBottom>
        {language === 'ar' ? 'العلامة التجارية' : 'Brand'}
      </Typography>
      <FormGroup>
        {brands.map((brand) => (
          <FormControlLabel
            key={brand}
            control={
              <Checkbox
                checked={selectedBrands.includes(brand)}
                onChange={() => handleBrandChange(brand)}
              />
            }
            label={brand}
          />
        ))}
      </FormGroup>
    </Paper>
  );
}
