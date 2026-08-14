import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
  try {
    const programs = await prisma.program.findMany({
      select: {
        id: true,
        name: true,
      },
      orderBy: {
        displayOrder: 'asc',
      },
    });

    return NextResponse.json(programs);
  } catch (error) {
    console.error('Error fetching programs:', error);
    return NextResponse.json(
      { error: 'Failed to fetch programs' },
      { status: 500 }
    );
  }
}
