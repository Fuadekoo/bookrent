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
  
    const { decoded } = verification;
  
    try {
      let books;
      if (decoded.role === 'admin') {
        books = await prisma.book.findMany();
      } else if (decoded.role === 'owner') {
        books = await prisma.book.findMany({
          where: { ownerId: decoded.id },
        });
      } else {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
      }
  
      return NextResponse.json(books, { status: 200 });
    } catch (error) {
      return NextResponse.json({ error: 'Failed to fetch books' }, { status: 500 });
    }
  }

export async function POST(req: NextRequest) {
  const authHeader = req.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const token = authHeader.split(' ')[1];
  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  }

  if (decoded.role !== 'owner') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const form = new FormData();
  await new Promise((resolve, reject) => {
    upload.single('coverPhoto')(req, {}, (err) => {
      if (err) return reject(err);
      resolve(null);
    });
  });

  try {
    const { title, author, description, quantity } = req.body;
    const coverPhoto = req.file;

    // Validation
    if (!title || !author || !quantity || !coverPhoto) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    // Save book details in the database
    const book = await prisma.book.create({
      data: {
        title,
        author,
        description,
        quantity,
        coverPhoto: `/uploads/${coverPhoto.filename}`,
        ownerId: decoded.id,
      },
    });

    return NextResponse.json(book, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to add book' }, { status: 500 });
  }
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