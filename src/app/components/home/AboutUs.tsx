/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import about from "../../../../public/images/corralon/c14.jpeg";

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


      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-2xl font-semibold mb-4">
            Empresa
          </h2>
          <p className="text-gray-600 mb-6">
            En El Cacique nos dedicamos a proveer materiales de construcción y 
            ferretería de alta calidad para profesionales y particulares. 
            Ubicados en Villa Martelli, atendemos a toda la zona norte del 
            Gran Buenos Aires y CABA.
          </p>
          <p className="text-gray-600 mb-6">
            Nuestra misión es ser el socio estratégico en tus proyectos, 
            ofreciendo productos de calidad, asesoramiento especializado 
            y el mejor servicio de logística y entrega.
          </p>
          
          
          
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
          {/* Implementación de mapa con Google Maps iframe */}
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3286.869336555476!2d-58.507512584772976!3d-34.53885938047565!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcb6e2faa89bd7%3A0x657a43f3b04d8eef!2sVenezuela%204846%2C%20B1603ADJ%20Villa%20Martelli%2C%20Provincia%20de%20Buenos%20Aires!5e0!3m2!1ses!2sar!4v1651244750921!5m2!1ses!2sar" 
            className="absolute inset-0 w-full h-full border-0" 
            allowFullScreen 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="Ubicación de El Cacique Corralón y Ferretería"
          ></iframe>
          
          <div className="absolute bottom-4 left-4 bg-white p-3 rounded-lg shadow-md z-10">
            <h4 className="font-semibold text-sm">El Cacique Corralón y Ferretería</h4>
            <p className="text-xs text-gray-600">Venezuela 4846, B1603ADJ Villa Martelli, Provincia de Buenos Aires</p>
            <a 
              href="https://goo.gl/maps/RZ5J7XqKZ5J5Lxq39" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-xs text-[#e32929] hover:text-[#c81e1e] mt-1 inline-flex items-center"
            >
              Ver en Google Maps
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-3 w-3 ml-1" 
                viewBox="0 0 20 20" 
                fill="currentColor"
              >
                <path 
                  fillRule="evenodd" 
                  d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" 
                  clipRule="evenodd" 
                />
              </svg>
            </a>
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
              src={about} 
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