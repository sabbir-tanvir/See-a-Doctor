import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";

export function DiagnosticServices() {
  const diagnosticServices = [
    {
      title: "CT Scan",
      icon: "📋",
      link: "/diagnostics?category=CT%20Scan"
    },
    {
      title: "Blood Tests",
      icon: "💉",
      link: "/diagnostics?category=Blood%20Tests"
    },
    {
      title: "Endoscopy",
      icon: "🔬",
      link: "/diagnostics?category=Endoscopy"
    },
    {
      title: "Ultrasound",
      icon: "🔊",
      link: "/diagnostics?category=Ultrasound"
    },
    {
      title: "X-Ray",
      icon: "📷",
      link: "/diagnostics?category=X-Ray"
    },
    {
      title: "Microbiology",
      icon: "🦠",
      link: "/diagnostics?category=Microbiology"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container-custom">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-primary">
            Get timely, cost-effective, and high quality diagnostic care
          </h2>
          <Link href="/diagnostics">
            <Button variant="ghost" className="text-primary hover:text-secondary flex items-center gap-1">
              View all <ChevronRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        <p className="text-gray-600 mb-8">
          Book tests with top labs, get sample pick up, share reports with doctors online
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {diagnosticServices.map((service) => (
            <Card
              key={service.title}
              className="hover:shadow-md transition-shadow border border-gray-200"
            >
              <Link href={service.link} className="block h-full">
                <CardContent className="p-4 flex flex-col items-center text-center h-full justify-between">
                  <div className="text-4xl mb-3">
                    {service.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-primary mb-3">
                      {service.title}
                    </h3>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full text-xs border-secondary text-primary hover:bg-secondary hover:text-white"
                    >
                      Check Prices
                    </Button>
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
