// app/busqueda/page.tsx
// Página de resultados de búsqueda

import { Metadata } from 'next';
import SearchResultsPage from '@/app/components/SearchResultsPage';

interface SearchPageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

// Metadatos estáticos para la página de búsqueda
export const metadata: Metadata = {
  title: 'Resultados de búsqueda | El Cacique',
  description: 'Explora los resultados de tu búsqueda de productos y materiales para construcción en El Cacique.',
};

export default function SearchPage({ searchParams }: SearchPageProps) {
  return <SearchResultsPage />;
}