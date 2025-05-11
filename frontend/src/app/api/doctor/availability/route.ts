import { NextRequest, NextResponse } from 'next/server';

// Function to get doctor availability
export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const doctorId = url.searchParams.get('doctorId');
    const date = url.searchParams.get('date');
    
    if (!doctorId) {
      return NextResponse.json(
        { success: false, message: 'Doctor ID is required' },
        { status: 400 }
      );
    }
    
    // Get backend API URL from environment variable
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
    
    // Construct query params
    let queryParams = `doctorId=${doctorId}`;
    if (date) {
      queryParams += `&date=${date}`;
    }
    
    // Fetch availability from backend
    const response = await fetch(`${apiUrl}/api/doctors/availability?${queryParams}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch availability: ${response.status}`);
    }

    const data = await response.json();
    
    return NextResponse.json(data);
  } catch (error: any) {
    console.error('Error fetching doctor availability:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch doctor availability'
      },
      { status: 500 }
    );
  }
}

// Function to update doctor availability
export async function POST(req: NextRequest) {
  try {
    // Get token from cookies for authentication
    const token = req.cookies.get('token')?.value;
    
    if (!token) {
      return NextResponse.json(
        { success: false, message: 'Authentication required' },
        { status: 401 }
      );
    }
    
    // Get request body
    const availability = await req.json();
    
    if (!availability.doctorId || !availability.schedule) {
      return NextResponse.json(
        { success: false, message: 'Doctor ID and schedule are required' },
        { status: 400 }
      );
    }
    
    // Get backend API URL from environment variable
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
    
    // Update availability in backend
    const response = await fetch(`${apiUrl}/api/doctors/availability`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(availability),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `Failed to update availability: ${response.status}`);
    }

    const data = await response.json();
    
    return NextResponse.json(data);
  } catch (error: any) {
    console.error('Error updating doctor availability:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: error.message || 'Failed to update doctor availability'
      },
      { status: 500 }
    );
  }
} 