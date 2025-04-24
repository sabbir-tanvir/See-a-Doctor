import { NextRequest, NextResponse } from 'next/server';
import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

// Initialize Firebase Admin if it hasn't been initialized
if (!getApps().length) {
  initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    }),
  });
}

const db = getFirestore();

export async function POST(req: NextRequest) {
  try {
    const appointmentData = await req.json();
    
    // Validate the appointment data
    if (!appointmentData.doctorId || !appointmentData.appointmentDate || !appointmentData.timeSlot) {
      return NextResponse.json(
        { success: false, message: 'Missing required appointment details' },
        { status: 400 }
      );
    }
    
    // Add server timestamp
    appointmentData.createdAt = new Date();
    
    // Add the appointment to Firestore
    const appointmentRef = await db.collection('appointments').add(appointmentData);
    
    return NextResponse.json({
      success: true,
      message: 'Appointment booked successfully',
      appointmentId: appointmentRef.id,
    });
  } catch (error: any) {
    console.error('Error creating appointment:', error);
    
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to create appointment' },
      { status: 500 }
    );
  }
}