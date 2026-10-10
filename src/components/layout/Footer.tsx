'use client';

import React from 'react';
import { Logo } from '../ui/Logo';
import { ATLANTA_ZONES } from '@/lib/data/zones';
import { CATEGORIES } from '@/lib/data/categories';
import { useApp } from '@/lib/context/AppContext';
import { MapPin, Phone, Mail, ShieldCheck, Send, Globe, Share2 } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setSelectedCategory, setSelectedZone, setIsAddListingOpen } = useApp();

  return (
    <footer className="bg-[#2D164D] text-white pt-16 pb-12 border-t-4 border-[#008753]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-purple-800/60">
          
          {/* Brand & Mission Column */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white/10 p-3 rounded-2xl inline-block backdrop-blur-md">
              <Logo size="md" />
            </div>
            <p className="text-purple-200 text-sm leading-relaxed max-w-md">
              La Guía Atlanta es la plataforma digital de conexión comercial, gastronómica y profesional líder para residentes y comercios del área de Atlanta. Conectando lo mejor de la ciudad con un estándar visual y tecnológico excepcional.
            </p>
            <div className="flex items-center gap-4 text-purple-300">
              <a href="#" className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center hover:bg-[#008753] hover:text-white transition" title="Instagram">
                <Globe className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center hover:bg-[#008753] hover:text-white transition" title="Facebook">
                <Share2 className="w-5 h-5" />
              </a>
              <div className="flex items-center gap-2 text-xs bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 px-3 py-1.5 rounded-lg">
                <ShieldCheck className="w-4 h-4 text-[#008753]" /> 100% Verificado en Atlanta
              </div>
            </div>
          </div>

          {/* Quick Categories */}
          <div>
            <h4 className="text-lg font-bold text-white mb-4 border-l-4 border-[#008753] pl-3">Directorio</h4>
            <ul className="space-y-2.5 text-sm text-purple-200">
              {CATEGORIES.slice(0, 5).map(cat => (
                <li key={cat.id}>
                  <button
                    onClick={() => {
                      setSelectedCategory(cat.id);
                      window.scrollTo({ top: 700, behavior: 'smooth' });
                    }}
                    className="hover:text-emerald-400 transition flex items-center gap-1.5"
                  >
                    <span className="text-[#008753] font-bold">›</span> {cat.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Atlanta Zones */}
          <div>
            <h4 className="text-lg font-bold text-white mb-4 border-l-4 border-[#008753] pl-3">Zonas Metrópolis</h4>
            <ul className="space-y-2.5 text-sm text-purple-200">
              {ATLANTA_ZONES.slice(0, 5).map(zone => (
                <li key={zone.id}>
                  <button
                    onClick={() => {
                      setSelectedZone(zone.id);
                      window.scrollTo({ top: 700, behavior: 'smooth' });
                    }}
                    className="hover:text-emerald-400 transition flex items-center gap-1.5"
                  >
                    <MapPin className="w-3.5 h-3.5 text-[#008753]" /> {zone.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Merchant Newsletter Box */}
          <div className="space-y-4">
            <h4 className="text-lg font-bold text-white border-l-4 border-[#008753] pl-3">Comercios</h4>
            <p className="text-xs text-purple-200">
              ¿Tienes una empresa en Atlanta? Regístrate hoy y conecta con miles de clientes potenciales.
            </p>
            <button
              onClick={() => setIsAddListingOpen(true)}
              className="w-full bg-[#008753] hover:bg-[#007044] text-white font-bold py-3 px-4 rounded-xl shadow-lg transition text-sm flex items-center justify-center gap-2"
            >
              Publicar Mi Negocio Ahora
            </button>

            <div className="pt-2">
              <label className="text-xs font-semibold text-purple-300 block mb-1.5">Boletín La Guía Atlanta</label>
              <div className="flex gap-1.5">
                <input
                  type="email"
                  placeholder="Tu correo electrónico"
                  className="bg-white/10 border border-purple-700/50 rounded-xl px-3 py-2 text-xs text-white placeholder-purple-300/60 focus:outline-none focus:ring-2 focus:ring-[#008753] flex-1"
                />
                <button className="bg-white/20 hover:bg-[#008753] p-2 rounded-xl text-white transition">
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Credits & Easypanel Ready Notice */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-purple-300">
          <div>
            © {new Date().getFullYear()} <strong className="text-white font-bold">La Guía Atlanta</strong>. Todos los derechos reservados.
          </div>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-white transition">Términos de Servicio</a>
            <a href="#" className="hover:text-white transition">Política de Privacidad</a>
            <span className="bg-white/10 px-2.5 py-1 rounded text-[11px] text-emerald-300 border border-emerald-500/20">
              Easypanel & Docker Verified
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
