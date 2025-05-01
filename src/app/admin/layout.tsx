import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import { AdminAuthProvider } from '../components/AdminAuthProvider';
import AdminProtectedLayout from '../components/AdminProtectedRoutes';


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
      <AdminAuthProvider>
        <AdminProtectedLayout>
          {children}
        </AdminProtectedLayout>
      </AdminAuthProvider>
      <Toaster position="top-right" />
    </div>
  );
}