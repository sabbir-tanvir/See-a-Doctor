import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";

export function EmergencyAmbulance() {
  const ambulanceServices = [
    {
      title: "AC Ambulance",
      image: "https://ext.same-assets.com/690263052/3413034796.webp",
      description: "Get ambulance within 30 minutes*",
      link: "/ambulance/ac-ambulance"
    },
    {
      title: "ICU Ambulance",
      image: "https://ext.same-assets.com/690263052/2349005020.webp",
      description: "Get ambulance within 30 minutes*",
      link: "/ambulance/icu-ambulance"
    },
    {
      title: "AIR Ambulance",
      image: "https://ext.same-assets.com/690263052/898804201.webp",
      description: "Get ambulance within 60 minutes*",
      link: "/ambulance/air-ambulance"
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container-custom">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-primary">
            We are ready to help at your emergency
          </h2>
          <Link href="/ambulance">
            <Button variant="ghost" className="text-primary hover:text-secondary flex items-center gap-1">
              View all <ChevronRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {ambulanceServices.map((service) => (
            <Card
              key={service.title}
              className="overflow-hidden border-0 shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="relative h-52 w-full">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-4">
                <Link href={service.link}>
                  <h3 className="text-lg font-semibold text-primary mb-2 hover:text-secondary transition-colors">
                    {service.title}
                  </h3>
                </Link>
                <p className="text-gray-600 mb-2">{service.description}</p>
                <p className="text-gray-600 mb-3">24/7 affordable quality service</p>
                <p className="text-gray-600">We are just a call away: 01405600700</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
