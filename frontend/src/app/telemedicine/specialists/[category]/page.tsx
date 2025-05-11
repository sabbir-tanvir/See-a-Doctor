"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { Doctor } from "@/types/doctor";
import { format } from "date-fns";

// This object maps the slug to the specialty title and description
const specialtyInfo: Record<string, { title: string, description: string, alternativeNames?: string[] }> = {
  "cardiologist": {
    title: "Cardiologist",
    description: "Cardiologists specialize in diagnosing and treating diseases or conditions of the heart and blood vessels.",
  },
  "chest-specialist": {
    title: "Chest Specialist",
    description: "Chest specialists focus on diseases affecting the lungs and respiratory system.",
  },
  "dermatologist": {
    title: "Dermatologist",
    description: "Dermatologists focus on conditions affecting the skin, hair, and nails.",
  },
  "gynecologist": {
    title: "Gynecologist",
    description: "Gynecologists specialize in female reproductive health, pregnancy, and childbirth.",
  },
  "diabetes-specialist": {
    title: "Diabetes Specialist",
    description: "Diabetes specialists specialize in the diagnosis and treatment of diabetes. They are trained to understand the complex medical and lifestyle changes that are required to manage diabetes.",
    alternativeNames: ["Endocrinologist", "Diabetologist"]
  },
  "diabetologist": {
    title: "Diabetologist",
    description: "Diabetologists specialize in the diagnosis and treatment of diabetes. Diabetes is a chronic disease that affects how your body turns food into energy.",
    alternativeNames: ["Diabetes Specialist", "Endocrinologist"]
  },
  "endocrinologist": {
    title: "Endocrinologist",
    description: "Endocrinologists specialize in diagnosing and treating health conditions related to problems with the body's hormones, hormone-producing glands, and related tissues.",
    alternativeNames: ["Diabetes Specialist", "Diabetologist"]
  }
  // Add other mappings as needed
};

// Helper function to safely render education data
const renderEducation = (education: any): string => {
  if (!education) return 'Not available';
  
  if (typeof education === 'string') {
    return education;
  }
  
  if (Array.isArray(education)) {
    return education.map(edu => {
      if (typeof edu === 'string') return edu;
      if (edu && typeof edu === 'object' && 'degree' in edu && 'institution' in edu) {
        return `${edu.degree}, ${edu.institution}`;
      }
      return 'Education details';
    }).join(', ');
  }
  
  return 'Education information not available';
};

export default function SpecialistCategoryPage({ params }: { params: { category: string } }) {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [specialtyTitle, setSpecialtyTitle] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  
  const category = params.category;
  
  useEffect(() => {
    const normalizedCategory = category.toLowerCase().replace(/-/g, ' ');
    const info = specialtyInfo[category] || 
                 Object.values(specialtyInfo).find(s => 
                   s.title.toLowerCase() === normalizedCategory ||
                   (s.alternativeNames || []).some(alt => alt.toLowerCase() === normalizedCategory)
                 ) || { title: normalizedCategory, description: "" };

    // Set the title initially from the mapping
    setSpecialtyTitle(info.title);
    
    fetchDoctors();
  }, [category]);
  
  const fetchDoctors = async () => {
    try {
      setLoading(true);
      setError('');
      
      const normalizedCategory = params.category.toLowerCase().replace(/-/g, ' ');
      const info = specialtyInfo[params.category] || 
                   Object.values(specialtyInfo).find(s => 
                     s.title.toLowerCase() === normalizedCategory ||
                     (s.alternativeNames || []).some(alt => alt.toLowerCase() === normalizedCategory)
                   ) || { title: normalizedCategory, description: "" };
      
      // First try with the original category name
      let response = await fetch(`/api/doctors?specialization=${encodeURIComponent(normalizedCategory)}`);
      let data = await response.json();
      
      // If no doctors found and we have alternativeNames, try with them
      if (!data.data || data.data.length === 0) {
        if (info.alternativeNames && info.alternativeNames.length > 0) {
          for (const altName of info.alternativeNames) {
            console.log(`Trying alternative name: ${altName}`);
            response = await fetch(`/api/doctors?specialization=${encodeURIComponent(altName)}`);
            const altData = await response.json();
            
            if (altData.data && altData.data.length > 0) {
              data = altData;
              break;
            }
          }
        }
      }
      
      if (data.data && data.data.length > 0) {
        // Set specialty info based on first doctor's actual specialization
        const actualSpecialization = data.data[0].specialization;
        const formattedTitle = actualSpecialization.charAt(0).toUpperCase() + actualSpecialization.slice(1);
        
        setDoctors(data.data);
        setSpecialtyTitle(formattedTitle || info.title);
      } else {
        setDoctors([]);
        setSpecialtyTitle(info.title);
      }
    } catch (err: any) {
      console.error("Failed to fetch doctors:", err);
      setError(err.message || "Failed to load doctors");
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <main>
      <Header />
      
      {/* Breadcrumb */}
      <section className="bg-gray-50 py-4 border-b">
        <div className="container-custom">
          <div className="flex text-sm">
            <Link href="/" className="text-gray-500 hover:text-primary">Home</Link>
            <span className="mx-2 text-gray-400">/</span>
            <Link href="/telemedicine" className="text-gray-500 hover:text-primary">Telemedicine</Link>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-primary">{specialtyTitle}</span>
          </div>
        </div>
      </section>
      
      {/* Hero Section */}
      <section className="py-12 bg-gradient-to-br from-primary/5 to-primary/10">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Specialists in {specialtyTitle}
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Book an online consultation with a specialist doctor
            </p>
          </div>
        </div>
      </section>
      
      {/* Doctors List */}
      <section className="py-12">
        <div className="container-custom">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <Loader2 className="h-8 w-8 text-primary animate-spin mb-4" />
              <p>Loading specialists...</p>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-500 mb-4">{error}</p>
              <Button onClick={() => fetchDoctors()}>Try Again</Button>
            </div>
          ) : doctors.length > 0 ? (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-8">
                Available {specialtyTitle} Specialists
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {doctors.map((doctor) => (
                  <div key={doctor._id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow">
                    <div className="p-6">
                      <div className="flex items-center mb-4">
                        <div className="relative h-16 w-16 rounded-full overflow-hidden mr-4 bg-gray-100">
                          {doctor.image ? (
                            <Image
                              src={doctor.image}
                              alt={doctor.name}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="h-full w-full flex items-center justify-center bg-primary/20 text-primary font-bold">
                              {doctor.name.split(" ").map(n => n[0]).join("").toUpperCase()}
                            </div>
                          )}
                        </div>
                        <div>
                          <h3 className="font-bold text-lg text-primary">{doctor.name}</h3>
                          <p className="text-gray-600 text-sm">{doctor.specialization}</p>
                        </div>
                      </div>
                      
                      <div className="space-y-2 mb-4 text-sm">
                        <p className="flex items-start">
                          <span className="font-medium w-24">Experience:</span>
                          <span>{doctor.experience} years</span>
                        </p>
                        <p className="flex items-start">
                          <span className="font-medium w-24">Education:</span>
                          <span>{renderEducation(doctor.education)}</span>
                        </p>
                        <p className="flex items-start">
                          <span className="font-medium w-24">Fee:</span>
                          <span>৳{doctor.fee}</span>
                        </p>
                      </div>
                      
                      <div className="flex justify-between items-center pt-2 border-t">
                        <div className="flex items-center">
                          <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                          </svg>
                          <span className="ml-1 text-sm font-medium">{doctor.rating || "N/A"}</span>
                          <span className="ml-1 text-xs text-gray-500">({doctor.reviews || 0})</span>
                        </div>
                        <Link href={`/doctor/${doctor._id}/appointment`}>
                          <Button size="sm">Book Now</Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <h2 className="text-xl font-bold mb-4">No {specialtyTitle} specialists available at the moment.</h2>
              <p className="text-gray-600 mb-8">Please check back later or try another specialization.</p>
              <Link href="/telemedicine">
                <Button>View All Specialties</Button>
              </Link>
            </div>
          )}
        </div>
      </section>
      
      <Footer />
    </main>
  );
}