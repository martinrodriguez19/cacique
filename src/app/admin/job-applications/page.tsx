/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
'use client';

import { useState, useEffect } from 'react';
import { getJobApplications, deleteJobApplication, markJobApplicationAsRead, updateJobApplicationStatus } from './actions';
import toast from 'react-hot-toast';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

export default function JobApplicationsPage() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch job applications
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        let statusFilter;
        let readFilter;
        
        if (filter === 'unread') {
          readFilter = false;
        } else if (filter === 'pending') {
          statusFilter = 'pending';
        } else if (filter === 'reviewed') {
          statusFilter = 'reviewed';
        } else if (filter === 'contacted') {
          statusFilter = 'contacted';
        } else if (filter === 'rejected') {
          statusFilter = 'rejected';
        }
        
        const result = await getJobApplications(statusFilter, readFilter);
        if (result.success) {
          setApplications(result.data);
        } else {
          toast.error('Error al cargar aplicaciones');
        }
      } catch (error) {
        console.error('Error fetching job applications:', error);
        toast.error('Error al cargar aplicaciones');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [filter]);

  // Handle mark as read
  const handleMarkAsRead = async (id: string) => {
    try {
      const result = await markJobApplicationAsRead(id);
      if (result.success) {
        setApplications(
          applications.map((app: any) =>
            app._id === id ? { ...app, read: true } : app
          )
        );
        toast.success('Marcado como leído');
      } else {
        toast.error(result.error || 'Error al marcar como leído');
      }
    } catch (error) {
      console.error('Error marking job application as read:', error);
      toast.error('Error al marcar como leído');
    }
  };

  // Handle update status
  const handleUpdateStatus = async (id: string, status: string) => {
    try {
      const result = await updateJobApplicationStatus(id, status);
      if (result.success) {
        setApplications(
          applications.map((app: any) =>
            app._id === id ? { ...app, status } : app
          )
        );
        toast.success('Estado actualizado');
      } else {
        toast.error(result.error || 'Error al actualizar estado');
      }
    } catch (error) {
      console.error('Error updating job application status:', error);
      toast.error('Error al actualizar estado');
    }
  };

  // Handle delete application
  const handleDelete = async (id: string) => {
    try {
      const result = await deleteJobApplication(id);
      if (result.success) {
        toast.success('CV eliminado correctamente');
        setApplications(applications.filter((app: any) => app._id !== id));
        setConfirmDelete(null);
      } else {
        toast.error(result.error || 'Error al eliminar el CV');
      }
    } catch (error) {
      console.error('Error deleting job application:', error);
      toast.error('Error al eliminar el CV');
    }
  };

  // Filter applications by search term
  const filteredApplications = applications.filter((app: any) =>
    app.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.puesto.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (app.mensaje && app.mensaje.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Map experience values to readable labels
  const experienceLabels: {[key: string]: string} = {
    'sin-experiencia': 'Sin experiencia',
    '0-1': 'Menos de 1 año',
    '1-3': '1-3 años',
    '3-5': '3-5 años',
    '5+': 'Más de 5 años'
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 mt-20">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-800 mb-2">CVs Recibidos</h1>
        <p className="text-gray-600">
          Gestiona las solicitudes de trabajo y currículums recibidos.
        </p>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col md:flex-row justify-between mb-6">
        <div className="flex flex-wrap gap-2 mb-4 md:mb-0">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1 rounded-full text-sm ${
              filter === 'all'
                ? 'bg-[#e32929] text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Todos
          </button>
          <button
            onClick={() => setFilter('unread')}
            className={`px-3 py-1 rounded-full text-sm ${
              filter === 'unread'
                ? 'bg-[#e32929] text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            No leídos
          </button>
          <button
            onClick={() => setFilter('pending')}
            className={`px-3 py-1 rounded-full text-sm ${
              filter === 'pending'
                ? 'bg-[#e32929] text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Pendientes
          </button>
          <button
            onClick={() => setFilter('reviewed')}
            className={`px-3 py-1 rounded-full text-sm ${
              filter === 'reviewed'
                ? 'bg-[#e32929] text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Revisados
          </button>
          <button
            onClick={() => setFilter('contacted')}
            className={`px-3 py-1 rounded-full text-sm ${
              filter === 'contacted'
                ? 'bg-[#e32929] text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Contactados
          </button>
          <button
            onClick={() => setFilter('rejected')}
            className={`px-3 py-1 rounded-full text-sm ${
              filter === 'rejected'
                ? 'bg-[#e32929] text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Rechazados
          </button>
        </div>
        <div className="w-full md:w-auto">
          <input
            type="text"
            placeholder="Buscar aplicaciones..."
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#e32929] focus:border-[#e32929] outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Applications List */}
      {loading ? (
        <div className="animate-pulse space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-24 bg-gray-200 rounded-md"></div>
          ))}
        </div>
      ) : (
        <>
          {filteredApplications.length > 0 ? (
            <div className="space-y-4">
              {filteredApplications.map((app: any) => (
                <div
                  key={app._id}
                  className={`border rounded-md overflow-hidden ${
                    !app.read ? 'border-l-4 border-l-[#e32929]' : ''
                  }`}
                >
                  <div className="p-4">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800 flex flex-wrap items-center">
                          {app.nombre}
                          {!app.read && (
                            <span className="ml-2 px-2 py-0.5 bg-[#e32929] text-white text-xs rounded-full">
                              Nuevo
                            </span>
                          )}
                        </h3>
                        <div className="text-sm text-gray-500 mt-1">
                          <span className="mr-3">{app.email}</span>
                          <span>{app.telefono}</span>
                        </div>
                      </div>
                      <div className="mt-2 md:mt-0 text-sm text-gray-500 flex items-center">
                        <span className="mr-2">
                          {format(new Date(app.createdAt), "d 'de' MMMM, yyyy", { locale: es })}
                        </span>
                        <StatusBadge status={app.status} />
                      </div>
                    </div>
                    <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <span className="text-sm font-medium text-gray-600">Puesto:</span>{' '}
                        <span className="text-sm text-gray-700 capitalize">{app.puesto}</span>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-600">Experiencia:</span>{' '}
                        <span className="text-sm text-gray-700">
                          {experienceLabels[app.experiencia] || app.experiencia}
                        </span>
                      </div>
                    </div>
                    {app.mensaje && (
                      <div className="mt-2 text-gray-700">
                        <div className="text-sm font-medium text-gray-600 mb-1">Mensaje:</div>
                        <p className="text-sm">{app.mensaje}</p>
                      </div>
                    )}
                    {app.cvUrl && (
                      <div className="mt-4">
                        <a
                          href={app.cvUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center px-3 py-1.5 bg-gray-100 text-gray-700 rounded-md text-sm hover:bg-gray-200 transition-colors"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 mr-2"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                            />
                          </svg>
                          Ver CV
                        </a>
                      </div>
                    )}
                  </div>
                  <div className="bg-gray-50 px-4 py-3 flex flex-wrap gap-2 justify-between items-center">
                    <div className="flex flex-wrap gap-2">
                      {!app.read && (
                        <button
                          onClick={() => handleMarkAsRead(app._id)}
                          className="px-3 py-1 bg-blue-100 text-blue-700 rounded-md text-sm hover:bg-blue-200 transition-colors"
                        >
                          Marcar como leído
                        </button>
                      )}
                      <div className="relative group">
                        <button
                          className="px-3 py-1 bg-gray-100 text-gray-700 rounded-md text-sm hover:bg-gray-200 transition-colors flex items-center"
                        >
                          <span>Cambiar estado</span>
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
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        </button>
                        <div className="absolute left-0 mt-2 w-40 bg-white rounded-md shadow-lg z-10 hidden group-hover:block">
                          <div className="py-1">
                            <button
                              onClick={() => handleUpdateStatus(app._id, 'pending')}
                              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                              Pendiente
                            </button>
                            <button
                              onClick={() => handleUpdateStatus(app._id, 'reviewed')}
                              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                              Revisado
                            </button>
                            <button
                              onClick={() => handleUpdateStatus(app._id, 'contacted')}
                              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                              Contactado
                            </button>
                            <button
                              onClick={() => handleUpdateStatus(app._id, 'rejected')}
                              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                              Rechazado
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      {confirmDelete === app._id ? (
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleDelete(app._id)}
                            className="px-3 py-1 bg-red-500 text-white rounded-md text-sm hover:bg-red-600 transition-colors"
                          >
                            Confirmar
                          </button>
                          <button
                            onClick={() => setConfirmDelete(null)}
                            className="px-3 py-1 bg-gray-300 text-gray-700 rounded-md text-sm hover:bg-gray-400 transition-colors"
                          >
                            Cancelar
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setConfirmDelete(app._id)}
                          className="px-3 py-1 bg-red-100 text-red-700 rounded-md text-sm hover:bg-red-200 transition-colors"
                        >
                          Eliminar
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 mx-auto text-gray-400 mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No hay CVs recibidos</h3>
              <p className="text-gray-500 mb-6">
                {searchTerm
                  ? 'No hay aplicaciones que coincidan con tu búsqueda'
                  : filter !== 'all'
                  ? 'No hay aplicaciones con el filtro seleccionado'
                  : 'No se han recibido aplicaciones de trabajo todavía'}
              </p>
              {(searchTerm || filter !== 'all') && (
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setFilter('all');
                  }}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[#e32929] hover:bg-[#c81e1e]"
                >
                  Limpiar filtros
                </button>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  let bgColor = '';
  let textColor = '';
  let label = '';

  switch (status) {
    case 'pending':
      bgColor = 'bg-yellow-100';
      textColor = 'text-yellow-800';
      label = 'Pendiente';
      break;
    case 'reviewed':
      bgColor = 'bg-blue-100';
      textColor = 'text-blue-800';
      label = 'Revisado';
      break;
    case 'contacted':
      bgColor = 'bg-green-100';
      textColor = 'text-green-800';
      label = 'Contactado';
      break;
    case 'rejected':
      bgColor = 'bg-red-100';
      textColor = 'text-red-800';
      label = 'Rechazado';
      break;
    default:
      bgColor = 'bg-gray-100';
      textColor = 'text-gray-800';
      label = 'Desconocido';
  }

  return (
    <span className={`px-2 py-0.5 rounded-full text-xs ${bgColor} ${textColor}`}>
      {label}
    </span>
  );
}