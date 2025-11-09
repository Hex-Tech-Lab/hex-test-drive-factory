// TypeScript types for normalized Supabase schema
// Schema updated: 2025-11-09
// Tables: vehicle_trims, models, brands, categories, transmissions, fuel_types, venue_trims, venues

export interface Vehicle {
  // vehicle_trims table fields
  id: string;
  trim_name: string;
  model_year: number;
  price_egp: number;
  engine: string;
  seats: number;
  horsepower: number;
  torque_nm: number;
  acceleration_0_100: number;
  fuel_consumption: string;
  features: string[];
  model_id: string;

  // Nested relations (via JOIN)
  models: {
    name: string;
    hero_image_url: string;
    hover_image_url: string;
    brands: {
      name: string;
      logo_url: string | null;
    };
  };
  categories: {
    name: string;
  };
  transmissions: {
    name: string;
  };
  fuel_types: {
    name: string;
  };
  venue_trims: {
    venues: {
      id: string;
      name: string;
    };
  }[];
}

// Helper type for brand extraction
export interface Brand {
  id?: string;
  name: string;
  logo_url?: string | null;
}

// Helper type for venue extraction
export interface Venue {
  id: string;
  name: string;
}
