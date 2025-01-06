import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    const users = await prisma.user.findMany();
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { email, password, role, location, phone_number } = await req.json();

     // Validation
    if (!email || !password || !role || !location || !phone_number) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }


    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
        where: { email },
      });
  
      if (existingUser) {
        return NextResponse.json({ error: 'User already registered' }, { status: 400 });
      }

    const user = await prisma.user.create({
      data: {
        email,
        password,
        role,
        location,
        phone_number,
      },
    });
    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create user' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { id, email, password, role, location, phone_number, isActive } = await req.json();

     // Validation
     if (!id || !email || !password || !role || !location || !phone_number) {
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

export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();
    await prisma.user.delete({
      where: { id: Number(id) },
    });
    return NextResponse.json({}, { status: 204 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete user' }, { status: 500 });
  }
}