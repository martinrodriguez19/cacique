'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getCategories, deleteCategory, toggleCategoryFeatured } from './actions';
import toast from 'react-hot-toast';

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch categories
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const result = await getCategories();
        if (result.success) {
          setCategories(result.data);
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

    fetchData();
  }, []);

  // Handle delete category
  const handleDelete = async (id: string) => {
    try {
      const result = await deleteCategory(id);
      if (result.success) {
        toast.success('Categoría eliminada correctamente');
        setCategories(categories.filter((category: any) => category._id !== id));
        setConfirmDelete(null);
      } else {
        toast.error(result.error || 'Error al eliminar la categoría');
      }
    } catch (error) {
      console.error('Error deleting category:', error);
      toast.error('Error al eliminar la categoría');
    }
  };

  // Handle toggle featured
  const handleToggleFeatured = async (id: string, currentStatus: boolean) => {
    try {
      const result = await toggleCategoryFeatured(id);
      if (result.success) {
        toast.success(result.message || 'Estado destacado actualizado');
        setCategories(
          categories.map((category: any) =>
            category._id === id
              ? { ...category, featured: !currentStatus }
              : category
          )
        );
      } else {
        toast.error(result.error || 'Error al actualizar estado destacado');
      }
    } catch (error) {
      console.error('Error toggling category featured status:', error);
      toast.error('Error al actualizar estado destacado');
    }
  };

  // Filter categories
  const filteredCategories = categories.filter((category: any) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (category.description && category.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="bg-white rounded-lg shadow p-6 mt-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4 md:mb-0">Administrar Categorías</h1>
        <Link
          href="/admin/categories/new"
          className="px-4 py-2 bg-[#e32929] text-white rounded-md hover:bg-[#c81e1e] transition-colors flex items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
              clipRule="evenodd"
            />
          </svg>
          Añadir Categoría
        </Link>
      </div>

      {/* Search */}
      <div className="mb-6">
        <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
          Buscar categorías
        </label>
        <input
          type="text"
          id="search"
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#e32929] focus:ring-[#e32929] sm:text-sm"
          placeholder="Buscar por nombre o descripción..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Categories Table */}
      {loading ? (
        <div className="animate-pulse space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-16 bg-gray-200 rounded"></div>
          ))}
        </div>
      ) : (
        <>
          {filteredCategories.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Categoría
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Slug
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Estado
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredCategories.map((category: any) => (
                    <tr key={category._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {category.image ? (
                            <div className="flex-shrink-0 h-10 w-10 relative">
                              <img
                                className="h-10 w-10 rounded-md object-cover"
                                src={category.image}
                                alt={category.name}
                              />
                            </div>
                          ) : (
                            <div className="flex-shrink-0 h-10 w-10 rounded-md bg-gray-200 flex items-center justify-center">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 text-gray-400"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                                />
                              </svg>
                            </div>
                          )}
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{category.name}</div>
                            <div className="text-sm text-gray-500">
                              {category.description
                                ? category.description.substring(0, 50) +
                                  (category.description.length > 50 ? '...' : '')
                                : ''}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{category.slug}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {category.featured && (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                              Destacada
                            </span>
                          )}
                          {category.parentCategory && (
                            <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              Subcategoría
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-2">
                          <button
                            onClick={() => handleToggleFeatured(category._id, category.featured)}
                            className={`px-2 py-1 rounded-md ${
                              category.featured
                                ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
                                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                            }`}
                            title={category.featured ? 'Quitar destacado' : 'Marcar como destacado'}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                              />
                            </svg>
                          </button>
                          <Link
                            href={`/admin/categories/${category._id}`}
                            className="px-2 py-1 bg-blue-100 text-blue-800 hover:bg-blue-200 rounded-md"
                            title="Editar categoría"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"
                              />
                            </svg>
                          </Link>
                          {confirmDelete === category._id ? (
                            <div className="flex space-x-1">
                              <button
                                onClick={() => handleDelete(category._id)}
                                className="px-2 py-1 bg-red-500 text-white hover:bg-red-600 rounded-md"
                                title="Confirmar eliminación"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-5 w-5"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </button>
                              <button
                                onClick={() => setConfirmDelete(null)}
                                className="px-2 py-1 bg-gray-300 text-gray-800 hover:bg-gray-400 rounded-md"
                                title="Cancelar"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-5 w-5"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => setConfirmDelete(category._id)}
                              className="px-2 py-1 bg-red-100 text-red-800 hover:bg-red-200 rounded-md"
                              title="Eliminar categoría"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-8">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 mx-auto text-gray-400 mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                />
              </svg>
              <p className="text-gray-500 text-lg mb-2">No se encontraron categorías</p>
              <p className="text-gray-400 text-sm mb-4">
                {searchTerm
                  ? 'Intenta cambiar los términos de búsqueda'
                  : 'Comienza agregando una nueva categoría'}
              </p>
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="text-[#e32929] hover:text-[#c81e1e] transition-colors font-medium"
                >
                  Limpiar búsqueda
                </button>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}