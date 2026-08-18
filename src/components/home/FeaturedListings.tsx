'use client';

import React, { useState, useMemo } from 'react';
import { useApp } from '@/lib/context/AppContext';
import { ListingCard } from '../listings/ListingCard';
import { Sparkles, SlidersHorizontal, ShieldCheck, Crown, RefreshCw } from 'lucide-react';

export const FeaturedListings: React.FC = () => {
  const { 
    listings, 
    searchQuery, 
    selectedCategory, 
    selectedZone, 
    setSelectedCategory, 
    setSelectedZone,
    setSearchQuery 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'all' | 'verified' | 'vip' | 'top'>('all');

  const filteredListings = useMemo(() => {
    return listings.filter(item => {
      // Query filter
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const matchesTitle = item.title.toLowerCase().includes(q);
        const matchesTagline = item.tagline.toLowerCase().includes(q);
        const matchesCategory = item.categoryName.toLowerCase().includes(q);
        const matchesZone = item.zoneName.toLowerCase().includes(q);
        if (!matchesTitle && !matchesTagline && !matchesCategory && !matchesZone) {
          return false;
        }
      }

      // Category filter
      if (selectedCategory !== 'all' && item.categoryId !== selectedCategory) {
        return false;
      }

      // Zone filter
      if (selectedZone !== 'all' && item.zoneId !== selectedZone) {
        return false;
      }

      // Tab filter
      if (activeTab === 'verified' && !item.isVerified) return false;
      if (activeTab === 'vip' && item.plan !== 'vip') return false;
      if (activeTab === 'top' && item.rating < 4.8) return false;

      return item.status === 'active';
    });
  }, [listings, searchQuery, selectedCategory, selectedZone, activeTab]);

  const hasActiveFilters = searchQuery !== '' || selectedCategory !== 'all' || selectedZone !== 'all' || activeTab !== 'all';

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedZone('all');
    setActiveTab('all');
  };

  return (
    <section id="destacados" className="py-20 bg-[#FAF8FC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#522B8B] bg-purple-100 px-3 py-1 rounded-full mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#008753]" /> Selección Destacada Atlanta
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900">
              Comercios & Experiencias <span className="text-[#008753]">Recomendadas</span>
            </h2>
            <p className="text-sm text-gray-600 mt-2">
              Explora negocios con alta calificación y verificación de autenticidad en la metrópoli.
            </p>
          </div>

          {/* Quick Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2 bg-white p-1.5 rounded-2xl shadow-sm border border-purple-100">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                activeTab === 'all' ? 'bg-[#522B8B] text-white shadow' : 'text-gray-600 hover:bg-purple-50'
              }`}
            >
              Todos ({listings.length})
            </button>

            <button
              onClick={() => setActiveTab('verified')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                activeTab === 'verified' ? 'bg-[#008753] text-white shadow' : 'text-gray-600 hover:bg-emerald-50'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" /> Verificados
            </button>

            <button
              onClick={() => setActiveTab('vip')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                activeTab === 'vip' ? 'bg-amber-500 text-purple-950 shadow font-black' : 'text-gray-600 hover:bg-amber-50'
              }`}
            >
              <Crown className="w-3.5 h-3.5" /> VIP Premier
            </button>

            <button
              onClick={() => setActiveTab('top')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                activeTab === 'top' ? 'bg-purple-900 text-white shadow' : 'text-gray-600 hover:bg-purple-50'
              }`}
            >
              4.8+ Calificación
            </button>
          </div>
        </div>

        {/* Filter Reset Indicator if filters active */}
        {hasActiveFilters && (
          <div className="mb-8 bg-purple-50 border border-purple-200 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4">
            <div className="text-xs text-purple-900 font-semibold flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-[#522B8B]" />
              <span>
                Filtros activos: {filteredListings.length} resultados encontrados.
              </span>
            </div>

            <button
              onClick={resetFilters}
              className="text-xs font-bold text-[#522B8B] hover:text-[#008753] flex items-center gap-1 bg-white px-3 py-1.5 rounded-xl border border-purple-200 shadow-sm"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Limpiar Filtros
            </button>
          </div>
        )}

        {/* Listings Grid */}
        {filteredListings.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredListings.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-12 text-center border border-purple-100 shadow-sm max-w-xl mx-auto space-y-4">
            <div className="w-16 h-16 rounded-full bg-purple-50 text-[#522B8B] flex items-center justify-center mx-auto">
              <SlidersHorizontal className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">No se encontraron negocios con estos criterios</h3>
            <p className="text-sm text-gray-500">
              Intenta cambiar los términos de búsqueda, categoría o zona de Atlanta para ampliar tus resultados.
            </p>
            <button
              onClick={resetFilters}
              className="bg-[#522B8B] text-white font-bold text-xs px-6 py-3 rounded-xl shadow hover:bg-[#3D1E6B] transition"
            >
              Restablecer Todos los Filtros
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
