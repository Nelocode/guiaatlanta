'use client';

import React from 'react';
import { Listing } from '@/lib/types';
import { useApp } from '@/lib/context/AppContext';
import { 
  Star, 
  MapPin, 
  Phone, 
  MessageCircle, 
  ShieldCheck, 
  Heart, 
  Crown, 
  Clock, 
  ExternalLink,
  ChevronRight
} from 'lucide-react';

interface ListingCardProps {
  listing: Listing;
}

export const ListingCard: React.FC<{ listing: any }> = ({ listing }) => {
  const { currentUser, toggleFavorite, setActiveListingId } = useApp();
  // Safe check if currentUser and savedListingIds exist
  const isFavorite = currentUser?.savedListingIds?.includes(listing.id) || false;

  const isFeatured = listing.isFeatured;
  const coverImage = listing.images && listing.images.length > 0 ? listing.images[0] : 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=600';

  return (
    <div className={`group bg-white rounded-3xl overflow-hidden border transition-all duration-300 flex flex-col justify-between hover:shadow-2xl ${
      isFeatured 
        ? 'border-amber-300 ring-2 ring-amber-400/30 shadow-lg' 
        : 'border-purple-100 hover:border-purple-300 shadow-sm'
    }`}>
      
      {/* Upper Media Container */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={coverImage}
          alt={listing.title}
          className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        {/* Top Right Favorite Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            if (toggleFavorite) toggleFavorite(listing.id);
          }}
          className={`absolute top-4 right-4 p-2.5 rounded-full backdrop-blur-md transition ${
            isFavorite ? 'bg-rose-500 text-white shadow-lg' : 'bg-white/80 text-gray-700 hover:bg-white'
          }`}
          title={isFavorite ? 'Quitar de Favoritos' : 'Guardar en Favoritos'}
        >
          <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
        </button>

        {/* Badges Overlay */}
        <div className="absolute top-4 left-4 flex flex-wrap gap-2 items-center">
          {isFeatured && (
            <span className="bg-gradient-to-r from-amber-500 to-amber-600 text-purple-950 text-[11px] font-black px-3 py-1 rounded-full shadow flex items-center gap-1 uppercase tracking-wider">
              <Crown className="w-3.5 h-3.5 fill-purple-950" /> Destacado
            </span>
          )}
        </div>

        {/* Bottom Image Overlay Info */}
        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
          <span className="bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs font-semibold px-3 py-1 rounded-full">
            {listing.category?.name || 'General'}
          </span>
          <span className="text-amber-300 font-extrabold text-xs bg-black/40 px-2.5 py-1 rounded-lg backdrop-blur-sm">
            {listing.price ? `$${Number(listing.price).toLocaleString()}` : 'A convenir'}
          </span>
        </div>
      </div>

      {/* Card Content Body */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          
          {/* Zone & Condition Line */}
          <div className="flex items-center justify-between text-xs text-gray-500 font-semibold">
            <span className="flex items-center gap-1 text-[#522B8B]">
              <MapPin className="w-3.5 h-3.5 text-[#008753]" /> {listing.locationText || 'Atlanta, GA'}
            </span>
            <div className="flex items-center gap-1 text-[#008753] font-bold bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100">
              <span className="capitalize">{listing.condition === 'new' ? 'Nuevo' : listing.condition === 'used' ? 'Usado' : listing.condition}</span>
            </div>
          </div>

          {/* Title */}
          <h3 
            onClick={() => setActiveListingId && setActiveListingId(listing.id)}
            className="text-xl font-bold text-gray-900 group-hover:text-[#522B8B] transition cursor-pointer line-clamp-1"
          >
            {listing.title}
          </h3>

          {/* Description */}
          <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
            {listing.description}
          </p>
        </div>

        {/* Footer Actions */}
        <div className="pt-4 border-t border-gray-100 flex items-center justify-between gap-2">
          
          {/* Quick Contact CTAs */}
          <div className="flex items-center gap-2">
            {listing.contactWhatsapp && (
              <a
                href={`https://wa.me/${listing.contactWhatsapp.replace(/\D/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="w-9 h-9 rounded-xl bg-emerald-50 text-[#008753] hover:bg-[#008753] hover:text-white flex items-center justify-center transition"
                title="Contactar por WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            )}

            {listing.contactPhone && (
              <a
                href={`tel:${listing.contactPhone.replace(/\D/g, '')}`}
                onClick={(e) => e.stopPropagation()}
                className="w-9 h-9 rounded-xl bg-purple-50 text-[#522B8B] hover:bg-[#522B8B] hover:text-white flex items-center justify-center transition"
                title="Llamar directamente"
              >
                <Phone className="w-4 h-4" />
              </a>
            )}
          </div>

          {/* View Details button */}
          <button
            onClick={() => setActiveListingId && setActiveListingId(listing.id)}
            className="bg-[#522B8B] hover:bg-[#3D1E6B] text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow transition flex items-center gap-1"
          >
            <span>Ver Ficha</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
