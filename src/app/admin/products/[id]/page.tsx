'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import Link from 'next/link';
import { getCategories } from '../../categories/actions';
import { createProduct, getProductById, updateProduct } from '../actions';
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

// En Next.js 15 usamos Page Client Component para evitar el error de params
export default function ProductFormPage({ params }: { params: { id: string } }) {
  // Usamos una forma de acceder al id para evitar la advertencia
  const [id, setId] = useState<string>('');
  const [isNewProduct, setIsNewProduct] = useState<boolean>(false);
  
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [categories, setCategories] = useState([]);
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    subcategory: '',
    price: '',
    featured: false,
    inStock: true,
    stockQuantity: '',
    unit: '',
    slug: '',  // Añadido campo slug para productos
  });

  // Para manejar las imágenes con Cloudinary
  const [productImages, setProductImages] = useState<string[]>([]);

  // Inicializar id y isNewProduct de manera segura
  useEffect(() => {
    setId(params.id);
    setIsNewProduct(params.id === 'new');
  }, [params.id]);

  // Actualizar el slug automáticamente cuando cambia el nombre
  useEffect(() => {
    if (formData.name) {
      setFormData(prev => ({
        ...prev,
        slug: generateSlug(prev.name)
      }));
    }
  }, [formData.name]);

  useEffect(() => {
    // Solo cargar datos si tenemos el id
    if (!id) return;
    
    const fetchData = async () => {
      setLoading(true);

      try {
        // Fetch categories first
        const categoriesRes = await getCategories();
        if (categoriesRes.success) {
          setCategories(categoriesRes.data);
          
          // Set default category if available
          if (categoriesRes.data.length > 0 && isNewProduct) {
            setFormData(prev => ({ ...prev, category: categoriesRes.data[0].slug }));
          }
        } else {
          toast.error('Error al cargar categorías');
        }

        // If editing existing product, fetch its data
        if (!isNewProduct) {
          const productRes = await getProductById(id);
          if (productRes.success) {
            const product = productRes.data;
            setFormData({
              name: product.name || '',
              description: product.description || '',
              category: product.category || '',
              subcategory: product.subcategory || '',
              price: product.price ? product.price.toString() : '',
              featured: product.featured || false,
              inStock: product.inStock !== undefined ? product.inStock : true,
              stockQuantity: product.stockQuantity ? product.stockQuantity.toString() : '',
              unit: product.unit || '',
              slug: product.slug || '',
            });
            
            // Establecer las imágenes del producto
            if (product.images && Array.isArray(product.images)) {
              setProductImages(product.images);
            }
          } else {
            toast.error('Error al cargar el producto');
            router.push('/admin/products');
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error('Error al cargar datos');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, isNewProduct, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // Manejar cambios en las imágenes
  const handleImagesChange = (urls: string[]) => {
    setProductImages(urls);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      // Asegúrate de que el slug está generado
      if (!formData.slug && formData.name) {
        formData.slug = generateSlug(formData.name);
      }
      
      // Format data for submission
      const productData = {
        ...formData,
        price: formData.price ? parseFloat(formData.price) : undefined,
        stockQuantity: formData.stockQuantity ? parseInt(formData.stockQuantity, 10) : undefined,
        images: productImages, // Añadir las imágenes de Cloudinary
      };

      // Log para depuración
      console.log("Enviando datos del producto:", productData);

      let result;
      
      if (isNewProduct) {
        result = await createProduct(productData);
      } else {
        result = await updateProduct(id, productData);
      }

      if (result.success) {
        toast.success(isNewProduct ? 'Producto creado correctamente' : 'Producto actualizado correctamente');
        router.push('/admin/products');
      } else {
        toast.error(result.error || 'Error al guardar el producto');
      }
    } catch (error) {
      console.error('Error saving product:', error);
      toast.error('Error al guardar el producto');
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
          {isNewProduct ? 'Añadir Nuevo Producto' : 'Editar Producto'}
        </h1>
        <Link
          href="/admin/products"
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
          Volver a Productos
        </Link>
      </div>

      {loading ? (
        <div className="animate-pulse space-y-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-10 bg-gray-200 rounded"></div>
          ))}
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Basic Information */}
            <div>
              <h2 className="text-lg font-medium text-gray-700 mb-4">Información Básica</h2>
              
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre del Producto <span className="text-red-500">*</span>
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
                  Descripción <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows={4}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#e32929] focus:ring-[#e32929] sm:text-sm"
                  value={formData.description}
                  onChange={handleChange}
                ></textarea>
              </div>
              
              <div className="mb-4">
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                  Categoría <span className="text-red-500">*</span>
                </label>
                <select
                  id="category"
                  name="category"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#e32929] focus:ring-[#e32929] sm:text-sm"
                  value={formData.category}
                  onChange={handleChange}
                >
                  <option value="">Seleccionar categoría</option>
                  {categories.map((category: any) => (
                    <option key={category._id} value={category.slug}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="mb-4">
                <label htmlFor="subcategory" className="block text-sm font-medium text-gray-700 mb-1">
                  Subcategoría
                </label>
                <input
                  type="text"
                  id="subcategory"
                  name="subcategory"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#e32929] focus:ring-[#e32929] sm:text-sm"
                  value={formData.subcategory}
                  onChange={handleChange}
                />
              </div>
            </div>
            
            {/* Pricing & Inventory */}
            <div>
              <h2 className="text-lg font-medium text-gray-700 mb-4">Precio e Inventario</h2>
              
              <div className="mb-4">
                <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                  Precio
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">$</span>
                  </div>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    step="0.01"
                    className="block w-full pl-7 pr-12 border-gray-300 rounded-md focus:border-[#e32929] focus:ring-[#e32929] sm:text-sm"
                    placeholder="0.00"
                    value={formData.price}
                    onChange={handleChange}
                  />
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  Dejar en blanco si el precio no se muestra en la web
                </p>
              </div>
              
              <div className="mb-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="inStock"
                    name="inStock"
                    checked={formData.inStock}
                    onChange={handleChange}
                    className="h-4 w-4 text-[#e32929] focus:ring-[#e32929] border-gray-300 rounded"
                  />
                  <label htmlFor="inStock" className="ml-2 block text-sm font-medium text-gray-700">
                    Producto en stock
                  </label>
                </div>
              </div>
              
              <div className="mb-4">
                <label htmlFor="stockQuantity" className="block text-sm font-medium text-gray-700 mb-1">
                  Cantidad en Stock
                </label>
                <input
                  type="number"
                  id="stockQuantity"
                  name="stockQuantity"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#e32929] focus:ring-[#e32929] sm:text-sm"
                  value={formData.stockQuantity}
                  onChange={handleChange}
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="unit" className="block text-sm font-medium text-gray-700 mb-1">
                  Unidad de Medida
                </label>
                <input
                  type="text"
                  id="unit"
                  name="unit"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#e32929] focus:ring-[#e32929] sm:text-sm"
                  placeholder="kg, unidad, m2, etc."
                  value={formData.unit}
                  onChange={handleChange}
                />
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
                    Marcar como Destacado
                  </label>
                </div>
              </div>
            </div>
          </div>
          
          {/* Images Section */}
          <div className="mt-6">
            <h2 className="text-lg font-medium text-gray-700 mb-4">Imágenes del Producto</h2>
            
            {/* Cloudinary Image Uploader Component */}
            <UnsignedImageUploader 
              images={productImages}
              onChange={handleImagesChange}
              multiple={true}
              maxImages={10}
            />
          </div>
          
          {/* Submit Button */}
          <div className="mt-8 flex justify-end">
            <button
              type="button"
              className="mr-3 px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#e32929]"
              onClick={() => router.push('/admin/products')}
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
              ) : isNewProduct ? (
                'Crear Producto'
              ) : (
                'Actualizar Producto'
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}