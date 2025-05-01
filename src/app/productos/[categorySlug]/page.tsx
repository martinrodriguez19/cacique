// app/productos/[categorySlug]/page.tsx
// Página dinámica para categorías de productos conectada a la base de datos

import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import CategoryProductsPage from '@/app/components/CategoryProductsPage';
import { getCategories } from '@/app/lib/services/api';

export const dynamicParams = true;

// Generar rutas estáticas para las categorías conocidas
export async function generateStaticParams() {
  try {
    const categories = await getCategories();
    return categories.map((category) => ({
      categorySlug: category.slug,
    }));
  } catch (error) {
    console.error('Error generating static paths:', error);
    return [];
  }
}

// Metadatos dinámicos basados en la categoría
export async function generateMetadata({ params }: { params: { categorySlug: string } }): Promise<Metadata> {
  const { categorySlug } = params;
  
  try {
    // Obtener todas las categorías
    const categories = await getCategories();
    
    // Buscar la categoría por slug
    const category = categories.find(cat => cat.slug === categorySlug);
    
    if (!category) {
      return {
        title: 'Categoría no encontrada | El Cacique',
        description: 'La categoría que estás buscando no existe.',
      };
    }
    
    return {
      title: `${category.name} | El Cacique`,
      description: category.description || 
        `Explora nuestra selección de productos de ${category.name.toLowerCase()} de alta calidad para tus proyectos de construcción.`,
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'Productos | El Cacique',
      description: 'Explora nuestra selección de productos de alta calidad para tus proyectos de construcción.',
    };
  }
}

// Función que renderiza el componente cliente CategoryProductsPage
export default async function CategoryPage({ params }: { params: { categorySlug: string } }) {
  // Ahora la función es asíncrona (async) para poder esperar a que los params se resuelvan
  
  // Convertimos los params a un objeto simple para pasárselo al componente cliente
  const safeParams = {
    categorySlug: params.categorySlug
  };
  
  return <CategoryProductsPage params={safeParams} />;
}