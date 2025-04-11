"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// Mock products data
const products = [
  {
    id: 1,
    name: "Cemento Portland 50kg",
    image: "/images/products/cement-bag.jpg",
    description: "Cemento Portland normal de alta calidad, bolsa de 50kg.",
    category: "cemento",
  },
  {
    id: 2,
    name: "Ladrillos Huecos 12x18x33",
    image: "/images/products/hollow-bricks.jpg",
    description: "Ladrillos cerámicos huecos de 12x18x33cm, ideal para muros internos.",
    category: "ladrillos",
  },
  {
    id: 3,
    name: "Hierro Nervado 10mm",
    image: "/images/products/rebar-10mm.jpg",
    description: "Hierro nervado de 10mm de diámetro, en barras de 12m.",
    category: "hierros",
  },
  {
    id: 4,
    name: "Arena Fina x m³",
    image: "/images/products/fine-sand.jpg",
    description: "Arena fina lavada para revoques y terminaciones.",
    category: "arenas",
  },
  {
    id: 5,
    name: "Ladrillos Comunes",
    image: "/images/products/common-bricks.jpg",
    description: "Ladrillos comunes macizos, ideales para parrillas y hornos.",
    category: "ladrillos",
  },
  {
    id: 6,
    name: "Bloques de Hormigón 20x20x40",
    image: "/images/products/concrete-blocks.jpg",
    description: "Bloques de hormigón resistentes para muros exteriores.",
    category: "bloques",
  },
  {
    id: 7,
    name: "Hierro Nervado 8mm",
    image: "/images/products/rebar-8mm.jpg",
    description: "Hierro nervado de 8mm de diámetro, en barras de 12m.",
    category: "hierros",
  },
  {
    id: 8,
    name: "Cemento de Albañilería 40kg",
    image: "/images/products/masonry-cement.jpg",
    description: "Cemento especial para trabajos de albañilería, bolsa de 40kg.",
    category: "cemento",
  },
  {
    id: 9,
    name: "Piedra Partida x m³",
    image: "/images/products/crushed-stone.jpg",
    description: "Piedra partida para hormigón, tamaño 6-20mm.",
    category: "aridos",
  },
  {
    id: 10,
    name: "Malla Electrosoldada 15x15",
    image: "/images/products/welded-mesh.jpg",
    description: "Malla electrosoldada de 15x15cm, para refuerzo de hormigón.",
    category: "hierros",
  },
  {
    id: 11,
    name: "Cal Hidratada 25kg",
    image: "/images/products/hydrated-lime.jpg",
    description: "Cal hidratada para mezclas, bolsa de 25kg.",
    category: "cal",
  },
  {
    id: 12,
    name: "Viguetas Pretensadas 3m",
    image: "/images/products/prestressed-beams.jpg",
    description: "Viguetas pretensadas para losas, longitud 3m.",
    category: "viguetas",
  },
];

// Categories for filtering
const categories = [
  { id: "all", name: "Todos" },
  { id: "cemento", name: "Cemento" },
  { id: "ladrillos", name: "Ladrillos" },
  { id: "hierros", name: "Hierros y Perfiles" },
  { id: "arenas", name: "Arenas" },
  { id: "bloques", name: "Bloques" },
  { id: "aridos", name: "Áridos" },
  { id: "cal", name: "Cal" },
  { id: "viguetas", name: "Viguetas y Losas" },
];

export default function ObraGruesaPage() {
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
            src="/images/obra-gruesa-hero.jpg"
            alt="Obra Gruesa"
            width={1200}
            height={400}
            className="w-full h-64 object-cover"
          />
          <div className="absolute inset-0 z-20 flex items-center">
            <div className="container-custom">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Materiales de Obra Gruesa
              </h1>
              <p className="text-xl text-white/90 max-w-2xl">
                Todo lo que necesitas para los cimientos y estructura de tu construcción
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
    </div>
  );
}