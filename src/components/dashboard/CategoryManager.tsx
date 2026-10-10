'use client';

import React, { useState } from 'react';
import { createCategory, deleteCategory } from '@/app/actions/admin';
import { Plus, Trash2, Box, Briefcase, Car, Home, Utensils, HeartPulse, Ticket, GraduationCap } from 'lucide-react';

const AVAILABLE_ICONS = [
  { name: 'Box', icon: <Box className="w-4 h-4" /> },
  { name: 'Briefcase', icon: <Briefcase className="w-4 h-4" /> },
  { name: 'Car', icon: <Car className="w-4 h-4" /> },
  { name: 'Home', icon: <Home className="w-4 h-4" /> },
  { name: 'Utensils', icon: <Utensils className="w-4 h-4" /> },
  { name: 'HeartPulse', icon: <HeartPulse className="w-4 h-4" /> },
  { name: 'Ticket', icon: <Ticket className="w-4 h-4" /> },
  { name: 'GraduationCap', icon: <GraduationCap className="w-4 h-4" /> },
];

export const CategoryManager = ({ categories }: { categories: any[] }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    const formData = new FormData(e.currentTarget);
    const result = await createCategory(formData);
    
    if (result.success) {
      (e.target as HTMLFormElement).reset();
    } else {
      setError(result.error || 'Error desconocido');
    }
    
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (confirm('¿Estás seguro de eliminar esta categoría?')) {
      const result = await deleteCategory(id);
      if (!result.success) {
        alert(result.error);
      }
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-purple-100 p-6 sm:p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-[#522B8B]">Gestión de Categorías</h2>
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
            <Plus className="w-4 h-4 text-[#008753]" /> Nueva Categoría
          </h3>
          <form onSubmit={handleCreate} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Nombre</label>
              <input name="name" required type="text" className="w-full px-4 py-2 rounded-xl border-gray-200 text-sm focus:ring-[#522B8B] focus:border-[#522B8B]" placeholder="Ej. Inmuebles" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">URL Slug</label>
              <input name="slug" required type="text" className="w-full px-4 py-2 rounded-xl border-gray-200 text-sm focus:ring-[#522B8B] focus:border-[#522B8B]" placeholder="ej-inmuebles" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Descripción</label>
              <textarea name="description" rows={2} className="w-full px-4 py-2 rounded-xl border-gray-200 text-sm focus:ring-[#522B8B] focus:border-[#522B8B]" placeholder="Breve descripción..."></textarea>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-2">Icono (Opcional)</label>
              <div className="flex flex-wrap gap-2">
                {AVAILABLE_ICONS.map(i => (
                  <label key={i.name} className="cursor-pointer">
                    <input type="radio" name="icon" value={i.name} className="peer sr-only" defaultChecked={i.name === 'Box'} />
                    <div className="p-2 bg-white border rounded-lg peer-checked:border-[#008753] peer-checked:bg-emerald-50 peer-checked:text-[#008753] text-gray-400 hover:bg-gray-50 transition">
                      {i.icon}
                    </div>
                  </label>
                ))}
              </div>
            </div>
            
            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-[#522B8B] text-white font-bold py-2.5 rounded-xl hover:bg-[#3D1E6B] transition disabled:opacity-50"
            >
              {loading ? 'Creando...' : 'Crear Categoría'}
            </button>
          </form>
        </div>

        {/* List of existing categories */}
        <div className="lg:col-span-2">
          <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Categoría</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Slug</th>
                  <th className="px-6 py-3 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Acciones</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {categories.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="px-6 py-8 text-center text-sm text-gray-500">
                      No hay categorías creadas todavía.
                    </td>
                  </tr>
                ) : (
                  categories.map((cat) => (
                    <tr key={cat.id} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 bg-purple-100 text-[#522B8B] rounded-xl flex items-center justify-center">
                            {AVAILABLE_ICONS.find(i => i.name === cat.icon)?.icon || <Box className="w-4 h-4" />}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-bold text-gray-900">{cat.name}</div>
                            <div className="text-xs text-gray-500 truncate max-w-[200px]">{cat.description}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-emerald-100 text-[#008753]">
                          /{cat.slug}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button 
                          onClick={() => handleDelete(cat.id)}
                          className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded-lg transition"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
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
