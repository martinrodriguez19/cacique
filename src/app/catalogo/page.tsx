// app/catalogo/page.tsx
// Página que muestra el catálogo completo de productos
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { Metadata } from 'next';
import CatalogoPage from '@/app/components/CatalogoPage';

// Metadatos estáticos para la página de catálogo
export const metadata: Metadata = {
  title: 'Catálogo Completo | El Cacique',
  description: 'Explora nuestro catálogo completo de materiales y productos para construcción en El Cacique.',
};

export default function Catalogo() {
  return <CatalogoPage />;
}