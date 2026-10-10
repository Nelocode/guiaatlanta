'use client';

import React from 'react';
import { Tag, MapPin, Eye, Edit, Trash2 } from 'lucide-react';

export const UserListings = ({ listings }: { listings: any[] }) => {
  return (
    <div className="bg-white rounded-3xl shadow-sm border border-purple-100 p-6 sm:p-8">
      <h2 className="text-2xl font-bold text-[#522B8B] mb-6">Mis Anuncios</h2>

      {listings.length === 0 ? (
        <div className="text-center py-10 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
          <p className="text-gray-500">Aún no has publicado ningún anuncio.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {listings.map(listing => (
            <div key={listing.id} className="flex flex-col md:flex-row items-center gap-4 p-4 border border-gray-100 rounded-2xl hover:bg-gray-50 transition">
              
              <div className="w-full md:w-32 h-24 bg-gray-200 rounded-xl overflow-hidden shrink-0">
                <img src={listing.images?.[0] || 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=200'} alt={listing.title} className="w-full h-full object-cover" />
              </div>
              
              <div className="flex-1 w-full">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-bold text-gray-900">{listing.title}</h3>
                    <p className="text-sm text-gray-500 line-clamp-1">{listing.description}</p>
                  </div>
                  <span className={`px-2 py-1 text-xs font-bold rounded-lg ${listing.status === 'active' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                    {listing.status === 'active' ? 'Activo' : 'Pausado'}
                  </span>
                </div>
                
                <div className="flex items-center gap-4 mt-3 text-xs text-gray-500">
                  <span className="flex items-center gap-1 font-semibold text-[#522B8B]"><Tag className="w-3.5 h-3.5" /> {listing.price ? `$${listing.price}` : 'A convenir'}</span>
                  <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {listing.locationText}</span>
                  <span className="flex items-center gap-1 text-emerald-600 font-bold ml-auto">{listing.isFeatured && '⭐ Destacado'}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 w-full md:w-auto mt-4 md:mt-0 pt-4 md:pt-0 border-t md:border-t-0 border-gray-100">
                <button className="flex-1 md:flex-none p-2 text-gray-500 hover:text-[#522B8B] hover:bg-purple-50 rounded-lg transition" title="Ver"><Eye className="w-4 h-4 mx-auto" /></button>
                <button className="flex-1 md:flex-none p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition" title="Editar"><Edit className="w-4 h-4 mx-auto" /></button>
                <button className="flex-1 md:flex-none p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition" title="Eliminar"><Trash2 className="w-4 h-4 mx-auto" /></button>
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
};
