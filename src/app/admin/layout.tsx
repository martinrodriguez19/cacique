import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import AdminNavbar from '@/app/admin/components/AdminNavbar';
import AdminSidebar from '@/app/admin/components/AdminSidebar';
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'Panel de Administración - El Cacique',
  description: 'Panel de administración para El Cacique Corralón y Ferretería',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className={`${inter.variable} font-sans bg-gray-100 min-h-screen`}>
      <AdminNavbar />
      <div className="flex">
        <AdminSidebar />
        <main className="flex-1 p-6 lg:p-8 ml-0 md:ml-64 pt-20">
          {children}
        </main>
      </div>
      <Toaster position="top-right" />
    </div>
  );
}