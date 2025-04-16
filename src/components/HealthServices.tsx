import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function HealthServices() {
  const services = [
    {
      title: "Physiotherapy Service at Home",
      description: "Are you suffering from pain? The Solution is physiotherapy, also referred to as physical therapy. Our physiotherapists are licensed medical professionals who employ physical techniques to aid patients in reducing pain and enhancing or regaining mobility.",
      image: "https://ext.same-assets.com/174619264/2151548762.webp",
      link: "/domiciliary-services"
    },
    {
      title: "Home Sample Collection for Lab Test",
      description: "Home Sample Collection is a service offered by Sasthya Seba that brings diagnostic assistance right to the patients home. Our goal is to provide high-quality special healthcare services to patients who are unable to visit the hospital to provide blood, urine, or stool samples.",
      image: "https://ext.same-assets.com/174619264/3758902147.webp",
      link: "/services"
    },
    {
      title: "Buy Health Checkup Package",
      description: "In our society, it is a tradition to see a doctor only when you feel unwell or sick. People still don't realize that some diseases that have plagued our bodies for years take time before their signs and symptoms appear physically. By regular health checkup, we can identify such potential risks early and prevent them.",
      image: "https://ext.same-assets.com/174619264/1527983604.webp",
      link: "/health-checkup-and-insurances"
    },
    {
      title: "Buy Health Insurance",
      description: "During medical emergencies, a health insurance plan provides substantial financial support. The costs of crucial illnesses such as cancer, heart disease, and so on can have a significant impact on your financial situation. A health insurance plan can provide you with substantial financial coverage to cover the costs of treatment.",
      image: "https://ext.same-assets.com/174619264/2748516903.webp",
      link: "/health-checkup-and-insurances"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="flex flex-col md:flex-row gap-6 border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow p-6"
            >
              <div className="md:w-1/3">
                <div className="relative h-48 w-full rounded-lg overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="md:w-2/3">
                <h3 className="text-xl font-bold mb-3 text-primary">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-4">
                  {service.description}
                </p>
                <Link href={service.link}>
                  <Button
                    variant="outline"
                    className="border-secondary text-primary hover:bg-secondary hover:text-white transition-colors"
                  >
                    Learn more
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
