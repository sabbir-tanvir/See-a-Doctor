import { NextRequest, NextResponse } from 'next/server';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export async function POST(req: NextRequest) {
  try {
    // Parse request body
    const appointmentData = await req.json();
    
    // Validate required fields
    const requiredFields = ['doctorId', 'doctorName', 'appointmentDate', 'timeSlot', 'patientName', 'patientPhone'];
    
    for (const field of requiredFields) {
      if (!appointmentData[field]) {
        return NextResponse.json({
          success: false,
          message: `${field.replace(/([A-Z])/g, ' $1').trim()} is required`
        }, { status: 400 });
      }
    }
    
    // Add appointment to Firestore
    const appointmentRef = await addDoc(collection(db, 'appointments'), {
      ...appointmentData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    
    // Return success
    return NextResponse.json({
      success: true,
      message: 'Appointment created successfully',
      data: {
        id: appointmentRef.id,
        ...appointmentData
      }
    });
  } catch (error: any) {
    console.error('Error creating appointment:', error);
    
    return NextResponse.json({
      success: false,
      message: error.message || 'Failed to create appointment'
    }, { status: 500 });
  }
} 