'use client';

import React, { useState } from 'react';
import { uploadMagazine, toggleMagazineStatus, deleteMagazine } from '@/app/actions/magazines';
import { BookOpen, FileText, Image as ImageIcon, Trash2, Eye, EyeOff } from 'lucide-react';

export const MagazineManager = ({ magazines }: { magazines: any[] }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [progress, setProgress] = useState(0);
  
  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setProgress(0);
    
    const formElement = e.currentTarget;
    const formData = new FormData(formElement);
    
    const xhr = new XMLHttpRequest();
    
    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        const percentComplete = Math.round((event.loaded / event.total) * 100);
        setProgress(percentComplete);
      }
    };

    xhr.onload = () => {
      setLoading(false);
      if (xhr.status === 200) {
        formElement.reset();
        setProgress(0);
        window.location.reload(); // Quick way to refresh data
      } else {
        try {
          const res = JSON.parse(xhr.responseText);
          setError(res.error || 'Error desconocido al subir.');
        } catch {
          setError('Error al subir el archivo. Quizás es demasiado pesado.');
        }
      }
    };

    xhr.onerror = () => {
      setLoading(false);
      setError('Error de red al intentar subir el archivo.');
    };

    xhr.open('POST', '/api/upload/magazine', true);
    xhr.send(formData);
  };

  const handleToggle = async (id: string, status: boolean) => {
    await toggleMagazineStatus(id, status);
  };

  const handleDelete = async (id: string) => {
    if (confirm('¿Eliminar esta revista permanentemente? Esto no borrará los archivos físicos.')) {
      await deleteMagazine(id);
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-purple-100 p-6 sm:p-8 mt-10">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-[#522B8B]">Revistas Digitales</h2>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 text-sm font-semibold">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Form to add new */}
        <div className="lg:col-span-1 bg-purple-50/50 p-6 rounded-2xl border border-purple-100 h-fit">
          <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-[#008753]" /> Subir Revista (PDF)
          </h3>
          <form onSubmit={handleCreate} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Título de la Revista *</label>
              <input name="title" required type="text" className="w-full px-4 py-2 rounded-xl border-gray-200 text-sm focus:ring-[#522B8B] focus:border-[#522B8B]" placeholder="Ej. Edición Octubre 2026" />
            </div>
            
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1 flex items-center gap-1">
                <FileText className="w-3.5 h-3.5" /> Archivo PDF *
              </label>
              <input name="pdf" required type="file" accept="application/pdf" className="w-full px-4 py-2 bg-white rounded-xl border border-gray-200 text-sm focus:ring-[#522B8B] focus:border-[#522B8B] file:mr-4 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100" />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1 flex items-center gap-1">
                <ImageIcon className="w-3.5 h-3.5" /> Portada (Imagen opcional)
              </label>
              <input name="cover" type="file" accept="image/*" className="w-full px-4 py-2 bg-white rounded-xl border border-gray-200 text-sm focus:ring-[#522B8B] focus:border-[#522B8B] file:mr-4 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-emerald-50 file:text-[#008753] hover:file:bg-emerald-100" />
            </div>
            
            <div className="relative mt-4">
              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-[#008753] text-white font-bold py-2.5 rounded-xl hover:bg-emerald-700 transition disabled:opacity-50 relative overflow-hidden"
              >
                {loading && (
                  <div 
                    className="absolute top-0 left-0 h-full bg-emerald-800 transition-all duration-300" 
                    style={{ width: `${progress}%` }}
                  />
                )}
                <span className="relative z-10">
                  {loading ? `Subiendo... ${progress}%` : 'Publicar Revista'}
                </span>
              </button>
            </div>
          </form>
        </div>

        {/* List of existing magazines */}
        <div className="lg:col-span-2">
          <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Edición</th>
                  <th className="px-6 py-3 text-center text-xs font-bold text-gray-500 uppercase tracking-wider">Estado</th>
                  <th className="px-6 py-3 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Acciones</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {magazines.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="px-6 py-8 text-center text-sm text-gray-500">
                      No hay revistas subidas todavía.
                    </td>
                  </tr>
                ) : (
                  magazines.map((mag) => (
                    <tr key={mag.id} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-14 w-10 bg-gray-200 rounded-lg overflow-hidden border border-gray-100 shadow-sm">
                            {mag.coverUrl ? (
                              <img src={mag.coverUrl} alt={mag.title} className="w-full h-full object-cover" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center bg-purple-100 text-[#522B8B]">
                                <BookOpen className="w-4 h-4" />
                              </div>
                            )}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-bold text-gray-900">{mag.title}</div>
                            <div className="text-xs text-gray-500">{new Date(mag.publishedDate).toLocaleDateString()}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <span className={`px-3 py-1 inline-flex text-xs leading-5 font-bold rounded-full ${mag.isActive ? 'bg-emerald-100 text-[#008753]' : 'bg-gray-100 text-gray-500'}`}>
                          {mag.isActive ? 'Pública' : 'Oculta'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end gap-2">
                          <button 
                            onClick={() => handleToggle(mag.id, mag.isActive)}
                            className="text-gray-500 hover:text-[#522B8B] p-2 hover:bg-purple-50 rounded-lg transition"
                            title={mag.isActive ? 'Ocultar al público' : 'Mostrar al público'}
                          >
                            {mag.isActive ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                          <a 
                            href={`/revistas/${mag.id}`}
                            target="_blank"
                            className="text-blue-500 hover:text-blue-700 p-2 hover:bg-blue-50 rounded-lg transition"
                            title="Ver visor 3D"
                          >
                            <BookOpen className="w-4 h-4" />
                          </a>
                          <button 
                            onClick={() => handleDelete(mag.id)}
                            className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded-lg transition"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
