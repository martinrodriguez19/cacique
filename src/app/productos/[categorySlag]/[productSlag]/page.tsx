/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
// app/productos/[categorySlug]/[productSlug]/page.tsx
// Página de detalle de producto con nombres de parámetros consistentes

import ProductDetailPage from '@/app/components/ProductDetailPage';
import { catalogData, generateSlug  } from '@/app/lib/catalog-data';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';


export const dynamicParams = true;

// Generar rutas estáticas para los productos conocidos
export function generateStaticParams() {
  const paths: { categorySlug: string; productSlug: string }[] = [];
  
  catalogData.forEach((category) => {
    category.products.forEach((product) => {
      paths.push({
        categorySlug: category.slug,  // Usar categorySlug consistentemente
        productSlug: product.slug || generateSlug(product.name),
      });
    });
  });
  
  return paths;
}

// Metadatos dinámicos basados en el producto
export async function generateMetadata({ 
  params 
}: { 
  params: { categorySlug: string; productSlug: string } 
}): Promise<Metadata> {
  const { categorySlug, productSlug } = params;
  
  // Buscar la categoría por slug
  const category = catalogData.find(cat => cat.slug === categorySlug);
  
  if (!category) {
    return {
      title: 'Producto no encontrado | El Cacique',
      description: 'El producto que estás buscando no existe.',
    };
  }
  
  // Buscar el producto por slug
  const product = category.products.find(
    prod => (prod.slug || generateSlug(prod.name)) === productSlug
  );
  
  if (!product) {
    return {
      title: 'Producto no encontrado | El Cacique',
      description: 'El producto que estás buscando no existe.',
    };
  }
  
  return {
    title: `${product.name} | ${category.name} | El Cacique`,
    description: `${product.name} de alta calidad. Producto esencial para tus proyectos de construcción en la categoría de ${category.name.toLowerCase()}.`,
  };
}

export default function ProductPage({ 
  params 
}: { 
  params: { categorySlug: string; productSlug: string } 
}) {
  const { categorySlug, productSlug } = params;
  
  // Verificar si la categoría existe
  const category = catalogData.find(cat => cat.slug === categorySlug);
  
  if (!category) {
    notFound();
  }
  
  // Verificar si el producto existe
  const productExists = category.products.some(
    prod => (prod.slug || generateSlug(prod.name)) === productSlug
  );
  
  if (!productExists) {
    notFound();
  }
  
  return <ProductDetailPage params={{ categorySlug, productSlug }} />;
}

function generateSlug(name: any): string {
    throw new Error('Function not implemented.');
}
