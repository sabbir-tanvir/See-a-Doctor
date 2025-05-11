export interface Hospital {
  _id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  location: string;
  img?: string;
  rating?: number;
  reviews?: number;
  specialties: string[];
  facilities: string[];
  doctors: string[]; // Array of doctor IDs
  beds: {
    total: number;
    available: number;
    icu: number;
    emergency: number;
  };
  workingHours: {
    day: string;
    open: string;
    close: string;
  }[];
  emergency: boolean;
  ambulance: boolean;
  createdAt: string;
  updatedAt: string;
} 