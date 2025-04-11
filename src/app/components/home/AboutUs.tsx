/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

export default function AboutUs() {
  const mapRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // This could be replaced with a real map implementation
    // like Google Maps or Mapbox in a production environment
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

    return () => {
      if (mapRef.current) {
        observer.unobserve(mapRef.current);
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
            Más de 20 Años de Experiencia
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
      
      <div className="mt-16 bg-gray-50 rounded-lg p-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h4 className="font-semibold text-lg mb-3">Horario de Atención</h4>
            <ul className="space-y-2 text-gray-600">
              <li className="flex justify-between">
                <span>Lunes a Viernes:</span>
                <span>8:00 - 18:00</span>
              </li>
              <li className="flex justify-between">
                <span>Sábados:</span>
                <span>8:00 - 13:00</span>
              </li>
              <li className="flex justify-between">
                <span>Domingos:</span>
                <span>Cerrado</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-lg mb-3">Contacto</h4>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-center">
                <svg
                  className="w-4 h-4 text-[#e32929] mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <span>(011) 4000-0000</span>
              </li>
              <li className="flex items-center">
                <svg
                  className="w-4 h-4 text-[#e32929] mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <span>info@elcacique.com.ar</span>
              </li>
              <li className="flex items-center">
                <svg
                  className="w-4 h-4 text-[#e32929] mr-2"
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
                <span>Av. Ejemplo 1234, Vicente López</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-lg mb-3">Zonas de Entrega</h4>
            <ul className="space-y-1 text-gray-600">
              <li>• Vicente López</li>
              <li>• San Isidro</li>
              <li>• Olivos</li>
              <li>• CABA</li>
              <li>• Zona Norte GBA</li>
              <li>• Consultar por otras zonas</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}