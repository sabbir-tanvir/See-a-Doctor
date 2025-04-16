import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function EmergencyAmbulance() {
  const ambulanceServices = [
    {
      id: "ac-ambulance",
      title: "AC Ambulance",
      image: "https://ext.same-assets.com/174619264/3776423224.webp",
      description: "Get ambulance within 30 minutes*",
      subDescription: "24/7 affordable quality service",
      contactInfo: "We are just a call away: 01405600700",
      link: "/ambulance/ac-ambulance"
    },
    {
      id: "icu-ambulance",
      title: "ICU Ambulance",
      image: "https://ext.same-assets.com/690263052/1071786512.webp",
      description: "Get ambulance within 30 minutes*",
      subDescription: "24/7 affordable quality service",
      contactInfo: "We are just a call away: 01405600700",
      link: "/ambulance/icu-ambulance"
    },
    {
      id: "air-ambulance",
      title: "AIR Ambulance",
      image: "https://ext.same-assets.com/690263052/3669179665.webp",
      description: "Get ambulance within 60 minutes*",
      subDescription: "24/7 affordable quality service",
      contactInfo: "We are just a call away: 01405600700",
      link: "/ambulance/air-ambulance"
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row justify-between items-center mb-10">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-2">
              We are ready to help at your emergency
            </h2>
          </div>
          <Link href="/ambulance" className="text-primary hover:text-secondary mt-4 md:mt-0 font-medium">
            View all
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {ambulanceServices.map((service) => (
            <Card key={service.id} className="overflow-hidden hover:shadow-lg transition-shadow border border-gray-100">
              <Link href={service.link}>
                <div className="relative h-48 w-full">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg text-primary mb-4">
                    {service.title}
                  </h3>
                  <div className="space-y-1 text-sm text-gray-600 mb-4">
                    <p>{service.description}</p>
                    <p>{service.subDescription}</p>
                    <p>{service.contactInfo}</p>
                  </div>
                </CardContent>
              </Link>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
