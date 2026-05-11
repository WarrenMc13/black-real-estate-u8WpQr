import { prisma } from '@/lib/db';
import { type NextRequest, NextResponse } from 'next/server';

export async function GET() {
  try {
    const leads = await prisma.lead.findMany({
      include: { property: true }
    });
    return NextResponse.json(leads);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch leads' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, message, propertyId } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
    }

    const lead = await prisma.lead.create({
      data: { name, email, message, propertyId }
    });

    return NextResponse.json(lead, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create lead' }, { status: 500 });
  }
}