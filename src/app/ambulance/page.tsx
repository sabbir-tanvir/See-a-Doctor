import React from "react";
import Image from "next/image";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import Link from "next/link";

// Ambulance Service Request Form Component
import { ConsultationRequestForm } from "@/components/ConsultationRequestForm";

export default function AmbulancePage() {
  // Array of ambulance types
  const ambulanceTypes = [
    {
      id: "ac-ambulance",
      title: "AC Ambulance Service",
      image: "https://ext.same-assets.com/690263052/3413034796.webp",
      description: "AC ambulances are also called Basic Life Support Ambulance, which are primarily used for transporting patients who are medically stable and do not require constant monitoring. AC Ambulances equipped with general equipment like oxygen, stethoscope, and equipment to check the blood pressure, etc. This ambulance is best for transfer of patients in nearby areas.",
      responseTime: "30 minutes*",
      link: "/ambulance/ac-ambulance"
    },
    {
      id: "acls-ambulance",
      title: "ACLS Ambulance Service",
      image: "https://ext.same-assets.com/690263052/3993225361.webp",
      description: "The assignment of the ACLS emergency vehicle is to carry patients who are extremely harmed or enduring a heart assault, cardiac capture, asthma assault, stroke, respiratory disappointment, serious dying, obviousness, seizures, burn, harming, head damage, polytrauma, pregnancy, diabetic crisis, etc.",
      responseTime: "30 minutes*",
      link: "/ambulance/invalid"
    },
    {
      id: "air-ambulance",
      title: "AIR Ambulance Service",
      image: "https://ext.same-assets.com/690263052/898804201.webp",
      description: "Today aeromedical transport is possible using air ambulance service to transfer critically ill as well as medically stable patients over long distances. Like ground ambulances, air ambulances are equipped with medical equipments vital to monitoring and treating injured or ill patients.",
      responseTime: "60 minutes*",
      link: "/ambulance/air-ambulance"
    },
    {
      id: "als-ambulance",
      title: "ALS Ambulance Service",
      image: "https://ext.same-assets.com/174619264/3776423224.webp", // Using a working image from our assets
      description: "ALS Ambulance means an ambulance in which Advanced Life Support (ALS) is provided in situations where the patient being transported is in a more critical condition and a paramedic is required to assist in the treatment of the patient before and/or during transport to the emergency facility.",
      responseTime: "30 minutes*",
      link: "/ambulance/als-ambulance"
    },
    {
      id: "freezing-ambulance",
      title: "Freezing Ambulance Service",
      image: "https://ext.same-assets.com/690263052/3702994977.webp",
      description: "Dead body carrier freezer van / ambulances, also known as mortuary ambulances. These ambulances are equipped with ice boxes. This is the freezer installed inside the hearse van freezer vehicles to keep the human remains inside it.",
      responseTime: "30 minutes*",
      link: "/ambulance/freezing-ambulance"
    },
    {
      id: "icu-ambulance",
      title: "ICU Ambulance Service",
      image: "https://ext.same-assets.com/690263052/2349005020.webp",
      description: "The task of the ICU ambulance is to carry the patients who are severely injured or suffering from a heart attack, cardiac arrest, asthma attack, stroke, respiratory failure, severe bleeding, unconsciousness, seizures, burn, poisoning, head injury, polytrauma, pregnancy, diabetic emergency, etc.",
      responseTime: "30 minutes*",
      link: "/ambulance/icu-ambulance"
    },
    {
      id: "nicu-ambulance",
      title: "NICU Ambulance Service",
      image: "https://ext.same-assets.com/174619264/3776423224.webp", // Using a working image from our assets
      description: "We have advanced our ambulance into a neonatal incubator care unit for critically ill infants. Our neonatal ambulances are well equipped with ICU monitoring facilities, incubators, continuous oxygen administration, IV therapy etc. We give special attention to the hygiene of the van, to keep the baby free from infection.",
      responseTime: "30 minutes*",
      link: "/ambulance/nicu-ambulance"
    },
    {
      id: "non-ac-ambulance",
      title: "Non Ac Ambulance Service",
      image: "https://ext.same-assets.com/174619264/3776423224.webp", // Using a working image from our assets
      description: "NON-AC ambulances are also called Basic Life Support Ambulances, which are primarily used for transporting patients who are medically stable and do not require constant monitoring. NON-AC BLS Ambulances are equipped with general equipment like oxygen, a stethoscope, and equipment to check blood pressure, etc.",
      responseTime: "30 minutes*",
      link: "/ambulance/non-ac-ambulance"
    }
  ];

  return (
    <main>
      <Header />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary to-secondary/90 text-white pb-10">
        <div className="container-custom pt-10 pb-6">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Ambulance Service</h1>
          <h2 className="text-xl md:text-2xl font-semibold mb-6">
            Rent a Prompt, High quality, Emergency ambulance at your need
          </h2>
          <p className="text-sm italic mb-6">*(Customizable Attendant Doctor & Nurse)</p>

          <div className="flex flex-col md:flex-row gap-6 mb-4">
            <div className="flex items-center">
              <Image
                src="https://ext.same-assets.com/690263052/1414969866.svg"
                alt="Best Price"
                width={24}
                height={24}
                className="mr-2"
              />
              <p className="text-sm font-semibold">Best Price, Quality Service, On-Time Guarantee</p>
            </div>
            <div className="flex items-center">
              <Image
                src="https://ext.same-assets.com/690263052/1436402819.svg"
                alt="Trusted"
                width={24}
                height={24}
                className="mr-2"
              />
              <p className="text-sm font-semibold">Trusted, Certified & Skilled Driver</p>
            </div>
            <div className="flex items-center">
              <Image
                src="https://ext.same-assets.com/690263052/2018841427.svg"
                alt="Hotline"
                width={24}
                height={24}
                className="mr-2"
              />
              <p className="text-sm font-semibold">Hotline: 01405 600 700</p>
            </div>
          </div>
        </div>

        {/* Ambulance Tabs */}
        <div className="container-custom overflow-x-auto">
          <div className="flex space-x-2 pb-2 min-w-max">
            {ambulanceTypes.map((type) => (
              <Link
                key={type.id}
                href={type.link}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-t-lg text-sm font-medium transition-colors"
              >
                {type.title.split(' ')[0]}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Ambulance List Section */}
      <section className="py-10 bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 gap-10">
            {ambulanceTypes.map((ambulance, index) => (
              <div
                key={ambulance.id}
                className="bg-white rounded-lg shadow-md overflow-hidden"
                id={ambulance.id}
              >
                <div className="flex flex-col md:flex-row">
                  {/* Ambulance Image */}
                  <div className="md:w-1/3 p-4">
                    <div className="relative h-64 w-full">
                      <Image
                        src={ambulance.image}
                        alt={ambulance.title}
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>

                  {/* Ambulance Details */}
                  <div className="md:w-2/3 p-6">
                    <h2 className="text-2xl font-bold text-primary mb-4">
                      {ambulance.title}
                    </h2>
                    <p className="text-gray-600 mb-6">
                      {ambulance.description}
                    </p>
                    <div className="space-y-2">
                      <p className="text-sm">Get ambulance within {ambulance.responseTime}</p>
                      <p className="text-sm">24/7 affordable quality service</p>
                      <p className="text-sm">We are just a call away: 01405600700</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Request Form Section */}
      <section className="py-10 bg-white">
        <div className="container-custom">
          <div className="bg-white rounded-lg shadow-md overflow-hidden border">
            <div className="bg-primary text-white p-4">
              <h2 className="text-xl font-bold">Request an Ambulance</h2>
            </div>
            <div className="p-6">
              <ConsultationRequestForm
                formType="ambulance"
                helpText="One of our agent will get back to you within 30 minutes with the update of the ambulance."
              />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
