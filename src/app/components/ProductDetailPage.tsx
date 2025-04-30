"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import { getProductById, getProducts } from "@/app/lib/services/api";
import { IProduct } from "@/app/lib/models/Product";

interface ProductDetailPageProps {
  params: {
    categorySlug: string;
    productSlug: string;
  };
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { categorySlug, productSlug } = params;
  const [product, setProduct] = useState<IProduct | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<IProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeImage, setActiveImage] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Obtener todos los productos de la categoría
        const productsData = await getProducts(categorySlug);
        
        // Encontrar el producto específico
        const productData = productsData.find(p => p.slug === productSlug) || null;
        
        if (productData) {
          setProduct(productData);
          
          // Establecer la primera imagen como activa
          if (productData.images && productData.images.length > 0) {
            setActiveImage(productData.images[0]);
          }
          
          // Obtener productos relacionados (misma categoría, distinto id)
          const related = productsData
            .filter(p => p._id !== productData._id)
            .slice(0, 3); // Limitar a 3 productos relacionados
            
          setRelatedProducts(related);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [categorySlug, productSlug]);

  return (
    <div className="pt-24 pb-16">
      <Navbar />
      <div className="container-custom">
        {/* Loading state */}
        {isLoading && (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#e32929]"></div>
          </div>
        )}

        {/* Product not found */}
        {!isLoading && !product && (
          <div className="text-center py-16">
            <svg
              className="w-20 h-20 text-gray-400 mx-auto mb-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h2 className="text-2xl font-semibold mb-4">Producto no encontrado</h2>
            <p className="text-gray-600 mb-6 max-w-xl mx-auto">
              El producto que estás buscando no existe o ha sido removido.
            </p>
            <Link href={`/productos/${categorySlug}`} className="btn-primary">
              Ver todos los productos de esta categoría
            </Link>
          </div>
        )}

        {/* Product detail */}
        {!isLoading && product && (
          <>
            {/* Breadcrumbs */}
            <div className="flex items-center text-sm text-gray-500 mb-8">
              <Link href="/" className="hover:text-[#e32929]">
                Inicio
              </Link>
              <span className="mx-2">/</span>
              <Link href="/productos" className="hover:text-[#e32929]">
                Productos
              </Link>
              <span className="mx-2">/</span>
              <Link href={`/productos/${categorySlug}`} className="hover:text-[#e32929]">
                {categorySlug.charAt(0).toUpperCase() + categorySlug.slice(1).replace(/-/g, ' ')}
              </Link>
              <span className="mx-2">/</span>
              <span className="font-medium text-gray-900">{product.name}</span>
            </div>

            {/* Product information */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
              {/* Product images */}
              <div>
                {/* Main image */}
                <div className="relative h-96 rounded-lg overflow-hidden border border-gray-200 mb-4">
                  <Image
                    src={activeImage || product.images[0] || "/images/placeholder.jpg"}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Thumbnail gallery */}
                {product.images.length > 1 && (
                  <div className="flex gap-2 overflow-x-auto pb-2">
                    {product.images.map((img, index) => (
                      <button
                        key={index}
                        onClick={() => setActiveImage(img)}
                        className={`relative w-20 h-20 flex-shrink-0 rounded-md overflow-hidden border-2 ${
                          activeImage === img ? "border-[#e32929]" : "border-gray-200"
                        }`}
                      >
                        <Image
                          src={img}
                          alt={`${product.name} - vista ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Product details */}
              <div>
                <h1 className="text-3xl font-bold mb-4">{product.name}</h1>

                {product.subcategory && (
                  <div className="mb-4">
                    <span className="inline-block px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full">
                      {product.subcategory}
                    </span>
                  </div>
                )}
                
                <div className="prose prose-lg max-w-none mb-6">
                  <p>{product.description}</p>
                </div>

                {/* Product attributes */}
                {product.unit && (
                  <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-semibold text-gray-700 mb-2">Detalles del producto:</h3>
                    <ul className="space-y-2">
                      <li className="flex justify-between">
                        <span className="text-gray-600">Unidad de medida:</span>
                        <span className="font-medium">{product.unit}</span>
                      </li>
                      {product.stockQuantity !== undefined && (
                        <li className="flex justify-between">
                          <span className="text-gray-600">Disponibilidad:</span>
                          <span className={`font-medium ${product.inStock ? 'text-green-600' : 'text-red-600'}`}>
                            {product.inStock ? 'En stock' : 'Agotado'}
                          </span>
                        </li>
                      )}
                    </ul>
                  </div>
                )}

                {/* Price and actions */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-8">
                  {product.price ? (
                    <div className="text-2xl font-bold text-[#e32929]">
                      ${product.price.toLocaleString()}
                      {product.unit && <span className="text-sm text-gray-500 ml-1">/{product.unit}</span>}
                    </div>
                  ) : (
                    <div className="text-lg text-gray-600">
                      Precio a consultar
                    </div>
                  )}
                  
                  <div className="flex gap-3">
                    <Link 
                      href="/cotiza" 
                      className="btn-primary"
                    >
                      Solicitar cotización
                    </Link>
                    <Link 
                      href="/contacto" 
                      className="btn-secondary"
                    >
                      Consultar
                    </Link>
                  </div>
                </div>

                {/* Product extras */}
                <div className="border-t border-gray-200 pt-6">
                  <div className="flex items-center mb-6">
                    <div className="bg-[#e32929]/10 w-10 h-10 rounded-full flex items-center justify-center mr-3">
                      <svg
                        className="w-5 h-5 text-[#e32929]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"
                        />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium">Entrega disponible</h4>
                      <p className="text-sm text-gray-600">Servicio de entrega en CABA y zona norte</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="bg-[#e32929]/10 w-10 h-10 rounded-full flex items-center justify-center mr-3">
                      <svg
                        className="w-5 h-5 text-[#e32929]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium">Calidad garantizada</h4>
                      <p className="text-sm text-gray-600">Trabajamos con las mejores marcas del mercado</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Related products */}
            {relatedProducts.length > 0 && (
              <div className="mt-16">
                <h2 className="text-2xl font-bold mb-8">Productos relacionados</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {relatedProducts.map((relatedProduct) => (
                    <div
                      key={relatedProduct._id}
                      className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow border border-gray-200"
                    >
                      <div className="relative h-48">
                        <Image
                          src={relatedProduct.images[0] || "/images/placeholder.jpg"}
                          alt={relatedProduct.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="text-lg font-medium mb-2">{relatedProduct.name}</h3>
                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{relatedProduct.description}</p>
                        <Link
                          href={`/productos/${categorySlug}/${relatedProduct.slug}`}
                          className="text-[#e32929] hover:text-[#c81e1e] text-sm font-medium inline-flex items-center"
                        >
                          Ver detalles
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 ml-1"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        {/* CTA Section */}
        <div className="mt-16 bg-gradient-to-r from-[#e32929]/90 to-[#c81e1e] rounded-lg p-8 text-center text-white">
          <h2 className="text-2xl font-semibold mb-4">¿Necesitas asesoramiento profesional?</h2>
          <p className="text-white/90 mb-6 max-w-2xl mx-auto">
            Nuestro equipo de expertos está listo para ayudarte a elegir los materiales 
            adecuados para tu proyecto.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              href="/contacto" 
              className="bg-white text-[#e32929] hover:bg-gray-100 font-medium py-2 px-6 rounded-md transition-colors"
            >
              Contactar ahora
            </Link>
            <Link 
              href="/cotiza" 
              className="bg-transparent border-2 border-white text-white hover:bg-white/10 font-medium py-2 px-6 rounded-md transition-colors"
            >
              Solicitar cotización
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}