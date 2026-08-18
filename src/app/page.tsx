'use client';

import React from 'react';
import { useApp } from '@/lib/context/AppContext';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

// Home Public Sections
import { Hero } from '@/components/home/Hero';
import { CategoriesSection } from '@/components/home/CategoriesSection';
import { FeaturedListings } from '@/components/home/FeaturedListings';
import { NeighborhoodsSection } from '@/components/home/NeighborhoodsSection';
import { MerchantProcessSection } from '@/components/home/MerchantProcessSection';
import { PricingSection } from '@/components/home/PricingSection';

// Modals
import { ListingDetailModal } from '@/components/listings/ListingDetailModal';
import { AuthModal } from '@/components/modals/AuthModal';
import { AddListingModal } from '@/components/modals/AddListingModal';
import { ClaimModal } from '@/components/modals/ClaimModal';

// Dashboards
import { AdminDashboard } from '@/components/dashboard/AdminDashboard';
import { MerchantDashboard } from '@/components/dashboard/MerchantDashboard';
import { UserDashboard } from '@/components/dashboard/UserDashboard';

export default function Home() {
  const { viewMode } = useApp();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1">
        {viewMode === 'public' && (
          <>
            <Hero />
            <CategoriesSection />
            <FeaturedListings />
            <NeighborhoodsSection />
            <MerchantProcessSection />
            <PricingSection />
          </>
        )}

        {viewMode === 'admin' && <AdminDashboard />}
        {viewMode === 'merchant' && <MerchantDashboard />}
        {viewMode === 'user' && <UserDashboard />}
      </main>

      <Footer />

      {/* Global Interactive Modals */}
      <ListingDetailModal />
      <AuthModal />
      <AddListingModal />
      <ClaimModal />
    </div>
  );
}
