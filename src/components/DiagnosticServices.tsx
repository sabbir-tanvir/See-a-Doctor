import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function DiagnosticServices() {
  const diagnosticServices = [
    {
      title: "CT Scan",
      icon: "https://via.placeholder.com/64/007bff/ffffff?text=CT",
      link: "/diagnostics?category=CT%20Scan"
    },
    {
      title: "Blood Tests",
      icon: "https://via.placeholder.com/64/28a745/ffffff?text=Blood",
      link: "/diagnostics?category=Blood%20Tests"
    },
    {
      title: "Endoscopy",
      icon: "https://via.placeholder.com/64/ffc107/000000?text=Endo",
      link: "/diagnostics?category=Endoscopy"
    },
    {
      title: "Ultrasound",
      icon: "https://via.placeholder.com/64/17a2b8/ffffff?text=Ultra",
      link: "/diagnostics?category=Ultrasound"
    },
    {
      title: "X-Ray",
      icon: "https://via.placeholder.com/64/dc3545/ffffff?text=XRay",
      link: "/diagnostics?category=X-Ray"
    },
    {
      title: "Microbiology",
      icon: "https://via.placeholder.com/64/6f42c1/ffffff?text=Micro",
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
          <div className="mt-4 md:mt-0">
            <Link href="/diagnostics">
              <Button variant="outline" className="font-medium">
                Compare All Prices
              </Button>
            </Link>
          </div>
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
