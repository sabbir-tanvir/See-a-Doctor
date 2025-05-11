"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/AuthContext";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Calendar } from "@/components/ui/calendar";
import { toast, Toaster } from "sonner";
import {
  MoreVertical,
  Calendar as CalendarIcon,
  Clock,
  Check,
  X,
  AlertCircle,
  Filter,
  RefreshCw,
  User,
  Phone,
  Mail,
  MessageSquare,
  Printer,
  ClipboardCheck,
  Search,
} from "lucide-react";
import { format, parseISO, isToday, isAfter, isBefore, addDays } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { getDoctorIdByEmail } from "@/data/scheduleData";

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

export default function DoctorAppointmentsPage() {
  const { user, loading: authLoading, isDoctor } = useAuth();
  const router = useRouter();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [filteredAppointments, setFilteredAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [dateFilter, setDateFilter] = useState<Date | undefined>(undefined);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const [isStatusDialogOpen, setIsStatusDialogOpen] = useState(false);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
  const [newStatus, setNewStatus] = useState<"pending" | "confirmed" | "completed" | "cancelled">("confirmed");

  useEffect(() => {
    // Redirect if not authenticated or not a doctor
    if (!authLoading && (!user || !isDoctor)) {
      toast.error("Only doctors can access this page");
      router.push("/");
    }

    // Fetch appointments when user is loaded
    if (user && isDoctor) {
      fetchAppointments();
    }
  }, [user, isDoctor, authLoading, router]);

  // Apply filters whenever filter state changes
  useEffect(() => {
    if (appointments.length > 0) {
      let filtered = [...appointments];
      
      // Status filter
      if (statusFilter !== "all") {
        filtered = filtered.filter(appointment => appointment.status === statusFilter);
      }
      
      // Date filter
      if (dateFilter) {
        const dateString = format(dateFilter, 'yyyy-MM-dd');
        filtered = filtered.filter(appointment => appointment.appointmentDate === dateString);
      }
      
      // Search query filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        filtered = filtered.filter(
          appointment => 
            appointment.patientName?.toLowerCase().includes(query) ||
            appointment.patientPhone?.toLowerCase().includes(query) ||
            appointment.patientEmail?.toLowerCase().includes(query)
        );
      }
      
      setFilteredAppointments(filtered);
    }
  }, [appointments, statusFilter, dateFilter, searchQuery]);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Get doctor ID from email
      const doctorId = getDoctorIdByEmail(user?.email || "");
      
      // Query parameter
      const queryParam = doctorId 
        ? `doctorId=${doctorId}` 
        : `doctorEmail=${encodeURIComponent(user?.email || "")}`;
        
      const response = await fetch(`/api/doctor/appointments?${queryParam}`);
      
      if (!response.ok) {
        throw new Error("Failed to fetch appointments");
      }
      
      const data = await response.json();
      
      if (data.success) {
        setAppointments(data.appointments || []);
        setFilteredAppointments(data.appointments || []);
      } else {
        throw new Error(data.message || "Failed to fetch appointments");
      }
    } catch (error: any) {
      console.error("Error fetching appointments:", error);
      setError(error.message || "Error fetching appointments");
    } finally {
      setLoading(false);
    }
  };

  const updateAppointmentStatus = async (appointmentId: string, status: string) => {
    try {
      setIsUpdatingStatus(true);
      
      const response = await fetch("/api/doctor/appointments", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          appointmentId,
          status,
        }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        // Update appointment in local state
        const updatedAppointments = appointments.map(appointment => {
          if (appointment.id === appointmentId) {
            return {
              ...appointment,
              status: status as "pending" | "confirmed" | "completed" | "cancelled",
            };
          }
          return appointment;
        });
        
        setAppointments(updatedAppointments);
        setIsStatusDialogOpen(false);
        setSelectedAppointment(null);
        
        toast.success(`Appointment ${status}`);
      } else {
        throw new Error(data.message || "Failed to update appointment status");
      }
    } catch (error: any) {
      console.error("Error updating appointment status:", error);
      toast.error(error.message || "Error updating appointment status");
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">Pending</Badge>;
      case "confirmed":
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Confirmed</Badge>;
      case "completed":
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Completed</Badge>;
      case "cancelled":
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Cancelled</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getAppointmentTypeIcon = (type: string) => {
    switch (type) {
      case "chamber":
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Chamber Visit</Badge>;
      case "video":
        return <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">Video Call</Badge>;
      case "phone":
        return <Badge variant="outline" className="bg-teal-50 text-teal-700 border-teal-200">Phone Call</Badge>;
      default:
        return <Badge variant="outline">{type}</Badge>;
    }
  };

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

  const getCompletedAppointments = () => {
    return appointments.filter(appointment => appointment.status === 'completed');
  };

  const getCancelledAppointments = () => {
    return appointments.filter(appointment => appointment.status === 'cancelled');
  };

  const viewAppointmentDetails = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setIsDetailDialogOpen(true);
  };

  const openStatusUpdateDialog = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setNewStatus(appointment.status === 'pending' ? 'confirmed' : 'completed');
    setIsStatusDialogOpen(true);
  };

  const handlePrint = () => {
    window.print();
  };

  // Show loading state
  if (authLoading || (!user && !authLoading)) {
    return (
      <main className="min-h-screen">
        <Header />
        <div className="container mx-auto py-20 text-center">
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
            <span className="text-primary">Appointments</span>
          </div>
        </div>
      </section>
      
      <section className="py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold mb-6">My Appointments</h1>
          
          {/* Dashboard Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Today's Appointments</p>
                    <h3 className="text-2xl font-bold mt-1">{getTodayAppointments().length}</h3>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-500">
                    <CalendarIcon className="h-6 w-6" />
                  </div>
                </div>
                <Progress className="mt-4" value={(getTodayAppointments().length / Math.max(appointments.length, 1)) * 100} />
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Upcoming</p>
                    <h3 className="text-2xl font-bold mt-1">{getUpcomingAppointments().length}</h3>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-500">
                    <Clock className="h-6 w-6" />
                  </div>
                </div>
                <Progress className="mt-4" value={(getUpcomingAppointments().length / Math.max(appointments.length, 1)) * 100} />
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Completed</p>
                    <h3 className="text-2xl font-bold mt-1">{getCompletedAppointments().length}</h3>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-green-50 flex items-center justify-center text-green-500">
                    <Check className="h-6 w-6" />
                  </div>
                </div>
                <Progress className="mt-4" value={(getCompletedAppointments().length / Math.max(appointments.length, 1)) * 100} />
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Cancelled</p>
                    <h3 className="text-2xl font-bold mt-1">{getCancelledAppointments().length}</h3>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-red-50 flex items-center justify-center text-red-500">
                    <X className="h-6 w-6" />
                  </div>
                </div>
                <Progress className="mt-4" value={(getCancelledAppointments().length / Math.max(appointments.length, 1)) * 100} />
              </CardContent>
            </Card>
          </div>
          
          {/* Filters */}
          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="flex flex-wrap gap-4 items-end">
                <div className="space-y-2 flex-1">
                  <Label htmlFor="search">Search Patients</Label>
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                    <Input
                      id="search"
                      type="search"
                      placeholder="Search by name, phone, or email"
                      className="pl-9"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="space-y-2 w-48">
                  <Label htmlFor="status">Status</Label>
                  <select
                    id="status"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                  >
                    <option value="all">All Statuses</option>
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
                
                <div className="space-y-2 w-52">
                  <Label htmlFor="date">Date Filter</Label>
                  <Dialog>                    <DialogTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left font-normal" id="date">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {dateFilter ? format(dateFilter, 'PPP') : 'Pick a date'}
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="p-0" style={{ maxWidth: '400px' }}>
                      <DialogTitle className="sr-only">Pick a date</DialogTitle>
                      <Calendar
                        mode="single"
                        selected={dateFilter}
                        onSelect={setDateFilter}
                        initialFocus
                      />
                    </DialogContent>
                  </Dialog>
                </div>
                
                <div className="space-y-2 flex justify-end items-end">
                  <Button 
                    variant="outline" 
                    className="flex gap-2"
                    onClick={() => {
                      setStatusFilter("all");
                      setSearchQuery("");
                      setDateFilter(undefined);
                    }}
                  >
                    <RefreshCw className="h-4 w-4" />
                    Reset Filters
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Appointment Table */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Appointments {filteredAppointments.length > 0 && `(${filteredAppointments.length})`}</CardTitle>
                <Button variant="outline" onClick={fetchAppointments}>
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Refresh
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="text-center py-8">Loading appointments...</div>
              ) : error ? (
                <div className="text-center py-8 text-red-500">{error}</div>
              ) : filteredAppointments.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  No appointments found with the current filters
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Patient</TableHead>
                        <TableHead>Date & Time</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredAppointments.map((appointment) => (
                        <TableRow key={appointment.id}>
                          <TableCell className="font-medium">
                            <div>
                              <p className="font-semibold">{appointment.patientName}</p>
                              <p className="text-sm text-gray-500">{appointment.patientPhone}</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div>
                              <p className="font-medium">
                                {format(parseISO(appointment.appointmentDate), 'MMM d, yyyy')}
                              </p>
                              <p className="text-sm text-gray-500">{appointment.timeSlot}</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            {getAppointmentTypeIcon(appointment.appointmentType)}
                          </TableCell>
                          <TableCell>
                            {getStatusBadge(appointment.status)}
                          </TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => viewAppointmentDetails(appointment)}>
                                  View Details
                                </DropdownMenuItem>
                                
                                {appointment.status === 'pending' && (
                                  <DropdownMenuItem onClick={() => updateAppointmentStatus(appointment.id, 'confirmed')}>
                                    Confirm Appointment
                                  </DropdownMenuItem>
                                )}
                                
                                {(appointment.status === 'pending' || appointment.status === 'confirmed') && (
                                  <DropdownMenuItem onClick={() => updateAppointmentStatus(appointment.id, 'completed')}>
                                    Mark as Completed
                                  </DropdownMenuItem>
                                )}
                                
                                {appointment.status !== 'cancelled' && appointment.status !== 'completed' && (
                                  <DropdownMenuItem onClick={() => updateAppointmentStatus(appointment.id, 'cancelled')}>
                                    Cancel Appointment
                                  </DropdownMenuItem>
                                )}
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </section>
      
      {/* Appointment Details Dialog */}
      <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
        <DialogContent className="sm:max-w-[625px]">
          <DialogHeader>
            <DialogTitle>Appointment Details</DialogTitle>
            <DialogDescription>
              Appointment #{selectedAppointment?.id.slice(0, 8)}
            </DialogDescription>
          </DialogHeader>
          
          {selectedAppointment && (
            <div className="space-y-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-lg">{selectedAppointment.patientName}</h3>
                  <p className="text-gray-500">
                    {selectedAppointment.patientGender}, {selectedAppointment.patientAge} years
                  </p>
                </div>
                <div className="text-right">
                  <div className="font-medium">
                    {format(parseISO(selectedAppointment.appointmentDate), 'PPP')}
                  </div>
                  <div className="text-gray-500">{selectedAppointment.timeSlot}</div>
                </div>
              </div>
              
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <div className="bg-gray-100 p-2 rounded-full">
                    <Phone className="h-4 w-4 text-gray-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="font-medium">{selectedAppointment.patientPhone}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <div className="bg-gray-100 p-2 rounded-full">
                    <Mail className="h-4 w-4 text-gray-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium">{selectedAppointment.patientEmail}</p>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h4 className="font-medium mb-2">Appointment Details</h4>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-gray-500">Type</p>
                    <p className="font-medium">
                      {selectedAppointment.appointmentType === 'chamber' && 'Chamber Visit'}
                      {selectedAppointment.appointmentType === 'video' && 'Video Call'}
                      {selectedAppointment.appointmentType === 'phone' && 'Phone Call'}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500">Status</p>
                    <div>{getStatusBadge(selectedAppointment.status)}</div>
                  </div>
                  
                  <div className="col-span-2">
                    <p className="text-gray-500">Health Problem</p>
                    <p className="font-medium">
                      {selectedAppointment.patientProblem || "No problem description provided"}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between items-center pt-2">
                <Button variant="outline" onClick={handlePrint}>
                  <Printer className="h-4 w-4 mr-2" />
                  Print
                </Button>
                
                {selectedAppointment.status !== 'completed' && selectedAppointment.status !== 'cancelled' && (
                  <div className="space-x-2">
                    {selectedAppointment.status === 'pending' && (
                      <Button onClick={() => updateAppointmentStatus(selectedAppointment.id, 'confirmed')}>
                        Confirm Appointment
                      </Button>
                    )}
                    <Button onClick={() => updateAppointmentStatus(selectedAppointment.id, 'completed')}>
                      Mark as Completed
                    </Button>
                    <Button variant="destructive" onClick={() => updateAppointmentStatus(selectedAppointment.id, 'cancelled')}>
                      Cancel Appointment
                    </Button>
                  </div>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
      
      {/* Status Update Dialog */}
      <Dialog open={isStatusDialogOpen} onOpenChange={setIsStatusDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Update Appointment Status</DialogTitle>
            <DialogDescription>
              Change the status of this appointment
            </DialogDescription>
          </DialogHeader>
          
          {selectedAppointment && (
            <div className="space-y-4 py-2">
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <select
                  id="status"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value as any)}
                >
                  {selectedAppointment.status !== 'completed' && (
                    <option value="completed">Completed</option>
                  )}
                  {selectedAppointment.status === 'pending' && (
                    <option value="confirmed">Confirmed</option>
                  )}
                  {selectedAppointment.status !== 'cancelled' && (
                    <option value="cancelled">Cancelled</option>
                  )}
                </select>
              </div>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsStatusDialogOpen(false)}>
                  Cancel
                </Button>
                <Button
                  onClick={() => updateAppointmentStatus(selectedAppointment.id, newStatus)}
                  disabled={isUpdatingStatus}
                >
                  {isUpdatingStatus ? "Updating..." : "Update Status"}
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>
      
      <Footer />
    </main>
  );
}
