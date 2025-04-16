import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function HealthServices() {
  const services = [
    {
      id: 1,
      title: "Physiotherapy Service at Home",
      description: "Are you suffering from pain? The Solution is physiotherapy, also referred to as physical therapy. Our physiotherapists are licensed medical professionals who employ physical techniques to aid patients in reducing pain and enhancing or regaining mobility. Over the years, we provide Physiotherapy service at home for Geriatric, Balance Issues, Shoulder, Elbow, Wrist, and Hand Surgery, Hip, Knee, Calf, Ankle, and Foot Surgery, Post-Surgical Recovery, Joint Replacement, and Accidental Recovery.",
      image: "https://ext.same-assets.com/174619264/2376547902.webp",
      link: "/domiciliary-services"
    },
    {
      id: 2,
      title: "Home Sample Collection for Lab Test",
      description: "Home Sample Collection is a service offered by Sasthya Seba that brings diagnostic assistance right to the patients home. Our goal is to provide high-quality special healthcare services to patients who are unable to visit the hospital to provide blood, urine, or stool samples for treatment or regular health checkups. At your door, our medical professionals and technicians will come to collect the samples, from the convenience of your home. We will email you the report's soft copy as soon as it is published. A hard copy of the report will be sent to the patient within 48 hours.",
      image: "https://ext.same-assets.com/174619264/2376547903.webp",
      link: "/services"
    },
    {
      id: 3,
      title: "Buy Health Checkup Package",
      description: "In our society, it is a tradition to see a doctor only when you feel unwell or sick. People still don't realize that some diseases that have plagued our bodies for years take time before their signs and symptoms appear physically. By regular health checkup, we can identify such potential risks early and prevent them. So, purchasing health packages is a good decision for a patient or a general person. We have different types of health packages like executive health packages, general health packages & foreign medical health checks for both males & females.",
      image: "https://ext.same-assets.com/174619264/2376547904.webp",
      link: "/health-checkup-and-insurances"
    },
    {
      id: 4,
      title: "Buy Health Insurance",
      description: "During medical emergencies, a health insurance plan provides substantial financial support. The costs of crucial illnesses such as cancer, heart disease, and so on can have a significant impact on your financial situation. A health insurance plan can provide you with substantial financial coverage to cover the costs of treatment both in Bangladesh and overseas. It also covers hospitalization, diagnosis, ambulance, and prescription costs, as well as the convenience of fast payouts for increased financial flexibility. Health insurance not only covers future costs but also provides financial assistance in the present. You can claim tax deductions. This can assist you in lowering your overall tax liability.",
      image: "https://ext.same-assets.com/174619264/2376547905.webp",
      link: "/health-checkup-and-insurances"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service) => (
            <Card key={service.id} className="overflow-hidden border border-gray-200">
              <div className="flex flex-col sm:flex-row h-full">
                <div className="sm:w-1/3 relative h-48 sm:h-auto">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardContent className="p-6 sm:w-2/3 flex flex-col">
                  <h3 className="text-lg font-semibold text-primary mb-2">{service.title}</h3>
                  <p className="text-gray-600 text-sm line-clamp-4 mb-4 flex-grow">{service.description}</p>
                  <Link href={service.link} className="mt-auto">
                    <Button
                      variant="outline"
                      className="border-secondary text-primary hover:bg-secondary hover:text-white"
                    >
                      Learn more
                    </Button>
                  </Link>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
