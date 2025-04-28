"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

export default function CareersBanner() {
  const bannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fadeIn");
          }
        });
      },
      {
        threshold: 0.1,
      }
    );

    if (bannerRef.current) {
      observer.observe(bannerRef.current);
    }

    return () => {
      if (bannerRef.current) {
        observer.unobserve(bannerRef.current);
      }
    };
  }, []);

  return (
    <div 
      ref={bannerRef}
      className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-lg overflow-hidden shadow-lg opacity-0 transition-opacity duration-1000"
    >
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="p-8 md:p-10 lg:p-12 flex flex-col justify-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Trabaja con Nosotros
          </h2>
          <p className="text-gray-300 mb-6">
            ¿Te gustaría formar parte de nuestro equipo? En El Cacique buscamos 
            personas comprometidas y apasionadas por el servicio. Envíanos tu CV 
            y forma parte de una empresa en constante crecimiento.
          </p>
          <div>
            <Link 
              href="/trabaja-con-nosotros"
              className="inline-flex items-center px-6 py-3 bg-[#e32929] hover:bg-[#c81e1e] text-white rounded-md transition-colors font-medium"
            >
              Enviar mi CV
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
        <div className="relative h-64 md:h-auto">
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/60 to-transparent z-10"></div>
          <Image
            src="/images/careers.jpg" 
            alt="Trabaja con nosotros"
            fill
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
}