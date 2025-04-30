// app/productos/[slug]/page.tsx
// Esta es la página dinámica para categorías de productos

import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import CategoryProductsPage from '@/app/components/CategoryProductsPage';
import { catalogData } from '@/app/lib/catalog-data';

export const dynamicParams = true;

// Generar rutas estáticas para las categorías conocidas
export function generateStaticParams() {
  return catalogData.map((category) => ({
    slug: category.slug,
  }));
}

// Metadatos dinámicos basados en la categoría
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const { slug } = params;
  
  // Buscar la categoría por slug
  const category = catalogData.find(cat => cat.slug === slug);
  
  if (!category) {
    return {
      title: 'Categoría no encontrada | El Cacique',
      description: 'La categoría que estás buscando no existe.',
    };
  }
  
  return {
    title: `${category.name} | El Cacique`,
    description: `Explora nuestra selección de productos de ${category.name.toLowerCase()} de alta calidad para tus proyectos de construcción.`,
  };
}

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  
  // Verificar si la categoría existe
  const categoryExists = catalogData.some(cat => cat.slug === slug);
  
  if (!categoryExists) {
    notFound();
  }
  
  return <CategoryProductsPage params={{ slug }} />;
}