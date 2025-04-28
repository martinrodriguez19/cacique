/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState, useCallback, useEffect } from 'react';
import Image from 'next/image';

interface ImageUploaderProps {
  images: string[];
  onChange: (urls: string[]) => void;
  multiple?: boolean;
  maxImages?: number;
}

// Declarar la variable global para el widget de Cloudinary
declare global {
  interface Window {
    cloudinary?: any;
    createUploadWidget?: any;
  }
}

export default function UnsignedImageUploader({ 
  images = [], 
  onChange, 
  multiple = true,
  maxImages = 10
}: ImageUploaderProps) {
  const [uploadedImages, setUploadedImages] = useState<string[]>(images);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [uploadWidget, setUploadWidget] = useState<any>(null);

  // Inicializar el widget de Cloudinary con un preset sin firma
  useEffect(() => {
    if (typeof window !== 'undefined' && !uploadWidget && window.cloudinary) {
      try {
        // Crear el widget usando un preset sin firma (unsigned)
        const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
        
        if (!cloudName) {
          console.error('NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME no está definido');
          setUploadError('Error de configuración: Cloud name no está definido');
          return;
        }
        
        // IMPORTANTE: Usa el nombre del preset que hayas creado en Cloudinary
        const widget = window.cloudinary.createUploadWidget(
          {
            cloudName,
            uploadPreset: 'el-cacique-preset', // DEBE ser un preset sin firma (unsigned)
            folder: 'el-cacique',
            multiple,
            maxFiles: maxImages - uploadedImages.length,
            showAdvancedOptions: false,
            cropping: false,
            sources: ['local', 'url', 'camera'],
            styles: {
              palette: {
                window: '#FFFFFF',
                windowBorder: '#90A0B3',
                tabIcon: '#0078FF',
                menuIcons: '#5A616A',
                textDark: '#000000',
                textLight: '#FFFFFF',
                link: '#e32929',
                action: '#e32929',
                inactiveTabIcon: '#0E2F5A',
                error: '#F44235',
                inProgress: '#0078FF',
                complete: '#20B832',
                sourceBg: '#F4F5F5'
              },
              fonts: {
                default: null,
                "'Inter', sans-serif": {
                  url: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap',
                  active: true
                }
              }
            }
          },
          (error: any, result: any) => {
            if (error) {
              console.error('Error en la carga de imagen:', error);
              
              // Mostrar un mensaje de error más descriptivo
              let errorMessage = 'Error al cargar la imagen.';
              
              if (error.message) {
                errorMessage += ` Detalle: ${error.message}`;
              } else if (typeof error === 'string') {
                errorMessage += ` Detalle: ${error}`;
              }
              
              setUploadError(errorMessage);
              setIsUploading(false);
              return;
            }
            
            if (!result) {
              console.error('No se recibió resultado de Cloudinary');
              setUploadError('Error: No se recibió respuesta del servidor de imágenes');
              setIsUploading(false);
              return;
            }
            
            console.log('Widget result event:', result.event);
            
            // Si el widget se cierra
            if (result.event === 'close') {
              setIsUploading(false);
              return;
            }
            
            // Si la carga fue exitosa
            if (result.event === 'success') {
              try {
                console.log('Upload success:', result.info);
                
                if (!result.info || !result.info.secure_url) {
                  throw new Error('La URL de la imagen no está disponible en la respuesta');
                }
                
                const imageUrl = result.info.secure_url;
                
                // Si no es múltiple, reemplazar todas las imágenes
                if (!multiple) {
                  const newImages = [imageUrl];
                  setUploadedImages(newImages);
                  onChange(newImages);
                } else {
                  // En modo múltiple, añadir a las existentes
                  if (uploadedImages.length < maxImages) {
                    const newImages = [...uploadedImages, imageUrl];
                    setUploadedImages(newImages);
                    onChange(newImages);
                  } else {
                    setUploadError(`Solo se permiten un máximo de ${maxImages} imágenes.`);
                  }
                }
              } catch (err) {
                console.error('Error al procesar la imagen cargada:', err);
                setUploadError('Error al procesar la imagen. Por favor intenta nuevamente.');
                setIsUploading(false);
              }
            }
          }
        );
        
        if (widget) {
          console.log('Widget initialized successfully');
          setUploadWidget(widget);
        } else {
          console.error('Widget initialization failed, widget object is undefined');
          setUploadError('Error al inicializar el cargador de imágenes');
        }
      } catch (error) {
        console.error('Error al inicializar el widget de Cloudinary:', error);
        setUploadError('Error al configurar el cargador de imágenes');
      }
    } else if (typeof window !== 'undefined' && !window.cloudinary) {
      setUploadError('Error: La biblioteca de Cloudinary no está cargada correctamente');
      console.error('Error: window.cloudinary is not defined');
    }
    
    // Limpiar el widget al desmontar
    return () => {
      if (uploadWidget) {
        try {
          uploadWidget.close();
        } catch (e) {
          console.error('Error al cerrar el widget:', e);
        }
      }
    };
  }, [multiple, maxImages, uploadedImages.length]);

  // Función para abrir el widget
  const openUploadWidget = useCallback(() => {
    if (uploadWidget) {
      setIsUploading(true);
      setUploadError('');
      
      try {
        uploadWidget.open();
      } catch (error) {
        console.error('Error al abrir el widget:', error);
        setUploadError('Error al abrir el cargador de imágenes');
        setIsUploading(false);
      }
    } else {
      setUploadError('El cargador de imágenes no está listo. Intente nuevamente en unos momentos.');
    }
  }, [uploadWidget]);

  // Función para eliminar una imagen
  const removeImage = (index: number) => {
    const newImages = [...uploadedImages];
    newImages.splice(index, 1);
    setUploadedImages(newImages);
    onChange(newImages);
  };

  // Función para reordenar imágenes (hacer principal)
  const makeMainImage = (index: number) => {
    if (index === 0) return; // Ya es la principal
    
    const newImages = [...uploadedImages];
    const image = newImages.splice(index, 1)[0];
    newImages.unshift(image);
    setUploadedImages(newImages);
    onChange(newImages);
  };

  useEffect(() => {
    // Actualizar las imágenes si cambian externamente
    if (JSON.stringify(images) !== JSON.stringify(uploadedImages)) {
      setUploadedImages(images);
    }
  }, [images]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4">
        {/* Mostrar las imágenes cargadas */}
        {uploadedImages.map((url, index) => (
          <div key={index} className="relative group">
            <div className="relative w-32 h-32 border rounded-md overflow-hidden">
              <Image
                src={url}
                alt={`Imagen ${index + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 128px"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://via.placeholder.com/150?text=Error';
                }}
              />
              {index === 0 && (
                <div className="absolute top-0 left-0 bg-yellow-500 text-white text-xs px-1 py-0.5">
                  Principal
                </div>
              )}
            </div>
            
            {/* Botones de acción sobre la imagen */}
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              {index !== 0 && (
                <button
                  type="button"
                  onClick={() => makeMainImage(index)}
                  className="p-1 bg-yellow-500 text-white rounded-full mr-2"
                  title="Hacer principal"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" clipRule="evenodd" />
                    <path fillRule="evenodd" d="M10 5a1 1 0 011 1v8a1 1 0 11-2 0V6a1 1 0 011-1z" clipRule="evenodd" />
                  </svg>
                </button>
              )}
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="p-1 bg-red-500 text-white rounded-full"
                title="Eliminar"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        ))}
        
        {/* Botón para cargar más imágenes */}
        {uploadedImages.length < maxImages && (
          <button
            type="button"
            onClick={openUploadWidget}
            disabled={isUploading}
            className={`w-32 h-32 border-2 border-dashed border-gray-300 rounded-md flex flex-col items-center justify-center text-gray-500 hover:text-gray-700 hover:border-gray-400 transition-colors ${
              isUploading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isUploading ? (
              <svg className="animate-spin h-6 w-6 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                <span className="text-xs">Agregar imagen</span>
              </>
            )}
          </button>
        )}
      </div>
      
      {/* Mensaje de error */}
      {uploadError && (
        <p className="text-sm text-red-500">{uploadError}</p>
      )}
      
      {/* Instrucciones */}
      <p className="text-xs text-gray-500">
        {multiple
          ? `Puedes subir hasta ${maxImages} imágenes. La primera imagen será la principal.`
          : 'Sube una imagen para representar este elemento.'}
      </p>
    </div>
  );
}