"use client";

import React, { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Search,
  MapPin,
  Star,
  Filter,
  CalendarClock,
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
import { hospitalsData, Hospital } from "@/data/hospitalsData";

export default function FindHospitalPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get("query") || "");
  const [searchLocation, setSearchLocation] = useState("");
  const [filteredHospitals, setFilteredHospitals] = useState<Hospital[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [selectedSpecialty, setSelectedSpecialty] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedBeds, setSelectedBeds] = useState("");
  const [selectedRating, setSelectedRating] = useState("");

  // Handle search form submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Filter hospitals based on the search criteria
    let filtered = [...hospitalsData];
    
    // Filter by search query (hospital name or specialty)
    if (searchQuery.trim()) {
      filtered = filtered.filter(hospital =>
        hospital.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        hospital.specialty.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Filter by specialty
    if (selectedSpecialty) {
      filtered = filtered.filter(hospital =>
        hospital.specialty.toLowerCase().includes(selectedSpecialty.toLowerCase())
      );
    }
    
    // Filter by location/city
    if (selectedCity) {
      filtered = filtered.filter(hospital =>
        hospital.location.toLowerCase().includes(selectedCity.toLowerCase())
      );
    }
    
    // Filter by number of beds
    if (selectedBeds) {
      const minBeds = parseInt(selectedBeds);
      filtered = filtered.filter(hospital => hospital.beds >= minBeds);
    }

    // Filter by rating
    if (selectedRating) {
      const minRating = parseFloat(selectedRating);
      filtered = filtered.filter(hospital => hospital.rating >= minRating);
    }
    
    // Update URL with search parameters for sharing/bookmarking
    let url = `/find-hospital?query=${encodeURIComponent(searchQuery.trim())}`;
    if (selectedSpecialty) url += `&specialty=${encodeURIComponent(selectedSpecialty)}`;
    if (selectedCity) url += `&city=${encodeURIComponent(selectedCity)}`;
    if (selectedBeds) url += `&beds=${selectedBeds}`;
    if (selectedRating) url += `&rating=${selectedRating}`;
    
    router.push(url, { scroll: false });
    
    // Update state
    setFilteredHospitals(filtered);
    setHasSearched(true);
  };

  return (
    <main>
      <Header />

      {/* Search Header */}
      <section className="bg-gradient-to-r from-primary to-primary/90 text-white py-10">
        <div className="container-custom">
          <h1 className="text-2xl md:text-3xl text-white font-bold mb-6 text-center">
            Find the Best Hospitals in Bangladesh
          </h1>
          <div className="bg-white rounded-lg p-4 text-gray-900">
            <form onSubmit={handleSearch} className="flex flex-col space-y-4">
              {/* Top search row */}
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-grow">
                  <Input
                    type="text"
                    placeholder="Search by hospital name or specialty..."
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
                    Search Hospitals
                  </Button>
                </div>
              </div>
              
              {/* Filter dropdowns */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
                <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
                  <SelectTrigger>
                    <SelectValue placeholder="Specialty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="multi-specialty">Multi-specialty</SelectItem>
                    <SelectItem value="eye">Eye Care</SelectItem>
                    <SelectItem value="cardiac">Cardiac Care</SelectItem>
                    <SelectItem value="cancer">Cancer Care</SelectItem>
                    <SelectItem value="orthopedic">Orthopedic</SelectItem>
                    <SelectItem value="neurology">Neurology</SelectItem>
                    <SelectItem value="maternity">Maternity</SelectItem>
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

                <Select value={selectedBeds} onValueChange={setSelectedBeds}>
                  <SelectTrigger>
                    <SelectValue placeholder="Beds" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="100">100+ beds</SelectItem>
                    <SelectItem value="200">200+ beds</SelectItem>
                    <SelectItem value="300">300+ beds</SelectItem>
                    <SelectItem value="500">500+ beds</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={selectedRating} onValueChange={setSelectedRating}>
                  <SelectTrigger>
                    <SelectValue placeholder="Rating" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="3.5">3.5+ stars</SelectItem>
                    <SelectItem value="4.0">4.0+ stars</SelectItem>
                    <SelectItem value="4.5">4.5+ stars</SelectItem>
                    <SelectItem value="4.8">4.8+ stars</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Hospital Search Results Section */}
      <section className="py-8 bg-gray-50">
        <div className="container-custom">
          {hasSearched ? (
            <>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">
                  {filteredHospitals.length > 0 ? `Found ${filteredHospitals.length} Hospitals` : "No Hospitals Found"}
                </h2>
                <Button variant="outline" className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  More Filters
                </Button>
              </div>

              <div className="space-y-6">
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
                            <Link href={`/find-doctor?hospital=${encodeURIComponent(hospital.name)}`} className="w-full">
                              <Button className="w-full flex items-center gap-2">
                                <CalendarClock className="h-4 w-4" />
                                Find Doctors
                              </Button>
                            </Link>
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
              <h2 className="text-xl font-bold mb-2">Search for Hospitals</h2>
              <p className="text-gray-500 max-w-md mx-auto">
                Use the search bar above to find hospitals by name, specialty, or location.
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}