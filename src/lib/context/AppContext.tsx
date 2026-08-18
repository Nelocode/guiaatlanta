'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Listing, CategoryId, AtlantaZoneId, User, ClaimRequest, Review, PlatformMetrics } from '../types';
import { INITIAL_LISTINGS } from '../data/listings';
import { INITIAL_REVIEWS } from '../data/reviews';

type ActiveViewMode = 'public' | 'admin' | 'merchant' | 'user';

interface AppContextType {
  listings: Listing[];
  reviews: Review[];
  claims: ClaimRequest[];
  viewMode: ActiveViewMode;
  setViewMode: (mode: ActiveViewMode) => void;
  currentUser: User;
  setCurrentUser: React.Dispatch<React.SetStateAction<User>>;
  
  // Search & Filter State
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedCategory: CategoryId | 'all';
  setSelectedCategory: (c: CategoryId | 'all') => void;
  selectedZone: AtlantaZoneId | 'all';
  setSelectedZone: (z: AtlantaZoneId | 'all') => void;
  
  // Modals & Active Listing
  activeListingId: string | null;
  setActiveListingId: (id: string | null) => void;
  isAddListingOpen: boolean;
  setIsAddListingOpen: (open: boolean) => void;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  isClaimModalOpen: boolean;
  setIsClaimModalOpen: (open: boolean) => void;
  
  // Actions
  toggleFavorite: (listingId: string) => void;
  addListing: (listing: Omit<Listing, 'id' | 'createdAt' | 'metrics' | 'rating' | 'reviewCount'>) => void;
  updateListingStatus: (id: string, status: Listing['status']) => void;
  updateListingPlan: (id: string, plan: Listing['plan']) => void;
  submitReview: (listingId: string, rating: number, comment: string) => void;
  submitClaimRequest: (listingId: string, listingTitle: string, businessRole: string, phone: string) => void;
  updateClaimStatus: (claimId: string, status: 'approved' | 'rejected') => void;
  
  // Platform Metrics
  platformMetrics: PlatformMetrics;
}

const DEFAULT_USER: User = {
  id: 'u-1',
  name: 'Nelson Morales',
  email: 'nelson@laguiaatlanta.com',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
  role: 'admin',
  phone: '+1 (404) 555-0199',
  savedListingIds: ['l-1', 'l-2', 'l-5'],
  claimedListingIds: [],
  createdAt: '2026-01-01',
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [listings, setListings] = useState<Listing[]>(INITIAL_LISTINGS);
  const [reviews, setReviews] = useState<Review[]>(INITIAL_REVIEWS);
  const [viewMode, setViewMode] = useState<ActiveViewMode>('public');
  const [currentUser, setCurrentUser] = useState<User>(DEFAULT_USER);
  
  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryId | 'all'>('all');
  const [selectedZone, setSelectedZone] = useState<AtlantaZoneId | 'all'>('all');
  
  // Modals
  const [activeListingId, setActiveListingId] = useState<string | null>(null);
  const [isAddListingOpen, setIsAddListingOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isClaimModalOpen, setIsClaimModalOpen] = useState(false);

  // Claims
  const [claims, setClaims] = useState<ClaimRequest[]>([
    {
      id: 'claim-1',
      listingId: 'l-6',
      listingTitle: 'Taller Mecánico & Diagnostic Autopro Norcross',
      userId: 'u-2',
      userName: 'Roberto Méndez',
      userEmail: 'roberto@autopronorcross.com',
      userPhone: '+1 (770) 840-7733',
      businessRole: 'Propietario',
      status: 'pending',
      submittedAt: '2026-02-16',
    },
  ]);

  const toggleFavorite = (listingId: string) => {
    setCurrentUser(prev => {
      const exists = prev.savedListingIds.includes(listingId);
      const newSaved = exists
        ? prev.savedListingIds.filter(id => id !== listingId)
        : [...prev.savedListingIds, listingId];
      return { ...prev, savedListingIds: newSaved };
    });
  };

  const addListing = (newListingData: Omit<Listing, 'id' | 'createdAt' | 'metrics' | 'rating' | 'reviewCount'>) => {
    const newId = `l-${Date.now()}`;
    const fullListing: Listing = {
      ...newListingData,
      id: newId,
      createdAt: new Date().toISOString().split('T')[0],
      rating: 5.0,
      reviewCount: 1,
      metrics: { views: 12, clicks: 3, leads: 1, calls: 1, savedCount: 1 },
      status: viewMode === 'admin' ? 'active' : 'pending',
    };
    setListings(prev => [fullListing, ...prev]);
  };

  const updateListingStatus = (id: string, status: Listing['status']) => {
    setListings(prev => prev.map(item => item.id === id ? { ...item, status } : item));
  };

  const updateListingPlan = (id: string, plan: Listing['plan']) => {
    setListings(prev => prev.map(item => item.id === id ? { ...item, plan, isFeatured: plan !== 'free' } : item));
  };

  const submitReview = (listingId: string, rating: number, comment: string) => {
    const newRev: Review = {
      id: `r-${Date.now()}`,
      listingId,
      userName: currentUser.name,
      userAvatar: currentUser.avatar,
      rating,
      date: 'Hoy',
      comment,
    };
    setReviews(prev => [newRev, ...prev]);

    // Recalculate listing rating
    setListings(prev => prev.map(item => {
      if (item.id === listingId) {
        const newCount = item.reviewCount + 1;
        const newRating = Number(((item.rating * item.reviewCount + rating) / newCount).toFixed(1));
        return { ...item, reviewCount: newCount, rating: newRating };
      }
      return item;
    }));
  };

  const submitClaimRequest = (listingId: string, listingTitle: string, businessRole: string, phone: string) => {
    const newClaim: ClaimRequest = {
      id: `claim-${Date.now()}`,
      listingId,
      listingTitle,
      userId: currentUser.id,
      userName: currentUser.name,
      userEmail: currentUser.email,
      userPhone: phone,
      businessRole,
      status: 'pending',
      submittedAt: new Date().toISOString().split('T')[0],
    };
    setClaims(prev => [newClaim, ...prev]);
  };

  const updateClaimStatus = (claimId: string, status: 'approved' | 'rejected') => {
    setClaims(prev => prev.map(c => {
      if (c.id === claimId) {
        if (status === 'approved') {
          // Verify listing
          setListings(lPrev => lPrev.map(l => l.id === c.listingId ? { ...l, isVerified: true, ownerId: c.userId } : l));
        }
        return { ...c, status };
      }
      return c;
    }));
  };

  // Compute Platform Metrics
  const platformMetrics: PlatformMetrics = {
    totalListings: listings.length,
    totalMerchants: listings.filter(l => l.ownerId).length + 4,
    pendingApprovals: listings.filter(l => l.status === 'pending').length + claims.filter(c => c.status === 'pending').length,
    monthlyViews: listings.reduce((acc, curr) => acc + curr.metrics.views, 0) + 12500,
    totalRevenue: listings.filter(l => l.plan === 'vip').length * 99 + listings.filter(l => l.plan === 'pro').length * 49,
    activeProSubscriptions: listings.filter(l => l.plan === 'pro').length,
    activeVipSubscriptions: listings.filter(l => l.plan === 'vip').length,
  };

  return (
    <AppContext.Provider
      value={{
        listings,
        reviews,
        claims,
        viewMode,
        setViewMode,
        currentUser,
        setCurrentUser,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        selectedZone,
        setSelectedZone,
        activeListingId,
        setActiveListingId,
        isAddListingOpen,
        setIsAddListingOpen,
        isAuthModalOpen,
        setIsAuthModalOpen,
        isClaimModalOpen,
        setIsClaimModalOpen,
        toggleFavorite,
        addListing,
        updateListingStatus,
        updateListingPlan,
        submitReview,
        submitClaimRequest,
        updateClaimStatus,
        platformMetrics,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
