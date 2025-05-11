import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { connectToDatabase } from '@/lib/database';

export async function GET(req: NextRequest) {
  try {
    // Get query parameters
    const url = new URL(req.url);
    const specialization = url.searchParams.get('specialization');
    const gender = url.searchParams.get('gender');
    const hospital = url.searchParams.get('hospital');
    
    // Try direct database connection first
    try {
      await connectToDatabase();
      
      const Doctor = mongoose.models.Doctor || mongoose.model('Doctor', new mongoose.Schema({}));
      
      // Build query
      let query: any = {};
      
      if (specialization) {
        // Case-insensitive search
        query.specialization = { $regex: specialization, $options: 'i' };
      }
      
      if (gender) {
        query.gender = gender.toLowerCase();
      }
      
      if (hospital) {
        // Handle both string and object formats
        query.$or = [
          { hospital: { $regex: hospital, $options: 'i' } },
          { 'hospital.name': { $regex: hospital, $options: 'i' } }
        ];
      }
      
      // Execute query
      const doctors = await Doctor.find(query).lean();
      
      if (doctors && doctors.length > 0) {
        console.log(`Found ${doctors.length} doctors directly from MongoDB`);
        return NextResponse.json({
          success: true,
          data: doctors
        });
      }
      
      console.log('No doctors found in MongoDB, trying backend API');
    } catch (dbError) {
      console.error('Error querying MongoDB directly:', dbError);
      // Continue to backend API
    }
    
    // If direct MongoDB connection fails, try the backend API
    try {
      // Get backend API URL from environment variable
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      
      // Build backend API URL with query parameters
      let backendUrl = `${apiUrl}/api/doctors`;
      const queryParams = [];
      
      if (specialization) {
        // Map common alternative specialization names
        let specializationParam = specialization;
        
        // Handle common alternative names for specializations
        const specializationMap: Record<string, string[]> = {
          'diabetes specialist': ['diabetologist', 'endocrinologist'],
          'diabetologist': ['diabetes specialist', 'endocrinologist'],
          'endocrinologist': ['diabetes specialist', 'diabetologist'],
          'heart specialist': ['cardiologist'],
          'skin specialist': ['dermatologist'],
          'eye specialist': ['ophthalmologist']
        };
        
        // Check if we need to use alternative name
        const normalizedSpec = specialization.toLowerCase();
        if (specializationMap[normalizedSpec]) {
          // First try with the original specialization
          queryParams.push(`specialization=${encodeURIComponent(specialization)}`);
        } else {
          queryParams.push(`specialization=${encodeURIComponent(specialization)}`);
        }
      }
      
      if (gender) {
        queryParams.push(`gender=${encodeURIComponent(gender)}`);
      }
      
      if (hospital) {
        queryParams.push(`hospital=${encodeURIComponent(hospital)}`);
      }
      
      if (queryParams.length > 0) {
        backendUrl += `?${queryParams.join('&')}`;
      }
      
      // Fetch doctors from backend
      const response = await fetch(backendUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'no-store',
      });
      
      if (!response.ok) {
        throw new Error(`Failed to fetch doctors: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data && data.data && data.data.length > 0) {
        return NextResponse.json(data);
      } else {
        throw new Error('No doctors found in backend API');
      }
    } catch (backendError) {
      console.error('Error fetching from backend:', backendError);
      
      // Return not found response
      const errorMessage = specialization 
        ? `No doctors found with specialization: ${specialization}` 
        : 'No doctors found matching your criteria';
        
      return NextResponse.json(
        { 
          success: false, 
          error: errorMessage
        },
        { status: 404 }
      );
    }
  } catch (error: any) {
    console.error('Error in doctors API route:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch doctors'
      },
      { status: 500 }
    );
  }
} 