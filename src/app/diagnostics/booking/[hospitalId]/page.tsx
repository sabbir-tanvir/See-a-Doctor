"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { hospitalsData } from "@/data/hospitalsData";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { format, addDays, addMonths, isToday, isTomorrow, isAfter, isBefore } from "date-fns";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

export default function DiagnosticBookingPage() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const hospitalId = params.hospitalId as string;
  const serviceType = searchParams.get("service");

  const [hospital, setHospital] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [timeSlot, setTimeSlot] = useState<string>("");
  const [patientName, setPatientName] = useState("");
  const [patientEmail, setPatientEmail] = useState("");
  const [patientPhone, setPatientPhone] = useState("");
  const [additionalNotes, setAdditionalNotes] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingError, setBookingError] = useState("");

  // Available time slots
  const timeSlots = [
    "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", 
    "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"
  ];

  const [selectedTab, setSelectedTab] = useState<string>("calendar");
  const [selectedDateOption, setSelectedDateOption] = useState<string>("");
  
  const today = new Date();
  const tomorrow = addDays(today, 1);
  const nextWeek = addDays(today, 7);
  const nextMonth = addMonths(today, 1);
  
  // Quick date options
  const quickDateOptions = [
    { label: "Today", value: "today", date: today },
    { label: "Tomorrow", value: "tomorrow", date: tomorrow },
    { label: "Within a Week", value: "nextWeek", date: nextWeek },
  ];
  
  // Handler for quick date options
  const handleQuickDateSelect = (option: string, optionDate: Date) => {
    setSelectedDateOption(option);
    setDate(optionDate);
  };
  
  // Format date for display
  const formatSelectedDate = (date?: Date) => {
    if (!date) return "";
    if (isToday(date)) return "Today";
    if (isTomorrow(date)) return "Tomorrow";
    return format(date, "EEEE, MMMM d, yyyy");
  };

  useEffect(() => {
    if (hospitalId) {
      const foundHospital = hospitalsData.find(h => h.id.toString() === hospitalId);
      if (foundHospital) {
        setHospital(foundHospital);
      } else {
        router.push("/diagnostics");
      }
    }
    setLoading(false);
  }, [hospitalId, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!date || !timeSlot || !patientName || !patientEmail || !patientPhone) {
      setBookingError("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);
    setBookingError("");

    try {
      const response = await fetch("/api/appointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          hospitalId: parseInt(hospitalId),
          serviceType: serviceType,
          appointmentDate: date?.toISOString().split("T")[0],
          timeSlot,
          patientName,
          patientEmail,
          patientPhone,
          additionalNotes,
          paymentMethod,
          appointmentType: "diagnostic",
          price: serviceType && hospital?.diagnosticPrices?.[serviceType]
        }),
      });

      const data = await response.json();

      if (data.success) {
        setBookingSuccess(true);
        // Reset form
        setTimeSlot("");
        setPatientName("");
        setPatientEmail("");
        setPatientPhone("");
        setAdditionalNotes("");
      } else {
        setBookingError(data.message || "Failed to book appointment");
      }
    } catch (error) {
      setBookingError("An error occurred while booking the appointment");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return <div className="container mx-auto py-12 text-center">Loading...</div>;
  }

  if (!hospital) {
    return (
      <div className="container mx-auto py-12 text-center">
        Hospital not found. <Button onClick={() => router.push("/diagnostics")}>Back to Diagnostics</Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <Button 
        variant="outline" 
        onClick={() => router.push("/diagnostics")}
        className="mb-6"
      >
        ← Back to Diagnostic Services
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Hospital Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="relative w-full h-40 rounded-lg overflow-hidden">
                  <Image
                    src={hospital.image}
                    alt={hospital.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <h2 className="text-xl font-bold">{hospital.name}</h2>
                <p className="text-gray-600">{hospital.location}</p>
                <div className="flex items-center">
                  <span className="text-amber-500 mr-1">★</span>
                  <span>{hospital.rating} ({hospital.reviews} reviews)</span>
                </div>
                <div className="border-t pt-4 mt-4">
                  <h3 className="font-semibold text-lg mb-2">Selected Service</h3>
                  <div className="bg-gray-50 p-3 rounded">
                    <p className="font-medium">{serviceType}</p>
                    <p className="text-lg font-bold mt-1">
                      ৳{serviceType && hospital.diagnosticPrices?.[serviceType as keyof typeof hospital.diagnosticPrices]?.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Book Diagnostic Service</CardTitle>
              <CardDescription>
                Fill in the details below to book your diagnostic appointment
              </CardDescription>
            </CardHeader>
            <CardContent>
              {bookingSuccess ? (
                <Alert className="bg-green-50 border-green-200 text-green-800">
                  <AlertTitle>Booking Successful!</AlertTitle>
                  <AlertDescription>
                    Your appointment has been booked successfully. You will receive a confirmation email shortly.
                    <div className="mt-4">
                      <Button onClick={() => router.push("/diagnostics")}>
                        Return to Diagnostics
                      </Button>
                    </div>
                  </AlertDescription>
                </Alert>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {bookingError && (
                    <Alert className="bg-red-50 border-red-200 text-red-800">
                      <AlertTitle>Error</AlertTitle>
                      <AlertDescription>{bookingError}</AlertDescription>
                    </Alert>
                  )}

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="date" className="text-base font-semibold">Select Date</Label>
                      {date && (
                        <div className="mt-1 mb-3">
                          <Badge variant="outline" className="text-sm py-1 px-3 bg-blue-50">
                            Selected: <span className="font-semibold ml-1">{formatSelectedDate(date)}</span>
                          </Badge>
                        </div>
                      )}
                    </div>
                    
                    <Tabs defaultValue="quick" value={selectedTab} onValueChange={setSelectedTab} className="w-full">
                      <TabsList className="grid grid-cols-2 mb-4">
                        <TabsTrigger value="quick">Quick Select</TabsTrigger>
                        <TabsTrigger value="calendar">Calendar</TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="quick" className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          {quickDateOptions.map((option) => (
                            <Button
                              key={option.value}
                              type="button"
                              variant={selectedDateOption === option.value ? "default" : "outline"}
                              onClick={() => handleQuickDateSelect(option.value, option.date)}
                              className="w-full justify-start px-4 py-6 h-auto"
                            >
                              <div className="flex flex-col items-start text-left">
                                <span className="font-semibold">{option.label}</span>
                                <span className="text-xs mt-1 opacity-80">
                                  {format(option.date, "MMM d, yyyy")}
                                </span>
                              </div>
                            </Button>
                          ))}
                        </div>
                        
                        <div className="pt-2">
                          <p className="text-sm text-gray-500">
                            Choose a quick option or switch to calendar view for specific dates
                          </p>
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="calendar">
                        <div className="bg-white rounded-md border p-4">
                          <Calendar
                            mode="single"
                            selected={date}
                            onSelect={(newDate) => {
                              setDate(newDate);
                              setSelectedDateOption("");
                            }}
                            disabled={(date) => 
                              date < new Date() || 
                              date > addMonths(new Date(), 2)
                            }
                            className="mx-auto"
                            showOutsideDays
                            fixedWeeks
                          />
                          
                          <div className="mt-4 pt-3 border-t text-sm text-gray-500">
                            <p className="flex items-center">
                              <span className="w-3 h-3 rounded-full bg-blue-500 inline-block mr-2"></span>
                              Available dates (within next 60 days)
                            </p>
                            <p className="flex items-center mt-1">
                              <span className="w-3 h-3 rounded-full bg-gray-200 inline-block mr-2"></span>
                              Unavailable dates
                            </p>
                          </div>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </div>

                  <div className="space-y-4 mt-6">
                    <div>
                      <Label htmlFor="timeSlot" className="text-base font-semibold">Select Time Slot</Label>
                      {timeSlot && (
                        <div className="mt-1 mb-2">
                          <Badge variant="outline" className="text-sm py-1 px-3 bg-blue-50">
                            Selected: <span className="font-semibold ml-1">{timeSlot}</span>
                          </Badge>
                        </div>
                      )}
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {timeSlots.map((slot) => (
                        <Button
                          key={slot}
                          type="button"
                          variant={timeSlot === slot ? "default" : "outline"}
                          onClick={() => setTimeSlot(slot)}
                          className={`w-full ${timeSlot === slot ? 'bg-blue-600 hover:bg-blue-700' : ''}`}
                        >
                          {slot}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="patientName">Full Name</Label>
                    <Input
                      id="patientName"
                      placeholder="Enter your full name"
                      value={patientName}
                      onChange={(e) => setPatientName(e.target.value)}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="patientEmail">Email</Label>
                      <Input
                        id="patientEmail"
                        type="email"
                        placeholder="Enter your email"
                        value={patientEmail}
                        onChange={(e) => setPatientEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="patientPhone">Phone Number</Label>
                      <Input
                        id="patientPhone"
                        placeholder="Enter your phone number"
                        value={patientPhone}
                        onChange={(e) => setPatientPhone(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="additionalNotes">Additional Notes</Label>
                    <Textarea
                      id="additionalNotes"
                      placeholder="Any specific instructions or requirements"
                      value={additionalNotes}
                      onChange={(e) => setAdditionalNotes(e.target.value)}
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Payment Method</Label>
                    <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="cash" id="cash" />
                        <Label htmlFor="cash">Pay at Hospital</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="online" id="online" />
                        <Label htmlFor="online">Pay Online</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? "Processing..." : "Book Appointment"}
                  </Button>
                </form>
              )}
            </CardContent>
            <CardFooter className="text-sm text-gray-500 border-t pt-4">
              <p>
                By booking this appointment, you agree to our terms of service and cancellation policy.
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}