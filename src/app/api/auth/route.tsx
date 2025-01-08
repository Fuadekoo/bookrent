import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  // Validate input
  if (!email || !password) {
    return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
  }

  // Find user
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
  }

  // Check password
  const isMatch = await bcrypt.compare(password, user.password);
  // if (!isMatch) {
  //   return NextResponse.json({ error: 'password is not match' }, { status: 401 });
  // }

  // Generate JWT
  const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });

  // hide a passsowrd from sending to the client
  

  return NextResponse.json({ token:token ,user:user, status: 200 });
}