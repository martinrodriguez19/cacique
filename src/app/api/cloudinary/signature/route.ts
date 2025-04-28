// src/app/api/cloudinary/signature/route.ts
import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

export async function GET(request: NextRequest) {
  try {
    const timestamp = Math.round(new Date().getTime() / 1000);
    const apiSecret = process.env.CLOUDINARY_API_SECRET || '';
    
    // Los parámetros exactos en el orden exacto que necesita Cloudinary
    const strToSign = `folder=el-cacique&source=uw&timestamp=${timestamp}&upload_preset=el-cacique-preset${apiSecret}`;
    
    // Generar firma con SHA-1
    const signature = crypto
      .createHash('sha1')
      .update(strToSign)
      .digest('hex');
    
    return NextResponse.json({
      signature,
      timestamp,
      cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
      apiKey: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
    });
  } catch (error) {
    console.error('Error generating signature:', error);
    return NextResponse.json(
      { error: 'Error al generar la firma para Cloudinary' },
      { status: 500 }
    );
  }
}