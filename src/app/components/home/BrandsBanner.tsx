/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useRef } from "react";
import Image from "next/image";
import weber from "../../../../public/images/marcas/weber.png";
import cementos from "../../../../public/images/marcas/cementos.png";
import hornero from "../../../../public/images/marcas/hornero.png";
import calalbors from "../../../../public/images/marcas/calalbors.png";
import tuyango from "../../../../public/images/marcas/tuyango.png";

// Lista de marcas
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
  const allBrands = [...brands, ...brands, ...brands, ...brands]; // duplicado para scroll infinito

  return (
    <div className=" overflow-hidden">

      <div className="relative w-full">
        {/* Gradientes laterales */}
        <div className="absolute left-0 top-0 w-8 h-full bg-gradient-to-r from-white to-transparent z-10"></div>
        <div className="absolute right-0 top-0 w-8 h-full bg-gradient-to-l from-white to-transparent z-10"></div>

        <div className="flex w-max animate-scroll whitespace-nowrap space-x-12">
          {allBrands.map((brand, index) => (
            <div key={`${brand.id}-${index}`} className="flex-shrink-0">
              <div className="relative w-24 h-16 md:w-32 md:h-20 grayscale hover:grayscale-0 transition-all duration-300">
                <Image
                  src={brand.logo}
                  alt={brand.name}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 96px, 128px"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
