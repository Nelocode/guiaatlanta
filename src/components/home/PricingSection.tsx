'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/context/AppContext';
import { Check, Crown, Zap, ShieldCheck, ArrowRight } from 'lucide-react';

export const PricingSection: React.FC = () => {
  const { setIsAddListingOpen } = useApp();
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  const plans = [
    {
      id: 'free',
      name: 'Exposición Estándar',
      badge: 'Gratuito',
      priceMonthly: 0,
      priceYearly: 0,
      description: 'Ideal para pequeños comercios y profesionales independientes que están comenzando.',
      features: [
        'Perfil comercial básico en el directorio',
        'Hasta 2 fotos en la galería',
        'Teléfono y dirección de contacto',
        'Categorización en 1 categoría principal',
        'Inclusión en búsquedas por zona de Atlanta',
      ],
      ctaText: 'Comenzar Gratis',
      isPopular: false,
      accentColor: 'border-purple-200',
    },
    {
      id: 'pro',
      name: 'Destacado Pro',
      badge: 'Más Popular',
      priceMonthly: 49,
      priceYearly: 39,
      description: 'Maximiza tu alcance con prioridad en búsquedas, botón directo a WhatsApp y métricas.',
      features: [
        'Todo lo del plan Estándar',
        'Insignia de Comercio Verificado (Check Verde)',
        'Botón de contacto directo a WhatsApp',
        'Hasta 8 fotos HD y logotipo oficial',
        'Prioridad en resultados de búsqueda',
        'Panel de Métricas (visitas, clics y llamadas)',
        'Respuesta directa a reseñas de clientes',
      ],
      ctaText: 'Activar Plan Pro',
      isPopular: true,
      accentColor: 'border-[#008753] ring-2 ring-[#008753]/30',
    },
    {
      id: 'vip',
      name: 'VIP Premier Atlanta',
      badge: 'Máximo Impacto',
      priceMonthly: 99,
      priceYearly: 79,
      description: 'Posicionamiento privilegiado en la portada principal, banner rotativo y soporte VIP.',
      features: [
        'Todo lo del plan Destacado Pro',
        'Ubicación destacada VIP en la portada principal',
        'Etiqueta dorada VIP Premier en las tarjetas',
        'Galería ilimitada de imágenes y video',
        'Promoción destacada en nuestras redes sociales',
        'Publicación en 3 categorías simultáneas',
        'Gestor de cuenta personal en Atlanta',
      ],
      ctaText: 'Obtener VIP Premier',
      isPopular: false,
      accentColor: 'border-amber-400 ring-2 ring-amber-400/40 bg-gradient-to-b from-amber-50/40 to-white',
    },
  ];

  return (
    <section id="planes" className="py-24 bg-[#FAF8FC] border-t border-purple-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#522B8B] bg-purple-100 px-3.5 py-1.5 rounded-full">
            <Zap className="w-3.5 h-3.5 text-[#008753]" /> Planes de Membresía Comercial
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-gray-900 tracking-tight">
            Planes diseñados para hacer <span className="text-[#008753]">crecer tu negocio</span>
          </h2>

          <p className="text-base text-gray-600">
            Transparencia total. Elige la suscripción que mejor se adapte a los objetivos de tu comercio en Atlanta.
          </p>

          {/* Billing Cycle Toggle */}
          <div className="inline-flex items-center p-1.5 bg-white rounded-full border border-purple-200 shadow-sm mt-4">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-5 py-2 rounded-full text-xs font-bold transition ${
                billingCycle === 'monthly' ? 'bg-[#522B8B] text-white shadow' : 'text-gray-600 hover:text-[#522B8B]'
              }`}
            >
              Pago Mensual
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-5 py-2 rounded-full text-xs font-bold transition flex items-center gap-1.5 ${
                billingCycle === 'yearly' ? 'bg-[#008753] text-white shadow' : 'text-gray-600 hover:text-[#008753]'
              }`}
            >
              <span>Pago Anual</span>
              <span className="bg-amber-300 text-purple-950 font-black text-[10px] px-2 py-0.5 rounded-full uppercase">
                Ahorra 20%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan) => {
            const price = billingCycle === 'monthly' ? plan.priceMonthly : plan.priceYearly;

            return (
              <div
                key={plan.id}
                className={`bg-white rounded-3xl p-8 border flex flex-col justify-between relative shadow-lg hover:shadow-2xl transition-all duration-300 ${plan.accentColor}`}
              >
                {/* Popular Badge */}
                {plan.isPopular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-[#008753] text-white text-xs font-black uppercase px-4 py-1 rounded-full shadow-md flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" /> {plan.badge}
                  </div>
                )}

                {plan.id === 'vip' && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-amber-500 to-amber-600 text-purple-950 text-xs font-black uppercase px-4 py-1 rounded-full shadow-md flex items-center gap-1">
                    <Crown className="w-3.5 h-3.5 fill-purple-950" /> {plan.badge}
                  </div>
                )}

                <div className="space-y-6 pt-2">
                  <div>
                    <h3 className="text-xl font-black text-gray-900">{plan.name}</h3>
                    <p className="text-xs text-gray-500 mt-1 min-h-[32px]">{plan.description}</p>
                  </div>

                  {/* Price */}
                  <div className="flex items-baseline gap-1 py-2 border-y border-purple-100">
                    <span className="text-4xl font-black text-gray-900">${price}</span>
                    <span className="text-xs text-gray-500 font-semibold">/ mes {billingCycle === 'yearly' && '(facturado anualmente)'}</span>
                  </div>

                  {/* Features List */}
                  <ul className="space-y-3">
                    {plan.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs text-gray-700 font-medium">
                        <Check className="w-4 h-4 text-[#008753] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-8">
                  <button
                    onClick={() => setIsAddListingOpen(true)}
                    className={`w-full font-extrabold text-xs py-3.5 px-4 rounded-xl transition shadow flex items-center justify-center gap-2 ${
                      plan.id === 'pro'
                        ? 'bg-[#008753] hover:bg-[#007044] text-white shadow-emerald-900/20'
                        : plan.id === 'vip'
                        ? 'bg-[#522B8B] hover:bg-[#3D1E6B] text-white shadow-purple-900/20'
                        : 'bg-purple-100 hover:bg-purple-200 text-[#522B8B]'
                    }`}
                  >
                    <span>{plan.ctaText}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
