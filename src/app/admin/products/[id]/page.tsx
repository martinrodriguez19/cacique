import { ProductEditForm } from '@/app/admin/components/ProductEditForm';

export default function ProductPage({ params }: { params: { id: string } }) {
  return <ProductEditForm id={params.id} />;
}