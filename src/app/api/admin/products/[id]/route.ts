/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from 'next/server';

import mongoose from 'mongoose';
import { connectToDatabase } from '@/app/lib/mongoose';
import Product from '@/app/lib/models/Product';
import { auth } from '@/app/lib/auth';

interface Params {
  params: { id: string };
}

// GET: Fetch a single product by ID
export async function GET(request: Request, { params }: Params) {
  try {
    const { id } = params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, message: 'Invalid product ID' },
        { status: 400 }
      );
    }
    
    await connectToDatabase();
    const product = await Product.findById(id);
    
    if (!product) {
      return NextResponse.json(
        { success: false, message: 'Product not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true, data: product });
  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json(
      { success: false, message: 'Error fetching product' },
      { status: 500 }
    );
  }
}

// PUT: Update a product by ID
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
        { success: false, message: 'Invalid product ID' },
        { status: 400 }
      );
    }
    
    await connectToDatabase();
    
    const product = await Product.findByIdAndUpdate(
      id,
      { $set: data },
      { new: true, runValidators: true }
    );
    
    if (!product) {
      return NextResponse.json(
        { success: false, message: 'Product not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true, data: product });
  } catch (error: any) {
    console.error('Error updating product:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Error updating product', 
        error: error.message 
      },
      { status: 500 }
    );
  }
}

// DELETE: Remove a product by ID
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
        { success: false, message: 'Invalid product ID' },
        { status: 400 }
      );
    }
    
    await connectToDatabase();
    const product = await Product.findByIdAndDelete(id);
    
    if (!product) {
      return NextResponse.json(
        { success: false, message: 'Product not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ 
      success: true, 
      message: 'Product deleted successfully' 
    });
  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json(
      { success: false, message: 'Error deleting product' },
      { status: 500 }
    );
  }
}