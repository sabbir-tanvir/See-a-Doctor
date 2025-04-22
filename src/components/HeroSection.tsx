"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Search, ArrowRight, Heart, Award } from "lucide-react";
import { Button } from "./ui/button";

export function HeroSection() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const services = [
    {
      title: "Video Consultancy",
      description: "Consult with best doctors through video call.",
      icon: "https://ext.same-assets.com/174619264/1215881272.webp",
      link: "/telemedicine",
      color: "bg-blue-50"
    },
    {
      title: "Chamber Appointment",
      description: "Book your appointment easily with few clicks.",
      icon: "https://ext.same-assets.com/174619264/1323728403.webp",
      link: "/search?type=doctor&method=ON_PREMISES",
      color: "bg-green-50"
    },
    {
      title: "Doctor At Your Home",
      description: "Book a doctor to visit you at home.",
      icon: "https://ext.same-assets.com/174619264/3483761390.webp",
      link: "/on-call-doctor",
      color: "bg-amber-50"
    },
  ];

  return (
    <section className="relative bg-gradient-to-b from-secondary/5 to-white py-20 lg:py-28 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-64 h-64 rounded-full bg-primary/5 -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-secondary/5 translate-x-1/3 translate-y-1/3"></div>
      
      <div className="container-custom relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-center lg:gap-12">
          {/* Hero Content */}
          <div className="lg:w-1/2 mb-12 lg:mb-0">
            <div className="flex items-center mb-6">
              <div className="bg-primary/10 text-primary font-medium text-sm px-4 py-2 rounded-full flex items-center gap-2">
                <Award className="h-4 w-4" />
                <span>Trusted by 1M+ patients</span>
              </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl xl:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              <span className="text-primary">Book a Doctor's Appointment</span> in Just 10 Minutes with Sasthya Seba.
            </h1>
            
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Say goodbye to endless phone calls and long queues. Book doctors' appointments,
              video consultations, ambulance service, manage medical records, and more.
              Take the first step towards better health.
            </p>

            {/* Search Bar */}
            <div className="mb-8 relative">
              <form onSubmit={handleSearch} className="flex">
                <div className="relative flex-grow">
                  <input
                    type="text"
                    placeholder="Search for doctors, specialties, or conditions"
                    className="w-full px-5 py-4 pr-12 rounded-l-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/50 shadow-sm"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                    <Search className="h-5 w-5" />
                  </div>
                </div>
                <Button 
                  type="submit" 
                  className="bg-primary hover:bg-primary/90 text-white py-4 px-6 rounded-r-xl"
                >
                  Search
                </Button>
              </form>
            </div>
            
            <div className="flex items-center text-sm text-gray-500">
              <Heart className="h-4 w-4 mr-2 text-red-500" />
              <span>Popular searches: Cardiology, Dermatology, Diabetes, Pediatrics</span>
            </div>
          </div>
          
          {/* Hero Image */}
          <div className="lg:w-1/2 relative">
            <div className="relative h-[400px] lg:h-[500px] w-full rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="https://images.unsplash.com/photo-1651008376811-b90baee60c1f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80"
                alt="Doctor consulting with patient"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="bg-white bg-opacity-90 backdrop-blur-sm p-4 rounded-xl shadow-lg max-w-xs">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                      <span className="text-green-600 text-xl font-bold">4.9</span>
                    </div>
                    <div>
                      <p className="font-medium">Highest Rated</p>
                      <div className="flex">
                        {Array(5).fill(0).map((_, i) => (
                          <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">Over 10,000 satisfied patients in the last month</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Service Cards */}
        <div className="mt-20">
          <h2 className="text-2xl font-bold text-center mb-8">Our Services</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 justify-center">
            {services.map((service) => (
              <Link href={service.link} key={service.title}>
                {/* Apply rounded corners and overflow hidden to the Card */}
                <Card className="h-full hover:shadow-lg transition-shadow duration-300 border-gray-100 overflow-hidden rounded-xl">
                  {/* Image container - Removed p-6 */}
                  <div className={`flex items-center justify-center ${service.color}`}>
                    {/* Adjust image size and container */}
                    <div className="relative w-full h-40"> 
                      <Image
                        src={service.icon}
                        alt={service.title}
                        fill
                        className="object-cover" // Changed from object-contain to object-cover
                      />
                    </div>
                  </div>
                  {/* Content below the image */}
                  <CardContent className="p-6"> 
                    <h3 className="font-bold text-gray-900 mb-2 text-xl">{service.title}</h3>
                    <p className="text-gray-600 text-sm">{service.description}</p>
                    {/* Removed the "Learn more" div */}
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
