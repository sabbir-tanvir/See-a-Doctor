import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Get backend API URL from environment variable
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
    
    // Fetch specializations from backend
    const response = await fetch(`${apiUrl}/api/specializations`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch specializations: ${response.status}`);
    }

    const data = await response.json();
    
    return NextResponse.json(data);
  } catch (error: any) {
    console.error('Error fetching specializations:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch specializations'
      },
      { status: 500 }
    );
  }
} 