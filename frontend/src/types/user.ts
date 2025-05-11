export interface User {
  _id: string;
  name: string;
  email: string;
  phone: string;
  role: 'user' | 'doctor' | 'admin';
  img?: string;
  address?: string;
  dateOfBirth?: string;
  gender?: 'male' | 'female' | 'other';
  bloodGroup?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  success: boolean;
  token: string;
  user: User;
} 