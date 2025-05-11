export interface Appointment {
  _id: string;
  doctor: string; // Doctor ID
  patient: string; // Patient ID
  date: string;
  time: string;
  status: 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled';
  type: 'In-Person' | 'Video' | 'Phone';
  chamber?: string; // Chamber ID
  symptoms?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
} 