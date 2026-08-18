export type CategoryId = 
  | 'gastronomia'
  | 'servicios-profesionales'
  | 'salud-bienestar'
  | 'eventos-entretenimiento'
  | 'tiendas-moda'
  | 'auto-transporte'
  | 'hogar-inmobiliaria'
  | 'educacion-comunidad';

export interface Category {
  id: CategoryId;
  name: string;
  slug: string;
  iconName: string;
  description: string;
  listingCount: number;
  image: string;
}

export type AtlantaZoneId = 
  | 'midtown'
  | 'buckhead'
  | 'downtown'
  | 'decatur'
  | 'alpharetta'
  | 'sandy-springs'
  | 'roswell'
  | 'duluth'
  | 'norcross'
  | 'marietta';

export interface AtlantaZone {
  id: AtlantaZoneId;
  name: string;
  description: string;
  image: string;
  listingCount: number;
}

export interface OperatingHours {
  monday: string;
  tuesday: string;
  wednesday: string;
  thursday: string;
  friday: string;
  saturday: string;
  sunday: string;
}

export interface ListingMetrics {
  views: number;
  clicks: number;
  leads: number;
  calls: number;
  savedCount: number;
}

export type MembershipPlan = 'free' | 'pro' | 'vip';
export type ListingStatus = 'active' | 'pending' | 'rejected';

export interface Listing {
  id: string;
  title: string;
  slug: string;
  tagline: string;
  description: string;
  categoryId: CategoryId;
  categoryName: string;
  zoneId: AtlantaZoneId;
  zoneName: string;
  address: string;
  city: string;
  zipCode: string;
  phone: string;
  whatsapp: string;
  website: string;
  email: string;
  rating: number;
  reviewCount: number;
  isVerified: boolean;
  isFeatured: boolean;
  status: ListingStatus;
  priceRange: '$' | '$$' | '$$$' | '$$$$';
  hours: OperatingHours;
  images: string[];
  coverImage: string;
  amenities: string[];
  ownerId?: string;
  ownerName?: string;
  plan: MembershipPlan;
  metrics: ListingMetrics;
  createdAt: string;
  featuredOrder?: number;
}

export interface Review {
  id: string;
  listingId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  date: string;
  comment: string;
  ownerResponse?: {
    response: string;
    date: string;
  };
}

export type UserRole = 'admin' | 'merchant' | 'user';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: UserRole;
  phone?: string;
  savedListingIds: string[];
  claimedListingIds: string[];
  createdAt: string;
}

export interface ClaimRequest {
  id: string;
  listingId: string;
  listingTitle: string;
  userId: string;
  userName: string;
  userEmail: string;
  userPhone: string;
  businessRole: string; // e.g. "Propietario", "Gerente"
  verificationDocUrl?: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: string;
}

export interface PlatformMetrics {
  totalListings: number;
  totalMerchants: number;
  pendingApprovals: number;
  monthlyViews: number;
  totalRevenue: number;
  activeProSubscriptions: number;
  activeVipSubscriptions: number;
}
