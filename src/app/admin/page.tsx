/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getProducts } from './products/actions';
import { getCategories } from './categories/actions';
import { getContactCounts } from './inquiries/actions';
import { getJobApplicationCounts } from './job-applications/actions';
export const maxDuration = 30;
export default function AdminDashboard() {
  const [stats, setStats] = useState({
    products: 0,
    categories: 0,
    inquiries: {
      total: 0,
      unread: 0,
      pending: 0
    },
    jobApplications: {
      total: 0,
      unread: 0,
      pending: 0
    }
  });
  const [recentProducts, setRecentProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch products
        const productsRes = await getProducts();
        const products = productsRes.success ? productsRes.data : [];
        
        // Fetch categories
        const categoriesRes = await getCategories();
        const categories = categoriesRes.success ? categoriesRes.data : [];
        
        // Fetch inquiry stats
        const inquiryRes = await getContactCounts();
        const inquiryStats = inquiryRes.success ? inquiryRes.data : { total: 0, unread: 0, pending: 0 };
        
        // Fetch job application stats
        const jobAppRes = await getJobApplicationCounts();
        const jobAppStats = jobAppRes.success ? jobAppRes.data : { total: 0, unread: 0, pending: 0 };
        
        // Set stats
        setStats({
          products: products.length,
          categories: categories.length,
          inquiries: {
            total: inquiryStats.total || 0,
            unread: inquiryStats.unread || 0,
            pending: inquiryStats.pending || 0
          },
          jobApplications: {
            total: jobAppStats.total || 0,
            unread: jobAppStats.unread || 0,
            pending: jobAppStats.pending || 0
          }
        });
        
        // Set recent products
        setRecentProducts(products.slice(0, 5));
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Dashboard</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatsCard 
          title="Productos" 
          value={stats.products} 
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          }
          href="/admin/products"
          color="bg-blue-500"
          loading={loading}
        />
        <StatsCard 
          title="Categorías" 
          value={stats.categories} 
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
            </svg>
          }
          href="/admin/categories"
          color="bg-purple-500"
          loading={loading}
        />
        <StatsCard 
          title="Consultas" 
          value={stats.inquiries.total} 
          subtitle={`${stats.inquiries.unread} sin leer`}
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
          }
          href="/admin/inquiries"
          color="bg-yellow-500"
          loading={loading}
        />
        <StatsCard 
          title="CVs Recibidos" 
          value={stats.jobApplications.total} 
          subtitle={`${stats.jobApplications.unread} sin revisar`}
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          }
          href="/admin/job-applications"
          color="bg-green-500"
          loading={loading}
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Products */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Productos Recientes</h2>
            <Link href="/admin/products" className="text-sm text-[#e32929] hover:text-[#c81e1e]">
              Ver Todos
            </Link>
          </div>
          
          {loading ? (
            <div className="animate-pulse">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="py-3 border-b border-gray-200">
                  <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ) : recentProducts.length > 0 ? (
            <div className="divide-y divide-gray-200">
              {recentProducts.map((product: any) => (
                <div key={product._id} className="py-3">
                  <Link href={`/admin/products/${product._id}`} className="block hover:bg-gray-50 -mx-4 px-4 py-2 rounded-md">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-sm font-medium text-gray-800">{product.name}</h3>
                        <p className="text-xs text-gray-500 mt-1">{product.category}</p>
                      </div>
                      {product.featured && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                          Destacado
                        </span>
                      )}
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-4">No hay productos disponibles</p>
          )}
        </div>
        
        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Acciones Rápidas</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link
              href="/admin/products/new"
              className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="rounded-full bg-blue-100 p-2 mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-800">Nuevo Producto</h3>
                <p className="text-xs text-gray-500 mt-1">Añadir producto al catálogo</p>
              </div>
            </Link>
            
            <Link
              href="/admin/categories/new"
              className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="rounded-full bg-purple-100 p-2 mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-800">Nueva Categoría</h3>
                <p className="text-xs text-gray-500 mt-1">Crear nueva categoría</p>
              </div>
            </Link>
            
            <Link
              href="/admin/inquiries"
              className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="rounded-full bg-yellow-100 p-2 mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-800">Ver Consultas</h3>
                <p className="text-xs text-gray-500 mt-1">Gestionar mensajes recibidos</p>
              </div>
            </Link>
            
            <Link
              href="/admin/job-applications"
              className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="rounded-full bg-green-100 p-2 mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-800">CVs Recibidos</h3>
                <p className="text-xs text-gray-500 mt-1">Revisar aplicaciones de trabajo</p>
              </div>
            </Link>
          </div>
        </div>

        {/* Pending Inquiries */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Consultas Pendientes</h2>
            <div className="flex items-center">
              <span className="mr-2 text-sm bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full">
                {stats.inquiries.pending} pendientes
              </span>
              <Link href="/admin/inquiries?filter=pending" className="text-sm text-[#e32929] hover:text-[#c81e1e]">
                Ver Todas
              </Link>
            </div>
          </div>

          {loading ? (
            <div className="animate-pulse space-y-3">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-gray-200 h-16 rounded-md"></div>
              ))}
            </div>
          ) : stats.inquiries.total > 0 ? (
            <div className="text-center bg-gray-50 p-4 rounded-md">
              <Link 
                href="/admin/inquiries" 
                className="inline-flex items-center text-[#e32929] hover:text-[#c81e1e]"
              >
                <span>Ver todas las consultas</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 ml-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </div>
          ) : (
            <div className="text-center py-6 bg-gray-50 rounded-md">
              <p className="text-gray-500">No hay consultas pendientes</p>
            </div>
          )}
        </div>

        {/* Recent Job Applications */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800">CVs Recientes</h2>
            <div className="flex items-center">
              <span className="mr-2 text-sm bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                {stats.jobApplications.unread} sin revisar
              </span>
              <Link href="/admin/job-applications" className="text-sm text-[#e32929] hover:text-[#c81e1e]">
                Ver Todos
              </Link>
            </div>
          </div>

          {loading ? (
            <div className="animate-pulse space-y-3">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-gray-200 h-16 rounded-md"></div>
              ))}
            </div>
          ) : stats.jobApplications.total > 0 ? (
            <div className="text-center bg-gray-50 p-4 rounded-md">
              <Link 
                href="/admin/job-applications" 
                className="inline-flex items-center text-[#e32929] hover:text-[#c81e1e]"
              >
                <span>Ver todos los CVs recibidos</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 ml-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </div>
          ) : (
            <div className="text-center py-6 bg-gray-50 rounded-md">
              <p className="text-gray-500">No hay CVs recibidos</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function StatsCard({ 
  title, 
  value, 
  subtitle,
  icon, 
  href, 
  color,
  loading 
}: { 
  title: string; 
  value: number; 
  subtitle?: string;
  icon: React.ReactNode; 
  href: string;
  color: string;
  loading: boolean;
}) {
  return (
    <Link href={href} className="bg-white rounded-lg shadow overflow-hidden hover:shadow-md transition-shadow">
      <div className="p-5">
        <div className="flex items-center">
          <div className={`rounded-md p-3 ${color}`}>
            <div className="text-white">{icon}</div>
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-500">{title}</p>
            {loading ? (
              <div className="h-6 bg-gray-200 rounded w-16 mt-1 animate-pulse"></div>
            ) : (
              <>
                <p className="text-xl font-semibold text-gray-900">{value}</p>
                {subtitle && (
                  <p className="text-xs text-gray-500 mt-0.5">{subtitle}</p>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}