import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import multer from 'multer';
import { promisify } from 'util';
import { parse } from 'url';

const prisma = new PrismaClient();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });
const uploadMiddleware = promisify(upload.single('coverPhoto'));

export async function GET(req: NextRequest) {
  try {
    const books = await prisma.book.findMany();
    return NextResponse.json(books, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch books' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await uploadMiddleware(req, {}, (err) => {
      if (err) throw err;
    });

    const { title, author, description, quantity } = req.body;
    const coverPhoto = req.file ? `/uploads/${req.file.filename}` : null;

    const book = await prisma.book.create({
      data: {
        title,
        author,
        description,
        quantity: parseInt(quantity, 10),
        coverPhoto,
      },
    });

    return NextResponse.json(book, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create book' }, { status: 500 });
  }
}