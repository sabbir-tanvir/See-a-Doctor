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
    // Load the schedule when component mounts
  useEffect(() => {
    async function fetchSchedule() {
      try {
        setLoading(true);
        // Try to find a schedule by email first if available
        const email = doctorEmail || user?.email;
        if (email) {
          const existingSchedule = getDoctorScheduleByEmail(email);
          if (existingSchedule) {
            setSchedule(existingSchedule.schedule);
            setLoading(false);
            return;
          }
        }

        const response = await fetch(`/api/schedule?doctorId=${doctorId}`);
        
        if (response.ok) {
          const data = await response.json();
          setSchedule(data.schedule);
        } else {
          // If no schedule exists, create a default one for the next 7 days
          const today = new Date();
          const defaultSchedule = generateEmptySchedule(doctorId, today, 7, user?.email);
          setSchedule(defaultSchedule.schedule);
        }
      } catch (error) {
        console.error('Error fetching schedule:', error);
        setError('Failed to load schedule. Please try again.');
        
        // Create default schedule on error
        const today = new Date();
        const defaultSchedule = generateEmptySchedule(doctorId, today, 7, user?.email);
        setSchedule(defaultSchedule.schedule);
      } finally {
        setLoading(false);
      }
    }
      fetchSchedule();
  }, [doctorId, doctorEmail, user?.email]);
    // Save the schedule to the API
  const saveSchedule = async () => {
    try {
      setSaving(true);
      setError(null);
      
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
        // Clear success message after 3 seconds
        setTimeout(() => setSuccess(null), 3000);
      } else {
        const data = await response.json();
        setError(data.error || 'Failed to save schedule. Please try again.');
      }
    } catch (error) {
      console.error('Error saving schedule:', error);
      setError('Failed to save schedule. Please try again.');
    } finally {
      setSaving(false);
    }
  };
  
  // Update a time slot's availability
  const updateTimeSlotAvailability = (dayIndex: number, slotIndex: number, available: boolean) => {
    const updatedSchedule = [...schedule];
    updatedSchedule[dayIndex].timeSlots[slotIndex].isAvailable = available;
    setSchedule(updatedSchedule);
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
                    <div>
                      <h4 className="font-medium mb-2">Morning</h4>
                      <div className="space-y-3">
                        {day.timeSlots
                          .filter(slot => {
                            const hour = parseInt(slot.startTime.split(':')[0]);
                            return hour < 12; // Morning slots
                          })
                          .map((slot, slotIndex) => {
                            const actualSlotIndex = day.timeSlots.findIndex(
                              s => s.startTime === slot.startTime && s.endTime === slot.endTime
                            );
                            return (
                              <div key={`${slot.startTime}-${slot.endTime}`} className="flex items-center space-x-2">
                                <Checkbox
                                  id={`slot-${dayIndex}-${actualSlotIndex}`}
                                  checked={slot.isAvailable}
                                  onCheckedChange={(checked) => {
                                    updateTimeSlotAvailability(dayIndex, actualSlotIndex, checked === true);
                                  }}
                                />
                                <label
                                  htmlFor={`slot-${dayIndex}-${actualSlotIndex}`}
                                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                  {slot.startTime} - {slot.endTime}
                                </label>
                              </div>
                            );
                          })}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-2">Afternoon/Evening</h4>
                      <div className="space-y-3">
                        {day.timeSlots
                          .filter(slot => {
                            const hour = parseInt(slot.startTime.split(':')[0]);
                            return hour >= 12; // Afternoon/Evening slots
                          })
                          .map((slot, slotIndex) => {
                            const actualSlotIndex = day.timeSlots.findIndex(
                              s => s.startTime === slot.startTime && s.endTime === slot.endTime
                            );
                            return (
                              <div key={`${slot.startTime}-${slot.endTime}`} className="flex items-center space-x-2">
                                <Checkbox
                                  id={`slot-${dayIndex}-${actualSlotIndex}`}
                                  checked={slot.isAvailable}
                                  onCheckedChange={(checked) => {
                                    updateTimeSlotAvailability(dayIndex, actualSlotIndex, checked === true);
                                  }}
                                />
                                <label
                                  htmlFor={`slot-${dayIndex}-${actualSlotIndex}`}
                                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
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
