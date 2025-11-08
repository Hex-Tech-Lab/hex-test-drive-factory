import type { Metadata } from 'next';
import AppProviders from '@/components/AppProviders';

export const metadata: Metadata = {
  title: 'Test Drive Platform',
  description: 'Book test drives for your favorite vehicles',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning>
      <body suppressHydrationWarning>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
