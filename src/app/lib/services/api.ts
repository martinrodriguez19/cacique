// app/lib/services/api.ts
import { ICategory } from '../models/Category';
import { IProduct } from '../models/Product';

// Tipos para las respuestas de la API
type ApiResponse<T> = {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
};

// Función para construir la URL base
const getBaseUrl = () => {
  // Verificar si estamos en el navegador o en el servidor
  if (typeof window !== 'undefined') {
    // Cliente (navegador)
    return window.location.origin;
  } else {
    // Servidor
    // Usa la variable de entorno o un valor predeterminado
    return process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
  }
};

// Función para obtener todas las categorías
export async function getCategories(featured?: boolean): Promise<ICategory[]> {
  try {
    const baseUrl = getBaseUrl();
    const url = new URL('/api/admin/categories', baseUrl);
    
    if (featured) url.searchParams.append('featured', 'true');

    const response = await fetch(url.toString(), { 
      // Configuración para asegurar que funciona en SSR
      cache: 'no-store' 
    });
    
    const result: ApiResponse<ICategory[]> = await response.json();

    if (!result.success) {
      throw new Error(result.message || 'Error al obtener categorías');
    }

    return result.data || [];
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

// Función para obtener una categoría por ID
export async function getCategoryById(id: string): Promise<ICategory | null> {
  try {
    const baseUrl = getBaseUrl();
    const response = await fetch(`${baseUrl}/api/admin/categories/${id}`, { 
      cache: 'no-store' 
    });
    
    const result: ApiResponse<ICategory> = await response.json();

    if (!result.success) {
      throw new Error(result.message || 'Error al obtener la categoría');
    }

    return result.data || null;
  } catch (error) {
    console.error(`Error fetching category ${id}:`, error);
    return null;
  }
}

// Función para obtener productos
export async function getProducts(category?: string, featured?: boolean): Promise<IProduct[]> {
  try {
    const baseUrl = getBaseUrl();
    const url = new URL('/api/admin/products', baseUrl);
    
    if (category) url.searchParams.append('category', category);
    if (featured) url.searchParams.append('featured', 'true');

    const response = await fetch(url.toString(), { 
      cache: 'no-store' 
    });
    
    const result: ApiResponse<IProduct[]> = await response.json();

    if (!result.success) {
      throw new Error(result.message || 'Error al obtener productos');
    }

    return result.data || [];
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

// Función para obtener un producto por ID
export async function getProductById(id: string): Promise<IProduct | null> {
  try {
    const baseUrl = getBaseUrl();
    const response = await fetch(`${baseUrl}/api/admin/products/${id}`, { 
      cache: 'no-store' 
    });
    
    const result: ApiResponse<IProduct> = await response.json();

    if (!result.success) {
      throw new Error(result.message || 'Error al obtener el producto');
    }

    return result.data || null;
  } catch (error) {
    console.error(`Error fetching product ${id}:`, error);
    return null;
  }
}