/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { connectToDatabase } from '@/app/lib/mongoose';
import { auth } from '@/app/lib/auth';
import Category from '@/app/lib/models/Category';

interface Params {
  params: { id: string };
}

// GET: Fetch a single category by ID
export async function GET(request: Request, { params }: Params) {
  try {
    const { id } = params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, message: 'Invalid category ID' },
        { status: 400 }
      );
    }
    
    await connectToDatabase();
    const category = await Category.findById(id);
    
    if (!category) {
      return NextResponse.json(
        { success: false, message: 'Category not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true, data: category });
  } catch (error) {
    console.error('Error fetching category:', error);
    return NextResponse.json(
      { success: false, message: 'Error fetching category' },
      { status: 500 }
    );
  }
}

// PUT: Update a category by ID
export async function PUT(request: Request, { params }: Params) {
  try {
    // Check authentication
    const session = await auth();
    if (!session) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { id } = params;
    const data = await request.json();
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, message: 'Invalid category ID' },
        { status: 400 }
      );
    }
    
    await connectToDatabase();
    
    const category = await Category.findByIdAndUpdate(
      id,
      { $set: data },
      { new: true, runValidators: true }
    );
    
    if (!category) {
      return NextResponse.json(
        { success: false, message: 'Category not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true, data: category });
  } catch (error: any) {
    console.error('Error updating category:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Error updating category', 
        error: error.message 
      },
      { status: 500 }
    );
  }
}

// DELETE: Remove a category by ID
export async function DELETE(request: Request, { params }: Params) {
  try {
    // Check authentication
    const session = await auth();
    if (!session) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { id } = params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, message: 'Invalid category ID' },
        { status: 400 }
      );
    }
    
    await connectToDatabase();
    const category = await Category.findByIdAndDelete(id);
    
    if (!category) {
      return NextResponse.json(
        { success: false, message: 'Category not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ 
      success: true, 
      message: 'Category deleted successfully' 
    });
  } catch (error) {
    console.error('Error deleting category:', error);
    return NextResponse.json(
      { success: false, message: 'Error deleting category' },
      { status: 500 }
    );
  }
}