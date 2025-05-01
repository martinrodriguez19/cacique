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

    const elements = document.querySelectorAll(".service-card");
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <div ref={sectionRef}>
      <div className="text-center mb-12">
        <h2 className="section-title">Nuestros Servicios</h2>
        <p className="section-subtitle">
          Nos destacamos por ofrecer soluciones completas para tu proyecto
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {services.map((service, index) => (
          <div
            key={service.id}
            className="service-card bg-white p-6 rounded-lg shadow-md border-t-4 border-[#e32929] transform hover:-translate-y-2 transition-transform duration-300 opacity-0"
            style={{ animationDelay: `${index * 150}ms` }}
          >
            <div className="mb-4">{service.icon}</div>
            <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
            <p className="text-gray-600">{service.description}</p>
          </div>
        ))}
      </div>

      <div className="mt-16 bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="relative h-64 lg:h-auto">
            <Image
              src={servicio}
              alt="Servicio de entrega"
              fill
              className="object-cover"
            />
          </div>
          <div className="p-8 lg:p-12 flex flex-col justify-center">
            <h3 className="text-2xl font-semibold mb-4">
              Comprometidos con tu Proyecto
            </h3>
            <p className="text-gray-600 mb-6">
              En El Cacique nos especializamos en proveer materiales de construcción de calidad y servicio excepcional. 
            
            </p>
            <ul className="space-y-3">
              <li className="flex items-start">
                <svg
                  className="w-5 h-5 text-[#e32929] mr-2 mt-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Amplio stock disponible para entrega inmediata</span>
              </li>
              <li className="flex items-start">
                <svg
                  className="w-5 h-5 text-[#e32929] mr-2 mt-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Servicio de asesoramiento técnico personalizado</span>
              </li>
              <li className="flex items-start">
                <svg
                  className="w-5 h-5 text-[#e32929] mr-2 mt-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Entregas programadas según el avance de tu obra</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}