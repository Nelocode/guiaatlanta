'use client';

import React from 'react';
import { useApp } from '@/lib/context/AppContext';
import { UserPlus, Sparkles, CheckCircle2, TrendingUp, PlusCircle } from 'lucide-react';

export const MerchantProcessSection: React.FC = () => {
  const { setIsAddListingOpen } = useApp();

  const steps = [
    {
      number: '01',
      title: 'Crea tu Cuenta de Comercio',
      description: 'Regístrate en menos de 2 minutos de forma sencilla y gratuita para comenzar a posicionar tu negocio en Atlanta.',
    },
    {
      number: '02',
      title: 'Completa el Perfil de tu Negocio',
      description: 'Añade fotos de alta calidad, horarios de atención, teléfonos, enlace a WhatsApp, dirección y servicios ofrecidos.',
    },
    {
      number: '03',
      title: 'Selecciona tu Nivel de Visibilidad',
      description: 'Elige entre nuestro plan gratuito o destaca tu empresa en la portada con los planes Pro o VIP Premier.',
    },
    {
      number: '04',
      title: 'Recibe Clientes & Mide Resultados',
      description: 'Accede a tu panel con métricas en tiempo real: llamadas recibidas, clics a WhatsApp, cotizaciones y opiniones.',
    },
  ];

  return (
    <section id="como-funciona" className="py-24 bg-[#2D164D] text-white relative overflow-hidden">
      {/* Visual background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#008753]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Headlines & CTA */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 bg-[#008753] text-white text-xs font-bold px-3.5 py-1.5 rounded-full uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" /> Impulsa Tu Empresa
            </div>

            <h2 className="text-3xl sm:text-5xl font-black leading-tight tracking-tight">
              Potencia tu negocio o servicio con nuestro <span className="text-amber-300 underline decoration-[#008753]">proceso verificado</span>.
            </h2>

            <p className="text-purple-200 text-base leading-relaxed">
              Diseñamos la plataforma para que tu comercio obtenga la máxima exposición en Atlanta con herramientas administrativas avanzadas y sin complicaciones tecnológicas.
            </p>

            <div className="pt-4">
              <button
                onClick={() => setIsAddListingOpen(true)}
                className="bg-[#008753] hover:bg-[#007044] text-white font-extrabold text-sm px-8 py-4 rounded-2xl shadow-xl transition transform hover:-translate-y-1 flex items-center gap-3"
              >
                <PlusCircle className="w-5 h-5" />
                <span>Registrar Mi Negocio Ahora</span>
              </button>
            </div>

            {/* Micro guarantee badge */}
            <div className="flex items-center gap-2 text-xs text-purple-300 pt-2">
              <CheckCircle2 className="w-4 h-4 text-[#008753]" />
              <span>Aprobación rápida por nuestro equipo de moderación en Atlanta.</span>
            </div>
          </div>

          {/* Right Column: 4-Step Cards */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {steps.map((step, idx) => (
              <div 
                key={idx}
                className="bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/15 hover:border-[#008753] transition duration-300 flex flex-col justify-between space-y-4 group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-black text-amber-300 font-mono">
                    {step.number}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-white/10 group-hover:bg-[#008753] flex items-center justify-center transition">
                    <TrendingUp className="w-4 h-4 text-white" />
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-white group-hover:text-amber-300 transition">
                    {step.title}
                  </h3>
                  <p className="text-xs text-purple-200 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
