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
import {
  Search,
  MapPin,
  Star,
  Filter,
  CalendarClock,
  Loader2
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Define Hospital type
interface Hospital {
  _id: string;
  name: string;
  location: string;
  specialty: string;
  beds: number;
  rating: number;
  reviews: number;
  image: string;
}

export default function FindHospitalPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get("query") || "");
  const [searchLocation, setSearchLocation] = useState("");
  const [filteredHospitals, setFilteredHospitals] = useState<Hospital[]>([]);
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [selectedSpecialty, setSelectedSpecialty] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedBeds, setSelectedBeds] = useState("");
  const [selectedRating, setSelectedRating] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [specialties, setSpecialties] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);

  // Fetch hospital data from API
  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/hospitals');
        
        if (!response.ok) {
          throw new Error('Failed to fetch hospitals');
        }
        
        const data = await response.json();
        setHospitals(data.data || []);
        
        // Extract unique specialties and cities
        const uniqueSpecialties = Array.from(new Set(data.data.map((hospital: Hospital) => hospital.specialty)));
        const uniqueCities = Array.from(new Set(data.data.map((hospital: Hospital) => {
          const city = hospital.location.split(',').pop()?.trim() || hospital.location;
          return city;
        })));
        
        setSpecialties(uniqueSpecialties as string[]);
        setCities(uniqueCities as string[]);
        
        // If there's a query param, filter the hospitals
        if (searchParams.get("query")) {
          handleSearchWithParams();
        }
      } catch (err: any) {
        console.error('Error fetching hospitals:', err);
        setError(err.message || 'Failed to load hospitals');
      } finally {
        setLoading(false);
      }
    };
    
    fetchHospitals();
  }, [searchParams]);
  
  // Handle search with URL parameters
  const handleSearchWithParams = () => {
    const query = searchParams.get("query") || "";
    const specialty = searchParams.get("specialty") || "";
    const city = searchParams.get("city") || "";
    const beds = searchParams.get("beds") || "";
    const rating = searchParams.get("rating") || "";
    
    setSearchQuery(query);
    setSelectedSpecialty(specialty);
    setSelectedCity(city);
    setSelectedBeds(beds);
    setSelectedRating(rating);
    
    filterHospitals(query, specialty, city, beds, rating);
  };
  
  // Filter hospitals based on criteria
  const filterHospitals = (query: string, specialty: string, city: string, beds: string, rating: string) => {
    let filtered = [...hospitals];
    
    // Filter by search query (hospital name or specialty)
    if (query.trim()) {
      filtered = filtered.filter(hospital =>
        hospital.name.toLowerCase().includes(query.toLowerCase()) ||
        hospital.specialty.toLowerCase().includes(query.toLowerCase())
      );
    }
    
    // Filter by specialty
    if (specialty) {
      filtered = filtered.filter(hospital =>
        hospital.specialty.toLowerCase().includes(specialty.toLowerCase())
      );
    }
    
    // Filter by location/city
    if (city) {
      filtered = filtered.filter(hospital => {
        const hospitalCity = hospital.location.split(',').pop()?.trim() || hospital.location;
        return hospitalCity.toLowerCase().includes(city.toLowerCase());
      });
    }
    
    // Filter by number of beds
    if (beds) {
      const minBeds = parseInt(beds);
      filtered = filtered.filter(hospital => hospital.beds >= minBeds);
    }

    // Filter by rating
    if (rating) {
      const minRating = parseFloat(rating);
      filtered = filtered.filter(hospital => hospital.rating >= minRating);
    }
    
    setFilteredHospitals(filtered);
    setHasSearched(true);
  };

  // Handle search form submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Update URL with search parameters for sharing/bookmarking
    let url = `/find-hospital?query=${encodeURIComponent(searchQuery.trim())}`;
    if (selectedSpecialty) url += `&specialty=${encodeURIComponent(selectedSpecialty)}`;
    if (selectedCity) url += `&city=${encodeURIComponent(selectedCity)}`;
    if (selectedBeds) url += `&beds=${selectedBeds}`;
    if (selectedRating) url += `&rating=${selectedRating}`;
    
    router.push(url, { scroll: false });
    
    // Filter hospitals
    filterHospitals(searchQuery, selectedSpecialty, selectedCity, selectedBeds, selectedRating);
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
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Searching...
                      </>
                    ) : (
                      'Search Hospitals'
                    )}
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
                    {specialties.map(specialty => (
                      <SelectItem key={specialty} value={specialty}>
                        {specialty}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedCity} onValueChange={setSelectedCity}>
                  <SelectTrigger>
                    <SelectValue placeholder="City" />
                  </SelectTrigger>
                  <SelectContent>
                    {cities.map(city => (
                      <SelectItem key={city} value={city}>
                        {city}
                      </SelectItem>
                    ))}
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
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <span className="ml-2">Loading hospitals...</span>
            </div>
          ) : error ? (
            <div className="text-center py-10 text-red-500">
              <p>{error}</p>
            </div>
          ) : hasSearched ? (
            <>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">
                  {filteredHospitals.length > 0 ? `Found ${filteredHospitals.length} Hospitals` : "No Hospitals Found"}
                </h2>
              </div>

              <div className="space-y-6">
                {filteredHospitals.length > 0 ? (
                  filteredHospitals.map(hospital => (
                    <Card key={hospital._id} className="overflow-hidden hover:shadow-md transition-shadow">
                      <CardContent className="p-0">
                        <div className="flex flex-col md:flex-row">
                          <div className="md:w-1/4 p-4 border-r border-gray-100">
                            <div className="relative h-48 w-full rounded-lg overflow-hidden">
                              <Image
                                src={hospital.image || "https://ext.same-assets.com/174619264/2749310568.webp"}
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
                            <Link href={`/hospital/${hospital._id}`} className="text-primary hover:text-secondary text-sm text-center">
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
            <>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">
                  {hospitals.length > 0 ? `All Hospitals (${hospitals.length})` : "No Hospitals Found"}
                </h2>
              </div>

              <div className="space-y-6">
                {hospitals.length > 0 ? (
                  hospitals.slice(0, 6).map(hospital => (
                    <Card key={hospital._id} className="overflow-hidden hover:shadow-md transition-shadow">
                      <CardContent className="p-0">
                        <div className="flex flex-col md:flex-row">
                          <div className="md:w-1/4 p-4 border-r border-gray-100">
                            <div className="relative h-48 w-full rounded-lg overflow-hidden">
                              <Image
                                src={hospital.image || "https://ext.same-assets.com/174619264/2749310568.webp"}
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
                            <Link href={`/hospital/${hospital._id}`} className="text-primary hover:text-secondary text-sm text-center">
                              View Hospital
                            </Link>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500">No hospitals found.</p>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}