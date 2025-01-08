import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import multer from 'multer';
import { promisify } from 'util';
import jwt from 'jsonwebtoken';

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

const secret = process.env.JWT_SECRET || 'your_jwt_secret';

const authenticate = (req: NextRequest) => {
  const authHeader = req.headers.get('Authorization');
  if (!authHeader) {
    throw new Error('Authorization header missing');
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    throw new Error('Token missing');
  }

  try {
    const decoded = jwt.verify(token, secret);
    return decoded;
  } catch (error) {
    throw new Error('Invalid token');
  }
};

export async function GET(req: NextRequest) {
  try {
    const decoded = authenticate(req);

    let books;
    if (decoded.role === 'admin') {
      books = await prisma.book.findMany();
    } else if (decoded.role === 'owner') {
      books = await prisma.book.findMany({
        where: { ownerId: decoded.id },
      });
    } else {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    return NextResponse.json(books, { status: 200 });
  } catch (error) {
    console.error('Error fetching books:', error);
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
    console.error('Error creating book:', error);
    return NextResponse.json({ error: 'Failed to create book' }, { status: 500 });
  }
}