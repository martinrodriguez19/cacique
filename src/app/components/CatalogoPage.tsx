/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import FullCatalog from "@/app/components/FullCatalog";

export default function CatalogoPage() {
  return (
    <><Navbar />
    <div className="pt-24 pb-16">
      
      <div className="container-custom">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Catálogo Completo
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explora nuestro extenso catálogo de materiales para construcción. 
            Encuentra exactamente lo que necesitas para tu proyecto.
          </p>
        </div>

        {/* Catálogo completo */}
        <FullCatalog />

        {/* Call to Action */}
        <div className="mt-16 bg-gradient-to-r from-[#e32929]/90 to-[#c81e1e] rounded-lg p-8 text-center text-white">
          <h2 className="text-2xl font-semibold mb-4">¿Necesitas asesoramiento profesional?</h2>
          <p className="text-white/90 mb-6 max-w-2xl mx-auto">
            Nuestro equipo de expertos está listo para ayudarte a elegir los materiales 
            adecuados para tu proyecto.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a 
              href="/contacto" 
              className="bg-white text-[#e32929] hover:bg-gray-100 font-medium py-2 px-6 rounded-md transition-colors"
            >
              Contactar ahora
            </a>
            <a 
              href="/cotiza" 
              className="bg-transparent border-2 border-white text-white hover:bg-white/10 font-medium py-2 px-6 rounded-md transition-colors"
            >
              Solicitar cotización
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </div></>
  );
}