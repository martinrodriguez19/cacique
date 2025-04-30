// app/busqueda/page.tsx
// Página de resultados de búsqueda con Suspense
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { Metadata } from 'next';
import { Suspense } from 'react';
import SearchResultsPage from '@/app/components/SearchResultsPage';

// Componente de carga para Suspense
function SearchLoading() {
  return (
    <div className="pt-24 pb-16">
      <div className="container-custom">
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#e32929]"></div>
        </div>
      </div>
    </div>
  );
}

// Metadatos estáticos para la página de búsqueda
export const metadata: Metadata = {
  title: 'Resultados de búsqueda | El Cacique',
  description: 'Explora los resultados de tu búsqueda de productos y materiales para construcción en El Cacique.',
};

export default function SearchPage() {
  return (
    <Suspense fallback={<SearchLoading />}>
      <SearchResultsPage />
    </Suspense>
  );
}