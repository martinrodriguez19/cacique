/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { getCategories } from "@/app/lib/services/api";
import { ICategory } from "@/app/lib/models/Category";

export default function FeaturedCategories() {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      setIsLoading(true);
      try {
        const data = await getCategories(true); // Obtener solo categorías destacadas
        setCategories(data);
      } catch (error) {
        console.error("Error fetching featured categories:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <section className="py-16 bg-gray-50">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Nuestras Categorías</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Encuentra todo lo que necesitas para tu obra o proyecto de construcción 
            en nuestras principales categorías de productos
          </p>
        </div>

        {/* Loading state */}
        {isLoading && (
          <div className="flex justify-center items-center py-10">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#e32929]"></div>
          </div>
        )}

        {/* Categories grid */}
        {!isLoading && (
          <>
            {categories.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {categories.map((category) => (
                  <div
                    key={category._id}
                    className="group relative rounded-xl overflow-hidden shadow-lg bg-white hover:shadow-xl transition-all duration-300"
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10"></div>
                    <div className="relative h-80">
                      <Image
                        src={category.image || "/images/placeholder.jpg"}
                        alt={category.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                      <h3 className="text-2xl font-bold text-white mb-2">{category.name}</h3>
                      <p className="text-white/80 mb-4 line-clamp-2">{category.description}</p>
                      <Link
                        href={`/productos/${category.slug}`}
                        className="inline-flex items-center text-white bg-[#e32929] hover:bg-[#c81e1e] transition-colors px-4 py-2 rounded-md"
                      >
                        Ver productos
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
                ))}
              </div>
            ) : (
              <div className="text-center py-10">
                <p className="text-gray-600">No hay categorías destacadas disponibles en este momento.</p>
              </div>
            )}

            {/* View all categories button */}
            <div className="mt-12 text-center">
              <Link
                href="/productos"
                className="btn-secondary inline-flex items-center"
              >
                Ver todas las categorías
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
          </>
        )}
      </div>
    </section>
  );
}