import Image from "next/image";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import about from "../../../public/images/corralon/c10.jpeg"
import empresa from "../../../public/images/corralon/c16.jpeg"

export default function EmpresaPage() {
  
  return (
    <> <Navbar />
    <div className="pt-24 ">
     
      <div className="container-custom pb-16">
        {/* Hero Section */}
        <div className="relative mb-16 overflow-hidden rounded-xl">
          <div className="absolute inset-0 bg-black/50 z-10"></div>
          <Image
            src={about}
            alt="El Cacique Corralón y Ferretería"
            width={1200}
            height={400}
            className="w-full h-64 md:h-80 object-cover"
          />
          <div className="absolute inset-0 z-20 flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Acerca de nosotros
              </h1>
            </div>
          </div>
        </div>

        {/* Company History */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-3xl font-semibold mb-6">Quienes somos?</h2>
            <p className="text-gray-600 mb-4">
      
              Con el paso de los años, nos hemos consolidado como uno de los corralones de referencia 
              en la zona norte de Buenos Aires.
            </p>
            <p className="text-gray-600">
              Actualmente, contamos con un equipo de profesionales capacitados, una flota de vehículos 
              para entregas y un amplio stock de materiales para atender las necesidades de constructores, 
              arquitectos y particulares en toda la zona.
            </p>
          </div>
          <div className="relative h-80 rounded-lg overflow-hidden shadow-lg">
            <Image
              src={empresa}
              alt="Historia de El Cacique"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Mission, Vision, Values */}
        <div className="mb-16">
          <h2 className="text-3xl font-semibold mb-10 text-center">
            Misión, Visión y Valores
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg shadow-md">
              <div className="bg-[#e32929] w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Misión</h3>
              <p className="text-gray-600">
                Brindar soluciones integrales en materiales de construcción, 
                ofreciendo productos de calidad, asesoramiento profesional y un servicio 
                de excelencia para contribuir al éxito de los proyectos de nuestros clientes.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg shadow-md">
              <div className="bg-[#e32929] w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Visión</h3>
              <p className="text-gray-600">
                Ser reconocidos como el corralón líder en la zona norte de Buenos Aires, 
                distinguiéndonos por nuestra amplia variedad de productos, precios competitivos, 
                servicio personalizado y compromiso con la satisfacción de nuestros clientes.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg shadow-md">
              <div className="bg-[#e32929] w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Valores</h3>
              <ul className="text-gray-600 space-y-2">
                <li className="flex items-start">
                  <svg
                    className="w-5 h-5 text-[#e32929] mr-2 mt-0.5 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Honestidad y transparencia</span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="w-5 h-5 text-[#e32929] mr-2 mt-0.5 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Compromiso con la calidad</span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="w-5 h-5 text-[#e32929] mr-2 mt-0.5 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Excelencia en el servicio</span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="w-5 h-5 text-[#e32929] mr-2 mt-0.5 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Trabajo en equipo</span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="w-5 h-5 text-[#e32929] mr-2 mt-0.5 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Responsabilidad social</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        { /*
        <div className="mb-16">
          <h2 className="text-3xl font-semibold mb-10 text-center">
            Nuestro Equipo
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((member) => (
              <div key={member} className="text-center">
                <div className="relative w-48 h-48 mx-auto rounded-full overflow-hidden mb-4">
                  <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
                    <svg
                      className="w-16 h-16 text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
                <h3 className="text-xl font-medium">Nombre Apellido</h3>
                <p className="text-[#e32929] mb-2">Cargo</p>
                <p className="text-gray-600 text-sm">
                  Breve descripción sobre la experiencia y especialidad de la persona.
                </p>
              </div>
            ))}
          </div>
        </div> */}
        
        {/* Call to action */}
        <div className="bg-gradient-to-r from-[#e32929]/90 to-[#c81e1e] rounded-xl p-8 lg:p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">
            ¿Estás listo para comenzar tu proyecto?
          </h2>
          <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
            En El Cacique estamos listos para asesorarte y proveerte de todos los
            materiales que necesitas para tu obra.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="/contacto"
              className="bg-white text-[#e32929] hover:bg-gray-100 font-medium py-3 px-8 rounded-md transition-colors"
            >
              Contáctanos
            </a>
            <a
              href="/cotiza"
              className="bg-transparent border-2 border-white text-white hover:bg-white/10 font-medium py-3 px-8 rounded-md transition-colors"
            >
              Solicitar Cotización
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </div></>
  );
}