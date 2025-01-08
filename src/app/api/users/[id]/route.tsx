import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

async function verifyAdmin(req: NextRequest) {
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
  
    if (decoded.role !== 'admin') {
      return { error: 'Forbidden', status: 403 };
    }
  
    return { decoded };
  }

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  try {
    const user = await prisma.user.findUnique({
      where: { id: Number(id) },
    });
    if (user) {
      return NextResponse.json(user, { status: 200 });
    } else {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch user' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  try {
    const { email, password, role, location, phone_number, isActive } = await req.json();

    // Validation
    if (!email || !password || !role || !location || !phone_number) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    const user = await prisma.user.update({
      where: { id: Number(id) },
      data: {
        email,
        password,
        role,
        location,
        phone_number,
        isActive,
      },
    });
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update user' }, { status: 500 });
  }
}



export async function PATCH(req: NextRequest) {
    const verification = await verifyAdmin(req);
    if (verification.error) {
      return NextResponse.json({ error: verification.error }, { status: verification.status });
    }
  
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
  
    try {
      const { isActive } = await req.json();
  
      // Validation
      if (typeof isActive !== 'boolean') {
        return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
      }
  
      const user = await prisma.user.update({
        where: { id: Number(id) },
        data: { isActive },
      });
  
      return NextResponse.json(user, { status: 200 });
    } catch (error) {
      return NextResponse.json({ error: 'Failed to update user status' }, { status: 500 });
    }
  }

export async function DELETE(req: NextRequest) {
    const verification = await verifyAdmin(req);
    if (verification.error) {
      return NextResponse.json({ error: verification.error }, { status: verification.status });
    }
  
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
  
    try {
      // Check if user exists
      const existingUser = await prisma.user.findUnique({
        where: { id: Number(id) },
      });
  
      if (!existingUser) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
      }
  
      await prisma.user.delete({
        where: { id: Number(id) },
      });
    return NextResponse.json({ message: 'User deleted successfully' }, { status: 200 });
    } catch (error) {
      return NextResponse.json({ error: 'Failed to delete user' }, { status: 500 });
    }
  }