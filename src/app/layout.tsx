import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import WhatsAppButton from "./components/WhatsAppButton";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "El Cacique - Corralón y Ferretería",
  description: "Materiales de construcción, ferretería y todo para tu obra en Vicente López. Envíos rápidos a CABA y zona norte.",
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