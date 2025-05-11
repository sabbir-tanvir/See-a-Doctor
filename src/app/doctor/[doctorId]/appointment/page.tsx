"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { toast, Toaster } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  MapPin,
  Star,
  Building2,
  Clock,
  CalendarIcon,
  ArrowRight,
  Calendar as CalendarIcon2,
  Phone,
  MessageSquare,
  Video,
  CheckCircle
} from "lucide-react";

import { doctorsData, Doctor } from "@/data/doctorsData";
import { TimeSlot, getAvailableDates, getAvailableTimeSlots } from "@/data/scheduleData";
import { format, addDays, parse, parseISO } from "date-fns";
import { useAuth } from "@/lib/AuthContext"; // Import useAuth
import { db } from "@/lib/firebase"; // Import Firestore database

export default function DoctorAppointmentPage() {  const params = useParams();
  const router = useRouter();
  const doctorId = params.doctorId as string;
  const { user, loading: authLoading } = useAuth(); // Use the AuthContext
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [date, setDate] = useState<Date>();
  const [appointmentType, setAppointmentType] = useState("chamber");
  const [timeSlot, setTimeSlot] = useState("");
  const [patientName, setPatientName] = useState("");
  const [patientPhone, setPatientPhone] = useState("");
  const [patientEmail, setPatientEmail] = useState("");
  const [patientAge, setPatientAge] = useState("");
  const [patientGender, setPatientGender] = useState("");
  const [patientProblem, setPatientProblem] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [submitting, setSubmitting] = useState(false); // Add a submitting state
  // Schedule state variables
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>("");
  const [availableDates, setAvailableDates] = useState<string[]>([]);
  const [availableTimeSlots, setAvailableTimeSlots] = useState<TimeSlot[]>([]);

  useEffect(() => {
    // Populate patient info from user data if available
    if (user) {
      if (user.displayName) setPatientName(user.displayName);
      if (user.email) setPatientEmail(user.email || '');
    }
    
    console.log("Doctor ID from params:", doctorId);
    console.log("Available doctors:", doctorsData);
    
    try {
      const doctorIdNumber = parseInt(doctorId, 10);
      
      if (isNaN(doctorIdNumber)) {
        const foundDoctor = doctorsData.find(doc => doc.id.toString() === doctorId);
        if (foundDoctor) {
          console.log("Found doctor by string ID:", foundDoctor);
          setDoctor(foundDoctor);
        } else {
          console.error("Doctor not found with ID:", doctorId);
          setError(`No doctor found with ID: ${doctorId}`);
        }
      } else {
        const foundDoctor = doctorsData.find(doc => doc.id === doctorIdNumber);
        if (foundDoctor) {
          console.log("Found doctor by numeric ID:", foundDoctor);
          setDoctor(foundDoctor);
        } else {
          console.error("Doctor not found with numeric ID:", doctorIdNumber);
          setError(`No doctor found with ID: ${doctorId}`);
        }
      }      
      // Fetch available dates for this doctor
      const dates = getAvailableDates(parseInt(doctorId as string));
      setAvailableDates(dates);
    } catch (err) {
      console.error("Error loading doctor data:", err);
      setError("Error loading doctor information. Please try again later.");
    } finally {
      setLoading(false);
    }
    
    // Check if there's a pending appointment in localStorage
    if (typeof window !== 'undefined') {
      try {
        const pendingAppointment = localStorage.getItem('pendingAppointment');
        if (pendingAppointment && user) {
          const appointmentData = JSON.parse(pendingAppointment);
          
          // Only restore the pending appointment if it's for the same doctor
          if (appointmentData.doctorId === doctorId) {
            setAppointmentType(appointmentData.appointmentType || 'chamber');
            if (appointmentData.date) setDate(new Date(appointmentData.date));
            setTimeSlot(appointmentData.timeSlot || '');
            setPatientName(appointmentData.patientName || user.displayName || '');
            setPatientPhone(appointmentData.patientPhone || '');
            setPatientEmail(appointmentData.patientEmail || user.email || '');
            setPatientAge(appointmentData.patientAge || '');
            setPatientGender(appointmentData.patientGender || '');
            setPatientProblem(appointmentData.patientProblem || '');
            
            // Clear the pending appointment
            localStorage.removeItem('pendingAppointment');
            
            toast.info("Your appointment information has been restored", {
              duration: 3000,
            });
          }
        }
      } catch (error) {
        console.error('Error retrieving pending appointment:', error);
      }    }
  }, [doctorId, user]);

  // Update available time slots when date changes
  useEffect(() => {
    if (selectedDate && doctorId) {
      const formattedDate = format(selectedDate, 'yyyy-MM-dd');
      const doctorIdNumber = parseInt(doctorId as string);
      const slots = getAvailableTimeSlots(doctorIdNumber, formattedDate);
      setAvailableTimeSlots(slots);
      setSelectedTimeSlot(""); // Clear previously selected time slot
      setTimeSlot(""); // Also clear the actual time slot used for booking
    }
  }, [selectedDate, doctorId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate required fields
    if (!date || !timeSlot || !patientName || !patientPhone) {
      toast.error("Please fill in all required fields");
      return;
    }

    // Check if user is logged in before proceeding
    if (!user) {
      try {
        // Store appointment details in localStorage to recover after login
        localStorage.setItem('pendingAppointment', JSON.stringify({
          doctorId,
          appointmentType,
          date: date ? date.toISOString() : null, // Make date serializable
          timeSlot,
          patientName,
          patientPhone,
          patientEmail,
          patientAge,
          patientGender,
          patientProblem
        }));
      } catch (error) {
        console.error('Error saving pending appointment:', error);
      }
      
      toast.error("Please login to confirm your appointment", {
        description: "You'll be redirected to the login page",
        duration: 3000,
      });
      
      // Redirect to login page after a short delay
      setTimeout(() => {
        router.push('/login?redirect=' + encodeURIComponent(`/doctor/${doctorId}/appointment`));
      }, 1500);
      
      return;
    }
    
    // If user is logged in, proceed with appointment booking
    try {
      setSubmitting(true);
      
      // Format date for API
      const appointmentDate = date ? format(date, 'yyyy-MM-dd') : '';
      
      // Create appointment object
      const appointmentData = {
        doctorId,
        doctorName: doctor?.name,
        doctorSpecialization: doctor?.specialization,
        appointmentType,
        appointmentDate,
        timeSlot,
        patientName,
        patientPhone,
        patientEmail,
        patientAge,
        patientGender,
        patientProblem,
        status: 'pending', // pending, confirmed, completed, cancelled
        userId: user.uid,
        userEmail: user.email
      };
      
      // Send appointment data to our API endpoint
      const response = await fetch('/api/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(appointmentData),
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.message || 'Failed to book appointment');
      }
      
      // Success notification
      toast.success("Appointment confirmed successfully!", {
        description: `Your appointment with Dr. ${doctor?.name} on ${format(date, 'PPP')} at ${timeSlot} has been booked.`,
        duration: 5000,
        action: {
          label: "View Appointments",
          onClick: () => router.push('/profile') // Redirect to profile or appointments page
        },
      });
      
      // Clear form fields
      setDate(undefined);
      setTimeSlot("");
      setPatientProblem("");
      setTermsAccepted(false);
      
    } catch (error) {
      console.error("Error booking appointment:", error);
      toast.error("Failed to book appointment", {
        description: "Please try again later",
        duration: 5000,
      });
    } finally {
      setSubmitting(false);
    }
  };

  // Show combined loading state
  if (loading || authLoading) {
    return (
      <main>
        <Header />
        <div className="container-custom py-20 text-center">
          <p>Loading doctor information...</p>
        </div>
        <Footer />
      </main>
    );
  }

  if (error || !doctor) {
    return (
      <main>
        <Header />
        <div className="container-custom py-20 text-center">
          <h2 className="text-xl font-bold text-red-500 mb-4">Error</h2>
          <p>{error || "Could not find doctor information"}</p>
          <Button 
            onClick={() => window.history.back()}
            className="mt-6"
          >
            Go Back
          </Button>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main>
      <Toaster position="top-right" richColors />
      <Header />

      {/* Rest of the component remains the same */}
      <section className="bg-gray-50 py-4 border-b">
        <div className="container-custom">
          <div className="flex text-sm">
            <Link href="/" className="text-gray-500 hover:text-primary">Home</Link>
            <span className="mx-2 text-gray-400">/</span>
            <Link href="/search?type=doctor" className="text-gray-500 hover:text-primary">Doctors</Link>
            <span className="mx-2 text-gray-400">/</span>
            <Link href={`/doctor/${doctor.id}`} className="text-gray-500 hover:text-primary">{doctor.name}</Link>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-primary">Appointment</span>
          </div>
        </div>
      </section>

      <section className="py-6">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Doctor info card - left column */}
            <div className="md:w-1/4">
              <Card className="border-t-4 border-t-primary">
                <CardContent className="p-6">
                  {/* Doctor card content */}
                  <div className="flex flex-col items-center mb-5">
                    <div className="relative h-32 w-32 mb-3">
                      <Link href={`/doctor/${doctor.id}`}>
                        {doctor.image ? (
                          <Image
                            src={doctor.image}
                            alt={doctor.name}
                            fill
                            className="object-cover rounded-full border-4 border-gray-50 shadow-sm hover:border-primary/50 transition-colors cursor-pointer"
                          />
                        ) : (
                          <Avatar className="h-32 w-32 border-4 border-gray-50 shadow-sm hover:border-primary/50 transition-colors cursor-pointer">
                            <AvatarFallback className="text-2xl bg-primary/10 text-primary">
                              {doctor.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                        )}
                      </Link>
                    </div>
                    
                    {/* Doctor details */}
                    <Link href={`/doctor/${doctor.id}`} className="hover:text-primary/80 transition-colors">
                      <h2 className="text-lg font-bold text-primary text-center">{doctor.name}</h2>
                    </Link>
                    <p className="text-secondary font-medium text-center">{doctor.specialization}</p>
                    <div className="mt-1 flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                      <span className="font-medium">{doctor.rating}</span>
                      <span className="text-sm text-gray-500">({doctor.reviews} reviews)</span>
                    </div>
                  </div>
                  
                  {/* Doctor information sections */}
                  <div className="space-y-4">
                    <div className="pt-3 border-t">
                      <h3 className="font-medium text-gray-900 mb-2">Doctor Information</h3>
                      <div className="space-y-3 text-sm">
                        <div className="flex items-start gap-3">
                          <Building2 className="h-4 w-4 text-primary mt-0.5" />
                          <div>
                            <p className="font-medium">Works at</p>
                            <p className="text-gray-700">{doctor.hospital}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-3">
                          <MapPin className="h-4 w-4 text-primary mt-0.5" />
                          <div>
                            <p className="font-medium">Location</p>
                            <p className="text-gray-700">{doctor.location}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-3">
                          <Clock className="h-4 w-4 text-primary mt-0.5" />
                          <div>
                            <p className="font-medium">Experience</p>
                            <p className="text-gray-700">{doctor.experience}</p>
                          </div>
                        </div>
                        
                        {doctor.education && (
                          <div className="flex items-start gap-3">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary mt-0.5"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5"/></svg>
                            <div>
                              <p className="font-medium">Education</p>
                              <p className="text-gray-700">{doctor.education}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="pt-3 border-t">
                      <h3 className="font-medium text-gray-900 mb-2">Appointment Fee</h3>
                      <div className="bg-green-50 text-green-700 px-3 py-3 rounded text-center font-medium">
                        ৳{doctor.fee}
                      </div>
                      <p className="text-xs text-gray-500 mt-2 text-center">
                        Fee may vary based on appointment type
                      </p>
                    </div>
                    
                    <div className="pt-3 border-t">
                      <h3 className="font-medium text-gray-900 mb-2">Available Consultation</h3>
                      <div className="flex flex-wrap gap-2">
                        <span className="bg-blue-50 text-blue-600 px-2 py-1 rounded-full text-xs font-medium">
                          Chamber Visit
                        </span>
                        <span className="bg-purple-50 text-purple-600 px-2 py-1 rounded-full text-xs font-medium">
                          Video Call
                        </span>
                        <span className="bg-teal-50 text-teal-600 px-2 py-1 rounded-full text-xs font-medium">
                          Phone Call
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-3 border-t text-center">
                    <Link 
                      href={`/doctor/${doctor.id}`}
                      className="text-primary hover:text-primary/80 font-medium flex items-center justify-center gap-2"
                    >
                      View Doctor Profile
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-external-link">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                        <polyline points="15 3 21 3 21 9"></polyline>
                        <line x1="10" y1="14" x2="21" y2="3"></line>
                      </svg>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Appointment booking form - right column */}
            <div className="md:w-3/4">
              <Card>
                <CardHeader>
                  <CardTitle>Book an Appointment</CardTitle>
                  <CardDescription>Fill in the details to schedule your appointment with {doctor.name}</CardDescription>
                </CardHeader>
                
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Show login message if not authenticated */}
                    {!user && (
                      <div className="bg-amber-50 border border-amber-200 px-4 py-3 rounded flex items-center space-x-3 mb-2">
                        <div className="text-amber-600">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
                        </div>
                        <div>
                          <div className="font-medium text-amber-800">Login Required</div>
                          <p className="text-amber-700 text-sm">Please <Link href="/login" className="underline font-medium">login</Link> to book an appointment. Your appointment details will be saved.</p>
                        </div>
                      </div>
                    )}
                    
                    {/* Appointment type selection */}
                    <div className="space-y-4">
                      <h3 className="font-medium">Select Appointment Type</h3>
                      <Tabs defaultValue="chamber" className="w-full" onValueChange={setAppointmentType}>
                        <TabsList className="grid w-full grid-cols-3">
                          <TabsTrigger value="chamber" className="flex items-center gap-2">
                            <Building2 className="h-4 w-4" />
                            Chamber Visit
                          </TabsTrigger>
                          <TabsTrigger value="video" className="flex items-center gap-2">
                            <Video className="h-4 w-4" />
                            Video Call
                          </TabsTrigger>
                          <TabsTrigger value="phone" className="flex items-center gap-2">
                            <Phone className="h-4 w-4" />
                            Phone Call
                          </TabsTrigger>
                        </TabsList>
                      </Tabs>
                    </div>
                    
                    {/* Date and time selection */}
                    <div className="space-y-5 border rounded-lg p-4 bg-gray-50">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium text-lg">Select Date & Time</h3>
                        {date && timeSlot && (
                          <div className="flex items-center text-sm bg-green-50 text-green-700 px-3 py-1 rounded-full">
                            <CheckCircle className="h-3.5 w-3.5 mr-1.5" />
                            <span>{format(date, 'MMM d, yyyy')} at {timeSlot}</span>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex flex-col md:flex-row gap-6">
                        <div className="md:w-7/12">
                          <div className="bg-white rounded-md shadow-sm p-2">                            <Calendar
                              mode="single"
                              selected={date}
                              onSelect={(newDate) => {
                                setDate(newDate);
                                setSelectedDate(newDate);
                              }}
                              className="rounded-md"
                              disabled={(date) => date < new Date()}
                              classNames={{
                                month: "space-y-2",
                                caption: "flex justify-center pt-1 relative items-center",
                                caption_label: "text-sm font-medium",
                                nav: "space-x-1 flex items-center",
                                table: "w-full border-collapse space-y-0",
                                head_row: "flex",
                                head_cell: "text-muted-foreground rounded-md w-8 font-normal text-[0.7rem]",
                                row: "flex w-full mt-1",
                                cell: "h-8 w-8 text-center text-xs p-0 relative [&:has([aria-selected])]:bg-accent",
                                day: "h-8 w-8 p-0 font-normal aria-selected:opacity-100",
                                day_selected: "!bg-primary !text-white hover:!bg-primary hover:!text-white focus:!bg-primary focus:!bg-primary font-medium rounded-md",
                                day_disabled: "text-gray-300 opacity-50",
                                day_today: "bg-accent text-accent-foreground",
                                day_outside: "text-muted-foreground opacity-50",
                                day_range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
                                day_hidden: "invisible",
                              }}
                              modifiers={{
                                available: (date) => date >= new Date(),
                              }}
                              modifiersClassNames={{
                                available: "bg-green-100 hover:bg-green-200",
                              }}
                            />
                          </div>
                        </div>
                        
                        <div className="md:w-5/12">
                          <div className="bg-white rounded-md shadow-sm p-4">                            <h4 className="text-sm font-medium mb-3 text-gray-700">Available Time Slots</h4>
                            <div className="h-[210px] overflow-y-auto pr-1 space-y-1.5">
                              {availableTimeSlots.map((slot) => (
                                <button
                                  key={`${slot.startTime}-${slot.endTime}`}
                                  type="button"
                                  onClick={() => setTimeSlot(`${slot.startTime} - ${slot.endTime}`)}
                                  className={`w-full py-2 px-3 rounded-md text-sm transition-colors flex items-center justify-between ${
                                    timeSlot === `${slot.startTime} - ${slot.endTime}`
                                      ? "bg-primary text-white" 
                                      : "bg-gray-50 text-gray-800 hover:bg-gray-100"
                                  }`}
                                >
                                  <span>{slot.startTime} - {slot.endTime}</span>
                                  {timeSlot === `${slot.startTime} - ${slot.endTime}` && <CheckCircle className="h-4 w-4" />}
                                </button>
                              ))}
                              {availableTimeSlots.length === 0 && (
                                <p className="text-center py-8 text-gray-500 text-sm">
                                  No slots available for selected date
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {!date && (
                        <div className="text-sm text-amber-600 bg-amber-50 p-2 rounded flex items-center">
                          Please select a date and time slot to continue
                        </div>
                      )}
                    </div>
                    
                    {/* Patient Information */}
                    <div className="space-y-4">
                      <h3 className="font-medium">Patient Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="patientName">Full Name</Label>
                          <Input 
                            id="patientName" 
                            placeholder="Enter patient's full name"
                            value={patientName} 
                            onChange={(e) => setPatientName(e.target.value)}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="patientPhone">Phone Number</Label>
                          <Input 
                            id="patientPhone" 
                            placeholder="Enter phone number"
                            value={patientPhone} 
                            onChange={(e) => setPatientPhone(e.target.value)}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="patientEmail">Email Address</Label>
                          <Input 
                            id="patientEmail" 
                            type="email" 
                            placeholder="Enter email address"
                            value={patientEmail} 
                            onChange={(e) => setPatientEmail(e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="patientAge">Age</Label>
                          <Input 
                            id="patientAge" 
                            placeholder="Enter patient's age"
                            value={patientAge} 
                            onChange={(e) => setPatientAge(e.target.value)}
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Gender</Label>
                        <RadioGroup 
                          value={patientGender} 
                          onValueChange={setPatientGender} 
                          className="flex space-x-4"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="male" id="male" />
                            <Label htmlFor="male">Male</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="female" id="female" />
                            <Label htmlFor="female">Female</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="other" id="other" />
                            <Label htmlFor="other">Other</Label>
                          </div>
                        </RadioGroup>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="patientProblem">Health Problem</Label>
                        <Textarea 
                          id="patientProblem" 
                          placeholder="Describe your health problem briefly"
                          value={patientProblem} 
                          onChange={(e) => setPatientProblem(e.target.value)}
                          rows={4}
                        />
                      </div>
                    </div>
                    
                    {/* Terms and Conditions */}
                    <div className="space-y-4 border-t pt-4">
                      <div className="flex items-start space-x-2">
                        <div className="flex h-5 items-center">
                          <input
                            type="checkbox"
                            id="terms"
                            className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                            checked={termsAccepted}
                            onChange={(e) => setTermsAccepted(e.target.checked)}
                            required
                          />
                        </div>
                        <div className="ml-2">
                          <label 
                            htmlFor="terms" 
                            className="text-sm text-gray-700 cursor-pointer"
                            onClick={() => setTermsAccepted(!termsAccepted)}
                          >
                            I agree to the terms and conditions and privacy policy. I understand that my data will be used as described.
                          </label>
                        </div>
                      </div>
                    </div>
                    
                    {/* Submit Button - With toast notification */}
                    <Button 
                      type="submit" 
                      size="lg" 
                      className="w-full bg-primary hover:bg-primary/90 text-white"
                      disabled={!date || !timeSlot || !termsAccepted || submitting}
                    >
                      {submitting ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Processing...
                        </>
                      ) : (
                        <>
                          Confirm Appointment
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </main>
  );
}
