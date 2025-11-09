import { supabase } from '@/lib/supabase';
import { Vehicle } from '@/types/vehicle';

const VEHICLE_SELECT = `
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
  categories(name),
  transmissions(name),
  fuel_types(name),
  body_styles(name_en, name_ar, icon_url, display_order),
  countries(name_en, name_ar, flag_url, iso_code, region),
  agents(name_en, name_ar, logo_url, website_url),
  venue_trims(
    vehicle_trim_id,
    venue_id,
    is_available,
    venues(id, name, address, city)
  ),
  vehicle_images(
    image_url,
    display_order,
    is_primary,
    image_type,
    alt_text_en,
    alt_text_ar
  )
`;

export const vehicleRepository = {
  async getAllVehicles() {
    const { data, error } = await supabase
      .from('vehicle_trims')
      .select(VEHICLE_SELECT)
      .order('model_year', { ascending: false });
    
    return { data: data as Vehicle[] | null, error };
  },

  async getVehicleById(id: string) {
    const { data, error } = await supabase
      .from('vehicle_trims')
      .select(VEHICLE_SELECT)
      .eq('id', id)
      .single();
    
    return { data: data as Vehicle | null, error };
  },

  async getVehiclesByBrand(brandName: string) {
    const { data, error } = await supabase
      .from('vehicle_trims')
      .select(VEHICLE_SELECT)
      .eq('models.brands.name', brandName);
    
    return { data: data as Vehicle[] | null, error };
  },

  async getVehiclesByCategory(categoryName: string) {
    const { data, error } = await supabase
      .from('vehicle_trims')
      .select(VEHICLE_SELECT)
      .eq('categories.name', categoryName);
    
    return { data: data as Vehicle[] | null, error };
  },

  async getVehiclesByPriceRange(minPrice: number, maxPrice: number) {
    const { data, error } = await supabase
      .from('vehicle_trims')
      .select(VEHICLE_SELECT)
      .gte('price_egp', minPrice)
      .lte('price_egp', maxPrice);
    
    return { data: data as Vehicle[] | null, error };
  },

  async getElectricVehicles() {
    const { data, error } = await supabase
      .from('vehicle_trims')
      .select(VEHICLE_SELECT)
      .eq('is_electric', true);
    
    return { data: data as Vehicle[] | null, error };
  },

  async getHybridVehicles() {
    const { data, error } = await supabase
      .from('vehicle_trims')
      .select(VEHICLE_SELECT)
      .eq('is_hybrid', true);
    
    return { data: data as Vehicle[] | null, error };
  },
};
