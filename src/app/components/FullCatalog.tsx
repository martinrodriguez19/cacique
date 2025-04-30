/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
"use client";

import { useState } from "react";
import Link from "next/link";
import { catalogData, generateSlug } from "@/app/lib/catalog-data";

export default function FullCatalog() {
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Toggle expandir/colapsar categoría
  const toggleCategory = (slug: string) => {
    setExpandedCategories(prev => 
      prev.includes(slug)
        ? prev.filter(cat => cat !== slug)
        : [...prev, slug]
    );
  };

  // Filtrar categorías y productos basados en la búsqueda
  const filteredCatalog = catalogData.map(category => {
    const filteredProducts = category.products.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return {
      ...category,
      products: filteredProducts,
      hasMatches: filteredProducts.length > 0
    };
  }).filter(category => searchTerm === "" || category.hasMatches);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6">Catálogo Completo de Productos</h2>
      
      {/* Búsqueda */}
      <div className="mb-8">
        <div className="relative">
          <input
            type="text"
            placeholder="Buscar en el catálogo..."
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:ring-[#e32929] focus:border-[#e32929] outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
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
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Catálogo */}
      {filteredCatalog.length > 0 ? (
        <div className="space-y-4">
          {filteredCatalog.map((category) => (
            <div key={category.slug} className="border border-gray-200 rounded-lg overflow-hidden">
              {/* Encabezado de categoría */}
              <button
                className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
                onClick={() => toggleCategory(category.slug)}
              >
                <div className="flex items-center">
                  <h3 className="text-lg font-semibold">{category.name}</h3>
                  <span className="ml-2 text-sm text-gray-500">
                    ({category.products.length} {category.products.length === 1 ? "producto" : "productos"})
                  </span>
                </div>
                <svg
                  className={`w-5 h-5 text-gray-500 transition-transform ${
                    expandedCategories.includes(category.slug) ? "transform rotate-180" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {/* Lista de productos */}
              {expandedCategories.includes(category.slug) && (
                <div className="p-4 border-t border-gray-200">
                  <ul className="divide-y divide-gray-100">
                    {category.products.map((product) => (
                      <li key={product.name} className="py-3">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-800">{product.name}</span>
                          <Link
                            href={`/cotiza?producto=${encodeURIComponent(product.name)}&categoria=${category.slug}`}
                            className="text-sm text-[#e32929] hover:text-[#c81e1e] font-medium"
                          >
                            Solicitar precio
                          </Link>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-10">
          <svg
            className="w-16 h-16 text-gray-300 mx-auto mb-4"
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
          <p className="text-gray-500 mb-4">
            No hay productos que coincidan con tu búsqueda
          </p>
          <button
            onClick={() => setSearchTerm("")}
            className="btn-secondary"
          >
            Ver todos los productos
          </button>
        </div>
      )}
    </div>
  );
}