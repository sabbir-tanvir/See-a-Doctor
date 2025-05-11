import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5005';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API calls
export const authAPI = {
  register: (userData: any) => api.post('/auth/register', userData),
  login: (credentials: { email: string; password: string }) => api.post('/auth/login', credentials),
  logout: () => api.get('/auth/logout'),
  getMe: () => api.get('/auth/me'),
  updateDetails: (data: any) => api.put('/auth/updatedetails', data),
  updatePassword: (data: any) => api.put('/auth/updatepassword', data),
  forgotPassword: (email: string) => api.post('/auth/forgotpassword', { email }),
  resetPassword: (token: string, password: string) => 
    api.put(`/auth/resetpassword/${token}`, { password }),
};

// Doctors API calls
export const doctorsAPI = {
  getAll: (params?: any) => api.get('/doctors', { params }),
  getById: (id: string) => api.get(`/doctors/${id}`),
  create: (data: any) => api.post('/doctors', data),
  update: (id: string, data: any) => api.put(`/doctors/${id}`, data),
  delete: (id: string) => api.delete(`/doctors/${id}`),
  getBySpecialization: (specialization: string) => 
    api.get(`/doctors/specialization/${specialization}`),
  getByLocation: (location: string) => 
    api.get(`/doctors/location/${location}`),
  uploadPhoto: (id: string, file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    return api.put(`/doctors/${id}/photo`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  getDashboard: (id: string) => api.get(`/doctors/${id}/dashboard`),
  getAppointments: (id: string) => api.get(`/doctors/${id}/appointments`),
  getPatients: (id: string) => api.get(`/doctors/${id}/patients`),
  getStats: (id: string) => api.get(`/doctors/${id}/stats`),
};

// Hospitals API calls
export const hospitalsAPI = {
  getAll: (params?: any) => api.get('/hospitals', { params }),
  getById: (id: string) => api.get(`/hospitals/${id}`),
  create: (data: any) => api.post('/hospitals', data),
  update: (id: string, data: any) => api.put(`/hospitals/${id}`, data),
  delete: (id: string) => api.delete(`/hospitals/${id}`),
  getBySpecialty: (specialty: string) => 
    api.get(`/hospitals/specialty/${specialty}`),
  getByLocation: (location: string) => 
    api.get(`/hospitals/location/${location}`),
  uploadPhoto: (id: string, file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    return api.put(`/hospitals/${id}/photo`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
};

// Appointments API calls
export const appointmentsAPI = {
  getAll: (params?: any) => api.get('/appointments', { params }),
  getById: (id: string) => api.get(`/appointments/${id}`),
  create: (data: any) => api.post('/appointments', data),
  update: (id: string, data: any) => api.put(`/appointments/${id}`, data),
  delete: (id: string) => api.delete(`/appointments/${id}`),
  getByDoctor: (doctorId: string) => 
    api.get(`/appointments/doctor/${doctorId}`),
  getByPatient: (patientId: string) => 
    api.get(`/appointments/patient/${patientId}`),
};

// Reviews API calls
export const reviewsAPI = {
  getAll: (params?: any) => api.get('/reviews', { params }),
  getById: (id: string) => api.get(`/reviews/${id}`),
  create: (data: any) => api.post('/reviews', data),
  update: (id: string, data: any) => api.put(`/reviews/${id}`, data),
  delete: (id: string) => api.delete(`/reviews/${id}`),
  getByDoctor: (doctorId: string) => 
    api.get(`/reviews/doctor/${doctorId}`),
  getByHospital: (hospitalId: string) => 
    api.get(`/reviews/hospital/${hospitalId}`),
};

// Specialties API calls
export const specialtiesAPI = {
  getAll: () => api.get('/specialties'),
  getById: (id: string) => api.get(`/specialties/${id}`),
  create: (data: any) => api.post('/specialties', data),
  update: (id: string, data: any) => api.put(`/specialties/${id}`, data),
  delete: (id: string) => api.delete(`/specialties/${id}`),
  getByCategory: (category: string) => api.get(`/specialties/category/${category}`),
}; 