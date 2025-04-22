"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Heart, Award } from "lucide-react";
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
      icon: "https://img.freepik.com/free-vector/online-doctor-consultation-illustration_88138-414.jpg",
      link: "/telemedicine",
      color: "bg-blue-50"
    },
    {
      title: "Chamber Appointment",
      description: "Book your appointment easily with few clicks.",
      icon: "https://img.freepik.com/free-vector/hospital-reception-modern-clinic-lobby-interior-with-furniture_33099-1722.jpg",
      link: "/search?type=doctor&method=ON_PREMISES",
      color: "bg-green-50"
    },
    {
      title: "Doctor At Your Home",
      description: "Book a doctor to visit you at home.",
      icon: "https://img.freepik.com/free-photo/doctor-visiting-patient-home_23-2149135869.jpg",
      link: "/on-call-doctor",
      color: "bg-amber-50"
    },
  ];

  return (
    <section className="relative bg-blue-50 py-20 lg:py-28 overflow-hidden">
      <div className="container-custom  relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Hero Title */}
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 ">
            Book a Doctor's Appointment in Just 10 Minutes with Sasthya Seba.
          </h1>
          <p className="text-lg text-gray-600 mb-5">
            Say goodbye to endless phone calls and long queues. Book doctors' appointments, video consultations, ambulance service, manage medical records, and more. Take the first step towards better health.
          </p>

          {/* Search Bar */}
          <div className="relative max-w-xl mx-auto mb-3">
            <form onSubmit={handleSearch} className="flex items-center bg-white shadow-md rounded-full overflow-hidden">
              <div className="relative flex-grow">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search doctors, hospitals, clinics..."
                  className="w-full py-4 pl-12 pr-4 text-gray-700 focus:outline-none"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </form>
          </div>

          {/* Recent Searches */}
          <div className="text-sm text-gray-500">
            <span className="mr-2">Recent:</span>
            <span className="inline-flex items-center gap-2">
              <Button variant="outline" className="text-primary border-primary rounded-full px-4 py-1">
                Gynecologist & Obstetrician
              </Button>
              <Button variant="outline" className="text-primary border-primary rounded-full px-4 py-1">
                doctor
              </Button>
            </span>
          </div>
        </div>

        {/* Service Cards */}
        <div className="mt-10">
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
