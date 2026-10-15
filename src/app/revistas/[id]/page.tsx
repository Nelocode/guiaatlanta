'use client';

import React, { useEffect, useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import FlipbookWrapper from '@/components/magazines/FlipbookWrapper';
import { ArrowLeft, Loader2, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function MagazineDetailPage() {
  const params = useParams();
  const id = params?.id as string;

  const [magazine, setMagazine] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    fetch(`/api/magazines/${id}`)
      .then(async (res) => {
        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          throw new Error(data.error || 'No se pudo cargar la revista.');
        }
        return res.json();
      })
      .then((data) => {
        setMagazine(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 overflow-hidden">
      <Navbar />

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-8 relative">
        <Link
          href="/revistas"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition font-semibold mb-6 text-sm"
        >
          <ArrowLeft className="w-4 h-4" /> Volver a Revistas
        </Link>

        {loading ? (
          <div className="bg-gray-100 rounded-3xl p-16 shadow-2xl flex flex-col items-center justify-center min-h-[500px]">
            <Loader2 className="w-10 h-10 animate-spin text-[#522B8B] mb-4" />
            <p className="font-bold text-gray-700 animate-pulse">Cargando revista digital...</p>
          </div>
        ) : error || !magazine ? (
          <div className="bg-gray-800 border border-gray-700 rounded-3xl p-10 text-center text-white max-w-lg mx-auto my-12 shadow-2xl">
            <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
            <h2 className="text-xl font-bold mb-2">Revista no disponible</h2>
            <p className="text-gray-400 text-sm mb-6">{error || 'La revista no fue encontrada o no está activa.'}</p>
            <Link
              href="/revistas"
              className="inline-flex items-center gap-2 bg-[#008753] hover:bg-emerald-600 px-5 py-2.5 rounded-xl font-bold text-sm transition"
            >
              <ArrowLeft className="w-4 h-4" /> Explorar otras ediciones
            </Link>
          </div>
        ) : (
          <div className="bg-gray-100 rounded-3xl p-4 sm:p-10 shadow-2xl relative">
            <FlipbookWrapper pdfUrl={magazine.pdfUrl} title={magazine.title} />
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
