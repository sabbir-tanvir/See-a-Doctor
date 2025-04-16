import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

export function SpecializedDoctors() {
  const specializations = [
    {
      title: "Gynecologist & Obstetrician",
      icon: "https://ext.same-assets.com/174619264/661419782.webp",
      link: "/search?type=doctor&q=Gynecologist%20%26%20Obstetrician"
    },
    {
      title: "Medicine Specialist",
      icon: "https://ext.same-assets.com/174619264/2272455185.webp",
      link: "/search?type=doctor&q=Medicine%20Specialist"
    },
    {
      title: "Cardiologist",
      icon: "https://ext.same-assets.com/174619264/778610923.webp",
      link: "/search?type=doctor&q=Cardiologist"
    },
    {
      title: "Pediatrician",
      icon: "https://ext.same-assets.com/174619264/2164729522.webp",
      link: "/search?type=doctor&q=Pediatrician"
    },
    {
      title: "General Surgeon",
      icon: "https://ext.same-assets.com/174619264/420020542.webp",
      link: "/search?type=doctor&q=General%20Surgeon"
    },
    {
      title: "Otolaryngologists (ENT)",
      icon: "https://ext.same-assets.com/174619264/914419258.webp",
      link: "/search?type=doctor&q=Otolaryngologists%20(ENT)"
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container-custom">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-primary">
            Consult our top specialized doctors
          </h2>
          <Link href="/specializations">
            <Button variant="ghost" className="text-primary hover:text-secondary flex items-center gap-1">
              View all <ChevronRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        <p className="text-gray-600 mb-8">Our doctors are ready to serve you 24/7</p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {specializations.map((specialization) => (
            <Card
              key={specialization.title}
              className="h-full hover:shadow-md transition-shadow border border-gray-200 overflow-hidden"
            >
              <Link href={specialization.link} className="block h-full">
                <CardContent className="p-4 flex flex-col items-center text-center h-full">
                  <div className="mb-3 relative h-24 w-24">
                    <Image
                      src={specialization.icon}
                      alt={specialization.title}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <h3 className="text-sm font-medium text-primary leading-tight mb-2">
                    {specialization.title}
                  </h3>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-auto w-full text-xs border-secondary text-primary hover:bg-secondary hover:text-white"
                  >
                    Consult Now
                  </Button>
                </CardContent>
              </Link>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
