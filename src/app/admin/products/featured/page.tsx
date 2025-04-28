/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import Link from 'next/link';
import { getProducts, toggleProductFeatured } from '../actions';

export default function FeaturedProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch featured products
  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      setLoading(true);
      try {
        const result = await getProducts(undefined, true);
        if (result.success) {
          setProducts(result.data);
        } else {
          toast.error('Error al cargar productos destacados');
        }
      } catch (error) {
        console.error('Error fetching featured products:', error);
        toast.error('Error al cargar productos destacados');
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

  // Handle remove from featured
  const handleRemoveFromFeatured = async (id: string) => {
    try {
      const result = await toggleProductFeatured(id);
      if (result.success) {
        setProducts(products.filter((product: any) => product._id !== id));
        toast.success('Producto eliminado de destacados');
      } else {
        toast.error(result.error || 'Error al actualizar estado destacado');
      }
    } catch (error) {
      console.error('Error removing product from featured:', error);
      toast.error('Error al actualizar estado destacado');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 mt-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4 md:mb-0">Productos Destacados</h1>
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

      <p className="text-gray-600 mb-6">
        Estos productos se mostrarán en secciones destacadas de la página web. Puedes añadir o quitar productos de esta lista.
      </p>

      {loading ? (
        <div className="animate-pulse space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-24 bg-gray-200 rounded-lg"></div>
          ))}
        </div>
      ) : (
        <>
          {products.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {products.map((product: any) => (
                <div key={product._id} className="border rounded-lg overflow-hidden bg-gray-50 hover:shadow-md transition-shadow">
                  <div className="p-4 flex">
                    <div className="flex-shrink-0 h-16 w-16 relative">
                      {product.images && product.images[0] ? (
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="h-16 w-16 object-cover rounded-md"
                        />
                      ) : (
                        <div className="h-16 w-16 bg-gray-200 rounded-md flex items-center justify-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-8 w-8 text-gray-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                        </div>
                      )}
                    </div>
                    <div className="ml-4 flex-1">
                      <div className="font-medium text-gray-900 truncate">{product.name}</div>
                      <div className="text-sm text-gray-500">{product.category}</div>
                      {product.price && (
                        <div className="text-sm font-medium text-gray-700 mt-1">${product.price.toFixed(2)}</div>
                      )}
                    </div>
                  </div>
                  <div className="border-t px-4 py-2 bg-white flex justify-between items-center">
                    <Link
                      href={`/admin/products/${product._id}`}
                      className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      Editar
                    </Link>
                    <button
                      onClick={() => handleRemoveFromFeatured(product._id)}
                      className="text-sm text-red-600 hover:text-red-800 transition-colors flex items-center"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 mr-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                      Quitar de destacados
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
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
                  d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.783-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                />
              </svg>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No hay productos destacados</h3>
              <p className="text-gray-500 mb-6">
                Marca productos como destacados para que aparezcan en secciones importantes de la web
              </p>
              <Link
                href="/admin/products"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#e32929] hover:bg-[#c81e1e] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#e32929]"
              >
                Ver todos los productos
              </Link>
            </div>
          )}
        </>
      )}
    </div>
  );
}