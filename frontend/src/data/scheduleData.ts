export type TimeSlot = {
  startTime: string; // format: "HH:MM" (24-hour)
  endTime: string; // format: "HH:MM" (24-hour)
  isAvailable: boolean;
};

export type DaySchedule = {
  date: string; // ISO date string format: "YYYY-MM-DD"
  timeSlots: TimeSlot[];
};

export type DoctorSchedule = {
  doctorId: number;
  doctorEmail?: string; // Add email for easier lookup
  schedule: DaySchedule[];
};

// Sample data
export const sampleDoctorSchedules: DoctorSchedule[] = [
  {
    doctorId: 1,
    schedule: [
      {
        date: "2025-05-12", // Tomorrow
        timeSlots: [
          { startTime: "09:00", endTime: "09:30", isAvailable: true },
          { startTime: "09:30", endTime: "10:00", isAvailable: true },
          { startTime: "10:00", endTime: "10:30", isAvailable: true },
          { startTime: "10:30", endTime: "11:00", isAvailable: false },
          { startTime: "11:00", endTime: "11:30", isAvailable: true },
          { startTime: "11:30", endTime: "12:00", isAvailable: true },
          { startTime: "16:00", endTime: "16:30", isAvailable: true },
          { startTime: "16:30", endTime: "17:00", isAvailable: true },
          { startTime: "17:00", endTime: "17:30", isAvailable: true },
          { startTime: "17:30", endTime: "18:00", isAvailable: true },
        ]
      },
      {
        date: "2025-05-13", // Day after tomorrow
        timeSlots: [
          { startTime: "09:00", endTime: "09:30", isAvailable: true },
          { startTime: "09:30", endTime: "10:00", isAvailable: true },
          { startTime: "10:00", endTime: "10:30", isAvailable: false },
          { startTime: "10:30", endTime: "11:00", isAvailable: false },
          { startTime: "11:00", endTime: "11:30", isAvailable: true },
          { startTime: "11:30", endTime: "12:00", isAvailable: true },
          { startTime: "16:00", endTime: "16:30", isAvailable: true },
          { startTime: "16:30", endTime: "17:00", isAvailable: true },
          { startTime: "17:00", endTime: "17:30", isAvailable: false },
          { startTime: "17:30", endTime: "18:00", isAvailable: true },
        ]
      },
      {
        date: "2025-05-14", // Two days after tomorrow
        timeSlots: [
          { startTime: "09:00", endTime: "09:30", isAvailable: true },
          { startTime: "09:30", endTime: "10:00", isAvailable: true },
          { startTime: "10:00", endTime: "10:30", isAvailable: true },
          { startTime: "10:30", endTime: "11:00", isAvailable: true },
          { startTime: "11:00", endTime: "11:30", isAvailable: false },
          { startTime: "11:30", endTime: "12:00", isAvailable: false },
          { startTime: "16:00", endTime: "16:30", isAvailable: true },
          { startTime: "16:30", endTime: "17:00", isAvailable: true },
          { startTime: "17:00", endTime: "17:30", isAvailable: true },
          { startTime: "17:30", endTime: "18:00", isAvailable: true },
        ]
      }
    ]
  },
  {
    doctorId: 2,
    schedule: [
      {
        date: "2025-05-12", // Tomorrow
        timeSlots: [
          { startTime: "10:00", endTime: "10:30", isAvailable: true },
          { startTime: "10:30", endTime: "11:00", isAvailable: true },
          { startTime: "11:00", endTime: "11:30", isAvailable: true },
          { startTime: "11:30", endTime: "12:00", isAvailable: true },
          { startTime: "14:00", endTime: "14:30", isAvailable: true },
          { startTime: "14:30", endTime: "15:00", isAvailable: true },
          { startTime: "15:00", endTime: "15:30", isAvailable: false },
          { startTime: "15:30", endTime: "16:00", isAvailable: false },
        ]
      },
      {
        date: "2025-05-13", // Day after tomorrow
        timeSlots: [
          { startTime: "10:00", endTime: "10:30", isAvailable: true },
          { startTime: "10:30", endTime: "11:00", isAvailable: true },
          { startTime: "11:00", endTime: "11:30", isAvailable: false },
          { startTime: "11:30", endTime: "12:00", isAvailable: false },
          { startTime: "14:00", endTime: "14:30", isAvailable: true },
          { startTime: "14:30", endTime: "15:00", isAvailable: true },
          { startTime: "15:00", endTime: "15:30", isAvailable: true },
          { startTime: "15:30", endTime: "16:00", isAvailable: true },
        ]
      }
    ]
  }
];

// Helper functions for working with schedules
export function getAvailableDates(doctorId: number): string[] {
  const doctorSchedule = sampleDoctorSchedules.find(ds => ds.doctorId === doctorId);
  if (!doctorSchedule) return [];
  
  return doctorSchedule.schedule.map(day => day.date);
}

export function getAvailableTimeSlots(doctorId: number, date: string): TimeSlot[] {
  const doctorSchedule = sampleDoctorSchedules.find(ds => ds.doctorId === doctorId);
  if (!doctorSchedule) return [];
  
  const daySchedule = doctorSchedule.schedule.find(day => day.date === date);
  if (!daySchedule) return [];
  
  return daySchedule.timeSlots.filter(slot => slot.isAvailable);
}

export function updateDoctorSchedule(doctorId: number, updatedSchedule: DaySchedule[], doctorEmail?: string): void {
  const scheduleIndex = sampleDoctorSchedules.findIndex(ds => ds.doctorId === doctorId);
  
  if (scheduleIndex >= 0) {
    // Update existing schedule
    sampleDoctorSchedules[scheduleIndex].schedule = updatedSchedule;
    if (doctorEmail) {
      sampleDoctorSchedules[scheduleIndex].doctorEmail = doctorEmail;
    }
  } else {
    // Create new schedule
    sampleDoctorSchedules.push({
      doctorId,
      doctorEmail,
      schedule: updatedSchedule
    });
  }
}

// Function to find a doctor's schedule by email
export function getDoctorScheduleByEmail(email: string): DoctorSchedule | undefined {
  return sampleDoctorSchedules.find(ds => ds.doctorEmail === email);
}

// Function to find a doctor's ID by email
export function getDoctorIdByEmail(email: string): number | undefined {
  const schedule = getDoctorScheduleByEmail(email);
  return schedule?.doctorId;
}

// Function to generate empty schedule for a given date range
export function generateEmptySchedule(doctorId: number, startDate: Date, numDays: number, doctorEmail?: string): DoctorSchedule {
  const schedule: DaySchedule[] = [];
  
  for (let i = 0; i < numDays; i++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);
    
    const formattedDate = date.toISOString().split('T')[0];
    
    // Create default time slots - morning and evening hours
    const morningSlots = ["09:00", "09:30", "10:00", "10:30", "11:00", "11:30"];
    const eveningSlots = ["16:00", "16:30", "17:00", "17:30", "18:00", "18:30"];
    
    const timeSlots: TimeSlot[] = [];
    
    // Add morning slots
    for (let j = 0; j < morningSlots.length - 1; j++) {
      timeSlots.push({
        startTime: morningSlots[j],
        endTime: morningSlots[j + 1],
        isAvailable: true
      });
    }
    
    // Add evening slots
    for (let j = 0; j < eveningSlots.length - 1; j++) {
      timeSlots.push({
        startTime: eveningSlots[j],
        endTime: eveningSlots[j + 1],
        isAvailable: true
      });
    }
    
    schedule.push({
      date: formattedDate,
      timeSlots
    });
  }
    return {
    doctorId,
    doctorEmail,
    schedule
  };
}
