"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// Mock products data
const products = [
  {
    id: 1,
    name: "Taladro Percutor 13mm 750W",
    image: "/images/products/drill.jpg",
    description: "Taladro percutor profesional con mandril de 13mm y potencia de 750W.",
    category: "electricas",
  },
  {
    id: 2,
    name: "Juego de Destornilladores 6 piezas",
    image: "/images/products/screwdrivers.jpg",
    description: "Set de destornilladores de precisión, incluye Philips y planos.",
    category: "manuales",
  },
  {
    id: 3,
    name: "Pintura Látex Interior 20L",
    image: "/images/products/paint-bucket.jpg",
    description: "Pintura látex lavable para interiores, excelente cobertura.",
    category: "pinturas",
  },
  {
    id: 4,
    name: "Escalera Aluminio 5 Escalones",
    image: "/images/products/ladder.jpg",
    description: "Escalera de aluminio resistente con 5 escalones y superficie antideslizante.",
    category: "escaleras",
  },
  {
    id: 5,
    name: "Martillo Carpintero 16oz",
    image: "/images/products/hammer.jpg",
    description: "Martillo de carpintero con mango ergonómico y cabeza de acero forjado.",
    category: "manuales",
  },
  {
    id: 6,
    name: "Amoladora Angular 4.5\" 850W",
    image: "/images/products/angle-grinder.jpg",
    description: "Amoladora angular profesional de 4.5 pulgadas y 850W de potencia.",
    category: "electricas",
  },
  {
    id: 7,
    name: "Cerradura de Embutir",
    image: "/images/products/door-lock.jpg",
    description: "Cerradura de embutir para puertas interiores con llave y picaporte.",
    category: "cerrajeria",
  },
  {
    id: 8,
    name: "Barniz Poliuretánico 1L",
    image: "/images/products/varnish.jpg",
    description: "Barniz poliuretánico brillante para maderas interiores y exteriores.",
    category: "pinturas",
  },
  {
    id: 9,
    name: "Juego de Llaves Combinadas 10 piezas",
    image: "/images/products/wrench-set.jpg",
    description: "Set de llaves combinadas en acero cromo vanadio, 10 piezas.",
    category: "manuales",
  },
  {
    id: 10,
    name: "Sierra Circular 7 1/4\" 1200W",
    image: "/images/products/circular-saw.jpg",
    description: "Sierra circular profesional con disco de 7 1/4\" y potencia de 1200W.",
    category: "electricas",
  },
  {
    id: 11,
    name: "Cinta Métrica 5m",
    image: "/images/products/tape-measure.jpg",
    description: "Cinta métrica de 5 metros con freno y gancho magnético.",
    category: "medicion",
  },
  {
    id: 12,
    name: "Adhesivo para Cerámicos 30kg",
    image: "/images/products/tile-adhesive.jpg",
    description: "Adhesivo para cerámicos y porcelanatos, bolsa de 30kg.",
    category: "adhesivos",
  },
];

// Categories for filtering
const categories = [
  { id: "all", name: "Todos" },
  { id: "electricas", name: "Herramientas Eléctricas" },
  { id: "manuales", name: "Herramientas Manuales" },
  { id: "pinturas", name: "Pinturas y Barnices" },
  { id: "cerrajeria", name: "Cerrajería" },
  { id: "escaleras", name: "Escaleras" },
  { id: "medicion", name: "Medición" },
  { id: "adhesivos", name: "Adhesivos" },
];

export default function FerreteriaPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = products.filter((product) => {
    const matchesCategory = activeCategory === "all" || product.category === activeCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="pt-24 pb-16">
      <div className="container-custom">
        {/* Hero Section */}
        <div className="relative mb-12 overflow-hidden rounded-xl">
          <div className="absolute inset-0 bg-black/50 z-10"></div>
          <Image
            src="/images/ferreteria-hero.jpg"
            alt="Ferretería"
            width={1200}
            height={400}
            className="w-full h-64 object-cover"
          />
          <div className="absolute inset-0 z-20 flex items-center">
            <div className="container-custom">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Ferretería Completa
              </h1>
              <p className="text-xl text-white/90 max-w-2xl">
                Herramientas y accesorios de calidad para profesionales y aficionados
              </p>
            </div>
          </div>
        </div>

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

            {/* Categories on desktop */}
            <div className="hidden md:flex flex-wrap items-center gap-2">
              <span className="text-gray-600 font-medium">Filtrar por:</span>
              {categories.map((category) => (
                <button
                  key={category.id}
                  className={`px-3 py-1 text-sm rounded-full transition-all ${
                    activeCategory === category.id
                      ? "bg-[#e32929] text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                  onClick={() => setActiveCategory(category.id)}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* Categories on mobile */}
          <div className="md:hidden mt-4 overflow-x-auto whitespace-nowrap py-2 -mx-4 px-4">
            {categories.map((category) => (
              <button
                key={category.id}
                className={`px-3 py-1 text-sm rounded-full transition-all mr-2 ${
                  activeCategory === category.id
                    ? "bg-[#e32929] text-white"
                    : "bg-gray-100 text-gray-700"
                }`}
                onClick={() => setActiveCategory(category.id)}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow border border-gray-200"
              >
                <div className="relative h-48">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-medium mb-2">{product.name}</h3>
                  <p className="text-gray-600 text-sm mb-4">{product.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs px-2 py-1 bg-gray-100 rounded-full text-gray-600">
                      {categories.find((c) => c.id === product.category)?.name}
                    </span>
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
                setActiveCategory("all");
              }}
              className="btn-secondary"
            >
              Ver todos los productos
            </button>
          </div>
        )}

        {/* Brands Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-semibold mb-6 text-center">
            Trabajamos con las mejores marcas
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {/* Placeholder for brand logos */}
            {[1, 2, 3, 4, 5, 6].map((index) => (
              <div 
                key={index} 
                className="bg-white border border-gray-200 rounded-lg p-4 flex items-center justify-center h-20"
              >
                <div className="w-full h-full flex items-center justify-center">
                  <svg
                    className="w-full h-12 text-gray-300"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 9.861A2.139 2.139 0 1 0 12 14.139 2.139 2.139 0 1 0 12 9.861zM6.008 16.255l-.472-.12C2.018 15.246 0 13.737 0 11.996s2.018-3.25 5.536-4.139l.472-.119.133.468a23.53 23.53 0 0 0 1.363 3.578l.101.213-.101.213a23.307 23.307 0 0 0-1.363 3.578l-.133.467zM5.317 8.95c-2.674.751-4.315 1.9-4.315 3.046 0 1.145 1.641 2.294 4.315 3.046a24.95 24.95 0 0 1 1.182-3.046A24.752 24.752 0 0 1 5.317 8.95zM17.992 16.255l-.133-.469a23.357 23.357 0 0 0-1.364-3.577l-.101-.213.101-.213a23.42 23.42 0 0 0 1.364-3.578l.133-.468.473.119c3.517.889 5.535 2.398 5.535 4.14s-2.018 3.25-5.535 4.139l-.473.12zm-.491-4.259c.48 1.039.877 2.06 1.182 3.046 2.675-.752 4.315-1.901 4.315-3.046 0-1.146-1.641-2.294-4.315-3.046a24.788 24.788 0 0 1-1.182 3.046z" />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 bg-gradient-to-r from-[#e32929]/90 to-[#c81e1e] rounded-lg p-8 text-center text-white">
          <h2 className="text-2xl font-semibold mb-4">¿Necesitas asesoramiento profesional?</h2>
          <p className="text-white/90 mb-6 max-w-2xl mx-auto">
            Nuestro equipo de expertos está listo para ayudarte a elegir las herramientas 
            adecuadas para tu proyecto.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              href="/contacto" 
              className="bg-white text-[#e32929] hover:bg-gray-100 font-medium py-2 px-6 rounded-md transition-colors"
            >
              Contactar ahora
            </Link>
            <Link 
              href="/cotiza" 
              className="bg-transparent border-2 border-white text-white hover:bg-white/10 font-medium py-2 px-6 rounded-md transition-colors"
            >
              Solicitar cotización
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}