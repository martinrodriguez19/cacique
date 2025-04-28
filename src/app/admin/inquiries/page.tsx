'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getContacts, deleteContact, markContactAsRead, updateContactStatus } from './actions';
import toast from 'react-hot-toast';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

export default function InquiriesPage() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch contacts
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
        } else if (filter === 'inProgress') {
          statusFilter = 'inProgress';
        } else if (filter === 'completed') {
          statusFilter = 'completed';
        }
        
        const result = await getContacts(statusFilter, readFilter);
        if (result.success) {
          setContacts(result.data);
        } else {
          toast.error('Error al cargar consultas');
        }
      } catch (error) {
        console.error('Error fetching contacts:', error);
        toast.error('Error al cargar consultas');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [filter]);

  // Handle mark as read
  const handleMarkAsRead = async (id: string) => {
    try {
      const result = await markContactAsRead(id);
      if (result.success) {
        setContacts(
          contacts.map((contact: any) =>
            contact._id === id ? { ...contact, read: true } : contact
          )
        );
        toast.success('Marcado como leído');
      } else {
        toast.error(result.error || 'Error al marcar como leído');
      }
    } catch (error) {
      console.error('Error marking contact as read:', error);
      toast.error('Error al marcar como leído');
    }
  };

  // Handle update status
  const handleUpdateStatus = async (id: string, status: string) => {
    try {
      const result = await updateContactStatus(id, status);
      if (result.success) {
        setContacts(
          contacts.map((contact: any) =>
            contact._id === id ? { ...contact, status } : contact
          )
        );
        toast.success('Estado actualizado');
      } else {
        toast.error(result.error || 'Error al actualizar estado');
      }
    } catch (error) {
      console.error('Error updating contact status:', error);
      toast.error('Error al actualizar estado');
    }
  };

  // Handle delete contact
  const handleDelete = async (id: string) => {
    try {
      const result = await deleteContact(id);
      if (result.success) {
        toast.success('Consulta eliminada correctamente');
        setContacts(contacts.filter((contact: any) => contact._id !== id));
        setConfirmDelete(null);
      } else {
        toast.error(result.error || 'Error al eliminar la consulta');
      }
    } catch (error) {
      console.error('Error deleting contact:', error);
      toast.error('Error al eliminar la consulta');
    }
  };

  // Filter contacts by search term
  const filteredContacts = contacts.filter((contact: any) =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.message.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white rounded-lg shadow p-6 mt-20">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-800 mb-2">Gestión de Consultas</h1>
        <p className="text-gray-600">
          Administra las consultas y solicitudes de presupuestos enviadas por los clientes.
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
            Todas
          </button>
          <button
            onClick={() => setFilter('unread')}
            className={`px-3 py-1 rounded-full text-sm ${
              filter === 'unread'
                ? 'bg-[#e32929] text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            No leídas
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
            onClick={() => setFilter('inProgress')}
            className={`px-3 py-1 rounded-full text-sm ${
              filter === 'inProgress'
                ? 'bg-[#e32929] text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            En progreso
          </button>
          <button
            onClick={() => setFilter('completed')}
            className={`px-3 py-1 rounded-full text-sm ${
              filter === 'completed'
                ? 'bg-[#e32929] text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Completadas
          </button>
        </div>
        <div className="w-full md:w-auto">
          <input
            type="text"
            placeholder="Buscar consultas..."
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#e32929] focus:border-[#e32929] outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Contacts List */}
      {loading ? (
        <div className="animate-pulse space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-24 bg-gray-200 rounded-md"></div>
          ))}
        </div>
      ) : (
        <>
          {filteredContacts.length > 0 ? (
            <div className="space-y-4">
              {filteredContacts.map((contact: any) => (
                <div
                  key={contact._id}
                  className={`border rounded-md overflow-hidden ${
                    !contact.read ? 'border-l-4 border-l-[#e32929]' : ''
                  }`}
                >
                  <div className="p-4">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800 flex flex-wrap items-center">
                          {contact.name}
                          {!contact.read && (
                            <span className="ml-2 px-2 py-0.5 bg-[#e32929] text-white text-xs rounded-full">
                              Nuevo
                            </span>
                          )}
                        </h3>
                        <div className="text-sm text-gray-500 mt-1">
                          <span className="mr-3">{contact.email}</span>
                          <span>{contact.phone}</span>
                        </div>
                      </div>
                      <div className="mt-2 md:mt-0 text-sm text-gray-500 flex items-center">
                        <span className="mr-2">
                          {format(new Date(contact.createdAt), "d 'de' MMMM, yyyy", { locale: es })}
                        </span>
                        <StatusBadge status={contact.status} />
                      </div>
                    </div>
                    <div className="mt-2 text-gray-700">{contact.message}</div>
                    {contact.project && (
                      <div className="mt-2 text-gray-600">
                        <span className="font-medium">Tipo de proyecto:</span> {contact.project}
                      </div>
                    )}
                  </div>
                  <div className="bg-gray-50 px-4 py-3 flex flex-wrap gap-2 justify-between items-center">
                    <div className="flex flex-wrap gap-2">
                      {!contact.read && (
                        <button
                          onClick={() => handleMarkAsRead(contact._id)}
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
                              onClick={() => handleUpdateStatus(contact._id, 'pending')}
                              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                              Pendiente
                            </button>
                            <button
                              onClick={() => handleUpdateStatus(contact._id, 'inProgress')}
                              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                              En progreso
                            </button>
                            <button
                              onClick={() => handleUpdateStatus(contact._id, 'completed')}
                              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                              Completada
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      {confirmDelete === contact._id ? (
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleDelete(contact._id)}
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
                          onClick={() => setConfirmDelete(contact._id)}
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
                  d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                />
              </svg>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No hay consultas</h3>
              <p className="text-gray-500 mb-6">
                {searchTerm
                  ? 'No hay consultas que coincidan con tu búsqueda'
                  : filter !== 'all'
                  ? 'No hay consultas con el filtro seleccionado'
                  : 'No se han recibido consultas todavía'}
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
    case 'inProgress':
      bgColor = 'bg-blue-100';
      textColor = 'text-blue-800';
      label = 'En progreso';
      break;
    case 'completed':
      bgColor = 'bg-green-100';
      textColor = 'text-green-800';
      label = 'Completada';
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