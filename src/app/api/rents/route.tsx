import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

async function verifyToken(req: NextRequest) {
  const authHeader = req.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return { error: 'Unauthorized', status: 401 };
  }

  const token = authHeader.split(' ')[1];
  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return { error: 'Invalid token', status: 401 };
  }

  return { decoded };
}

export async function GET(req: NextRequest) {
  const verification = await verifyToken(req);
  if (verification.error) {
    return NextResponse.json({ error: verification.error }, { status: verification.status });
  }

  try {
    const rents = await prisma.rent.findMany();
    return NextResponse.json(rents, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch rents' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const verification = await verifyToken(req);
  if (verification.error) {
    return NextResponse.json({ error: verification.error }, { status: verification.status });
  }

  try {
    const { bookId, userId, rentDate, returnDate } = await req.json();

    // Validation
    if (!bookId || !userId || !rentDate || !returnDate) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    const rent = await prisma.rent.create({
      data: {
        bookId,
        userId,
        rentDate: new Date(rentDate),
        returnDate: new Date(returnDate),
      },
    });

    return NextResponse.json(rent, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create rent' }, { status: 500 });
  }
}