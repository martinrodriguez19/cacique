/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from 'next/server';

import { connectToDatabase } from '@/app/lib/mongoose';
import Category from '@/app/lib/models/Category';
export const maxDuration = 30;
// GET: Fetch all categories
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const featured = searchParams.get('featured');
    const query: any = {};
    
    if (featured === 'true') query.featured = true;

    await connectToDatabase();
    const categories = await Category.find(query).sort({ name: 1 });
    
    return NextResponse.json({ success: true, data: categories });
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json(
      { success: false, message: 'Error fetching categories' },
      { status: 500 }
    );
  }
}

// POST: Create a new category
export async function POST(request: Request) {
  try {


    const data = await request.json();
    await connectToDatabase();
    
    const category = await Category.create(data);
    
    return NextResponse.json(
      { success: true, data: category },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error creating category:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Error creating category', 
        error: error.message 
      },
      { status: 500 }
    );
  }
}