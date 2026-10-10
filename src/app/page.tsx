import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

// Home Public Sections
import { Hero } from '@/components/home/Hero';
import { CategoriesSection } from '@/components/home/CategoriesSection';
import { FeaturedListings } from '@/components/home/FeaturedListings';
import { NeighborhoodsSection } from '@/components/home/NeighborhoodsSection';
import { PricingSection } from '@/components/home/PricingSection';

import { GlobalModals } from '@/components/layout/GlobalModals';
import { prisma } from '@/lib/prisma';

export default async function Home() {
  const categories = await prisma.category.findMany();
  const featuredListings = await prisma.listing.findMany({
    where: { isFeatured: true, status: 'active' },
    include: { category: true }
  });

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1">
        <Hero />
        <CategoriesSection initialCategories={categories} />
        <FeaturedListings initialListings={featuredListings} />
        <NeighborhoodsSection />
        <PricingSection />
      </main>

      <Footer />
      <GlobalModals />
    </div>
  );
}
