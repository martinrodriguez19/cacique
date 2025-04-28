/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

export default function AboutUs() {
  const mapRef = useRef<HTMLDivElement>(null);
  const careersBannerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Observer para animaciones de elementos al entrar en el viewport
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("fade-in");
          }
        });
      },
      {
        threshold: 0.1,
      }
    );

    if (mapRef.current) {
      observer.observe(mapRef.current);
    }

    if (careersBannerRef.current) {
      observer.observe(careersBannerRef.current);
    }

    return () => {
      if (mapRef.current) {
        observer.unobserve(mapRef.current);
      }
      if (careersBannerRef.current) {
        observer.unobserve(careersBannerRef.current);
      }
    };
  }, []);

  return (
    <div>
      <div className="text-center mb-12">
        <h2 className="section-title">Sobre Nosotros</h2>
        <p className="section-subtitle">
          Conoce más sobre El Cacique Corralón y Ferretería
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <h3 className="text-2xl font-semibold mb-4">
            Empresa
          </h3>
          <p className="text-gray-600 mb-6">
            En El Cacique nos dedicamos a proveer materiales de construcción y 
            ferretería de alta calidad para profesionales y particulares. 
            Ubicados en Vicente López, atendemos a toda la zona norte del 
            Gran Buenos Aires y CABA.
          </p>
          <p className="text-gray-600 mb-6">
            Nuestra misión es ser el socio estratégico en tus proyectos, 
            ofreciendo productos de calidad, asesoramiento especializado 
            y el mejor servicio de logística y entrega.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <div className="bg-gray-50 p-4 rounded-lg text-center">
              <div className="text-3xl font-bold text-[#e32929] mb-2">5000+</div>
              <div className="text-gray-600 text-sm">
                Clientes satisfechos
              </div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg text-center">
              <div className="text-3xl font-bold text-[#e32929] mb-2">10000+</div>
              <div className="text-gray-600 text-sm">
                Proyectos realizados
              </div>
            </div>
          </div>
          
          <Link 
            href="/empresa" 
            className="btn-secondary inline-flex items-center"
          >
            Conocer más sobre nosotros
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
        
        <div 
          ref={mapRef} 
          className="rounded-lg overflow-hidden shadow-lg h-96 relative opacity-0"
        >
          {/* Placeholder for map. In production, replace with actual map */}
          <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
            <svg
              className="w-12 h-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </div>
          <Image 
            src="/images/map-placeholder.jpg"
            alt="Ubicación de El Cacique"
            fill
            className="object-cover"
          />
          <div className="absolute bottom-4 left-4 bg-white p-3 rounded-lg shadow-md">
            <h4 className="font-semibold text-sm">El Cacique Corralón y Ferretería</h4>
            <p className="text-xs text-gray-600">Av. Ejemplo 1234, Vicente López</p>
          </div>
        </div>
      </div>
      
      {/* Trabaja con Nosotros Banner */}
      <div 
        ref={careersBannerRef} 
        className="mt-16 mb-16 bg-gradient-to-r from-gray-800 to-gray-900 rounded-lg overflow-hidden shadow-lg opacity-0"
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
      
     
    </div>
  );
}