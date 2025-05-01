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

// Opciones para la función de obtención de datos
interface FetchOptions {
  cache?: 'force-cache' | 'no-store';
  next?: {
    revalidate?: number;
  };
}

// Función para obtener URL base de la API
function getBaseUrl() {
  // En el servidor, no hay objeto 'window' - usar una URL absoluta o relativa
  if (typeof window === 'undefined') {
    // En producción, usaríamos la URL del sitio
    // return 'https://www.tucorralon.com';
    
    // Para desarrollo, usamos una URL relativa
    return '';
  }
  
  // En el cliente, podemos usar window.location.origin
  return window.location.origin;
}

// Función para obtener todas las categorías
export async function getCategories(featured?: boolean, options?: FetchOptions): Promise<ICategory[]> {
  try {
    const baseUrl = getBaseUrl();
    const url = new URL('/api/admin/categories', baseUrl);
    if (featured) url.searchParams.append('featured', 'true');

    // Configurar opciones de fetch para caché
    const fetchOptions: RequestInit & { next?: { revalidate?: number } } = {
      ...(options || {})
    };

    const response = await fetch(url.toString(), fetchOptions);
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
export async function getCategoryById(id: string, options?: FetchOptions): Promise<ICategory | null> {
  try {
    const baseUrl = getBaseUrl();
    const fetchOptions: RequestInit & { next?: { revalidate?: number } } = {
      ...(options || {})
    };
    
    const response = await fetch(`${baseUrl}/api/admin/categories/${id}`, fetchOptions);
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
export async function getProducts(category?: string, featured?: boolean, options?: FetchOptions): Promise<IProduct[]> {
  try {
    const baseUrl = getBaseUrl();
    const url = new URL('/api/admin/products', baseUrl);
    if (category) url.searchParams.append('category', category);
    if (featured) url.searchParams.append('featured', 'true');

    // Configurar opciones de fetch para caché
    const fetchOptions: RequestInit & { next?: { revalidate?: number } } = {
      ...(options || {})
    };

    const response = await fetch(url.toString(), fetchOptions);
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
export async function getProductById(id: string, options?: FetchOptions): Promise<IProduct | null> {
  try {
    const baseUrl = getBaseUrl();
    const fetchOptions: RequestInit & { next?: { revalidate?: number } } = {
      ...(options || {})
    };
    
    const response = await fetch(`${baseUrl}/api/admin/products/${id}`, fetchOptions);
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