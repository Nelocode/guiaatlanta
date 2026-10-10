'use client';

import React, { useState } from 'react';
import { createListing } from '@/app/actions/listings';
import { Plus, Tag, MapPin, MessageCircle, Phone } from 'lucide-react';

export const AddListingForm = ({ categories }: { categories: any[] }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    const formData = new FormData(e.currentTarget);
    const result = await createListing(formData);

    if (result.success) {
      setSuccess(true);
      (e.target as HTMLFormElement).reset();
    } else {
      setError(result.error || 'Error al guardar el anuncio.');
    }
    setLoading(false);
  };

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-purple-100 p-6 sm:p-8">
      <h2 className="text-2xl font-bold text-[#522B8B] mb-6 flex items-center gap-2">
        <Plus className="w-5 h-5 text-[#008753]" /> Publicar Nuevo Anuncio
      </h2>

      {error && <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 text-sm">{error}</div>}
      {success && <div className="bg-emerald-50 text-emerald-700 p-4 rounded-xl mb-6 text-sm">¡Tu anuncio se ha publicado con éxito!</div>}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-1">Título del Anuncio *</label>
            <input required name="title" type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-[#522B8B] focus:border-[#522B8B]" placeholder="Ej. Toyota Corolla 2018 o Servicio de Plomería" />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Categoría *</label>
            <select required name="categoryId" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-[#522B8B]">
              <option value="">Selecciona una categoría...</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Precio ($)</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Tag className="h-4 w-4 text-gray-400" />
              </div>
              <input name="price" type="number" step="0.01" className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-[#522B8B]" placeholder="Dejar en blanco si es 'a convenir'" />
            </div>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-1">Descripción</label>
            <textarea name="description" rows={4} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-[#522B8B]" placeholder="Describe los detalles..."></textarea>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Condición</label>
            <select name="condition" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-[#522B8B]">
              <option value="new">Nuevo</option>
              <option value="used">Usado</option>
              <option value="na">No aplica (Servicios)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Ubicación</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MapPin className="h-4 w-4 text-gray-400" />
              </div>
              <input name="locationText" type="text" className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-[#522B8B]" placeholder="Ej. Lawrenceville, GA" />
            </div>
          </div>

          <h3 className="md:col-span-2 text-lg font-bold text-gray-900 border-b pb-2 mt-4">Contacto</h3>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">WhatsApp</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MessageCircle className="h-4 w-4 text-emerald-500" />
              </div>
              <input name="contactWhatsapp" type="tel" className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-[#522B8B]" placeholder="+1 (404) 123-4567" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Teléfono</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Phone className="h-4 w-4 text-gray-400" />
              </div>
              <input name="contactPhone" type="tel" className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-[#522B8B]" placeholder="+1 (404) 123-4567" />
            </div>
          </div>

        </div>

        <button 
          type="submit" 
          disabled={loading}
          className="w-full md:w-auto px-8 bg-[#522B8B] text-white font-bold py-3 rounded-xl hover:bg-[#3D1E6B] transition disabled:opacity-50"
        >
          {loading ? 'Publicando...' : 'Publicar Anuncio'}
        </button>
      </form>
    </div>
  );
};
