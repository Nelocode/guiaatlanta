'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/context/AppContext';
import { 
  Store, 
  Eye, 
  MousePointerClick, 
  Phone, 
  MessageCircle, 
  Star, 
  Crown, 
  ShieldCheck, 
  Edit3, 
  Save, 
  TrendingUp, 
  Sparkles,
  ArrowUpRight
} from 'lucide-react';

export const MerchantDashboard: React.FC = () => {
  const { listings, reviews, currentUser, updateListingPlan, setActiveListingId } = useApp();

  // Selected merchant listing (default to first or user's owned)
  const myListing = listings.find(l => l.ownerId === currentUser.id) || listings[0];

  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(myListing?.title || '');
  const [editedTagline, setEditedTagline] = useState(myListing?.tagline || '');
  const [editedPhone, setEditedPhone] = useState(myListing?.phone || '');
  const [editedAddress, setEditedAddress] = useState(myListing?.address || '');

  if (!myListing) {
    return (
      <div className="py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold">No tienes comercios registrados aún</h2>
        <p className="text-xs text-gray-500">Publica tu negocio para acceder a tu panel administrativo.</p>
      </div>
    );
  }

  const myReviews = reviews.filter(r => r.listingId === myListing.id);

  return (
    <div className="py-10 bg-[#FAF8FC] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Top Header Card */}
        <div className="bg-gradient-to-r from-[#008753] to-emerald-800 text-white p-8 rounded-3xl shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              <Store className="w-4 h-4" /> Panel de Comercio de Atlanta
            </div>
            <h1 className="text-3xl font-black">{myListing.title}</h1>
            <p className="text-xs text-emerald-100 flex items-center gap-2 font-medium">
              <span>{myListing.categoryName}</span> • <span>{myListing.zoneName}</span>
              {myListing.isVerified && (
                <span className="bg-white text-[#008753] font-bold px-2 py-0.5 rounded-md text-[10px] flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" /> Comercio Verificado
                </span>
              )}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveListingId(myListing.id)}
              className="bg-white text-[#008753] font-bold text-xs px-4 py-3 rounded-2xl shadow hover:bg-emerald-50 transition flex items-center gap-1.5"
            >
              <span>Ver Ficha Pública</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Analytics Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-purple-100 shadow-sm space-y-2">
            <div className="flex items-center justify-between text-xs text-gray-500 font-semibold">
              <span>Visualizaciones Ficha</span>
              <Eye className="w-4 h-4 text-[#522B8B]" />
            </div>
            <p className="text-3xl font-black text-gray-900">{myListing.metrics.views}</p>
            <p className="text-xs text-[#008753] font-bold flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" /> +18% este mes
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-purple-100 shadow-sm space-y-2">
            <div className="flex items-center justify-between text-xs text-gray-500 font-semibold">
              <span>Clics a WhatsApp</span>
              <MessageCircle className="w-4 h-4 text-[#008753]" />
            </div>
            <p className="text-3xl font-black text-gray-900">{myListing.metrics.clicks}</p>
            <p className="text-xs text-gray-500 font-medium">Clientes potenciales</p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-purple-100 shadow-sm space-y-2">
            <div className="flex items-center justify-between text-xs text-gray-500 font-semibold">
              <span>Llamadas Directas</span>
              <Phone className="w-4 h-4 text-[#522B8B]" />
            </div>
            <p className="text-3xl font-black text-gray-900">{myListing.metrics.calls}</p>
            <p className="text-xs text-gray-500 font-medium">Contacto directo</p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-purple-100 shadow-sm space-y-2">
            <div className="flex items-center justify-between text-xs text-gray-500 font-semibold">
              <span>Calificación Promedio</span>
              <Star className="w-4 h-4 text-amber-500" />
            </div>
            <p className="text-3xl font-black text-amber-500">{myListing.rating}</p>
            <p className="text-xs text-gray-500 font-medium">({myListing.reviewCount} opiniones de clientes)</p>
          </div>
        </div>

        {/* Section: Edit Profile & Plan Upgrade */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Business Profile Management Left Column */}
          <div className="lg:col-span-7 bg-white p-8 rounded-3xl border border-purple-100 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <h2 className="text-xl font-black text-gray-900">Información de tu Perfil Comercial</h2>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="text-xs font-bold text-[#522B8B] bg-purple-50 hover:bg-purple-100 px-3.5 py-2 rounded-xl transition flex items-center gap-1.5"
              >
                {isEditing ? <Save className="w-4 h-4 text-[#008753]" /> : <Edit3 className="w-4 h-4" />}
                <span>{isEditing ? 'Guardar Cambios' : 'Editar Datos'}</span>
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-gray-700 mb-1">Nombre Comercial</label>
                <input
                  type="text"
                  value={editedTitle}
                  disabled={!isEditing}
                  onChange={(e) => setEditedTitle(e.target.value)}
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl font-semibold text-gray-900 disabled:opacity-70"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Eslogan</label>
                <input
                  type="text"
                  value={editedTagline}
                  disabled={!isEditing}
                  onChange={(e) => setEditedTagline(e.target.value)}
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 disabled:opacity-70"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Teléfono</label>
                  <input
                    type="text"
                    value={editedPhone}
                    disabled={!isEditing}
                    onChange={(e) => setEditedPhone(e.target.value)}
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 disabled:opacity-70"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">Dirección</label>
                  <input
                    type="text"
                    value={editedAddress}
                    disabled={!isEditing}
                    onChange={(e) => setEditedAddress(e.target.value)}
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 disabled:opacity-70"
                  />
                </div>
              </div>

              {/* Cover Image Preview */}
              <div>
                <label className="block font-bold text-gray-700 mb-2">Foto de Portada Actual</label>
                <img src={myListing.coverImage} alt="" className="w-full h-44 object-cover rounded-2xl border border-gray-200" />
              </div>
            </div>
          </div>

          {/* Plan Upgrade & Subscription Box Right Column */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="bg-[#2D164D] text-white p-8 rounded-3xl shadow-xl space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold uppercase tracking-wider text-amber-300 flex items-center gap-1">
                  <Crown className="w-4 h-4" /> Plan Activo
                </span>
                <span className="bg-[#008753] text-white font-black text-xs px-3 py-1 rounded-full uppercase">
                  {myListing.plan}
                </span>
              </div>

              <div>
                <h3 className="text-2xl font-black">Membresía {myListing.plan.toUpperCase()}</h3>
                <p className="text-xs text-purple-200 mt-1">
                  Tu comercio disfruta de prioridad de búsqueda y badge de verificación oficial en Atlanta.
                </p>
              </div>

              <div className="pt-4 border-t border-purple-800 space-y-3">
                <p className="text-xs font-bold text-purple-300">Cambiar Nivel de Membresía:</p>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => updateListingPlan(myListing.id, 'pro')}
                    className={`py-2.5 px-3 rounded-xl font-bold text-xs border transition ${
                      myListing.plan === 'pro' ? 'bg-[#008753] border-[#008753] text-white' : 'bg-white/10 border-white/20 text-white'
                    }`}
                  >
                    Activar Pro ($49/mes)
                  </button>

                  <button
                    onClick={() => updateListingPlan(myListing.id, 'vip')}
                    className={`py-2.5 px-3 rounded-xl font-bold text-xs border transition ${
                      myListing.plan === 'vip' ? 'bg-amber-500 border-amber-500 text-purple-950 font-black' : 'bg-white/10 border-white/20 text-white'
                    }`}
                  >
                    Activar VIP ($99/mes)
                  </button>
                </div>
              </div>
            </div>

            {/* Customer Reviews Management Box */}
            <div className="bg-white p-6 rounded-3xl border border-purple-100 shadow-sm space-y-4">
              <h3 className="text-base font-bold text-gray-900">Opiniones de tus Clientes</h3>
              <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
                {myReviews.length > 0 ? (
                  myReviews.map(r => (
                    <div key={r.id} className="p-3 bg-purple-50/50 rounded-2xl border border-purple-100 text-xs space-y-1">
                      <div className="flex items-center justify-between font-bold text-gray-800">
                        <span>{r.userName}</span>
                        <span className="text-amber-500">{r.rating} ★</span>
                      </div>
                      <p className="text-gray-600 italic">"{r.comment}"</p>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-gray-400">Sin reseñas por el momento.</p>
                )}
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
