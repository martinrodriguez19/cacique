"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getCategories, getProducts } from "@/app/lib/services/api";
import { IProduct } from "@/app/lib/models/Product";
import { ICategory } from "@/app/lib/models/Category";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

// Interfaz de props para el componente
interface ProductDetailProps {
  params: {
    categorySlug: string;
    productSlug: string;
  };
}

export default function ProductDetailPage({ params }: ProductDetailProps) {
  console.log("ProductDetailPage params:", params);
  
  const { categorySlug, productSlug } = params;
  console.log("CategorySlug:", categorySlug, "ProductSlug:", productSlug);
  
  const [product, setProduct] = useState<IProduct | null>(null);
  const [category, setCategory] = useState<ICategory | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<IProduct[]>([]);
  const [activeImage, setActiveImage] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchProductDetails = async () => {
      setIsLoading(true);
      try {
        // Opciones de caché para la solicitud del lado del cliente
        const clientOptions = { cache: 'no-store' as const };
        
        // Primero obtener la categoría
        const categories = await getCategories(undefined, clientOptions);
        const foundCategory = categories.find(cat => cat.slug === categorySlug);
        
        if (!foundCategory) {
          console.error("Categoría no encontrada:", categorySlug);
          router.push('/productos');
          return;
        }
        
        setCategory(foundCategory);
        
        // Obtener todos los productos de la categoría
        const productsInCategory = await getProducts(categorySlug, undefined, clientOptions);
        
        // Buscar el producto por su slug
        const foundProduct = productsInCategory.find(p => p.slug === productSlug);
        
        if (foundProduct) {
          setProduct(foundProduct);
          
          // Establecer la imagen activa como la primera imagen
          if (foundProduct.images && foundProduct.images.length > 0) {
            setActiveImage(foundProduct.images[0]);
          }
          
          // Obtener productos relacionados (misma categoría, excepto el actual)
          const related = productsInCategory
            .filter(p => p._id !== foundProduct._id)
            .slice(0, 3); // Mostrar solo 3 productos relacionados
          
          setRelatedProducts(related);
        } else {
          // Si no se encuentra el producto, redireccionar a la página de categoría
          console.error("Producto no encontrado:", productSlug);
          router.push(`/productos/${categorySlug}`);
        }
      } catch (error) {
        console.error("Error fetching product details:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (categorySlug && productSlug) {
      fetchProductDetails();
    }
  }, [categorySlug, productSlug, router]);

  // Formatear precio si existe
  const formatPrice = (price?: number) => {
    if (!price) return "Consultar precio";
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS'
    }).format(price);
  };

  // Función segura para formatear el nombre de la categoría
  const formatCategoryName = () => {
    if (category?.name) {
      return category.name;
    }
    
    // Si no hay categoría, intentar formatear el slug de manera segura
    if (categorySlug) {
      return categorySlug.split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    }
    
    // Fallback si no hay ni categoría ni categorySlug
    return 'Categoría';
  };

  return (
    <div className="pt-24 pb-16">
      <Navbar />
      <div className="container-custom">
        {/* Breadcrumbs */}
        <nav className="mb-8">
          <ol className="flex items-center text-sm">
            <li>
              <Link href="/" className="text-gray-500 hover:text-[#e32929]">
                Inicio
              </Link>
            </li>
            <li className="mx-2 text-gray-500">/</li>
            <li>
              <Link href="/productos" className="text-gray-500 hover:text-[#e32929]">
                Productos
              </Link>
            </li>
            <li className="mx-2 text-gray-500">/</li>
            <li>
              <Link
                href={`/productos/${categorySlug}`}
                className="text-gray-500 hover:text-[#e32929]"
              >
                {formatCategoryName()}
              </Link>
            </li>
            <li className="mx-2 text-gray-500">/</li>
            <li className="text-gray-700 font-medium">
              {product?.name || 'Cargando...'}
            </li>
          </ol>
        </nav>

        {/* Loading state */}
        {isLoading && (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#e32929]"></div>
          </div>
        )}

        {/* Product detail */}
        {!isLoading && product && (
          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 md:p-8">
              {/* Product Images */}
              <div>
                {/* Main image */}
                <div className="relative h-80 md:h-96 w-full mb-4 rounded-lg overflow-hidden">
                  <Image
                    src={activeImage || '/images/placeholder.jpg'}
                    alt={product.name}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                
                {/* Thumbnails */}
                {product.images && product.images.length > 1 && (
                  <div className="flex space-x-2 overflow-x-auto pb-2">
                    {product.images.map((img, index) => (
                      <button
                        key={index}
                        onClick={() => setActiveImage(img)}
                        className={`relative h-20 w-20 rounded-md overflow-hidden border-2 transition-all ${
                          activeImage === img
                            ? "border-[#e32929]"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <Image
                          src={img}
                          alt={`${product.name} - Imagen ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>
              
              {/* Product Info */}
              <div>
                <h1 className="text-3xl font-bold mb-3">{product.name}</h1>
                
                {/* Price */}
                {product.price ? (
                  <div className="text-2xl font-semibold text-[#e32929] mb-4">
                    {formatPrice(product.price)}
                    {product.unit && (
                      <span className="text-base text-gray-600 ml-1">/ {product.unit}</span>
                    )}
                  </div>
                ) : (
                  <div className="mb-4">
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
                      Consultar precio
                    </span>
                  </div>
                )}
                
                {/* Stock status */}
                <div className="mb-6">
                  {product.inStock ? (
                    <div className="flex items-center">
                      <div className="h-3 w-3 rounded-full bg-green-500 mr-2"></div>
                      <span className="text-green-600 font-medium">En stock</span>
                      {product.stockQuantity && (
                        <span className="text-gray-500 ml-2">
                          ({product.stockQuantity} disponibles)
                        </span>
                      )}
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <div className="h-3 w-3 rounded-full bg-red-500 mr-2"></div>
                      <span className="text-red-600 font-medium">Sin stock</span>
                    </div>
                  )}
                </div>
                
                {/* Description */}
                <div className="mb-8">
                  <h2 className="text-lg font-semibold mb-2">Descripción</h2>
                  <p className="text-gray-600">{product.description}</p>
                </div>
                
                {/* Actions */}
                <div className="space-y-3">
                  <Link
                    href={`/cotiza?product=${product._id}`}
                    className="btn-primary w-full text-center block"
                  >
                    Solicitar Cotización
                  </Link>
                  <Link
                    href={`https://wa.me/5491155962840?text=Hola, estoy interesado en el producto ${product.name}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex justify-center items-center w-full bg-green-500 hover:bg-green-600 text-white py-3 px-6 rounded-md transition-colors font-medium"
                  >
                    <svg
                      className="h-5 w-5 mr-2"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    Consultar por WhatsApp
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Related products */}
        {!isLoading && relatedProducts.length > 0 && (
          <div>
            <h2 className="text-2xl font-semibold mb-6">Productos relacionados</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedProducts.map((relatedProduct) => (
                <div
                  key={relatedProduct._id}
                  className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow group"
                >
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={relatedProduct.images[0] || "/images/placeholder.jpg"}
                      alt={relatedProduct.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{relatedProduct.name}</h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">{relatedProduct.description}</p>
                    <Link
                      href={`/productos/${categorySlug}/${relatedProduct.slug}`}
                      className="text-[#e32929] hover:text-[#c81e1e] font-medium inline-flex items-center transition-colors"
                    >
                      Ver detalles
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 ml-1"
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
      </div>
      <Footer />
    </div>
  );
}