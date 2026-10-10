import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { AddListingForm } from '@/components/dashboard/AddListingForm';
import { UserListings } from '@/components/dashboard/UserListings';

export const metadata = {
  title: 'Mi Panel | La Guía Atlanta',
};

export default async function UserDashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/api/auth/signin');
  }

  const userId = (session.user as any).id;

  // Fetch data
  const categories = await prisma.category.findMany({ orderBy: { name: 'asc' } });
  const userListings = await prisma.listing.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="flex flex-col min-h-screen bg-[#FAF8FC]">
      <Navbar />
      
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-black text-gray-900">
            Panel de Usuario
          </h1>
          <p className="text-gray-500 mt-2">
            Hola, {(session.user as any).name || session.user?.email}. Aquí puedes gestionar tus anuncios.
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Left Column: List of ads */}
          <div className="xl:col-span-2">
            <UserListings listings={userListings} />
          </div>

          {/* Right Column: Add Ad Form */}
          <div className="xl:col-span-1">
            <AddListingForm categories={categories} />
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}
