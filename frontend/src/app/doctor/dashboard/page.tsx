"use client";

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/lib/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScheduleManager } from '@/components/ScheduleManager';
import { getDoctorIdByEmail } from "@/data/scheduleData";
import { format, parseISO, isToday, isAfter } from "date-fns";

// Define appointment type like in appointments page
type Appointment = {
  id: string;
  doctorId: string;
  doctorName: string;
  appointmentType: string;
  appointmentDate: string;
  timeSlot: string;
  patientName: string;
  patientPhone: string;
  patientEmail: string;
  patientAge: string;
  patientGender: string;
  patientProblem: string;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  userId: string;
  userEmail: string;
  createdAt: string;
};

export default function DoctorDashboardPage() {  
  const { user, logout, isDoctor, loading } = useAuth();
  const router = useRouter();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loadingAppointments, setLoadingAppointments] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch appointments on component mount
  useEffect(() => {
    if (user && isDoctor) {
      fetchAppointments();
    }
  }, [user, isDoctor]);

  const fetchAppointments = async () => {
    try {
      setLoadingAppointments(true);
      setError(null);
      
      // Get doctor ID from email - this might return undefined from the sample data
      const doctorId = getDoctorIdByEmail(user?.email || "");
      
      // Query parameter - always use email as a fallback
      const queryParam = `doctorEmail=${encodeURIComponent(user?.email || "")}`;
        
      const response = await fetch(`/api/doctor/appointments?${queryParam}`);
      
      if (!response.ok) {
        throw new Error("Failed to fetch appointments");
      }
      
      const data = await response.json();
      
      if (data.success) {
        setAppointments(data.appointments || []);
      } else {
        throw new Error(data.message || "Failed to fetch appointments");
      }
    } catch (error: any) {
      console.error("Error fetching appointments:", error);
      setError(error.message || "Error fetching appointments");
    } finally {
      setLoadingAppointments(false);
    }
  };

  // Functions to calculate statistics
  const getTodayAppointments = () => {
    return appointments.filter(appointment => {
      return appointment.appointmentDate === format(new Date(), 'yyyy-MM-dd');
    });
  };

  const getUpcomingAppointments = () => {
    return appointments.filter(appointment => {
      const appointmentDate = parseISO(appointment.appointmentDate);
      return isAfter(appointmentDate, new Date()) && appointment.status !== 'cancelled';
    });
  };

  // Function to count unique patients
  const getTotalPatients = () => {
    // Use a Set to store unique user IDs
    const uniquePatientIds = new Set();
    appointments.forEach(appointment => {
      if (appointment.userId) {
        uniquePatientIds.add(appointment.userId);
      }
    });
    return uniquePatientIds.size;
  };

  // Function to get all unique patients with their details
  const getUniquePatients = () => {
    // Use a Map to store unique patients by userId
    const uniquePatients = new Map();
    
    // Process all appointments to extract patient info
    appointments.forEach(appointment => {
      if (appointment.userId) {
        // If we already have this patient, just update lastVisit if needed
        if (uniquePatients.has(appointment.userId)) {
          const existing = uniquePatients.get(appointment.userId);
          // Update last visit date if this appointment is completed and is more recent
          if (appointment.status === 'completed') {
            if (!existing.lastVisit || appointment.appointmentDate > existing.lastVisit) {
              existing.lastVisit = appointment.appointmentDate;
              uniquePatients.set(appointment.userId, existing);
            }
          }
        } else {
          // Add new patient to the map
          uniquePatients.set(appointment.userId, {
            userId: appointment.userId,
            patientName: appointment.patientName,
            patientEmail: appointment.patientEmail,
            patientPhone: appointment.patientPhone,
            patientAge: appointment.patientAge,
            patientGender: appointment.patientGender,
            // Set lastVisit only if the appointment is completed
            lastVisit: appointment.status === 'completed' ? appointment.appointmentDate : null
          });
        }
      }
    });
    
    return uniquePatients;
  };

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/doctor/login');
    } catch (error) {
      console.error('Failed to logout', error);
    }
  };  

  if (loading) {
    return (
      <>
        <Header />
        <main className="container-custom py-10 min-h-[calc(100vh-300px)]">
          <div className="flex justify-center items-center h-full">
            <p>Loading...</p>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (!user) {
    router.push('/doctor/login');
    return null;
  }
  
  if (!isDoctor) {
    // Redirect non-doctor users to the home page
    router.push('/');
    return null;
  }
  return (
    <>
      <Header />
      <main className="container-custom py-10 min-h-[calc(100vh-300px)]">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Doctor Dashboard</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="bg-primary/5 p-4 rounded-lg">
                <h2 className="text-lg font-semibold mb-2">Welcome Dr. {user.name || 'Doctor'}</h2>
                <p className="text-gray-600">Email: {user.email}</p>
              </div>

              <Tabs defaultValue="overview">
                <TabsList className="mb-4">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="schedule">Manage Schedule</TabsTrigger>
                  <TabsTrigger value="appointments">Appointments</TabsTrigger>
                  <TabsTrigger value="patients">Patients</TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className="bg-blue-50">
                      <CardContent className="pt-6">
                        <h3 className="font-semibold mb-2">Today's Appointments</h3>
                        <p className="text-3xl font-bold">{loadingAppointments ? "..." : getTodayAppointments().length}</p>
                      </CardContent>
                    </Card>
                    <Card className="bg-green-50">
                      <CardContent className="pt-6">
                        <h3 className="font-semibold mb-2">Upcoming Appointments</h3>
                        <p className="text-3xl font-bold">{loadingAppointments ? "..." : getUpcomingAppointments().length}</p>
                      </CardContent>
                    </Card>
                    <Card className="bg-purple-50">
                      <CardContent className="pt-6">
                        <h3 className="font-semibold mb-2">Total Patients</h3>
                        <p className="text-3xl font-bold">{loadingAppointments ? "..." : getTotalPatients()}</p>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="border p-4 rounded-lg mt-6">
                    <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
                    {loadingAppointments ? (
                      <p className="text-center py-8">Loading activity...</p>
                    ) : error ? (
                      <p className="text-center py-8 text-red-500">{error}</p>
                    ) : appointments.length === 0 ? (
                      <p className="text-gray-500 text-center py-8">No recent activity to display.</p>
                    ) : (
                      <div className="space-y-2">
                        {appointments.slice(0, 5).map(appointment => (
                          <div key={appointment.id} className="p-3 border rounded-md">
                            <div className="flex justify-between">
                              <p className="font-medium">{appointment.patientName}</p>
                              <span className="text-sm text-gray-500">{format(parseISO(appointment.appointmentDate), 'PPP')}</span>
                            </div>
                            <p className="text-sm text-gray-600">
                              {appointment.appointmentType} appointment - {appointment.timeSlot}
                            </p>
                            <div className="mt-1">
                              {appointment.status === "pending" && (
                                <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">Pending</span>
                              )}
                              {appointment.status === "confirmed" && (
                                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">Confirmed</span>
                              )}
                              {appointment.status === "completed" && (
                                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Completed</span>
                              )}
                              {appointment.status === "cancelled" && (
                                <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full">Cancelled</span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </TabsContent>                <TabsContent value="schedule">
                  <ScheduleManager 
                    doctorId={parseInt(user._id) || 1} 
                    doctorEmail={user.email || undefined}
                  />
                </TabsContent>
                  <TabsContent value="appointments">
                  <div className="space-y-4">
                    <div className="bg-white rounded-lg border p-6">
                      <h3 className="text-lg font-semibold mb-4">Manage Your Appointments</h3>
                      <p className="mb-4">View, confirm, or cancel patient appointments. You can also mark appointments as completed after the visit.</p>
                      <Button onClick={() => router.push('/doctor/appointments')}>
                        View All Appointments
                      </Button>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="patients">
                  <div className="space-y-4">
                    {loadingAppointments ? (
                      <p className="text-center py-8">Loading patients...</p>
                    ) : error ? (
                      <p className="text-center py-8 text-red-500">{error}</p>
                    ) : getTotalPatients() === 0 ? (
                      <p className="text-gray-500 text-center py-8">No patients registered yet.</p>
                    ) : (
                      <>
                        <div className="flex justify-between items-center">
                          <h3 className="text-lg font-semibold">Your Patients</h3>
                          <p className="text-sm text-gray-500">Total: {getTotalPatients()}</p>
                        </div>
                        
                        <div className="border rounded-lg overflow-hidden">
                          <div className="overflow-x-auto">
                            <table className="w-full">
                              <thead>
                                <tr className="bg-gray-50 border-b">
                                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Name</th>
                                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Gender</th>
                                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Age</th>
                                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Contact</th>
                                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Last Visit</th>
                                </tr>
                              </thead>
                              <tbody>
                                {Array.from(getUniquePatients().values()).map((patient, index) => (
                                  <tr key={patient.userId} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                    <td className="px-4 py-3 text-sm text-gray-900">{patient.patientName}</td>
                                    <td className="px-4 py-3 text-sm text-gray-600">{patient.patientGender || 'N/A'}</td>
                                    <td className="px-4 py-3 text-sm text-gray-600">{patient.patientAge || 'N/A'}</td>
                                    <td className="px-4 py-3 text-sm text-gray-600">
                                      <div>{patient.patientPhone}</div>
                                      <div className="text-xs text-gray-500">{patient.patientEmail}</div>
                                    </td>
                                    <td className="px-4 py-3 text-sm text-gray-600">
                                      {patient.lastVisit ? format(parseISO(patient.lastVisit), 'PP') : 'Upcoming'}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </TabsContent>
              </Tabs>

              <Button variant="outline" className="w-full" onClick={handleLogout}>
                Logout
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </>
  );
}
