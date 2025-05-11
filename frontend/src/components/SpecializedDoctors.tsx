import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function SpecializedDoctors() {
  const specialties = [
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
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row justify-between items-center mb-10">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-2">
              Consult our top specialized doctors
            </h2>
            <p className="text-gray-600">
              Our doctors are ready to serve you 24/7
            </p>
          </div>
          <Link href="/specializations" className="text-primary hover:text-secondary mt-4 md:mt-0 font-medium flex items-center">
            View all
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {specialties.map((specialty) => (
            <Card
              key={specialty.title}
              className="overflow-hidden hover:shadow-lg transition-shadow border border-gray-100"
            >
              <CardContent className="p-4 flex flex-col items-center justify-center">
                <Link href={specialty.link} className="text-center group">
                  <div className="relative w-16 h-16 mx-auto mb-4">
                    <Image
                      src={specialty.icon}
                      alt={specialty.title}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <h3 className="text-sm font-semibold text-primary mb-2 line-clamp-2 h-10">
                    {specialty.title}
                  </h3>
                  <Button
                    variant="link"
                    className="text-secondary p-0 h-auto text-sm group-hover:underline"
                  >
                    Consult Now
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
