// app/productos/[categorySlug]/[productSlug]/page.tsx
// Página de detalle de producto conectada a la base de datos

import ProductDetailPage from '@/app/components/ProductDetailPage';
import { Metadata } from 'next';
import { getCategories, getProducts } from '@/app/lib/services/api';

export const dynamicParams = true;

// Generar rutas estáticas para los productos conocidos
export async function generateStaticParams() {
  try {
    const categories = await getCategories();
    const paths = [];
    
    for (const category of categories) {
      const products = await getProducts(category.slug);
      
      for (const product of products) {
        paths.push({
          categorySlug: category.slug,
          productSlug: product.slug,
        });
      }
    }
    
    return paths;
  } catch (error) {
    console.error('Error generating static paths:', error);
    return [];
  }
}

// Metadatos dinámicos basados en el producto
export async function generateMetadata({ 
  params 
}: { 
  params: { categorySlug: string; productSlug: string } 
}): Promise<Metadata> {
  const { categorySlug, productSlug } = params;
  
  try {
    // Obtener todas las categorías
    const categories = await getCategories();
    
    // Buscar la categoría por slug
    const category = categories.find(cat => cat.slug === categorySlug);
    
    if (!category) {
      return {
        title: 'Producto no encontrado | El Cacique',
        description: 'El producto que estás buscando no existe.',
      };
    }
    
    // Obtener productos de esa categoría
    const products = await getProducts(categorySlug);
    
    // Buscar el producto por slug
    const product = products.find(prod => prod.slug === productSlug);
    
    if (!product) {
      return {
        title: 'Producto no encontrado | El Cacique',
        description: 'El producto que estás buscando no existe.',
      };
    }
    
    return {
      title: `${product.name} | ${category.name} | El Cacique`,
      description: product.description?.substring(0, 160) || 
        `Producto de calidad para tus proyectos de construcción en la categoría de ${category.name.toLowerCase()}.`,
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'Producto | El Cacique',
      description: 'Productos de calidad para tus proyectos de construcción.',
    };
  }
}

// Función que renderiza el componente cliente ProductDetailPage
export default async function ProductPage({ 
  params 
}: { 
  params: { categorySlug: string; productSlug: string } 
}) {
  // Extraer explícitamente los parámetros y crear un nuevo objeto
  // Esto evita pasar el objeto params directamente, que podría ser un proxy reactivo
  const productParams = {
    categorySlug: params.categorySlug,
    productSlug: params.productSlug
  };
  
  // Imprimir para depuración
  console.log("ProductPage Server Component - params:", productParams);
  
  // Pasar un objeto literal simple con las propiedades necesarias
  return <ProductDetailPage params={productParams} />;
}