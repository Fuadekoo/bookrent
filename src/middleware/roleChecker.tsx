import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function roleChecker(req: NextRequest, requiredRole: string) {
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

  if (decoded.role !== requiredRole) {
    return { error: 'Forbidden', status: 403 };
  }

  return { decoded };
}