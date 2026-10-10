import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CategoryManager } from '@/components/dashboard/CategoryManager';
import { MagazineManager } from '@/components/dashboard/MagazineManager';

export const metadata = {
  title: 'Panel de Administración | La Guía Atlanta',
};

export default async function AdminDashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/api/auth/signin');
  }
  
  if ((session.user as any).role !== 'admin') {
    redirect('/dashboard/user');
  }

  const categories = await prisma.category.findMany({ orderBy: { createdAt: 'desc' } });
  const magazines = await prisma.magazine.findMany({ orderBy: { publishedDate: 'desc' } });

  return (
    <div className="flex flex-col min-h-screen bg-[#FAF8FC]">
      <Navbar />
      
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-black text-gray-900">
            Panel de Administración
          </h1>
          <p className="text-gray-500 mt-2">
            Bienvenido, {(session.user as any).name || session.user?.email}. Aquí puedes gestionar toda la plataforma.
          </p>
        </div>

        <div className="space-y-10">
          <CategoryManager categories={categories} />
          <MagazineManager magazines={magazines} />
        </div>
      </main>

      <Footer />
    </div>
  );
}
