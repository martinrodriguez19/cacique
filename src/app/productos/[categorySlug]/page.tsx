// app/productos/[categorySlug]/page.tsx
import { Metadata } from 'next';
import CategoryProductsPage from '@/app/components/CategoryProductsPage';
import { getCategories } from '@/app/lib/services/api';

// Indica a Next.js que esta es una página dinámica
export const dynamic = 'force-dynamic';

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
  // Extraer explícitamente los parámetros y crear un nuevo objeto literal
  const categoryParams = {
    categorySlug: params.categorySlug
  };
  
  // Imprimir para depuración
  console.log("CategoryPage Server Component - params:", categoryParams);
  
  // Pasar un objeto literal simple con la propiedad categorySlug
  return <CategoryProductsPage params={categoryParams} />;
}