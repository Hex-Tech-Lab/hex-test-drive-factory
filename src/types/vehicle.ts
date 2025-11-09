// Vehicle types for normalized Supabase schema
// Updated: 2025-11-09
// Matches vehicle_trims table structure

export interface Vehicle {
  // Primary fields
  id: string;
  trim_name: string;
  model_year: number;
  price_egp: number;
  model_id: string;

  // Technical specifications (nullable)
  engine: string | null;
  seats: number | null;
  horsepower: number | null;
  torque_nm: number | null;
  top_speed: number | null;  // ← ADDED
  acceleration_0_100: number | null;
  fuel_consumption: string | null;

  // Features
  features: string[] | null;

  // Nested relations (via JOINs)
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
  venue_trims?: {
    venues: {
      id: string;
      name: string;
    };
  }[];
}

export interface Brand {
  name: string;
  logo_url?: string | null;
}
