/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import Image from "next/image";
import Link from "next/link";
import QuoteForm from "../components/home/QuoteForm";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import empresa from "../../../public/images/corralon/c16.jpeg"

export default function CotizaPage() {
  return (
    <div className="pt-36 ">
      <Navbar />
      <div className="container-custom pb-16">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Cotiza tu Proyecto
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Completa el formulario a continuación y recibirás una cotización
            personalizada para tu obra o proyecto.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 mb-16">
          <div className="lg:col-span-3 bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold mb-6">
              Solicita tu Cotización
            </h2>
            <QuoteForm />
          </div>

          <div className="lg:col-span-2">
            <div className="bg-gray-50 rounded-lg p-6 shadow-md mb-8">
              <h3 className="text-xl font-semibold mb-4">
                ¿Por qué cotizar con nosotros?
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <svg
                    className="w-5 h-5 text-[#e32929] mr-3 mt-0.5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>
                    <strong>Respuesta rápida:</strong> Te contactamos en menos
                    de 24 horas.
                  </span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="w-5 h-5 text-[#e32929] mr-3 mt-0.5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>
                    <strong>Precios competitivos:</strong> 10-15% más económicos
                    que la competencia.
                  </span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="w-5 h-5 text-[#e32929] mr-3 mt-0.5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>
                    <strong>Asesoramiento técnico:</strong> Te ayudamos a
                    optimizar tu presupuesto.
                  </span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="w-5 h-5 text-[#e32929] mr-3 mt-0.5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>
                    <strong>Entregas programadas:</strong> Coordinamos las
                    entregas según el avance de tu obra.
                  </span>
                </li>
              </ul>
            </div>

            <div className="relative h-64 rounded-lg overflow-hidden shadow-md mb-8">
              <Image
                src={empresa}
                alt="Entrega de materiales"
                fill
                className="object-cover"
              />
            </div>

        
          </div>
        </div>

      </div>
      <Footer />
    </div>
  );
}