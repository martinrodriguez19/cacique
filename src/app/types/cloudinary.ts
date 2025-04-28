/* eslint-disable @typescript-eslint/no-explicit-any */
// src/types/cloudinary.ts

// Definición del tipo para el resultado de la carga de Cloudinary
export interface CloudinaryUploadResult {
    public_id: string;
    version: string;
    signature: string;
    width: number;
    height: number;
    format: string;
    resource_type: string;
    created_at: string;
    tags: string[];
    bytes: number;
    type: string;
    etag: string;
    url: string;
    secure_url: string;
    original_filename: string;
  }
  
  // Definición del tipo para el widget de Cloudinary
  export interface CloudinaryUploadWidget {
    open: () => void;
    close: () => void;
    destroy: () => void;
    isShowing: () => boolean;
    minimize: () => void;
    update: (options: any) => void;
  }