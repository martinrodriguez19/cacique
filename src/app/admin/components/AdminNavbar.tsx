'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function AdminNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
      <div className="px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Title */}
          <div className="flex items-center">
            <Link href="/admin" className="flex items-center">
              <div className="flex-shrink-0">
                <Image
                  src="/images/logo1.png"
                  alt="El Cacique"
                  width={40}
                  height={40}
                  className="h-10 w-auto"
                />
              </div>
              <div className="ml-2">
                <div className="text-lg font-semibold text-gray-800">El Cacique</div>
                <div className="text-xs text-gray-500">Panel de Administración</div>
              </div>
            </Link>
          </div>

          {/* Right side */}
          <div className="flex items-center">
            {/* Go to site link */}
            <Link 
              href="/" 
              target="_blank"
              className="mr-4 text-gray-600 hover:text-gray-800 hidden md:flex items-center"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5 mr-1" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" 
                />
              </svg>
              Ver sitio web
            </Link>

            {/* Mobile menu button */}
            <div className="md:hidden ml-2">
              <button
                onClick={toggleMobileMenu}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none"
                aria-expanded={mobileMenuOpen}
              >
                <span className="sr-only">Abrir menú principal</span>
                <svg 
                  className="h-6 w-6" 
                  xmlns="http://www.w3.org/2000/svg" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} 
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu, shown/hidden based on mobile menu state */}
      <div className={`md:hidden ${mobileMenuOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link 
            href="/admin" 
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              pathname === '/admin' ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
            }`}
            onClick={() => setMobileMenuOpen(false)}
          >
            Dashboard
          </Link>
          <Link 
            href="/admin/products" 
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              pathname.includes('/admin/products') ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
            }`}
            onClick={() => setMobileMenuOpen(false)}
          >
            Productos
          </Link>
          <Link 
            href="/admin/categories" 
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              pathname.includes('/admin/categories') ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
            }`}
            onClick={() => setMobileMenuOpen(false)}
          >
            Categorías
          </Link>
          <Link 
            href="/admin/inquiries" 
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              pathname.includes('/admin/inquiries') ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
            }`}
            onClick={() => setMobileMenuOpen(false)}
          >
            Consultas
          </Link>
          <Link 
            href="/admin/job-applications" 
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              pathname.includes('/admin/job-applications') ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
            }`}
            onClick={() => setMobileMenuOpen(false)}
          >
            CVs Recibidos
          </Link>
          <Link 
            href="/" 
            target="_blank"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900"
          >
            Ver sitio web
          </Link>
        </div>
      </div>
    </nav>
  );
}