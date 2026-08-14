import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { fullName, mobileNumber, interestedProgram } = body;

    if (!fullName?.trim() || !mobileNumber?.trim() || !interestedProgram?.trim()) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const lead = await prisma.lead.create({
      data: {
        fullName: fullName.trim(),
        mobileNumber: mobileNumber.trim(),
        interestedProgram: interestedProgram.trim(),
        ipAddress: request.headers.get('x-forwarded-for') || request.ip,
        userAgent: request.headers.get('user-agent') || undefined,
      },
    });

    return NextResponse.json({ success: true, id: lead.id }, { status: 201 });
  } catch (error) {
    console.error('Lead submission error:', error);
    return NextResponse.json(
      { error: 'Failed to submit lead' },
      { status: 500 }
    );
  }
}
