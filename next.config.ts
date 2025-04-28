import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      'res.cloudinary.com', // Para imágenes de Cloudinary
      'via.placeholder.com' // Para imágenes de placeholder
    ],
  },
};

export default nextConfig;
