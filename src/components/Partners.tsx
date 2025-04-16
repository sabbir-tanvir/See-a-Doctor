import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

export function Partners() {
  const partners = [
    {
      id: 1,
      name: "Popular Diagnostic",
      logo: "https://ext.same-assets.com/174619264/3776423225.webp",
      link: "https://www.populardiagnostic.com/"
    },
    {
      id: 2,
      name: "BD Fertility Hospital",
      logo: "https://ext.same-assets.com/174619264/3776423226.webp",
      link: "https://www.bdfertilityhospital.com/"
    },
    {
      id: 3,
      name: "FCH Limited",
      logo: "https://ext.same-assets.com/174619264/3776423227.webp",
      link: "https://www.facebook.com/FCHLimited"
    },
    {
      id: 4,
      name: "Ashoka Rescue",
      logo: "https://ext.same-assets.com/174619264/3776423228.webp",
      link: "https://www.ashokarescue.com/"
    },
    {
      id: 5,
      name: "Manipal Hospitals",
      logo: "https://ext.same-assets.com/174619264/3776423229.webp",
      link: "https://www.manipalhospitalsglobal.com/"
    },
    {
      id: 6,
      name: "Rushmono",
      logo: "https://ext.same-assets.com/174619264/3776423230.webp",
      link: "http://rushmono.com/"
    },
    {
      id: 7,
      name: "PhysioZone",
      logo: "https://ext.same-assets.com/174619264/3776423231.webp",
      link: "https://physiozonebd.com/"
    }
  ];

  return (
    <section className="py-10 bg-white">
      <div className="container-custom">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-primary">
            Our partners
          </h2>
          <Link href="/our-partners">
            <Button variant="ghost" className="text-primary hover:text-secondary flex items-center gap-1">
              View all <ChevronRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
        <p className="text-gray-600 mb-8">We pride in ourselves for some of our partners</p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-6">
          {partners.map((partner) => (
            <Link key={partner.id} href={partner.link} target="_blank" rel="noopener noreferrer">
              <div className="h-16 relative bg-white border border-gray-100 rounded-md hover:shadow-md transition-shadow flex items-center justify-center p-2">
                <div className="relative h-full w-full">
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    fill
                    className="object-contain filter grayscale hover:grayscale-0 transition-all"
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
