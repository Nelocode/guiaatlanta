'use server';

import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { revalidatePath } from 'next/cache';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

export async function uploadMagazine(formData: FormData) {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any).role !== 'admin') {
    throw new Error('No autorizado');
  }

  const title = formData.get('title') as string;
  const pdfFile = formData.get('pdf') as File;
  const coverFile = formData.get('cover') as File;

  if (!title || !pdfFile || pdfFile.size === 0) {
    throw new Error('El título y el archivo PDF son obligatorios.');
  }

  try {
    // Directorio de subidas (public/uploads/magazines)
    const uploadDir = join(process.cwd(), 'public', 'uploads', 'magazines');
    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true });
    }

    // Guardar PDF
    const pdfBuffer = Buffer.from(await pdfFile.arrayBuffer());
    const pdfName = `${Date.now()}-${pdfFile.name.replace(/\s+/g, '-')}`;
    const pdfPath = join(uploadDir, pdfName);
    await writeFile(pdfPath, pdfBuffer);
    const pdfUrl = `/uploads/magazines/${pdfName}`;

    // Guardar Portada (Opcional)
    let coverUrl = null;
    if (coverFile && coverFile.size > 0) {
      const coverBuffer = Buffer.from(await coverFile.arrayBuffer());
      const coverName = `${Date.now()}-cover-${coverFile.name.replace(/\s+/g, '-')}`;
      const coverPath = join(uploadDir, coverName);
      await writeFile(coverPath, coverBuffer);
      coverUrl = `/uploads/magazines/${coverName}`;
    }

    // Crear registro en BD
    const magazine = await prisma.magazine.create({
      data: {
        title,
        pdfUrl,
        coverUrl,
        publishedDate: new Date(),
        isActive: true,
      }
    });

    revalidatePath('/dashboard/admin');
    revalidatePath('/revistas');
    
    return { success: true, magazine };
  } catch (error: any) {
    console.error('Error subiendo revista:', error);
    return { success: false, error: 'Hubo un error subiendo los archivos.' };
  }
}

export async function toggleMagazineStatus(id: string, currentStatus: boolean) {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any).role !== 'admin') throw new Error('No autorizado');

  await prisma.magazine.update({
    where: { id },
    data: { isActive: !currentStatus }
  });

  revalidatePath('/dashboard/admin');
  revalidatePath('/revistas');
}

export async function deleteMagazine(id: string) {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any).role !== 'admin') throw new Error('No autorizado');

  await prisma.magazine.delete({ where: { id } });
  revalidatePath('/dashboard/admin');
  revalidatePath('/revistas');
  return { success: true };
}
