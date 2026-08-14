import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getSession } from '@/lib/auth-server';

export async function PUT(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();

    const settings = await prisma.leadPopupSettings.update({
      where: { id: 'singleton' },
      data: body,
    });

    return NextResponse.json(settings);
  } catch (error) {
    console.error('Error updating popup settings:', error);
    return NextResponse.json(
      { error: 'Failed to update settings' },
      { status: 500 }
    );
  }
}
