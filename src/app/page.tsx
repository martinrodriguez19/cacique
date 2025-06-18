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
    icon: "/favicon.ico", // Logo como favicon
  },
};
export default function Home() {
  return (
    <div >
              <Navbar />
      
      {/* Hero Section */}
      <Suspense fallback={<div className="h-[600px] bg-gray-100"></div>}>
        <HeroSection />
      </Suspense>
      
      {/* Brands Banner */}
      <section className="py-2 bg-gray-50">
        <div className="container-custom">
          <BrandsBanner />
        </div>
      </section>
      
      {/* Featured Materials */}
      <section className="py-16">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl font-semibold text-center mb-4 font-poppins">
            Materiales Destacados para tu Obra
          </h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Contamos con todo lo que necesitas para tu construcción o reforma, desde cimientos hasta terminaciones.
          </p>
          <FeaturedMaterials />
        </div>
      </section>
      
      {/* Services Section */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <ServicesSection />
        </div>
      </section>
      
      {/* Quote Form */}
      <section className="py-16 bg-gradient-to-r from-[#e32929]/90 to-[#c81e1e]">
        <div className="container-custom">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-3xl md:text-4xl font-semibold text-center mb-6 font-poppins">
              Cotiza tu Proyecto
            </h2>
            <p className="text-gray-600 text-center mb-8 max-w-2xl mx-auto">
              Completa el formulario y recibe una cotización personalizada para tu obra. Nuestro equipo te asesorará para optimizar tu inversión.
            </p>
            <QuoteForm />
          </div>
        </div>
      </section>
      
      {/* About Us */}
      <section className="py-16">
        <div className="container-custom">
          <AboutUs />
        </div>
      </section>
      <Footer />
    </div>
  );
}