"use client";

import React, { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function OnCallDoctorPage() {
  const packages = [
    {
      title: "On Demand Doctor at Home!",
      subtitle: "Call registered MBBS doctor at home for primary care!",
      price: "৳ 1200",
      button: "Request this package",
      description:
        "If you need a primary care or, whenever you / someone of your family members or friends are not feeling well and you want some experienced MBBS doctor at home to inspect issue (illness) at a very early stage then, this is the service you need!",
      features: [
        "Single Visit.",
        "Visit Duration : Max 20 minutes.",
        "Basic health vitals check included.",
        "90 minutes arrival time needed.",
      ],
      highlight: false,
    },
    {
      title: "Home Centric Primary Care!",
      subtitle: "MBBS Doctor & Physiotherapist visits at home once a week (Monthly 4 Visit).",
      price: "৳ 4999",
      button: "Request this package",
      description:
        'Sasthya Seba Limited has introduced a brand-new health program in Bangladesh called "Home-Centric Primary Care", where a doctor and a paramedic will visit patients at home with necessary medical equipment’s four days a month.',
      features: [
        "Monthly 4 visit.",
        "1 MBBS Doctor & 1 Physiotherapist",
        "Visit Duration: 30 minutes.",
        "Basic health vitals check included.",
      ],
      highlight: true,
    },
  ];

  const faqs = [
    { q: "What is On-Call-Doctor?", a: "" },
    { q: "What is Home centric primary healthcare?", a: "" },
    { q: "Which main health screenings are included in your package?", a: "" },
    { q: "Does the government approve of your doctor?", a: "" },
    { q: "What If I Decide To Cancel an Appointment?", a: "" },
    { q: "Can I set up an online appointment and pay later?", a: "" },
    { q: "Can I change the timing of an on-call-doctor appointment?", a: "" },
    { q: "Can I change the timing of an appointment for Home Centric Primary Care Package?", a: "" },
  ];

  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <main>
      <Header />

      <section className="py-12 bg-gray-50">
        <div className="container-custom grid grid-cols-1 md:grid-cols-2 gap-8">
          {packages.map((pkg, idx) => (
            <div
              key={pkg.title}
              className={`bg-white rounded-lg shadow-md border p-8 flex flex-col ${
                pkg.highlight ? "border-2 border-primary relative" : ""
              }`}
            >
              {pkg.highlight && (
                <span className="absolute top-0 right-0 bg-primary text-white text-xs px-3 py-1 rounded-bl-lg rounded-tr-lg font-semibold">
                  Best Value
                </span>
              )}
              <h2 className="text-2xl font-bold mb-2">{pkg.title}</h2>
              <p className="text-primary font-semibold mb-2">{pkg.subtitle}</p>
              <div className="text-3xl font-bold text-secondary mb-4">{pkg.price}</div>
              <button className="bg-primary text-white px-6 py-2 rounded font-semibold mb-4 hover:bg-primary/90 transition">
                {pkg.button}
              </button>
              <p className="mb-4 text-gray-700">{pkg.description}</p>
              <ul className="mb-2 space-y-1">
                {pkg.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-primary font-bold">#</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>



      </section>

      <section className="py-12 bg-white">
        <div className="container-custom md:grid-cols-2 gap-8">
          <h2 className="text-2xl font-bold mb-6 text-left">Frequently asked questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="border rounded-lg bg-white"
              >
                <button
                  className="w-full flex justify-between items-center px-6 py-4 text-left focus:outline-none"
                  onClick={() => setOpenIdx(openIdx === i ? null : i)}
                  aria-expanded={openIdx === i}
                  aria-controls={`faq-panel-${i}`}
                >
                  <span className="font-medium">{faq.q}</span>
                  <svg
                    className={`w-5 h-5 transition-transform duration-200 ${openIdx === i ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {openIdx === i && (
                  <div
                    id={`faq-panel-${i}`}
                    className="px-6 pb-4 text-gray-600"
                  >
                    {/* Placeholder answer */}
                    <span>
                      Answer coming soon.
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
