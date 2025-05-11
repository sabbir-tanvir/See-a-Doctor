"use client";

import React from 'react';
import { useAuth } from '@/lib/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScheduleManager } from '@/components/ScheduleManager';

export default function DoctorDashboardPage() {  const { user, logout, isDoctor, loading } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/doctor/login');
    } catch (error) {
      console.error('Failed to logout', error);
    }
  };  if (loading) {
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
                        <p className="text-3xl font-bold">0</p>
                      </CardContent>
                    </Card>
                    <Card className="bg-green-50">
                      <CardContent className="pt-6">
                        <h3 className="font-semibold mb-2">Upcoming Appointments</h3>
                        <p className="text-3xl font-bold">0</p>
                      </CardContent>
                    </Card>
                    <Card className="bg-purple-50">
                      <CardContent className="pt-6">
                        <h3 className="font-semibold mb-2">Total Patients</h3>
                        <p className="text-3xl font-bold">0</p>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="border p-4 rounded-lg mt-6">
                    <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
                    <p className="text-gray-500 text-center py-8">No recent activity to display.</p>
                  </div>
                </TabsContent>                <TabsContent value="schedule">
                  <ScheduleManager 
                    doctorId={parseInt(user.uid) || 1} 
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
                  <div className="text-center py-8">
                    <p className="text-gray-500">No patients registered yet.</p>
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
