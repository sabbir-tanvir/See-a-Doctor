import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Search } from "lucide-react";

export function HeroSection() {
  const services = [
    {
      title: "Video Consultancy",
      description: "Consult with best doctors through video call.",
      icon: "https://ext.same-assets.com/174619264/1215881272.webp",
      link: "/telemedicine"
    },
    {
      title: "Chamber Appointment",
      description: "Book your appointment easily with few clicks.",
      icon: "https://ext.same-assets.com/174619264/1323728403.webp",
      link: "/search?type=doctor&method=ON_PREMISES"
    },
    {
      title: "Doctor At Your Home",
      description: "Book a doctor to visit you at home.",
      icon: "https://ext.same-assets.com/174619264/3483761390.webp",
      link: "/on-call-doctor"
    },
    {
      title: "Ambulance Service",
      description: "24/7 Emergency Ambulance Service.",
      icon: "https://ext.same-assets.com/174619264/1546294710.webp",
      link: "/ambulance"
    },
    {
      title: "Domiciliary Service",
      description: "Physiotherapy and Nurse service at home.",
      icon: "https://ext.same-assets.com/174619264/2151548762.webp",
      link: "/domiciliary-services"
    }
  ];

  return (
    <section className="bg-secondary/10 py-16 lg:py-20">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Book a Doctor's Appointment in Just 10 Minutes with Sasthya Seba.
          </h1>
          <p className="text-lg text-gray-600">
            Say goodbye to endless phone calls and long queues. Book doctors' appointments,
            video consultations, ambulance service, manage medical records, and more.
            Take the first step towards better health.
          </p>

          {/* Search Bar */}
          <div className="mt-8 relative max-w-md mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for doctors, specialties, or conditions"
                className="w-full px-4 py-3 pr-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-secondary"
              />
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
            </div>
          </div>
        </div>

        {/* Service Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-8">
          {services.map((service) => (
            <Link href={service.link} key={service.title}>
              <Card className="h-full hover:shadow-lg transition-shadow overflow-hidden group">
                <CardContent className="p-4 text-center flex flex-col items-center justify-center h-full">
                  <div className="mb-4 bg-blue-50 p-2 rounded-lg group-hover:bg-secondary/20 transition-colors">
                    <div className="relative w-20 h-20">
                      <Image
                        src={service.icon}
                        alt={service.title}
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>
                  <h3 className="font-semibold text-primary mb-1">{service.title}</h3>
                  <p className="text-sm text-gray-600">{service.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
