"use client";

import { useState, useEffect } from 'react';

interface SecurityModalProps {
  onAuthenticate: (authenticated: boolean) => void;
}

export default function SecurityModal({ onAuthenticate }: SecurityModalProps) {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [lockTimer, setLockTimer] = useState(0);

  // Código de seguridad - puedes cambiarlo por el que prefieras
  const SECURITY_CODE = 'cacique2025';
  const MAX_ATTEMPTS = 3;
  const LOCK_TIME = 30; // segundos

  useEffect(() => {
    // Verificar si ya está autenticado en sessionStorage
    const isAuthenticated = sessionStorage.getItem('adminAuthenticated') === 'true';
    if (isAuthenticated) {
      onAuthenticate(true);
    }
  }, [onAuthenticate]);

  useEffect(() => {
    // Contador para el tiempo de bloqueo
    let interval: NodeJS.Timeout;
    
    if (isLocked && lockTimer > 0) {
      interval = setInterval(() => {
        setLockTimer((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(interval);
            setIsLocked(false);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isLocked, lockTimer]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isLocked) return;

    if (code === SECURITY_CODE) {
      // Código correcto
      sessionStorage.setItem('adminAuthenticated', 'true');
      onAuthenticate(true);
      setError('');
    } else {
      // Código incorrecto
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);
      setError('Código incorrecto');

      if (newAttempts >= MAX_ATTEMPTS) {
        setIsLocked(true);
        setLockTimer(LOCK_TIME);
        setError(`Demasiados intentos. Bloqueado por ${LOCK_TIME} segundos.`);
      }
    }

    // Limpiar el campo después del intento
    setCode('');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Panel Administrativo</h2>
          <p className="text-gray-600 mt-2">
            Ingrese el código de seguridad para acceder
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="securityCode" className="block text-sm font-medium text-gray-700 mb-1">
              Código de Seguridad
            </label>
            <input
              type="password"
              id="securityCode"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#e32929] focus:border-transparent"
              placeholder="Ingrese el código"
              disabled={isLocked}
              autoFocus
            />
          </div>

          {error && (
            <div className="mb-4 text-sm text-red-600">
              {error}
            </div>
          )}

          {isLocked && (
            <div className="mb-4 text-sm text-orange-600">
              Intente nuevamente en {lockTimer} segundos
            </div>
          )}

          <button
            type="submit"
            disabled={isLocked || !code}
            className={`w-full py-2 px-4 rounded-md ${
              isLocked || !code
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-[#e32929] hover:bg-[#c81e1e] text-white'
            } transition-colors`}
          >
            Acceder
          </button>
        </form>
      </div>
    </div>
  );
}