/* eslint-disable @typescript-eslint/no-unsafe-function-type */
// src/lib/cloudinary.ts
import { v2 as cloudinary } from 'cloudinary';

// Configurar Cloudinary con las credenciales de tu cuenta
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || '',
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY || '',
  api_secret: process.env.CLOUDINARY_API_SECRET || '',
  secure: true,
});

// Modifica tu archivo src/lib/cloudinary.ts para depurar
export const generateSignature = (callback: Function) => {
    const timestamp = Math.round(new Date().getTime() / 1000);
    
    // Objeto para firmar con exactamente estos parámetros
    const paramsToSign = {
      folder: 'el-cacique',
      source: 'uw',
      timestamp: timestamp,
      upload_preset: 'el-cacique-preset'
    };
    
    const signature = cloudinary.utils.api_sign_request(
      paramsToSign,
      process.env.CLOUDINARY_API_SECRET || ''
    );
  
    callback({
      signature,
      timestamp,
      cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
      apiKey: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY
    });
  };