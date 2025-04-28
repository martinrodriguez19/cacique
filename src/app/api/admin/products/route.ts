/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from 'next/server';

import { connectToDatabase } from '@/app/lib/mongoose';
import Product from '@/app/lib/models/Product';
export const maxDuration = 30;
// GET: Fetch all products
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const featured = searchParams.get('featured');
    const query: any = {};
    
    if (category) query.category = category;
    if (featured === 'true') query.featured = true;

    await connectToDatabase();
    const products = await Product.find(query).sort({ createdAt: -1 });
    
    return NextResponse.json({ success: true, data: products });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { success: false, message: 'Error fetching products' },
      { status: 500 }
    );
  }
}

// POST: Create a new product
export async function POST(request: Request) {
  try {

    const data = await request.json();
    await connectToDatabase();
    
    const product = await Product.create(data);
    
    return NextResponse.json(
      { success: true, data: product },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error creating product:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Error creating product', 
        error: error.message 
      },
      { status: 500 }
    );
  }
}