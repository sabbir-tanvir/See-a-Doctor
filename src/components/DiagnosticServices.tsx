import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function DiagnosticServices() {
  const diagnosticServices = [
    {
      title: "CT Scan",
      icon: "https://ext.same-assets.com/174619264/920285123.webp",
      link: "/diagnostics?category=CT%20Scan"
    },
    {
      title: "Blood Tests",
      icon: "https://ext.same-assets.com/174619264/2048153456.webp",
      link: "/diagnostics?category=Blood%20Tests"
    },
    {
      title: "Endoscopy",
      icon: "https://ext.same-assets.com/174619264/3475869024.webp",
      link: "/diagnostics?category=Endoscopy"
    },
    {
      title: "Ultrasound",
      icon: "https://ext.same-assets.com/174619264/2467159348.webp",
      link: "/diagnostics?category=Ultrasound"
    },
    {
      title: "X-Ray",
      icon: "https://ext.same-assets.com/174619264/1452073649.webp",
      link: "/diagnostics?category=X-Ray"
    },
    {
      title: "Microbiology",
      icon: "https://ext.same-assets.com/174619264/4028516973.webp",
      link: "/diagnostics?category=Microbiology"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row justify-between items-center mb-10">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-2">
              Get timely, cost-effective, and high quality diagnostic care
            </h2>
            <p className="text-gray-600">
              Book tests with top labs, get sample pick up, share reports with doctors online
            </p>
          </div>
          <Link href="/diagnostics" className="text-primary hover:text-secondary mt-4 md:mt-0 font-medium">
            View all
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {diagnosticServices.map((service) => (
            <Card
              key={service.title}
              className="overflow-hidden hover:shadow-lg transition-shadow border border-gray-100"
            >
              <CardContent className="p-4 flex flex-col items-center justify-center">
                <Link href={service.link} className="text-center group">
                  <div className="relative w-16 h-16 mx-auto mb-4">
                    <Image
                      src={service.icon}
                      alt={service.title}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <h3 className="text-sm font-semibold text-primary mb-2 line-clamp-2">
                    {service.title}
                  </h3>
                  <Button
                    variant="link"
                    className="text-secondary p-0 h-auto text-sm group-hover:underline"
                  >
                    Check Prices
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
