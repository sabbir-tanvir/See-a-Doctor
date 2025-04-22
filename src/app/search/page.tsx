"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Search,
  MapPin,
  Star,
  Filter,
  Building2,
  User,
  Clock,
  Calendar,
  MessageSquare,
  CalendarClock,
  ChevronDown
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Sample doctors data
const doctorsData = [
  {
    id: 1,
    name: "Dr. Anika Rahman",
    specialization: "Gynecologist & Obstetrician",
    education: "MBBS, FCPS (Gynecology & Obstetrics)",
    experience: "12 years",
    hospital: "Popular Medical College Hospital",
    location: "Dhanmondi, Dhaka",
    rating: 4.8,
    reviews: 124,
    fee: 1200,
    available: true,
    image: "https://ext.same-assets.com/174619264/3871928465.webp"
  },
  {
    id: 2,
    name: "Dr. Mahmudul Hassan",
    specialization: "Medicine Specialist",
    education: "MBBS, MD (Medicine)",
    experience: "15 years",
    hospital: "Square Hospital",
    location: "Panthapath, Dhaka",
    rating: 4.9,
    reviews: 210,
    fee: 1500,
    available: true,
    image: "https://ext.same-assets.com/174619264/1294756382.webp"
  },
  {
    id: 3,
    name: "Dr. Sharif Ahmed",
    specialization: "Cardiologist",
    education: "MBBS, MD (Cardiology), FCPS",
    experience: "18 years",
    hospital: "Labaid Specialized Hospital",
    location: "Dhanmondi, Dhaka",
    rating: 4.7,
    reviews: 189,
    fee: 2000,
    available: true,
    image: "https://ext.same-assets.com/174619264/2743819564.webp"
  },
  {
    id: 4,
    name: "Dr. Nasreen Akter",
    specialization: "Pediatrician",
    education: "MBBS, FCPS (Pediatrics)",
    experience: "10 years",
    hospital: "United Hospital",
    location: "Gulshan, Dhaka",
    rating: 4.6,
    reviews: 98,
    fee: 1200,
    available: true,
    image: "https://ext.same-assets.com/174619264/3748619245.webp"
  }
];

// Sample hospitals data
const hospitalsData = [
  {
    id: 1,
    name: "Square Hospital",
    location: "Panthapath, Dhaka",
    specialty: "Multi-specialty hospital",
    beds: 350,
    rating: 4.8,
    reviews: 320,
    image: "https://ext.same-assets.com/174619264/2749310568.webp"
  },
  {
    id: 2,
    name: "United Hospital",
    location: "Gulshan, Dhaka",
    specialty: "Multi-specialty hospital",
    beds: 450,
    rating: 4.7,
    reviews: 290,
    image: "https://ext.same-assets.com/174619264/1758392046.webp"
  },
  {
    id: 3,
    name: "Labaid Specialized Hospital",
    location: "Dhanmondi, Dhaka",
    specialty: "Multi-specialty hospital",
    beds: 300,
    rating: 4.6,
    reviews: 260,
    image: "https://ext.same-assets.com/174619264/3976203418.webp"
  },
  {
    id: 4,
    name: "Popular Medical College Hospital",
    location: "Dhanmondi, Dhaka",
    specialty: "Multi-specialty hospital",
    beds: 250,
    rating: 4.5,
    reviews: 230,
    image: "https://ext.same-assets.com/174619264/1293475806.webp"
  }
];

export default function SearchPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchType, setSearchType] = useState("doctor");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchLocation, setSearchLocation] = useState("");
  const [searchMethod, setSearchMethod] = useState("");
  const [filteredDoctors, setFilteredDoctors] = useState(doctorsData);
  const [filteredHospitals, setFilteredHospitals] = useState(hospitalsData);
  const [selectedGender, setSelectedGender] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedDistance, setSelectedDistance] = useState("");
  const [selectedFaceToFace, setSelectedFaceToFace] = useState("");

  useEffect(() => {
    // Get query params
    const type = searchParams.get("type") || "doctor";
    const method = searchParams.get("method") || "";
    
    // Handle both query parameter formats (q and query)
    const query = searchParams.get("query") || searchParams.get("q") || "";

    setSearchType(type);
    setSearchQuery(query);
    setSearchMethod(method);

    // Filter doctors based on query
    if (type === "doctor") {
      const filtered = doctorsData.filter(doc =>
        doc.name.toLowerCase().includes(query.toLowerCase()) ||
        doc.specialization.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredDoctors(filtered.length > 0 ? filtered : doctorsData);
    } else {
      // Filter hospitals based on query
      const filtered = hospitalsData.filter(hospital =>
        hospital.name.toLowerCase().includes(query.toLowerCase()) ||
        hospital.specialty.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredHospitals(filtered.length > 0 ? filtered : hospitalsData);
    }
  }, [searchParams]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Construct the search URL with the current parameters
    let url = `/search?type=${searchType}`;
    
    if (searchQuery.trim()) {
      url += `&query=${encodeURIComponent(searchQuery.trim())}`;
    }
    
    if (searchLocation.trim()) {
      url += `&location=${encodeURIComponent(searchLocation.trim())}`;
    }
    
    if (searchMethod) {
      url += `&method=${searchMethod}`;
    }
    
    router.push(url);
  };

  return (
    <main>
      <Header />

      {/* Search Header */}
      <section className="bg-gradient-to-r from-primary to-primary/90 text-white py-10">
        <div className="container-custom">
          <div className="bg-white rounded-lg p-4 text-gray-900">
            <div className="flex flex-col space-y-4">
              {/* Top search row */}
              <div className="flex flex-col md:flex-row gap-4">
                <div className="md:w-1/4">
                  <Select>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Doctor" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="doctor">Doctor</SelectItem>
                        <SelectItem value="hospital">Hospital</SelectItem>
                        <SelectItem value="clinic">Clinic</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div className="relative flex-grow">
                  <Input
                    type="text"
                    placeholder="Search doctors..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>
                <div className="md:w-1/5">
                  <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white">
                    Search
                  </Button>
                </div>
              </div>
              
              {/* Filter dropdowns */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
                <Select value={selectedGender} onValueChange={setSelectedGender}>
                  <SelectTrigger>
                    <SelectValue placeholder="Gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
                  <SelectTrigger>
                    <SelectValue placeholder="Specialities" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cardiologist">Cardiologist</SelectItem>
                    <SelectItem value="dermatologist">Dermatologist</SelectItem>
                    <SelectItem value="neurologist">Neurologist</SelectItem>
                    <SelectItem value="orthopedic">Orthopedic</SelectItem>
                    <SelectItem value="pediatrician">Pediatrician</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                  <SelectTrigger>
                    <SelectValue placeholder="Countries" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bangladesh">Bangladesh</SelectItem>
                    <SelectItem value="india">India</SelectItem>
                    <SelectItem value="pakistan">Pakistan</SelectItem>
                    <SelectItem value="malaysia">Malaysia</SelectItem>
                    <SelectItem value="singapore">Singapore</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={selectedCity} onValueChange={setSelectedCity}>
                  <SelectTrigger>
                    <SelectValue placeholder="Cities" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dhaka">Dhaka</SelectItem>
                    <SelectItem value="chittagong">Chittagong</SelectItem>
                    <SelectItem value="sylhet">Sylhet</SelectItem>
                    <SelectItem value="rajshahi">Rajshahi</SelectItem>
                    <SelectItem value="kualaLumpur">Kuala Lumpur</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={selectedDistance} onValueChange={setSelectedDistance}>
                  <SelectTrigger>
                    <SelectValue placeholder="Distance" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5km">Within 5 km</SelectItem>
                    <SelectItem value="10km">Within 10 km</SelectItem>
                    <SelectItem value="20km">Within 20 km</SelectItem>
                    <SelectItem value="50km">Within 50 km</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={selectedFaceToFace} onValueChange={setSelectedFaceToFace}>
                  <SelectTrigger>
                    <SelectValue placeholder="Face To Face" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes">Yes</SelectItem>
                    <SelectItem value="no">No</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8 bg-gray-50">
        <div className="container-custom">
          <Tabs defaultValue={searchType} className="w-full">
            <div className="flex justify-between items-center mb-6">
              <TabsList>
                <TabsTrigger
                  value="doctor"
                  onClick={() => setSearchType("doctor")}
                  className="flex items-center gap-2"
                >
                  <User className="h-4 w-4" />
                  Doctors
                </TabsTrigger>
                <TabsTrigger
                  value="hospital"
                  onClick={() => setSearchType("hospital")}
                  className="flex items-center gap-2"
                >
                  <Building2 className="h-4 w-4" />
                  Hospitals
                </TabsTrigger>
              </TabsList>

              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Filters
              </Button>
            </div>

            {/* Doctor Search Results */}
            <TabsContent value="doctor" className="space-y-6">
              {filteredDoctors.length > 0 ? (
                filteredDoctors.map(doctor => (
                  <Card key={doctor.id} className="overflow-hidden hover:shadow-md transition-shadow">
                    <CardContent className="p-0">
                      <div className="flex flex-col md:flex-row">
                        <div className="md:w-1/5 bg-gray-50 p-4 flex flex-col items-center justify-center border-r border-gray-100">
                          <div className="relative h-32 w-32 mb-2">
                            {doctor.image ? (
                              <Image
                                src={doctor.image}
                                alt={doctor.name}
                                fill
                                className="object-cover rounded-full"
                              />
                            ) : (
                              <Avatar className="h-32 w-32">
                                <AvatarFallback className="text-2xl">
                                  {doctor.name.split(' ').map(n => n[0]).join('')}
                                </AvatarFallback>
                              </Avatar>
                            )}
                          </div>
                          <div className="flex items-center gap-1 mb-1">
                            <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                            <span className="font-medium">{doctor.rating}</span>
                            <span className="text-sm text-gray-500">({doctor.reviews})</span>
                          </div>
                        </div>

                        <div className="md:w-3/5 p-6">
                          <h2 className="text-xl font-bold text-primary mb-1">{doctor.name}</h2>
                          <p className="text-secondary font-medium mb-3">{doctor.specialization}</p>
                          <p className="text-gray-700 mb-1">{doctor.education}</p>
                          <p className="text-gray-700 mb-4">{doctor.experience} experience</p>

                          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 mb-4">
                            <div className="flex items-center gap-1">
                              <Building2 className="h-4 w-4 text-gray-500" />
                              <span className="text-sm">{doctor.hospital}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <MapPin className="h-4 w-4 text-gray-500" />
                              <span className="text-sm">{doctor.location}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4 text-gray-500" />
                              <span className="text-sm">Available Today</span>
                            </div>
                          </div>

                          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-sm">
                            <span className="bg-secondary/10 text-secondary px-2 py-1 rounded">
                              Fee: ৳{doctor.fee}
                            </span>
                            <span className="text-gray-500">
                              Appointment available for today
                            </span>
                          </div>
                        </div>

                        <div className="md:w-1/5 bg-gray-50 p-4 flex flex-col gap-3 border-l border-gray-100 justify-center">
                          <Button className="w-full flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            Book Appointment
                          </Button>
                          <Button variant="outline" className="w-full flex items-center gap-2">
                            <MessageSquare className="h-4 w-4" />
                            Video Consultation
                          </Button>
                          <Link href={`/doctor/${doctor.id}`} className="text-primary hover:text-secondary text-sm text-center">
                            View Profile
                          </Link>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">No doctors found matching your search criteria.</p>
                </div>
              )}
            </TabsContent>

            {/* Hospital Search Results */}
            <TabsContent value="hospital" className="space-y-6">
              {filteredHospitals.length > 0 ? (
                filteredHospitals.map(hospital => (
                  <Card key={hospital.id} className="overflow-hidden hover:shadow-md transition-shadow">
                    <CardContent className="p-0">
                      <div className="flex flex-col md:flex-row">
                        <div className="md:w-1/4 p-4 border-r border-gray-100">
                          <div className="relative h-48 w-full rounded-lg overflow-hidden">
                            <Image
                              src={hospital.image}
                              alt={hospital.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                        </div>

                        <div className="md:w-2/4 p-6">
                          <h2 className="text-xl font-bold text-primary mb-2">{hospital.name}</h2>
                          <p className="text-gray-700 mb-4">{hospital.specialty}</p>

                          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 mb-4">
                            <div className="flex items-center gap-1">
                              <MapPin className="h-4 w-4 text-gray-500" />
                              <span className="text-sm">{hospital.location}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                              <span className="font-medium">{hospital.rating}</span>
                              <span className="text-sm text-gray-500">({hospital.reviews} reviews)</span>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 text-sm">
                            <span className="bg-secondary/10 text-secondary px-2 py-1 rounded">
                              {hospital.beds} Beds
                            </span>
                          </div>
                        </div>

                        <div className="md:w-1/4 bg-gray-50 p-6 flex flex-col gap-3 border-l border-gray-100 justify-center">
                          <Button className="w-full flex items-center gap-2">
                            <CalendarClock className="h-4 w-4" />
                            Find Doctors
                          </Button>
                          <Link href={`/hospital/${hospital.id}`} className="text-primary hover:text-secondary text-sm text-center">
                            View Hospital
                          </Link>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">No hospitals found matching your search criteria.</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <Footer />
    </main>
  );
}
