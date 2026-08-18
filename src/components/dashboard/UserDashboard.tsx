'use client';

import React from 'react';
import { useApp } from '@/lib/context/AppContext';
import { ListingCard } from '../listings/ListingCard';
import { User as UserIcon, Heart, Star, Building2, ShieldCheck, Mail, Phone, Calendar } from 'lucide-react';

export const UserDashboard: React.FC = () => {
  const { currentUser, listings, reviews, claims, setViewMode } = useApp();

  const savedListings = listings.filter(l => currentUser.savedListingIds.includes(l.id));
  const myReviews = reviews.filter(r => r.userName === currentUser.name);
  const myClaims = claims.filter(c => c.userId === currentUser.id);

  return (
    <div className="py-10 bg-[#FAF8FC] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* User Header Profile Card */}
        <div className="bg-white p-8 rounded-3xl border border-purple-100 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            {currentUser.avatar ? (
              <img src={currentUser.avatar} alt={currentUser.name} className="w-20 h-20 rounded-full object-cover border-4 border-purple-100 shadow" />
            ) : (
              <div className="w-20 h-20 rounded-full bg-[#522B8B] text-white text-2xl font-black flex items-center justify-center border-4 border-purple-100">
                {currentUser.name[0]}
              </div>
            )}

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-black text-gray-900">{currentUser.name}</h1>
                <span className="bg-emerald-100 text-[#008753] text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase">
                  {currentUser.role}
                </span>
              </div>
              <p className="text-xs text-gray-500 flex items-center gap-3">
                <span className="flex items-center gap-1"><Mail className="w-3.5 h-3.5 text-[#522B8B]" /> {currentUser.email}</span>
                <span className="flex items-center gap-1"><Phone className="w-3.5 h-3.5 text-[#008753]" /> {currentUser.phone || 'No registrado'}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setViewMode('public')}
              className="bg-[#522B8B] text-white font-bold text-xs px-5 py-3 rounded-xl shadow hover:bg-[#3D1E6B] transition"
            >
              Explorar Directorio
            </button>
          </div>
        </div>

        {/* Section Tabs / Grid */}
        <div className="space-y-8">
          
          {/* Saved Listings Collection */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
              <h2 className="text-xl font-black text-gray-900">Mis Comercios Guardados ({savedListings.length})</h2>
            </div>

            {savedListings.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {savedListings.map(listing => (
                  <ListingCard key={listing.id} listing={listing} />
                ))}
              </div>
            ) : (
              <div className="bg-white p-8 rounded-3xl border border-purple-100 text-center space-y-3">
                <p className="text-sm font-bold text-gray-700">Aún no has guardado comercios favoritos</p>
                <p className="text-xs text-gray-400">Haz clic en el ícono de corazón en cualquier ficha de negocio para guardarlo aquí.</p>
              </div>
            )}
          </div>

          {/* User Submitted Reviews */}
          <div className="space-y-4 pt-6 border-t border-purple-100">
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-amber-500 fill-amber-400" />
              <h2 className="text-xl font-black text-gray-900">Mis Opiniones & Reseñas Publicadas ({myReviews.length})</h2>
            </div>

            {myReviews.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {myReviews.map(r => (
                  <div key={r.id} className="bg-white p-5 rounded-2xl border border-purple-100 space-y-2 shadow-sm">
                    <div className="flex items-center justify-between font-bold text-xs text-gray-800">
                      <span>Reseña de Comercio</span>
                      <span className="text-amber-500">{r.rating} ★</span>
                    </div>
                    <p className="text-xs text-gray-600">"{r.comment}"</p>
                    <p className="text-[10px] text-gray-400">{r.date}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white p-8 rounded-3xl border border-purple-100 text-center text-xs text-gray-400">
                Aún no has escrito reseñas en los negocios de Atlanta.
              </div>
            )}
          </div>

          {/* User Business Claim Requests */}
          {myClaims.length > 0 && (
            <div className="space-y-4 pt-6 border-t border-purple-100">
              <div className="flex items-center gap-2">
                <Building2 className="w-5 h-5 text-[#008753]" />
                <h2 className="text-xl font-black text-gray-900">Mis Solicitudes de Reclamo de Negocio</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {myClaims.map(c => (
                  <div key={c.id} className="bg-white p-5 rounded-2xl border border-purple-100 flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-gray-900">{c.listingTitle}</h4>
                      <p className="text-xs text-gray-500">Rol: {c.businessRole}</p>
                    </div>

                    <span className={`text-xs font-bold px-3 py-1 rounded-full uppercase ${
                      c.status === 'approved' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {c.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
