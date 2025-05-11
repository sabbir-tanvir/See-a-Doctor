"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/AuthContext";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { toast, Toaster } from "sonner";
import { Loader2, Plus, Trash2, Save } from "lucide-react";

interface TimeSlot {
  slot: string;
  maxPatients: number;
}

interface DaySchedule {
  day: string;
  timeSlots: TimeSlot[];
}

interface DoctorSchedule {
  doctorId: string;
  schedule: DaySchedule[];
}

const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export default function DoctorAvailabilityPage() {
  const { user, loading: authLoading, isDoctor } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [schedule, setSchedule] = useState<DaySchedule[]>([]);
  const [doctorId, setDoctorId] = useState<string>("");

  useEffect(() => {
    // Redirect if not authenticated or not a doctor
    if (!authLoading && (!user || !isDoctor)) {
      toast.error("Only doctors can access this page");
      router.push("/");
    }

    // Fetch doctor ID and schedule
    if (user && isDoctor) {
      fetchDoctorData();
    }
  }, [user, isDoctor, authLoading, router]);

  const fetchDoctorData = async () => {
    try {
      setLoading(true);
      
      // First, fetch the doctor profile to get doctorId
      const profileResponse = await fetch("/api/doctor/profile");
      if (!profileResponse.ok) {
        throw new Error("Failed to fetch doctor profile");
      }
      
      const profileData = await profileResponse.json();
      if (!profileData.success) {
        throw new Error(profileData.message || "Failed to fetch doctor profile");
      }
      
      const docId = profileData.doctor._id;
      setDoctorId(docId);
      
      // Then fetch availability
      const availabilityResponse = await fetch(`/api/doctor/availability?doctorId=${docId}`);
      if (!availabilityResponse.ok) {
        throw new Error("Failed to fetch availability");
      }
      
      const availabilityData = await availabilityResponse.json();
      
      if (availabilityData.success && availabilityData.schedule) {
        setSchedule(availabilityData.schedule);
      } else {
        // Initialize empty schedule for all days
        initializeEmptySchedule();
      }
    } catch (error: any) {
      console.error("Error fetching doctor data:", error);
      toast.error(error.message || "Failed to load availability data");
      initializeEmptySchedule();
    } finally {
      setLoading(false);
    }
  };

  const initializeEmptySchedule = () => {
    const emptySchedule = daysOfWeek.map(day => ({
      day,
      timeSlots: [],
    }));
    setSchedule(emptySchedule);
  };

  const addTimeSlot = (dayIndex: number) => {
    const updatedSchedule = [...schedule];
    updatedSchedule[dayIndex].timeSlots.push({ slot: "", maxPatients: 5 });
    setSchedule(updatedSchedule);
  };

  const removeTimeSlot = (dayIndex: number, slotIndex: number) => {
    const updatedSchedule = [...schedule];
    updatedSchedule[dayIndex].timeSlots.splice(slotIndex, 1);
    setSchedule(updatedSchedule);
  };

  const updateTimeSlot = (dayIndex: number, slotIndex: number, field: keyof TimeSlot, value: string | number) => {
    const updatedSchedule = [...schedule];
    
    // Create a new timeSlots array for the specific day
    const updatedTimeSlots = [...updatedSchedule[dayIndex].timeSlots];
    
    // Create a new timeSlot object
    const updatedTimeSlot = { ...updatedTimeSlots[slotIndex] };
    
    // Update the specific field with type checking
    if (field === 'slot' && typeof value === 'string') {
      updatedTimeSlot.slot = value;
    }
    
    if (field === 'maxPatients' && typeof value === 'number') {
      updatedTimeSlot.maxPatients = value;
    }
    
    // Replace the old timeSlot with the updated one
    updatedTimeSlots[slotIndex] = updatedTimeSlot;
    
    // Replace the timeSlots array in the schedule
    updatedSchedule[dayIndex] = {
      ...updatedSchedule[dayIndex],
      timeSlots: updatedTimeSlots
    };
    
    setSchedule(updatedSchedule);
  };

  const saveSchedule = async () => {
    try {
      if (!doctorId) {
        toast.error("Doctor ID not found");
        return;
      }
      
      // Validate the schedule
      const validationError = validateSchedule();
      if (validationError) {
        toast.error(validationError);
        return;
      }
      
      setSaving(true);
      
      const response = await fetch("/api/doctor/availability", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          doctorId,
          schedule,
        }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        toast.success("Availability updated successfully");
      } else {
        throw new Error(data.message || "Failed to update availability");
      }
    } catch (error: any) {
      console.error("Error saving schedule:", error);
      toast.error(error.message || "Failed to save availability");
    } finally {
      setSaving(false);
    }
  };

  const validateSchedule = (): string | null => {
    for (let i = 0; i < schedule.length; i++) {
      const day = schedule[i];
      
      for (let j = 0; j < day.timeSlots.length; j++) {
        const slot = day.timeSlots[j];
        
        if (!slot.slot.trim()) {
          return `Please enter a valid time slot for ${day.day}`;
        }
        
        if (slot.maxPatients < 1 || slot.maxPatients > 10) {
          return `Max patients should be between 1 and 10 for ${day.day}`;
        }
      }
    }
    
    return null;
  };

  // Show loading state
  if (authLoading || loading) {
    return (
      <main className="min-h-screen">
        <Header />
        <div className="container mx-auto py-20 text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p>Loading...</p>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen">
      <Header />
      <Toaster position="top-right" richColors />
      
      <section className="bg-gray-50 py-4 border-b">
        <div className="container mx-auto px-4">
          <div className="flex text-sm">
            <a href="/" className="text-gray-500 hover:text-primary">Home</a>
            <span className="mx-2 text-gray-400">/</span>
            <a href="/doctor/dashboard" className="text-gray-500 hover:text-primary">Doctor Dashboard</a>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-primary">Manage Availability</span>
          </div>
        </div>
      </section>
      
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Manage Your Availability</h1>
            <Button onClick={saveSchedule} disabled={saving}>
              {saving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Save Availability
                </>
              )}
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {schedule.map((day, dayIndex) => (
              <Card key={day.day} className="overflow-hidden">
                <CardHeader className="bg-gray-50 pb-3">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg">{day.day}</CardTitle>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => addTimeSlot(dayIndex)}
                    >
                      <Plus className="h-4 w-4 mr-1" /> Add Time Slot
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="pt-4">
                  {day.timeSlots.length === 0 ? (
                    <div className="text-center py-4 text-gray-500">
                      <p>No time slots added for {day.day}</p>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="mt-2"
                        onClick={() => addTimeSlot(dayIndex)}
                      >
                        <Plus className="h-4 w-4 mr-1" /> Add Time Slot
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {day.timeSlots.map((slot, slotIndex) => (
                        <div
                          key={slotIndex}
                          className="flex items-end gap-2 pb-2 border-b border-gray-100"
                        >
                          <div className="flex-1">
                            <Label htmlFor={`slot-${dayIndex}-${slotIndex}`}>Time Slot</Label>
                            <Input
                              id={`slot-${dayIndex}-${slotIndex}`}
                              placeholder="e.g. 10:00 AM - 12:00 PM"
                              value={slot.slot}
                              onChange={(e) =>
                                updateTimeSlot(dayIndex, slotIndex, "slot", e.target.value)
                              }
                            />
                          </div>
                          <div className="w-28">
                            <Label htmlFor={`max-${dayIndex}-${slotIndex}`}>Max Patients</Label>
                            <Input
                              id={`max-${dayIndex}-${slotIndex}`}
                              type="number"
                              min="1"
                              max="10"
                              value={slot.maxPatients}
                              onChange={(e) =>
                                updateTimeSlot(
                                  dayIndex,
                                  slotIndex,
                                  "maxPatients",
                                  parseInt(e.target.value) || 1
                                )
                              }
                            />
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeTimeSlot(dayIndex, slotIndex)}
                            className="text-red-500 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      <Footer />
    </main>
  );
} 