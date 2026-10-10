'use client';

import { ListingDetailModal } from '@/components/listings/ListingDetailModal';
import { AuthModal } from '@/components/modals/AuthModal';
import { AddListingModal } from '@/components/modals/AddListingModal';
import { ClaimModal } from '@/components/modals/ClaimModal';

export function GlobalModals() {
  return (
    <>
      <ListingDetailModal />
      <AuthModal />
      <AddListingModal />
      <ClaimModal />
    </>
  );
}
