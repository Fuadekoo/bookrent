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
  const url = new URL(req.url);
  const rentId = url.pathname.split('/').pop();
  const verification = await verifyToken(req);
  if (verification.error) {
    return NextResponse.json({ error: verification.error }, { status: verification.status });
  }

  try {
    const rent = await prisma.rent.findUnique({
      where: { id: Number(rentId) },
    });
    if (rent) {
      return NextResponse.json(rent, { status: 200 });
    } else {
      return NextResponse.json({ error: 'Rent not found' }, { status: 404 });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch rent' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const url = new URL(req.url);
  const rentId = url.pathname.split('/').pop();
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

    const rent = await prisma.rent.update({
      where: { id: Number(rentId) },
      data: {
        bookId,
        userId,
        rentDate: new Date(rentDate),
        returnDate: new Date(returnDate),
      },
    });

    return NextResponse.json(rent, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update rent' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const url = new URL(req.url);
  const rentId = url.pathname.split('/').pop();
  const verification = await verifyToken(req);
  if (verification.error) {
    return NextResponse.json({ error: verification.error }, { status: verification.status });
  }

  try {
    await prisma.rent.delete({
      where: { id: Number(rentId) },
    });

    return NextResponse.json({ message: 'Rent deleted successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete rent' }, { status: 500 });
  }
}