import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      'res.cloudinary.com', // Para imágenes de Cloudinary
      'via.placeholder.com' // Para imágenes de placeholder
    ],
  },
  typescript: {
    // ⚠️ Solo usar en producción si no puedes arreglar los errores de tipado
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
