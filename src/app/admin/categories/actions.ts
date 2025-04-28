/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';

import { revalidatePath } from 'next/cache';
import mongoose from 'mongoose';
import { connectToDatabase } from '@/app/lib/mongoose';
import Category, { ICategory } from '@/app/lib/models/Category';

export async function getCategories(featured?: boolean) {
  try {
    await connectToDatabase();
    
    const query: any = {};
    if (featured !== undefined) query.featured = featured;
    
    const categories = await Category.find(query).sort({ name: 1 });
    return { success: true, data: JSON.parse(JSON.stringify(categories)) };
  } catch (error: any) {
    console.error('Error fetching categories:', error);
    return { success: false, error: error.message };
  }
}

export async function getCategoryById(id: string) {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return { success: false, error: 'Invalid category ID' };
    }

    await connectToDatabase();
    const category = await Category.findById(id);
    
    if (!category) {
      return { success: false, error: 'Category not found' };
    }
    
    return { success: true, data: JSON.parse(JSON.stringify(category)) };
  } catch (error: any) {
    console.error('Error fetching category:', error);
    return { success: false, error: error.message };
  }
}

export async function createCategory(categoryData: Partial<ICategory>) {
  try {
    await connectToDatabase();
    
    const category = await Category.create(categoryData);
    revalidatePath('/admin/categories');
    
    return { success: true, data: JSON.parse(JSON.stringify(category)) };
  } catch (error: any) {
    console.error('Error creating category:', error);
    return { success: false, error: error.message };
  }
}

export async function updateCategory(id: string, categoryData: Partial<ICategory>) {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return { success: false, error: 'Invalid category ID' };
    }

    await connectToDatabase();
    
    const category = await Category.findByIdAndUpdate(
      id,
      { $set: categoryData },
      { new: true, runValidators: true }
    );
    
    if (!category) {
      return { success: false, error: 'Category not found' };
    }
    
    revalidatePath('/admin/categories');
    revalidatePath(`/admin/categories/${id}`);
    
    return { success: true, data: JSON.parse(JSON.stringify(category)) };
  } catch (error: any) {
    console.error('Error updating category:', error);
    return { success: false, error: error.message };
  }
}

export async function deleteCategory(id: string) {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return { success: false, error: 'Invalid category ID' };
    }

    await connectToDatabase();
    const category = await Category.findByIdAndDelete(id);
    
    if (!category) {
      return { success: false, error: 'Category not found' };
    }
    
    revalidatePath('/admin/categories');
    
    return { success: true, message: 'Category deleted successfully' };
  } catch (error: any) {
    console.error('Error deleting category:', error);
    return { success: false, error: error.message };
  }
}

export async function toggleCategoryFeatured(id: string) {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return { success: false, error: 'Invalid category ID' };
    }

    await connectToDatabase();
    
    const category = await Category.findById(id);
    
    if (!category) {
      return { success: false, error: 'Category not found' };
    }
    
    category.featured = !category.featured;
    await category.save();
    
    revalidatePath('/admin/categories');
    
    return { 
      success: true, 
      data: JSON.parse(JSON.stringify(category)),
      message: `Category ${category.featured ? 'marked as featured' : 'removed from featured'}`
    };
  } catch (error: any) {
    console.error('Error toggling category featured status:', error);
    return { success: false, error: error.message };
  }
}