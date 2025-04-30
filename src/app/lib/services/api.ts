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

// Función para obtener todas las categorías
export async function getCategories(featured?: boolean): Promise<ICategory[]> {
  try {
    const url = new URL('/api/admin/categories', window.location.origin);
    if (featured) url.searchParams.append('featured', 'true');

    const response = await fetch(url.toString());
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
    const response = await fetch(`/api/admin/categories/${id}`);
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
    const url = new URL('/api/admin/products', window.location.origin);
    if (category) url.searchParams.append('category', category);
    if (featured) url.searchParams.append('featured', 'true');

    const response = await fetch(url.toString());
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
    const response = await fetch(`/api/admin/products/${id}`);
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