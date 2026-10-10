import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any).role !== 'admin') {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    const formData = await request.formData();
    
    const title = formData.get('title') as string;
    const pdfFile = formData.get('pdf') as File;
    const coverFile = formData.get('cover') as File;

    if (!title || !pdfFile || pdfFile.size === 0) {
      return NextResponse.json({ error: 'El título y el archivo PDF son obligatorios.' }, { status: 400 });
    }

    const uploadDir = join(process.cwd(), 'public', 'uploads', 'magazines');
    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true });
    }

    // Save PDF
    const pdfBuffer = Buffer.from(await pdfFile.arrayBuffer());
    const pdfName = `${Date.now()}-${pdfFile.name.replace(/\s+/g, '-')}`;
    const pdfPath = join(uploadDir, pdfName);
    await writeFile(pdfPath, pdfBuffer);
    const pdfUrl = `/uploads/magazines/${pdfName}`;

    // Save Cover if exists
    let coverUrl = null;
    if (coverFile && coverFile.size > 0) {
      const coverBuffer = Buffer.from(await coverFile.arrayBuffer());
      const coverName = `${Date.now()}-cover-${coverFile.name.replace(/\s+/g, '-')}`;
      const coverPath = join(uploadDir, coverName);
      await writeFile(coverPath, coverBuffer);
      coverUrl = `/uploads/magazines/${coverName}`;
    }

    // Insert into DB
    const magazine = await prisma.magazine.create({
      data: {
        title,
        pdfUrl,
        coverUrl,
        publishedDate: new Date(),
        isActive: true,
      }
    });

    return NextResponse.json({ success: true, magazine });

  } catch (error: any) {
    console.error('Error in API upload:', error);
    return NextResponse.json({ error: 'Ocurrió un error al procesar el archivo. Puede que sea demasiado pesado o el servidor no tiene memoria suficiente.' }, { status: 500 });
  }
}
