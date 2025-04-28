// No necesitas importar React en Next.js 15
import { ProductEditForm } from '@/app/admin/components/ProductEditForm';

// Definición de parámetros para la página
export interface ProductPageParams {
  id: string;
}

// Componente de página con tipado correcto para Next.js 15
export default function Page({ params }: { params: ProductPageParams }) {
  return <ProductEditForm id={params.id} />;
}