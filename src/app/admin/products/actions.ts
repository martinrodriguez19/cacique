/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';

import { revalidatePath } from 'next/cache';

import mongoose from 'mongoose';
import { connectToDatabase } from '@/app/lib/mongoose';
import Product, { IProduct } from '@/app/lib/models/Product';

export async function getProducts(category?: string, featured?: boolean) {
  try {
    await connectToDatabase();
    
    const query: any = {};
    if (category) query.category = category;
    if (featured !== undefined) query.featured = featured;
    
    const products = await Product.find(query).sort({ createdAt: -1 });
    return { success: true, data: JSON.parse(JSON.stringify(products)) };
  } catch (error: any) {
    console.error('Error fetching products:', error);
    return { success: false, error: error.message };
  }
}

export async function getProductById(id: string) {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return { success: false, error: 'Invalid product ID' };
    }

    await connectToDatabase();
    const product = await Product.findById(id);
    
    if (!product) {
      return { success: false, error: 'Product not found' };
    }
    
    return { success: true, data: JSON.parse(JSON.stringify(product)) };
  } catch (error: any) {
    console.error('Error fetching product:', error);
    return { success: false, error: error.message };
  }
}

export async function createProduct(productData: Partial<IProduct>) {
  try {
    await connectToDatabase();
    
    const product = await Product.create(productData);
    revalidatePath('/admin/products');
    
    return { success: true, data: JSON.parse(JSON.stringify(product)) };
  } catch (error: any) {
    console.error('Error creating product:', error);
    return { success: false, error: error.message };
  }
}

export async function updateProduct(id: string, productData: Partial<IProduct>) {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return { success: false, error: 'Invalid product ID' };
    }

    await connectToDatabase();
    
    const product = await Product.findByIdAndUpdate(
      id,
      { $set: productData },
      { new: true, runValidators: true }
    );
    
    if (!product) {
      return { success: false, error: 'Product not found' };
    }
    
    revalidatePath('/admin/products');
    revalidatePath(`/admin/products/${id}`);
    
    return { success: true, data: JSON.parse(JSON.stringify(product)) };
  } catch (error: any) {
    console.error('Error updating product:', error);
    return { success: false, error: error.message };
  }
}

export async function deleteProduct(id: string) {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return { success: false, error: 'Invalid product ID' };
    }

    await connectToDatabase();
    const product = await Product.findByIdAndDelete(id);
    
    if (!product) {
      return { success: false, error: 'Product not found' };
    }
    
    revalidatePath('/admin/products');
    
    return { success: true, message: 'Product deleted successfully' };
  } catch (error: any) {
    console.error('Error deleting product:', error);
    return { success: false, error: error.message };
  }
}

export async function toggleProductFeatured(id: string) {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return { success: false, error: 'Invalid product ID' };
    }

    await connectToDatabase();
    
    const product = await Product.findById(id);
    
    if (!product) {
      return { success: false, error: 'Product not found' };
    }
    
    product.featured = !product.featured;
    await product.save();
    
    revalidatePath('/admin/products');
    
    return { 
      success: true, 
      data: JSON.parse(JSON.stringify(product)),
      message: `Product ${product.featured ? 'marked as featured' : 'removed from featured'}`
    };
  } catch (error: any) {
    console.error('Error toggling product featured status:', error);
    return { success: false, error: error.message };
  }
}