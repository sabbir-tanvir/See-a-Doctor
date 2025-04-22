import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ConsultationRequestForm } from "@/components/ConsultationRequestForm";

// Define the Doctor type
type Doctor = {
  id: string;
  name: string;
  title: string;
  specialty: string;
  qualifications: string;
  experience: string;
  image: string;
  consultationFee: string;
  availability: string[];
  languages: string[];
  rating: number;
};

// This object maps the slug to the specialty title and description
const specialtyInfo: Record<string, { title: string, description: string }> = {
  "general-physician": {
    title: "General Physician",
    description: "A general physician is a medical doctor who provides primary care to adults. General physicians have a broad range of knowledge and skills, and they can diagnose and treat a wide variety of medical conditions."
  },
  "gynecologist-obstetrician": {
    title: "Gynecologist & Obstetrician",
    description: "Gynecologists and Obstetricians (OBGYNs) are doctors who specialize in the health of women's reproductive systems."
  },
  "cardiologist": {
    title: "Cardiologist",
    description: "A doctor who specializes in the heart and blood vessels."
  },
  "dermatologist": {
    title: "Dermatologist",
    description: "Dermatologists specializes in the diagnosis and treatment of diseases of the skin, hair, and nails. They are experts in the structure and function of the skin, and they can diagnose and treat a wide variety of skin conditions."
  },
  "pediatrician": {
    title: "Pediatrician",
    description: "A doctor who specializes in the health of children from birth to young adulthood."
  },
  "psychiatrist": {
    title: "Psychiatrist",
    description: "A psychiatrist is a doctor who specializes in the diagnosis and treatment of mental disorders. They are trained to assess and treat a wide range of mental health conditions, including depression, anxiety, schizophrenia, and personality disorders."
  },
  "aesthetic-dermatologist": {
    title: "Aesthetic Dermatologist",
    description: "An aesthetic dermatologist is a medical doctor who specializes in the use of medical procedures to improve the appearance of the skin."
  },
  "allergy-skin-vd": {
    title: "Allergy Skin-VD",
    description: "A skin allergy specialist is a doctor who specializes in the diagnosis and treatment of skin allergies. They are also known as allergists or dermatologists."
  },
  "andrologist": {
    title: "Andrologist",
    description: "The physicians who specialize in treating men's reproductive-related issues are known as Andrologists."
  },
  "anesthesiologist": {
    title: "Anesthesiologist",
    description: "An anesthesiologist is a doctor who specializes in the care of patients before, during, and after surgery. They are responsible for providing anesthesia, which is a medication that helps to relieve pain and prevent complications during surgery."
  },
  // Add more specialties as needed from the list
};

// Mock data function to generate doctors based on category
const getDoctorsByCategory = (category: string): Doctor[] => {
  // This would typically come from an API or database
  // For now, let's generate some mock data
  const doctorNames = [
    "Dr. Rahim Ahmed", 
    "Dr. Anika Rahman", 
    "Dr. Kamal Hossain", 
    "Dr. Nusrat Jahan", 
    "Dr. Fahim Khan", 
    "Dr. Tasnim Akter"
  ];
  
  return Array.from({ length: 6 }, (_, i) => ({
    id: `doc-${category}-${i + 1}`,
    name: doctorNames[i],
    title: `${specialtyInfo[category]?.title || 'Specialist'}`,
    specialty: specialtyInfo[category]?.title || 'Specialist',
    qualifications: "MBBS, FCPS, MS",
    experience: `${5 + Math.floor(Math.random() * 10)} years`,
    image: `https://randomuser.me/api/portraits/${i % 2 === 0 ? 'men' : 'women'}/${i + 1}.jpg`,
    consultationFee: `${800 + (i * 100)} BDT`,
    availability: ["Mon-Wed: 6PM-9PM", "Sat-Sun: 10AM-1PM"],
    languages: ["Bangla", "English"],
    rating: 4 + Math.random()
  }));
};

export default function SpecialistCategoryPage({
  params
}: {
  params: { category: string }
}) {
  const { category } = params;
  const doctors = getDoctorsByCategory(category);
  const specialtyData = specialtyInfo[category] || {
    title: "Specialist",
    description: "Medical specialist providing expert care in their field."
  };

  return (
    <main>
      <Header />


      {/* Doctors Section */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <h2 className="text-2xl md:text-3xl font-bold mb-10 text-center">
            Available {specialtyData.title} Doctors
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {doctors.map((doctor) => (
              <div key={doctor.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6 flex flex-col md:flex-row gap-4">
                  <div className="flex-shrink-0">
                    <div className="relative h-24 w-24 rounded-full overflow-hidden">
                      <Image
                        src={doctor.image}
                        alt={doctor.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-bold text-lg text-primary">{doctor.name}</h3>
                    <p className="text-gray-600 mb-1">{doctor.title}</p>
                    <p className="text-gray-600 mb-1">{doctor.qualifications}</p>
                    <p className="text-gray-600 mb-2">{doctor.experience} Experience</p>
                    <div className="flex items-center mb-2">
                      <div className="flex">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <svg
                            key={i}
                            xmlns="http://www.w3.org/2000/svg"
                            fill={i < Math.floor(doctor.rating) ? "currentColor" : "none"}
                            viewBox="0 0 24 24"
                            className={`w-4 h-4 ${i < Math.floor(doctor.rating) ? "text-yellow-400" : "text-gray-300"}`}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.196-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.783-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                            />
                          </svg>
                        ))}
                      </div>
                      <span className="ml-1 text-sm text-gray-600">
                        {doctor.rating.toFixed(1)}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="p-4 border-t border-gray-100 bg-gray-50">
                  <div className="flex justify-between items-center mb-2">
                    <div>
                      <p className="text-sm text-gray-600">Consultation Fee</p>
                      <p className="font-bold text-primary">{doctor.consultationFee}</p>
                    </div>
                    <Link href={`/telemedicine/appointment/${doctor.id}`}>
                      <Button className="bg-secondary hover:bg-secondary/90 text-white">
                        Book Appointment
                      </Button>
                    </Link>
                  </div>
                </div>
                <div className="p-4 border-t border-gray-100">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Availability</p>
                      <ul className="text-xs">
                        {doctor.availability.map((time, i) => (
                          <li key={i}>{time}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Languages</p>
                      <p className="text-xs">{doctor.languages.join(", ")}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>



      <Footer />
    </main>
  );
}