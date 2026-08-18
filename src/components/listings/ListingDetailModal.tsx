'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/context/AppContext';
import { 
  X, 
  Star, 
  MapPin, 
  Phone, 
  MessageCircle, 
  Globe, 
  Mail, 
  Clock, 
  ShieldCheck, 
  Crown, 
  CheckCircle2, 
  Heart, 
  Share2, 
  AlertCircle,
  Send,
  Building2
} from 'lucide-react';

export const ListingDetailModal: React.FC = () => {
  const { 
    listings, 
    reviews, 
    activeListingId, 
    setActiveListingId, 
    currentUser, 
    toggleFavorite, 
    submitReview,
    setIsClaimModalOpen
  } = useApp();

  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState('');
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  if (!activeListingId) return null;

  const listing = listings.find(l => l.id === activeListingId);
  if (!listing) return null;

  const isFavorite = currentUser.savedListingIds.includes(listing.id);
  const listingReviews = reviews.filter(r => r.listingId === listing.id);

  const handleReviewFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    submitReview(listing.id, newRating, newComment);
    setNewComment('');
    setReviewSubmitted(true);
    setTimeout(() => setReviewSubmitted(false), 4000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fade-in">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-purple-100 relative text-gray-900">
        
        {/* Close Button */}
        <button
          onClick={() => setActiveListingId(null)}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/80 backdrop-blur-md text-gray-700 hover:bg-white flex items-center justify-center shadow-lg transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Hero Banner */}
        <div className="relative h-72 sm:h-96 w-full">
          <img
            src={listing.coverImage}
            alt={listing.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

          {/* Badges Overlay */}
          <div className="absolute top-6 left-6 flex flex-wrap gap-2">
            {listing.plan === 'vip' && (
              <span className="bg-amber-400 text-purple-950 text-xs font-black px-3.5 py-1.5 rounded-full shadow flex items-center gap-1 uppercase tracking-wider">
                <Crown className="w-4 h-4 fill-purple-950" /> VIP Premier
              </span>
            )}
            {listing.isVerified && (
              <span className="bg-[#008753] text-white text-xs font-bold px-3.5 py-1.5 rounded-full shadow flex items-center gap-1">
                <ShieldCheck className="w-4 h-4" /> Comercio Verificado
              </span>
            )}
            <span className="bg-white/20 backdrop-blur-md text-white text-xs font-bold px-3.5 py-1.5 rounded-full border border-white/30">
              {listing.categoryName}
            </span>
          </div>

          {/* Title & Location Overlay Bottom */}
          <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
            <div className="flex items-center gap-2 text-amber-300 font-bold text-sm">
              <div className="flex items-center gap-1 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-lg">
                <Star className="w-4 h-4 fill-amber-400" />
                <span>{listing.rating}</span>
                <span className="text-gray-300 font-normal">({listing.reviewCount} reseñas)</span>
              </div>
              <span className="text-white">•</span>
              <span>{listing.priceRange}</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black">{listing.title}</h1>
            <p className="text-xs sm:text-sm text-gray-200 flex items-center gap-1.5 font-medium">
              <MapPin className="w-4 h-4 text-[#008753]" /> {listing.address}, {listing.city}, GA {listing.zipCode} ({listing.zoneName})
            </p>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Info Left Column */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Tagline & Description */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#008753]">Sobre el Comercio</h3>
              <h2 className="text-xl font-bold text-gray-900">{listing.tagline}</h2>
              <p className="text-sm text-gray-600 leading-relaxed font-normal">
                {listing.description}
              </p>
            </div>

            {/* Amenities Grid */}
            <div className="space-y-3 pt-4 border-t border-gray-100">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#522B8B]">Servicios & Amenidades</h3>
              <div className="grid grid-cols-2 gap-2.5">
                {listing.amenities.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-gray-700 font-semibold bg-purple-50/60 p-2.5 rounded-xl border border-purple-100">
                    <CheckCircle2 className="w-4 h-4 text-[#008753] shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Photo Gallery Thumbnails */}
            {listing.images.length > 0 && (
              <div className="space-y-3 pt-4 border-t border-gray-100">
                <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500">Galería de Fotos</h3>
                <div className="grid grid-cols-3 gap-3">
                  {listing.images.map((img, idx) => (
                    <img
                      key={idx}
                      src={img}
                      alt={`Foto ${idx}`}
                      className="w-full h-24 object-cover rounded-2xl shadow-sm hover:opacity-90 transition cursor-pointer border border-purple-100"
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Reviews Section */}
            <div className="space-y-6 pt-6 border-t border-gray-100">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-gray-900">Reseñas de Clientes</h3>
                <span className="text-xs font-bold text-purple-900 bg-purple-100 px-3 py-1 rounded-full">
                  {listingReviews.length} Opiniones
                </span>
              </div>

              {/* Leave Review Form */}
              <form onSubmit={handleReviewFormSubmit} className="bg-purple-50/50 p-4 rounded-2xl border border-purple-100 space-y-3">
                <p className="text-xs font-bold text-gray-800">Escribe una reseña como {currentUser.name}</p>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-gray-600">Calificación:</span>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setNewRating(star)}
                        className="text-amber-400 hover:scale-125 transition"
                      >
                        <Star className={`w-5 h-5 ${star <= newRating ? 'fill-amber-400' : 'text-gray-300'}`} />
                      </button>
                    ))}
                  </div>
                </div>
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Comparte tu experiencia con este negocio..."
                  rows={2}
                  className="w-full p-3 bg-white border border-purple-200 rounded-xl text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#008753]"
                />
                <div className="flex justify-between items-center">
                  {reviewSubmitted && (
                    <span className="text-xs font-bold text-emerald-600">¡Reseña publicada con éxito!</span>
                  )}
                  <button
                    type="submit"
                    className="bg-[#522B8B] hover:bg-[#3D1E6B] text-white font-bold text-xs px-4 py-2 rounded-xl ml-auto flex items-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" /> Publicar Reseña
                  </button>
                </div>
              </form>

              {/* Reviews List */}
              <div className="space-y-4">
                {listingReviews.map((rev) => (
                  <div key={rev.id} className="bg-white p-4 rounded-2xl border border-gray-100 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {rev.userAvatar ? (
                          <img src={rev.userAvatar} alt={rev.userName} className="w-8 h-8 rounded-full object-cover" />
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-purple-100 text-[#522B8B] font-bold text-xs flex items-center justify-center">
                            {rev.userName[0]}
                          </div>
                        )}
                        <div>
                          <p className="text-xs font-bold text-gray-900">{rev.userName}</p>
                          <p className="text-[10px] text-gray-400">{rev.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-0.5 text-amber-400">
                        {Array.from({ length: rev.rating }).map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                        ))}
                      </div>
                    </div>
                    <p className="text-xs text-gray-600 leading-relaxed pl-10">{rev.comment}</p>
                    
                    {rev.ownerResponse && (
                      <div className="ml-10 bg-purple-50 p-3 rounded-xl border border-purple-100 text-xs space-y-1">
                        <span className="font-bold text-[#522B8B]">Respuesta del Negocio ({rev.ownerResponse.date}):</span>
                        <p className="text-gray-700">{rev.ownerResponse.response}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>

            </div>

          </div>

          {/* Contact & Action Sidebar Right Column */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Quick Contact Card */}
            <div className="bg-[#FAF8FC] p-6 rounded-3xl border border-purple-100 space-y-4 shadow-sm">
              <h3 className="text-sm font-bold text-gray-900 border-b border-purple-100 pb-3">Contacto Directo</h3>

              {/* Direct WhatsApp CTA */}
              <a
                href={`https://wa.me/${listing.whatsapp.replace(/\D/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#008753] hover:bg-[#007044] text-white font-extrabold text-xs py-3.5 px-4 rounded-xl shadow-lg transition flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Contactar por WhatsApp</span>
              </a>

              {/* Direct Call CTA */}
              <a
                href={`tel:${listing.phone.replace(/\D/g, '')}`}
                className="w-full bg-[#522B8B] hover:bg-[#3D1E6B] text-white font-extrabold text-xs py-3.5 px-4 rounded-xl shadow transition flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4" />
                <span>Llamar {listing.phone}</span>
              </a>

              {/* Website */}
              {listing.website && (
                <a
                  href={listing.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-white hover:bg-gray-50 text-gray-800 border border-gray-200 font-bold text-xs py-3 px-4 rounded-xl transition flex items-center justify-center gap-2"
                >
                  <Globe className="w-4 h-4 text-[#522B8B]" />
                  <span>Visitar Siteweb Oficial</span>
                </a>
              )}

              {/* Save & Share Buttons */}
              <div className="flex items-center gap-2 pt-2">
                <button
                  onClick={() => toggleFavorite(listing.id)}
                  className={`flex-1 py-2.5 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition ${
                    isFavorite ? 'bg-rose-50 border-rose-200 text-rose-600' : 'bg-white border-gray-200 text-gray-700'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
                  <span>{isFavorite ? 'Guardado' : 'Guardar'}</span>
                </button>

                <button 
                  onClick={() => alert(`Enlace copiado: ${window.location.origin}/listing/${listing.slug}`)}
                  className="p-2.5 bg-white border border-gray-200 rounded-xl text-gray-700 hover:bg-gray-50 transition"
                  title="Compartir Ficha"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Operating Hours Box */}
            <div className="bg-white p-6 rounded-3xl border border-purple-100 space-y-4 shadow-sm">
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <div className="flex items-center gap-2 text-sm font-bold text-gray-900">
                  <Clock className="w-4 h-4 text-[#522B8B]" />
                  <span>Horarios de Atención</span>
                </div>
                <span className="bg-emerald-100 text-emerald-800 text-[11px] font-extrabold px-2.5 py-0.5 rounded-full">
                  Abierto Ahora
                </span>
              </div>

              <div className="space-y-2 text-xs">
                {Object.entries(listing.hours).map(([day, time]) => (
                  <div key={day} className="flex items-center justify-between text-gray-600 py-1 border-b border-gray-50 last:border-none">
                    <span className="capitalize font-semibold">{day}:</span>
                    <span className="font-mono text-gray-900">{time}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Claim Business CTA Box */}
            <div className="bg-gradient-to-br from-purple-900 to-[#2D164D] p-6 rounded-3xl text-white space-y-3 shadow-lg">
              <div className="flex items-center gap-2 text-amber-300 font-bold text-xs uppercase tracking-wider">
                <Building2 className="w-4 h-4" /> ¿Propietario o Gerente?
              </div>
              <h4 className="text-base font-bold">¿Este es tu negocio en Atlanta?</h4>
              <p className="text-xs text-purple-200 leading-relaxed">
                Reclama la propiedad de esta ficha para editar información, responder opiniones y recibir métricas.
              </p>
              <button
                onClick={() => {
                  setIsClaimModalOpen(true);
                }}
                className="w-full bg-[#008753] hover:bg-[#007044] text-white font-extrabold text-xs py-3 px-4 rounded-xl shadow transition"
              >
                Reclamar Propiedad de Este Comercio
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
