"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import servicio from "../../../../public/images/corralon/c1.jpeg";

const services = [
  {
    id: 1,
    title: "Envíos Rápidos",
    description:
      "Realizamos entregas en el día para que tu obra no se detenga. Cubrimos CABA, Vicente López y Zona Norte.",
    icon: (
      <svg
        className="w-12 h-12 text-[#e32929]"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
        />
      </svg>
    ),
  },
  {
    id: 2,
    title: "Logística Eficiente",
    description:
      "Contamos con una flota de vehículos y personal especializado para la entrega y manejo de materiales.",
    icon: (
      <svg
        className="w-12 h-12 text-[#e32929]"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"
        />
      </svg>
    ),
  },
  {
    id: 3,
    title: "Precios Competitivos",
    description:
      "Ofrecemos precios entre 10-15% más económicos que la competencia. Tu presupuesto rinde más con nosotros.",
    icon: (
      <svg
        className="w-12 h-12 text-[#e32929]"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
  {
    id: 4,
    title: "Venta Mayorista",
    description:
      "Atendemos a pequeños constructores, arquitectos y profesionales con condiciones especiales por mayor.",
    icon: (
      <svg
        className="w-12 h-12 text-[#e32929]"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
        />
      </svg>
    ),
  },
];

export default function ServicesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
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

    const elements = document.querySelectorAll(".service-card, .commitment-section");
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <div ref={sectionRef}>
      <div className="text-center mb-12">
        <span className="inline-block px-4 py-1 bg-white/10 text-[#e32929] rounded-full text-sm font-medium mb-4">
          Por qué elegirnos
        </span>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 font-poppins">
          Nuestros Servicios
        </h2>
        <p className="text-gray-300 text-lg max-w-2xl mx-auto">
          Nos destacamos por ofrecer soluciones completas para tu proyecto
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {services.map((service, index) => (
          <div
            key={service.id}
            className="service-card group bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/10 hover:bg-white/20 hover:border-[#e32929]/50 transform hover:-translate-y-2 transition-all duration-300 opacity-0"
            style={{ animationDelay: `${index * 150}ms` }}
          >
            <div className="mb-4 p-3 bg-white/10 rounded-lg inline-block group-hover:bg-[#e32929]/20 transition-colors">
              {service.icon}
            </div>
            <h3 className="text-xl font-semibold mb-3 text-white">{service.title}</h3>
            <p className="text-gray-300">{service.description}</p>
          </div>
        ))}
      </div>

      <div className="commitment-section mt-20 bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 opacity-0">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="relative h-64 lg:h-auto">
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10"></div>
            <Image
              src={servicio}
              alt="Servicio de entrega"
              fill
              className="object-cover"
            />
          </div>
          <div className="p-8 lg:p-12 flex flex-col justify-center">
            <div className="inline-flex items-center mb-6">
              <div className="h-1 w-12 bg-[#e32929] mr-3"></div>
              <span className="text-[#e32929] font-medium uppercase tracking-wider text-sm">
                Compromiso
              </span>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Comprometidos con tu Proyecto
            </h3>
            <p className="text-gray-300 mb-6">
              En El Cacique nos especializamos en proveer materiales de construcción de calidad y servicio excepcional.
            </p>
            <ul className="space-y-4">
              <li className="flex items-start group">
                <div className="p-1 bg-[#e32929]/20 rounded-full mr-3 mt-0.5 group-hover:bg-[#e32929]/30 transition-colors">
                  <svg
                    className="w-4 h-4 text-[#e32929]"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <span className="text-gray-300">Amplio stock disponible para entrega inmediata</span>
              </li>
              <li className="flex items-start group">
                <div className="p-1 bg-[#e32929]/20 rounded-full mr-3 mt-0.5 group-hover:bg-[#e32929]/30 transition-colors">
                  <svg
                    className="w-4 h-4 text-[#e32929]"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <span className="text-gray-300">Servicio de asesoramiento técnico personalizado</span>
              </li>
              <li className="flex items-start group">
                <div className="p-1 bg-[#e32929]/20 rounded-full mr-3 mt-0.5 group-hover:bg-[#e32929]/30 transition-colors">
                  <svg
                    className="w-4 h-4 text-[#e32929]"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <span className="text-gray-300">Entregas programadas según el avance de tu obra</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}