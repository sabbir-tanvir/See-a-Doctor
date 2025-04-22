import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

// Define the Specialty type
type Specialty = {
  title: string;
  slug: string;
  description: string;
  icon?: string;
};

export default function AllSpecialistsPage() {
  // Comprehensive list of all specialties
  const allSpecialties: Specialty[] = [
    {
      title: "Aesthetic Dermatologist",
      slug: "aesthetic-dermatologist",
      description: "An aesthetic dermatologist is a medical doctor who specializes in the use of medical procedures to improve the appearance of the skin."
    },
    {
      title: "Allergy Skin-VD",
      slug: "allergy-skin-vd",
      description: "A skin allergy specialist is a doctor who specializes in the diagnosis and treatment of skin allergies. They are also known as allergists or dermatologists."
    },
    {
      title: "Andrologist",
      slug: "andrologist",
      description: "The physicians who specialize in treating men's reproductive-related issues are known as Andrologists."
    },
    {
      title: "Anesthesiologist",
      slug: "anesthesiologist",
      description: "An anesthesiologist is a doctor who specializes in the care of patients before, during, and after surgery. They are responsible for providing anesthesia, which is a medication that helps to relieve pain and prevent complications during surgery."
    },
    {
      title: "Cardiologist",
      slug: "cardiologist",
      description: "A doctor who specializes in the heart and blood vessels."
    },
    {
      title: "Cardiothoracic and Vascular Surgeon",
      slug: "cardiothoracic-vascular-surgeon",
      description: "Cardiothoracic and Vascular Surgeons specializes in the surgical treatment of diseases of the heart, lungs, and other thoracic (chest) organs, as well as the vascular system (the network of blood vessels that transport blood throughout the body)."
    },
    {
      title: "Chest Specialist",
      slug: "chest-specialist",
      description: "Pulmonologists are often called the chest specialist. Pulmonologists specializes in the diagnosis and treatment of diseases of the lungs and respiratory system."
    },
    {
      title: "Clinical Nutritionist",
      slug: "clinical-nutritionist",
      description: "Clinical nutritionists are healthcare professionals who specializes in the assessment and management of nutrition and diet in people who are ill or at risk of becoming ill."
    },
    {
      title: "Dentist",
      slug: "dentist",
      description: "Dentists specializes in the diagnosis, prevention, and treatment of diseases and conditions of the teeth, gums, and oral cavity. They are trained to perform a variety of procedures."
    },
    {
      title: "Dermatologist",
      slug: "dermatologist",
      description: "Dermatologists specializes in the diagnosis and treatment of diseases of the skin, hair, and nails. They are experts in the structure and function of the skin, and they can diagnose and treat a wide variety of skin conditions."
    },
    {
      title: "Diabetes Specialist",
      slug: "diabetes-specialist",
      description: "Diabetes specialists specializes in the diagnosis and treatment of diabetes. They are trained to understand the complex medical and lifestyle changes that are required to manage diabetes."
    },
    {
      title: "Diabetologist",
      slug: "diabetologist",
      description: "Diabetologists specializes in the diagnosis and treatment of diabetes. Diabetes is a chronic disease that affects how your body turns food into energy."
    },
    {
      title: "Dietician",
      slug: "dietician",
      description: "A dietitian, also known as a medical dietitian or dietician, is a specialized professional with expertise in recognizing and addressing malnutrition related to various illnesses. They are skilled in providing medical nutrition therapy, such as creating customized enteral tube feeding plans and managing the impacts of cancer cachexia."
    },
    {
      title: "Endocrinologist",
      slug: "endocrinologist",
      description: "Endocrinologists diagnose and treat hormone-related diseases and conditions."
    },
    {
      title: "Epidemiologist",
      slug: "epidemiologist",
      description: "Epidemiologists study the patterns, causes, and effects of health and disease conditions in defined populations."
    },
    {
      title: "Family Medicine Specialist",
      slug: "family-medicine-specialist",
      description: "Family medicine specialists provides comprehensive primary care to people of all ages, from infants to seniors. They diagnose and treat a wide range of medical conditions, including both common and chronic illnesses."
    },
    {
      title: "Gastroenterologist",
      slug: "gastroenterologist",
      description: "Gastroenterologists specializes in the digestive system, which includes the esophagus, stomach, small intestine, large intestine, rectum, and anus. They also treat the pancreas, liver, gallbladder, and bile ducts."
    },
    {
      title: "General Physician",
      slug: "general-physician",
      description: "A general physician is a medical doctor who provides primary care to adults. General physicians have a broad range of knowledge and skills, and they can diagnose and treat a wide variety of medical conditions."
    },
    {
      title: "General Surgeon",
      slug: "general-surgeon",
      description: "General surgeons have training in a wide range of surgical procedures, including those involving the abdomen, the digestive system, the skin, and the breast."
    },
    {
      title: "Gynecologist & Obstetrician",
      slug: "gynecologist-obstetrician",
      description: "Gynecologists and Obstetricians (OBGYNs) are doctors who specialize in the health of women's reproductive systems."
    },
    {
      title: "Internal Medicine",
      slug: "internal-medicine",
      description: "They are experts in the care of adults with a wide range of medical conditions, including both common and chronic illnesses. Internal medicine specialists also provide preventive care, such as immunizations and screenings."
    },
    {
      title: "Internal Medicine Specialist",
      slug: "internal-medicine-specialist",
      description: "They are experts in the care of adults with a wide range of medical conditions, including both common and chronic illnesses. Internal medicine specialists also provide preventive care, such as immunizations and screenings."
    },
    {
      title: "Laparoscopic Surgeon",
      slug: "laparoscopic-surgeon",
      description: "Laparoscopic Surgeons specializes in minimally invasive surgery of the abdomen, pelvis, and other organs. They use a laparoscope, which is a thin, tube-like instrument with a camera on the end, to view the inside of the body."
    },
    {
      title: "Medicine Specialist",
      slug: "medicine-specialist",
      description: "Medical specialists have a deep understanding of their area of expertise and are able to provide more specialized care than general practitioners."
    },
    {
      title: "Nephrologist",
      slug: "nephrologist",
      description: "A nephrologist is a medical specialist who specializes in the diagnosis, treatment, and management of kidney-related conditions and diseases."
    },
    {
      title: "Neuro Physician",
      slug: "neuro-physician",
      description: "Neuro physicians diagnose and treat disorders of the nervous system."
    },
    {
      title: "Neurologist",
      slug: "neurologist",
      description: "A doctor who specializes in the diagnosis and treatment of disorders of the nervous system."
    },
    {
      title: "Neurosurgeon",
      slug: "neurosurgeon",
      description: "A doctor who specializes in the surgical treatment of disorders of the brain, spine, and nervous system."
    },
    {
      title: "Nutritionist",
      slug: "nutritionist",
      description: "Nutritionists are professionals who specializes in the science of food and nutrition. They help people understand the relationship between food and health."
    },
    {
      title: "Oncologist",
      slug: "oncologist",
      description: "A doctor who specializes in the diagnosis and treatment of cancer."
    },
    {
      title: "Ophthalmologist",
      slug: "ophthalmologist",
      description: "Ophthalmologists are medical doctors who specialize in eye and vision care."
    },
    {
      title: "Orthopedic Surgeon",
      slug: "orthopedic-surgeon",
      description: "Orthopedic surgeons are devoted to the diagnosis, treatment, prevention and rehabilitation of injuries, disorders and diseases of the musculoskeletal system."
    },
    {
      title: "Otolaryngologists (ENT)",
      slug: "otolaryngologists-ent",
      description: "An otolaryngologist is a doctor who specializes in the diagnosis and treatment of diseases of the ear, nose, and throat (ENT). They are also known as ENT doctors, otorhinolaryngologists, or otorhinolaryngology-head and neck surgeons (OHNS)."
    },
    {
      title: "Pain Management Specialist",
      slug: "pain-management-specialist",
      description: "A \"pain doctor,\" alternatively known as a \"pain specialist\" or \"pain management specialist,\" is a medical professional, either an M.D. (Medical Doctor) or a D.O. (Doctor of Osteopathy), specializing in the field of pain medicine."
    },
    {
      title: "Pediatric Neurologist",
      slug: "pediatric-neurologist",
      description: "Pediatric neurologists diagnose and treat disorders of the nervous system in children."
    },
    {
      title: "Pediatric Surgeon",
      slug: "pediatric-surgeon",
      description: "Pediatric surgeons specializes in the surgical care of children from birth to young adulthood. They are trained to perform a wide range of procedures."
    },
    {
      title: "Pediatrician",
      slug: "pediatrician",
      description: "A doctor who specializes in the health of children from birth to young adulthood."
    },
    {
      title: "Physical Medicine",
      slug: "physical-medicine",
      description: "A physical medicine specialist, also known as a physiatrist, is a doctor who specializes in the diagnosis, treatment, and rehabilitation of people with physical impairments or disabilities."
    },
    {
      title: "Physiotherapist",
      slug: "physiotherapist",
      description: "Physiotherapists help people affected by injury, illness or disability through movement and exercise, manual therapy, education and advice."
    },
    {
      title: "Plastic Surgeon",
      slug: "plastic-surgeon",
      description: "A plastic surgeon is a medical doctor who specializes in surgery to improve the appearance of the body. They also perform reconstructive surgery to repair damage caused by injury, disease, or birth defects."
    },
    {
      title: "Psychiatrist",
      slug: "psychiatrist",
      description: "A psychiatrist is a doctor who specializes in the diagnosis and treatment of mental disorders. They are trained to assess and treat a wide range of mental health conditions, including depression, anxiety, schizophrenia, and personality disorders."
    },
    {
      title: "Psychologist",
      slug: "psychologist",
      description: "A psychologist is a professional who specializes in the scientific study of mental functions and behavior. These professionals usually have a Master's or higher degree in psychology."
    },
    {
      title: "Respiratory Specialist",
      slug: "respiratory-specialist",
      description: "Respiratory specialists specializes in the diagnosis and treatment of respiratory diseases. They are also known as pulmonologists or respiratory physicians."
    },
    {
      title: "Rheumatologist",
      slug: "rheumatologist",
      description: "A rheumatologist is a medical specialist who diagnoses and treats disorders and diseases affecting the joints, muscles, and other associated tissues and organs."
    },
    {
      title: "Sexual Medicine Specialist",
      slug: "sexual-medicine-specialist",
      description: "A sexual medicine specialist is a doctor who specializes in the diagnosis and treatment of sexual health problems. They are trained to assess and treat a wide range of sexual health conditions, including erectile dysfunction, premature ejaculation, low libido, and sexual pain."
    },
    {
      title: "Sonologist",
      slug: "sonologist",
      description: "Sonologist, also known as a diagnostic medical sonographer, is a medical professional who performs and interprets ultrasound exams."
    },
    {
      title: "Spine Surgeon",
      slug: "spine-surgeon",
      description: "A spine surgeon is a specialized doctor, either an orthopedic surgeon or a neurosurgeon, trained in the treatment of spinal conditions and capable of performing spinal procedures."
    },
    {
      title: "Sports Physician",
      slug: "sports-physician",
      description: "A sports medicine physician caters to both athletes and non-athletes, possessing specialized expertise in addressing musculoskeletal injuries involving bones, muscles, and joints."
    },
    {
      title: "Surgeon",
      slug: "surgeon",
      description: "Surgeons have training in a wide range of surgical procedures, including those involving the abdomen, the digestive system, the skin, and the breast."
    },
    {
      title: "Thoracic Surgeon",
      slug: "thoracic-surgeon",
      description: "Thoracic surgeons specializes in the surgical treatment of diseases and conditions of the chest, including the heart, lungs, esophagus, and other organs. They are trained to perform a wide range of procedures."
    },
    {
      title: "Trauma Surgeon",
      slug: "trauma-surgeon",
      description: "Trauma surgeons specializes in the treatment of injuries caused by accidents, violence, or other sudden events. They are trained to diagnose and treat a wide range of injuries."
    },
    {
      title: "Urologist",
      slug: "urologist",
      description: "Urologists specializes in the urinary tract and male reproductive organs. They are trained to diagnose and treat a wide range of conditions affecting these organs."
    }
  ];

  return (
    <main>
      <Header />



      {/* All Specialties Section */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allSpecialties.map((specialty, index) => (
              <Link 
                key={index}
                href={`/telemedicine/specialists/${specialty.slug}`}
                className="block hover:no-underline"
              >
                <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow h-full border border-gray-100">
                  <h3 className="font-bold text-lg text-primary mb-2">{specialty.title}</h3>
                  <p className="text-gray-600 text-sm line-clamp-3">{specialty.description}</p>
                  <div className="mt-4 flex justify-end">
                    <span className="text-secondary text-sm font-medium flex items-center">
                      View Doctors
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 ml-1">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}