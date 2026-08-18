'use client';

import React from 'react';
import { useApp } from '@/lib/context/AppContext';
import { 
  ShieldCheck, 
  Building2, 
  Users, 
  Eye, 
  DollarSign, 
  Clock, 
  Check, 
  X, 
  Crown, 
  Trash2, 
  AlertCircle,
  Sparkles,
  Search,
  Filter
} from 'lucide-react';
import { ListingStatus, MembershipPlan } from '@/lib/types';

export const AdminDashboard: React.FC = () => {
  const { 
    listings, 
    claims, 
    platformMetrics, 
    updateListingStatus, 
    updateListingPlan, 
    updateClaimStatus,
    setActiveListingId
  } = useApp();

  const [filterStatus, setFilterStatus] = React.useState<string>('all');
  const [adminSearch, setAdminSearch] = React.useState<string>('');

  const pendingListings = listings.filter(l => l.status === 'pending');
  const pendingClaims = claims.filter(c => c.status === 'pending');

  const filteredDirectory = listings.filter(item => {
    if (filterStatus !== 'all' && item.status !== filterStatus) return false;
    if (adminSearch.trim() !== '') {
      const q = adminSearch.toLowerCase();
      return item.title.toLowerCase().includes(q) || item.categoryName.toLowerCase().includes(q) || item.zoneName.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div className="py-10 bg-[#FAF8FC] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Top Header Banner */}
        <div className="bg-[#522B8B] text-white p-8 rounded-3xl shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
          <div className="relative z-10 space-y-2">
            <div className="inline-flex items-center gap-2 bg-[#008753] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4" /> Panel Administrativo Super-Admin
            </div>
            <h1 className="text-3xl font-black">Control General de La Guía Atlanta</h1>
            <p className="text-xs text-purple-200">
              Supervisión de comercios, aprobación de solicitudes de verificación e métricas globales de ingresos.
            </p>
          </div>

          <div className="relative z-10 flex items-center gap-3">
            <div className="bg-white/10 backdrop-blur-md px-4 py-3 rounded-2xl border border-white/20 text-center">
              <p className="text-2xl font-black text-amber-300">{pendingListings.length + pendingClaims.length}</p>
              <p className="text-[10px] text-purple-200 uppercase font-bold">Solicitudes Pendientes</p>
            </div>
          </div>
        </div>

        {/* Platform KPI Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-5">
          <div className="bg-white p-5 rounded-2xl border border-purple-100 shadow-sm space-y-2">
            <div className="flex items-center justify-between text-xs text-gray-500 font-semibold">
              <span>Total Comercios</span>
              <Building2 className="w-4 h-4 text-[#522B8B]" />
            </div>
            <p className="text-2xl font-black text-gray-900">{platformMetrics.totalListings}</p>
            <p className="text-[11px] text-[#008753] font-bold">+12% este mes</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-purple-100 shadow-sm space-y-2">
            <div className="flex items-center justify-between text-xs text-gray-500 font-semibold">
              <span>Empresarios</span>
              <Users className="w-4 h-4 text-[#008753]" />
            </div>
            <p className="text-2xl font-black text-gray-900">{platformMetrics.totalMerchants}</p>
            <p className="text-[11px] text-purple-700 font-bold">Cuentas activas</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-purple-100 shadow-sm space-y-2">
            <div className="flex items-center justify-between text-xs text-gray-500 font-semibold">
              <span>Visitas Mensuales</span>
              <Eye className="w-4 h-4 text-amber-500" />
            </div>
            <p className="text-2xl font-black text-gray-900">{platformMetrics.monthlyViews.toLocaleString()}</p>
            <p className="text-[11px] text-emerald-600 font-bold">+28% tráfico web</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-purple-100 shadow-sm space-y-2">
            <div className="flex items-center justify-between text-xs text-gray-500 font-semibold">
              <span>Suscripciones Pro/VIP</span>
              <Crown className="w-4 h-4 text-amber-500" />
            </div>
            <p className="text-2xl font-black text-gray-900">{platformMetrics.activeProSubscriptions + platformMetrics.activeVipSubscriptions}</p>
            <p className="text-[11px] text-amber-600 font-bold">Planes de pago</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-purple-100 shadow-sm space-y-2">
            <div className="flex items-center justify-between text-xs text-gray-500 font-semibold">
              <span>Ingresos Est.</span>
              <DollarSign className="w-4 h-4 text-[#008753]" />
            </div>
            <p className="text-2xl font-black text-emerald-700">${platformMetrics.totalRevenue} / mes</p>
            <p className="text-[11px] text-gray-500 font-medium">Facturación activa</p>
          </div>
        </div>

        {/* Moderation Queue Section */}
        {(pendingListings.length > 0 || pendingClaims.length > 0) && (
          <div className="bg-amber-50/60 border border-amber-200 rounded-3xl p-6 space-y-6">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-amber-600 animate-spin" />
              <h2 className="text-xl font-black text-amber-950">Cola de Moderación & Reclamos Pendientes</h2>
            </div>

            {/* Pending Listings */}
            {pendingListings.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-amber-800">Comercios Esperando Aprobación</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {pendingListings.map(item => (
                    <div key={item.id} className="bg-white p-4 rounded-2xl border border-amber-200 flex items-center justify-between gap-4 shadow-sm">
                      <div>
                        <span className="text-[10px] font-extrabold uppercase bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">
                          {item.categoryName}
                        </span>
                        <h4 className="text-sm font-bold text-gray-900 mt-1">{item.title}</h4>
                        <p className="text-xs text-gray-500">{item.address} ({item.zoneName})</p>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateListingStatus(item.id, 'active')}
                          className="p-2 bg-[#008753] hover:bg-[#007044] text-white rounded-xl text-xs font-bold shadow flex items-center gap-1"
                          title="Aprobar y Publicar"
                        >
                          <Check className="w-4 h-4" /> Aprobar
                        </button>

                        <button
                          onClick={() => updateListingStatus(item.id, 'rejected')}
                          className="p-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold shadow"
                          title="Rechazar"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Pending Claim Requests */}
            {pendingClaims.length > 0 && (
              <div className="space-y-3 pt-4 border-t border-amber-200">
                <h3 className="text-xs font-bold uppercase tracking-wider text-amber-800">Solicitudes de Reclamo de Propiedad</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {pendingClaims.map(claim => (
                    <div key={claim.id} className="bg-white p-4 rounded-2xl border border-amber-200 flex items-center justify-between gap-4 shadow-sm">
                      <div>
                        <h4 className="text-sm font-bold text-gray-900">{claim.listingTitle}</h4>
                        <p className="text-xs text-gray-600">Reclamado por: <strong>{claim.userName}</strong> ({claim.businessRole})</p>
                        <p className="text-xs text-gray-500">Tel: {claim.userPhone} • Email: {claim.userEmail}</p>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateClaimStatus(claim.id, 'approved')}
                          className="p-2 bg-[#522B8B] text-white rounded-xl text-xs font-bold shadow flex items-center gap-1"
                        >
                          <Check className="w-4 h-4" /> Aprobar
                        </button>

                        <button
                          onClick={() => updateClaimStatus(claim.id, 'rejected')}
                          className="p-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-xl text-xs font-bold"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        )}

        {/* Directory Management Table */}
        <div className="bg-white rounded-3xl p-8 border border-purple-100 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-black text-gray-900">Directorio Completo de Comercios</h2>
              <p className="text-xs text-gray-500">Gestión de estado de publicación, planes de membresía e información.</p>
            </div>

            {/* Controls */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="relative">
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={adminSearch}
                  onChange={(e) => setAdminSearch(e.target.value)}
                  placeholder="Buscar negocio..."
                  className="pl-9 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#008753]"
                />
              </div>

              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs font-semibold text-gray-700 focus:outline-none"
              >
                <option value="all">Todos los Estados</option>
                <option value="active">Activos</option>
                <option value="pending">Pendientes</option>
                <option value="rejected">Rechazados</option>
              </select>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-purple-50 text-[#522B8B] font-bold uppercase tracking-wider">
                <tr>
                  <th className="p-4 rounded-l-xl">Comercio</th>
                  <th className="p-4">Categoría & Zona</th>
                  <th className="p-4">Estado</th>
                  <th className="p-4">Plan de Membresía</th>
                  <th className="p-4">Métricas</th>
                  <th className="p-4 rounded-r-xl text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredDirectory.map((item) => (
                  <tr key={item.id} className="hover:bg-purple-50/30 transition">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <img src={item.coverImage} alt="" className="w-10 h-10 rounded-xl object-cover" />
                        <div>
                          <p 
                            onClick={() => setActiveListingId(item.id)}
                            className="font-bold text-gray-900 hover:text-[#522B8B] cursor-pointer"
                          >
                            {item.title}
                          </p>
                          <p className="text-[11px] text-gray-500">{item.phone}</p>
                        </div>
                      </div>
                    </td>

                    <td className="p-4">
                      <p className="font-semibold text-gray-800">{item.categoryName}</p>
                      <p className="text-[11px] text-gray-500">{item.zoneName}</p>
                    </td>

                    <td className="p-4">
                      <select
                        value={item.status}
                        onChange={(e) => updateListingStatus(item.id, e.target.value as ListingStatus)}
                        className={`font-extrabold text-[11px] px-2.5 py-1 rounded-lg border cursor-pointer ${
                          item.status === 'active' 
                            ? 'bg-emerald-50 text-[#008753] border-emerald-200' 
                            : item.status === 'pending'
                            ? 'bg-amber-50 text-amber-800 border-amber-200'
                            : 'bg-rose-50 text-rose-700 border-rose-200'
                        }`}
                      >
                        <option value="active">Activo</option>
                        <option value="pending">Pendiente</option>
                        <option value="rejected">Rechazado</option>
                      </select>
                    </td>

                    <td className="p-4">
                      <select
                        value={item.plan}
                        onChange={(e) => updateListingPlan(item.id, e.target.value as MembershipPlan)}
                        className="font-bold text-[11px] bg-gray-50 border border-gray-200 rounded-lg px-2.5 py-1 cursor-pointer"
                      >
                        <option value="free">Gratuito ($0)</option>
                        <option value="pro">Pro ($49)</option>
                        <option value="vip">VIP Premier ($99)</option>
                      </select>
                    </td>

                    <td className="p-4 text-gray-600 font-mono text-[11px]">
                      {item.metrics.views} vistas • {item.metrics.calls} llamadas
                    </td>

                    <td className="p-4 text-right">
                      <button
                        onClick={() => setActiveListingId(item.id)}
                        className="text-[#522B8B] hover:underline font-bold text-xs"
                      >
                        Ver Detalle
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>

      </div>
    </div>
  );
};
