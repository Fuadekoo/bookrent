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

export async function PATCH(req: NextRequest) {
  const url = new URL(req.url);
  const bookId = url.pathname.split('/').pop();
  const verification = await verifyToken(req);
  if (verification.error) {
    return NextResponse.json({ error: verification.error }, { status: verification.status });
  }

  const { decoded } = verification;

  if (decoded.role !== 'admin') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  try {
    const { isActive } = await req.json();

    // Validation
    if (typeof isActive !== 'boolean') {
      return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
    }

    const book = await prisma.book.update({
      where: { id: Number(bookId) },
      data: { isActive },
    });

    return NextResponse.json({ message: 'Book status updated successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update book' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const url = new URL(req.url);
  const bookId = url.pathname.split('/').pop();
  const verification = await verifyToken(req);
  if (verification.error) {
    return NextResponse.json({ error: verification.error }, { status: verification.status });
  }

  const { decoded } = verification;

  const book = await prisma.book.findUnique({ where: { id: Number(bookId) } });
  if (!book) {
    return NextResponse.json({ error: 'Book not found' }, { status: 404 });
  }

  if (book.ownerId !== decoded.id) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  try {
    const { title, author, description, quantity } = await req.json();

    // Validation
    if (!title || !author || !quantity) {
      return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
    }

    const updatedBook = await prisma.book.update({
      where: { id: Number(bookId) },
      data: { title, author, description, quantity },
    });

    return NextResponse.json(updatedBook, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update book' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const url = new URL(req.url);
  const bookId = url.pathname.split('/').pop();
  const verification = await verifyToken(req);
  if (verification.error) {
    return NextResponse.json({ error: verification.error }, { status: verification.status });
  }

  const { decoded } = verification;

  const book = await prisma.book.findUnique({ where: { id: Number(bookId) } });
  if (!book) {
    return NextResponse.json({ error: 'Book not found' }, { status: 404 });
  }

  if (book.ownerId !== decoded.id) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  try {
    await prisma.book.delete({
      where: { id: Number(bookId) },
    });

    return NextResponse.json({ message: 'Book deleted successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete book' }, { status: 500 });
  }
}