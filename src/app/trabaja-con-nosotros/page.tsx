/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function TrabajaConNosotros() {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    puesto: "",
    experiencia: "",
    mensaje: "",
  });
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [cvUrl, setCvUrl] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCvFile(e.target.files[0]);
    }
  };

  // Función para subir el archivo a un servicio como Cloudinary (ejemplo)
  const uploadCV = async (file: File) => {
    // Crear un formulario para enviar el archivo
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'cacique_cvs'); // Reemplazar con tu upload preset configurado en Cloudinary

    try {
      // Reemplazar con tu URL de upload de Cloudinary
      const response = await fetch('https://api.cloudinary.com/v1_1/tu-cloud-name/upload', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error('Error al subir el archivo');
      }

      const data = await response.json();
      return data.secure_url; // URL del archivo subido
    } catch (error) {
      console.error('Error uploading file:', error);
      throw error;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!cvFile) {
      setSubmitError("Por favor, adjunta tu CV para continuar.");
      return;
    }
    
    setIsSubmitting(true);
    setSubmitError("");

    try {
      // En un entorno real, aquí subirías el archivo a un servicio de almacenamiento
      // como Cloudinary o AWS S3 y obtendrías la URL
      
      // Simulación del proceso de subida
      // En producción, deberías usar uploadCV(cvFile) para obtener la URL
      const cvUrlMock = `https://ejemplo.com/${cvFile.name}`;
      // Aquí pondrías: const cvUrl = await uploadCV(cvFile);
      setCvUrl(cvUrlMock);
      
      // Enviar datos a la API
      const response = await fetch('/api/job-application', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          cvUrl: cvUrlMock, // En un entorno real: cvUrl
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Error al enviar la solicitud');
      }
      
      // Reset form después de enviado exitosamente
      setFormData({
        nombre: "",
        email: "",
        telefono: "",
        puesto: "",
        experiencia: "",
        mensaje: "",
      });
      setCvFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      
      setSubmitSuccess(true);
      setTimeout(() => setSubmitSuccess(false), 8000);
    } catch (error: any) {
      setSubmitError(error.message || "Hubo un error al enviar tu aplicación. Por favor, inténtalo de nuevo.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-40 ">
      <Navbar />
      <div className="container-custom pb-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 font-poppins text-gray-800">
              Trabaja con Nosotros
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              En El Cacique estamos siempre en búsqueda de talento para sumar a nuestro equipo.
            <br/>  Si te interesa formar parte de una empresa en crecimiento envíanos tu CV.
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
            <h3 className="text-xl font-semibold mb-6 text-center text-gray-800">
              Envíanos tu Curriculum Vitae
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="nombre"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Nombre completo <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#e32929] focus:border-[#e32929] outline-none transition-colors"
                    placeholder="Tu nombre y apellido"
                    value={formData.nombre}
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
                    htmlFor="telefono"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Teléfono <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    id="telefono"
                    name="telefono"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#e32929] focus:border-[#e32929] outline-none transition-colors"
                    placeholder="(011) XXXX-XXXX"
                    value={formData.telefono}
                    onChange={handleChange}
                  />
                </div>
                
                <div>
                  <label
                    htmlFor="puesto"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Puesto de interés <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="puesto"
                    name="puesto"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#e32929] focus:border-[#e32929] outline-none transition-colors appearance-none bg-white"
                    value={formData.puesto}
                    onChange={handleChange}
                  >
                    <option value="">Seleccionar...</option>
                    <option value="ventas">Ventas</option>
                    <option value="administracion">Administración</option>
                    <option value="deposito">Depósito y Logística</option>
                    <option value="atencion">Atención al Cliente</option>
                    <option value="otro">Otro</option>
                  </select>
                </div>
                
                <div>
                  <label
                    htmlFor="experiencia"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Años de experiencia <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="experiencia"
                    name="experiencia"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#e32929] focus:border-[#e32929] outline-none transition-colors appearance-none bg-white"
                    value={formData.experiencia}
                    onChange={handleChange}
                  >
                    <option value="">Seleccionar...</option>
                    <option value="sin-experiencia">Sin experiencia</option>
                    <option value="0-1">Menos de 1 año</option>
                    <option value="1-3">1-3 años</option>
                    <option value="3-5">3-5 años</option>
                    <option value="5+">Más de 5 años</option>
                  </select>
                </div>
                
                <div className="md:col-span-2">
                  <label
                    htmlFor="mensaje"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Mensaje (opcional)
                  </label>
                  <textarea
                    id="mensaje"
                    name="mensaje"
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#e32929] focus:border-[#e32929] outline-none transition-colors"
                    placeholder="Cuéntanos un poco sobre ti y por qué te gustaría trabajar con nosotros..."
                    value={formData.mensaje}
                    onChange={handleChange}
                  ></textarea>
                </div>
                
                <div className="md:col-span-2">
                  <label
                    htmlFor="cv"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Adjuntar CV <span className="text-red-500">*</span>
                  </label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                    <div className="space-y-1 text-center">
                      <svg
                        className="mx-auto h-12 w-12 text-gray-400"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 48 48"
                        aria-hidden="true"
                      >
                        <path
                          d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <div className="flex text-sm text-gray-600">
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer bg-white rounded-md font-medium text-[#e32929] hover:text-[#c81e1e] focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-[#e32929]"
                        >
                          <span>Subir archivo</span>
                          <input
                            id="file-upload"
                            name="file-upload"
                            type="file"
                            className="sr-only"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            accept=".pdf,.doc,.docx"
                          />
                        </label>
                        <p className="pl-1">o arrastra y suelta</p>
                      </div>
                      <p className="text-xs text-gray-500">
                        PDF, DOC, DOCX hasta 5MB
                      </p>
                      {cvFile && (
                        <p className="text-sm text-green-600 mt-2">
                          Archivo seleccionado: {cvFile.name}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {submitError && (
                <div className="p-3 bg-red-100 text-red-700 rounded-md">
                  {submitError}
                </div>
              )}

              {submitSuccess && (
                <div className="p-3 bg-green-100 text-green-700 rounded-md">
                  ¡Gracias por tu interés en formar parte de nuestro equipo! Hemos recibido tu CV correctamente. 
                  Revisaremos tu perfil y nos pondremos en contacto contigo si hay coincidencia con nuestras búsquedas actuales.
                </div>
              )}

              <div className="text-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`px-8 py-3 bg-[#e32929] hover:bg-[#c81e1e] text-white rounded-md transition-colors font-medium text-lg ${
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
                    "Enviar CV"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}