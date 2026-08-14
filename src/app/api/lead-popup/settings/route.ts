import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
  try {
    let settings = await prisma.leadPopupSettings.findUnique({
      where: { id: 'singleton' },
    });

    if (!settings) {
      settings = await prisma.leadPopupSettings.create({
        data: { id: 'singleton' },
      });
    }

    return NextResponse.json(settings);
  } catch (error) {
    console.error('Error fetching popup settings:', error);
    return NextResponse.json(
      { error: 'Failed to fetch settings' },
      { status: 500 }
    );
  }
}
