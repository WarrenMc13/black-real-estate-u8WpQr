import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

type CreateLeadRequestBody = {
  name: string;
  email: string;
  message: string;
};

export async function POST(req: Request) {
  try {
    const body: CreateLeadRequestBody | null = await req.json();

    if (!body || !body.name || !body.email || !body.message) {
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
    }

    const lead = await prisma.lead.create({
      data: {
        name: body.name,
        email: body.email,
        message: body.message,
      },
    });

    return NextResponse.json(lead);
  } catch (error) {
    console.error('Error creating lead:', error);
    return NextResponse.json({ error: 'Failed to create lead' }, { status: 500 });
  }
}