'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const sidebarLinks = [
  {
    title: 'Dashboard',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
    href: '/admin',
  },
  {
    title: 'Productos',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    ),
    href: '/admin/products',
    subLinks: [
      { title: 'Todos los productos', href: '/admin/products' },
      { title: 'Añadir producto', href: '/admin/products/new' },
      { title: 'Productos destacados', href: '/admin/products/featured' },
    ],
  },
  {
    title: 'Categorías',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
      </svg>
    ),
    href: '/admin/categories',
    subLinks: [
      { title: 'Todas las categorías', href: '/admin/categories' },
      { title: 'Añadir categoría', href: '/admin/categories/new' },
    ],
  },
  {
    title: 'Consultas',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
      </svg>
    ),
    href: '/admin/inquiries',
  },
  {
    title: 'CVs Recibidos',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    href: '/admin/job-applications',
  },

];

export default function AdminSidebar() {
  const pathname = usePathname();
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const toggleSection = (title: string) => {
    if (expandedSection === title) {
      setExpandedSection(null);
    } else {
      setExpandedSection(title);
    }
  };

  // Check if current path is in a section
  const isInSection = (href: string) => {
    return pathname.startsWith(href);
  };

  // Auto-expand section based on current path
  const autoExpandedSection = sidebarLinks.find(link => 
    link.subLinks && isInSection(link.href)
  )?.title;

  // Use the autoExpanded section on first render
  if (expandedSection === null && autoExpandedSection) {
    setExpandedSection(autoExpandedSection);
  }

  return (
    <div className="fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-md pt-16 hidden md:block transform transition-transform duration-300">
      <div className="h-full overflow-y-auto py-4 px-3">
        <ul className="space-y-2">
          {sidebarLinks.map((link) => {
            const isActive = pathname === link.href;
            const isSectionActive = isInSection(link.href);
            const isExpanded = expandedSection === link.title;

            return (
              <li key={link.title}>
                {link.subLinks ? (
                  <div>
                    <button
                      className={`flex items-center justify-between w-full px-3 py-2 text-sm font-medium rounded-md ${
                        isSectionActive
                          ? 'bg-[#e32929]/10 text-[#e32929]'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                      onClick={() => toggleSection(link.title)}
                    >
                      <div className="flex items-center">
                        <span className="mr-3">{link.icon}</span>
                        <span>{link.title}</span>
                      </div>
                      <svg
                        className={`h-4 w-4 transition-transform ${
                          isExpanded ? 'rotate-180' : 'rotate-0'
                        }`}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                    {isExpanded && link.subLinks && (
                      <ul className="pl-10 space-y-1 mt-1">
                        {link.subLinks.map((subLink) => (
                          <li key={subLink.title}>
                            <Link
                              href={subLink.href}
                              className={`block px-3 py-2 text-sm rounded-md ${
                                pathname === subLink.href
                                  ? 'bg-[#e32929]/10 text-[#e32929] font-medium'
                                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                              }`}
                            >
                              {subLink.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ) : (
                  <Link
                    href={link.href}
                    className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                      isActive
                        ? 'bg-[#e32929]/10 text-[#e32929]'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <span className="mr-3">{link.icon}</span>
                    <span>{link.title}</span>
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
        
        <div className="mt-8 px-3">
          <div className="bg-gray-100 p-3 rounded-md">
            <div className="text-xs font-medium text-gray-500 uppercase">
              Estado del Sistema
            </div>
            <div className="mt-2 flex items-center">
              <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
              <span className="text-sm font-medium text-gray-700">Operativo</span>
            </div>
            <div className="mt-3 text-xs text-gray-500">
              Última actualización: 28 Abril 2025
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}