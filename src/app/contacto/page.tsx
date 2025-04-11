/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState } from "react";
import Image from "next/image";

type ContactFormData = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

const initialFormData: ContactFormData = {
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
};

export default function ContactoPage() {
  const [formData, setFormData] = useState<ContactFormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError("");

    try {
      // Simulate API call with timeout
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      // Reset form after successful submission
      setFormData(initialFormData);
      setSubmitSuccess(true);
      setTimeout(() => setSubmitSuccess(false), 5000);
    } catch (error) {
      setSubmitError("Hubo un error al enviar el formulario. Por favor, inténtalo de nuevo.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-36 pb-16">
      <div className="container-custom">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Contacto</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Estamos aquí para ayudarte. Contáctanos por cualquier consulta sobre 
            nuestros productos y servicios.
          </p>
        </div>

        {/* Contact Information and Form */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
              <h2 className="text-2xl font-semibold mb-6">Información de Contacto</h2>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-[#e32929]/10 p-3 rounded-full mr-4">
                    <svg
                      className="w-6 h-6 text-[#e32929]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-lg">Teléfono</h3>
                    <p className="text-gray-600">(011) 4000-0000</p>
                    <p className="text-gray-600">(011) 4000-0001</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-[#e32929]/10 p-3 rounded-full mr-4">
                    <svg
                      className="w-6 h-6 text-[#e32929]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-lg">Email</h3>
                    <p className="text-gray-600">info@elcacique.com.ar</p>
                    <p className="text-gray-600">ventas@elcacique.com.ar</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-[#e32929]/10 p-3 rounded-full mr-4">
                    <svg
                      className="w-6 h-6 text-[#e32929]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-lg">Dirección</h3>
                    <p className="text-gray-600">
                      Av. Ejemplo 1234, Vicente López,<br />
                      Buenos Aires, Argentina
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-[#e32929]/10 p-3 rounded-full mr-4">
                    <svg
                      className="w-6 h-6 text-[#e32929]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-lg">Horario de Atención</h3>
                    <p className="text-gray-600">Lunes a Viernes: 8:00 - 18:00</p>
                    <p className="text-gray-600">Sábados: 8:00 - 13:00</p>
                    <p className="text-gray-600">Domingos: Cerrado</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="relative h-64 w-full">
                {/* Placeholder for map */}
                <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
                  <svg
                    className="w-12 h-12 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <Image 
                  src="/images/map-placeholder.jpg"
                  alt="Ubicación de El Cacique"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <a 
                  href="https://maps.google.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[#e32929] hover:text-[#c81e1e] font-medium inline-flex items-center"
                >
                  Ver en Google Maps
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-4 w-4 ml-1" 
                    viewBox="0 0 20 20" 
                    fill="currentColor"
                  >
                    <path 
                      fillRule="evenodd" 
                      d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" 
                      clipRule="evenodd" 
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold mb-6">Envíanos un Mensaje</h2>
            
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Nombre completo <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#e32929] focus:border-[#e32929] outline-none transition-colors"
                    placeholder="Tu nombre"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Correo electrónico <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#e32929] focus:border-[#e32929] outline-none transition-colors"
                    placeholder="tucorreo@ejemplo.com"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#e32929] focus:border-[#e32929] outline-none transition-colors"
                    placeholder="(011) XXXX-XXXX"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Asunto <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#e32929] focus:border-[#e32929] outline-none transition-colors appearance-none bg-white"
                    value={formData.subject}
                    onChange={handleChange}
                  >
                    <option value="">Seleccionar...</option>
                    <option value="consulta">Consulta general</option>
                    <option value="presupuesto">Solicitud de presupuesto</option>
                    <option value="compra">Información de compra</option>
                    <option value="servicio">Servicio al cliente</option>
                    <option value="otro">Otro</option>
                  </select>
                </div>
              </div>

              <div className="mb-6">
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Mensaje <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#e32929] focus:border-[#e32929] outline-none transition-colors"
                  placeholder="Escribe tu mensaje aquí..."
                  value={formData.message}
                  onChange={handleChange}
                ></textarea>
              </div>

              {submitError && (
                <div className="mb-6 p-3 bg-red-100 text-red-700 rounded-md">
                  {submitError}
                </div>
              )}

              {submitSuccess && (
                <div className="mb-6 p-3 bg-green-100 text-green-700 rounded-md">
                  ¡Gracias! Hemos recibido tu mensaje. Te contactaremos a la brevedad.
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full px-6 py-3 bg-[#e32929] hover:bg-[#c81e1e] text-white rounded-md transition-colors font-medium ${
                  isSubmitting ? "opacity-75 cursor-not-allowed" : ""
                }`}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Enviando...
                  </span>
                ) : (
                  "Enviar Mensaje"
                )}
              </button>
            </form>
          </div>
        </div>
        
        {/* Call to Action */}
        <div className="bg-gray-50 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-semibold mb-4">¿Prefieres hablar directamente?</h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Nuestro equipo de atención al cliente está disponible para responder 
            tus consultas y ayudarte con tu proyecto.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="tel:01140000000"
              className="inline-flex items-center px-6 py-3 bg-[#e32929] hover:bg-[#c81e1e] text-white rounded-md transition-colors font-medium"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              Llamar ahora
            </a>
            <a
              href="https://wa.me/5491100000000"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-[#25D366] hover:bg-[#128C7E] text-white rounded-md transition-colors font-medium"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"
                />
              </svg>
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}