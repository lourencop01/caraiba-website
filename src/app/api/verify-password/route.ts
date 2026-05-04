import { NextResponse } from 'next/server';

const MAINTENANCE_PASSWORD = process.env.MAINTENANCE_PASSWORD || 'your-default-password';

export async function POST(request: Request) {
  try {
    const { password } = await request.json();

    if (password === MAINTENANCE_PASSWORD) {
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ success: false }, { status: 401 });
  } catch {
    return NextResponse.json({ success: false }, { status: 500 });
  }
} 