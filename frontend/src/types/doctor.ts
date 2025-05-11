export interface Doctor {
  _id: string;
  id?: number; // For backwards compatibility
  name: string;
  email: string;
  phone: string;
  specialization: string;
  education: string | string[] | Array<{ degree: string; institution: string }>;
  experience: string | number;
  fee: number;
  location: string;
  hospital: string | { name: string; id: string };
  img?: string; // For backwards compatibility
  image?: string; // New field name
  available?: boolean;
  rating: number;
  reviews: number;
  degrees: string[];
  services?: string[];
  consultation_type: string[];
  chamber?: Array<{
    name: string;
    address: string;
    contact: string;
    availability: string;
  }>;
  work_experience?: Array<{
    hospital: string;
    position: string;
    from: string;
    to?: string;
  }>;
  createdAt: string;
  updatedAt: string;
  gender: string;
  bmdc_registration?: string;
  about?: string;
} 