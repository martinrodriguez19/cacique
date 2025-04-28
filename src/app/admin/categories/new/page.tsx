'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createCategory, getCategories } from '../actions';
import toast from 'react-hot-toast';
import Link from 'next/link';
import CloudinaryScripts from '@/app/components/CloudinaryScripts';
import UnsignedImageUploader from '@/app/components/ImageUploader';


// Función para generar un slug a partir de un texto
const generateSlug = (text: string) => {
  return text
    .toString()
    .normalize('NFD')                   // Normaliza caracteres acentuados
    .replace(/[\u0300-\u036f]/g, '')    // Elimina diacríticos
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')               // Reemplaza espacios con guiones
    .replace(/[^\w-]+/g, '')            // Elimina caracteres no alfanuméricos
    .replace(/--+/g, '-');              // Reemplaza múltiples guiones con uno solo
};

export default function NewCategoryPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [parentCategories, setParentCategories] = useState([]);
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image: '',
    parentCategory: null, // Cambiado de string vacía ('') a null
    featured: false,
    slug: '', // Añadido campo slug
  });

  // Para manejar imágenes de Cloudinary
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const result = await getCategories();
        if (result.success) {
          setParentCategories(result.data);
        } else {
          toast.error('Error al cargar categorías');
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
        toast.error('Error al cargar categorías');
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Actualizar el slug automáticamente cuando cambia el nombre
  useEffect(() => {
    if (formData.name) {
      setFormData(prev => ({
        ...prev,
        slug: generateSlug(prev.name)
      }));
    }
  }, [formData.name]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    let newValue: any = type === 'checkbox' ? checked : value;
    
    // Convertir parentCategory vacío a null
    if (name === 'parentCategory' && value === '') {
      newValue = null;
    }

    setFormData(prev => ({
      ...prev,
      [name]: newValue,
    }));
  };

  // Manejar cambios en las imágenes
  const handleImagesChange = (urls: string[]) => {
    setImages(urls);
    // Si hay al menos una imagen, establecer la primera como imagen principal
    if (urls.length > 0) {
      setFormData(prev => ({
        ...prev,
        image: urls[0],
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        image: '',
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      // Asegúrate de que el slug está generado
      if (!formData.slug && formData.name) {
        formData.slug = generateSlug(formData.name);
      }

      // Log para depuración
      console.log("Enviando datos:", formData);
      
      const result = await createCategory(formData);
      
      if (result.success) {
        toast.success('Categoría creada correctamente');
        router.push('/admin/categories');
      } else {
        toast.error(result.error || 'Error al crear la categoría');
      }
    } catch (error) {
      console.error('Error creating category:', error);
      toast.error('Error al crear la categoría');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 mt-20">
      {/* Agregar el script de Cloudinary */}
      <CloudinaryScripts />
      
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">
          Añadir Nueva Categoría
        </h1>
        <Link
          href="/admin/categories"
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors flex items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
          Volver a Categorías
        </Link>
      </div>

      {loading ? (
        <div className="animate-pulse space-y-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-10 bg-gray-200 rounded"></div>
          ))}
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-6">
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Nombre de la Categoría <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#e32929] focus:ring-[#e32929] sm:text-sm"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="slug" className="block text-sm font-medium text-gray-700 mb-1">
                Slug <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center">
                <input
                  type="text"
                  id="slug"
                  name="slug"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#e32929] focus:ring-[#e32929] sm:text-sm"
                  value={formData.slug}
                  onChange={handleChange}
                />
              </div>
              <p className="mt-1 text-xs text-gray-500">
                Identificador único para la URL (se genera automáticamente, pero puedes modificarlo)
              </p>
            </div>
            
            <div className="mb-4">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Descripción
              </label>
              <textarea
                id="description"
                name="description"
                rows={3}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#e32929] focus:ring-[#e32929] sm:text-sm"
                value={formData.description}
                onChange={handleChange}
              ></textarea>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Imagen de Categoría
              </label>
              <UnsignedImageUploader 
                images={images}
                onChange={handleImagesChange}
                multiple={false}
                maxImages={1}
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="parentCategory" className="block text-sm font-medium text-gray-700 mb-1">
                Categoría padre
              </label>
              <select
                id="parentCategory"
                name="parentCategory"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#e32929] focus:ring-[#e32929] sm:text-sm"
                value={formData.parentCategory || ""}
                onChange={handleChange}
              >
                <option value="">Ninguna (Categoría principal)</option>
                {parentCategories.map((category: any) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
              <p className="mt-1 text-xs text-gray-500">
                Opcional. Si esta es una subcategoría, selecciona su categoría padre
              </p>
            </div>
            
            <div className="mb-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="featured"
                  name="featured"
                  checked={formData.featured}
                  onChange={handleChange}
                  className="h-4 w-4 text-[#e32929] focus:ring-[#e32929] border-gray-300 rounded"
                />
                <label htmlFor="featured" className="ml-2 block text-sm font-medium text-gray-700">
                  Marcar como Destacada
                </label>
              </div>
              <p className="mt-1 text-xs text-gray-500 ml-6">
                Las categorías destacadas se muestran en posiciones prominentes del sitio web
              </p>
            </div>
          </div>
          
          {/* Submit Button */}
          <div className="mt-8 flex justify-end">
            <button
              type="button"
              className="mr-3 px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#e32929]"
              onClick={() => router.push('/admin/categories')}
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={saving}
              className={`px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#e32929] hover:bg-[#c81e1e] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#e32929] ${
                saving ? 'opacity-75 cursor-not-allowed' : ''
              }`}
            >
              {saving ? (
                <span className="flex items-center">
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
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
                  Guardando...
                </span>
              ) : (
                'Crear Categoría'
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}