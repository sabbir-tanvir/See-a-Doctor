"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image"; // Import Image component
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function SpecializationsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  // Placeholder icon URL - replace with actual icons later
  const placeholderIcon = "https://ext.same-assets.com/174619264/2272455185.webp";
  const specializations = [
    { name: "Aesthetic Dermatologist", icon: placeholderIcon },
    { name: "Allergy Skin-VD", icon: placeholderIcon },
    { name: "Andrologist", icon: placeholderIcon },
    { name: "Andrology & Transplant Surgeon", icon: placeholderIcon },
    { name: "Anesthesiologist", icon: placeholderIcon },
    { name: "Biochemist", icon: placeholderIcon },
    { name: "Cardiac Surgeon", icon: placeholderIcon },
    { name: "Cardiologist", icon: placeholderIcon },
    { name: "Cardiothoracic and Vascular Surgeon", icon: placeholderIcon },
    { name: "Cardiothoracic Surgeon", icon: placeholderIcon },
    { name: "Chest Specialist", icon: placeholderIcon },
    { name: "Clinical Nutritionist", icon: placeholderIcon },
    { name: "Colorectal & Laparoscopic Surgeon", icon: placeholderIcon },
    { name: "Colorectal Surgeon", icon: placeholderIcon },
    { name: "Cosmetic Dentist", icon: placeholderIcon },
    { name: "Cosmetologist", icon: placeholderIcon },
    { name: "Critical Care Medicine Specialist", icon: placeholderIcon },
    { name: "Critical Care Specialist", icon: placeholderIcon },
    { name: "Dentist", icon: placeholderIcon },
    { name: "Dermatologist", icon: placeholderIcon },
    { name: "Diabetes Specialist", icon: placeholderIcon },
    { name: "Diabetologist", icon: placeholderIcon },
    { name: "Dietician", icon: placeholderIcon },
    { name: "Endocrinologist", icon: placeholderIcon },
    { name: "Epidemiologist", icon: placeholderIcon },
    { name: "Family Medicine Specialist", icon: placeholderIcon },
    { name: "Gastroenterologist", icon: placeholderIcon },
    { name: "General Physician", icon: placeholderIcon },
    { name: "General Surgeon", icon: placeholderIcon },
    { name: "Geriatrician", icon: placeholderIcon },
    { name: "Gynecologic Oncologist", icon: placeholderIcon },
    { name: "Gynecologist & Obstetrician", icon: placeholderIcon },
    { name: "Gynecologists", icon: placeholderIcon },
    { name: "Hair Transplant Surgeon", icon: placeholderIcon },
    { name: "Hematologist", icon: placeholderIcon },
    { name: "Hepatobiliary Surgeon", icon: placeholderIcon },
    { name: "Hepatologist", icon: placeholderIcon },
    { name: "Immunologist", icon: placeholderIcon },
    { name: "Infertility Specialist", icon: placeholderIcon },
    { name: "Internal Medicine", icon: placeholderIcon },
    { name: "Internal Medicine Specialist", icon: placeholderIcon },
    { name: "Interventional Cardiologist", icon: placeholderIcon },
    { name: "Laparoscopic Surgeon", icon: placeholderIcon },
    { name: "Laparoscopist", icon: placeholderIcon },
    { name: "Laser Dermatosurgeon", icon: placeholderIcon },
    { name: "Maxillofacial and Dental Surgeon", icon: placeholderIcon },
    { name: "Maxillofacial Surgeon", icon: placeholderIcon },
    { name: "Medicine Specialist", icon: placeholderIcon },
    { name: "Microbiologist", icon: placeholderIcon },
    { name: "Neonatologist", icon: placeholderIcon },
    { name: "Nephrologist", icon: placeholderIcon },
    { name: "Neuro Physician", icon: placeholderIcon },
    { name: "Neurologist", icon: placeholderIcon },
    { name: "Neuromedicine Specialist", icon: placeholderIcon },
    { name: "Neuropsychologist", icon: placeholderIcon },
    { name: "Neurosurgeon", icon: placeholderIcon },
    { name: "Nucleologists", icon: placeholderIcon },
    { name: "Nutritionist", icon: placeholderIcon },
    { name: "Obstetrician", icon: placeholderIcon },
    { name: "Oncologist", icon: placeholderIcon },
    { name: "Ophthalmologist", icon: placeholderIcon },
    { name: "Orthopedic Surgeon", icon: placeholderIcon },
    { name: "Orthopedist", icon: placeholderIcon },
    { name: "Otolaryngologists (ENT)", icon: placeholderIcon },
    { name: "Pain Management Specialist", icon: placeholderIcon },
    { name: "Pathologist", icon: placeholderIcon },
    { name: "Pediatric Cardiologist", icon: placeholderIcon },
    { name: "Pediatric Dermatologist", icon: placeholderIcon },
    { name: "Pediatric Endocrinologist", icon: placeholderIcon },
    { name: "Pediatric Gastroenterologist", icon: placeholderIcon },
    { name: "Pediatric Hematologist", icon: placeholderIcon },
    { name: "Pediatric Hematologist & Oncologist", icon: placeholderIcon },
    { name: "Pediatric Nephrologist", icon: placeholderIcon },
    { name: "Pediatric Neurologist", icon: placeholderIcon },
    { name: "Pediatric Neurosurgeon", icon: placeholderIcon },
    { name: "Pediatric Pulmonologist", icon: placeholderIcon },
    { name: "Pediatric Surgeon", icon: placeholderIcon },
    { name: "Pediatrician", icon: placeholderIcon },
    { name: "Pediatrician & Neonatologist", icon: placeholderIcon },
    { name: "Physical Medicine", icon: placeholderIcon },
    { name: "Physiotherapist", icon: placeholderIcon },
    { name: "Plastic Surgeon", icon: placeholderIcon },
    { name: "Prosthodontist", icon: placeholderIcon },
    { name: "Psychiatrist", icon: placeholderIcon },
    { name: "Psychologist", icon: placeholderIcon },
    { name: "Pulmonary Medicine Specialist", icon: placeholderIcon },
    { name: "Pulmonologist", icon: placeholderIcon },
    { name: "Radiologist", icon: placeholderIcon },
    { name: "Rehabilitation Specialist", icon: placeholderIcon },
    { name: "Renal Specialist", icon: placeholderIcon },
    { name: "Respiratory Specialist", icon: placeholderIcon },
    { name: "Rheumatologist", icon: placeholderIcon },
    { name: "Sexual Medicine Specialist", icon: placeholderIcon },
    { name: "Sonologist", icon: placeholderIcon },
    { name: "Spine Surgeon", icon: placeholderIcon },
    { name: "Sports Physician", icon: placeholderIcon },
    { name: "Surgeon", icon: placeholderIcon },
    { name: "Thoracic Surgeon", icon: placeholderIcon },
    { name: "Transfusion Medicine Specialist", icon: placeholderIcon }
  ];

  const filteredSpecializations = specializations.filter(spec =>
    spec.name.toLowerCase().includes(searchTerm.toLowerCase()) // Filter by name
  );

  return (
    <>
    <Header />
    <div className="container-custom py-10">
      <h1 className="text-3xl font-bold mb-8">Doctor Specializations</h1>
    
      <div className="mb-8">
        <div className="relative">
          <Input
            type="text"
            placeholder="Search doctors, hospitals, clinics..."
            className="w-full p-4 rounded-md"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredSpecializations.map((specialization) => (
          <Link 
            href={`/search?type=doctor&q=${encodeURIComponent(specialization.name)}`}
            key={specialization.name}
          >
            <Card className="hover:shadow-lg transition-shadow border border-gray-100 h-full">
              <CardContent className="p-4 flex flex-col items-center text-center">
                 <div className="relative w-16 h-16 mb-3"> 
                   <Image
                     src={specialization.icon}
                     alt={specialization.name}
                     fill
                     className="object-contain"
                   />
                 </div>
                <h3 className="text-primary font-medium text-sm">{specialization.name}</h3>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

    </div>
    <Footer />
    </>
  );
}
