import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="pt-24 pb-16 min-h-screen flex items-center">
      <div className="container-custom">
        <div className="bg-white rounded-lg shadow-lg p-8 md:p-12 text-center">
          <div className="relative w-24 h-24 mx-auto mb-6">
            <Image
              src="/images/logo-icon.png"
              alt="El Cacique"
              fill
              className="object-contain"
            />
          </div>
          
          <h1 className="text-6xl md:text-8xl font-bold text-[#e32929] mb-4">404</h1>
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">
            Página no encontrada
          </h2>
          <p className="text-gray-600 mb-8 max-w-lg mx-auto">
            Lo sentimos, la página que estás buscando no existe o ha sido movida.
            Por favor, vuelve al inicio o explora nuestras secciones.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/" className="btn-primary">
              Volver al inicio
            </Link>
            <Link href="/productos" className="btn-secondary">
              Ver productos
            </Link>
          </div>
          
          <div className="mt-12 border-t border-gray-200 pt-8">
            <h3 className="text-xl font-medium mb-4">¿Necesitas ayuda?</h3>
            <p className="text-gray-600 mb-4">
              Si estás buscando algo específico, no dudes en contactarnos.
            </p>
            <Link
              href="/contacto"
              className="text-[#e32929] hover:text-[#c81e1e] font-medium inline-flex items-center"
            >
              Contactar ahora
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 ml-1"
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
      </div>
    </div>
  );
}