'use client';

import React from 'react';
import { Logo } from '../ui/Logo';
import { useApp } from '@/lib/context/AppContext';
import { 
  PlusCircle, 
  Search, 
  Heart, 
  User as UserIcon, 
  ShieldCheck, 
  Store, 
  Eye, 
  SlidersHorizontal,
  ChevronDown,
  Sparkles,
  Menu,
  X
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { 
    viewMode, 
    setViewMode, 
    currentUser, 
    setIsAddListingOpen, 
    setIsAuthModalOpen,
    listings,
    claims,
    platformMetrics
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const pendingCount = platformMetrics.pendingApprovals;
  const savedCount = currentUser.savedListingIds.length;

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-purple-900/10 transition-all">
      {/* Top Notification / Role Switcher Bar */}
      <div className="bg-[#522B8B] text-white text-xs py-1.5 px-4 sm:px-8 flex flex-wrap justify-between items-center gap-2">
        <div className="flex items-center gap-2 font-medium">
          <span className="bg-[#008753] text-white text-[10px] uppercase font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
            <Sparkles className="w-3 h-3" /> Oficial
          </span>
          <span className="hidden sm:inline">El directorio comercial & gastronómico #1 de Atlanta, Georgia</span>
        </div>

        {/* View Mode Switcher for Interactive Demo */}
        <div className="flex items-center gap-1 bg-white/15 backdrop-blur-md p-0.5 rounded-lg text-xs font-semibold">
          <span className="text-purple-200 text-[11px] px-2 hidden md:inline">Vista de Plataforma:</span>
          <button
            onClick={() => setViewMode('public')}
            className={`px-2.5 py-1 rounded-md transition flex items-center gap-1.5 ${
              viewMode === 'public' ? 'bg-white text-[#522B8B] shadow-sm font-bold' : 'hover:bg-white/10 text-white'
            }`}
          >
            <Eye className="w-3.5 h-3.5" /> Portal Público
          </button>
          
          <button
            onClick={() => setViewMode('merchant')}
            className={`px-2.5 py-1 rounded-md transition flex items-center gap-1.5 ${
              viewMode === 'merchant' ? 'bg-[#008753] text-white shadow-sm font-bold' : 'hover:bg-white/10 text-white'
            }`}
          >
            <Store className="w-3.5 h-3.5" /> Panel Comercio
          </button>
          
          <button
            onClick={() => setViewMode('admin')}
            className={`px-2.5 py-1 rounded-md transition flex items-center gap-1.5 relative ${
              viewMode === 'admin' ? 'bg-[#522B8B] text-white ring-1 ring-white/50 font-bold' : 'hover:bg-white/10 text-white'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" /> Super Admin
            {pendingCount > 0 && (
              <span className="bg-amber-400 text-purple-950 font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
                {pendingCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setViewMode('user')}
            className={`px-2.5 py-1 rounded-md transition flex items-center gap-1.5 ${
              viewMode === 'user' ? 'bg-white text-[#522B8B] shadow-sm font-bold' : 'hover:bg-white/10 text-white'
            }`}
          >
            <UserIcon className="w-3.5 h-3.5" /> Mi Cuenta
          </button>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-8">
          <a href="#" onClick={(e) => { e.preventDefault(); setViewMode('public'); }}>
            <Logo size="md" />
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-semibold text-gray-700">
            <a href="#destacados" className="hover:text-[#522B8B] transition">Destacados</a>
            <a href="#categorias" className="hover:text-[#522B8B] transition">Categorías</a>
            <a href="#zonas" className="hover:text-[#522B8B] transition">Zonas de Atlanta</a>
            <a href="#como-funciona" className="hover:text-[#522B8B] transition">Para Negocios</a>
            <a href="#planes" className="hover:text-[#522B8B] transition">Planes</a>
          </nav>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          {/* Saved Favorites button */}
          <button 
            onClick={() => setViewMode('user')}
            className="p-2.5 text-gray-600 hover:text-[#522B8B] hover:bg-purple-50 rounded-xl relative transition"
            title="Ver Favoritos Guardados"
          >
            <Heart className="w-5 h-5" />
            {savedCount > 0 && (
              <span className="absolute top-1 right-1 bg-[#008753] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {savedCount}
              </span>
            )}
          </button>

          {/* Auth Button */}
          <button
            onClick={() => setIsAuthModalOpen(true)}
            className="hidden sm:flex items-center gap-2 px-3.5 py-2 text-sm font-semibold text-[#522B8B] bg-purple-50 hover:bg-purple-100 rounded-xl transition border border-purple-200"
          >
            <UserIcon className="w-4 h-4 text-[#522B8B]" />
            <span>{currentUser ? currentUser.name.split(' ')[0] : 'Ingresar'}</span>
          </button>

          {/* Add Business CTA */}
          <button
            onClick={() => setIsAddListingOpen(true)}
            className="bg-[#008753] hover:bg-[#007246] text-white text-sm font-bold px-4 py-2.5 rounded-xl shadow-md hover:shadow-lg transition transform hover:-translate-y-0.5 flex items-center gap-2"
          >
            <PlusCircle className="w-4 h-4" />
            <span className="hidden xs:inline">Anunciar Mi Negocio</span>
          </button>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-gray-600 hover:text-gray-900 rounded-lg"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-gray-200 px-4 pt-2 pb-6 space-y-3">
          <nav className="flex flex-col gap-3 font-semibold text-gray-700 pt-2">
            <a href="#destacados" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-gray-100">Destacados</a>
            <a href="#categorias" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-gray-100">Categorías</a>
            <a href="#zonas" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-gray-100">Zonas de Atlanta</a>
            <a href="#como-funciona" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-gray-100">Para Negocios</a>
            <a href="#planes" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-gray-100">Planes</a>
          </nav>
        </div>
      )}
    </header>
  );
};
