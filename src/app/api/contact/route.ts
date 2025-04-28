/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/app/lib/mongoose';
import Contact from '@/app/lib/models/Contact';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    const { name, email, phone, message } = body;
    
    if (!name || !email || !phone || !message) {
      return NextResponse.json(
        { success: false, error: 'Faltan campos requeridos' },
        { status: 400 }
      );
    }

    // Connect to database
    await connectToDatabase();
    
    // Create contact
    const contact = await Contact.create({
      name,
      email,
      phone,
      message,
      project: body.projectType || null,
      status: 'pending',
      read: false
    });

    return NextResponse.json(
      { success: true, message: 'Consulta enviada exitosamente' },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error creating contact:', error);
    
    return NextResponse.json(
      { success: false, error: error.message || 'Error al procesar la solicitud' },
      { status: 500 }
    );
  }
}