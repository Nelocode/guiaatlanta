'use server';

import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { revalidatePath } from 'next/cache';

export async function createListing(formData: FormData) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    throw new Error('Debes iniciar sesión para publicar un anuncio.');
  }

  const userId = (session.user as any).id;
  const title = formData.get('title') as string;
  const description = formData.get('description') as string;
  const price = formData.get('price') as string;
  const categoryId = formData.get('categoryId') as string;
  const condition = formData.get('condition') as string;
  const locationText = formData.get('locationText') as string;
  const contactPhone = formData.get('contactPhone') as string;
  const contactWhatsapp = formData.get('contactWhatsapp') as string;
  
  if (!title || !categoryId) {
    throw new Error('El título y la categoría son obligatorios.');
  }

  try {
    const listing = await prisma.listing.create({
      data: {
        userId,
        categoryId,
        title,
        description,
        price: price ? parseFloat(price) : null,
        condition: condition || 'new',
        locationText: locationText || 'Atlanta, GA',
        contactPhone,
        contactWhatsapp,
        status: 'active',
      }
    });

    revalidatePath('/');
    revalidatePath('/dashboard/user');
    
    return { success: true, listing };
  } catch (error: any) {
    console.error('Error creating listing:', error);
    return { success: false, error: 'Hubo un problema guardando tu anuncio.' };
  }
}
