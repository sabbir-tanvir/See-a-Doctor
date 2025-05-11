"use client";

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/lib/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Checkbox } from '@/components/ui/checkbox';
import { DaySchedule, TimeSlot, generateEmptySchedule, getDoctorScheduleByEmail } from '@/data/scheduleData';
import { format, addDays, parseISO } from 'date-fns';
import { toast } from 'sonner';

type ScheduleTabProps = {
  doctorId: number;
  doctorEmail?: string;
};

export function ScheduleManager({ doctorId, doctorEmail }: ScheduleTabProps) {
  const { user } = useAuth();
  const [schedule, setSchedule] = useState<DaySchedule[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [selectedTab, setSelectedTab] = useState<string>('0'); // Default to first tab
  
  // Load the schedule when component mounts - just create a default schedule
  useEffect(() => {
    async function initializeSchedule() {
      try {
        setLoading(true);
        
        // Always create a default schedule for the next 7 days
        const today = new Date();
        const defaultSchedule = generateEmptySchedule(doctorId, today, 7, user?.email);
        setSchedule(defaultSchedule.schedule);
      } catch (error) {
        console.error('Error initializing schedule:', error);
        setError('Failed to initialize schedule. Please try again.');
      } finally {
        setLoading(false);
      }
    }
    
    initializeSchedule();
  }, [doctorId, doctorEmail, user?.email]);
  
  // Save the schedule to the API
  const saveSchedule = async () => {
    try {
      setSaving(true);
      setError(null);
      
      // Log the schedule being saved to help debug
      console.log('Saving schedule:', schedule);
      
      const response = await fetch('/api/schedule', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          doctorId,
          doctorEmail: doctorEmail || user?.email,
          schedule,
        }),
      });
      
      if (response.ok) {
        setSuccess('Schedule saved successfully!');
        toast.success('Schedule saved successfully!');
        // Clear success message after 3 seconds
        setTimeout(() => setSuccess(null), 3000);
      } else {
        const data = await response.json();
        setError(data.error || 'Failed to save schedule. Please try again.');
        toast.error('Failed to save schedule');
      }
    } catch (error) {
      console.error('Error saving schedule:', error);
      setError('Failed to save schedule. Please try again.');
      toast.error('Failed to save schedule');
    } finally {
      setSaving(false);
    }
  };
  
  // Update a time slot's availability with improved feedback
  const updateTimeSlotAvailability = (dayIndex: number, slotIndex: number, available: boolean) => {
    console.log(`Updating slot: day=${dayIndex}, slot=${slotIndex}, available=${available}`);
    
    setSchedule(prevSchedule => {
      const newSchedule = [...prevSchedule];
      if (newSchedule[dayIndex] && newSchedule[dayIndex].timeSlots && newSchedule[dayIndex].timeSlots[slotIndex]) {
        // Create a new timeSlots array to ensure state updates properly
        newSchedule[dayIndex] = {
          ...newSchedule[dayIndex],
          timeSlots: [
            ...newSchedule[dayIndex].timeSlots.slice(0, slotIndex),
            {
              ...newSchedule[dayIndex].timeSlots[slotIndex],
              isAvailable: available
            },
            ...newSchedule[dayIndex].timeSlots.slice(slotIndex + 1)
          ]
        };
        return newSchedule;
      } else {
        console.error('Invalid day or slot index:', dayIndex, slotIndex);
        return prevSchedule;
      }
    });
  };
  
  if (loading) {
    return (
      <Card className="mt-6">
        <CardContent className="pt-6">
          <div className="text-center py-8">Loading schedule...</div>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle className="text-xl">Manage Your Schedule</CardTitle>
      </CardHeader>
      <CardContent>
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        
        {success && (
          <Alert className="mb-4 bg-green-50">
            <AlertDescription className="text-green-800">{success}</AlertDescription>
          </Alert>
        )}
        
        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="mb-4 w-full overflow-x-auto flex flex-nowrap">
            {schedule.map((day, index) => (
              <TabsTrigger 
                key={day.date} 
                value={index.toString()}
                className="min-w-[100px] flex-shrink-0"
              >
                {format(parseISO(day.date), 'EEE, MMM d')}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {schedule.map((day, dayIndex) => (
            <TabsContent key={day.date} value={dayIndex.toString()}>
              <div className="px-1 py-2">
                <h3 className="font-semibold mb-4">
                  {format(parseISO(day.date), 'EEEE, MMMM d, yyyy')}
                </h3>
                
                <div className="mt-4 space-y-1">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-medium mb-2">Morning</h4>
                      <div className="space-y-3">
                        {day.timeSlots
                          .filter(slot => {
                            const hour = parseInt(slot.startTime.split(':')[0]);
                            return hour < 12; // Morning slots
                          })
                          .map((slot, idx) => {
                            const actualSlotIndex = day.timeSlots.findIndex(
                              s => s.startTime === slot.startTime && s.endTime === slot.endTime
                            );
                            return (
                              <div 
                                key={`morning-${dayIndex}-${idx}`} 
                                className={`flex items-center space-x-2 p-2 rounded hover:bg-gray-100 ${slot.isAvailable ? 'bg-blue-50' : ''}`}
                                onClick={() => {
                                  updateTimeSlotAvailability(dayIndex, actualSlotIndex, !slot.isAvailable);
                                }}
                              >
                                <Checkbox
                                  id={`slot-${dayIndex}-${actualSlotIndex}`}
                                  checked={slot.isAvailable}
                                  onCheckedChange={(checked) => {
                                    updateTimeSlotAvailability(dayIndex, actualSlotIndex, checked === true);
                                  }}
                                  className="cursor-pointer"
                                />
                                <label
                                  htmlFor={`slot-${dayIndex}-${actualSlotIndex}`}
                                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer w-full"
                                >
                                  {slot.startTime} - {slot.endTime}
                                </label>
                              </div>
                            );
                          })}
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-medium mb-2">Afternoon/Evening</h4>
                      <div className="space-y-3">
                        {day.timeSlots
                          .filter(slot => {
                            const hour = parseInt(slot.startTime.split(':')[0]);
                            return hour >= 12; // Afternoon/Evening slots
                          })
                          .map((slot, idx) => {
                            const actualSlotIndex = day.timeSlots.findIndex(
                              s => s.startTime === slot.startTime && s.endTime === slot.endTime
                            );
                            return (
                              <div 
                                key={`afternoon-${dayIndex}-${idx}`} 
                                className={`flex items-center space-x-2 p-2 rounded hover:bg-gray-100 ${slot.isAvailable ? 'bg-blue-50' : ''}`}
                                onClick={() => {
                                  updateTimeSlotAvailability(dayIndex, actualSlotIndex, !slot.isAvailable);
                                }}
                              >
                                <Checkbox
                                  id={`slot-${dayIndex}-${actualSlotIndex}-pm`}
                                  checked={slot.isAvailable}
                                  onCheckedChange={(checked) => {
                                    updateTimeSlotAvailability(dayIndex, actualSlotIndex, checked === true);
                                  }}
                                  className="cursor-pointer"
                                />
                                <label
                                  htmlFor={`slot-${dayIndex}-${actualSlotIndex}-pm`}
                                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer w-full"
                                >
                                  {slot.startTime} - {slot.endTime}
                                </label>
                              </div>
                            );
                          })}
                      </div>
                    </div>
                  </div>
                </div>
                
                <p className="text-sm text-gray-500 mt-4">
                  Click on a time slot to mark it as {selectedTab === '0' ? 'available/unavailable' : 'available or unavailable'} for appointments.
                </p>
              </div>
            </TabsContent>
          ))}
        </Tabs>
        
        <div className="mt-6 flex justify-end">
          <Button 
            onClick={saveSchedule} 
            disabled={saving}
            className="px-6"
          >
            {saving ? 'Saving...' : 'Save Schedule'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
