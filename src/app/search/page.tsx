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
import {
  Search,
  MapPin,
  Star,
  Filter,
  Building2,
  Clock,
  Calendar,
  MessageSquare,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Import data from the data folder
import { doctorsData, Doctor } from "@/data/doctorsData";

export default function SearchPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchLocation, setSearchLocation] = useState("");
  const [searchMethod, setSearchMethod] = useState("");
  const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [selectedGender, setSelectedGender] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedDistance, setSelectedDistance] = useState("");
  const [selectedFaceToFace, setSelectedFaceToFace] = useState("");

  useEffect(() => {
    // Get query params
    const method = searchParams.get("method") || "";
    
    // Handle both query parameter formats (q and query)
    const query = searchParams.get("query") || searchParams.get("q") || "";

    setSearchQuery(query);
    setSearchMethod(method);

    // Filter doctors based on query if there is one, otherwise don't show any results
    if (query) {
      const filtered = doctorsData.filter(doc =>
        doc.name.toLowerCase().includes(query.toLowerCase()) ||
        doc.specialization.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredDoctors(filtered);
      setHasSearched(true);
    }
  }, [searchParams]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Filter doctors based on search criteria
    let filtered = [...doctorsData];
    
    if (searchQuery.trim()) {
      filtered = filtered.filter(doc => 
        doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.specialization.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Filter by gender
    if (selectedGender) {
      filtered = filtered.filter(doc => {
        if (selectedGender === "male" && !doc.name.includes("Dr. Ms.") && !doc.name.includes("Dr. Mrs.")) {
          return true;
        }
        if (selectedGender === "female" && (doc.name.includes("Dr. Ms.") || doc.name.includes("Dr. Mrs."))) {
          return true;
        }
        return false;
      });
    }
    
    // Filter by specialty
    if (selectedSpecialty) {
      filtered = filtered.filter(doc =>
        doc.specialization.toLowerCase().includes(selectedSpecialty.toLowerCase())
      );
    }
    
    // Filter by location/city
    if (selectedCity) {
      filtered = filtered.filter(doc =>
        doc.location.toLowerCase().includes(selectedCity.toLowerCase())
      );
    }
    
    // Construct the search URL with the current parameters
    let url = `/search?query=${encodeURIComponent(searchQuery.trim())}`;
    
    if (selectedGender) url += `&gender=${selectedGender}`;
    if (selectedSpecialty) url += `&specialty=${encodeURIComponent(selectedSpecialty)}`;
    if (selectedCity) url += `&city=${encodeURIComponent(selectedCity)}`;
    if (selectedFaceToFace) url += `&faceToFace=${selectedFaceToFace}`;
    if (searchMethod) url += `&method=${searchMethod}`;
    
    router.push(url, { scroll: false });
    
    // Update state
    setFilteredDoctors(filtered);
    setHasSearched(true);
  };

  return (
    <main>
      <Header />

      {/* Search Header */}
      <section className="bg-gradient-to-r from-primary to-primary/90 text-white py-10">
        <div className="container-custom">

          <div className="bg-white rounded-lg p-4 text-gray-900">
            <form onSubmit={handleSearch} className="flex flex-col space-y-4">
              {/* Top search row */}
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-grow">
                  <Input
                    type="text"
                    placeholder="Search by doctor name or specialty..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>
                <div className="md:w-1/5">
                  <Button 
                    type="submit" 
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white"
                  >
                    Search Doctors
                  </Button>
                </div>
              </div>
              
              {/* Filter dropdowns */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
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
                    <SelectItem value="gynecologist">Gynecologist</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={selectedCity} onValueChange={setSelectedCity}>
                  <SelectTrigger>
                    <SelectValue placeholder="City" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dhaka">Dhaka</SelectItem>
                    <SelectItem value="chittagong">Chittagong</SelectItem>
                    <SelectItem value="sylhet">Sylhet</SelectItem>
                    <SelectItem value="rajshahi">Rajshahi</SelectItem>
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
            </form>
          </div>
        </div>
      </section>

      {/* Doctor Search Results Section */}
      <section className="py-8 bg-gray-50">
        <div className="container-custom">
          {hasSearched ? (
            <>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">
                  {filteredDoctors.length > 0 ? `Found ${filteredDoctors.length} Doctors` : "No Doctors Found"}
                </h2>
                <div className="flex items-center gap-2">
                  <Link href="/find-hospital" className="text-primary hover:text-secondary underline">
                    Switch to Hospital Search
                  </Link>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    More Filters
                  </Button>
                </div>
              </div>

              <div className="space-y-6">
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
                            <Link href={`/doctor/${doctor.id}/appointment`} className="w-full">
                              <Button className="w-full flex items-center gap-2">
                                <Calendar className="h-4 w-4" />
                                Book Appointment
                              </Button>
                            </Link>
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
                    <p className="text-gray-500 mt-2">Try adjusting your filters or search with different keywords.</p>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="text-center py-20">
              <div className="mx-auto w-24 h-24 mb-4">
                <Search className="w-full h-full text-gray-300" />
              </div>
              <h2 className="text-xl font-bold mb-2">Search for Doctors</h2>
              <p className="text-gray-500 max-w-md mx-auto">
                Use the search bar above to find doctors by name, specialty, or location.
                <br />
                Looking for hospitals instead? <Link href="/find-hospital" className="text-primary hover:text-secondary underline">Search for Hospitals</Link>
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
