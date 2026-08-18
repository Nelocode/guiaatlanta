'use client';

import React from 'react';
import { useApp } from '@/lib/context/AppContext';
import { CATEGORIES } from '@/lib/data/categories';
import { ATLANTA_ZONES } from '@/lib/data/zones';
import { Search, MapPin, Grid, Star, ShieldCheck, ArrowRight, Sparkles, Store } from 'lucide-react';
import { CategoryId, AtlantaZoneId } from '@/lib/types';

export const Hero: React.FC = () => {
  const { 
    searchQuery, 
    setSearchQuery, 
    selectedCategory, 
    setSelectedCategory, 
    selectedZone, 
    setSelectedZone,
    setIsAddListingOpen
  } = useApp();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const listingSection = document.getElementById('destacados');
    if (listingSection) {
      listingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative bg-gradient-to-b from-[#FAF8FC] via-purple-50/40 to-white pt-10 pb-20 overflow-hidden">
      {/* Subtle Background Accent Blurs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-300/20 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-300/20 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Headlines & Search Form */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-purple-200 shadow-sm text-xs font-bold text-[#522B8B]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#008753] animate-ping" />
              <span>LA GUÍA OFICIAL DE ATLANTA, GEORGIA</span>
              <span className="text-gray-300">•</span>
              <span className="text-emerald-700 font-bold flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> 100% Verificado
              </span>
            </div>

            {/* Main Headline */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 leading-[1.1] tracking-tight">
                Descubre lo <span className="text-[#522B8B] relative underline decoration-[#008753]/40 decoration-wavy decoration-2">mejor de Atlanta</span> en un solo lugar.
              </h1>
              <p className="text-lg text-gray-600 font-normal leading-relaxed max-w-2xl">
                Tu portal digital curado para conectar con los mejores restaurantes, servicios profesionales, tiendas y experiencias exclusivas en toda la metrópoli de Atlanta.
              </p>
            </div>

            {/* Floating Search Pill Component */}
            <form 
              onSubmit={handleSearchSubmit} 
              className="bg-white p-3 rounded-2xl sm:rounded-full shadow-xl shadow-purple-900/10 border border-purple-100 flex flex-col sm:flex-row items-stretch gap-2 transition hover:shadow-2xl"
            >
              {/* Keyword Input */}
              <div className="flex-1 flex items-center gap-3 px-4 py-2 bg-gray-50/80 sm:bg-transparent rounded-xl sm:rounded-none">
                <Search className="w-5 h-5 text-[#522B8B] shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="¿Qué estás buscando? (ej. Tacos, Abogado, Salud...)"
                  className="w-full text-sm font-medium text-gray-900 placeholder-gray-400 bg-transparent focus:outline-none"
                />
              </div>

              <div className="hidden sm:block w-px bg-gray-200 my-2" />

              {/* Category Select */}
              <div className="flex-1 flex items-center gap-2 px-3 py-2 bg-gray-50/80 sm:bg-transparent rounded-xl sm:rounded-none">
                <Grid className="w-4 h-4 text-[#008753] shrink-0" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value as CategoryId | 'all')}
                  className="w-full text-xs font-semibold text-gray-700 bg-transparent focus:outline-none cursor-pointer"
                >
                  <option value="all">Todas las Categorías</option>
                  {CATEGORIES.map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div className="hidden sm:block w-px bg-gray-200 my-2" />

              {/* Zone Select */}
              <div className="flex-1 flex items-center gap-2 px-3 py-2 bg-gray-50/80 sm:bg-transparent rounded-xl sm:rounded-none">
                <MapPin className="w-4 h-4 text-[#522B8B] shrink-0" />
                <select
                  value={selectedZone}
                  onChange={(e) => setSelectedZone(e.target.value as AtlantaZoneId | 'all')}
                  className="w-full text-xs font-semibold text-gray-700 bg-transparent focus:outline-none cursor-pointer"
                >
                  <option value="all">Toda Atlanta (Zonas)</option>
                  {ATLANTA_ZONES.map(z => (
                    <option key={z.id} value={z.id}>{z.name}</option>
                  ))}
                </select>
              </div>

              {/* Search Submit Button */}
              <button
                type="submit"
                className="bg-[#522B8B] hover:bg-[#3D1E6B] text-white font-bold text-sm px-7 py-3 rounded-xl sm:rounded-full shadow-lg hover:shadow-purple-900/30 transition flex items-center justify-center gap-2"
              >
                <span>Buscar</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            {/* Social Trust Stat Badges */}
            <div className="flex flex-wrap items-center gap-6 pt-2">
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  <img className="w-10 h-10 rounded-full border-2 border-white object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80" alt="Usuario" />
                  <img className="w-10 h-10 rounded-full border-2 border-white object-cover" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80" alt="Usuario" />
                  <img className="w-10 h-10 rounded-full border-2 border-white object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80" alt="Usuario" />
                  <div className="w-10 h-10 rounded-full bg-[#522B8B] text-white font-bold text-xs flex items-center justify-center border-2 border-white">
                    500+
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-1 text-amber-500 text-xs font-bold">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <span>4.9 / 5.0 Reseñas</span>
                  </div>
                  <p className="text-xs text-gray-500 font-medium">Comunidad activa en Atlanta</p>
                </div>
              </div>

              <div className="h-8 w-px bg-gray-200 hidden sm:block" />

              <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 px-3.5 py-1.5 rounded-xl">
                <div className="w-3 h-3 rounded-full bg-[#008753]" />
                <span className="text-xs font-bold text-emerald-900">Directorio Verificado 2026</span>
              </div>
            </div>

          </div>

          {/* Right Column: Curated Asymmetric Image Collage (Ref Design Inspired) */}
          <div className="lg:col-span-5 relative">
            
            {/* Custom Styled Curved Mask Container */}
            <div className="relative mx-auto max-w-md lg:max-w-none grid grid-cols-2 gap-4 items-center">
              
              {/* Left Tall Image Frame */}
              <div className="space-y-4">
                <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white transform -rotate-1 hover:rotate-0 transition duration-500">
                  <img
                    src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80"
                    alt="Gastronomía Atlanta"
                    className="w-full h-64 object-cover hover:scale-105 transition duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-4">
                    <span className="bg-[#008753] text-white font-bold text-xs px-3 py-1 rounded-full shadow">
                      Cortes Premium Buckhead
                    </span>
                  </div>
                </div>

                <div className="relative rounded-[2rem] overflow-hidden shadow-xl border-4 border-white transform rotate-2 hover:rotate-0 transition duration-500">
                  <img
                    src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80"
                    alt="Servicios Legales Atlanta"
                    className="w-full h-44 object-cover hover:scale-105 transition duration-700"
                  />
                  <div className="absolute top-3 left-3 bg-[#522B8B] text-white text-[11px] font-bold px-2.5 py-1 rounded-lg">
                    Servicios Legales Midtown
                  </div>
                </div>
              </div>

              {/* Right Stacked Curved Frames */}
              <div className="space-y-4 pt-6">
                <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white transform rotate-2 hover:rotate-0 transition duration-500">
                  <img
                    src="https://images.unsplash.com/photo-1575917649705-5b59aaa12e6b?auto=format&fit=crop&w=800&q=80"
                    alt="Skyline Atlanta"
                    className="w-full h-52 object-cover hover:scale-105 transition duration-700"
                  />
                  <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-black text-[#522B8B] shadow">
                    Midtown Atlanta
                  </div>
                </div>

                <div className="relative rounded-[2rem] overflow-hidden shadow-xl border-4 border-white transform -rotate-2 hover:rotate-0 transition duration-500">
                  <img
                    src="https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=800&q=80"
                    alt="Gastronomía Mexicana"
                    className="w-full h-56 object-cover hover:scale-105 transition duration-700"
                  />
                  <div className="absolute bottom-3 left-3 bg-[#008753] text-white font-bold text-xs px-3 py-1 rounded-full">
                    Tacos & Tequila
                  </div>
                </div>
              </div>

              {/* Floating Badge Overlay */}
              <div 
                onClick={() => setIsAddListingOpen(true)}
                className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-2xl border border-purple-100 flex items-center gap-3 animate-bounce-slow cursor-pointer hover:scale-105 transition"
              >
                <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-[#008753]">
                  <Store className="w-6 h-6 text-[#008753]" />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-900">¿Eres dueño de un comercio?</p>
                  <p className="text-[11px] text-[#008753] font-extrabold flex items-center gap-1">
                    Publica y haz crecer tu negocio →
                  </p>
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
