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

export default function Home() {
  return (
    <div className="pt-16">
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
            Materiales para tu Obra
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