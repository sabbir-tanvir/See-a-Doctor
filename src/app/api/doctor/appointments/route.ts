import { NextRequest, NextResponse } from 'next/server';
import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

// Define appointment type
interface Appointment {
  id?: string;
  doctorId: string;
  doctorName: string;
  doctorEmail?: string;
  doctorSpecialization: string;
  appointmentType: 'chamber' | 'video' | 'phone';
  appointmentDate: string;
  timeSlot: string;
  patientName: string;
  patientPhone: string;
  patientEmail: string;
  patientAge: string;
  patientGender: string;
  patientProblem: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  userId: string;
  userEmail: string;
  createdAt?: any;
  updatedAt?: any;
}

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

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const doctorId = url.searchParams.get('doctorId');
    const doctorEmail = url.searchParams.get('doctorEmail');
    
    if (!doctorId && !doctorEmail) {
      return NextResponse.json(
        { success: false, message: 'Doctor ID or email is required' },
        { status: 400 }
      );
    }
      // Query appointments collection
    let query: FirebaseFirestore.Query<FirebaseFirestore.DocumentData> = db.collection('appointments');
    
    if (doctorId) {
      query = query.where('doctorId', '==', doctorId);
    } else if (doctorEmail) {
      query = query.where('doctorEmail', '==', doctorEmail);
    }
    
    // Order by appointment date and time
    query = query.orderBy('appointmentDate', 'asc');
    
    const snapshot = await query.get();
    
    if (snapshot.empty) {
      return NextResponse.json({ success: true, appointments: [] });
    }
    
    const appointments = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    return NextResponse.json({ success: true, appointments });
  } catch (error: any) {
    console.error('Error fetching appointments:', error);
    
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to fetch appointments' },
      { status: 500 }
    );
  }
}

// Update appointment status (confirm, complete, cancel)
export async function PATCH(req: NextRequest) {
  try {
    const { appointmentId, status } = await req.json();
    
    if (!appointmentId || !status) {
      return NextResponse.json(
        { success: false, message: 'Appointment ID and status are required' },
        { status: 400 }
      );
    }
      // Validate status
    const validStatuses: Array<'pending' | 'confirmed' | 'completed' | 'cancelled'> = ['pending', 'confirmed', 'completed', 'cancelled'];
    if (!validStatuses.includes(status as any)) {
      return NextResponse.json(
        { success: false, message: 'Invalid status. Must be pending, confirmed, completed, or cancelled' },
        { status: 400 }
      );
    }
    
    // Update appointment in Firestore
    const appointmentRef = db.collection('appointments').doc(appointmentId);
    const appointmentDoc = await appointmentRef.get();
    
    if (!appointmentDoc.exists) {
      return NextResponse.json(
        { success: false, message: 'Appointment not found' },
        { status: 404 }
      );
    }
    
    await appointmentRef.update({
      status,
      updatedAt: new Date()
    });
    
    return NextResponse.json({
      success: true,
      message: `Appointment status updated to ${status}`,
    });
  } catch (error: any) {
    console.error('Error updating appointment:', error);
    
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to update appointment' },
      { status: 500 }
    );
  }
}
