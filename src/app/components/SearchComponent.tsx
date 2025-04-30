"use client";

import { useState, useEffect, useRef, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getProducts } from "@/app/lib/services/api";
import { IProduct } from "@/app/lib/models/Product";

export default function SearchComponent() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<IProduct[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Cerrar el menú de búsqueda al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Realizar la búsqueda cuando se escribe
  useEffect(() => {
    const delaySearch = setTimeout(async () => {
      if (searchQuery.length >= 2) {
        setIsLoading(true);
        try {
          const allProducts = await getProducts();
          const filtered = allProducts.filter(
            (product) =>
              product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              product.description.toLowerCase().includes(searchQuery.toLowerCase())
          );
          setSearchResults(filtered.slice(0, 5)); // Limitar a 5 resultados
        } catch (error) {
          console.error("Error searching products:", error);
        } finally {
          setIsLoading(false);
        }
      } else {
        setSearchResults([]);
      }
    }, 300);

    return () => clearTimeout(delaySearch);
  }, [searchQuery]);

  // Manejar el envío del formulario
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/busqueda?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsOpen(false);
      setSearchQuery("");
    }
  };

  // Abrir la búsqueda
  const openSearch = () => {
    setIsOpen(true);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  };

  return (
    <div ref={searchRef} className="relative">
      {/* Botón de búsqueda */}
      <button
        onClick={openSearch}
        className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 transition-colors"
        aria-label="Buscar productos"
      >
        <svg
          className="w-5 h-5 text-gray-700"
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
      </button>

      {/* Modal de búsqueda */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-center pt-20 px-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl overflow-hidden">
            {/* Formulario de búsqueda */}
            <form onSubmit={handleSubmit} className="relative">
              <input
                ref={inputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar productos..."
                className="w-full p-4 pr-12 text-lg outline-none border-b"
              />
              <button
                type="submit"
                className="absolute right-4 top-1/2 transform -translate-y-1/2"
              >
                <svg
                  className="w-6 h-6 text-gray-500"
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
              </button>
            </form>

            {/* Estado de carga */}
            {isLoading && (
              <div className="flex justify-center items-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#e32929]"></div>
              </div>
            )}

            {/* Resultados de búsqueda */}
            {!isLoading && searchQuery.length >= 2 && (
              <div className="max-h-96 overflow-y-auto">
                {searchResults.length > 0 ? (
                  <div>
                    <div className="p-4 border-b">
                      <h3 className="text-sm font-medium text-gray-500">
                        Resultados sugeridos
                      </h3>
                    </div>
                    <ul>
                      {searchResults.map((product) => (
                        <li key={product._id} className="border-b last:border-b-0">
                          <Link
                            href={`/productos/${product.category}/${product.slug}`}
                            onClick={() => setIsOpen(false)}
                            className="flex items-center p-4 hover:bg-gray-50 transition-colors"
                          >
                            <div className="relative w-16 h-16 flex-shrink-0 mr-4 bg-gray-100 rounded overflow-hidden">
                              <Image
                                src={product.images[0] || "/images/placeholder.jpg"}
                                alt={product.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="flex-grow">
                              <h4 className="font-medium">{product.name}</h4>
                              <p className="text-sm text-gray-600 line-clamp-1">
                                {product.description}
                              </p>
                              <span className="text-xs text-gray-500 mt-1 inline-block">
                                {product.category}
                                {product.subcategory && ` > ${product.subcategory}`}
                              </span>
                            </div>
                          </Link>
                        </li>
                      ))}
                    </ul>
                    <div className="p-4 border-t">
                      <button
                        onClick={handleSubmit}
                        className="text-[#e32929] font-medium text-center w-full hover:underline"
                      >
                        Ver todos los resultados
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="p-8 text-center">
                    <svg
                      className="w-12 h-12 text-gray-300 mx-auto mb-4"
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
                    <h3 className="text-lg font-medium mb-2">
                      No se encontraron productos
                    </h3>
                    <p className="text-gray-500">
                      Intenta con otros términos o explora nuestras categorías
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Botón de cerrar */}
            <div className="p-4 border-t flex justify-end">
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}