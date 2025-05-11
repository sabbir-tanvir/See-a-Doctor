import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    status: 'ok',
    time: new Date().toISOString(),
    doctor_education_fix: 'applied'
  });
} 