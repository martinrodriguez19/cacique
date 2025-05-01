"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Logo from "../../../public/images/logo1.png";
import SearchComponent from "./SearchComponent";
import { getCategories } from "@/app/lib/services/api";
import { ICategory } from "@/app/lib/models/Category";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productMenuOpen, setProductMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();
  const productMenuRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Cargar categorías desde la base de datos
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        // Solo mostrar un número limitado de categorías en el menú
        setCategories(data.slice(0, 5)); // Mostrar máximo 5 categorías en el menú
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    // Cerrar menús al hacer clic fuera
    const handleClickOutside = (event: MouseEvent) => {
      if (productMenuRef.current && !productMenuRef.current.contains(event.target as Node)) {
        setProductMenuOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleClickOutside);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    if (productMenuOpen) setProductMenuOpen(false);
  };

  const toggleProductMenu = () => {
    setProductMenuOpen(!productMenuOpen);
  };

  const toggleUserMenu = () => {
    setUserMenuOpen(!userMenuOpen);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white shadow-md py-2"
          : "bg-white/90 backdrop-blur-sm py-4"
      }`}
    >
      <div className="container-custom flex items-center justify-between">
        {/* Logo with title and tagline */}
        <Link href="/" className="relative z-10 flex items-center">
          <Image
            src={Logo}
            alt="El Cacique"
            width={150}
            height={150}
            className="h-16 w-auto mr-3 object-contain"
          />
          <div className="flex flex-col">
            <h1 className="text-xl md:text-2xl font-bold text-gray-800">El Cacique</h1>
            <span className="text-gray-700 font-medium text-sm">Corralón y Ferretería</span>
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
          <Link
            href="/"
            className={`font-medium hover:text-[#e32929] transition-colors ${
              pathname === "/" ? "text-[#e32929]" : "text-gray-800"
            }`}
          >
            Inicio
          </Link>
          <div className="relative group" ref={productMenuRef}>
            <button
              className={`flex items-center font-medium hover:text-[#e32929] transition-colors ${
                pathname.includes("/productos") || pathname.includes("/catalogo") 
                  ? "text-[#e32929]" 
                  : "text-gray-800"
              }`}
              onClick={toggleProductMenu}
            >
              Productos
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-4 w-4 ml-1 transition-transform ${
                  productMenuOpen ? "rotate-180" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {/* Dropdown for Products */}
            <div
              className={`absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 transition-all duration-200 ${
                productMenuOpen
                  ? "opacity-100 translate-y-0 pointer-events-auto"
                  : "opacity-0 -translate-y-2 pointer-events-none"
              }`}
            >
              <div className="py-1">
                <Link
                  href="/productos"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#e32929]"
                  onClick={() => setProductMenuOpen(false)}
                >
                  Todas las categorías
                </Link>
                <div className="border-t border-gray-100 my-1"></div>
                
                {/* Mostrar categorías dinámicas */}
                {isLoading ? (
                  <div className="px-4 py-2 text-sm text-gray-500">Cargando...</div>
                ) : (
                  categories.map((category) => (
                    <Link
                      key={category._id}
                      href={`/productos/${category.slug}`}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#e32929]"
                      onClick={() => setProductMenuOpen(false)}
                    >
                      {category.name}
                    </Link>
                  ))
                )}
                
                <div className="border-t border-gray-100 my-1"></div>
                <Link
                  href="/catalogo"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#e32929]"
                  onClick={() => setProductMenuOpen(false)}
                >
                  Catálogo Completo
                </Link>
              </div>
            </div>
          </div>
          <Link
            href="/empresa"
            className={`font-medium hover:text-[#e32929] transition-colors ${
              pathname === "/empresa" ? "text-[#e32929]" : "text-gray-800"
            }`}
          >
            Empresa
          </Link>
          <Link
            href="/cotiza"
            className={`font-medium hover:text-[#e32929] transition-colors ${
              pathname === "/cotiza" ? "text-[#e32929]" : "text-gray-800"
            }`}
          >
            Cotiza tu Proyecto
          </Link>
          <Link
            href="/contacto"
            className={`font-medium hover:text-[#e32929] transition-colors ${
              pathname === "/contacto" ? "text-[#e32929]" : "text-gray-800"
            }`}
          >
            Contacto
          </Link>
          <Link
            href="/trabaja-con-nosotros"
            className={`font-medium hover:text-[#e32929] transition-colors ${
              pathname === "/trabaja-con-nosotros" ? "text-[#e32929]" : "text-gray-800"
            }`}
          >
            Trabaja con Nosotros
          </Link>
          
          <div className="flex items-center space-x-3">
            {/* Componente de búsqueda */}
            <SearchComponent />
            
            {/* Icono de usuario con menú desplegable */}
            <div className="relative" ref={userMenuRef}>
              <button
                onClick={toggleUserMenu}
                className="p-1 rounded-full hover:bg-gray-100 text-gray-700 hover:text-[#e32929] transition-colors focus:outline-none"
                aria-label="User menu"
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
                    strokeWidth={1.5} 
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" 
                  />
                </svg>
              </button>
              
              {/* Dropdown para el usuario */}
              <div
                className={`absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 transition-all duration-200 ${
                  userMenuOpen
                    ? "opacity-100 translate-y-0 pointer-events-auto"
                    : "opacity-0 -translate-y-2 pointer-events-none"
                }`}
              >
                <div className="py-1">
                  <Link
                    href="/admin"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#e32929]"
                    onClick={() => setUserMenuOpen(false)}
                  >
                    Login
                  </Link>

                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center">
          {/* Botón de búsqueda en móvil */}
          <div className="mr-4 flex items-center space-x-3">
            <SearchComponent />
            
            {/* Icono de usuario para móvil */}
            <button
              onClick={toggleUserMenu}
              className="p-1 rounded-full hover:bg-gray-100 text-gray-700 transition-colors focus:outline-none"
              aria-label="User menu"
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
                  strokeWidth={1.5} 
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" 
                />
              </svg>
            </button>
            
            {/* Dropdown para el usuario en móvil */}
            <div
              className={`absolute right-4 top-16 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 transition-all duration-200 z-50 ${
                userMenuOpen
                  ? "opacity-100 translate-y-0 pointer-events-auto"
                  : "opacity-0 -translate-y-2 pointer-events-none"
              }`}
            >
              <div className="py-1">
                <Link
                  href="/admin"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#e32929]"
                  onClick={() => setUserMenuOpen(false)}
                >
                  Panel de Admin
                </Link>
                <Link
                  href="/mi-cuenta"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#e32929]"
                  onClick={() => setUserMenuOpen(false)}
                >
                  Mi Cuenta
                </Link>
                <Link
                  href="/mis-pedidos"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#e32929]"
                  onClick={() => setUserMenuOpen(false)}
                >
                  Mis Pedidos
                </Link>
              </div>
            </div>
          </div>
          
          <button
            className="relative z-10"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            <div
              className={`w-6 h-0.5 bg-gray-800 transition-all ${
                mobileMenuOpen ? "rotate-45 translate-y-1.5" : ""
              }`}
            ></div>
            <div
              className={`w-6 h-0.5 bg-gray-800 mt-1.5 transition-all ${
                mobileMenuOpen ? "opacity-0" : ""
              }`}
            ></div>
            <div
              className={`w-6 h-0.5 bg-gray-800 mt-1.5 transition-all ${
                mobileMenuOpen ? "-rotate-45 -translate-y-1.5" : ""
              }`}
            ></div>
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`fixed inset-0 bg-white z-0 md:hidden transition-transform duration-300 ease-in-out ${
            mobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex flex-col bg-white space-y-4 pt-24 px-6">
            <Link
              href="/"
              className={`text-lg font-medium py-2 border-b border-gray-100 ${
                pathname === "/" ? "text-[#e32929]" : "text-gray-800"
              }`}
              onClick={toggleMobileMenu}
            >
              Inicio
            </Link>
            <div>
              <button
                className={`text-lg font-medium py-2 w-full text-left flex justify-between items-center ${
                  pathname.includes("/productos") || pathname.includes("/catalogo") 
                    ? "text-[#e32929]" 
                    : "text-gray-800"
                }`}
                onClick={toggleProductMenu}
              >
                Productos
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-4 w-4 transition-transform ${
                    productMenuOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {/* Mobile Product Categories */}
              <div
                className={`pl-4 space-y-2 mt-2 transition-all duration-200 ${
                  productMenuOpen
                    ? "max-h-96 opacity-100"
                    : "max-h-0 opacity-0 overflow-hidden"
                }`}
              >
                <Link
                  href="/productos"
                  className="block py-2 text-gray-600 hover:text-[#e32929] border-b border-gray-100"
                  onClick={toggleMobileMenu}
                >
                  Todas las categorías
                </Link>
                
                {/* Categorías dinámicas en móvil */}
                {categories.map((category) => (
                  <Link
                    key={category._id}
                    href={`/productos/${category.slug}`}
                    className="block py-2 text-gray-600 hover:text-[#e32929] border-b border-gray-100"
                    onClick={toggleMobileMenu}
                  >
                    {category.name}
                  </Link>
                ))}
                
                <Link
                  href="/catalogo"
                  className="block py-2 text-gray-600 hover:text-[#e32929] border-b border-gray-100"
                  onClick={toggleMobileMenu}
                >
                  Catálogo Completo
                </Link>
              </div>
            </div>
            <Link
              href="/empresa"
              className={`text-lg font-medium py-2 border-b border-gray-100 ${
                pathname === "/empresa" ? "text-[#e32929]" : "text-gray-800"
              }`}
              onClick={toggleMobileMenu}
            >
              Empresa
            </Link>
            <Link
              href="/cotiza"
              className={`text-lg font-medium py-2 border-b border-gray-100 ${
                pathname === "/cotiza" ? "text-[#e32929]" : "text-gray-800"
              }`}
              onClick={toggleMobileMenu}
            >
              Cotiza tu Proyecto
            </Link>
            <Link
              href="/contacto"
              className={`text-lg font-medium py-2 border-b border-gray-100 ${
                pathname === "/contacto" ? "text-[#e32929]" : "text-gray-800"
              }`}
              onClick={toggleMobileMenu}
            >
              Contacto
            </Link>
            <Link
              href="/trabaja-con-nosotros"
              className={`text-lg font-medium py-2 border-b border-gray-100 ${
                pathname === "/trabaja-con-nosotros" ? "text-[#e32929]" : "text-gray-800"
              }`}
              onClick={toggleMobileMenu}
            >
              Trabaja con Nosotros
            </Link>
            
            {/* Enlaces de usuario en el menú móvil */}
            <div className="pt-4 border-t border-gray-200">
              <h3 className="text-sm font-semibold text-gray-500 mb-2">MI CUENTA</h3>
              <div className="space-y-2">
                <Link
                  href="/admin"
                  className="block py-2 text-gray-600 hover:text-[#e32929] border-b border-gray-100"
                  onClick={toggleMobileMenu}
                >
                  Panel de Admin
                </Link>
                <Link
                  href="/mi-cuenta"
                  className="block py-2 text-gray-600 hover:text-[#e32929] border-b border-gray-100"
                  onClick={toggleMobileMenu}
                >
                  Mi Cuenta
                </Link>
                <Link
                  href="/mis-pedidos"
                  className="block py-2 text-gray-600 hover:text-[#e32929] border-b border-gray-100"
                  onClick={toggleMobileMenu}
                >
                  Mis Pedidos
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}