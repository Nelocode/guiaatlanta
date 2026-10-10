'use client';

import React from 'react';
import { ATLANTA_ZONES } from '@/lib/data/zones';
import { useApp } from '@/lib/context/AppContext';
import { MapPin, ArrowRight } from 'lucide-react';
import { AtlantaZoneId } from '@/lib/types';

export const NeighborhoodsSection: React.FC = () => {
  const { setSelectedZone } = useApp();

  const handleZoneClick = (zoneId: AtlantaZoneId) => {
    setSelectedZone(zoneId);
    const dest = document.getElementById('destacados');
    if (dest) dest.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="zonas" className="py-20 bg-white border-t border-purple-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#008753] bg-emerald-50 px-3 py-1 rounded-full mb-3">
              Explora el Área
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
              Explora por <span className="text-[#522B8B]">Zonas de Atlanta</span>
            </h2>
          </div>
          <p className="text-sm text-gray-500 max-w-md">
            Desde las torres de Buckhead hasta la diversidad gastronómica de Duluth y Gwinnett.
          </p>
        </div>

        {/* Zones Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {ATLANTA_ZONES.map((zone) => (
            <div
              key={zone.id}
              onClick={() => handleZoneClick(zone.id)}
              className="group relative rounded-3xl overflow-hidden h-72 cursor-pointer border border-purple-100 shadow-md hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1"
            >
              {/* Image background */}
              <img
                src={zone.image}
                alt={zone.name}
                className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2D164D] via-[#2D164D]/50 to-transparent" />

              {/* Badge top right */}
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-black text-[#522B8B] shadow">
                {zone.listingCount}+ Lugares
              </div>

              {/* Content bottom */}
              <div className="absolute bottom-0 inset-x-0 p-6 space-y-2 text-white">
                <div className="flex items-center gap-1.5 text-emerald-400 font-bold text-xs">
                  <MapPin className="w-4 h-4 text-[#008753]" /> Georgia Metro
                </div>
                <h3 className="text-xl font-bold group-hover:text-amber-300 transition">
                  {zone.name}
                </h3>
                <p className="text-xs text-purple-200 line-clamp-2 leading-relaxed opacity-90">
                  {zone.description}
                </p>

                <div className="pt-2 flex items-center gap-2 text-xs font-bold text-emerald-400 group-hover:translate-x-1 transition">
                  <span>Explorar Comercios</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
