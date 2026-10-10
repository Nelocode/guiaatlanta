import { prisma } from '@/lib/prisma';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { BookOpen } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Revistas Digitales | La Guía Atlanta',
};

export default async function MagazinesPage() {
  const magazines = await prisma.magazine.findMany({
    where: { isActive: true },
    orderBy: { publishedDate: 'desc' }
  });

  return (
    <div className="flex flex-col min-h-screen bg-[#FAF8FC]">
      <Navbar />
      
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h1 className="text-4xl sm:text-5xl font-black text-gray-900 mb-4">
            Nuestras <span className="text-[#522B8B]">Revistas Digitales</span>
          </h1>
          <p className="text-lg text-gray-600">
            Explora las ediciones mensuales de La Guía Atlanta. Entrevistas, negocios recomendados y novedades de la ciudad.
          </p>
        </div>

        {magazines.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
            <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900">Próximamente</h3>
            <p className="text-gray-500">Estamos preparando nuestra primera edición digital.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {magazines.map((mag: any) => (
              <Link 
                href={`/revistas/${mag.id}`} 
                key={mag.id}
                className="group flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-purple-100 transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="aspect-[3/4] bg-gray-100 relative overflow-hidden">
                  {mag.coverUrl ? (
                    <img src={mag.coverUrl} alt={mag.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-purple-50 text-[#522B8B]">
                      <BookOpen className="w-12 h-12 opacity-50" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                    <span className="opacity-0 group-hover:opacity-100 bg-[#008753] text-white px-6 py-2 rounded-full font-bold text-sm transform scale-90 group-hover:scale-100 transition-all duration-300">
                      Leer ahora
                    </span>
                  </div>
                </div>
                <div className="p-5 text-center">
                  <h3 className="font-bold text-lg text-gray-900 group-hover:text-[#522B8B] transition">{mag.title}</h3>
                  <p className="text-sm text-gray-500 mt-1">{new Date(mag.publishedDate).toLocaleDateString('es-ES', { month: 'long', year: 'numeric' })}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
