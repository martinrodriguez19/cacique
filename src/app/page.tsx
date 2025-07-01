/* eslint-disable @typescript-eslint/no-unused-vars */
import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import HeroSection from "./components/home/HeroSection";
import BrandsBanner from "./components/home/BrandsBanner";
import ServicesSection from "./components/home/ServicesSection";
import QuoteForm from "./components/home/QuoteForm";
import FeaturedMaterials from "./components/home/FeaturedMaterials";
import AboutUs from "./components/home/AboutUs";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "El Cacique - Corralón | Materiales de Construcción en Villa Martelli",
  description: "Todo para tu obra: materiales de construcción, entregas rápidas con hidrogrúa en CABA y Gran Buenos Aires. ¡Visítanos en Villa Martelli o cotiza online!",
  keywords: "materiales de construcción, corralón, Villa Martelli, entregas con hidrogrúa, CABA, Gran Buenos Aires",
  openGraph: {
    title: "El Cacique - Corralón",
    description: "Materiales de construcción, entregas con hidrogrúa en CABA y Gran Buenos Aires.",
    url: "https://caciquemateriales.com",
    siteName: "El Cacique",
    images: [
      {
        url: "https://www.caciquemateriales.com/images/logo1.png",
        width: 800,
        height: 600,
        alt: "Logo de El Cacique - Corralón",
      },
    ],
    locale: "es_AR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "El Cacique - Corralón",
    description: "Materiales de construcción en Villa Martelli. Entregas rápidas en CABA y Gran Buenos Aires.",
    images: ["https://www.caciquemateriales.com/images/logo1.png"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function Home() {
  return (
    <div>
      <Navbar />
      
      {/* Hero Section */}
      <Suspense fallback={<div className="h-[600px] bg-gray-50 animate-pulse"></div>}>
        <HeroSection />
      </Suspense>
      
      {/* Brands Banner */}
      <section className="py-6 bg-white relative overflow-hidden">
        <div className="container-custom relative z-10">
          <BrandsBanner />
        </div>
      </section>
      
      {/* Featured Materials */}
      <section className="py-20 bg-gray-50/50 relative overflow-hidden">
        <div className="container-custom relative z-10">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-[#e32929]/10 text-[#e32929] rounded-full text-sm font-medium mb-4">
              Productos Destacados
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 font-poppins">
              Materiales Destacados para tu Obra
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Contamos con todo lo que necesitas para tu construcción o reforma, desde cimientos hasta terminaciones.
            </p>
          </div>
          <FeaturedMaterials />
        </div>
      </section>
      
      {/* Services Section */}
      <section className="py-20 bg-gradient-to-br from-gray-800 to-gray-700 text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-5"></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#e32929]/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl"></div>
        </div>
        <div className="container-custom relative z-10">
          <ServicesSection />
        </div>
      </section>
      
      {/* Quote Form */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#e32929] via-[#c81e1e] to-orange-600"></div>
        <div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-10"></div>
        <div className="container-custom relative z-10">
          <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 transform hover:scale-[1.01] transition-transform duration-300">
            <div className="text-center mb-10">
              <span className="inline-block px-4 py-1 bg-[#e32929]/10 text-[#e32929] rounded-full text-sm font-medium mb-4">
                Presupuesto Sin Cargo
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 font-poppins">
                Cotiza tu Proyecto
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Completa el formulario y recibe una cotización personalizada para tu obra. Nuestro equipo te asesorará para optimizar tu inversión.
              </p>
            </div>
            <QuoteForm />
          </div>
        </div>
      </section>
      
      {/* About Us */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="container-custom relative z-10">
          <AboutUs />
        </div>
      </section>
      
      <Footer />
    </div>
  );
}