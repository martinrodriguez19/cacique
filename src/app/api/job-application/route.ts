/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/app/lib/mongoose';
import JobApplication from '@/app/lib/models/JobApplication';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    const { nombre, email, telefono, puesto, experiencia, cvUrl } = body;
    
    if (!nombre || !email || !telefono || !puesto || !experiencia || !cvUrl) {
      return NextResponse.json(
        { success: false, error: 'Faltan campos requeridos' },
        { status: 400 }
      );
    }

    // Connect to database
    await connectToDatabase();
    
    // Create job application
    const application = await JobApplication.create({
      nombre,
      email,
      telefono,
      puesto,
      experiencia,
      mensaje: body.mensaje || '',
      cvUrl,
      status: 'pending',
      read: false
    });

    return NextResponse.json(
      { success: true, message: 'Solicitud de trabajo enviada exitosamente' },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error creating job application:', error);
    
    return NextResponse.json(
      { success: false, error: error.message || 'Error al procesar la solicitud' },
      { status: 500 }
    );
  }
}