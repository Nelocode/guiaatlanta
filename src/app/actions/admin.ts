'use server';

import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { revalidatePath } from 'next/cache';

export async function createCategory(formData: FormData) {
  const session = await getServerSession(authOptions);
  
  // Verify if user is admin
  if (!session || (session.user as any).role !== 'admin') {
    throw new Error('No autorizado. Solo los administradores pueden crear categorías.');
  }

  const name = formData.get('name') as string;
  const slug = formData.get('slug') as string;
  const icon = formData.get('icon') as string || 'box';
  const description = formData.get('description') as string;

  if (!name || !slug) {
    throw new Error('El nombre y el slug son obligatorios');
  }

  try {
    const category = await prisma.category.create({
      data: {
        name,
        slug: slug.toLowerCase().replace(/\s+/g, '-'),
        icon,
        description,
      },
    });

    revalidatePath('/'); // Refresh homepage
    revalidatePath('/dashboard/admin'); // Refresh admin dashboard
    
    return { success: true, category };
  } catch (error: any) {
    console.error('Error creating category:', error);
    return { success: false, error: 'Error al crear la categoría. El slug podría estar duplicado.' };
  }
}

export async function deleteCategory(id: string) {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any).role !== 'admin') {
    throw new Error('No autorizado');
  }

  try {
    await prisma.category.delete({
      where: { id },
    });
    revalidatePath('/');
    revalidatePath('/dashboard/admin');
    return { success: true };
  } catch (error) {
    return { success: false, error: 'No se puede eliminar la categoría. Asegúrate de que no tenga anuncios asociados.' };
  }
}
