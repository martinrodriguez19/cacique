"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import hero from "../../../../public/images/hero.jpg";
import envios from "../../../../public/images/h-3.jpeg";

const slides = [
  {
    id: 1,
    title: "Materiales de Construcción de Calidad",
    subtitle: "Todo lo que necesitas para tu obra en un solo lugar",
    cta: "Ver Productos",
    link: "/productos",
    image: hero,
  },
  {
    id: 2,
    title: "Envíos Rápidos a CABA y Zona Norte",
    subtitle: "Entregamos en el día para que tu obra no se detenga",
    cta: "Consultar Zonas",
    link: "/contacto",
    image: envios,
  },
];

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  return (
    <div className="relative py-16 min-h-[700px] md:min-h-[750px] w-full overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800">
      {/* Pattern overlay */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      <div className="container-custom relative z-20 h-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 h-full items-center">
          {/* Content */}
          <div className="py-12 lg:py-0">
            {slides.map((slide, index) => (
              <div
                key={slide.id}
                className={`transition-all duration-1000 transform 
                  ${
                    index === currentSlide
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-12"
                  }`}
              >
                {index === currentSlide && (
                  <>
                    <div className="inline-flex items-center mb-6">
                      <div className="h-1 w-12 bg-[#e32929] mr-3"></div>
                      <span className="text-[#e32929] font-medium uppercase tracking-wider text-sm">
                        Bienvenidos
                      </span>
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 font-poppins leading-tight">
                      {slide.title}
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
                      {slide.subtitle}
                    </p>
                    <div className="flex flex-wrap gap-4">
                      <Link
                        href={slide.link}
                        className="group inline-flex items-center bg-[#e32929] hover:bg-[#c81e1e] text-white font-medium py-4 px-8 rounded-md transition-all duration-300 transform hover:scale-105 hover:shadow-xl text-lg"
                      >
                        {slide.cta}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 ml-2 transform group-hover:translate-x-1 transition-transform"
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
                      <Link
                        href="/cotiza"
                        className="group inline-flex items-center bg-white/10 backdrop-blur-sm border-2 border-white/20 text-white hover:bg-white hover:text-gray-900 font-medium py-4 px-8 rounded-md transition-all duration-300 text-lg"
                      >
                        Solicitar Cotización
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 ml-2 transform group-hover:translate-x-1 transition-transform"
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
                  </>
                )}
              </div>
            ))}
          </div>

          {/* Image - Vertical orientation */}
          <div className="relative h-[400px] lg:h-[600px] rounded-2xl overflow-hidden shadow-2xl">
            {slides.map((slide, index) => (
              <div
                key={slide.id}
                className={`absolute inset-0 transition-all duration-1000 ${
                  index === currentSlide 
                    ? "opacity-100 scale-100" 
                    : "opacity-0 scale-105"
                }`}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent z-10" />
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  className="object-cover"
                  priority={index === 0}
                />
              </div>
            ))}
            
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-[#e32929]/20 rounded-full blur-2xl"></div>
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-orange-500/20 rounded-full blur-2xl"></div>
          </div>
        </div>
      </div>

      {/* Navigation arrows - hidden on mobile */}
      <button
        className="hidden md:flex absolute left-4 top-1/2 transform -translate-y-1/2 z-30 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white p-3 rounded-full transition-all duration-300 border border-white/20 items-center justify-center"
        onClick={prevSlide}
        aria-label="Previous slide"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>
      <button
        className="hidden md:flex absolute right-4 top-1/2 transform -translate-y-1/2 z-30 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white p-3 rounded-full transition-all duration-300 border border-white/20 items-center justify-center"
        onClick={nextSlide}
        aria-label="Next slide"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>

      {/* Slide indicators */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-30 flex justify-center space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? "bg-[#e32929] w-8"
                : "bg-white/50 hover:bg-white/70 w-2"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          ></button>
        ))}
      </div>

     
    </div>
  );
}