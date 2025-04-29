"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Logo from "../../../public/images/logo1.png";

const productCategories = [
  { name: "Obra Gruesa", href: "/productos/obra-gruesa" },
  { name: "Ferretería", href: "/productos/ferreteria" },
  // Space for more categories as mentioned
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productMenuOpen, setProductMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    if (productMenuOpen) setProductMenuOpen(false);
  };

  const toggleProductMenu = () => {
    setProductMenuOpen(!productMenuOpen);
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
        <div className="hidden md:flex items-center space-x-8">
          <Link
            href="/"
            className={`font-medium hover:text-[#e32929] transition-colors ${
              pathname === "/" ? "text-[#e32929]" : "text-gray-800"
            }`}
          >
            Inicio
          </Link>
          <div className="relative group">
            <button
              className={`flex items-center font-medium hover:text-[#e32929] transition-colors ${
                pathname.includes("/productos") ? "text-[#e32929]" : "text-gray-800"
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
              className={`absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 transition-all duration-200 ${
                productMenuOpen
                  ? "opacity-100 translate-y-0 pointer-events-auto"
                  : "opacity-0 -translate-y-2 pointer-events-none"
              }`}
            >
              <div className="py-1">
                {productCategories.map((category) => (
                  <Link
                    key={category.name}
                    href={category.href}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#e32929]"
                    onClick={() => setProductMenuOpen(false)}
                  >
                    {category.name}
                  </Link>
                ))}
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
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden relative z-10"
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

        {/* Mobile Menu */}
        <div
          className={`fixed inset-0 bg-white z-0 md:hidden transition-transform duration-300 ease-in-out ${
            mobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex flex-col bg-white  space-y-4 pt-24 px-6">
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
                  pathname.includes("/productos") ? "text-[#e32929]" : "text-gray-800"
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
                {productCategories.map((category) => (
                  <Link
                    key={category.name}
                    href={category.href}
                    className="block py-2 text-gray-600 hover:text-[#e32929] border-b border-gray-100"
                    onClick={toggleMobileMenu}
                  >
                    {category.name}
                  </Link>
                ))}
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
          </div>
        </div>
      </div>
    </nav>
  );
}