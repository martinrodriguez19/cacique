"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// Featured materials data
const materials = [
  {
    id: 1,
    name: "Cemento y Hormigón",
    image: "/images/products/cement.jpg",
    description: "Material esencial para construcción. Contamos con las mejores marcas del mercado.",
    category: "obraGruesa",
    link: "/productos/obra-gruesa#cemento",
  },
  {
    id: 2,
    name: "Ladrillos y Bloques",
    image: "/images/products/bricks.jpg",
    description: "Amplia variedad de ladrillos y bloques para diferentes usos en la construcción.",
    category: "obraGruesa",
    link: "/productos/obra-gruesa#ladrillos",
  },
  {
    id: 3,
    name: "Herramientas Eléctricas",
    image: "/images/products/powertools.jpg",
    description: "Herramientas de calidad para profesionales y aficionados al mejor precio.",
    category: "ferreteria",
    link: "/productos/ferreteria#electricas",
  },
  {
    id: 4,
    name: "Pinturas y Revestimientos",
    image: "/images/products/paint.jpg",
    description: "Todo en pinturas, barnices y revestimientos para interiores y exteriores.",
    category: "ferreteria",
    link: "/productos/ferreteria#pinturas",
  },
  {
    id: 5,
    name: "Hierros y Perfiles",
    image: "/images/products/iron.jpg",
    description: "Hierros y perfiles para construcción y trabajos de herrería.",
    category: "obraGruesa",
    link: "/productos/obra-gruesa#hierros",
  },
  {
    id: 6,
    name: "Herramientas Manuales",
    image: "/images/products/handtools.jpg",
    description: "Amplia gama de herramientas manuales para todo tipo de trabajos.",
    category: "ferreteria",
    link: "/productos/ferreteria#manuales",
  },
];

// Categories for filtering
const categories = [
  { id: "all", name: "Todos" },
  { id: "obraGruesa", name: "Obra Gruesa" },
  { id: "ferreteria", name: "Ferretería" },
];

export default function FeaturedMaterials() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredMaterials =
    activeCategory === "all"
      ? materials
      : materials.filter((material) => material.category === activeCategory);

  return (
    <div>
      {/* Category filters */}
      <div className="flex justify-center mb-10">
        <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
          {categories.map((category) => (
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

      {/* Materials grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredMaterials.map((material) => (
          <div
            key={material.id}
            className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow group"
          >
            <div className="relative h-64 overflow-hidden">
              <Image
                src={material.image}
                alt={material.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">{material.name}</h3>
              <p className="text-gray-600 mb-4">{material.description}</p>
              <Link
                href={material.link}
                className="text-[#e32929] hover:text-[#c81e1e] font-medium inline-flex items-center transition-colors"
              >
                Ver productos
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