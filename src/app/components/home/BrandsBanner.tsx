"use client";

import Image from "next/image";
import weber from "../../../../public/images/marcas/weber.png";
import cementos from "../../../../public/images/marcas/cementos.png";
import hornero from "../../../../public/images/marcas/hornero.png";
import calalbors from "../../../../public/images/marcas/calalbors.png";
import tuyango from "../../../../public/images/marcas/tuyango.png";

const brands = [
  { id: 1, name: "Weber", logo: weber },
  { id: 2, name: "Cementos Avellaneda", logo: cementos },
  { id: 3, name: "El Hornero", logo: hornero },
  { id: 4, name: "Calal Bors", logo: calalbors },
  { id: 5, name: "Tuyango", logo: tuyango },
  { id: 6, name: "Weber", logo: weber },
  { id: 7, name: "Cementos Avellaneda", logo: cementos },
  { id: 8, name: "El Hornero", logo: hornero },
  { id: 9, name: "Calal Bors", logo: calalbors },
  { id: 10, name: "Tuyango", logo: tuyango },
];

export default function BrandsBanner() {
  const allBrands = [...brands, ...brands, ...brands, ...brands];

  return (
    <div className="overflow-hidden py-4">
      <div className="text-center mb-6">
        <h3 className="text-lg font-medium text-gray-600">Trabajamos con las mejores marcas</h3>
      </div>

      <div className="relative w-full">
        {/* Gradientes laterales mejorados */}
        <div className="absolute left-0 top-0 w-24 h-full bg-gradient-to-r from-white via-white/80 to-transparent z-10"></div>
        <div className="absolute right-0 top-0 w-24 h-full bg-gradient-to-l from-white via-white/80 to-transparent z-10"></div>

        <div className="flex w-max animate-scroll whitespace-nowrap space-x-16">
          {allBrands.map((brand, index) => (
            <div key={`${brand.id}-${index}`} className="flex-shrink-0 group">
              <div className="relative w-28 h-20 md:w-36 md:h-24 grayscale hover:grayscale-0 transition-all duration-500 transform hover:scale-110">
                <Image
                  src={brand.logo}
                  alt={brand.name}
                  fill
                  className="object-contain filter drop-shadow-md"
                  sizes="(max-width: 768px) 112px, 144px"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}