/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
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
  
  // Estados para la paginación
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(6);
  const [totalPages, setTotalPages] = useState(1);

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
        
        // Calcular total de páginas
        setTotalPages(Math.ceil(productsData.length / productsPerPage));
        // Reset a la primera página cuando cambia la categoría
        setCurrentPage(1);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [activeCategory]);

  // Ajustar cantidad de productos por página según tamaño de pantalla
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setProductsPerPage(3);
      } else if (window.innerWidth < 1024) {
        setProductsPerPage(4);
      } else {
        setProductsPerPage(6);
      }
    };

    // Set on initial load
    handleResize();
    
    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Clean up
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Recalcular total de páginas cuando cambian los productos o productsPerPage
  useEffect(() => {
    setTotalPages(Math.ceil(filteredProducts.length / productsPerPage));
    // Validar que la página actual esté dentro del rango
    if (currentPage > Math.ceil(filteredProducts.length / productsPerPage) && filteredProducts.length > 0) {
      setCurrentPage(Math.ceil(filteredProducts.length / productsPerPage));
    }
  }, [products, productsPerPage, activeCategory]);

  // Filtrar productos por categoría
  const filteredProducts = activeCategory === "all" 
    ? products 
    : products.filter(product => product.category === activeCategory);

  // Obtener productos para la página actual
  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  // Categorías para el filtro
  const filterCategories = [
    { id: "all", name: "Todos" },
    ...categories.map(cat => ({ id: cat.slug, name: cat.name }))
  ];

  // Función para cambiar de página
  const paginate = (pageNumber: number) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
      
      // Scroll suave hacia el inicio de los productos
      document.getElementById('featured-products')?.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  // Generar array de números de página para la paginación
  const getPageNumbers = () => {
    const pageNumbers = [];
    
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Siempre mostrar primera página
      pageNumbers.push(1);
      
      // Determinar rango alrededor de la página actual
      let startPage = Math.max(2, currentPage - 1);
      let endPage = Math.min(totalPages - 1, currentPage + 1);
      
      // Ajustar el rango cerca del principio o final
      if (currentPage <= 3) {
        endPage = 4;
      } else if (currentPage >= totalPages - 2) {
        startPage = totalPages - 3;
      }
      
      // Agregar ellipsis si es necesario
      if (startPage > 2) {
        pageNumbers.push('...');
      }
      
      // Agregar páginas del rango
      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }
      
      // Agregar ellipsis si es necesario
      if (endPage < totalPages - 1) {
        pageNumbers.push('...');
      }
      
      // Siempre mostrar la última página
      pageNumbers.push(totalPages);
    }
    
    return pageNumbers;
  };

  return (
    <div id="featured-products">
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
      {!isLoading && currentProducts.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentProducts.map((product) => (
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
      
      {/* Pagination */}
      {!isLoading && filteredProducts.length > productsPerPage && (
        <div className="mt-10 flex justify-center">
          <nav className="flex items-center">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-3 py-1 rounded-l-md border ${
                currentPage === 1
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
              aria-label="Página anterior"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            
            {getPageNumbers().map((number, index) => (
              <button
                key={index}
                onClick={() => typeof number === 'number' ? paginate(number) : null}
                className={`px-3 py-1 border-t border-b ${
                  number === currentPage
                    ? "bg-[#e32929] text-white border-[#e32929]"
                    : number === '...'
                    ? "bg-white text-gray-500 cursor-default"
                    : "bg-white text-gray-700 hover:bg-gray-50"
                }`}
                disabled={number === '...'}
              >
                {number}
              </button>
            ))}
            
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-3 py-1 rounded-r-md border ${
                currentPage === totalPages
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
              aria-label="Página siguiente"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </nav>
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