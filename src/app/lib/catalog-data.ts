/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

// Categorías y productos desde el PDF
export interface CatalogCategory {
    name: string;
    slug: string;
    products: CatalogProduct[];
  }
  
  export interface CatalogProduct {
    name: string;
    slug?: string;
  }
  
  // Datos extraídos del PDF proporcionado
  export const catalogData: CatalogCategory[] = [
    {
      name: "Obra Gruesa",
      slug: "obra-gruesa",
      products: [
        { name: "Cemento Avellaneda" },
        { name: "Cal Hidrat" },
        { name: "Cal Milagro" },
        { name: "Hidralit" },
        { name: "Hierro del 4,2 - barra de 12 mts" },
        { name: "Hierro del 6 - barra de 12 mts" },
        { name: "Hierro del 8 - barra de 12 mts" },
        { name: "Hierro del 10 - barra de 12 mts" },
        { name: "Hierro del 12 - barra de 12 mts" },
        { name: "Hierro del 16 - barra de 12 mts" },
        { name: "Hierro del 20 - barra de 12 mts" },
        { name: "Hierro del 25 - barra de 12 mts" },
        { name: "Malla Hierro - 15cm x 15cm comercial Nro. 4,2 mm 2x5" },
        { name: "Malla Hierro - 15cm x 15cm comercial Nro. 6,0 mm 2x5" },
        { name: "Malla Hierro - 15cm x 15cm comercial Nro. 8,0 mm 2x5" }
      ]
    },
    {
      name: "Construcción en Seco",
      slug: "construccion-seco",
      products: [
        { name: "Yeso Tuyango tradicional" },
        { name: "Weber basic cerámicos" },
        { name: "Weber flex porcelanato" },
        { name: "Weber revoque fino a la cal exterior" },
        { name: "Weber revoque fino a la cal interior" },
        { name: "Weber pro 25" },
        { name: "Weber piso/piso 12 hs" },
        { name: "Hornero" }
      ]
    },
    {
      name: "Ferretería y Complementos",
      slug: "ferreteria",
      products: [
        { name: "Alambre de fardo" },
        { name: "Clavos de 2 pulgadas" },
        { name: "Clavos 2 1/2" },
        { name: "Hoja Metal Desplegable - 470 grs - 0.75m x 2m" }
      ]
    }
  ];
  
  // Función para generar slug a partir del nombre
  export function generateSlug(name: string): string {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }
  
  // Función para buscar productos en el catálogo
  export function searchCatalogProducts(query: string): CatalogProduct[] {
    if (!query || query.trim() === '') return [];
    
    const results: CatalogProduct[] = [];
    const searchTerm = query.toLowerCase();
    
    catalogData.forEach(category => {
      const matchingProducts = category.products.filter(product => 
        product.name.toLowerCase().includes(searchTerm)
      );
      
      // Añadir categoría al producto para referencia
      results.push(...matchingProducts.map(product => ({
        ...product,
        category: category.slug,
        slug: product.slug || generateSlug(product.name)
      })));
    });
    
    return results;
  }
  
  // Función para obtener todos los productos de una categoría
  export function getCatalogProductsByCategory(categorySlug: string): CatalogProduct[] {
    const category = catalogData.find(cat => cat.slug === categorySlug);
    if (!category) return [];
    
    return category.products.map(product => ({
      ...product,
      slug: product.slug || generateSlug(product.name)
    }));
  }
  export function generateSlug(name: string): string {
    return name
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "") // Eliminar acentos
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }
  