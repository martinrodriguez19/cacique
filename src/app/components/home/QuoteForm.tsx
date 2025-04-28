/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
'use client';

import { useState } from 'react';

type FormData = {
  name: string;
  email: string;
  phone: string;
  projectType: string;
  message: string;
  terms: boolean;
};

const initialFormData: FormData = {
  name: '',
  email: '',
  phone: '',
  projectType: '',
  message: '',
  terms: false,
};

export default function QuoteForm() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');

    try {
      // Validar términos y condiciones
      if (!formData.terms) {
        setSubmitError('Debes aceptar los términos y condiciones');
        setIsSubmitting(false);
        return;
      }

      // Enviar datos a la API
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          projectType: formData.projectType,
          message: formData.message,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Error al enviar el formulario');
      }
      
      // Reset form after successful submission
      setFormData(initialFormData);
      setSubmitSuccess(true);
      setTimeout(() => setSubmitSuccess(false), 5000);
    } catch (error: any) {
      setSubmitError(error.message || 'Hubo un error al enviar el formulario. Por favor, inténtalo de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
            Teléfono <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#e32929] focus:border-[#e32929] outline-none transition-colors"
            placeholder="(011) XXXX-XXXX"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>

        <div>
          <label
            htmlFor="projectType"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Tipo de proyecto <span className="text-red-500">*</span>
          </label>
          <select
            id="projectType"
            name="projectType"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#e32929] focus:border-[#e32929] outline-none transition-colors appearance-none bg-white"
            value={formData.projectType}
            onChange={handleChange}
          >
            <option value="">Seleccionar...</option>
            <option value="construccion">Construcción nueva</option>
            <option value="remodelacion">Remodelación</option>
            <option value="ampliacion">Ampliación</option>
            <option value="otro">Otro</option>
          </select>
        </div>

        <div className="md:col-span-2">
          <label
            htmlFor="message"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Detalles del proyecto <span className="text-red-500">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#e32929] focus:border-[#e32929] outline-none transition-colors"
            placeholder="Describe brevemente tu proyecto y los materiales que necesitas..."
            value={formData.message}
            onChange={handleChange}
          ></textarea>
        </div>

        <div className="md:col-span-2">
          <div className="flex items-start">
            <input
              type="checkbox"
              id="terms"
              name="terms"
              required
              className="mt-1 h-4 w-4 text-[#e32929] border-gray-300 rounded focus:ring-[#e32929]"
              checked={formData.terms}
              onChange={handleChange}
            />
            <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
              Acepto recibir información sobre presupuestos y ofertas relacionadas con mi solicitud{" "}
              <span className="text-red-500">*</span>
            </label>
          </div>
        </div>
      </div>

      {submitError && (
        <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-md">
          {submitError}
        </div>
      )}

      {submitSuccess && (
        <div className="mt-4 p-3 bg-green-100 text-green-700 rounded-md">
          ¡Gracias! Hemos recibido tu solicitud. Te contactaremos a la brevedad.
        </div>
      )}

      <div className="mt-6 text-center">
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
            "Solicitar Cotización"
          )}
        </button>
      </div>
    </form>
  );
}