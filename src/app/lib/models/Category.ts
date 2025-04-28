import mongoose, { Document, Schema } from 'mongoose';

export interface ICategory extends Document {
  name: string;
  slug?: string;
  description?: string;
  image?: string;
  parentCategory?: mongoose.Types.ObjectId;
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const CategorySchema = new Schema<ICategory>(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String },
    image: { type: String },
    parentCategory: { type: Schema.Types.ObjectId, ref: 'Category' },
    featured: { type: Boolean, default: false }
  },
  { timestamps: true }
);

// Método para generar slug a partir del nombre
CategorySchema.pre('save', function(next) {
  if (this.isModified('name') || !this.slug) {
    this.slug = this.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }
  next();
});

export default mongoose.models.Category || mongoose.model<ICategory>('Category', CategorySchema);