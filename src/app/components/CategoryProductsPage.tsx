/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import { getProducts, getCategoryById, getCategories } from "@/app/lib/services/api";
import { IProduct } from "@/app/lib/models/Product";
import { ICategory } from "@/app/lib/models/Category";

interface CategoryPageProps {
  params: {
    categorySlug: string; // Asegurarse de que este nombre coincida con el parámetro de la ruta
  };
}

export default function CategoryProductsPage({ params }: CategoryPageProps) {
  const { categorySlug } = params;
  const [products, setProducts] = useState<IProduct[]>([]);
  const [category, setCategory] = useState<ICategory | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [subcategories, setSubcategories] = useState<string[]>([]);
  const [activeSubcategory, setActiveSubcategory] = useState("all");

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Obtener productos de la categoría
        const productsData = await getProducts(categorySlug);
        setProducts(productsData);

        // Extraer subcategorías únicas
        const subCats = [...new Set(productsData.map(product => product.subcategory))].filter(Boolean) as string[];
        setSubcategories(subCats);

        // Intentar obtener los detalles de la categoría
        const categoriesData = await getCategories();
        const categoryData = categoriesData.find(cat => cat.slug === categorySlug) || null;
        setCategory(categoryData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [categorySlug]);

  // Filtrar productos por subcategoría y búsqueda
  const filteredProducts = products.filter((product) => {
    const matchesSubcategory = activeSubcategory === "all" || product.subcategory === activeSubcategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSubcategory && matchesSearch;
  });

  // Construir las categorías de filtro
  const filterCategories = [
    { id: "all", name: "Todos" },
    ...subcategories.map(sub => ({ id: sub, name: sub }))
  ];

  return (
    <div className="pt-24 pb-16">
      <Navbar />
      
      <div className="container-custom">
        {/* Hero Section */}
        <div className="relative mb-12 overflow-hidden rounded-xl">
          <div className="absolute inset-0 bg-black/50 z-10"></div>
          <Image
            src={category?.image || "/images/categories/placeholder.jpg"}
            alt={category?.name || "Categoría"}
            width={1200}
            height={400}
            className="w-full h-64 object-cover"
          />
          <div className="absolute inset-0 z-20 flex items-center">
            <div className="container-custom">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                {category?.name || "Productos"}
              </h1>
              <p className="text-xl text-white/90 max-w-2xl">
                {category?.description || "Explora nuestra selección de productos de alta calidad"}
              </p>
            </div>
          </div>
        </div>

        {/* Loading state */}
        {isLoading && (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#e32929]"></div>
          </div>
        )}

        {!isLoading && (
          <>
            {/* Search and Filter */}
            <div className="mb-12">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                {/* Search */}
                <div className="relative w-full md:w-80">
                  <input
                    type="text"
                    placeholder="Buscar productos..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-[#e32929] focus:border-[#e32929] outline-none"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                    <svg
                      className="w-5 h-5 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </div>
                </div>

                {/* Subcategories on desktop */}
                {subcategories.length > 0 && (
                  <div className="hidden md:flex flex-wrap items-center gap-2">
                    <span className="text-gray-600 font-medium">Filtrar por:</span>
                    {filterCategories.map((category) => (
                      <button
                        key={category.id}
                        className={`px-3 py-1 text-sm rounded-full transition-all ${
                          activeSubcategory === category.id
                            ? "bg-[#e32929] text-white"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                        onClick={() => setActiveSubcategory(category.id)}
                      >
                        {category.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Subcategories on mobile */}
              {subcategories.length > 0 && (
                <div className="md:hidden mt-4 overflow-x-auto whitespace-nowrap py-2 -mx-4 px-4">
                  {filterCategories.map((category) => (
                    <button
                      key={category.id}
                      className={`px-3 py-1 text-sm rounded-full transition-all mr-2 ${
                        activeSubcategory === category.id
                          ? "bg-[#e32929] text-white"
                          : "bg-gray-100 text-gray-700"
                      }`}
                      onClick={() => setActiveSubcategory(category.id)}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Products Grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
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
                      <p className="text-gray-600 text-sm mb-4">{product.description}</p>
                      <div className="flex justify-between items-center">
                        {product.subcategory && (
                          <span className="text-xs px-2 py-1 bg-gray-100 rounded-full text-gray-600">
                            {product.subcategory}
                          </span>
                        )}
                        <Link
                          href="/cotiza"
                          className="text-[#e32929] hover:text-[#c81e1e] text-sm font-medium"
                        >
                          Solicitar precio
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <svg
                  className="w-16 h-16 text-gray-400 mx-auto mb-4"
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
                <h3 className="text-xl font-medium mb-2">No se encontraron productos</h3>
                <p className="text-gray-600 mb-4">
                  No hay productos que coincidan con tu búsqueda. Intenta con otros términos o categorías.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setActiveSubcategory("all");
                  }}
                  className="btn-secondary"
                >
                  Ver todos los productos
                </button>
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
          </>
        )}
      </div>
      <Footer />
    </div>
  );
}