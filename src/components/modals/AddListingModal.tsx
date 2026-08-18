'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/context/AppContext';
import { CATEGORIES } from '@/lib/data/categories';
import { ATLANTA_ZONES } from '@/lib/data/zones';
import { X, PlusCircle, CheckCircle, Store, MapPin, Phone, MessageCircle, Globe, Crown } from 'lucide-react';
import { CategoryId, AtlantaZoneId, MembershipPlan } from '@/lib/types';

export const AddListingModal: React.FC = () => {
  const { isAddListingOpen, setIsAddListingOpen, addListing, viewMode } = useApp();

  const [title, setTitle] = useState('');
  const [tagline, setTagline] = useState('');
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState<CategoryId>('gastronomia');
  const [zoneId, setZoneId] = useState<AtlantaZoneId>('midtown');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [website, setWebsite] = useState('');
  const [plan, setPlan] = useState<MembershipPlan>('pro');
  const [coverImage, setCoverImage] = useState('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1000&q=80');

  const [submitted, setSubmitted] = useState(false);

  if (!isAddListingOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description || !address || !phone) return;

    const catObj = CATEGORIES.find(c => c.id === categoryId);
    const zoneObj = ATLANTA_ZONES.find(z => z.id === zoneId);

    addListing({
      title,
      slug: title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, ''),
      tagline: tagline || description.slice(0, 70),
      description,
      categoryId,
      categoryName: catObj?.name || 'Comercio',
      zoneId,
      zoneName: zoneObj?.name || 'Atlanta Metro',
      address,
      city: 'Atlanta',
      zipCode: '30309',
      phone,
      whatsapp: whatsapp || phone,
      website,
      email: `contacto@${title.toLowerCase().replace(/\s+/g, '')}.com`,
      isVerified: plan !== 'free',
      isFeatured: plan !== 'free',
      status: viewMode === 'admin' ? 'active' : 'pending',
      priceRange: '$$',
      hours: {
        monday: '9:00 AM - 6:00 PM',
        tuesday: '9:00 AM - 6:00 PM',
        wednesday: '9:00 AM - 6:00 PM',
        thursday: '9:00 AM - 6:00 PM',
        friday: '9:00 AM - 6:00 PM',
        saturday: '10:00 AM - 4:00 PM',
        sunday: 'Cerrado',
      },
      images: [coverImage],
      coverImage,
      amenities: ['Atención en Español', 'Wi-Fi Gratis', 'Estacionamiento Disponible'],
      plan,
    });

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setIsAddListingOpen(false);
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-8 shadow-2xl border border-purple-100 relative text-gray-900 animate-scale-up max-h-[90vh] overflow-y-auto">
        
        <button
          onClick={() => setIsAddListingOpen(false)}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 rounded-full"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-2 mb-6 border-b border-gray-100 pb-4">
          <div className="inline-flex items-center gap-2 bg-emerald-50 text-[#008753] text-xs font-bold px-3 py-1 rounded-full">
            <Store className="w-3.5 h-3.5" /> Alta de Comercio
          </div>
          <h2 className="text-2xl font-black text-gray-900">Registrar Nuevo Comercio en Atlanta</h2>
          <p className="text-xs text-gray-500">
            Publica la información de tu empresa para conectar con la comunidad local.
          </p>
        </div>

        {submitted ? (
          <div className="py-12 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-[#008753] flex items-center justify-center mx-auto">
              <CheckCircle className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">¡Registro Enviado Exitosamente!</h3>
            <p className="text-xs text-gray-500 max-w-md mx-auto">
              Tu comercio ha sido registrado. Nuestro equipo de moderación en Atlanta revisará los datos en breve.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Nombre del Comercio *</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Ej. Taquería El Sol Atlanta"
                  required
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#008753]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Eslogan Corto</label>
                <input
                  type="text"
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  placeholder="Ej. Tacos al pastor y comida mexicana auténtica"
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#008753]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Categoría Principal *</label>
                <select
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value as CategoryId)}
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#008753]"
                >
                  {CATEGORIES.map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Zona de Atlanta *</label>
                <select
                  value={zoneId}
                  onChange={(e) => setZoneId(e.target.value as AtlantaZoneId)}
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#008753]"
                >
                  {ATLANTA_ZONES.map(z => (
                    <option key={z.id} value={z.id}>{z.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Dirección Completa *</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Ej. 1200 Peachtree St NE, Atlanta, GA 30309"
                required
                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#008753]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Teléfono Principal *</label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+1 (404) 555-0100"
                  required
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#008753]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Número de WhatsApp</label>
                <input
                  type="text"
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  placeholder="+1 (404) 555-0100"
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#008753]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Sitio Web (Opcional)</label>
                <input
                  type="text"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  placeholder="https://minegocio.com"
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#008753]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Descripción Detallada *</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe los productos, servicios y valor diferencial de tu empresa..."
                rows={3}
                required
                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#008753]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">URL de Imagen de Portada</label>
              <input
                type="text"
                value={coverImage}
                onChange={(e) => setCoverImage(e.target.value)}
                placeholder="https://images.unsplash.com/photo-..."
                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#008753]"
              />
            </div>

            {/* Plan selection */}
            <div className="pt-2">
              <label className="block text-xs font-bold text-gray-700 mb-2">Selecciona tu Plan de Exposición</label>
              <div className="grid grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setPlan('free')}
                  className={`p-3 rounded-xl border text-left text-xs transition ${
                    plan === 'free' ? 'border-[#522B8B] bg-purple-50 font-bold' : 'border-gray-200 bg-white'
                  }`}
                >
                  <div className="font-bold">Gratuito</div>
                  <div className="text-[11px] text-gray-500">$0/mes</div>
                </button>

                <button
                  type="button"
                  onClick={() => setPlan('pro')}
                  className={`p-3 rounded-xl border text-left text-xs transition relative ${
                    plan === 'pro' ? 'border-[#008753] bg-emerald-50 font-bold' : 'border-gray-200 bg-white'
                  }`}
                >
                  <div className="font-bold text-[#008753]">Destacado Pro</div>
                  <div className="text-[11px] text-gray-500">$49/mes</div>
                </button>

                <button
                  type="button"
                  onClick={() => setPlan('vip')}
                  className={`p-3 rounded-xl border text-left text-xs transition ${
                    plan === 'vip' ? 'border-amber-400 bg-amber-50 font-bold' : 'border-gray-200 bg-white'
                  }`}
                >
                  <div className="font-bold text-amber-700">VIP Premier</div>
                  <div className="text-[11px] text-gray-500">$99/mes</div>
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#008753] hover:bg-[#007044] text-white font-extrabold text-xs py-3.5 px-4 rounded-xl shadow-lg transition flex items-center justify-center gap-2 mt-4"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Enviar Comercio para Aprobación</span>
            </button>
          </form>
        )}

      </div>
    </div>
  );
};
