"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { IProduct } from "@/app/lib/models/Product";
import { ICategory } from "@/app/lib/models/Category";
import { getProducts, getCategories } from "@/app/lib/services/api";

export default function FeaturedMaterials() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Obtener categorías y productos destacados
        const categoriesData = await getCategories();
        const productsData = await getProducts(
          activeCategory !== "all" ? activeCategory : undefined, 
          true
        );
        
        setCategories(categoriesData);
        setProducts(productsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [activeCategory]);

  // Filtrar productos por categoría
  const filteredProducts = activeCategory === "all" 
    ? products 
    : products.filter(product => product.category === activeCategory);

  // Categorías para el filtro
  const filterCategories = [
    { id: "all", name: "Todos" },
    ...categories.map(cat => ({ id: cat.slug, name: cat.name }))
  ];

  return (
    <div>
      {/* Category filters */}
      <div className="flex justify-center mb-10">
        <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
          {filterCategories.map((category) => (
            <button
              key={category.id}
              className={`px-4 py-2 rounded-full transition-all duration-300 ${
                activeCategory === category.id
                  ? "bg-[#e32929] text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
              onClick={() => setActiveCategory(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Loading state */}
      {isLoading && (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#e32929]"></div>
        </div>
      )}

      {/* Empty state */}
      {!isLoading && filteredProducts.length === 0 && (
        <div className="text-center py-10">
          <h3 className="text-xl font-medium text-gray-600">
            No hay productos destacados en esta categoría
          </h3>
          <p className="mt-2 text-gray-500">
            Prueba seleccionando otra categoría o visita nuestro catálogo completo
          </p>
        </div>
      )}

      {/* Products grid */}
      {!isLoading && filteredProducts.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow group"
            >
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={product.images[0] || "/images/placeholder.jpg"}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                <p className="text-gray-600 mb-4">{product.description}</p>
                <Link
                  href={`/productos/${product.category}/${product.slug}`}
                  className="text-[#e32929] hover:text-[#c81e1e] font-medium inline-flex items-center transition-colors"
                >
                  Ver detalles
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 ml-1"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {/* View all button */}
      <div className="mt-12 text-center">
        <Link 
          href="/productos" 
          className="btn-primary inline-flex items-center"
        >
          Ver todos los productos
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-5 w-5 ml-2" 
            viewBox="0 0 20 20" 
            fill="currentColor"
          >
            <path 
              fillRule="evenodd" 
              d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" 
              clipRule="evenodd" 
            />
          </svg>
        </Link>
      </div>
    </div>
  );
}