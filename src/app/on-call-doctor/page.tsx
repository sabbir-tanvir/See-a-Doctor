import React from "react";
import Image from "next/image";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ConsultationRequestForm } from "@/components/ConsultationRequestForm";

export default function OnCallDoctorPage() {
  const benefits = [
    "Convenient healthcare at your doorstep",
    "No need to travel when you're sick",
    "Personalized care in the comfort of your home",
    "Avoid hospital waiting times and exposure to other illnesses",
    "Complete medical examination with necessary equipment",
    "Medications prescribed as needed",
    "Follow-up recommendations if required"
  ];

  return (
    <main>
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-primary/90 text-white py-16">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row items-center gap-10">
            <div className="w-full md:w-1/2">
              <h1 className="text-3xl md:text-4xl font-bold mb-6">
                Doctor At Your Home
              </h1>
              <p className="mb-8 text-lg">
                Need a Doctor to Visit your Loved One at Home? Sasthya Seba has introduced a brand-new health program
                in Bangladesh called "Home-Centric Primary Care", where a doctor and a paramedic will visit patients at home
                with necessary medical equipment.
              </p>
              <div className="bg-white/10 rounded-lg p-4 mb-6">
                <p className="font-bold">Dial for immediate service: 09611 530 530</p>
              </div>
            </div>
            <div className="w-full md:w-1/2">
              <div className="relative h-72 md:h-96 w-full rounded-lg overflow-hidden">
                <Image
                  src="https://ext.same-assets.com/174619264/2204253837.webp"
                  alt="Doctor at home service"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <h2 className="text-2xl md:text-3xl font-bold mb-10 text-center">
            Benefits of Home Doctor Visit
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow flex items-start gap-4"
              >
                <div className="flex-shrink-0 bg-secondary/20 text-secondary font-bold rounded-full h-8 w-8 flex items-center justify-center">
                  {index + 1}
                </div>
                <p className="text-gray-700">{benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <h2 className="text-2xl md:text-3xl font-bold mb-10 text-center">
            How Our Home Doctor Service Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="text-center">
              <div className="bg-secondary/10 rounded-full h-20 w-20 flex items-center justify-center mx-auto mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-secondary">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">1. Request a Doctor</h3>
              <p className="text-gray-600">
                Call our hotline or fill out the request form. Our team will arrange a doctor visit at your preferred time.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-secondary/10 rounded-full h-20 w-20 flex items-center justify-center mx-auto mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-secondary">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">2. Doctor Visits Your Home</h3>
              <p className="text-gray-600">
                A qualified doctor and paramedic will arrive at your doorstep with necessary medical equipment.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-secondary/10 rounded-full h-20 w-20 flex items-center justify-center mx-auto mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-secondary">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.429 9.75 2.25 12l4.179 2.25m0-4.5 5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0 4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0-5.571 3-5.571-3" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">3. Complete Care</h3>
              <p className="text-gray-600">
                Get a thorough examination, diagnosis, prescription, and follow-up recommendations all in the comfort of your home.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Request Form Section */}
      <div className="bg-gray-50 py-16">
        <div className="container-custom">
          <div className="bg-white rounded-lg shadow-md overflow-hidden border">
            <div className="bg-primary text-white p-6">
              <h2 className="text-2xl font-bold">Request a Doctor Visit</h2>
              <p className="mt-2">Fill out the form below to schedule a home visit from our qualified doctors</p>
            </div>
            <div className="p-6">
              <ConsultationRequestForm
                formType="doctor"
                inCard={true}
                helpText="Our team will contact you within 30 minutes to confirm your appointment."
              />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
