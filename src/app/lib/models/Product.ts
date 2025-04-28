import mongoose, { Document, Schema } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  slug: string;
  description: string;
  category: string;
  subcategory?: string;
  price?: number;
  images: string[];
  featured: boolean;
  inStock: boolean;
  stockQuantity?: number;
  unit?: string; // kg, unidad, m2, etc.
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    subcategory: { type: String },
    price: { type: Number },
    images: [{ type: String }],
    featured: { type: Boolean, default: false },
    inStock: { type: Boolean, default: true },
    stockQuantity: { type: Number },
    unit: { type: String },
  },
  { timestamps: true }
);

// Método para generar slug a partir del nombre
ProductSchema.pre('save', function(next) {
  if (this.isModified('name') || !this.slug) {
    this.slug = this.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }
  next();
});

// Verificar si el modelo ya existe para evitar sobreescribirlo
export default mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema);