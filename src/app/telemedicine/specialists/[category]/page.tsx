import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";

// Import the doctors data from the data folder with correct type
import { doctorsData, Doctor } from "@/data/doctorsData";

// This object maps the slug to the specialty title and description
const specialtyInfo: Record<string, { title: string, description: string, alternativeNames?: string[] }> = {
  "general-physician": {
    title: "General Physician",
    description: "A general physician is a medical doctor who provides primary care to adults. General physicians have a broad range of knowledge and skills, and they can diagnose and treat a wide variety of medical conditions.",
    alternativeNames: ["Medicine Specialist", "General Medicine"]
  },
  "gynecologist-obstetrician": {
    title: "Gynecologist & Obstetrician",
    description: "Gynecologists and Obstetricians (OBGYNs) are doctors who specialize in the health of women's reproductive systems.",
    alternativeNames: ["OBGYN", "Gynaecologist"]
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
  // Add all the specialties from the telemedicine page for complete mapping
  "cardiothoracic-vascular-surgeon": {
    title: "Cardiothoracic and Vascular Surgeon",
    description: "Cardiothoracic and Vascular Surgeons specializes in the surgical treatment of diseases of the heart, lungs, and other thoracic (chest) organs, as well as the vascular system."
  },
  "chest-specialist": {
    title: "Chest Specialist",
    description: "Pulmonologists are often called the chest specialist. Pulmonologists specializes in the diagnosis and treatment of diseases of the lungs and respiratory system.",
    alternativeNames: ["Pulmonologist", "Respiratory Specialist"]
  },
  "clinical-nutritionist": {
    title: "Clinical Nutritionist",
    description: "Clinical nutritionists are healthcare professionals who specializes in the assessment and management of nutrition and diet in people who are ill or at risk of becoming ill.",
    alternativeNames: ["Nutritionist", "Dietician"]
  },
  "dentist": {
    title: "Dentist",
    description: "Dentists specializes in the diagnosis, prevention, and treatment of diseases and conditions of the teeth, gums, and oral cavity."
  },
  "diabetes-specialist": {
    title: "Diabetes Specialist",
    description: "Diabetes specialists specializes in the diagnosis and treatment of diabetes.",
    alternativeNames: ["Diabetologist", "Endocrinologist"]
  },
  "diabetologist": {
    title: "Diabetologist",
    description: "Diabetologists specializes in the diagnosis and treatment of diabetes."
  },
  "dietician": {
    title: "Dietician",
    description: "A dietitian is a specialized professional with expertise in recognizing and addressing malnutrition related to various illnesses."
  },
  "endocrinologist": {
    title: "Endocrinologist",
    description: "Endocrinologists diagnose and treat hormone-related diseases and conditions."
  },
  "epidemiologist": {
    title: "Epidemiologist",
    description: "Epidemiologists study the patterns, causes, and effects of health and disease conditions in defined populations."
  },
  "family-medicine-specialist": {
    title: "Family Medicine Specialist",
    description: "Family medicine specialists provides comprehensive primary care to people of all ages, from infants to seniors."
  },
  "gastroenterologist": {
    title: "Gastroenterologist",
    description: "Gastroenterologists specializes in the digestive system."
  },
  "general-surgeon": {
    title: "General Surgeon",
    description: "General surgeons have training in a wide range of surgical procedures.",
    alternativeNames: ["Surgeon"]
  },
  "internal-medicine": {
    title: "Internal Medicine",
    description: "They are experts in the care of adults with a wide range of medical conditions.",
    alternativeNames: ["Internal Medicine Specialist", "Medicine Specialist"]
  },
  "internal-medicine-specialist": {
    title: "Internal Medicine Specialist",
    description: "They are experts in the care of adults with a wide range of medical conditions.",
    alternativeNames: ["Internal Medicine", "Medicine Specialist"]
  },
  "laparoscopic-surgeon": {
    title: "Laparoscopic Surgeon",
    description: "Laparoscopic Surgeons specializes in minimally invasive surgery."
  },
  "medicine-specialist": {
    title: "Medicine Specialist",
    description: "Medical specialists have a deep understanding of their area of expertise.",
    alternativeNames: ["General Physician", "Internal Medicine"]
  },
  "nephrologist": {
    title: "Nephrologist",
    description: "A nephrologist is a medical specialist who specializes in kidney-related conditions."
  },
  "neuro-physician": {
    title: "Neuro Physician",
    description: "Neuro physicians diagnose and treat disorders of the nervous system.",
    alternativeNames: ["Neurologist"]
  },
  "neurologist": {
    title: "Neurologist",
    description: "A doctor who specializes in disorders of the nervous system.",
    alternativeNames: ["Neuro Physician"]
  },
  "neurosurgeon": {
    title: "Neurosurgeon",
    description: "A doctor who specializes in the surgical treatment of disorders of the brain, spine, and nervous system."
  },
  "nutritionist": {
    title: "Nutritionist",
    description: "Nutritionists are professionals who specializes in food and nutrition.",
    alternativeNames: ["Clinical Nutritionist", "Dietician"]
  },
  "oncologist": {
    title: "Oncologist",
    description: "A doctor who specializes in the diagnosis and treatment of cancer."
  },
  "ophthalmologist": {
    title: "Ophthalmologist",
    description: "Ophthalmologists are medical doctors who specialize in eye and vision care."
  },
  "orthopedic-surgeon": {
    title: "Orthopedic Surgeon",
    description: "Orthopedic surgeons focus on the musculoskeletal system."
  },
  "otolaryngologists-ent": {
    title: "Otolaryngologists (ENT)",
    description: "An otolaryngologist specializes in diseases of the ear, nose, and throat.",
    alternativeNames: ["ENT Specialist"]
  },
  "pain-management-specialist": {
    title: "Pain Management Specialist",
    description: "A pain specialist focuses on pain medicine."
  },
  "pediatric-neurologist": {
    title: "Pediatric Neurologist",
    description: "Pediatric neurologists diagnose and treat disorders of the nervous system in children."
  },
  "pediatric-surgeon": {
    title: "Pediatric Surgeon",
    description: "Pediatric surgeons specializes in the surgical care of children."
  },
  "physical-medicine": {
    title: "Physical Medicine",
    description: "A physical medicine specialist focuses on rehabilitation.",
    alternativeNames: ["Physical Medicine and Rehabilitation"]
  },
  "physiotherapist": {
    title: "Physiotherapist",
    description: "Physiotherapists help people through movement, exercise, and manual therapy."
  },
  "plastic-surgeon": {
    title: "Plastic Surgeon",
    description: "A plastic surgeon specializes in improving body appearance or reconstruction."
  },
  "psychologist": {
    title: "Psychologist",
    description: "A psychologist specializes in mental functions and behavior."
  },
  "respiratory-specialist": {
    title: "Respiratory Specialist",
    description: "Respiratory specialists focus on respiratory diseases.",
    alternativeNames: ["Pulmonologist", "Chest Specialist"]
  },
  "rheumatologist": {
    title: "Rheumatologist",
    description: "A rheumatologist diagnoses and treats disorders affecting joints and tissues."
  },
  "sexual-medicine-specialist": {
    title: "Sexual Medicine Specialist",
    description: "A sexual medicine specialist focuses on sexual health problems."
  },
  "sonologist": {
    title: "Sonologist",
    description: "Sonologist performs and interprets ultrasound exams."
  },
  "spine-surgeon": {
    title: "Spine Surgeon",
    description: "A spine surgeon is trained in spinal conditions and procedures."
  },
  "sports-physician": {
    title: "Sports Physician",
    description: "A sports medicine physician addresses musculoskeletal injuries.",
    alternativeNames: ["Sports Medicine Specialist"]
  },
  "surgeon": {
    title: "Surgeon",
    description: "Surgeons have training in surgical procedures.",
    alternativeNames: ["General Surgeon"]
  },
  "thoracic-surgeon": {
    title: "Thoracic Surgeon",
    description: "Thoracic surgeons specialize in chest organ procedures."
  },
  "trauma-surgeon": {
    title: "Trauma Surgeon",
    description: "Trauma surgeons treat injuries from accidents or violence."
  },
  "urologist": {
    title: "Urologist",
    description: "Urologists specialize in the urinary tract and male reproductive organs."
  }
};

// Function to get doctors by category from the data folder
const getDoctorsByCategory = (category: string): Doctor[] => {
  // Get the specialty info for this category
  const specialtyData = specialtyInfo[category];

  if (!specialtyData) {
    return [];
  }

  const mainTitle = specialtyData.title.toLowerCase();
  const alternativeTitles = specialtyData.alternativeNames?.map(name => name.toLowerCase()) || [];

  // Filter doctors by specialization matching any of the possible titles
  return doctorsData.filter(doctor => {
    const docSpecialization = doctor.specialization.toLowerCase();

    // Check if the doctor specialization matches the main title or any alternative names
    if (docSpecialization.includes(mainTitle)) {
      return true;
    }

    // Check against alternative names
    return alternativeTitles.some(altTitle => docSpecialization.includes(altTitle));
  });
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
          {doctors.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {doctors.map((doctor) => (
                <div key={doctor.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="p-6 flex flex-col md:flex-row gap-4">
                    <div className="flex-shrink-0">
                      <div className="relative h-24 w-24 rounded-full overflow-hidden">
                        <Link href={`/doctor/${doctor.id}`}>
                          {doctor.image ? (
                            <Image
                              src={doctor.image}
                              alt={doctor.name}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="h-24 w-24 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 text-lg">
                              {doctor.name.substring(0, 2)}
                            </div>
                          )}
                        </Link>
                      </div>
                    </div>
                    <div className="flex-grow">
                    <Link href={`/doctor/${doctor.id}`}>
                      <h3 className="font-bold text-lg text-primary">{doctor.name}</h3>
                    </Link>
                      <p className="text-gray-600 mb-1">{doctor.specialization}</p>
                      <p className="text-gray-600 mb-1">{doctor.education}</p>
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
                        <p className="font-bold text-primary">৳{doctor.fee}</p>
                      </div>
                      <Link href={`/doctor/${doctor.id}/appointment`}>
                        <Button className="bg-secondary hover:bg-secondary/90 text-white">
                          Book Appointment
                        </Button>
                      </Link>
                    </div>
                  </div>
                  <div className="p-4 border-t border-gray-100">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Location</p>
                        <p className="text-xs">{doctor.location}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Hospital</p>
                        <p className="text-xs">{doctor.hospital}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10 bg-white rounded-lg shadow-sm">
              <div className="mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto text-gray-400"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No doctors found</h3>
              <p className="text-gray-600">
                We couldn't find any {specialtyData.title} specialists at the moment.
              </p>
              <Link href="/telemedicine" className="mt-6 inline-block">
                <Button variant="outline" className="mt-4">
                  Browse All Specialists
                </Button>
              </Link>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}