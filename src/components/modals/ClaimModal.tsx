'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/context/AppContext';
import { X, Building2, CheckCircle, ShieldCheck, Send } from 'lucide-react';

export const ClaimModal: React.FC = () => {
  const { 
    isClaimModalOpen, 
    setIsClaimModalOpen, 
    activeListingId, 
    listings, 
    submitClaimRequest 
  } = useApp();

  const [role, setRole] = useState('Propietario');
  const [phone, setPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isClaimModalOpen || !activeListingId) return null;

  const listing = listings.find(l => l.id === activeListingId);
  if (!listing) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone) return;

    submitClaimRequest(listing.id, listing.title, role, phone);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setIsClaimModalOpen(false);
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-md w-full p-8 shadow-2xl border border-purple-100 relative text-gray-900 animate-scale-up">
        
        <button
          onClick={() => setIsClaimModalOpen(false)}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 rounded-full"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-2 mb-6 border-b border-gray-100 pb-4">
          <div className="inline-flex items-center gap-2 bg-purple-100 text-[#522B8B] text-xs font-bold px-3 py-1 rounded-full">
            <Building2 className="w-3.5 h-3.5 text-[#008753]" /> Reclamo de Propiedad
          </div>
          <h2 className="text-xl font-black text-gray-900">Reclamar {listing.title}</h2>
          <p className="text-xs text-gray-500">
            Verifica tu identidad como responsable legal para tomar control del perfil comercial.
          </p>
        </div>

        {submitted ? (
          <div className="py-8 text-center space-y-3">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-[#008753] flex items-center justify-center mx-auto">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">¡Solicitud de Reclamo Enviada!</h3>
            <p className="text-xs text-gray-500">
              Nuestro equipo verificará tu vínculo comercial y te contactará en menos de 24 horas.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Tu Relación con el Comercio</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#008753]"
              >
                <option value="Propietario">Propietario / Fundador</option>
                <option value="Gerente General">Gerente General</option>
                <option value="Encargado de Marketing">Encargado de Marketing / Representante</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Teléfono Directo de Verificación *</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+1 (404) 555-0199"
                required
                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#008753]"
              />
            </div>

            <div className="bg-purple-50/70 p-3.5 rounded-xl border border-purple-100 text-xs text-purple-900 space-y-1">
              <p className="font-bold flex items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-[#008753]" /> Proceso de Aprobación
              </p>
              <p className="text-[11px] text-purple-700 leading-relaxed">
                Revisaremos la información proporcionada y realizaremos una breve llamada de confirmación para otorgarte los permisos administrativos.
              </p>
            </div>

            <button
              type="submit"
              className="w-full bg-[#522B8B] hover:bg-[#3D1E6B] text-white font-extrabold text-xs py-3.5 px-4 rounded-xl shadow-lg transition flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>Enviar Solicitud de Reclamo</span>
            </button>
          </form>
        )}

      </div>
    </div>
  );
};
