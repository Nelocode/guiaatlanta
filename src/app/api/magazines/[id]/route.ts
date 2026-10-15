import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(
  request: Request,
  props: { params: Promise<{ id: string }> }
) {
  try {
    const params = await props.params;
    const magazine = await prisma.magazine.findUnique({
      where: { id: params.id }
    });

    if (!magazine || !magazine.isActive) {
      return NextResponse.json({ error: 'Revista no encontrada' }, { status: 404 });
    }

    return NextResponse.json(magazine);
  } catch (error: any) {
    console.error('Error fetching magazine:', error);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}
