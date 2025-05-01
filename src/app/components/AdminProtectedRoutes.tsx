"use client";


import SecurityModal from './SecurityModal';
import { useAdminAuth } from './AdminAuthProvider';
import AdminNavbar from '../admin/components/AdminNavbar';
import AdminSidebar from '../admin/components/AdminSidebar';

export default function AdminProtectedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { isAuthenticated, login } = useAdminAuth();

  const handleAuthentication = (authenticated: boolean) => {
    if (authenticated) {
      login();
    }
  };

  return (
    <>
      {!isAuthenticated && (
        <SecurityModal onAuthenticate={handleAuthentication} />
      )}
      
      {isAuthenticated && (
        <>
          <AdminNavbar />
          <div className="flex">
            <AdminSidebar />
            <main className="flex-1 p-6 lg:p-8 ml-0 md:ml-64 pt-20">
              {children}
            </main>
          </div>
        </>
      )}
    </>
  );
}