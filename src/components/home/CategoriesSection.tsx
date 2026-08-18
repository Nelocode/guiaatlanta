'use client';

import React from 'react';
import { CATEGORIES } from '@/lib/data/categories';
import { useApp } from '@/lib/context/AppContext';
import { 
  Utensils, 
  Briefcase, 
  HeartPulse, 
  Ticket, 
  ShoppingBag, 
  Car, 
  Home, 
  GraduationCap,
  ArrowUpRight
} from 'lucide-react';
import { CategoryId } from '@/lib/types';

const ICON_MAP: Record<string, React.ReactNode> = {
  Utensils: <Utensils className="w-6 h-6" />,
  Briefcase: <Briefcase className="w-6 h-6" />,
  HeartPulse: <HeartPulse className="w-6 h-6" />,
  Ticket: <Ticket className="w-6 h-6" />,
  ShoppingBag: <ShoppingBag className="w-6 h-6" />,
  Car: <Car className="w-6 h-6" />,
  Home: <Home className="w-6 h-6" />,
  GraduationCap: <GraduationCap className="w-6 h-6" />,
};

export const CategoriesSection: React.FC = () => {
  const { selectedCategory, setSelectedCategory } = useApp();

  const handleCategoryClick = (catId: CategoryId) => {
    setSelectedCategory(catId === selectedCategory ? 'all' : catId);
    const dest = document.getElementById('destacados');
    if (dest) dest.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="categorias" className="py-16 bg-white border-y border-purple-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#008753] bg-emerald-50 px-3 py-1 rounded-full mb-3">
              Explora por Interés
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
              Categorías Principales en <span className="text-[#522B8B]">Atlanta</span>
            </h2>
          </div>
          <p className="text-sm text-gray-500 max-w-md">
            Encuentra exactamente lo que necesitas organizado en categorías especializadas verificadas por nuestro equipo local.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;

            return (
              <div
                key={cat.id}
                onClick={() => handleCategoryClick(cat.id)}
                className={`group relative rounded-3xl p-6 transition-all duration-300 cursor-pointer overflow-hidden border ${
                  isSelected
                    ? 'bg-[#522B8B] text-white border-[#522B8B] shadow-xl scale-[1.02]'
                    : 'bg-[#FAF8FC] hover:bg-white text-gray-900 border-purple-100 hover:border-purple-300 hover:shadow-xl'
                }`}
              >
                {/* Background Tint Image Effect on Hover */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-10 transition duration-500 bg-cover bg-center pointer-events-none"
                  style={{ backgroundImage: `url(${cat.image})` }}
                />

                <div className="relative z-10 flex flex-col justify-between h-full space-y-6">
                  <div className="flex items-start justify-between">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 ${
                      isSelected ? 'bg-[#008753] text-white' : 'bg-purple-100 text-[#522B8B]'
                    }`}>
                      {ICON_MAP[cat.iconName] || <Briefcase className="w-6 h-6" />}
                    </div>

                    <div className={`w-8 h-8 rounded-full flex items-center justify-center transition ${
                      isSelected ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-400 group-hover:bg-[#008753] group-hover:text-white'
                    }`}>
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>

                  <div>
                    <h3 className={`text-lg font-bold transition ${isSelected ? 'text-white' : 'text-gray-900 group-hover:text-[#522B8B]'}`}>
                      {cat.name}
                    </h3>
                    <p className={`text-xs mt-1 line-clamp-2 ${isSelected ? 'text-purple-200' : 'text-gray-500'}`}>
                      {cat.description}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-purple-200/30 flex items-center justify-between">
                    <span className={`text-xs font-semibold ${isSelected ? 'text-emerald-300' : 'text-[#008753]'}`}>
                      {cat.listingCount}+ Negocios
                    </span>
                    <span className={`text-[11px] uppercase tracking-wider font-bold ${isSelected ? 'text-white' : 'text-purple-700'}`}>
                      Ver Lista
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
