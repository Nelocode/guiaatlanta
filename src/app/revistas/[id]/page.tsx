import { prisma } from '@/lib/prisma';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { notFound } from 'next/navigation';
import FlipbookWrapper from '@/components/magazines/FlipbookWrapper';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export async function generateMetadata(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const magazine = await prisma.magazine.findUnique({ where: { id: params.id } });
  if (!magazine) return { title: 'Revista no encontrada | La Guía Atlanta' };
  return { title: `${magazine.title} | Revistas | La Guía Atlanta` };
}

export default async function MagazineDetailPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const magazine = await prisma.magazine.findUnique({
    where: { id: params.id }
  });

  if (!magazine || !magazine.isActive) {
    notFound();
  }

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
        
        <div className="bg-gray-100 rounded-3xl p-4 sm:p-10 shadow-2xl relative">
          <FlipbookWrapper pdfUrl={magazine.pdfUrl} title={magazine.title} />
        </div>
      </main>

      <Footer />
    </div>
  );
}
