'use client';

import React from 'react';
import { Logo } from '../ui/Logo';
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import { 
  PlusCircle, 
  Heart, 
  User as UserIcon, 
  Sparkles,
  Menu,
  X,
  LogOut,
  LayoutDashboard
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { data: session } = useSession();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const isAdmin = session?.user && (session.user as any).role === 'admin';

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-purple-900/10 transition-all">
      {/* Top Notification Bar */}
      <div className="bg-[#522B8B] text-white text-xs py-1.5 px-4 sm:px-8 flex flex-wrap justify-between items-center gap-2">
        <div className="flex items-center gap-2 font-medium">
          <span className="bg-[#008753] text-white text-[10px] uppercase font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
            <Sparkles className="w-3 h-3" /> Oficial
          </span>
          <span className="hidden sm:inline">El directorio comercial & gastronómico #1 de Atlanta, Georgia</span>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-8">
          <Link href="/">
            <Logo size="md" />
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-semibold text-gray-700">
            <Link href="/#destacados" className="hover:text-[#522B8B] transition">Destacados</Link>
            <Link href="/#categorias" className="hover:text-[#522B8B] transition">Categorías</Link>
            <Link href="/revistas" className="hover:text-[#522B8B] transition font-bold text-[#008753]">Revistas Digitales</Link>
          </nav>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          
          {session ? (
            <div className="flex items-center gap-3">
              <Link
                href={isAdmin ? "/dashboard/admin" : "/dashboard/user"}
                className="hidden sm:flex items-center gap-2 px-3.5 py-2 text-sm font-semibold text-[#522B8B] bg-purple-50 hover:bg-purple-100 rounded-xl transition border border-purple-200"
              >
                <LayoutDashboard className="w-4 h-4 text-[#522B8B]" />
                <span>Panel {isAdmin ? 'Admin' : 'Usuario'}</span>
              </Link>
              <button
                onClick={() => signOut({ callbackUrl: '/' })}
                className="hidden sm:flex items-center gap-2 px-3.5 py-2 text-sm font-semibold text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition"
                title="Cerrar sesión"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <Link
              href="/api/auth/signin"
              className="hidden sm:flex items-center gap-2 px-3.5 py-2 text-sm font-semibold text-[#522B8B] bg-purple-50 hover:bg-purple-100 rounded-xl transition border border-purple-200"
            >
              <UserIcon className="w-4 h-4 text-[#522B8B]" />
              <span>Ingresar</span>
            </Link>
          )}

          {/* Add Business CTA */}
          <Link
            href={session ? "/dashboard/user" : "/api/auth/signin"}
            className="bg-[#008753] hover:bg-[#007246] text-white text-sm font-bold px-4 py-2.5 rounded-xl shadow-md hover:shadow-lg transition transform hover:-translate-y-0.5 flex items-center gap-2"
          >
            <PlusCircle className="w-4 h-4" />
            <span className="hidden xs:inline">Publicar Anuncio</span>
          </Link>

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
            <Link href="/#destacados" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-gray-100">Destacados</Link>
            <Link href="/#categorias" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-gray-100">Categorías</Link>
            <Link href="/revistas" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-gray-100">Revistas Digitales</Link>
            
            {session ? (
              <>
                <Link href={isAdmin ? "/dashboard/admin" : "/dashboard/user"} className="py-2 border-b border-gray-100 text-[#522B8B]">Ir a mi Panel</Link>
                <button onClick={() => signOut()} className="py-2 text-left text-red-600">Cerrar Sesión</button>
              </>
            ) : (
              <Link href="/api/auth/signin" className="py-2 border-b border-gray-100 text-[#522B8B]">Iniciar Sesión</Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};
