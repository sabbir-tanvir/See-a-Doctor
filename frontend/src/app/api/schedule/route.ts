import { NextResponse } from 'next/server';
import { sampleDoctorSchedules, updateDoctorSchedule, DaySchedule } from '@/data/scheduleData';

// GET - Retrieve a doctor's schedule
export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const doctorId = url.searchParams.get('doctorId');
    
    if (!doctorId) {
      return NextResponse.json({ error: 'Doctor ID is required' }, { status: 400 });
    }
    
    const doctorSchedule = sampleDoctorSchedules.find(ds => ds.doctorId === Number(doctorId));
    
    if (!doctorSchedule) {
      return NextResponse.json({ error: 'Doctor schedule not found' }, { status: 404 });
    }
    
    return NextResponse.json(doctorSchedule);
  } catch (error) {
    console.error('Error retrieving doctor schedule:', error);
    return NextResponse.json({ error: 'Failed to retrieve doctor schedule' }, { status: 500 });
  }
}

// POST - Update a doctor's schedule
export async function POST(request: Request) {
  try {
    const { doctorId, doctorEmail, schedule } = await request.json();
    
    if (!doctorId || !schedule) {
      return NextResponse.json({ error: 'Doctor ID and schedule are required' }, { status: 400 });
    }
    
    // Update the schedule in our sample data
    updateDoctorSchedule(Number(doctorId), schedule as DaySchedule[], doctorEmail);
    
    return NextResponse.json({ success: true, message: 'Schedule updated successfully' });
  } catch (error) {
    console.error('Error updating doctor schedule:', error);
    return NextResponse.json({ error: 'Failed to update doctor schedule' }, { status: 500 });
  }
}
