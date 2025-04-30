"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import { getProducts, getCategories } from "@/app/lib/services/api";
import { IProduct } from "@/app/lib/models/Product";
import { ICategory } from "@/app/lib/models/Category";

export default function SearchResultsPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  
  const [products, setProducts] = useState<IProduct[]>([]);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("all");

  useEffect(() => {
    const fetchData = async () => {
      if (!query) return;
      
      setIsLoading(true);
      try {
        // Obtener todos los productos
        const allProducts = await getProducts();
        const allCategories = await getCategories();
        
        // Filtrar por la consulta
        const filtered = allProducts.filter(
          product =>
            product.name.toLowerCase().includes(query.toLowerCase()) ||
            product.description.toLowerCase().includes(query.toLowerCase())
        );
        
        setProducts(filtered);
        setCategories(allCategories);
      } catch (error) {
        console.error("Error searching products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [query]);

  // Filtrar por categoría
  const filteredProducts = activeFilter === "all" 
    ? products 
    : products.filter(product => product.category === activeFilter);

  // Obtener categorías únicas de los resultados
  const resultCategories = [...new Set(products.map(product => product.category))];
  
  return (
    <div className="pt-24 pb-16">
      <Navbar />
      <div className="container-custom">
        {/* Hero Section */}
        <div className="mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Resultados de búsqueda
          </h1>
          {query && (
            <p className="text-xl text-gray-600">
              Mostrando resultados para: <span className="font-medium">"{query}"</span>
            </p>
          )}
        </div>

        {/* Loading state */}
        {isLoading && (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#e32929]"></div>
          </div>
        )}

        {/* Empty state */}
        {!isLoading && products.length === 0 && (
          <div className="text-center py-16 bg-gray-50 rounded-lg">
            <svg
              className="w-20 h-20 text-gray-400 mx-auto mb-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h2 className="text-2xl font-semibold mb-4">No se encontraron productos</h2>
            <p className="text-gray-600 mb-6 max-w-xl mx-auto">
              No hay productos que coincidan con tu búsqueda. Intenta con otros términos o explora nuestras categorías.
            </p>
            <Link href="/productos" className="btn-primary">
              Ver todas las categorías
            </Link>
          </div>
        )}

        {/* Results with filters */}
        {!isLoading && products.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar filter */}
            <div className="lg:col-span-1">
              <div className="bg-white p-6 rounded-lg shadow-md sticky top-28">
                <h2 className="text-lg font-semibold mb-4">Filtrar por categoría</h2>
                <ul className="space-y-2">
                  <li>
                    <button
                      className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                        activeFilter === "all"
                          ? "bg-[#e32929]/10 text-[#e32929] font-medium"
                          : "hover:bg-gray-100"
                      }`}
                      onClick={() => setActiveFilter("all")}
                    >
                      Todas las categorías ({products.length})
                    </button>
                  </li>
                  {resultCategories.map(catSlug => {
                    const category = categories.find(c => c.slug === catSlug);
                    const count = products.filter(p => p.category === catSlug).length;
                    
                    return (
                      <li key={catSlug}>
                        <button
                          className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                            activeFilter === catSlug
                              ? "bg-[#e32929]/10 text-[#e32929] font-medium"
                              : "hover:bg-gray-100"
                          }`}
                          onClick={() => setActiveFilter(catSlug)}
                        >
                          {category?.name || catSlug} ({count})
                        </button>
                      </li>
                    );
                  })}
                </ul>
                
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h3 className="font-medium mb-3">¿No encuentras lo que buscas?</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Contáctanos y te ayudaremos a encontrar el producto que necesitas.
                  </p>
                  <Link href="/contacto" className="btn-secondary w-full text-center text-sm">
                    Contactar ahora
                  </Link>
                </div>
              </div>
            </div>

            {/* Results grid */}
            <div className="lg:col-span-3">
              <div className="mb-6 flex items-center justify-between">
                <p className="text-gray-600">
                  {filteredProducts.length} {filteredProducts.length === 1 ? "producto encontrado" : "productos encontrados"}
                </p>
              </div>
              
              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredProducts.map((product) => {
                    const category = categories.find(c => c.slug === product.category);
                    
                    return (
                      <div
                        key={product._id}
                        className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow border border-gray-200"
                      >
                        <div className="relative h-48">
                          <Image
                            src={product.images[0] || "/images/placeholder.jpg"}
                            alt={product.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="p-4">
                          <h3 className="text-lg font-medium mb-2">{product.name}</h3>
                          <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
                          <div className="flex justify-between items-center">
                            <span className="text-xs px-2 py-1 bg-gray-100 rounded-full text-gray-600">
                              {category?.name || product.category}
                            </span>
                            <Link
                              href={`/productos/${product.category}/${product.slug}`}
                              className="text-[#e32929] hover:text-[#c81e1e] text-sm font-medium"
                            >
                              Ver detalles
                            </Link>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                  <h3 className="text-xl font-medium mb-2">No hay productos en esta categoría</h3>
                  <p className="text-gray-600 mb-4">
                    Prueba seleccionando otra categoría o con términos de búsqueda diferentes.
                  </p>
                  <button
                    onClick={() => setActiveFilter("all")}
                    className="btn-secondary"
                  >
                    Ver todos los resultados
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-16 bg-gray-50 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-semibold mb-4">¿No encuentras lo que buscas?</h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Contamos con un amplio catálogo de productos. Si no encuentras lo que necesitas, 
            contáctanos y te ayudaremos a conseguirlo.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
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
  );}