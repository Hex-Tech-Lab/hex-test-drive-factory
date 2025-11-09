const PLACEHOLDER_IMAGE = '/images/placeholder-car.jpg';

/**
 * Get vehicle image URL with fallback to placeholder
 * @param imageUrl - The image URL from the database
 * @returns Valid image URL or placeholder
 */
export function getVehicleImage(imageUrl: string | null | undefined): string {
  if (!imageUrl) return PLACEHOLDER_IMAGE;

  // Check if URL is valid
  try {
    new URL(imageUrl);
    return imageUrl;
  } catch {
    return PLACEHOLDER_IMAGE;
  }
}

/**
 * Format price in Egyptian Pounds with K/M suffix
 * @param price - Price in EGP
 * @returns Formatted price string
 */
export function formatPrice(price: number): string {
  if (price >= 1_000_000) {
    return `${(price / 1_000_000).toFixed(1)}M EGP`;
  }
  if (price >= 1_000) {
    return `${(price / 1_000).toFixed(0)}K EGP`;
  }
  return `${price} EGP`;
}
