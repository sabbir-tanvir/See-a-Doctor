"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { doctorsAPI } from '@/lib/api';
import { Doctor } from '@/types/doctor';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { DoctorCard } from '@/components/DoctorCard';
import { Loader2 } from 'lucide-react';

export default function FindDoctorPage() {
  const router = useRouter();
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGender, setSelectedGender] = useState('all');
  const [selectedSpecialty, setSelectedSpecialty] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [specialties, setSpecialties] = useState<string[]>([]);
  const [locations, setLocations] = useState<string[]>([]);

  // Fetch doctors and metadata on component mount
  useEffect(() => {
    fetchDoctors();
    fetchMetadata();
  }, []);

  const fetchMetadata = async () => {
    try {
      // Fetch all doctors to extract unique specialties and locations
      const response = await doctorsAPI.getAll();
      const doctorsData = response.data.data;
      
      // Extract unique specialties and locations
      const uniqueSpecialties = Array.from(new Set(doctorsData.map(doc => doc.specialization)));
      const uniqueLocations = Array.from(new Set(doctorsData.map(doc => doc.location)));
      
      setSpecialties(uniqueSpecialties);
      setLocations(uniqueLocations);
    } catch (err: any) {
      console.error('Failed to fetch metadata:', err);
    }
  };

  const fetchDoctors = async () => {
    try {
      setLoading(true);
      const response = await doctorsAPI.getAll();
      setDoctors(response.data.data);
      setFilteredDoctors(response.data.data);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to fetch doctors');
    } finally {
      setLoading(false);
    }
  };

  // Handle search form submission
  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      let response;
      
      // If location is selected, use location API
      if (selectedLocation !== 'all') {
        response = await doctorsAPI.getByLocation(selectedLocation);
      }
      // If specialty is selected, use specialization API
      else if (selectedSpecialty !== 'all') {
        response = await doctorsAPI.getBySpecialization(selectedSpecialty);
      }
      // Otherwise get all doctors
      else {
        response = await doctorsAPI.getAll();
      }
      
      let filtered = response.data.data;
      
      // Filter by search query (doctor name or specialization)
      if (searchQuery.trim()) {
        filtered = filtered.filter(doc =>
          doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          doc.specialization.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }
      
      // Filter by gender
      if (selectedGender !== 'all') {
        filtered = filtered.filter(doc => 
          doc.gender.toLowerCase() === selectedGender.toLowerCase()
        );
      }
      
      setFilteredDoctors(filtered);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to search doctors');
    } finally {
      setLoading(false);
    }
  };

  // Handle doctor card click
  const handleDoctorClick = (doctorId: string) => {
    router.push(`/doctor/${doctorId}`);
  };

  return (
    <>
      <Header />
      <main className="container-custom py-10 min-h-[calc(100vh-300px)]">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Find a Doctor</h1>
          
          {/* Search Form */}
          <Card className="mb-8">
            <CardContent className="pt-6">
              <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <Input
                    type="text"
                    placeholder="Search by name or specialty"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div>
                  <Select value={selectedGender} onValueChange={setSelectedGender}>
                    <SelectTrigger>
                      <SelectValue placeholder="Gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All</SelectItem>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
                    <SelectTrigger>
                      <SelectValue placeholder="Specialty" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All</SelectItem>
                      {specialties.map((specialty) => (
                        <SelectItem key={specialty} value={specialty}>
                          {specialty}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                    <SelectTrigger>
                      <SelectValue placeholder="Location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All</SelectItem>
                      {locations.map((location) => (
                        <SelectItem key={location} value={location}>
                          {location}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="md:col-span-4">
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Searching...
                      </>
                    ) : (
                      'Search'
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded mb-8">
              {error}
            </div>
          )}

          {/* Results */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading ? (
              // Loading skeleton
              Array.from({ length: 6 }).map((_, index) => (
                <Card key={index} className="animate-pulse">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="rounded-full bg-gray-200 h-16 w-16"></div>
                      <div className="flex-1 space-y-2">
                        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : filteredDoctors.length > 0 ? (
              filteredDoctors.map((doctor) => (
                <DoctorCard
                  key={doctor._id}
                  doctor={doctor}
                  onClick={() => handleDoctorClick(doctor._id)}
                />
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-500">No doctors found matching your criteria.</p>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}