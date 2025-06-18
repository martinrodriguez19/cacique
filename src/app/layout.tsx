import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import WhatsAppButton from "./components/WhatsAppButton";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });


export const metadata: Metadata = {
  title: "El Cacique - Corralón | Materiales de Construcción en Villa Martelli",
  description: "Todo para tu obra: materiales de construcción, entregas rápidas con hidrogrúa en CABA y Gran Buenos Aires. ¡Visítanos en Villa Martelli o cotiza online!",
  keywords: "materiales de construcción, corralón, Villa Martelli, entregas con hidrogrúa, CABA, Gran Buenos Aires",
  openGraph: {
    title: "El Cacique - Corralón",
    description: "Materiales de construcción, entregas con hidrogrúa en CABA y Gran Buenos Aires.",
    url: "https://caciquemateriales.com",
    siteName: "El Cacique",
    images: [
      {
        url: "https://www.caciquemateriales.com/images/logo1.png",
        width: 800,
        height: 600,
        alt: "Logo de El Cacique - Corralón",
      },
    ],
    locale: "es_AR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "El Cacique - Corralón",
    description: "Materiales de construcción en Villa Martelli. Entregas rápidas en CABA y Gran Buenos Aires.",
    images: ["https://www.caciquemateriales.com/images/logo1.png"],
  },
  icons: {
    icon: "/favicon.ico", // Logo como favicon
  },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${inter.variable} font-sans bg-white`}>
        <main>{children}</main>
        <WhatsAppButton />
      </body>
    </html>
  );
}