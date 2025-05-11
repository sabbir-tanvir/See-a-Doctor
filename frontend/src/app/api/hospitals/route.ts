import { NextResponse } from 'next/server';

// Sample hospital data as fallback
const sampleHospitals = [
  {
    _id: "hosp001",
    name: "General Hospital",
    location: "Dhaka, Bangladesh",
    specialty: "Multi-specialty",
    beds: 500,
    rating: 4.5,
    reviews: 358,
    image: "https://ext.same-assets.com/174619264/2749310568.webp"
  },
  {
    _id: "hosp002",
    name: "United Hospital",
    location: "Gulshan, Dhaka",
    specialty: "Cardiology",
    beds: 420,
    rating: 4.7,
    reviews: 412,
    image: "https://ext.same-assets.com/174619264/2749310568.webp"
  },
  {
    _id: "hosp003",
    name: "Square Hospital",
    location: "Panthapath, Dhaka",
    specialty: "Multi-specialty",
    beds: 375,
    rating: 4.6,
    reviews: 287,
    image: "https://ext.same-assets.com/174619264/2749310568.webp"
  },
  {
    _id: "hosp004",
    name: "Apollo Hospital",
    location: "Bashundhara, Dhaka",
    specialty: "Multi-specialty",
    beds: 450,
    rating: 4.8,
    reviews: 392,
    image: "https://ext.same-assets.com/174619264/2749310568.webp"
  },
  {
    _id: "hosp005",
    name: "Chittagong Medical College Hospital",
    location: "Chittagong",
    specialty: "General Medicine",
    beds: 600,
    rating: 4.2,
    reviews: 215,
    image: "https://ext.same-assets.com/174619264/2749310568.webp"
  },
  {
    _id: "hosp006",
    name: "Sylhet MAG Osmani Medical College Hospital",
    location: "Sylhet",
    specialty: "General Medicine",
    beds: 550,
    rating: 4.0,
    reviews: 180,
    image: "https://ext.same-assets.com/174619264/2749310568.webp"
  }
];

export async function GET() {
  try {
    // Get backend API URL from environment variable
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
    
    try {
      // Fetch hospitals from backend
      const response = await fetch(`${apiUrl}/api/hospitals`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'no-store',
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch hospitals: ${response.status}`);
      }

      const data = await response.json();
      return NextResponse.json(data);
    } catch (backendError) {
      console.error('Error fetching from backend, using fallback data:', backendError);
      // Return fallback data if backend API fails
      return NextResponse.json({
        success: true,
        data: sampleHospitals
      });
    }
  } catch (error: any) {
    console.error('Error in hospitals API route:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch hospitals'
      },
      { status: 500 }
    );
  }
} 