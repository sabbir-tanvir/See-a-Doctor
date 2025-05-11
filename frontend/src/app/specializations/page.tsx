"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image"; // Import Image component
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Loader2 } from "lucide-react";

interface Specialization {
  _id: string;
  title: string;
  slug: string;
  description: string;
  icon?: string;
}

export default function SpecializationsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [specializations, setSpecializations] = useState<Specialization[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  // Placeholder icon URL - replace with actual icons later
  const placeholderIcon = "https://ext.same-assets.com/174619264/2272455185.webp";
  
  useEffect(() => {
    const fetchSpecializations = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/specializations');
        
        if (!response.ok) {
          throw new Error('Failed to fetch specializations');
        }
        
        const data = await response.json();
        setSpecializations(data.data || []);
      } catch (err) {
        console.error('Error fetching specializations:', err);
        setError('Failed to load specializations. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchSpecializations();
  }, []);

  const filteredSpecializations = specializations.filter(spec =>
    spec.title.toLowerCase().includes(searchTerm.toLowerCase()) // Filter by title
  );

  return (
    <>
    <Header />
    <div className="container-custom py-10">
      <h1 className="text-3xl font-bold mb-8">Doctor Specializations</h1>
    
      <div className="mb-8">
        <div className="relative">
          <Input
            type="text"
            placeholder="Search specializations..."
            className="w-full p-4 rounded-md"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <span className="ml-2">Loading specializations...</span>
        </div>
      ) : error ? (
        <div className="text-center py-10 text-red-500">
          <p>{error}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredSpecializations.length > 0 ? (
            filteredSpecializations.map((specialization) => (
              <Link 
                href={`/search?type=doctor&specialty=${encodeURIComponent(specialization.title)}`}
                key={specialization._id}
              >
                <Card className="hover:shadow-lg transition-shadow border border-gray-100 h-full">
                  <CardContent className="p-4 flex flex-col items-center text-center">
                    <div className="relative w-16 h-16 mb-3"> 
                      <Image
                        src={specialization.icon || placeholderIcon}
                        alt={specialization.title}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <h3 className="text-primary font-medium text-sm">{specialization.title}</h3>
                  </CardContent>
                </Card>
              </Link>
            ))
          ) : (
            <div className="col-span-full text-center py-8">
              <p>No specializations found matching your search.</p>
            </div>
          )}
        </div>
      )}
    </div>
    <Footer />
    </>
  );
}
