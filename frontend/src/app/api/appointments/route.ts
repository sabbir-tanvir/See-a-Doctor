import { NextRequest, NextResponse } from 'next/server';
import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { sampleDoctorSchedules } from '@/data/scheduleData';

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
    
    // Update doctor schedule to mark time slot as unavailable
    try {
      // Parse time slot format "HH:MM - HH:MM"
      const [startTime, endTime] = appointmentData.timeSlot.split(' - ');
      
      // Find doctor's schedule
      const doctorId = parseInt(appointmentData.doctorId);
      const doctorScheduleIndex = sampleDoctorSchedules.findIndex(ds => ds.doctorId === doctorId);
      
      if (doctorScheduleIndex !== -1) {
        // Find the correct day in the schedule
        const dayIndex = sampleDoctorSchedules[doctorScheduleIndex].schedule.findIndex(
          day => day.date === appointmentData.appointmentDate
        );
        
        if (dayIndex !== -1) {
          // Find the correct time slot
          const timeSlotIndex = sampleDoctorSchedules[doctorScheduleIndex].schedule[dayIndex].timeSlots.findIndex(
            slot => slot.startTime === startTime.trim() && slot.endTime === endTime.trim()
          );
          
          if (timeSlotIndex !== -1) {
            // Mark the time slot as unavailable
            sampleDoctorSchedules[doctorScheduleIndex].schedule[dayIndex].timeSlots[timeSlotIndex].isAvailable = false;
            
            // Save updates to database or other persistent storage if needed
            // This would typically be a database update, but since we're using in-memory data here
            console.log('Time slot marked as unavailable:', {
              doctorId,
              date: appointmentData.appointmentDate,
              startTime,
              endTime
            });
          }
        }
      }
    } catch (scheduleError) {
      console.error('Error updating doctor schedule:', scheduleError);
      // We don't want to fail the appointment creation if schedule update fails
    }
    
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