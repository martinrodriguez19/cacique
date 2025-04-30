"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import { getCategories } from "@/app/lib/services/api";
import { ICategory } from "@/app/lib/models/Category";

export default function ProductosPage() {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      setIsLoading(true);
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="pt-24 pb-16">
      <Navbar />
      <div className="container-custom">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Nuestros Productos
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            En El Cacique encontrarás todo lo que necesitas para tu obra o proyecto de construcción.
            Explora nuestras categorías y descubre nuestra amplia variedad de productos.
          </p>
        </div>

        {/* Loading state */}
        {isLoading && (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#e32929]"></div>
          </div>
        )}

        {/* Categories */}
        {!isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {categories.length > 0 ? (
              categories.map((category) => (
                <div
                  key={category._id}
                  className="bg-white rounded-lg overflow-hidden shadow-lg border border-gray-200 hover:shadow-xl transition-all"
                >
                  <div className="relative h-60">
                    <Image
                      src={category.image || "/images/placeholder.jpg"}
                      alt={category.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h2 className="text-2xl font-semibold mb-3">{category.name}</h2>
                    <p className="text-gray-600 mb-4">{category.description}</p>
                    <Link
                      href={`/productos/${category.slug}`}
                      className="btn-primary inline-block"
                    >
                      Ver productos
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-3 text-center py-10">
                <h3 className="text-xl font-medium text-gray-600">
                  No hay categorías disponibles
                </h3>
                <p className="mt-2 text-gray-500">
                  Vuelve más tarde para ver nuestro catálogo completo
                </p>
              </div>
            )}
          </div>
        )}

        {/* Product Search Section */}
        <div className="bg-gray-50 rounded-lg p-8 mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-semibold mb-4">
              ¿Buscas un producto específico?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Si estás buscando un producto en particular, contáctanos y te ayudaremos a encontrarlo.
              Trabajamos con las mejores marcas y proveedores del mercado.
            </p>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <Link href="/contacto" className="btn-primary">
              Contactar ahora
            </Link>
            <Link href="/cotiza" className="btn-secondary">
              Solicitar cotización
            </Link>
          </div>
        </div>

        {/* Why Choose Us */}
        <div>
          <h2 className="text-3xl font-semibold mb-8 text-center">
            ¿Por qué elegirnos?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-[#e32929]/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-[#e32929]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Precios Competitivos</h3>
              <p className="text-gray-600">
                Ofrecemos precios entre 10-15% más bajos que la competencia, manteniendo la mejor calidad.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-[#e32929]/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-[#e32929]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Entregas Rápidas</h3>
              <p className="text-gray-600">
                Realizamos entregas en el día para que tu obra no se detenga. Cubrimos CABA y zona norte.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-[#e32929]/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-[#e32929]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Calidad Garantizada</h3>
              <p className="text-gray-600">
                Trabajamos solo con productos de primera calidad y las mejores marcas del mercado.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}