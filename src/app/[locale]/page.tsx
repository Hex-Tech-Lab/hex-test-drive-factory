import { vehicleRepository } from '@/repositories/vehicleRepository';
import Header from '@/components/Header';
import CatalogClient from './CatalogClient';
import ErrorDisplay from '@/components/ErrorDisplay';

interface VehicleCatalogPageProps {
  params: Promise<{
    locale: string;
  }>;
}

/**
 * Server Component: Fetches vehicle data at build/request time
 * Benefits:
 * - Faster initial page load (data pre-fetched on server)
 * - Better SEO (content available in initial HTML)
 * - Reduced client-side JavaScript
 */
export default async function VehicleCatalogPage({ params }: VehicleCatalogPageProps) {
  const { locale } = await params;

  // Server-side data fetch (runs at build/request time)
  const { data: vehicles, error } = await vehicleRepository.getAllVehicles();

  if (error) {
    return (
      <>
        <Header />
        <ErrorDisplay error={error} locale={locale} />
      </>
    );
  }

  // Pass pre-fetched data to client component for interactivity
  return (
    <>
      <Header />
      <CatalogClient vehicles={vehicles ?? []} locale={locale} />
    </>
  );
}
