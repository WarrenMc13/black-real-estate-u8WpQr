import { prisma } from '@/lib/db';
import { type NextRequest, NextResponse } from 'next/server';

export async function GET() {
  try {
    const properties = await prisma.property.findMany();
    return NextResponse.json(properties);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch properties' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { address, price, description } = body;

    if (!address || typeof price !== 'number') {
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
    }

    const property = await prisma.property.create({
      data: { address, price, description }
    });

    return NextResponse.json(property, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create property' }, { status: 500 });
  }
}