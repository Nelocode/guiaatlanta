'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, RefreshCw } from 'lucide-react';

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Error cargando revista:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-6 text-center text-white">
      <div className="bg-gray-800 border border-gray-700 rounded-3xl p-8 max-w-lg w-full shadow-2xl">
        <h2 className="text-2xl font-bold mb-3 text-red-400">No se pudo cargar la revista</h2>
        <p className="text-gray-300 text-sm mb-6">
          {error?.message || 'Ocurrió un error inesperado al procesar este documento.'}
        </p>
        {error?.digest && (
          <p className="text-xs text-gray-500 font-mono mb-6">
            Código: {error.digest}
          </p>
        )}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => reset()}
            className="inline-flex items-center justify-center gap-2 bg-[#008753] hover:bg-emerald-600 px-5 py-2.5 rounded-xl font-bold text-sm transition"
          >
            <RefreshCw className="w-4 h-4" /> Reintentar
          </button>
          <Link
            href="/revistas"
            className="inline-flex items-center justify-center gap-2 bg-gray-700 hover:bg-gray-600 px-5 py-2.5 rounded-xl font-bold text-sm transition"
          >
            <ArrowLeft className="w-4 h-4" /> Ver Todas las Revistas
          </Link>
        </div>
      </div>
    </div>
  );
}
