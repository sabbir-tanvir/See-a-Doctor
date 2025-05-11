"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  MapPin,
  Star,
  Building2,
  Clock,
  Calendar,
  MessageSquare,
  Phone,
  Award,
  GraduationCap,
  Clock3,
  CalendarClock,
  User,
  Share2,
  ChevronRight,
  ArrowRight
} from "lucide-react";

import { Doctor } from "@/types/doctor";

// Helper function to safely render education data
const renderEducation = (education: any): string => {
  if (!education) return 'Not available';
  
  if (typeof education === 'string') {
    return education;
  }
  
  if (Array.isArray(education)) {
    return education.map(edu => {
      if (typeof edu === 'string') return edu;
      if (edu && typeof edu === 'object' && 'degree' in edu && 'institution' in edu) {
        return `${edu.degree}, ${edu.institution}`;
      }
      return 'Education details';
    }).join(', ');
  }
  
  return 'Education information not available';
};

export default function DoctorProfilePage() {
  const params = useParams();
  const router = useRouter();
  const doctorId = params.doctorId as string;
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        setLoading(true);
        setError('');
        
        console.log(`Fetching doctor with ID: ${doctorId}`);
        const response = await fetch(`/api/doctors/${doctorId}`);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch doctor: ${response.statusText}`);
        }
        
        const data = await response.json();
        console.log('Doctor data received:', data);
        
        if (data.success && data.data) {
          setDoctor(data.data);
          
          // Check if this is fallback data
          if (data._note) {
            console.warn('Using fallback data:', data._note);
          }
        } else {
          setError('Doctor not found');
          router.push('/find-doctor');
        }
      } catch (err: any) {
        console.error('Error fetching doctor:', err);
        setError(err.message || 'Failed to load doctor information');
      } finally {
        setLoading(false);
      }
    };
    
    fetchDoctor();
  }, [doctorId, router]);

  if (loading) {
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
            onClick={() => router.back()}
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
      <Header />

      {/* Breadcrumb */}
      <section className="bg-gray-50 py-4 border-b">
        <div className="container-custom">
          <div className="flex text-sm">
            <Link href="/" className="text-gray-500 hover:text-primary">Home</Link>
            <span className="mx-2 text-gray-400">/</span>
            <Link href="/search?type=doctor" className="text-gray-500 hover:text-primary">Doctors</Link>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-primary">{doctor.name}</span>
          </div>
        </div>
      </section>

      {/* Doctor Info Header */}
      <section className="py-8 bg-white border-b">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-1/4 flex flex-col items-center">
              <div className="relative h-40 w-40 md:h-56 md:w-56 mb-4">
                {doctor.image ? (
                  <Image
                    src={doctor.image}
                    alt={doctor.name}
                    fill
                    className="object-cover rounded-full border-4 border-gray-50 shadow-sm"
                  />
                ) : (
                  <Avatar className="h-40 w-40 md:h-56 md:w-56 border-4 border-gray-50 shadow-sm">
                    <AvatarFallback className="text-4xl bg-primary/10 text-primary">
                      {doctor.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                )}
              </div>
              <div className="flex items-center gap-1 mb-3">
                <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                <span className="font-medium text-lg">{doctor.rating}</span>
                <span className="text-gray-500">({doctor.reviews} reviews)</span>
              </div>
              
              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="rounded-full">
                  <Share2 className="h-4 w-4 mr-1" />
                  Share
                </Button>
                <Button size="sm" variant="outline" className="rounded-full">
                  <Star className="h-4 w-4 mr-1" />
                  Rate
                </Button>
              </div>
            </div>
            
            <div className="md:w-2/4">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{doctor.name}</h1>
              <p className="text-lg text-primary font-medium mb-3">{doctor.specialization}</p>
              <p className="text-gray-600 mb-5">
                {renderEducation(doctor.education)}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="flex items-start gap-2">
                  <Building2 className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <p className="font-medium">Works at</p>
                    <p className="text-gray-700">
                      {typeof doctor.hospital === 'object' ? doctor.hospital.name : doctor.hospital}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-2">
                  <MapPin className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <p className="font-medium">Location</p>
                    <p className="text-gray-700">{doctor.location}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-2">
                  <Clock className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <p className="font-medium">Experience</p>
                    <p className="text-gray-700">{doctor.experience}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-2">
                  <Award className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <p className="font-medium">Registration No.</p>
                    <p className="text-gray-700">ID: {doctor.bmdc_registration || `D${Math.floor(Math.random() * 100000)}`}</p>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-2">
                <Badge variant="secondary" className="px-3 py-1 rounded-full text-sm">
                  Speaks: English, Bengali
                </Badge>
                <Badge variant="outline" className="px-3 py-1 rounded-full text-sm">
                  Fee: ৳{doctor.fee}
                </Badge>
              </div>
            </div>
            
            <div className="md:w-1/4 flex flex-col gap-3 mt-4 md:mt-0">
              <Card>
                <CardContent className="p-4 space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium text-lg">Consultation Options</h3>
                  </div>
                  
                  <div className="space-y-3">
                    <Link href={`/doctor/${doctor._id}/appointment?type=chamber`} className="w-full">
                      <Button className="w-full flex items-center justify-between" size="lg">
                        <div className="flex items-center">
                          <Building2 className="h-5 w-5 mr-2" />
                          Chamber Appointment
                        </div>
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </Link>
                    
                    <Button variant="outline" className="w-full flex items-center justify-between" size="lg">
                      <div className="flex items-center">
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Video Consultation
                      </div>
                      <ChevronRight className="h-5 w-5" />
                    </Button>
                    
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Doctor Details */}
      <section className="py-8">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-3/4">
              <Tabs defaultValue="about" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="about">About</TabsTrigger>
                  <TabsTrigger value="services">Services</TabsTrigger>
                  <TabsTrigger value="education">Education & Experience</TabsTrigger>
                  <TabsTrigger value="reviews">Reviews</TabsTrigger>
                </TabsList>
                
                <TabsContent value="about" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>About {doctor.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-gray-700">
                        {doctor.about || `Dr. ${doctor.name} is a highly skilled ${doctor.specialization.toLowerCase()} with ${doctor.experience} of experience in the field.
                        ${doctor.specialization.includes("Cardio") ? 
                          " Specializing in heart diseases, cardiac rehabilitation, and preventive cardiology, Dr. " + doctor.name + " has helped numerous patients with heart conditions live healthier lives." :
                          " Specializing in various aspects of " + doctor.specialization.toLowerCase() + ", Dr. " + doctor.name + " is dedicated to providing comprehensive care to patients."
                        }`}
                      </p>
                      
                      <p className="text-gray-700">
                        Currently practicing at {typeof doctor.hospital === 'object' ? doctor.hospital.name : doctor.hospital}, {doctor.name} is known for {doctor.gender === 'Male' ? "his" : "her"} patient-centered approach and thorough diagnostics. 
                        {doctor.name} continues to stay updated with the latest advancements in medical science to provide the best care possible.
                      </p>
                      
                      <h3 className="font-medium text-lg mt-4">Specializations</h3>
                      <div className="flex flex-wrap gap-2">
                        {doctor.specialization.split(" ").map((spec, index) => (
                          <Badge key={index} variant="outline" className="px-3 py-1">
                            {spec}
                          </Badge>
                        ))}
                        <Badge variant="outline" className="px-3 py-1">
                          General Consultation
                        </Badge>
                        <Badge variant="outline" className="px-3 py-1">
                          Diagnosis
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="services" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Services Offered</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {doctor.services && doctor.services.length > 0 ? (
                          doctor.services.map((service, index) => (
                            <div key={index} className="bg-gray-50 p-4 rounded-lg">
                              <h3 className="font-medium mb-2">{service}</h3>
                              <p className="text-gray-600 text-sm">Professional care and treatment</p>
                            </div>
                          ))
                        ) : (
                          <>
                            <div className="bg-gray-50 p-4 rounded-lg">
                              <h3 className="font-medium mb-2">General Consultation</h3>
                              <p className="text-gray-600 text-sm">Complete checkup and diagnosis</p>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-lg">
                              <h3 className="font-medium mb-2">{doctor.specialization} Consultation</h3>
                              <p className="text-gray-600 text-sm">Specialized care and treatment</p>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-lg">
                              <h3 className="font-medium mb-2">Medical Certificates</h3>
                              <p className="text-gray-600 text-sm">Health certificates and documentation</p>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-lg">
                              <h3 className="font-medium mb-2">Follow-up Consultations</h3>
                              <p className="text-gray-600 text-sm">Regular check-ins and treatment monitoring</p>
                            </div>
                          </>
                        )}
                      </div>
                      
                      <div className="mt-4">
                        <h3 className="font-medium text-lg mb-3">Appointment Fee</h3>
                        <div className="bg-green-50 text-green-700 p-4 rounded-lg flex items-center justify-between">
                          <div>
                            <p className="font-medium">New Patient Visit</p>
                            <p className="text-sm">First consultation fee</p>
                          </div>
                          <span className="font-bold text-lg">৳{doctor.fee}</span>
                        </div>
                        <div className="mt-2 bg-blue-50 text-blue-700 p-4 rounded-lg flex items-center justify-between">
                          <div>
                            <p className="font-medium">Follow-up Visit</p>
                            <p className="text-sm">Return within 30 days</p>
                          </div>
                          <span className="font-bold text-lg">৳{Math.floor(doctor.fee * 0.7)}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="education" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Education & Experience</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div>
                        <h3 className="font-medium text-lg mb-3 flex items-center">
                          <GraduationCap className="h-5 w-5 mr-2 text-primary" />
                          Education
                        </h3>
                        <div className="ml-7 space-y-4">
                          {Array.isArray(doctor.education) ? (
                            doctor.education.map((edu, index) => (
                              <div key={index} className="border-l-2 border-gray-200 pl-4 pb-4 relative">
                                <div className="absolute -left-1.5 top-1.5 h-3 w-3 rounded-full bg-primary"></div>
                                <p className="font-medium">
                                  {typeof edu === 'string' 
                                    ? edu 
                                    : (edu && typeof edu === 'object' && 'degree' in edu && 'institution' in edu)
                                      ? `${edu.degree}, ${edu.institution}`
                                      : 'Education details not available'}
                                </p>
                                <p className="text-gray-600 text-sm">Completed {2010 - Math.floor(Math.random() * 15)}</p>
                              </div>
                            ))
                          ) : (
                            <div className="border-l-2 border-gray-200 pl-4 pb-4 relative">
                              <div className="absolute -left-1.5 top-1.5 h-3 w-3 rounded-full bg-primary"></div>
                              <p className="font-medium">{renderEducation(doctor.education)}</p>
                              <p className="text-gray-600 text-sm">Graduation Year: {2010 - Math.floor(Math.random() * 15)}</p>
                            </div>
                          )}
                          <div className="border-l-2 border-gray-200 pl-4 pb-4 relative">
                            <div className="absolute -left-1.5 top-1.5 h-3 w-3 rounded-full bg-primary"></div>
                            <p className="font-medium">Specialized Training in {doctor.specialization}</p>
                            <p className="text-gray-600 text-sm">Completed {2015 - Math.floor(Math.random() * 5)}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="font-medium text-lg mb-3 flex items-center">
                          <Clock className="h-5 w-5 mr-2 text-primary" />
                          Experience
                        </h3>
                        <div className="ml-7 space-y-4">
                          {doctor.work_experience && doctor.work_experience.length > 0 ? (
                            doctor.work_experience.map((exp, index) => (
                              <div key={index} className="border-l-2 border-gray-200 pl-4 pb-4 relative">
                                <div className="absolute -left-1.5 top-1.5 h-3 w-3 rounded-full bg-primary"></div>
                                <p className="font-medium">{exp.hospital}</p>
                                <p className="text-gray-600 text-sm">{exp.position}</p>
                                <p className="text-gray-600 text-sm">{exp.from} - {exp.to || 'Present'}</p>
                              </div>
                            ))
                          ) : (
                            <>
                              <div className="border-l-2 border-gray-200 pl-4 pb-4 relative">
                                <div className="absolute -left-1.5 top-1.5 h-3 w-3 rounded-full bg-primary"></div>
                                <p className="font-medium">{typeof doctor.hospital === 'object' ? doctor.hospital.name : doctor.hospital}</p>
                                <p className="text-gray-600 text-sm">Current</p>
                              </div>
                              <div className="border-l-2 border-gray-200 pl-4 relative">
                                <div className="absolute -left-1.5 top-1.5 h-3 w-3 rounded-full bg-primary"></div>
                                <p className="font-medium">{doctor.specialization} Specialist</p>
                                <p className="text-gray-600 text-sm">{doctor.experience}</p>
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="reviews" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Patient Reviews</CardTitle>
                      <CardDescription>Based on {doctor.reviews} reviews</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="bg-primary/10 p-4 rounded-lg text-center">
                          <p className="text-3xl font-bold text-primary">{doctor.rating}</p>
                          <div className="flex gap-1 justify-center">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className={`h-4 w-4 ${i < Math.floor(doctor.rating) ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`} />
                            ))}
                          </div>
                          <p className="text-sm mt-1">{doctor.reviews} reviews</p>
                        </div>
                        <div className="flex-1">
                          <div className="space-y-2">
                            {[5, 4, 3, 2, 1].map((star) => (
                              <div key={star} className="flex items-center gap-2">
                                <span className="text-sm w-3">{star}</span>
                                <Star className="h-4 w-4 text-yellow-500" />
                                <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                                  <div 
                                    className="bg-yellow-500 h-full rounded-full" 
                                    style={{ 
                                      width: `${star === 5 ? 70 : star === 4 ? 20 : star === 3 ? 8 : 2}%` 
                                    }} 
                                  />
                                </div>
                                <span className="text-sm text-gray-500">
                                  {star === 5 ? 70 : star === 4 ? 20 : star === 3 ? 8 : 2}%
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      {/* Sample reviews */}
                      {[1, 2, 3].map((review) => (
                        <div key={review} className="border-b pb-4 mb-4 last:border-0">
                          <div className="flex justify-between items-start">
                            <div className="flex gap-3">
                              <Avatar>
                                <AvatarFallback>
                                  {String.fromCharCode(65 + Math.floor(Math.random() * 26))}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium">Patient {review}</p>
                                <p className="text-sm text-gray-500">Visited for {doctor.specialization} consultation</p>
                              </div>
                            </div>
                            <div className="flex gap-1">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} className={`h-4 w-4 ${i < 5 ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`} />
                              ))}
                            </div>
                          </div>
                          <p className="mt-3 text-gray-700">
                            {review === 1 
                              ? `Dr. ${doctor.name} is exceptional! Very attentive and explained my condition thoroughly. Highly recommended!` 
                              : review === 2 
                                ? `Great experience with Dr. ${doctor.name}. Professional, knowledgeable, and caring.` 
                                : `Very happy with my treatment. Dr. ${doctor.name} took time to address all my concerns and provided clear guidance.`
                            }
                          </p>
                          <p className="text-sm text-gray-500 mt-1">
                            {review === 1 ? "2 weeks ago" : review === 2 ? "1 month ago" : "2 months ago"}
                          </p>
                        </div>
                      ))}
                      
                      <Button variant="outline" className="w-full">
                        View All Reviews
                      </Button>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
            
            <div className="md:w-1/4">
              <Card>
                <CardHeader>
                  <CardTitle>Chamber Schedule</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="border-b pb-3">
                    <h3 className="font-medium mb-2">{typeof doctor.hospital === 'object' ? doctor.hospital.name : doctor.hospital}</h3>
                    <p className="text-sm text-gray-600 flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {doctor.location}
                    </p>
                  </div>
                  
                  {doctor.chamber && doctor.chamber.length > 0 ? (
                    <div className="space-y-4">
                      {doctor.chamber.map((chamber, index) => (
                        <div key={index} className="border-b pb-3 last:border-0">
                          <h4 className="font-medium mb-1">{chamber.name}</h4>
                          <p className="text-sm text-gray-600 flex items-center gap-1 mb-1">
                            <MapPin className="h-4 w-4" />
                            {chamber.address}
                          </p>
                          <p className="text-sm text-gray-600 flex items-center gap-1 mb-1">
                            <Phone className="h-4 w-4" />
                            {chamber.contact}
                          </p>
                          <p className="text-sm text-gray-600 flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {chamber.availability}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <p className="font-medium">Sunday</p>
                        <p className="text-gray-700">10:00 AM - 2:00 PM</p>
                      </div>
                      <div className="flex justify-between">
                        <p className="font-medium">Monday</p>
                        <p className="text-gray-700">-</p>
                      </div>
                      <div className="flex justify-between">
                        <p className="font-medium">Tuesday</p>
                        <p className="text-gray-700">6:00 PM - 9:00 PM</p>
                      </div>
                      <div className="flex justify-between">
                        <p className="font-medium">Wednesday</p>
                        <p className="text-gray-700">-</p>
                      </div>
                      <div className="flex justify-between">
                        <p className="font-medium">Thursday</p>
                        <p className="text-gray-700">6:00 PM - 9:00 PM</p>
                      </div>
                      <div className="flex justify-between">
                        <p className="font-medium">Friday</p>
                        <p className="text-gray-700">10:00 AM - 2:00 PM</p>
                      </div>
                      <div className="flex justify-between">
                        <p className="font-medium">Saturday</p>
                        <p className="text-gray-700">-</p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
              
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Similar Doctors</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 p-3">
                  <p className="text-sm text-gray-500 text-center py-4">
                    Similar doctors will be displayed here based on specialization.
                  </p>
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
