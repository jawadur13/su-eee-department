import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
  try {
    const programs = await prisma.program.findMany({
      select: {
        id: true,
        programName: true,
      },
      orderBy: {
        displayOrder: 'asc',
      },
    });

    // Transform to { id, name } for consistency
    const transformed = programs.map(p => ({
      id: p.id,
      name: p.programName,
    }));

    return NextResponse.json(transformed);
  } catch (error) {
    console.error('Error fetching programs:', error);
    return NextResponse.json(
      { error: 'Failed to fetch programs' },
      { status: 500 }
    );
  }
}
