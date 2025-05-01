"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getCategories, getProducts } from "@/app/lib/services/api";
import { IProduct } from "@/app/lib/models/Product";
import { ICategory } from "@/app/lib/models/Category";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

// Corregir la interfaz de props para que coincida con la estructura de la URL
interface CategoryProductsPageProps {
  params: {
    categorySlug: string;
  };
}

export default function CategoryProductsPage({ params }: CategoryProductsPageProps) {
  console.log("CategoryProductsPage", params, params.categorySlug);
  const { categorySlug } = params;
  console.log("CategoryProductsPage categorySlug:", categorySlug);

  const [category, setCategory] = useState<ICategory | null>(null);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Estados para la paginación
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(9);
  const [totalPages, setTotalPages] = useState(1);
  
  const router = useRouter();

  // Cargar categoría y productos
  useEffect(() => {
    const fetchCategoryAndProducts = async () => {
      setIsLoading(true);
      try {
        // Obtener todas las categorías
        const categories = await getCategories();
        
        // Buscar la categoría actual por slug
        const currentCategory = categories.find(cat => cat.slug === categorySlug);
        
        if (currentCategory) {
          setCategory(currentCategory);
          
          // Obtener productos de esta categoría
          const categoryProducts = await getProducts(currentCategory.slug);
          setProducts(categoryProducts);
          
          // Calcular el total de páginas
          setTotalPages(Math.ceil(categoryProducts.length / productsPerPage));
        } else {
          // Si la categoría no existe, redireccionar a la página de productos
          router.push('/productos');
        }
      } catch (error) {
        console.error("Error fetching category data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (categorySlug) {
      fetchCategoryAndProducts();
    }
  }, [categorySlug, router, productsPerPage]);

  // Ajustar cantidad de productos por página según el tamaño de pantalla
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setProductsPerPage(6);
      } else if (window.innerWidth < 1024) {
        setProductsPerPage(6);
      } else {
        setProductsPerPage(9);
      }
    };

    // Inicializar
    handleResize();
    
    // Agregar event listener
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Recalcular total de páginas cuando cambian los productos o productsPerPage
  useEffect(() => {
    setTotalPages(Math.ceil(products.length / productsPerPage));
    // Validar que la página actual esté dentro del rango
    if (currentPage > Math.ceil(products.length / productsPerPage) && products.length > 0) {
      setCurrentPage(Math.ceil(products.length / productsPerPage));
    }
  }, [products, productsPerPage, currentPage]);

  // Obtener productos para la página actual
  const currentProducts = products.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  // Función para cambiar de página
  const paginate = (pageNumber: number) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
      
      // Scroll suave hacia el inicio de los productos
      document.getElementById('category-products')?.scrollIntoView({ 
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
    <div className="pt-24 " id="category-products">
      <Navbar />
      <div className="container-custom pb-16">
        {/* Breadcrumbs */}
        <nav className="mb-8">
          <ol className="flex items-center text-sm">
            <li>
              <Link href="/" className="text-gray-500 hover:text-[#e32929]">
                Inicio
              </Link>
            </li>
            <li className="mx-2 text-gray-500">/</li>
            <li>
              <Link href="/productos" className="text-gray-500 hover:text-[#e32929]">
                Productos
              </Link>
            </li>
            <li className="mx-2 text-gray-500">/</li>
            <li className="text-gray-700 font-medium">
              {category?.name || 'Cargando...'}
            </li>
          </ol>
        </nav>

        {/* Category header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4">
            {category?.name || 'Cargando...'}
          </h1>
          {category && (
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              {category.description || `Explora nuestra selección de productos de ${category.name.toLowerCase()} de calidad premium para tus proyectos.`}
            </p>
          )}
        </div>

        {/* Loading state */}
        {isLoading && (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#e32929]"></div>
          </div>
        )}

        {/* No products message */}
        {!isLoading && products.length === 0 && (
          <div className="text-center py-16 bg-gray-50 rounded-lg">
            <svg
              className="w-16 h-16 text-gray-400 mx-auto mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
              />
            </svg>
            <h2 className="text-2xl font-medium text-gray-700 mb-2">
              No hay productos disponibles
            </h2>
            <p className="text-gray-500 mb-6">
              Actualmente no hay productos en esta categoría. Por favor, consulta otras categorías o vuelve más tarde.
            </p>
            <Link href="/productos" className="btn-primary">
              Ver todas las categorías
            </Link>
          </div>
        )}

        {/* Products grid */}
        {!isLoading && currentProducts.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
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
                  <p className="text-gray-600 mb-4 line-clamp-2">{product.description}</p>
                  {product.price ? (
                    <div className="text-lg font-semibold text-[#e32929] mb-4">
                      {new Intl.NumberFormat('es-AR', {
                        style: 'currency',
                        currency: 'ARS'
                      }).format(product.price)}
                      {product.unit && (
                        <span className="text-sm text-gray-600 ml-1">/ {product.unit}</span>
                      )}
                    </div>
                  ) : (
                    <div className="mb-4">
                      <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
                        Consultar precio
                      </span>
                    </div>
                  )}
                  <Link
                    href={`/productos/${categorySlug}/${product.slug}`}
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
        {!isLoading && products.length > productsPerPage && (
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
        
        {/* CTA Section */}
        <div className="mt-16 bg-gray-50 rounded-lg p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold mb-3">
              ¿No encuentras lo que buscas?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Contamos con un amplio catálogo de productos. Si no encuentras lo que necesitas,
              contáctanos y te ayudaremos a conseguirlo con las mejores condiciones.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/contacto" className="btn-primary">
              Contactar ahora
            </Link>
            <Link href="/cotiza" className="btn-secondary">
              Solicitar cotización
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}